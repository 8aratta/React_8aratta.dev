import React from 'react';
import { useTheme } from '../../contexts';
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal';
import { TableOfContents } from '../../components/TableOfContents';
import { BeehiveDeck } from '@8aratta/beehive-deck';
import styles from './Portfolio.module.css';

const tocSections = [
  { id: 'about-me', label: 'About Me' },
  { id: 'skills', label: 'Skills / Tech Stack' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'open-source', label: 'Open Source' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' }
];

function Portfolio() {
  const { theme } = useTheme();
  const [isTocExpanded, setIsTocExpanded] = React.useState(true);

  return (
    <div className={styles.portfolioPage} data-theme={theme}>
      <main className={styles.content}>
        {/* HERO SECTION */}
        <section className={`${styles.section} ${styles.heroSection} ${!isTocExpanded ? styles.heroSectionCollapsed : ''}`}>
          <ScrollReveal animation="fade-in" delay={100} className={styles.heroPhotoWrapper}>
            <img
              className={styles.heroPhoto}
              src="/assets/images/Me.png"
              alt="Profile photo of Domenico Baratta"
              loading="lazy"
            />
          </ScrollReveal>

          <div className={styles.heroText}>
            <ScrollReveal animation="fade-up" delay={200}>
              <p className={styles.sectionLabel}>Portfolio</p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={300}>
              <h1 className={styles.heroName}>Domenico Baratta</h1>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={400}>
              <p className={styles.heroTitle}>Software Developer</p>
            </ScrollReveal>
            <ScrollReveal animation="blur-in" delay={500}>
              <p className={styles.heroSummary}>
                I build practical software across industrial engineering and web platforms.
                My focus is clean architecture, reliable delivery, and products that are easy to use.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={600} className={styles.linkRow}>
              <a href="https://github.com/8aratta" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.4em' }}>
                <img src="/assets/icons/github.svg" alt="GitHub" style={{ width: '1.2em', height: '1.2em', verticalAlign: 'middle' }} />
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/domenico-baratta-a57544280/" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.4em' }}>
                <img src="/assets/icons/LinkedIn.svg" alt="LinkedIn" style={{ width: '1.2em', height: '1.2em', verticalAlign: 'middle' }} />
                LinkedIn
              </a>
            </ScrollReveal>
          </div>
        </section>

        {/* SCROLLYTELLING CONTAINER */}
        <div className={styles.scrollytellingLayout}>

          {/* STICKY SIDEBAR (TOC) */}
          <aside className={`${styles.sidebar} ${isTocExpanded ? '' : styles.sidebarCollapsed}`}>
            <TableOfContents sections={tocSections} isExpanded={isTocExpanded} onToggle={setIsTocExpanded} />
          </aside>

          {/* MAIN NARRATIVE SECTIONS */}
          <div className={styles.narrativeContent}>

            <section id="about-me" className={`${styles.section} ${styles.narrativeSection}`}>
              <ScrollReveal animation="fade-up" threshold={0.5}>
                <h2>About Me</h2>
              </ScrollReveal>
              <ScrollReveal animation="blur-in" delay={200} threshold={0.2}>
                <p className={styles.leadText}>
                  I am a software engineer with a strong background in automation and modern application development.
                  Over the years, I have worked on industrial software and user-facing tools that need to be both robust and intuitive.
                  My specialization is combining structured backend thinking with clean frontend experiences.
                  I enjoy building products that solve real problems and still feel good to use.
                  I am especially motivated by projects where engineering quality and product design work together.
                </p>
              </ScrollReveal>
            </section>

            <section id="skills" className={`${styles.section} ${styles.narrativeSection}`}>
              <ScrollReveal animation="fade-up">
                <h2>Tech Stack</h2>
              </ScrollReveal>
              <div className={styles.skillGridContainer}>
                <BeehiveDeck items={[
                  { id: 'csharp', title: 'C#', description: '8 Years Exp.', logoUrl: '/assets/icons/csharp-original.svg' },
                  { id: 'typescript', title: 'TypeScript', description: '3 Years Exp.', logoUrl: '/assets/icons/typescript-original.svg' },
                  { id: 'react', title: 'React', description: '3 Years Exp.', logoUrl: '/assets/icons/react-original.svg' },
                  { id: 'nodejs', title: 'Node.js', description: '4 Years Exp.', logoUrl: '/assets/icons/nodejs-original.svg' },
                  { id: 'css3', title: 'HTML / CSS', description: '8 Years Exp.', logoUrl: '/assets/icons/css3-original.svg' },
                  { id: 'docker', title: 'Docker', description: '2 Years Exp.', logoUrl: '/assets/icons/docker-original.svg' },
                  { id: 'git', title: 'Git', description: '6 Years Exp.', logoUrl: '/assets/icons/git-original.svg' },
                  { id: 'electron', title: 'Electron', description: '2 Years Exp.', logoUrl: '/assets/icons/electron-original.svg' },
                  { id: 'jest', title: 'Testing', description: '3 Years Exp.', logoUrl: '/assets/icons/jest-plain.svg' }
                ]} theme={theme} />
              </div>
            </section>

            <section id="projects" className={`${styles.section} ${styles.narrativeSection}`}>
              <ScrollReveal animation="fade-up">
                <h2>Projects</h2>
              </ScrollReveal>
              <ScrollReveal animation="fade-in" delay={150}>
                <p className={styles.sectionIntro}>A short overview of some of my personal projects im working on:</p>
              </ScrollReveal>


              <div className={styles.projectList}>
                {[
                  {
                    title: 'Personal React Websites',
                    desc: 'Design and development of personal websites like 8aratta.com and 8aratta.dev.',
                    tech: 'React, TypeScript, HTML/CSS',
                    role: 'Full stack ownership from concept to UI implementation.',
                    image: theme === 'light' ? '/assets/media/Home_Light.gif' : '/assets/media/Home_Dark.gif',
                    imageAlt: theme === 'light' ? 'Home Light Theme Preview' : 'Home Dark Theme Preview'
                  },
                  {
                    title: 'NPM Packages',
                    desc: 'Experience in building and publishing npm packages for internal use and open source, including component libraries and utility tools.',
                    tech: 'npm packaging',
                    role: 'Developer for multiple npm packages, responsible for design, implementation, documentation, and maintenance.',
                    link: 'https://www.npmjs.com/settings/8aratta/packages',
                    image: 'https://static-production.npmjs.com/attachments/ck3uwg1fkmr9tc97498op7ljg-wombat-header-teams.png',
                    imageAlt: 'npm logo'
                  },
                  {
                    title: 'Lethal Company Mods / Plugins',
                    desc: 'Dependency-injection-based mods including item reworks and monster behavior reworks to create more engaging gameplay.',
                    tech: 'C#, plugin architecture, dependency injection',
                    role: 'Implemented gameplay systems, balancing logic, and interaction mechanics.',
                    link: 'https://thunderstore.io/c/lethal-company/p/8/?q=&ordering=last-updated&section=mods&deprecated=on',
                    image: 'https://thunderstore.io/thumbnail-serve/repository/icons/8-BrackenReworked-2.9.6.png/?width=128&height=128',
                    imageAlt: 'Lethal Company Mods Thumbnail'
                  }
                ].map((project, index) => {
                  const cardContent = (
                    <article className={styles.projectCard} style={project.link ? { cursor: 'pointer' } : {}}>
                      <h3>{project.title}</h3>
                      <div className={styles.projectImagePlaceholder}>
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.imageAlt}
                            style={{ width: '100%', height: 'auto', borderRadius: '8px', background: '#fff' }}
                          />
                        ) : (
                          'Image placeholder'
                        )}
                      </div>
                      <p>{project.desc}</p>
                      <p className={styles.meta}><strong>Tech:</strong> {project.tech}</p>
                      <p className={styles.meta}><strong>My role:</strong> {project.role}</p>
                    </article>
                  );
                  return (
                    <ScrollReveal key={project.title} animation="blur-in" delay={index * 100} threshold={0.2}>
                      {project.link ? (
                        <a href={project.link} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                          {cardContent}
                        </a>
                      ) : cardContent}
                    </ScrollReveal>
                  );
                })}
              </div>

              <ScrollReveal animation="fade-in">
                <p id="project-details-placeholder" className={styles.placeholderNote}>
                  Project detail links will be added here later.
                </p>
              </ScrollReveal>
            </section>

            <section id="experience" className={`${styles.section} ${styles.narrativeSection}`}>
              <ScrollReveal animation="fade-up">
                <h2>Experience</h2>
              </ScrollReveal>
              <ScrollReveal animation="fade-up" delay={200}>
                <article className={styles.timelineItem}>
                  <h3>Junior Professional Engineer at SIEMENS</h3>
                  <p className={styles.dateRange}>2018 – 2024</p>
                  <p>In my initial years at SIEMENS my main focus was on feature development within SCRUM Teams for the well known TIA Portal. Partaking in the development of the versions V18 through V20</p>
                  <br />
                  <p>TIA Portal (Totally Integrated Automation Portal) is Siemens' unified engineering software platform for industrial automation.  It integrates all essential engineering tasks into a single, cohesive environment.</p>
                </article>
                <div style={{ height: '2rem' }} />
                <article className={styles.timelineItem}>
                  <h3>UX/UI Developer at SIEMENS</h3>
                  <p className={styles.dateRange}>2024 – 2026</p>
                  <p>With the AI trend coming to life SIEMENS started working on some AI tools aswell. One of which the Engineering Copilot, a genAI-powered assistant for engineering within the TIA Portal.</p>
                  <br />
                  <p>As one of the founding members of this tool, I was in charge of the UX/UI development. I served as the lead UI developer and worked with teams across the world to implement features for the Copilot, ensuring a seamless and innovative user experience. </p>
                  <br />
                  <p>All of our work on the Engineering Copilot was recognized with an internal SIEMENS award for innovation and impact in 2025.</p>
                </article>
                <div style={{ height: '2rem' }} />
                <article className={styles.timelineItem}>
                  <h3>Professional Engineer at SIEMENS</h3>
                  <p className={styles.dateRange}>2026 – today</p>
                  <p>
                    In my latest role as a Professional Engineer, I am part of the SIMATIC AX development.
                  </p>
                  <br />
                  <p> Based on Visual Studio Code, SIMATIC AX offers state-of-the-art IT tools in a lean development environment for programming and maintaining SIMATIC PLCs. This enables fast releases, quality management and collaboration from anywhere.</p>
                </article>
              </ScrollReveal>
            </section>

            <section id="education" className={`${styles.section} ${styles.narrativeSection}`}>
              <ScrollReveal animation="fade-up">
                <h2>Education</h2>
              </ScrollReveal>
              <ScrollReveal animation="fade-up" delay={200}>
                <article className={styles.timelineItem}>
                  <h3>Graduated in Bavaria</h3>
                  <p className={styles.dateRange}>June 2018</p>
                  <p>The Abitur is the highest school-leaving qualification in Germany, granting the general higher education entrance qualification. The Abitur in Bavaria is widely considered one of the most challenging high school diplomas in Germany.</p>
                </article>
                <div style={{ height: '2rem' }} />
                <article className={styles.timelineItem}>
                  <h3>Graduate of the SIEMENS professional Education Center (SPE)</h3>
                  <p className={styles.dateRange}>February 2021</p>
                  <p>The SPE is a dual education program a certified training provider, that offers an outstanding education and training programs at 18 modern training centers across Germany.</p>
                  <p>Computer Science Expert with focus on Software Development</p>
                </article>
              </ScrollReveal>
            </section>

            <section id="open-source" className={`${styles.section} ${styles.narrativeSection}`}>
              <ScrollReveal animation="fade-up">
                <h2>GitHub / Open Source</h2>
              </ScrollReveal>
              <div className={styles.projectList}>
                <ScrollReveal animation="blur-in" delay={0} threshold={0.2}>
                  <a href="https://github.com/8aratta" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                    <article className={styles.projectCard} style={{ cursor: 'pointer' }}>
                      <div className={styles.projectImagePlaceholder} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
                        <img src="/assets/icons/github.svg" alt="GitHub logo" style={{ width: '48px', height: '48px' }} />
                      </div>
                      <h3>My GitHub Profile</h3>
                      <p>Explore my open source projects, contributions, and code samples on GitHub.</p>
                    </article>
                  </a>
                </ScrollReveal>
                {/* Add more open source entries here as needed */}
              </div>
            </section>

            <section id="achievements" className={`${styles.section} ${styles.narrativeSection}`}>
              <ScrollReveal animation="fade-up">
                <h2>Achievements / Certifications</h2>
              </ScrollReveal>
              <ScrollReveal animation="fade-in" delay={150}>
                <p>Well im not quite finished so this will be added later</p>
              </ScrollReveal>
            </section>

            <section id="contact" className={`${styles.section} ${styles.narrativeSection}`}>
              <ScrollReveal animation="fade-up">
                <h2>Contact</h2>
              </ScrollReveal>
              <ScrollReveal animation="blur-in" delay={200}>
                <ul className={styles.cleanList}>
                  <li>Email: <a href="mailto:barattadom@gmail.com">barattadom@gmail.com</a></li>
                  <li>LinkedIn: <a href="https://www.linkedin.com/in/domenico-baratta-a57544280/" target="_blank" rel="noreferrer">https://www.linkedin.com/in/domenico-baratta-a57544280/</a></li>
                  <li>GitHub: <a href="https://github.com/8aratta" target="_blank" rel="noreferrer">https://github.com/8aratta</a></li>
                  <li>Website: <a href="https://8aratta.com" target="_blank" rel="noreferrer">8aratta.com</a></li>
                </ul>
              </ScrollReveal>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}

export default Portfolio;
