import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './ScrollReveal.module.css';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-in' | 'blur-in' | 'scale-in';
  delay?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  animation = 'fade-up',
  delay = 0,
  threshold = 0.1,
  triggerOnce = true
}) => {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>({ threshold, triggerOnce });

  const customStyle: React.CSSProperties = {
    transitionDelay: `${delay}ms`,
  };

  const combinedClassName = `
    ${styles.revealBase} 
    ${styles[animation]} 
    ${isVisible ? styles.visible : ''} 
    ${className}
  `.trim();

  return (
    <div ref={ref} className={combinedClassName} style={customStyle}>
      {children}
    </div>
  );
};
