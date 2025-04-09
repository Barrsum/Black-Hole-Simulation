// src/components/Footer.jsx
import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import styles from '../styles/Footer.module.css'; 

function Footer() {
  const currentYear = new Date().getFullYear(); 

  return (
    <footer className={styles.appFooter}>
      <div className={styles.socialLinks}>
        <a
          href="https://www.linkedin.com/in/ram-bapat-barrsum-diamos"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ram Bapat's LinkedIn Profile"
          title="Ram Bapat's LinkedIn Profile"
          className={styles.socialIconLink} 
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/Barrsum/Black-Hole-Simulation.git" 
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Git Repo"
          title="Source Git Repo"
          className={styles.socialIconLink} 
        >
          <FaGithub />
        </a>
      </div>
      <p className={styles.footerText}>
        Connect via LinkedIn / View Sourcd on GitHub
      </p>
      <p className={styles.footerText}>
        Black Hole Simulation Project
      </p>
      <p className={styles.footerText}>
        © {currentYear} Created By Ram Bapat
      </p>
    </footer>
  );
}

export default React.memo(Footer);
