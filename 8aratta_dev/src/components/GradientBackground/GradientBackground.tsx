import React from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { RotationValues, GradientConfig } from '../../types';
import { DARK_GRADIENT_CONFIG, LIGHT_GRADIENT_CONFIG } from '../../constants/gradient';
import { useTheme } from '../../contexts';

interface GradientBackgroundProps {
  rotation: RotationValues;
  config?: Partial<GradientConfig>;
}

/**
 * Animated shader gradient background component
 */
export function GradientBackground({
  rotation,
  config = {},
}: GradientBackgroundProps) {
  const { theme } = useTheme();
  
  const baseConfig = theme === 'dark' ? DARK_GRADIENT_CONFIG : LIGHT_GRADIENT_CONFIG;
  
  const mergedConfig = {
    ...baseConfig,
    ...config,
    colors: { ...baseConfig.colors, ...config.colors },
    animation: { ...baseConfig.animation, ...config.animation },
    camera: { ...baseConfig.camera, ...config.camera },
  };

  return (
    <ShaderGradientCanvas
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
      pointerEvents='none'
    >
      <ShaderGradient
        control='props'
        animate='on'
        brightness={1}
        cAzimuthAngle={mergedConfig.camera.azimuthAngle}
        cDistance={mergedConfig.camera.distance}
        cPolarAngle={mergedConfig.camera.polarAngle}
        cameraZoom={mergedConfig.camera.zoom}
        color1={mergedConfig.colors.color1}
        color2={mergedConfig.colors.color2}
        color3={mergedConfig.colors.color3}
        envPreset='city'
        grain='on'
        lightType='3d'
        positionX={0}
        positionY={0}
        positionZ={0}
        reflection={0.1}
        rotationX={rotation.rotationX}
        rotationY={rotation.rotationY}
        rotationZ={rotation.rotationZ}
        type='waterPlane'
        uDensity={mergedConfig.animation.density}
        uSpeed={mergedConfig.animation.speed}
        uStrength={mergedConfig.animation.strength}
        uTime={8}
      />
    </ShaderGradientCanvas>
  );
}
