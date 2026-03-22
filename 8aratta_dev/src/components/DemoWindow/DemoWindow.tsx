import React, { useState } from 'react';
import styles from './DemoWindow.module.css';
interface DemoWindowProps {
  component: React.ComponentType<any>;
  theme?: string;
  codeSnippet?: string;
  styleSnippet?: string;
}

export const DemoWindow: React.FC<DemoWindowProps> = ({ component: DemoComponent, theme, codeSnippet, styleSnippet }) => {
  const [activeTab, setActiveTab] = useState<'demo' | 'code' | 'style'>('demo');
  return (
    <div className={styles.demoWindow} data-theme={theme}>
      <div className={styles.windowHeader}>
        <div className={styles.tabRow} style={{ width: '100%' }}>
          <div className={styles.segmentedControl} style={{ width: '100%' }}>
            <button
              className={activeTab === 'demo' ? styles.activeTab : ''}
              onClick={() => setActiveTab('demo')}
            >Live Demo</button>
            {codeSnippet && (
              <button
                className={activeTab === 'code' ? styles.activeTab : ''}
                onClick={() => setActiveTab('code')}
              >Code</button>
            )}
            {styleSnippet && (
              <button
                className={activeTab === 'style' ? styles.activeTab : ''}
                onClick={() => setActiveTab('style')}
              >Style</button>
            )}
          </div>
        </div>
      </div>
      <div className={styles.tabContent}>
        {activeTab === 'demo' && DemoComponent && <DemoComponent theme={theme} />}
        {activeTab === 'code' && codeSnippet && (
          <pre className={styles.codeBlock}>{codeSnippet}</pre>
        )}
        {activeTab === 'style' && styleSnippet && (
          <pre className={styles.codeBlock}>{styleSnippet}</pre>
        )}
      </div>
    </div>
  );
};
