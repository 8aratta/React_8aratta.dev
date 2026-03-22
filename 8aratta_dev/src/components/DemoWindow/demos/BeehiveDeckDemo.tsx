// This file may have had a BOM that is now removed
import React, { useState } from 'react';
import { BeehiveDeck } from '@8aratta/beehive-deck';
import { DemoWindowSettings } from '../DemoWindowSettings';
import styles from '../DemoWindowSettings.module.css';

type BeehiveDeckDemoProps = {
  theme?: string;
};

const demoItems = [
  { id: '1', title: 'React', description: '4 Years Exp.', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { id: '2', title: 'TypeScript', description: '3 Years Exp.', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  { id: '3', title: 'Node.js', description: '4 Years Exp.', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { id: '4', title: 'Docker', description: '2 Years Exp.', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
  { id: '5', title: 'Git', description: '6 Years Exp.', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
  { id: '6', title: 'HTML5', description: '5 Years Exp.', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
  { id: '7', title: 'CSS3', description: '5 Years Exp.', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
  { id: '8', title: 'Sass', description: '3 Years Exp.', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg' },
  { id: '9', title: 'Webpack', description: '3 Years Exp.', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/webpack/webpack-original.svg' },
  { id: '10', title: 'Jest', description: '2 Years Exp.', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg' },
  { id: '11', title: 'Figma', description: '2 Years Exp.', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
  { id: '12', title: 'MongoDB', description: '2 Years Exp.', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
];

export const BeehiveDeckDemo: React.FC<BeehiveDeckDemoProps> = ({ theme }) => {
  const [deckTheme, setDeckTheme] = useState<'light' | 'dark'>(
    theme === 'dark' ? 'dark' : 'light'
  );
  const [itemCount, setItemCount] = useState<number>(demoItems.length);
  const [maxWidth, setMaxWidth] = useState<number>(6);

  // Invert the theme for BeehiveDeck
  const invertedTheme = deckTheme === 'dark' ? 'light' : 'dark';

  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '280px' }}>
      <DemoWindowSettings theme={theme}>
        <div className={styles.controlRow}>
          <span className={styles.controlLabel}>Theme</span>
          <select
            value={deckTheme}
            onChange={e => setDeckTheme(e.target.value as 'light' | 'dark')}
            style={{
              background: theme === 'dark' ? '#222' : '#fff',
              color: theme === 'dark' ? '#fff' : '#222',
              border: '1px solid #444',
              borderRadius: 4,
              padding: '0.25rem 0.5rem',
              fontSize: '1rem',
            }}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div className={styles.controlRow}>
          <span className={styles.controlLabel}>Items: {itemCount}</span>
          <input
            type="range"
            min={1}
            max={demoItems.length}
            value={itemCount}
            onChange={e => setItemCount(Number(e.target.value))}
          />
        </div>
        <div className={styles.controlRow}>
          <span className={styles.controlLabel}>Max Width: {maxWidth}</span>
          <input
            type="range"
            min={3}
            max={6}
            value={maxWidth}
            onChange={e => setMaxWidth(Number(e.target.value))}
          />
        </div>
      </DemoWindowSettings>

      <div
        style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', overflow: 'auto' }}
        data-theme={invertedTheme}
      >
        <BeehiveDeck items={demoItems.slice(0, itemCount)} theme={invertedTheme} maxWidth={maxWidth} />
      </div>
    </div>
  );
};
