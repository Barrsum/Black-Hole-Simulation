// src/components/LightBendingCanvas.jsx
import React, { useRef, useEffect } from 'react';
import styles from '../styles/LightBendingCanvas.module.css';

const NUM_PHOTONS = 50;
const GRAVITY_CONSTANT = 5000;
const BH_RADIUS = 20;
const EVENT_HORIZON_RADIUS = BH_RADIUS * 1.5;

function LightBendingCanvas() {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null); // *** ADD REF FOR WRAPPER ***
  const photonsRef = useRef([]);
  const animationFrameId = useRef(null);

  const initializePhotons = (width, height) => {
    const newPhotons = [];
    for (let i = 0; i < NUM_PHOTONS; i++) {
      newPhotons.push({
        x: -10,
        y: Math.random() * height,
        vx: 4 + Math.random() * 2,
        vy: (Math.random() - 0.5) * 1,
        path: [],
        active: true,
      });
    }
    photonsRef.current = newPhotons;
  };

  const resetPhoton = (photon, width, height) => {
    photon.x = -10;
    photon.y = Math.random() * height;
    photon.vx = 4 + Math.random() * 2;
    photon.vy = (Math.random() - 0.5) * 1;
    photon.path = [];
    photon.active = true;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current; // *** GET WRAPPER ELEMENT ***
    if (!canvas || !wrapper) return; // Guard clause

    const ctx = canvas.getContext('2d');
    let width = wrapper.offsetWidth; // Use wrapper dimensions
    let height = wrapper.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const calculateCenter = () => {
        return { x: canvas.width / 2, y: canvas.height / 2 };
    }
    let center = calculateCenter();

    initializePhotons(width, height);

    const draw = () => {
      if (!canvasRef.current) return;
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Black Hole
      ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
      ctx.beginPath();
      ctx.arc(center.x, center.y, EVENT_HORIZON_RADIUS, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(center.x, center.y, BH_RADIUS, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Update and Draw Photons
      photonsRef.current.forEach((p) => {
        if (!p.active) return;
        p.path.push({ x: p.x, y: p.y });
        if (p.path.length > 20) p.path.shift();

        const dx = center.x - p.x;
        const dy = center.y - p.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        if (dist > BH_RADIUS && distSq > 1) {
          const force = GRAVITY_CONSTANT / distSq;
          const accelX = (dx / dist) * force;
          const accelY = (dy / dist) * force;
          p.vx += accelX * 0.016;
          p.vy += accelY * 0.016;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.path.length > 1) {
            ctx.strokeStyle = 'rgba(0, 255, 255, 0.5)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(p.path[0].x, p.path[0].y);
            for (let i = 1; i < p.path.length; i++) {
                ctx.lineTo(p.path[i].x, p.path[i].y);
            }
            ctx.stroke();
        }

        if (dist < EVENT_HORIZON_RADIUS) {
          p.active = false;
        } else if (p.x > canvas.width + 10 || p.x < -20 || p.y > canvas.height + 10 || p.y < -10) {
          resetPhoton(p, canvas.width, canvas.height);
        }
      });

      // Reset inactive photons
       photonsRef.current.forEach((p) => {
           if (!p.active && Math.random() < 0.05) {
               resetPhoton(p, canvas.width, canvas.height);
           }
       });

      animationFrameId.current = requestAnimationFrame(draw);
    };

    // Handle Resize
    const handleResize = () => {
        if (!canvasRef.current || !wrapperRef.current) return;
        width = wrapperRef.current.offsetWidth; // Use wrapper dimensions
        height = wrapperRef.current.offsetHeight;
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        center = calculateCenter();
        initializePhotons(width, height);
    };

    // Use ResizeObserver on the wrapper element
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(wrapper); // *** OBSERVE THE WRAPPER REF ***

    draw();

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId.current);
      // Check if wrapper still exists before unobserving
      if (wrapperRef.current) {
         resizeObserver.unobserve(wrapperRef.current); // *** UNOBSERVE THE WRAPPER REF ***
      }
      resizeObserver.disconnect();
    };
  }, []); // Empty dependency array

  return (
    // *** ATTACH wrapperRef TO THE DIV ***
    <div ref={wrapperRef} className={styles.canvasWrapper}>
      {/* Canvas ref remains the same */}
      <canvas ref={canvasRef} className={styles.bendingCanvas}></canvas>
      <p className={styles.infoText}>2D Simulation: Light bending around a black hole</p>
    </div>
  );
}

export default LightBendingCanvas;