import React, { useState } from 'react';
import Draggable from 'react-draggable';

const App = () => {
  const gridCellSize = 25; 
  const [isEditing, setIsEditing] = useState(true); 
  const [draggingModule, setDraggingModule] = useState(null); 
  const [modules, setModules] = useState([
    { id: 1, width: 4, height: 4, color: 'purple', shape: 'rectangle', x: 0, y: 0 },
    { id: 2, width: 4, height: 4, color: 'red', shape: 'circle', x: 100, y: 0 },
    { id: 3, width: 4, height: 4, color: 'black', shape: 'triangle', x: 200, y: 0 }
  ]);

  const handleStart = (id) => {
    setDraggingModule(id); 
  };

  const handleStop = (e, data, id) => {
    console.log('Stopped dragging module with ID:', draggingModule);
    setDraggingModule(null); 
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === id ? { ...module, x: data.x, y: data.y } : module
      )
    );
  };

  const renderModule = (module) => {
    if (module.shape === 'triangle') {
      return (
        <div
          key={module.id}
          style={{
            width: 0,
            height: 0,
            borderLeft: `${(gridCellSize * module.width) / 2}px solid transparent`,
            borderRight: `${(gridCellSize * module.width) / 2}px solid transparent`,
            borderBottom: `${gridCellSize * module.height}px solid ${module.color}`,
            position: 'absolute',
            cursor: isEditing ? 'grab' : 'default',
            zIndex: module.zIndex, 
          }}
        />
      );
    }

    return (
      <div
        key={module.id}
        style={{
          width: `${gridCellSize * module.width}px`,
          height: `${gridCellSize * module.height}px`,
          backgroundColor: module.color,
          borderRadius: module.shape === 'circle' ? '50%' : '0',
          position: 'absolute',
          cursor: isEditing ? 'grab' : 'default',
        }}
      />
    );
  };

  return (
    <div>
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Switch to View Mode' : 'Switch to Edit Mode'}
      </button>
      <div
        style={{
          width: '100%',
          height: '100vh',
          backgroundSize: isEditing ? `${gridCellSize}px ${gridCellSize}px` : 'none',
          backgroundImage: isEditing
            ? 'linear-gradient(to right, #ddd 1px, transparent 1px), linear-gradient(to bottom, #ddd 1px, transparent 1px)'
            : 'none',
          position: 'relative',
        }}
      >
        {modules.map((module) => {
          return isEditing ? (
            <Draggable
              key={module.id}
              grid={[gridCellSize, gridCellSize]}
              bounds="parent"
              position={{ x: module.x, y: module.y }}
              onStart={() => handleStart(module.id)}
              onStop={(e, data) => handleStop(e, data, module.id)}
            >
              {renderModule(module)}
            </Draggable>
          ) : (
            <div
              key={module.id}
              style={{
                position: 'absolute',
                left: `${module.x}px`,
                top: `${module.y}px`,
              }}
            >
              {renderModule(module)}
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default App;
