import React from 'react';
import { MousePosition, RotationValues } from '../../types';
import styles from './DebugPanel.module.css';

interface DebugPanelProps {
  mousePos: MousePosition;
  rotation: RotationValues;
  visible?: boolean;
}

/**
 * Debug panel showing mouse position and rotation values
 */
export function DebugPanel({
  mousePos,
  rotation,
  visible = true,
}: DebugPanelProps) {
  if (!visible) return null;

  return (
    <div className={styles.panel}>
      <div className={styles.section}>
        <strong>Mouse Position</strong>
        <div>X: {mousePos.x.toFixed(3)}</div>
        <div>Y: {mousePos.y.toFixed(3)}</div>
      </div>
      <hr className={styles.divider} />
      <div className={styles.section}>
        <strong>Rotation Values</strong>
        <div>rotationX: {rotation.rotationX.toFixed(2)}</div>
        <div>rotationY: {rotation.rotationY.toFixed(2)}</div>
        <div>rotationZ: {rotation.rotationZ.toFixed(2)}</div>
      </div>
    </div>
  );
}
