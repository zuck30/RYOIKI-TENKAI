import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const COUNT = 20000;

const getRed = (i) => {
    if(i < COUNT * 0.1) {
        const r = Math.random() * 9;
        const theta = Math.random() * 6.28; const phi = Math.acos(2 * Math.random() - 1);
        return { x: r * Math.sin(phi) * Math.cos(theta), y: r * Math.sin(phi) * Math.sin(theta), z: r * Math.cos(phi), r: 3, g: 0.1, b: 0.1, s: 2.5 };
    } else {
        const armCount = 3; const t = (i / COUNT);
        const angle = t * 15 + ((i % armCount) * (Math.PI * 2 / armCount));
        const radius = 2 + (t * 40);
        return { x: radius * Math.cos(angle), y: radius * Math.sin(angle), z: (Math.random() - 0.5) * (10 * t), r: 0.8, g: 0, b: 0, s: 1.0 };
    }
};

const getVoid = (i) => {
    if (i < COUNT * 0.15) {
        const angle = Math.random() * Math.PI * 2;
        return { x: 26 * Math.cos(angle), y: 26 * Math.sin(angle), z: (Math.random()-0.5) * 1, r: 1, g: 1, b: 1, s: 2.5 };
    } else {
        const radius = 30 + Math.random() * 90;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        return { x: radius * Math.sin(phi) * Math.cos(theta), y: radius * Math.sin(phi) * Math.sin(theta), z: radius * Math.cos(phi), r: 0.1, g: 0.6, b: 1.0, s: 0.7 };
    }
};

const getPurple = () => {
    if (Math.random() > 0.8) return { x: (Math.random() - 0.5) * 100, y: (Math.random() - 0.5) * 100, z: (Math.random() - 0.5) * 100, r: 0.5, g: 0.5, b: 0.7, s: 0.8 };
    const r = 20; const theta = Math.random() * Math.PI * 2; const phi = Math.acos(2 * Math.random() - 1);
    return { x: r * Math.sin(phi) * Math.cos(theta), y: r * Math.sin(phi) * Math.sin(theta), z: r * Math.cos(phi), r: 0.6, g: 0.5, b: 1.0, s: 2.5 };
};

const getShrine = (i) => {
    const total = COUNT;
    if (i < total * 0.3) return { x: (Math.random()-0.5)*80, y: -15, z: (Math.random()-0.5)*80, r: 0.4, g: 0, b: 0, s: 0.8 };
    else if (i < total * 0.4) {
        const px = ((i%4)<2?1:-1)*12; const pz = ((i%4)%2==0?1:-1)*8;
        return { x: px+(Math.random()-0.5)*2, y: -15+Math.random()*30, z: pz+(Math.random()-0.5)*2, r: 0.2, g: 0.2, b: 0.2, s: 0.6 };
    } else if (i < total * 0.6) {
        const t = Math.random() * Math.PI * 2; const rad = Math.random() * 30;
        const curve = Math.pow(rad/30, 2) * 10;
        return { x: rad*Math.cos(t), y: 15 - curve + (Math.random()*2), z: rad*Math.sin(t)*0.6, r: 0.6, g: 0, b: 0, s: 0.6 };
    } else return { x: 0, y: 0, z: 0, r: 0, g: 0, b: 0, s: 0 };
};

const getBlackFlash = (i) => {
    const angle = Math.random() * Math.PI * 2;
    const radius = 5 + (i % 8) * 6 + Math.random() * 3;
    const isRed = Math.random() > 0.4;
    return { x: radius * Math.cos(angle), y: radius * Math.sin(angle), z: (Math.random()-0.5)*10, r: isRed?1:0, g: 0, b: 0, s: 2.5 };
};

const getIdleTransfiguration = (i) => {
    const t = i / COUNT;
    const r = 15 + Math.sin(t * 50 + Date.now()*0.001) * 5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const isWhite = Math.random() > 0.8;
    return { x: r * Math.sin(phi) * Math.cos(theta), y: r * Math.sin(phi) * Math.sin(theta), z: r * Math.cos(phi), r: isWhite?1:0.6, g: isWhite?1:0.35, b: isWhite?1:0.7, s: 1.2 };
};

const getBoogieWoogie = (i) => {
    const side = (i < COUNT/2) ? 1 : -1;
    const x = side * 15 + (Math.random()-0.5)*10;
    return { x: x, y: (Math.random()-0.5)*40, z: (Math.random()-0.5)*10, r: 0.7, g: 0, b: 1, s: 1.5 };
};

const getTenShadows = (i) => {
    const group = i % 4;
    let x, y, z;
    if (group === 0) { x = (Math.random()-0.5)*10; y = (Math.random()-0.5)*20; z = Math.random()*15; }
    else if (group === 1) { x = (Math.random()-0.5)*30; y = 10; z = (Math.random()-0.5)*5; }
    else { x = (Math.random()-0.5)*60; y = -15; z = (Math.random()-0.5)*60; }
    return { x, y, z, r: 0.1, g: 0.15, b: 0.2, s: 1.5 };
};

