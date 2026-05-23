import React, { useEffect, useRef } from 'react';
import * as HandsNS from '@mediapipe/hands';
import * as CameraNS from '@mediapipe/camera_utils';
import * as DrawingNS from '@mediapipe/drawing_utils';

// MediaPipe compatibility
const Hands = HandsNS.Hands || window.Hands;
const HAND_CONNECTIONS =
    HandsNS.HAND_CONNECTIONS || window.HAND_CONNECTIONS;

const Camera = CameraNS.Camera || window.Camera;

const drawConnectors =
    DrawingNS.drawConnectors || window.drawConnectors;

const drawLandmarks =
    DrawingNS.drawLandmarks || window.drawLandmarks;

const HandTracker = ({
    onGestureDetected,
    glowColor
}) => {

    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    // Current stable gesture
    const currentDetectedRef = useRef('neutral');

    // Previous landmarks for smoothing
    const prevLandmarksRef = useRef(null);

    // Gesture persistence
    const gestureStateRef = useRef({
        current: 'neutral',
        candidate: 'neutral',
        frames: 0,
        lastSeen: {
            gesture: 'neutral',
            time: 0
        }
    });

    const glowColorRef = useRef(glowColor);

    useEffect(() => {
        glowColorRef.current = glowColor;
    }, [glowColor]);

    useEffect(() => {

        if (!Hands || !Camera) {
            console.error('MediaPipe not loaded');
            return;
        }

        let isStopped = false;
        let camera = null;

        const videoElement = videoRef.current;
        const canvasElement = canvasRef.current;

        if (!videoElement || !canvasElement) return;

        const canvasCtx = canvasElement.getContext('2d');

        // --------------------------
        // MEDIAPIPE
        // --------------------------

        const hands = new Hands({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/${file}`;
            }
        });

        hands.setOptions({
            maxNumHands: 2,
            modelComplexity: 1,

            // LOWERED FOR STABILITY
            minDetectionConfidence: 0.55,
            minTrackingConfidence: 0.45
        });

        // --------------------------
        // LANDMARK SMOOTHING
        // --------------------------

        const smoothLandmarks = (
            prev,
            curr,
            alpha = 0.75
        ) => {

            if (!prev) return curr;

            return curr.map((lm, i) => ({
                x:
                    prev[i].x * alpha +
                    lm.x * (1 - alpha),

                y:
                    prev[i].y * alpha +
                    lm.y * (1 - alpha),

                z:
                    prev[i].z * alpha +
                    lm.z * (1 - alpha)
            }));
        };

        // --------------------------
        // GESTURE HELPERS
        // --------------------------

        const fingerExtended = (
            lm,
            tip,
            pip
        ) => {

            return (
                lm[tip].y < lm[pip].y &&
                Math.abs(
                    lm[tip].z - lm[pip].z
                ) < 0.15
            );
        };

        const detectClosedFist = (lm) => {

            return (
                !fingerExtended(lm, 8, 6) &&
                !fingerExtended(lm, 12, 10) &&
                !fingerExtended(lm, 16, 14) &&
                !fingerExtended(lm, 20, 18)
            );
        };

        const detectOpenPalm = (lm) => {

            return (
                fingerExtended(lm, 8, 6) &&
                fingerExtended(lm, 12, 10) &&
                fingerExtended(lm, 16, 14) &&
                fingerExtended(lm, 20, 18)
            );
        };

        const detectFingerGuns = (lm) => {

            return (
                fingerExtended(lm, 8, 6) &&
                fingerExtended(lm, 4, 3) &&
                !fingerExtended(lm, 12, 10) &&
                !fingerExtended(lm, 16, 14) &&
                !fingerExtended(lm, 20, 18)
            );
        };

        const detectClawedHand = (lm) => {

            const curled =
                [8, 12, 16, 20].every((i) => {

                    const dx =
                        lm[i].x - lm[i - 2].x;

                    const dy =
                        lm[i].y - lm[i - 2].y;

                    return (
                        Math.hypot(dx, dy) < 0.06
                    );
                });

            return (
                curled &&
                !detectClosedFist(lm)
            );
        };

        const detectHandChop = (lm) => {

            return (
                detectOpenPalm(lm) &&
                Math.abs(
                    lm[8].x - lm[20].x
                ) < 0.06
            );
        };

        const detectInfiniteVoid = (lm) => {

            return (
                fingerExtended(lm, 8, 6) &&
                fingerExtended(lm, 12, 10) &&
                !fingerExtended(lm, 16, 14)
            );
        };

        const detectMalevolentShrine = (lm) => {

            return (
                fingerExtended(lm, 8, 6) &&
                fingerExtended(lm, 12, 10) &&
                fingerExtended(lm, 16, 14) &&
                fingerExtended(lm, 20, 18)
            );
        };

        const detectHandClap = (mhlm) => {

            if (mhlm.length !== 2) return false;

            const dx =
                mhlm[0][0].x - mhlm[1][0].x;

            const dy =
                mhlm[0][0].y - mhlm[1][0].y;

            return (
                Math.hypot(dx, dy) < 0.15
            );
        };

        const detectShadowPuppet = (mhlm) => {

            if (mhlm.length !== 2) return false;

            const dx =
                mhlm[0][8].x - mhlm[1][4].x;

            const dy =
                mhlm[0][8].y - mhlm[1][4].y;

            return (
                Math.hypot(dx, dy) < 0.08
            );
        };

        // --------------------------
        // MAIN RESULTS LOOP
        // --------------------------

        hands.onResults((results) => {

            if (
                isStopped ||
                !videoElement ||
                !canvasElement
            ) {
                return;
            }

            // Resize canvas
            if (
                videoElement.videoWidth > 0 &&
                videoElement.videoHeight > 0
            ) {

                if (
                    canvasElement.width !==
                        videoElement.videoWidth ||

                    canvasElement.height !==
                        videoElement.videoHeight
                ) {

                    canvasElement.width =
                        videoElement.videoWidth;

                    canvasElement.height =
                        videoElement.videoHeight;
                }
            }

            canvasCtx.save();

            canvasCtx.clearRect(
                0,
                0,
                canvasElement.width,
                canvasElement.height
            );

            let detected = 'neutral';

            // --------------------------
            // DETECTION
            // --------------------------

            if (
                results.multiHandLandmarks &&
                results.multiHandLandmarks.length > 0
            ) {

                // MULTI HAND GESTURES FIRST

                if (
                    detectHandClap(
                        results.multiHandLandmarks
                    )
                ) {

                    detected = 'boogieWoogie';
                }

                else if (
                    detectShadowPuppet(
                        results.multiHandLandmarks
                    )
                ) {

                    detected = 'tenShadows';
                }

                else {

                    let landmarks =
                        results.multiHandLandmarks[0];

                    // SMOOTH
                    landmarks =
                        smoothLandmarks(
                            prevLandmarksRef.current,
                            landmarks
                        );

                    prevLandmarksRef.current =
                        landmarks;

                    // DRAW
                    if (
                        drawConnectors &&
                        HAND_CONNECTIONS
                    ) {

                        drawConnectors(
                            canvasCtx,
                            landmarks,
                            HAND_CONNECTIONS,
                            {
                                color:
                                    glowColorRef.current,

                                lineWidth: 5
                            }
                        );
                    }

                    if (drawLandmarks) {

                        drawLandmarks(
                            canvasCtx,
                            landmarks,
                            {
                                color: '#ffffff',
                                lineWidth: 1,
                                radius: 2
                            }
                        );
                    }

                    // --------------------------
                    // GESTURE PRIORITY
                    // --------------------------

                    if (
                        detectInfiniteVoid(
                            landmarks
                        )
                    ) {

                        detected =
                            'infiniteVoid';
                    }

                    else if (
                        detectClosedFist(
                            landmarks
                        )
                    ) {

                        detected =
                            landmarks[0].y < 0.35
                                ? 'jackpot'
                                : 'blackFlash';
                    }

                    else if (
                        detectFingerGuns(
                            landmarks
                        )
                    ) {

                        detected = 'comedy';
                    }

                    else if (
                        detectClawedHand(
                            landmarks
                        )
                    ) {

                        detected =
                            'disasterFlames';
                    }

                    else if (
                        detectHandChop(
                            landmarks
                        )
                    ) {

                        detected =
                            'ratioTechnique';
                    }

                    else if (
                        detectMalevolentShrine(
                            landmarks
                        )
                    ) {

                        detected =
                            'malevolentShrine';
                    }

                    else if (
                        detectOpenPalm(
                            landmarks
                        )
                    ) {

                        detected =
                            'construction';
                    }
                }
            }

            // --------------------------
            // GESTURE PERSISTENCE
            // --------------------------

            const gestureState =
                gestureStateRef.current;

            // Hold last gesture briefly
            if (detected !== 'neutral') {

                gestureState.lastSeen = {
                    gesture: detected,
                    time: Date.now()
                };
            }

            else {

                const elapsed =
                    Date.now() -
                    gestureState.lastSeen.time;

                if (elapsed < 700) {

                    detected =
                        gestureState
                            .lastSeen.gesture;
                }
            }

            // Stable frame voting
            if (
                detected ===
                gestureState.candidate
            ) {

                gestureState.frames++;
            }

            else {

                gestureState.candidate =
                    detected;

                gestureState.frames = 0;
            }

            const REQUIRED_FRAMES = 4;

            if (
                gestureState.frames >=
                    REQUIRED_FRAMES &&

                gestureState.current !==
                    detected
            ) {

                gestureState.current =
                    detected;

                currentDetectedRef.current =
                    detected;

                if (onGestureDetected) {

                    onGestureDetected(
                        detected
                    );
                }
            }

            canvasCtx.restore();
        });

        // --------------------------
        // CAMERA
        // --------------------------

        const startCamera = async () => {

            await new Promise((resolve) =>
                setTimeout(resolve, 300)
            );

            if (
                isStopped ||
                !videoElement
            ) {
                return;
            }

            try {

                camera = new Camera(
                    videoElement,
                    {
                        onFrame: async () => {

                            if (isStopped) {
                                return;
                            }

                            try {

                                await hands.send({
                                    image:
                                        videoElement
                                });

                            } catch (err) {
                                // ignore shutdown errors
                            }
                        },

                        width: 640,
                        height: 480
                    }
                );

                await camera.start();

            } catch (err) {

                console.error(
                    'Camera failed:',
                    err
                );
            }
        };

        startCamera();

        // --------------------------
        // CLEANUP
        // --------------------------

        return () => {

            isStopped = true;

            if (camera) {
                camera.stop();
            }

            if (
                videoElement &&
                videoElement.srcObject
            ) {

                const stream =
                    videoElement.srcObject;

                stream
                    .getTracks()
                    .forEach((track) =>
                        track.stop()
                    );

                videoElement.srcObject =
                    null;
            }

            hands.close();
        };

    }, [onGestureDetected]);

    return (
        <div id="video-container">

            <video
                ref={videoRef}
                className="input_video"
                autoPlay
                muted
                playsInline
            />

            <canvas
                ref={canvasRef}
                id="output_canvas"
            />

        </div>
    );
};

export default HandTracker;