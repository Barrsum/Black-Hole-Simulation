// src/components/Controls.jsx
import React from 'react';
import styles from '../styles/Controls.module.css';

const items = [
  { id: 'fridge', name: 'Fridge', emoji: '🧊' },
  { id: 'sofa', name: 'Sofa', emoji: '🛋️' },
  { id: 'chair', name: 'Chair', emoji: '🪑' },
  { id: 'chess', name: 'Chess Board', emoji: '♟️' },
];

function Controls({ onThrowItem }) {
  const handleThrow = (itemId) => {
    console.log(`Throwing ${itemId}!`);
    if (onThrowItem) {
      onThrowItem(itemId);
    }
  };

  return (
    <div className={styles.controlsContainer}>
      <h3 className={styles.controlsTitle}>Throw Something In!</h3>
      <div className={styles.buttonGroup}>
        {items.map((item) => (
          <button
            key={item.id}
            className={styles.throwButton}
            onClick={() => handleThrow(item.id)}
            title={`Throw a ${item.name}`}
          >
            {item.emoji} {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Controls;