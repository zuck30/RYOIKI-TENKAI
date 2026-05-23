import React, { useState, useCallback, useRef, useEffect } from 'react';
import HandTracker from './components/HandTracker';
import CursedVisualizer from './components/CursedVisualizer';
import VoiceCommand from './components/VoiceCommand';
import UI from './components/UI';
import AudioManager from './utils/AudioManager';
import { TECH_DATA } from './utils/constants';
import './App.css';

function App() {

  const [currentTech, setCurrentTech] = useState('neutral');
  const [glowColor, setGlowColor] = useState('#00ffff');
  const [voiceActive, setVoiceActive] = useState(false);
  const [voiceLanguage, setVoiceLanguage] = useState('en-US');
  const [lastHeard, setLastHeard] = useState('');
  const [muted, setMuted] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);

  const voiceOverrideRef = useRef(null);

  // -------------------
  // AUDIO CONTROL
  // -------------------

  useEffect(() => {

    if (!audioStarted || muted) return;

    // Neutral = theme music
    if (currentTech === 'neutral' || currentTech === 'none') {

      AudioManager.stop();

      AudioManager.startThemeMusic();
    }

    // Technique active
    else {

      AudioManager.stopThemeMusic();

      const techInfo = TECH_DATA[currentTech];
      if (techInfo && techInfo.isDomain) {
        AudioManager.playDomain(currentTech);
      } else {
        AudioManager.play(currentTech);
      }
    }

  }, [currentTech, muted, audioStarted]);

  // -------------------
  // ACTIVATE TECHNIQUE
  // -------------------

  const activateTech = useCallback((techId) => {

    setCurrentTech(techId);

    const techInfo = TECH_DATA[techId];
    setGlowColor(techInfo ? techInfo.color : '#00ffff');

  }, []);

  // -------------------
  // HAND GESTURES
  // -------------------

  const handleGestureDetected = useCallback((techId) => {

    if (!voiceOverrideRef.current) {
      activateTech(techId);
    }

  }, [activateTech]);

  // -------------------
  // VOICE COMMANDS
  // -------------------

  const handleVoiceCommand = useCallback((techId, spokenText) => {

    setLastHeard(spokenText);

    if (techId === 'release' || techId === 'stop' || techId === 'return') {

      activateTech('neutral');

      if (voiceOverrideRef.current) {
        clearTimeout(voiceOverrideRef.current);
      }

      voiceOverrideRef.current = null;

      return;
    }

    if (techId && techId !== 'activate') {

      activateTech(techId);

      if (voiceOverrideRef.current) {
        clearTimeout(voiceOverrideRef.current);
      }

      voiceOverrideRef.current = setTimeout(() => {
        voiceOverrideRef.current = null;
      }, 5000);
    }

    setTimeout(() => {

      setLastHeard(prev =>
        prev === spokenText ? '' : prev
      );

    }, 3000);

  }, [activateTech]);

  // -------------------
  // MENU SELECT
  // -------------------

  const handleTechSelect = useCallback((techId) => {

    if (voiceOverrideRef.current) {
      clearTimeout(voiceOverrideRef.current);
    }

    voiceOverrideRef.current = null;

    activateTech(techId);

  }, [activateTech]);

  // -------------------
  // UI CONTROLS
  // -------------------

  const toggleVoice = () => {
    setVoiceActive(!voiceActive);
  };

  const toggleLanguage = () => {
    setVoiceLanguage(prev =>
      prev === 'en-US' ? 'ja-JP' : 'en-US'
    );
  };

  const toggleMute = () => {
    setMuted(AudioManager.toggleMute());
  };

  // -------------------
  // UNLOCK AUDIO
  // -------------------

  const unlockAudio = () => {

    if (audioStarted) return;

    if (!muted) {
      AudioManager.startThemeMusic();
    }

    setAudioStarted(true);
  };

  // -------------------
  // RENDER
  // -------------------

  return (

    <div className="App" onClick={unlockAudio}>

      <HandTracker
        onGestureDetected={handleGestureDetected}
        glowColor={glowColor}
      />

      <CursedVisualizer technique={currentTech} />

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
        muted={muted}
        onToggleVoice={toggleVoice}
        onToggleLanguage={toggleLanguage}
        onToggleMute={toggleMute}
        onTechSelect={handleTechSelect}
      />

    </div>
  );
}

export default App;