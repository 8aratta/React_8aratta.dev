import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';
import { useTheme } from '../../contexts';
import { useIsMobile } from '../../hooks';
import { CircularMenu } from '@8aratta/circular-menu';
import './CircularMenu.css';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/projects', label: 'Projects' },
];

function Navigation() {
  const [time, setTime] = useState(new Date());
  const [hidden, setHidden] = useState(false);
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let lastScrollY = 0;

    const onScroll = (e: Event) => {
      const target = e.target as Element | Document;
      const currentScrollY =
        target === document || target === document.documentElement || target === document.body
          ? window.scrollY
          : (target as Element).scrollTop;
      setHidden(currentScrollY > lastScrollY && currentScrollY > 60);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    return () => window.removeEventListener('scroll', onScroll, { capture: true });
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const logo =
    theme === 'dark'
      ? '/assets/images/logo_white.png'
      : '/assets/images/logo.png';

  return (
    <nav className={styles.nav} data-theme={theme} data-hidden={hidden}>
      <div className={styles.leftSection}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="8aratta" draggable="false" />
        </Link>
        <span className={styles.clock}>{formatTime(time)}</span>
      </div>
      <CircularMenu
        radius={130}
        links={NAV_LINKS}
        renderLink={(link, linkProps) => (
          <Link to={link.to} {...linkProps}>{link.label}</Link>
        )}
        openIcon={
          <img
            src={theme === 'dark' ? '/assets/images/menu_white(san).png' : '/assets/images/menu(san).png'}
            alt="Open menu"
            draggable="false"
          />
        }
        closeIcon={
          <img
            src={theme === 'dark' ? '/assets/images/menu_white(batsu).png' : '/assets/images/menu(batsu).png'}
            alt="Close menu"
            draggable="false"
          />
        }
        theme={theme}
        carousel={isMobile}
        snap={isMobile}
        emphasize={isMobile ? 225 : false}
        emphasisScale={isMobile ? 1.35 : undefined}
        neutralScale={isMobile ? 0.33 : undefined}
        angle={isMobile ? 'bottom' : 220}
        carryMomentum
        introSpin
      />
    </nav>
  );
}

export default Navigation;
