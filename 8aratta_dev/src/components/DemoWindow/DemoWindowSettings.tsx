import React, { useState } from 'react';
import styles from './DemoWindowSettings.module.css';

interface DemoWindowSettingsProps {
  children: React.ReactNode;
  theme?: string;
}

export const DemoWindowSettings: React.FC<DemoWindowSettingsProps> = ({ children, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {!isOpen && (
        <button className={styles.mobileToggle} onClick={() => setIsOpen(true)} aria-label="Expand controls">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.toggleIcon}>
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      )}
      <aside className={`${styles.settingsPanel} ${isOpen ? styles.settingsPanelOpen : ''}`} data-theme={theme}>
        <div className={styles.settingsContent}>
          <div className={styles.settingsHeader}>
            <span className={styles.settingsLabel}>Controls</span>
            <button className={styles.headerCloseBtn} onClick={() => setIsOpen(false)} aria-label="Collapse controls">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.toggleIcon}>
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          </div>
          <div className={styles.settingsBody}>{children}</div>
        </div>
      </aside>
    </>
  );
};
