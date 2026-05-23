import React, { useState } from 'react';
import GestureGuide from './GestureGuide';

const TECH_DATA = {
  hollowPurple:        { name: 'Hollow Purple',                        character: 'Gojo Satoru',   isDomain: false, color: '#a333ff' },
  infiniteVoid:        { name: 'Infinite Void',                        character: 'Gojo Satoru',   isDomain: true,  domainName: 'Unlimited Void',                      color: '#ffffff' },
  red:                 { name: 'Cursed Technique Reversal: Red',       character: 'Gojo Satoru',   isDomain: false, color: '#ff0000' },
  malevolentShrine:    { name: 'Malevolent Shrine',                    character: 'Ryomen Sukuna', isDomain: true,  domainName: 'Malevolent Shrine',                   color: '#ff3300' },
  blackFlash:          { name: 'Black Flash',                          character: 'Yuji Itadori',  isDomain: false, color: '#ff0055' },
  idleTransfiguration: { name: 'Idle Transfiguration',                 character: 'Mahito',        isDomain: true,  domainName: 'Self-Embodiment of Perfection',       color: '#00ffcc' },
  boogieWoogie:        { name: 'Boogie Woogie',                        character: 'Todo Aoi',      isDomain: false, color: '#ffff00' },
  tenShadows:          { name: 'Ten Shadows',                          character: 'Megumi Fushiguro', isDomain: true, domainName: 'Chimera Shadow Garden',             color: '#aaaaaa' },
  disasterFlames:      { name: 'Disaster Flames',                      character: 'Jogo',          isDomain: true,  domainName: 'Horizon of the Captivating Skandha', color: '#ff6600' },
  cursedSpeech:        { name: 'Cursed Speech',                        character: 'Inumaki Toge',  isDomain: false, color: '#0066ff' },
  construction:        { name: 'Construction',                         character: 'Mai / Yorozu',  isDomain: false, color: '#999999' },
  comedy:              { name: 'Comedy',                               character: 'Takaba',        isDomain: false, color: '#ff00ff' },
  bloodManipulation:   { name: 'Blood Manipulation',                   character: 'Choso / Kamo',  isDomain: false, color: '#880000' },
  ratioTechnique:      { name: 'Ratio Technique',                      character: 'Nanami',        isDomain: false, color: '#ccff00' },
  jackpot:             { name: 'Jackpot',                              character: 'Hakari',        isDomain: true,  domainName: 'Idle Death Gamble',                  color: '#00ffff' },
  skyManipulation:     { name: 'Sky Manipulation',                     character: 'Uro',           isDomain: false, color: '#aaaaff' },
  neutral:             { name: 'Neutral State',                        character: '',              isDomain: false, color: '#00ffff' },
  none:                { name: '',                                     character: '',              isDomain: false, color: '#00ffff' },
};

const MENU_TECHNIQUES = [
  'hollowPurple', 'infiniteVoid', 'red', 'malevolentShrine',
  'blackFlash', 'idleTransfiguration', 'boogieWoogie', 'tenShadows',
  'disasterFlames', 'cursedSpeech', 'bloodManipulation', 'ratioTechnique',
  'jackpot', 'skyManipulation', 'construction', 'comedy',
];

const UI = ({ technique, voiceActive, lastHeard, voiceLanguage, muted, onToggleVoice, onToggleLanguage, onToggleMute, onTechSelect }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const data = TECH_DATA[technique] || { name: technique, character: '' };

  const handleSelect = (techId) => {
    onTechSelect(techId);
    setMenuOpen(false);
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
        <button id="menu-toggle" onClick={() => { setMenuOpen(o => !o); setGuideOpen(false); }}>
          {menuOpen ? '✕ CLOSE' : '⚡ TECHNIQUES'}
        </button>
        <button id="menu-toggle" onClick={() => { setGuideOpen(o => !o); setMenuOpen(false); }}>
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