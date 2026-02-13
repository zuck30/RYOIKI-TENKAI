import React, { useEffect, useRef } from 'react';
import * as HandsNS from '@mediapipe/hands';
import * as CameraNS from '@mediapipe/camera_utils';
import * as DrawingNS from '@mediapipe/drawing_utils';

// Mediapipe packages often have issues with ESM imports.
// They usually set globals on the window object.
const Hands = HandsNS.Hands || window.Hands;
const HAND_CONNECTIONS = HandsNS.HAND_CONNECTIONS || window.HAND_CONNECTIONS;
const Camera = CameraNS.Camera || window.Camera;
const drawConnectors = DrawingNS.drawConnectors || window.drawConnectors;
const drawLandmarks = DrawingNS.drawLandmarks || window.drawLandmarks;

const HandTracker = ({ onTechniqueDetected, onGlowChange, glowColor }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const currentDetectedRef = useRef('neutral');
    const glowColorRef = useRef(glowColor);

    useEffect(() => {
        glowColorRef.current = glowColor;
    }, [glowColor]);

    useEffect(() => {
        if (!Hands || !Camera) {
            console.error('MediaPipe Hands or Camera not loaded');
            return;
        }

        const videoElement = videoRef.current;
        const canvasElement = canvasRef.current;
        const canvasCtx = canvasElement.getContext('2d');

        const hands = new Hands({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
            }
        });

        hands.setOptions({
            maxNumHands: 2,
            modelComplexity: 1,
            minDetectionConfidence: 0.7,
            minTrackingConfidence: 0.5
        });

        hands.onResults((results) => {
            if (!videoElement || !canvasElement) return;

            canvasElement.width = videoElement.videoWidth;
            canvasElement.height = videoElement.videoHeight;

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
                    const isUp = (t, p) => landmarks[t].y < landmarks[p].y;
                    const pinch = Math.hypot(landmarks[8].x - landmarks[4].x, landmarks[8].y - landmarks[4].y);

                    if (pinch < 0.04) detected = 'purple';
                    else if (detectClosedFist(landmarks)) detected = landmarks[0].y < 0.35 ? 'jackpot' : 'blackFlash';
                    else if (detectFingerGuns(landmarks)) detected = 'comedy';
                    else if (detectFingerDrawing(landmarks)) detected = 'bloodManipulation';
                    else if (detectClawedHand(landmarks)) detected = 'disasterFlames';
                    else if (detectHandChopping(landmarks)) detected = 'ratioTechnique';
                    else if (isUp(8,6) && isUp(12,10) && isUp(16,14) && isUp(20,18)) detected = 'shrine';
                    else if (isUp(8,6) && isUp(12,10) && !isUp(16,14)) detected = 'void';
                    else if (isUp(8,6) && !isUp(12,10)) detected = 'red';
                    else if (detectOpenPalm(landmarks)) detected = (landmarks[0].x < 0.25 || landmarks[0].x > 0.75) ? 'skyManipulation' : 'construction';
                    else if (landmarks[8].y > landmarks[7].y && landmarks[12].y > landmarks[11].y) detected = 'idleTransfiguration';
                    else if (landmarks[0].y > 0.6 && landmarks[8].y < landmarks[6].y && Math.abs(landmarks[0].x - 0.5) < 0.15) detected = 'cursedSpeech';
                }
            }

            if (detected !== currentDetectedRef.current) {
                currentDetectedRef.current = detected;
                onTechniqueDetected(detected);

                // Trigger glow change based on technique
                const colors = {
                    purple: '#a855f7',
                    red: '#ef4444',
                    void: '#3b82f6',
                    shrine: '#991b1b',
                    blackFlash: '#000000',
                    idleTransfiguration: '#9b59b6',
                    boogieWoogie: '#800080',
                    tenShadows: '#2c3e50',
                    disasterFlames: '#ff4500',
                    cursedSpeech: '#ffd700',
                    construction: '#00ffff',
                    comedy: '#ff69b4',
                    bloodManipulation: '#8b0000',
                    ratioTechnique: '#ffd700',
                    jackpot: '#ffcc00',
                    skyManipulation: '#87CEEB',
                    neutral: '#00ffff'
                };
                if (onGlowChange && colors[detected]) {
                    onGlowChange(colors[detected]);
                }
            }
            canvasCtx.restore();
        });

        const camera = new Camera(videoElement, {
            onFrame: async () => {
                await hands.send({ image: videoElement });
            },
            width: 640,
            height: 480
        });
        camera.start();

        return () => {
            camera.stop();
            hands.close();
        };
    }, [onTechniqueDetected, onGlowChange]);

    return (
        <div id="video-container">
            <video ref={videoRef} className="input_video" playsInline></video>
            <canvas ref={canvasRef} id="output_canvas"></canvas>
        </div>
    );
};

export default HandTracker;
