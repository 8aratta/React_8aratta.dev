import React, { useEffect, useState } from 'react';
import styles from './TableOfContents.module.css';

interface TocSection {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  sections: TocSection[];
  isExpanded: boolean;
  onToggle: (state: boolean) => void;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ sections, isExpanded, onToggle }) => {
  const [activeId, setActiveId] = useState<string>('');
  const [isProximity, setIsProximity] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 } // Adjusted rootMargin to catch sections better while scrolling
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sections]);

  // Custom smooth scroll function with an easing (acceleration/deceleration) effect
  const scrollToElement = (id: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (!element) return;

    // Auto-collapse TOC on mobile or desktop when a link is clicked
    onToggle(false);

    const targetPosition = element.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 800; // Adjust for slower/faster scroll
    let start: number | null = null;

    // Easing function: easeInOutCubic
    const ease = (t: number, b: number, c: number, d: number) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t * t + b;
      t -= 2;
      return c / 2 * (t * t * t + 2) + b;
    };

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const amount = ease(progress, startPosition, distance, duration);

      window.scrollTo(0, amount);

      if (progress < duration) {
        window.requestAnimationFrame(step);
      } else {
        // Ensure final stop occurs at exactly the target location (in case calculations get slightly off)
        window.scrollTo(0, targetPosition);
        // Do NOT update the URL hash to avoid conflicts with React Router
      }
    };

    window.requestAnimationFrame(step);
  };

  return (
    <>
      <div 
        className={styles.proximityZone} 
        onMouseEnter={() => setIsProximity(true)}
        onMouseLeave={() => setIsProximity(false)}
        aria-hidden="true"
      />
      <nav 
        className={`${styles.toc} ${isExpanded ? '' : styles.collapsed}`} 
        data-proximity={isProximity}
        aria-label="Table of Contents"
      >
        <div className={styles.tocContent}>
          <ul className={styles.tocList}>
            {sections.map(({ id, label }, index) => (
              <li key={id} className={styles.tocItem}>
                <a
                  href={`#${id}`}
                  onClick={(e) => scrollToElement(id, e)}
                  className={`${styles.tocLink} ${activeId === id ? styles.active : ''}`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className={styles.indicator}></span>
                  <span className={styles.linkLabel}>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <button 
          className={styles.toggleButton} 
          onClick={() => onToggle(!isExpanded)}
          onMouseEnter={() => setIsProximity(false)}
          aria-label={isExpanded ? "Collapse Table of Contents" : "Expand Table of Contents"}
          aria-expanded={isExpanded}
        >
          {isExpanded ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          )}
        </button>
      </nav>
    </>
  );
};
