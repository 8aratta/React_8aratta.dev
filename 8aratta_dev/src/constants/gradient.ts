import { GradientConfig } from '../types';

// Dark theme gradient configuration (default)
export const DARK_GRADIENT_CONFIG: GradientConfig = {
  colors: {
    color1: '#888888',
    color2: '#555555',
    color3: '#000000',
  },
  baseRotation: {
    rotationX: 0,
    rotationY: 0,
    rotationZ: 45,
  },
  animation: {
    speed: 0.3,
    density: 5,
    strength: 0.8,
  },
  camera: {
    azimuthAngle: 180,
    polarAngle: 90,
    distance: 1,
    zoom: 8,
  },
};

// Light theme gradient configuration (inverted colors)
export const LIGHT_GRADIENT_CONFIG: GradientConfig = {
  colors: {
    color1: '#ffffff',
    color2: '#dddddd',
    color3: '#8f8f8f',
  },
  baseRotation: {
    rotationX: 0,
    rotationY: 0,
    rotationZ: 45,
  },
  animation: {
    speed: 0.3,
    density: 5,
    strength: 0.8,
  },
  camera: {
    azimuthAngle: 180,
    polarAngle: 90,
    distance: 1,
    zoom: 8,
  },
};

// Default gradient configuration (dark theme)
export const DEFAULT_GRADIENT_CONFIG = DARK_GRADIENT_CONFIG;

// Mouse interaction sensitivity
export const MOUSE_SENSITIVITY = {
  rotationX: -45,
  rotationY: 45,
  rotationZ: 45,
};

// Mouse movement smoothing (0.1 = smooth, 1.0 = instant)
// Lower values = smoother but slower response
// Higher values = faster but less smooth
export const MOUSE_SMOOTHING = 0.1;
