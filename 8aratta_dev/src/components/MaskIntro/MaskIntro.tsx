import React, {
    useRef,
    useState,
    useEffect,
    useMemo,
    useCallback,
    Suspense,
} from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { parseGIF, decompressFrames } from 'gifuct-js';

/* ── Config ──────────────────────────────────────────────── */

/** Distance from origin to camera along Z */
const CAMERA_Z = 30;
/** Milliseconds to wait before the fly-through starts */
const ANIMATION_DELAY_MS = 1000;
/** Duration of the fly-through in seconds */
const ANIMATION_DURATION = 3;
/** Total Z-distance the plane travels (must exceed CAMERA_Z) */
const TRAVEL_DISTANCE = 38;

/* ── Shader: texture-based mask with complex hole shape ──── */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform sampler2D uMask;
  uniform float uTextureAspect;  // width / height of the PNG
  uniform float uViewportAspect; // width / height of the viewport
  uniform float uLogoScale;      // how much of the plane the logo occupies
  varying vec2 vUv;

  void main() {
    // Center UV so (0,0) is the middle
    vec2 centered = vUv - 0.5;

    // Correct for the mismatch between viewport and texture aspect ratios
    float aspectCorrection = uViewportAspect / uTextureAspect;
    if (aspectCorrection > 1.0) {
      centered.x *= aspectCorrection;
    } else {
      centered.y /= aspectCorrection;
    }

    // Scale down so the logo occupies a smaller region
    centered /= uLogoScale;

    // Shift back to 0..1 UV range
    vec2 correctedUv = centered + 0.5;

    // Outside the texture bounds → solid wall
    if (correctedUv.x < 0.0 || correctedUv.x > 1.0 ||
        correctedUv.y < 0.0 || correctedUv.y > 1.0) {
      gl_FragColor = vec4(uColor, 1.0);
      return;
    }

    vec4 maskSample = texture2D(uMask, correctedUv);

    // Opaque logo pixels → hole (alpha = 0), transparent → solid wall (alpha = 1)
    float alpha = 1.0 - maskSample.a;
    alpha = smoothstep(0.05, 0.95, alpha);

    gl_FragColor = vec4(uColor, alpha);
  }
