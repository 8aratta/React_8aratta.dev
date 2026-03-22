import { useMemo } from 'react';
import { MousePosition, RotationValues } from '../types';
import { MOUSE_SENSITIVITY } from '../constants/gradient';

interface UseGradientRotationProps {
  mousePos: MousePosition;
  baseRotation: RotationValues;
}

/**
 * Hook to calculate gradient rotation based on mouse position
 */
export function useGradientRotation({
  mousePos,
  baseRotation,
}: UseGradientRotationProps): RotationValues {
  const rotation = useMemo(() => {
    const offsetX = mousePos.x - 0.5;
    const offsetY = mousePos.y - 0.5;

    return {
      rotationX: baseRotation.rotationX + offsetY * MOUSE_SENSITIVITY.rotationX,
      rotationY: baseRotation.rotationY + offsetX * MOUSE_SENSITIVITY.rotationY,
      rotationZ: baseRotation.rotationZ + offsetX * MOUSE_SENSITIVITY.rotationZ,
    };
  }, [mousePos, baseRotation]);

  return rotation;
}
