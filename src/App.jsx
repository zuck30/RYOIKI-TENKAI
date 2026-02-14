import React, { useState, useCallback, useRef, useEffect } from 'react';
import HandTracker from './components/HandTracker';
import CursedVisualizer from './components/CursedVisualizer';
import VoiceCommand from './components/VoiceCommand';
import UI from './components/UI';
import './App.css';

const TECH_COLORS = {
  hollowPurple: '#a333ff',
  infiniteVoid: '#ffffff',
  red: '#ff0000',
  malevolentShrine: '#ff3300',
  blackFlash: '#ff0055',
  idleTransfiguration: '#00ffcc',
  boogieWoogie: '#ffff00',
  tenShadows: '#333333',
  disasterFlames: '#ff6600',
  cursedSpeech: '#0066ff',
  construction: '#999999',
  comedy: '#ff00ff',
  bloodManipulation: '#880000',
  ratioTechnique: '#ccff00',
  jackpot: '#00ffff',
  skyManipulation: '#aaaaff',
  neutral: '#00ffff'
};

function App() {
  const [currentTech, setCurrentTech] = useState('neutral');
  const [glowColor, setGlowColor] = useState('#00ffff');
  const [voiceActive, setVoiceActive] = useState(false);
  const [voiceLanguage, setVoiceLanguage] = useState('en-US');
  const [lastHeard, setLastHeard] = useState('');

  // Ref to track if voice currently overrides gesture
  const voiceOverrideRef = useRef(null);

  const handleGestureDetected = useCallback((techId) => {
    // Only update if no voice override is active
    if (!voiceOverrideRef.current) {
      setCurrentTech(techId);
      setGlowColor(TECH_COLORS[techId] || '#00ffff');
    }
  }, []);

  const handleVoiceCommand = useCallback((techId, spokenText) => {
    setLastHeard(spokenText);

    if (techId === 'release' || techId === 'stop' || techId === 'return') {
      setCurrentTech('neutral');
      setGlowColor(TECH_COLORS.neutral);
      if (voiceOverrideRef.current) clearTimeout(voiceOverrideRef.current);
      voiceOverrideRef.current = null;
      return;
    }

    if (techId && techId !== 'activate') {
      setCurrentTech(techId);
      setGlowColor(TECH_COLORS[techId] || '#00ffff');

      // Set override for 5 seconds
      if (voiceOverrideRef.current) clearTimeout(voiceOverrideRef.current);
      voiceOverrideRef.current = setTimeout(() => {
        voiceOverrideRef.current = null;
      }, 5000);
    }

    // Auto-clear last heard text after 3 seconds
    setTimeout(() => {
      setLastHeard(prev => prev === spokenText ? '' : prev);
    }, 3000);
  }, []);

  const toggleVoice = () => setVoiceActive(!voiceActive);
  const toggleLanguage = () => setVoiceLanguage(prev => prev === 'en-US' ? 'ja-JP' : 'en-US');

  return (
    <div className="App">
      <HandTracker
        onGestureDetected={handleGestureDetected}
        glowColor={glowColor}
      />

      <CursedVisualizer
        technique={currentTech}
      />

      <VoiceCommand
        active={voiceActive}
        language={voiceLanguage}
        onCommandDetected={handleVoiceCommand}
        onListeningChange={setVoiceActive}
        onError={(err) => console.error("Voice Error:", err)}
      />

      <UI
        technique={currentTech}
        voiceActive={voiceActive}
        voiceLanguage={voiceLanguage}
        lastHeard={lastHeard}
        onToggleVoice={toggleVoice}
        onToggleLanguage={toggleLanguage}
      />
    </div>
  );
}

export default App;
