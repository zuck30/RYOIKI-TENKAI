import React, { useState } from 'react';
import GestureGuide from './GestureGuide';
import { TECH_DATA } from '../utils/constants';

const MENU_TECHNIQUES = [
  'hollowPurple', 'infiniteVoid', 'red', 'malevolentShrine',
  'blackFlash', 'idleTransfiguration', 'boogieWoogie', 'tenShadows',
  'disasterFlames', 'cursedSpeech', 'bloodManipulation', 'ratioTechnique',
  'jackpot', 'skyManipulation', 'construction', 'comedy',
];

const buttonStyle = {
  padding: '8px 16px',
  background: '#000',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '12px',
  transition: 'background 0.2s'
};

const buttonActiveStyle = {
  ...buttonStyle,
  background: '#333'
};

const UI = ({ technique, voiceActive, lastHeard, voiceLanguage, muted, onToggleVoice, onToggleLanguage, onToggleMute, onTechSelect }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const data = TECH_DATA[technique] || { name: technique, character: '' };

  const handleSelect = (techId) => {
    onTechSelect(techId);
    setMenuOpen(false);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
    if (guideOpen) setGuideOpen(false);
  };

  const handleGuideToggle = () => {
    setGuideOpen(!guideOpen);
    if (menuOpen) setMenuOpen(false);
  };

  return (
    <>
      <div id="grain"></div>

      <div id="ui">
        <h1>領域展開</h1>
        {data.isDomain && <div className="domain-label">領域展開 / DOMAIN EXPANSION</div>}
        <div id="technique-name" style={{ color: data.color || '#00ffff', textShadow: `0 0 15px ${data.color}99, 0 0 30px ${data.color}44` }}>
          {data.isDomain ? (data.domainName || data.name) : data.name}
        </div>
        {data.character && (
          <div id="character-name">
            {data.isDomain ? `Owner: ${data.character}` : data.character}
          </div>
        )}
        {lastHeard && (
          <div id="last-heard" className="floating-text">
            "{lastHeard}"
          </div>
        )}
      </div>

      <div style={{ position: 'fixed', top: '20px', left: '20px', zIndex: 200, display: 'flex', gap: '8px' }}>
        <button 
          onClick={handleMenuToggle}
          style={menuOpen ? buttonActiveStyle : buttonStyle}
        >
          {menuOpen ? '✕ CLOSE' : '⚡ TECHNIQUES'}
        </button>
        
        <button 
          onClick={handleGuideToggle}
          style={guideOpen ? buttonActiveStyle : buttonStyle}
        >
          {guideOpen ? '✕ CLOSE' : '🖐 GESTURES'}
        </button>
      </div>

      {menuOpen && (
        <div id="technique-menu">
          <div id="menu-title">SELECT YOUR TECHNIQUE</div>
          <div id="card-grid">
            {MENU_TECHNIQUES.map(techId => {
              const t = TECH_DATA[techId];
              const isActive = technique === techId;
              return (
                <button
                  key={techId}
                  className={`tech-card ${isActive ? 'active' : ''}`}
                  style={{ '--card-color': t.color }}
                  onClick={() => handleSelect(techId)}
                >
                  {t.isDomain && <span className="card-domain-badge">DOMAIN</span>}
                  <span className="card-name">{t.name}</span>
                  <span className="card-character">{t.character}</span>
                </button>
              );
            })}
          </div>
          <button className="menu-reset" onClick={() => handleSelect('neutral')}>Reset / Neutral</button>
        </div>
      )}

      {guideOpen && (
        <GestureGuide
          onClose={() => setGuideOpen(false)}
          onTechSelect={(techId) => { onTechSelect(techId); }}
        />
      )}

      <div id="voice-controls">
        <div className="voice-buttons">
          <button
            id="mic-button"
            className={voiceActive ? 'active' : ''}
            onClick={onToggleVoice}
            aria-label={voiceActive ? "Stop listening" : "Start listening"}
          >
            <span className="mic-icon">{voiceActive ? '🎙' : '🎤'}</span>
            {voiceActive && <div className="voice-wave"></div>}
          </button>
          <button id="lang-toggle" onClick={onToggleLanguage} aria-label="Toggle language">
            {voiceLanguage === 'en-US' ? 'EN' : 'JP'}
          </button>
          <button id="mute-toggle" onClick={onToggleMute} aria-label="Toggle sound">
            {muted ? '🔇' : '🔊'}
          </button>
        </div>
        {voiceActive && (
          <div id="voice-status">
            Listening ({voiceLanguage === 'en-US' ? 'English' : 'Japanese'})...
          </div>
        )}
      </div>
    </>
  );
};

export default UI;