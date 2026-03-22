import React, { useState, useCallback } from 'react';
import { useMousePosition, useGradientRotation } from '../../hooks';
import { GradientBackground, MaskIntro } from '../../components';
import { DEFAULT_GRADIENT_CONFIG, MOUSE_SMOOTHING } from '../../constants/gradient';
import { useTheme } from '../../contexts';
import styles from './Home.module.css';


function Home() {
  const { theme } = useTheme();
  const [introComplete, setIntroComplete] = useState(() => sessionStorage.getItem('maskIntroSeen') === 'true');

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem('maskIntroSeen', 'true');
    setIntroComplete(true);
  }, []);
  const { mousePos, handleMouseMove, handleMouseLeave } = useMousePosition(MOUSE_SMOOTHING);
  const rotation = useGradientRotation({
    mousePos,
    baseRotation: DEFAULT_GRADIENT_CONFIG.baseRotation,
  });

  // Choose mask color based on theme, or set any color you want
  const maskColor = theme === 'dark' ? '#fff' : '#000';
  const maskImage = `/assets/images/MaskIntro.gif`;

  return (
    <div
      className={styles.container}
      data-theme={theme}
      data-animate={introComplete}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3-D mask fly-through intro */}
      {!introComplete && (
        <MaskIntro
          onComplete={handleIntroComplete}
          backgroundColor={maskColor}
          mask={maskImage}
        />
      )}

      <GradientBackground rotation={rotation} />
      {/* Render the page after intro lol */}
      {introComplete && (
        <>
          <div className={styles.heroImageContainer}>
            <img src="/assets/images/enso.png" alt="" className={styles.ensoBackground} aria-hidden="true" draggable="false" />
            <img src="/assets/images/Me.png" alt="Domenico Baratta" className={styles.heroImage} loading="lazy" draggable="false" />
          </div>

          <div className={styles.heroText}>
            <h1 className={styles.heroName}>
              <span>Barat<span className={styles.spacedT}>t</span>a</span>
              <span>Domenico</span>
            </h1>

            <h2 className={styles.heroDescription}>
              <span>Developer</span>
            </h2>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;