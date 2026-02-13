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

const HandTracker = ({ onTechniqueDetected, glowColor }) => {
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

            if (results.multiHandLandmarks) {
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

                    const isUp = (t, p) => landmarks[t].y < landmarks[p].y;
                    const pinch = Math.hypot(landmarks[8].x - landmarks[4].x, landmarks[8].y - landmarks[4].y);

                    if (pinch < 0.04) detected = 'purple';
                    else if (isUp(8,6) && isUp(12,10) && isUp(16,14) && isUp(20,18)) detected = 'shrine';
                    else if (isUp(8,6) && isUp(12,10) && !isUp(16,14)) detected = 'void';
                    else if (isUp(8,6) && !isUp(12,10)) detected = 'red';
                });
            }

            if (detected !== currentDetectedRef.current) {
                currentDetectedRef.current = detected;
                onTechniqueDetected(detected);
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
    }, [onTechniqueDetected]);

    return (
        <div id="video-container">
            <video ref={videoRef} className="input_video" playsInline></video>
            <canvas ref={canvasRef} id="output_canvas"></canvas>
        </div>
    );
};

export default HandTracker;
