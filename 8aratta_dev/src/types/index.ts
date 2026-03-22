// Mouse and position types
export interface MousePosition {
  x: number;
  y: number;
}

export interface RotationValues {
  rotationX: number;
  rotationY: number;
  rotationZ: number;
}

// Gradient configuration types
export interface GradientConfig {
  colors: {
    color1: string;
    color2: string;
    color3: string;
  };
  baseRotation: RotationValues;
  animation: {
    speed: number;
    density: number;
    strength: number;
  };
  camera: {
    azimuthAngle: number;
    polarAngle: number;
    distance: number;
    zoom: number;
  };
}
