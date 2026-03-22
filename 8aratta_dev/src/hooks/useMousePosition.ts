import { useState, useCallback, useRef, useEffect } from 'react';
import { MousePosition } from '../types';

/**
 * Hook to track normalized mouse position within an element
 * Returns values between 0 and 1 for both x and y
 * Includes smooth interpolation for fluid transitions
 */
export function useMousePosition(smoothing: number = 0.1) {
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0.5, y: 0.5 });
  const targetPos = useRef<MousePosition>({ x: 0.5, y: 0.5 });
  const animationFrameId = useRef<number | null>(null);

  // Smooth interpolation animation loop
  useEffect(() => {
    const animate = () => {
      setMousePos((current) => {
        const dx = targetPos.current.x - current.x;
        const dy = targetPos.current.y - current.y;

        // If close enough, snap to target to prevent infinite animation
        if (Math.abs(dx) < 0.001 && Math.abs(dy) < 0.001) {
          return targetPos.current;
        }

        // Lerp (linear interpolation) towards target
        return {
          x: current.x + dx * smoothing,
          y: current.y + dy * smoothing,
        };
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [smoothing]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    targetPos.current = { x, y };
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Smoothly return to center when mouse leaves
    targetPos.current = { x: 0.5, y: 0.5 };
  }, []);

  return {
    mousePos,
    handleMouseMove,
    handleMouseLeave,
  };
}
