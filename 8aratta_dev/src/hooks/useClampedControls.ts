import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export interface PanLimits {
  x?: [min: number, max: number];
  y?: [min: number, max: number];
  z?: [min: number, max: number];
}

/**
 * Hook that clamps the OrbitControls target within the given bounds every frame.
 * Attach the returned `ref` to an `<OrbitControls>` instance.
 *
 * @example
 * ```tsx
 * const controlsRef = useClampedControls({
 *   x: [-10, 10],
 *   y: [-5, 15],
 *   z: [-10, 10],
 * });
 * return <OrbitControls ref={controlsRef} />;
 * ```
 */
export function useClampedControls(limits?: PanLimits) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = useRef<any>(null);

  useFrame(() => {
    if (!controlsRef.current || !limits) return;

    const target = controlsRef.current.target;

    if (limits.x) {
      target.x = Math.max(limits.x[0], Math.min(limits.x[1], target.x));
    }
    if (limits.y) {
      target.y = Math.max(limits.y[0], Math.min(limits.y[1], target.y));
    }
    if (limits.z) {
      target.z = Math.max(limits.z[0], Math.min(limits.z[1], target.z));
    }
  });

  return controlsRef;
}
