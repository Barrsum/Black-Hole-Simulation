// src/components/Footer.jsx
import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import styles from '../styles/Footer.module.css'; // Import CSS module

function Footer() {
  const currentYear = new Date().getFullYear(); // Get current year dynamically

  return (
    <footer className={styles.appFooter}>
      <div className={styles.socialLinks}>
        <a
          href="https://www.linkedin.com/in/ram-bapat-barrsum-diamos"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ram Bapat's LinkedIn Profile"
          title="Ram Bapat's LinkedIn Profile"
          className={styles.socialIconLink} // Add class for styling
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/Barrsum" // Updated GitHub link to profile
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ram Bapat's GitHub Profile"
          title="Ram Bapat's GitHub Profile"
          className={styles.socialIconLink} // Add class for styling
        >
          <FaGithub />
        </a>
      </div>
      <p className={styles.footerText}>
        Connect via LinkedIn / View Profile on GitHub
      </p>
      <p className={styles.footerText}>
        {/* Optional: Link to project repo later */}
        {/* <a href="YOUR_PROJECT_REPO_LINK_HERE" target="_blank" rel="noopener noreferrer">View Project Source</a> */}
        Black Hole Simulation Project
      </p>
      <p className={styles.footerText}>
        © {currentYear} Created By Ram Bapat
      </p>
    </footer>
  );
}

export default React.memo(Footer);