`;

/* ── Internal: animated mask plane ───────────────────────── */

interface AnimatedMaskProps {
    maskColor: string;
    mask: string;
    logoScale?: number;
    onLoaded: () => void;
    onComplete: () => void;
    beforeStart?: () => void;
}

function useAnimatedGifTexture(mask: string) {
    const [texture, setTexture] = useState<THREE.Texture | null>(null);
    // Use refs so useFrame always sees the latest values (avoids stale closures)
    const textureRef = useRef<THREE.Texture | null>(null);
    const readyRef = useRef(false);
    const frameIndex = useRef(0);
    const frames = useRef<Uint8ClampedArray[]>([]);
    const frameDelays = useRef<number[]>([]);
    const lastFrameTime = useRef<number>(0);
    const isGif = mask.endsWith('.gif');

    useEffect(() => {
        if (!isGif) return;
        // Reset on mask change
        textureRef.current = null;
        readyRef.current = false;
        frameIndex.current = 0;
        frames.current = [];
        frameDelays.current = [];
        lastFrameTime.current = 0;
        setTexture(null);

        fetch(mask)
            .then(res => res.arrayBuffer())
            .then(buffer => {
                const gif = parseGIF(buffer);
                const gifFrames = decompressFrames(gif, true);
                // FORCE 30fps: all frame delays = 3cs (30fps)
                frameDelays.current = gifFrames.map(() => 2);
                const width = gifFrames[0].dims.width;
                const height = gifFrames[0].dims.height;
                // Build full composited frames
                const fullFrames: Uint8ClampedArray[] = [];
                let prevImageData = new Uint8ClampedArray(width * height * 4);
                for (let i = 0; i < gifFrames.length; i++) {
                    const frame = gifFrames[i];
                    const imageData = new Uint8ClampedArray(prevImageData);
                    const { left, top, width: fw, height: fh } = frame.dims;
                    for (let row = 0; row < fh; row++) {
                        for (let col = 0; col < fw; col++) {
                            const srcIdx = (row * fw + col) * 4;
                            const dstIdx = ((row + top) * width + (col + left)) * 4;
                            imageData[dstIdx]     = frame.patch[srcIdx];
                            imageData[dstIdx + 1] = frame.patch[srcIdx + 1];
                            imageData[dstIdx + 2] = frame.patch[srcIdx + 2];
                            imageData[dstIdx + 3] = frame.patch[srcIdx + 3];
                        }
                    }
                    fullFrames.push(imageData);
                    prevImageData = imageData;
                }
                frames.current = fullFrames;

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                if (!ctx) return;
                ctx.putImageData(new ImageData(new Uint8ClampedArray(fullFrames[0]), width, height), 0, 0);

                const tex = new THREE.Texture(canvas);
                tex.minFilter = THREE.LinearFilter;
                tex.magFilter = THREE.LinearFilter;
                tex.generateMipmaps = false;
                tex.needsUpdate = true;

                // Store in refs first so useFrame sees them immediately
                // Initialise lastFrameTime to NOW so useFrame doesn't burst-advance
                // all frames on startup (performance.now() >> 0 would satisfy every delay check)
                lastFrameTime.current = performance.now();
                textureRef.current = tex;
                readyRef.current = true;
                setTexture(tex); // also trigger re-render so AnimatedMask gets the texture
            });
    }, [mask, isGif]);

    useFrame(() => {
        // Read from refs — never stale
        if (!isGif || !textureRef.current || !readyRef.current || frames.current.length < 2) return;
        const now = performance.now();
        const delays = frameDelays.current;
        // GIF delay is in centiseconds → multiply by 10 for ms
        const delayMs = (delays[frameIndex.current] ?? 10) * 10;
        if (now - lastFrameTime.current >= delayMs) {
            lastFrameTime.current = now;
            // Only advance if not at last frame
            if (frameIndex.current < frames.current.length - 1) {
                frameIndex.current = frameIndex.current + 1;
                const canvas = textureRef.current.image as HTMLCanvasElement;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.putImageData(
                        new ImageData(new Uint8ClampedArray(frames.current[frameIndex.current]), canvas.width, canvas.height),
                        0, 0,
                    );
                    textureRef.current.needsUpdate = true;
                }
            }
        }
    });

    return isGif ? texture : null;
}

function AnimatedMask({ maskColor, mask, logoScale = 0.3, onLoaded, onComplete, beforeStart }: AnimatedMaskProps) {
    // Always call hooks in the same order
    const gifTexture = useAnimatedGifTexture(mask);
    const staticTexture = useTexture(mask);
    const texture = gifTexture || staticTexture;

    const meshRef = useRef<THREE.Mesh>(null!);
    const startTimeRef = useRef<number | null>(null);
    const completedRef = useRef(false);
    const [animating, setAnimating] = useState(false);
    const { viewport } = useThree();

    /* Ensure the static texture stretches cleanly without mipmap artifacts */
    useEffect(() => {
        staticTexture.minFilter = THREE.LinearFilter;
        staticTexture.magFilter = THREE.LinearFilter;
        staticTexture.generateMipmaps = false;
    }, [staticTexture]);

    const img = texture?.image as HTMLImageElement | HTMLCanvasElement | undefined;
    const textureAspect = img ? img.width / img.height : 1;
    const viewportAspect = viewport.width / viewport.height;

    /*
     * Create uniforms ONCE (stable object reference).
     * Never replace the object — mutate .value in-place instead.
     * Replacing the whole uniforms object on an already-compiled ShaderMaterial
     * does not reliably update the GPU texture binding in Three.js / R3F.
     */
    const uniforms = useMemo(() => ({
        uColor:         { value: new THREE.Color(maskColor) },
        uMask:          { value: texture as THREE.Texture },
        uTextureAspect: { value: textureAspect },
        uViewportAspect:{ value: viewportAspect },
        uLogoScale:     { value: logoScale ?? 0.3 },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }), []); // intentionally empty — values kept fresh via effects below

    /* Keep each uniform value in sync by mutating in-place */
    useEffect(() => { uniforms.uColor.value.set(maskColor); }, [maskColor, uniforms]);
    useEffect(() => {
        if (texture) {
            uniforms.uMask.value = texture;
            uniforms.uTextureAspect.value = textureAspect;
        }
    }, [texture, textureAspect, uniforms]);
    useEffect(() => { uniforms.uViewportAspect.value = viewportAspect; }, [viewportAspect, uniforms]);
    useEffect(() => { uniforms.uLogoScale.value = logoScale ?? 0.3; }, [logoScale, uniforms]);

    /* Size the plane to cover the full viewport with overflow */
    const planeWidth = viewport.width * 1.3;
    const planeHeight = viewport.height * 1.3;

    useEffect(() => { onLoaded(); }, [onLoaded]);
    useEffect(() => { if (beforeStart) beforeStart(); }, [beforeStart]);

    /* Begin the fly-through after a short pause */
    useEffect(() => {
        const id = setTimeout(() => setAnimating(true), ANIMATION_DELAY_MS);
        return () => clearTimeout(id);
    }, []);

    /* Per-frame animation: move plane toward (and past) the camera */
    useFrame((state) => {
        if (!animating || !meshRef.current || completedRef.current) return;

        if (startTimeRef.current === null) {
            startTimeRef.current = state.clock.elapsedTime;
        }

        const elapsed = state.clock.elapsedTime - startTimeRef.current;
        const t = Math.min(elapsed / ANIMATION_DURATION, 1);

        /* Cubic ease-in → slow start, fast finish (swooping toward user) */
        const eased = t * t * t;

        meshRef.current.position.z = eased * TRAVEL_DISTANCE;

        /* Scale up as it approaches the camera so edges stay covered */
        const scale = 1 + eased * 4;
        meshRef.current.scale.set(scale, scale, 1);

        if (t >= 1 && !completedRef.current) {
            completedRef.current = true;
            onComplete();
        }
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[planeWidth, planeHeight]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
                depthWrite={false}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

// Preload mask texture if desired (optional)

/* ── Public component ────────────────────────────────────── */


export interface MaskIntroProps {
    onComplete: () => void;
    beforeStart?: () => void;
    backgroundColor: string;
    mask: string;
    logoScale?: number;
}

export function MaskIntro({ onComplete, beforeStart, backgroundColor, mask, logoScale }: MaskIntroProps) {
    const [modelReady, setModelReady] = useState(false);
    const handleLoaded = useCallback(() => setModelReady(true), []);

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                pointerEvents: 'none',
                background: modelReady ? 'transparent' : backgroundColor,
                transition: 'background 0.15s ease',
            }}
        >
            <Canvas
                camera={{ position: [0, 0, CAMERA_Z], fov: 90 }}
                gl={{ alpha: true }}
                style={{ background: 'transparent' }}
            >
                <Suspense fallback={null}>
                    <AnimatedMask
                        maskColor={backgroundColor}
                        mask={mask}
                        logoScale={logoScale}
                        onLoaded={handleLoaded}
                        onComplete={onComplete}
                        beforeStart={beforeStart}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}