const getDisasterFlames = () => {
    const r = Math.sqrt(Math.random()) * 25;
    const theta = Math.random() * Math.PI * 2;
    const y = Math.pow(Math.random(), 1.5) * 50;
    return { x: r * Math.cos(theta) * (y/50 + 0.1), y: y - 15, z: r * Math.sin(theta) * (y/50 + 0.1), r: 1, g: 0.3+Math.random()*0.4, b: 0, s: 1.8 };
};

const getCursedSpeech = (i) => {
    const ring = (i % 10);
    const angle = (i / COUNT) * Math.PI * 20;
    const radius = ring * 6 + 5;
    return { x: radius * Math.cos(angle), y: radius * Math.sin(angle), z: (Math.random()-0.5)*2, r: 1, g: 0.85, b: 0, s: 2.0 };
};

const getConstruction = () => {
    const x = (Math.random()-0.5)*40;
    const y = (Math.random()-0.5)*40;
    const z = (Math.random()-0.5)*40;
    return { x, y, z, r: 0, g: 1, b: 1, s: 1.2 };
};

const getComedy = () => {
    const angle = Math.random() * Math.PI * 2;
    const r = 10 + Math.random()*30;
    return { x: r*Math.cos(angle), y: r*Math.sin(angle), z: (Math.random()-0.5)*20, r: 1, g: 0.4, b: 0.7, s: 2.5 };
};

const getBloodManipulation = (i) => {
    const t = i / COUNT;
    const angle = t * 60;
    const r = 5 + t * 20;
    return { x: r*Math.cos(angle), y: (t-0.5)*60, z: r*Math.sin(angle), r: 0.8, g: 0, b: 0, s: 1.5 };
};

const getRatioTechnique = (i) => {
    const isH = (i % 2 === 0);
    const grid = Math.floor(i/2000) % 5;
    return { x: isH ? (Math.random()-0.5)*80 : grid*15-30, y: isH ? grid*15-30 : (Math.random()-0.5)*80, z: 0, r: 1, g: 0.85, b: 0, s: 1.2 };
};

const getJackpot = () => {
    const r = Math.random()*50;
    const theta = Math.random()*Math.PI*2;
    return { x: r*Math.cos(theta), y: r*Math.sin(theta), z: (Math.random()-0.5)*30, r: 1, g: 0.8, b: 0, s: 2.0 };
};

const getSkyManipulation = () => {
    const r = 20 + (Math.random()-0.5)*10;
    const theta = Math.random()*Math.PI*2;
    const phi = Math.random()*Math.PI;
    return { x: r*Math.sin(phi)*Math.cos(theta), y: r*Math.sin(phi)*Math.sin(theta), z: r*Math.cos(phi), r: 0.5, g: 0.8, b: 1, s: 1.5 };
};

