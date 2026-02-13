import React, { useState, useCallback } from 'react';
import HandTracker from './components/HandTracker';
import CursedVisualizer from './components/CursedVisualizer';
import UI from './components/UI';

const App = () => {
    const [currentTech, setCurrentTech] = useState('neutral');
    const [glowColor, setGlowColor] = useState('#00ffff');

    const handleTechniqueDetected = useCallback((tech) => {
        setCurrentTech(tech);
    }, []);

    const handleGlowChange = useCallback((color) => {
        setGlowColor(color);
    }, []);

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', background: '#000' }}>
            <HandTracker
                onTechniqueDetected={handleTechniqueDetected}
                onGlowChange={handleGlowChange}
                glowColor={glowColor}
            />
            <CursedVisualizer
                technique={currentTech}
            />
            <UI technique={currentTech} />
        </div>
    );
};

export default App;
