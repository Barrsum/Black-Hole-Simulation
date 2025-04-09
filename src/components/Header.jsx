// src/components/Header.jsx
import React from 'react';
import styles from '../styles/Header.module.css'; // Import CSS module

// Receive props from App.jsx
function Header({ onToggleMode, currentMode }) {
  return (
    <header className={styles.appHeader}>
      <div className={styles.headerContent}>
          <h1 className={styles.title}>Black Hole Simulation</h1>
          <p className={styles.creatorCredit}>Created by - Ram Bapat</p>
      </div>
      {/* Add the toggle button */}
      <button onClick={onToggleMode} className={styles.toggleButton}>
          Switch to {currentMode === '3D' ? '2D Light Bending' : '3D Simulation'}
      </button>
    </header>
  );
}

// Use React.memo if props don't change often
export default React.memo(Header);