const CursedVisualizer = ({ technique }) => {
    const mountRef = useRef(null);
    const rendererRef = useRef(null);
    const bloomPassRef = useRef(null);
    const particlesRef = useRef(null);
    const targetPositionsRef = useRef(new Float32Array(COUNT * 3));
    const targetColorsRef = useRef(new Float32Array(COUNT * 3));
    const targetSizesRef = useRef(new Float32Array(COUNT));
    const shakeIntensityRef = useRef(0);
    const currentTechRef = useRef(technique);

    useEffect(() => {
        // Init
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 55;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
        composer.addPass(bloomPass);
        bloomPassRef.current = bloomPass;

        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(COUNT * 3);
        const colors = new Float32Array(COUNT * 3);
        const sizes = new Float32Array(COUNT);

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const particles = new THREE.Points(geometry, new THREE.PointsMaterial({ size: 0.3, vertexColors: true, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false }));
        scene.add(particles);
        particlesRef.current = particles;

        let animationFrameId;

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            if (shakeIntensityRef.current > 0) {
                renderer.domElement.style.transform = `translate(${(Math.random()-0.5)*shakeIntensityRef.current*40}px, ${(Math.random()-0.5)*shakeIntensityRef.current*40}px)`;
            } else {
                renderer.domElement.style.transform = 'translate(0,0)';
            }

            const pos = particles.geometry.attributes.position.array;
            const col = particles.geometry.attributes.color.array;
            const siz = particles.geometry.attributes.size.array;

            for(let i=0; i<COUNT*3; i++) {
                pos[i] += (targetPositionsRef.current[i] - pos[i]) * 0.1;
                col[i] += (targetColorsRef.current[i] - col[i]) * 0.1;
            }
            for(let i=0; i<COUNT; i++) siz[i] += (targetSizesRef.current[i] - siz[i]) * 0.1;

            particles.geometry.attributes.position.needsUpdate = true;
            particles.geometry.attributes.color.needsUpdate = true;
            particles.geometry.attributes.size.needsUpdate = true;

            if(currentTechRef.current === 'red') {
                particles.rotation.z -= 0.1;
            } else if (currentTechRef.current === 'purple') {
                particles.rotation.z += 0.2;
                particles.rotation.y += 0.05;
            } else if (currentTechRef.current === 'shrine') {
                particles.rotation.set(0, 0, 0);
            } else if (currentTechRef.current === 'blackFlash') {
                particles.rotation.z += 0.3;
            } else if (currentTechRef.current === 'bloodManipulation') {
                particles.rotation.y += 0.1;
            } else if (currentTechRef.current === 'jackpot') {
                particles.rotation.y += 0.2;
                particles.rotation.x += 0.05;
            } else if (currentTechRef.current === 'skyManipulation') {
                particles.rotation.z += 0.02;
                particles.rotation.x += 0.01;
            } else {
                particles.rotation.y += 0.005;
            }

            composer.render();
        };

        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            composer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        const mount = mountRef.current;
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            if (mount && renderer.domElement) {
                mount.removeChild(renderer.domElement);
            }
            geometry.dispose();
            particles.material.dispose();
            renderer.dispose();
            composer.passes.forEach(pass => {
                if (pass.dispose) pass.dispose();
            });
        };
    }, []);

    useEffect(() => {
        currentTechRef.current = technique;
        const tech = technique;
        shakeIntensityRef.current = (tech !== 'neutral' && tech !== 'none') ? 0.4 : 0;

        if (bloomPassRef.current) {
            if(tech === 'shrine') { bloomPassRef.current.strength = 2.5; }
            else if(tech === 'purple') { bloomPassRef.current.strength = 4.0; }
            else if(tech === 'void') { bloomPassRef.current.strength = 2.0; }
            else if(tech === 'red') { bloomPassRef.current.strength = 2.5; }
            else if(tech === 'blackFlash') { bloomPassRef.current.strength = 3.5; }
            else if(tech === 'idleTransfiguration') { bloomPassRef.current.strength = 2.0; }
            else if(tech === 'boogieWoogie') { bloomPassRef.current.strength = 2.5; }
            else if(tech === 'tenShadows') { bloomPassRef.current.strength = 1.5; }
            else if(tech === 'disasterFlames') { bloomPassRef.current.strength = 3.0; }
            else if(tech === 'cursedSpeech') { bloomPassRef.current.strength = 2.5; }
            else if(tech === 'construction') { bloomPassRef.current.strength = 2.0; }
            else if(tech === 'comedy') { bloomPassRef.current.strength = 2.5; }
            else if(tech === 'bloodManipulation') { bloomPassRef.current.strength = 2.0; }
            else if(tech === 'ratioTechnique') { bloomPassRef.current.strength = 2.5; }
            else if(tech === 'jackpot') { bloomPassRef.current.strength = 3.5; }
            else if(tech === 'skyManipulation') { bloomPassRef.current.strength = 2.0; }
            else { bloomPassRef.current.strength = 1.0; }
        }

        for(let i=0; i<COUNT; i++) {
            let p = { x: 0, y: 0, z: 0, r: 0, g: 0, b: 0, s: 0 };
            if(tech === 'neutral') {
                if(i < COUNT * 0.05) {
                    const r = 15 + Math.random()*20; const t = Math.random()*6.28; const ph = Math.random()*3.14;
                    p = { x: r*Math.sin(ph)*Math.cos(t), y: r*Math.sin(ph)*Math.sin(t), z: r*Math.cos(ph), r: 0.1, g: 0.1, b: 0.2, s: 0.4 };
                }
            }
            else if(tech === 'red') p = getRed(i);
            else if(tech === 'void') p = getVoid(i);
            else if(tech === 'purple') p = getPurple();
            else if(tech === 'shrine') p = getShrine(i);
            else if(tech === 'blackFlash') p = getBlackFlash(i);
            else if(tech === 'idleTransfiguration') p = getIdleTransfiguration(i);
            else if(tech === 'boogieWoogie') p = getBoogieWoogie(i);
            else if(tech === 'tenShadows') p = getTenShadows(i);
            else if(tech === 'disasterFlames') p = getDisasterFlames();
            else if(tech === 'cursedSpeech') p = getCursedSpeech(i);
            else if(tech === 'construction') p = getConstruction();
            else if(tech === 'comedy') p = getComedy();
            else if(tech === 'bloodManipulation') p = getBloodManipulation(i);
            else if(tech === 'ratioTechnique') p = getRatioTechnique(i);
            else if(tech === 'jackpot') p = getJackpot();
            else if(tech === 'skyManipulation') p = getSkyManipulation();

            targetPositionsRef.current[i*3] = p.x; targetPositionsRef.current[i*3+1] = p.y; targetPositionsRef.current[i*3+2] = p.z;
            targetColorsRef.current[i*3] = p.r; targetColorsRef.current[i*3+1] = p.g; targetColorsRef.current[i*3+2] = p.b;
            targetSizesRef.current[i] = p.s;
        }
    }, [technique]);

    return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }} />;
};

export default CursedVisualizer;
