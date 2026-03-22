import React, { useState } from 'react';
import { DemoWindowSettings } from '../DemoWindowSettings';
import styles from '../DemoWindowSettings.module.css';
import Workspace from './Workspace/Workspace';

// BlenderDemo: Interactive 3D workspace demo
export const BlenderDemo: React.FC<{ theme?: string }> = ({ theme }) => {
  const [cameraFov, setCameraFov] = useState(50);
  const [environment, setEnvironment] = useState(theme === 'dark' ? 'night' : 'apartment');
  const [showHints, setShowHints] = useState(true);

  return (
    <div style={{ display: 'flex', minHeight: '280px', width: '100%' }}>
      <DemoWindowSettings theme={theme}>
        <div className={styles.controlRow}>
          <span className={styles.controlLabel}>Camera FOV: {cameraFov}°</span>
          <input
            type="range"
            min={30}
            max={90}
            value={cameraFov}
            onChange={e => setCameraFov(Number(e.target.value))}
          />
        </div>
        <div className={styles.controlRow}>
          <span className={styles.controlLabel}>Environment</span>
          <select
            value={environment}
            onChange={e => setEnvironment(e.target.value)}
            style={{
              background: theme === 'dark' ? '#222' : '#fff',
              color: theme === 'dark' ? '#fff' : '#222',
              border: '1px solid #444',
              borderRadius: 4,
              padding: '0.25rem 0.5rem',
              fontSize: '1rem',
            }}
          >
            <option value="apartment">Apartment</option>
            <option value="night">Night</option>
            <option value="studio">Studio</option>
          </select>
        </div>
        <div className={styles.controlRow}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" checked={showHints} onChange={e => setShowHints(e.target.checked)} />
            Show Hints
          </label>
        </div>
      </DemoWindowSettings>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'stretch', justifyContent: 'center', padding: '1rem' }}>
        <Workspace
          camera={{ position: [45, 45, 45], fov: cameraFov }}
          environment={environment}
          showHints={showHints}
        />
      </div>
    </div>
  );
};
