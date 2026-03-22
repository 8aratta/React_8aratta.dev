import React, { useState } from 'react';
import { ModelViewer } from '../../..';
import { useTheme } from '../../../../contexts';
import styles from './Workspace.module.css';

const MODEL_PATH = `${process.env.PUBLIC_URL}/assets/models/Workspace.glb`;

type WorkspaceProps = {
    camera?: { position: [number, number, number]; fov: number };
    environment?: string;
    showHints?: boolean;
};

function Workspace({ camera, environment, showHints }: WorkspaceProps) {
    const { theme } = useTheme();
    const [ready, setReady] = useState(false);

    return (
        <div className={styles.workspacePage} data-theme={theme}>
            <div className={styles.canvasWrapper}>
                <ModelViewer
                    modelPath={MODEL_PATH}
                    camera={camera ? { position: camera.position as [number, number, number], fov: camera.fov } : { position: [45, 45, 45], fov: 50 }}
                    rotation={[0, Math.PI, 0]}
                    controls={{
                        enablePan: true,
                        enableZoom: true,
                        enableRotate: true,
                        target: [0, 10, 0],
                        minDistance: 20,
                        maxDistance: 80,
                        panLimits: {
                            x: [-10, 10],
                            y: [-5, 15],
                            z: [-10, 10],
                        },
                        minPolarAngle: Math.PI / 6,
                        maxPolarAngle: Math.PI / 2,
                        minAzimuthAngle: -Math.PI / 25,
                        maxAzimuthAngle: Math.PI / 2,
                    }}
                    lighting={{
                        ambientIntensity: 0.4,
                        directionalPosition: [10, 10, 10],
                        directionalIntensity: 1,
                    }}
                    environment={environment || (theme === 'dark' ? 'night' : 'apartment')}
                    onReady={() => setReady(true)}
                />
            </div>

            {/* Hint overlay */}
            {ready && (showHints !== false) && (
                <div className={styles.infoOverlay}>
                    <p className={styles.infoText}>Drag to rotate · Scroll to zoom</p>
                    <p className={styles.infoText}>This is just a preview im still modelling</p>
                </div>
            )}
        </div>
    );
}

export default Workspace;
