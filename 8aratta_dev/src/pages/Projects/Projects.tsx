import React from 'react';
import { useTheme } from '../../contexts';
import { DemoWindow } from '../../components/DemoWindow/DemoWindow';
import { CircularMenuDemo } from '../../components/DemoWindow/demos/CircularMenuDemo';
import { BeehiveDeckDemo } from '../../components/DemoWindow/demos/BeehiveDeckDemo';
import { BlenderDemo } from '../../components/DemoWindow/demos/BlenderDemo';
import styles from './Projects.module.css';

interface Project {
  id: string;
  name: string;
  npmUrl: string;
  description: string;
  demoComponent: React.ComponentType<any>;
  codeSnippet?: string;
  styleSnippet?: string;
}

const projects: Project[] = [
  {
    id: 'circular-menu',
    name: 'Circular Menu',
    npmUrl: 'https://www.npmjs.com/package/@8aratta/circular-menu',
    description: 'A customizable circular navigation menu for React applications.',
    demoComponent: CircularMenuDemo,
    codeSnippet: `import { CircularMenu } from '@8aratta/circular-menu';\n\n<CircularMenu items={[...]} direction="clockwise" animation="spin" />`,
    styleSnippet: `.circularMenu {\n  --menu-radius: 120px;\n  --item-size: 48px;\n  --animation-duration: 0.5s;\n}`,
  },
  {
    id: 'beehive-deck',
    name: 'Beehive Deck',
    npmUrl: 'https://www.npmjs.com/package/@8aratta/beehive-deck',
    description: 'A visually engaging deck/grid component for showcasing items.',
    demoComponent: BeehiveDeckDemo,
    codeSnippet: `import { BeehiveDeck } from '@8aratta/beehive-deck';\n\n<BeehiveDeck items={[...]} theme="light" layout="hex" />`,
    styleSnippet: `.beehiveDeck {\n  --cell-size: 64px;\n  --gap: 12px;\n  --theme-color: #FFD700;\n}`,
  },
  {
    id: 'blender-workspace',
    name: 'Blender Workspace',
    npmUrl: '',
    description: 'Preview and interact with my Blender workspace model. Adjust camera and environment settings for a custom view.',
    demoComponent: BlenderDemo,
  }
];

function Projects() {
  const { theme } = useTheme();

  return (
    <div className={styles.projectsPage} data-theme={theme}>
      <main className={styles.content}>
        {/* HERO SECTION */}
        <section className={styles.heroSection}>
          <h1 className={styles.heroTitle}>Projects Portfolio</h1>
          <p className={styles.heroSummary}>Explore my open-source React components with live demos and code samples.</p>
        </section>

        {/* PROJECT DEMOS */}
        <div className={styles.projectList}>
          {projects.map(project => (
            <section key={project.id} className={styles.projectSection}>
              <div className={styles.projectHeader}>
                <h2>{project.name}</h2>
                {project.npmUrl
                ? <a href={project.npmUrl} target="_blank" rel="noreferrer" className={styles.npmLink}>View on npm</a>
                : <span className={styles.npmLink} style={{ opacity: 0.7 }}>3D Model Demo</span>
              }
              </div>
              <p className={styles.projectDescription}>{project.description}</p>
              <DemoWindow
                component={project.demoComponent}
                theme={theme}
                codeSnippet={project.codeSnippet}
                styleSnippet={project.styleSnippet}
              />
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Projects;
