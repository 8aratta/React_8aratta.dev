import React, { useState, useEffect } from 'react';
import { CircularMenu } from '@8aratta/circular-menu';
import { DemoWindowSettings } from '../DemoWindowSettings';
import styles from '../DemoWindowSettings.module.css';

const demoLinks = [
  { to: '#1', label: 'Link 1' },
  { to: '#2', label: 'Link 2' },
  { to: '#3', label: 'Link 3' },
  { to: '#4', label: 'Link 4' },
  { to: '#5', label: 'Link 5' },
];

type CircularMenuDemoProps = {
  theme?: string;
};

export const CircularMenuDemo: React.FC<CircularMenuDemoProps> = ({ theme }) => {
  const [itemCount, setItemCount] = useState<number>(4);
  const [radius, setRadius] = useState<number>(130);
  const [carousel, setCarousel] = useState<boolean>(false);
  const [snap, setSnap] = useState<boolean>(false);
  const [menuTheme, setMenuTheme] = useState<'light' | 'dark'>(theme === 'dark' ? 'dark' : 'light');
  const [emphasize, setEmphasize] = useState<number>(225);
  const [angle, setAngle] = useState<number>(220);
  const [carryMomentum, setCarryMomentum] = useState<boolean>(true);
  const [introSpin, setIntroSpin] = useState<boolean>(true);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  const isDark = menuTheme === 'dark';
  const barBg = isDark ? '#222' : '#f7f7f7';
  const barText = isDark ? '#fff' : '#222';

  return (
    <div style={{ display: 'flex', minHeight: '280px', width: '100%' }}>
      <DemoWindowSettings theme={theme}>
        <div className={styles.controlRow}>
          <span className={styles.controlLabel}>Theme</span>
          <select
            value={menuTheme}
            onChange={e => setMenuTheme(e.target.value as 'light' | 'dark')}
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
            min={2}
            max={5}
            value={itemCount}
            onChange={e => setItemCount(Number(e.target.value))}
          />
        </div>
        <div className={styles.controlRow}>
          <span className={styles.controlLabel}>Radius: {radius}px</span>
          <input
            type="range"
            min={80}
            max={200}
            value={radius}
            onChange={e => setRadius(Number(e.target.value))}
          />
        </div>
        <div className={styles.controlRow}>
          <span className={styles.controlLabel}>Emphasize: {emphasize}°</span>
          <input
            type="range"
            min={0}
            max={360}
            step={15}
            value={emphasize}
            onChange={e => setEmphasize(Number(e.target.value))}
          />
        </div>
        <div className={styles.controlRow}>
          <span className={styles.controlLabel}>Angle: {angle}°</span>
          <input
            type="range"
            min={0}
            max={360}
            step={15}
            value={angle}
            onChange={e => setAngle(Number(e.target.value))}
          />
        </div>
        <div className={styles.controlRow}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
            <input
              type="checkbox"
              checked={introSpin}
              onChange={e => setIntroSpin(e.target.checked)}
            />
            Intro Spin
          </label>
        </div>
        <div className={styles.controlRow}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
            <input
              type="checkbox"
              checked={carousel}
              onChange={e => setCarousel(e.target.checked)}
            />
            Carousel Mode
          </label>
        </div>
        {carousel && (
          <div className={styles.controlRow}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
              <input
                type="checkbox"
                checked={snap}
                onChange={e => setSnap(e.target.checked)}
              />
              Snap
            </label>
          </div>
        )}
                {carousel && (
          <div className={styles.controlRow}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
              <input
                type="checkbox"
                checked={carryMomentum}
                onChange={e => setCarryMomentum(e.target.checked)}
              />
              Carry Momentum
            </label>
          </div>
        )}
      </DemoWindowSettings>

      {/* Demo area */}
      <div
        style={{
          flex: '1 1 0',
          minWidth: 0,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'stretch',
          padding: '1rem',
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <nav
          style={{
            width: '100%',
            minWidth: 0,
            alignSelf: 'stretch',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: barBg,
            borderRadius: 6,
            padding: '0 1.5rem',
            boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            height: 48,
            boxSizing: 'border-box',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontWeight: 600, fontSize: '1rem', color: barText }}>Logo</span>
            <span style={{ fontSize: '0.85rem', color: barText, opacity: 0.7 }}>{formatTime(time)}</span>
          </div>
          <CircularMenu
            links={demoLinks.slice(0, itemCount)}
            radius={radius}
            carousel={carousel}
            snap={snap}
            theme={menuTheme}
            emphasize={emphasize}
            angle={angle}
            carryMomentum={carryMomentum}
            introSpin={introSpin}
            renderLink={(link, linkProps) => {
              const { onClick, ...restLinkProps } = linkProps;
              return (
                <a
                  href={link.to}
                  {...restLinkProps}
                  onClick={event => {
                    event.preventDefault();
                    onClick?.(event);
                  }}
                >
                  {link.label}
                </a>
              );
            }}
            openIcon={<span style={{ fontSize: '1.2rem', color: barText }}>☰</span>}
            closeIcon={<span style={{ fontSize: '1.2rem', color: barText }}>✖</span>}
          />
        </nav>
      </div>
    </div>
  );
};
