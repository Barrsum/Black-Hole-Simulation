// src/components/InfoSection.jsx
import React from 'react';
import styles from '../styles/InfoSection.module.css';

const facts = [
  "Black holes are regions in spacetime where gravity is so strong that nothing—no particles or even electromagnetic radiation such as light—can escape.",
  "The boundary of no escape is called the event horizon. Although it has a huge effect on the fate and circumstances of an object crossing it, it has no locally detectable features.",
  "Objects whose gravitational fields are too strong for light to escape were first considered in the 18th century by John Michell and Pierre-Simon Laplace.",
  "The first direct detection of gravitational waves in 2015 also represented the first observation of a binary black hole merger.",
  "Supermassive black holes, millions to billions of times the mass of the Sun, are believed to exist at the center of most galaxies, including our own Milky Way (Sagittarius A*).",
  "If you fell into a black hole, tidal forces would stretch you apart in a process nicknamed 'spaghettification'."
];

function InfoSection() {
  return (
    <section className={styles.infoContainer}>
      <h2 className={styles.infoTitle}>Black Hole Fun Facts</h2>
      <ul className={styles.factList}>
        {facts.map((fact, index) => (
          <li key={index} className={styles.factItem}>
            {fact}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default InfoSection;