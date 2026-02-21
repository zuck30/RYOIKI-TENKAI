import React, { useEffect, useRef } from 'react';
import * as HandsNS from '@mediapipe/hands';
import * as CameraNS from '@mediapipe/camera_utils';
import * as DrawingNS from '@mediapipe/drawing_utils';

// Mediapipe packages often have issues with ESM imports.
// They usually set globals on the window object.
const Hands = HandsNS.Hands || HandsNS.default?.Hands || window.Hands;
const HAND_CONNECTIONS = HandsNS.HAND_CONNECTIONS || HandsNS.default?.HAND_CONNECTIONS || window.HAND_CONNECTIONS;
const Camera = CameraNS.Camera || CameraNS.default?.Camera || window.Camera;
const drawConnectors = DrawingNS.drawConnectors || DrawingNS.default?.drawConnectors || window.drawConnectors;
const drawLandmarks = DrawingNS.drawLandmarks || DrawingNS.default?.drawLandmarks || window.drawLandmarks;

const HandTracker = ({ onGestureDetected, glowColor }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const currentDetectedRef = useRef('neutral');
    const glowColorRef = useRef(glowColor);
    const consecutiveFramesRef = useRef(0);
    const candidateGestureRef = useRef('neutral');
    const onGestureDetectedRef = useRef(onGestureDetected);

    useEffect(() => {
        glowColorRef.current = glowColor;
    }, [glowColor]);

    useEffect(() => {
        onGestureDetectedRef.current = onGestureDetected;
    }, [onGestureDetected]);

    useEffect(() => {
        if (!Hands || !Camera) {
            console.error('MediaPipe Hands or Camera not loaded');
            return;
        }

        let isStopped = false;
        let camera = null;
        const videoElement = videoRef.current;
        const canvasElement = canvasRef.current;
        const canvasCtx = canvasElement.getContext('2d');

        const hands = new Hands({
            locateFile: (file) => {
                // Using local assets to speed up loading and improve reliability
                return `/RYOIKI-TENKAI/mediapipe/hands/${file}`;
            }
        });

        hands.setOptions({
            maxNumHands: 2,
            modelComplexity: 1,
            minDetectionConfidence: 0.6,
            minTrackingConfidence: 0.5
        });

        hands.onResults((results) => {
            if (isStopped || !videoElement || !canvasElement) return;

            if (videoElement.videoWidth > 0 && videoElement.videoHeight > 0) {
                if (canvasElement.width !== videoElement.videoWidth || canvasElement.height !== videoElement.videoHeight) {
                    canvasElement.width = videoElement.videoWidth;
                    canvasElement.height = videoElement.videoHeight;
                }
            }

            canvasCtx.save();
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

            let detected = 'neutral';

            if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
                results.multiHandLandmarks.forEach((landmarks) => {
                    if (drawConnectors && HAND_CONNECTIONS) {
                        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
                            color: glowColorRef.current,
                            lineWidth: 5
                        });
                    }
                    if (drawLandmarks) {
                        drawLandmarks(canvasCtx, landmarks, {
                            color: '#fff',
                            lineWidth: 1,
                            radius: 2
                        });
                    }
                });

                const detectClosedFist = (lm) => [8,12,16,20].every(i => lm[i].y > lm[i-2].y);
                const detectOpenPalm = (lm) => [8,12,16,20].every(i => lm[i].y < lm[i-2].y);
                const detectClawedHand = (lm) => [8,12,16,20].every(i => Math.hypot(lm[i].x - lm[i-2].x, lm[i].y - lm[i-2].y) < 0.06) && !detectClosedFist(lm);
                const detectFingerGuns = (lm) => lm[8].y < lm[6].y && lm[4].y < lm[3].y && [12,16,20].every(i => lm[i].y > lm[i-2].y);
                const detectFingerDrawing = (lm) => lm[8].y < lm[6].y && [12,16,20,4].every(i => lm[i].y > lm[i-2].y);
                const detectHandChopping = (lm) => detectOpenPalm(lm) && Math.abs(lm[8].x - lm[20].x) < 0.05;

                const detectHandClap = (mhlm) => mhlm.length === 2 && Math.hypot(mhlm[0][0].x - mhlm[1][0].x, mhlm[0][0].y - mhlm[1][0].y) < 0.15;
                const detectShadowPuppet = (mhlm) => mhlm.length === 2 && Math.hypot(mhlm[0][8].x - mhlm[1][4].x, mhlm[0][8].y - mhlm[1][4].y) < 0.08;

                if (detectHandClap(results.multiHandLandmarks)) {
                    detected = 'boogieWoogie';
                } else if (detectShadowPuppet(results.multiHandLandmarks)) {
                    detected = 'tenShadows';
                } else {
                    const landmarks = results.multiHandLandmarks[0];
                    const isUp = (t, p) => landmarks[t].y < landmarks[p].y - 0.01;
                    const pinch = Math.hypot(landmarks[8].x - landmarks[4].x, landmarks[8].y - landmarks[4].y);

                    if (isUp(8,6) && isUp(12,10) && !isUp(16,14)) detected = 'infiniteVoid';
                    else if (pinch < 0.04) detected = 'hollowPurple';
                    else if (detectShadowPuppet(results.multiHandLandmarks)) detected = 'tenShadows';
                    else if (detectClosedFist(landmarks)) detected = landmarks[0].y < 0.35 ? 'jackpot' : 'blackFlash';
                    else if (detectFingerGuns(landmarks)) detected = 'comedy';
                    else if (detectFingerDrawing(landmarks)) detected = 'bloodManipulation';
                    else if (detectClawedHand(landmarks)) detected = 'disasterFlames';
                    else if (detectHandChopping(landmarks)) detected = 'ratioTechnique';
                    else if (isUp(8,6) && isUp(12,10) && isUp(16,14) && isUp(20,18)) detected = 'malevolentShrine';
                    else if (isUp(8,6) && !isUp(12,10)) detected = 'red';
                    else if (detectOpenPalm(landmarks)) detected = (landmarks[0].x < 0.25 || landmarks[0].x > 0.75) ? 'skyManipulation' : 'construction';
                    else if (landmarks[8].y > landmarks[7].y && landmarks[12].y > landmarks[11].y) detected = 'idleTransfiguration';
                    else if (landmarks[0].y > 0.6 && landmarks[8].y < landmarks[6].y && Math.abs(landmarks[0].x - 0.5) < 0.15) detected = 'cursedSpeech';
                }
            }

            // Smoothing logic: Require 3 consecutive frames of the same gesture
            if (detected === candidateGestureRef.current) {
                consecutiveFramesRef.current++;
            } else {
                candidateGestureRef.current = detected;
                consecutiveFramesRef.current = 1;
            }

            if (consecutiveFramesRef.current >= 3 && detected !== currentDetectedRef.current) {
                currentDetectedRef.current = detected;
                if (onGestureDetectedRef.current) {
                    onGestureDetectedRef.current(detected);
                }
            }
            canvasCtx.restore();
        });

        const startCamera = async () => {
            // Small delay to ensure previous hardware sessions are released
            await new Promise(resolve => setTimeout(resolve, 500));
            if (isStopped || !videoElement) return;

            try {
                camera = new Camera(videoElement, {
                    onFrame: async () => {
                        if (isStopped) return;
                        // Only send if video is playing and has data
                        if (videoElement.readyState >= 2) {
                            try {
                                await hands.send({ image: videoElement });
                            } catch {
                                // Suppress errors after stop
                            }
                        }
                    },
                    width: 640,
                    height: 480
                });
                await camera.start();
            } catch (err) {
                console.error("Camera start failed:", err);
            }
        };

        const initializeTracker = async () => {
            try {
                // Explicit initialization can help detect issues early
                await hands.initialize();
                if (!isStopped) {
                    await startCamera();
                }
            } catch (err) {
                console.error("Hands initialization failed:", err);
                // Fallback to starting camera anyway, as initialize might fail but send might still work
                if (!isStopped) {
                    await startCamera();
                }
            }
        };

        initializeTracker();

        return () => {
            isStopped = true;
            if (camera) {
                camera.stop();
            }
            if (videoElement && videoElement.srcObject) {
                const stream = videoElement.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
                videoElement.srcObject = null;
            }
            hands.close();
        };
    }, []); // Empty dependency array ensures this only runs once

    return (
        <div id="video-container">
            <video ref={videoRef} className="input_video" autoPlay muted playsInline></video>
            <canvas ref={canvasRef} id="output_canvas"></canvas>
        </div>
    );
};

export default HandTracker;
