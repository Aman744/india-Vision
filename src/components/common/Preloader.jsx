import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Preloader.module.css';

const Preloader = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            if (onLoadComplete) onLoadComplete();
          }, 600); // Small pause at 100%
          return 100;
        }
        // Random increments for a realistic loading feel
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.preloaderOverlay}
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          <div className={styles.preloaderContainer}>
            <motion.div 
              className={styles.logoText}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              INDIA VISION
              <span className={styles.subtext}>ELECTRONICS</span>
            </motion.div>

            <div className={styles.progressBarWrapper}>
              <div 
                className={styles.progressBar} 
                style={{ width: `${Math.min(progress, 100)}%` }} 
              />
            </div>

            <motion.span 
              className={styles.percentText}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              Loading {Math.min(progress, 100)}%
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
