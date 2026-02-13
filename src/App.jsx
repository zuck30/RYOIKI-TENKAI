import React, { useState, useCallback } from 'react';
import './App.css';
import CursedVisualizer from './components/CursedVisualizer';
import HandTracker from './components/HandTracker';
import UI from './components/UI';

const App = () => {
    const [currentTech, setCurrentTech] = useState('neutral');
    const [techniqueName, setTechniqueName] = useState('CURSED ENERGY');
    const [glowColor, setGlowColor] = useState('#00ffff');

    const handleTechniqueDetected = useCallback((tech) => {
        setCurrentTech(tech);
        if(tech === 'shrine') {
            setTechniqueName("Domain Expansion: Malevolent Shrine");
            setGlowColor('#ff0000');
        } else if(tech === 'purple') {
            setTechniqueName("Secret Technique: Hollow Purple");
            setGlowColor('#bb00ff');
        } else if(tech === 'void') {
            setTechniqueName("Domain Expansion: Infinite Void");
            setGlowColor('#00ffff');
        } else if(tech === 'red') {
            setTechniqueName("Reverse Cursed Technique: Red");
            setGlowColor('#ff3333');
        } else {
            setTechniqueName("Neutral State");
            setGlowColor('#00ffff');
        }
    }, []);

    return (
        <div className="App">
            <UI techniqueName={techniqueName} />
            <CursedVisualizer currentTech={currentTech} />
            <HandTracker onTechniqueDetected={handleTechniqueDetected} glowColor={glowColor} />
        </div>
    );
};

export default App;
