import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  useGLTF,
  Environment,
  useProgress,
  Html,
} from '@react-three/drei';
import { useClampedControls, type PanLimits } from '../../hooks/useClampedControls';
import styles from './ModelViewer.module.css';

/* ────────────────────────────────────────────────────────── */
/*  Types                                                     */
/* ────────────────────────────────────────────────────────── */

export interface CameraConfig {
  /** World-space position  (default: [4, 3, 4]) */
  position?: [x: number, y: number, z: number];
  /** Vertical field-of-view in degrees (default: 50) */
  fov?: number;
}

export interface ControlsConfig {
  /** Allow panning (default: true) */
  enablePan?: boolean;
  /** Allow zooming (default: true) */
  enableZoom?: boolean;
  /** Allow rotating (default: true) */
  enableRotate?: boolean;
  /** Auto-rotate the camera (default: false) */
  autoRotate?: boolean;
  /** Speed of auto-rotation (default: 1) */
  autoRotateSpeed?: number;
  /** Orbit target point (default: [0, 0, 0]) */
  target?: [x: number, y: number, z: number];
  /** Minimum zoom distance */
  minDistance?: number;
  /** Maximum zoom distance */
  maxDistance?: number;
  /** Minimum vertical angle in radians */
  minPolarAngle?: number;
  /** Maximum vertical angle in radians */
  maxPolarAngle?: number;
  /** Minimum horizontal angle in radians */
  minAzimuthAngle?: number;
  /** Maximum horizontal angle in radians */
  maxAzimuthAngle?: number;
  /** Clamp the pan target within these axis bounds */
  panLimits?: PanLimits;
}

export interface LightingConfig {
  /** Ambient light intensity (default: 0.4) */
  ambientIntensity?: number;
  /** Directional light position (default: [5, 5, 5]) */
  directionalPosition?: [x: number, y: number, z: number];
  /** Directional light intensity (default: 1) */
  directionalIntensity?: number;
}

export interface ModelViewerProps {
  /** Path to a .glb / .gltf model (relative to public or absolute URL) */
  modelPath: string;
  /** Camera settings */
  camera?: CameraConfig;
  /** Model rotation in radians [x, y, z] (default: [0, 0, 0]) */
  rotation?: [x: number, y: number, z: number];
  /** OrbitControls settings */
  controls?: ControlsConfig;
  /** Lighting settings */
  lighting?: LightingConfig;
  /** drei Environment preset (e.g. 'night', 'apartment', 'sunset') */
  environment?: string;
  /** Callback when the Canvas is ready */
  onReady?: () => void;
  /** Extra CSS class applied to the root wrapper */
  className?: string;
}

/* ────────────────────────────────────────────────────────── */
/*  Internal sub-components (rendered inside Canvas)          */
/* ────────────────────────────────────────────────────────── */

function Model({ path, rotation }: { path: string; rotation?: [number, number, number] }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} rotation={rotation ?? [0, 0, 0]} />;
}

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className={styles.loader}>
        <span className={styles.loaderText}>Loading</span>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </Html>
  );
}

function SceneControls({ config }: { config: ControlsConfig }) {
  const controlsRef = useClampedControls(config.panLimits);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={config.enablePan ?? true}
      enableZoom={config.enableZoom ?? true}
      enableRotate={config.enableRotate ?? true}
      autoRotate={config.autoRotate ?? false}
      autoRotateSpeed={config.autoRotateSpeed ?? 1}
      target={config.target}
      minDistance={config.minDistance}
      maxDistance={config.maxDistance}
      minPolarAngle={config.minPolarAngle}
      maxPolarAngle={config.maxPolarAngle}
      minAzimuthAngle={config.minAzimuthAngle}
      maxAzimuthAngle={config.maxAzimuthAngle}
    />
  );
}

/* ────────────────────────────────────────────────────────── */
/*  Public component                                          */
/* ────────────────────────────────────────────────────────── */

export function ModelViewer({
  modelPath,
  camera = {},
  rotation,
  controls = {},
  lighting = {},
  environment,
  onReady,
  className,
}: ModelViewerProps) {
  const {
    position: cameraPos = [4, 3, 4],
    fov = 50,
  } = camera;

  const {
    ambientIntensity = 0.4,
    directionalPosition = [5, 5, 5],
    directionalIntensity = 1,
  } = lighting;

  return (
    <div className={`${styles.modelViewerRoot} ${className ?? ''}`}>
      <Canvas
        camera={{ position: cameraPos, fov }}
        onCreated={() => onReady?.()}
      >
        <ambientLight intensity={ambientIntensity} />
        <directionalLight
          position={directionalPosition}
          intensity={directionalIntensity}
        />

        {environment && <Environment preset={environment as any} />}

        <Suspense fallback={<Loader />}>
          <Model path={modelPath} rotation={rotation} />
        </Suspense>

        <SceneControls config={controls} />
      </Canvas>
    </div>
  );
}
