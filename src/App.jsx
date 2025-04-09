// src/App.jsx
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SimulationCanvas from './components/SimulationCanvas';
import LightBendingCanvas from './components/LightBendingCanvas'; // Import the new 2D canvas
import InfoSection from './components/InfoSection';
import Controls from './components/Controls';
import './styles/global.css';

function App() {
  const [thrownItem, setThrownItem] = useState(null);
  // Add state for simulation mode: '3D' or '2D'
  const [simulationMode, setSimulationMode] = useState('3D'); // Default to 3D

  const handleThrowItem = useCallback((itemId) => {
    setThrownItem({ id: itemId, time: Date.now() });
  }, []);

  // Function to toggle simulation mode
  const toggleSimulationMode = useCallback(() => {
    setSimulationMode(prevMode => (prevMode === '3D' ? '2D' : '3D'));
    // Optional: Reset thrown items when switching mode
    setThrownItem(null);
  }, []);

  return (
    <div className="app-container">
      {/* Pass toggle function and current mode to Header */}
      <Header
          onToggleMode={toggleSimulationMode}
          currentMode={simulationMode}
      />
      <main className="main-content">
        {/* Conditionally render the correct canvas */}
        {simulationMode === '3D' ? (
          <SimulationCanvas thrownItem={thrownItem} />
        ) : (
          <LightBendingCanvas />
        )}


        {/* Conditionally render controls only in 3D mode */}
        {simulationMode === '3D' && (
          <Controls onThrowItem={handleThrowItem} />
        )}
        <InfoSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;