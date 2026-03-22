import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../../contexts';
import styles from './ThemeToggle.module.css';

interface ThemeToggleProps {
  className?: string;
}

function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [isHidden, setIsHidden] = useState(false);
  const [isProximity, setIsProximity] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleHide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIsHidden(true), 3000);
  }, []);

  useEffect(() => {
    scheduleHide();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [scheduleHide]);

  const handleProximityEnter = () => setIsProximity(true);
  const handleProximityLeave = () => setIsProximity(false);

  const handleButtonEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsProximity(false);
    setIsHidden(false);
  };

  const handleButtonLeave = () => {
    scheduleHide();
  };

  return (
    <>
      <div
        className={styles.proximityZone}
        onMouseEnter={handleProximityEnter}
        onMouseLeave={handleProximityLeave}
        aria-hidden="true"
      />
      <button
        onClick={toggleTheme}
        className={`${styles.themeToggle} ${className || ''}`}
        data-hidden={isHidden}
        data-proximity={isProximity}
        onMouseEnter={handleButtonEnter}
        onMouseLeave={handleButtonLeave}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? '⚪' : '⚫️'}
      </button>
    </>
  );
}

export default ThemeToggle;
