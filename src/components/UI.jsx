import React from 'react';

const TECH_DATA = {
    hollowPurple: { name: 'Hollow Purple', character: 'Gojo Satoru', isDomain: false },
    infiniteVoid: { name: 'Infinite Void', character: 'Gojo Satoru', isDomain: true, domainName: 'Unlimited Void' },
    red: { name: 'Cursed Technique Reversal: Red', character: 'Gojo Satoru', isDomain: false },
    malevolentShrine: { name: 'Malevolent Shrine', character: 'Ryomen Sukuna', isDomain: true, domainName: 'Malevolent Shrine' },
    blackFlash: { name: 'Black Flash', character: 'Yuji Itadori', isDomain: false },
    idleTransfiguration: { name: 'Idle Transfiguration', character: 'Mahito', isDomain: true, domainName: 'Self-Embodiment of Perfection' },
    boogieWoogie: { name: 'Boogie Woogie', character: 'Todo Aoi', isDomain: false },
    tenShadows: { name: 'Ten Shadows', character: 'Megumi Fushiguro', isDomain: true, domainName: 'Chimera Shadow Garden' },
    disasterFlames: { name: 'Disaster Flames', character: 'Jogo', isDomain: true, domainName: 'Horizon of the Captivating Skandha' },
    cursedSpeech: { name: 'Cursed Speech', character: 'Inumaki Toge', isDomain: false },
    construction: { name: 'Construction', character: 'Mai/Yorozu', isDomain: false },
    comedy: { name: 'Comedy', character: 'Takaba', isDomain: false },
    bloodManipulation: { name: 'Blood Manipulation', character: 'Choso/Kamo', isDomain: false },
    ratioTechnique: { name: 'Ratio Technique', character: 'Nanami', isDomain: false },
    jackpot: { name: 'Jackpot', character: 'Hakari', isDomain: true, domainName: 'Idle Death Gamble' },
    skyManipulation: { name: 'Sky Manipulation', character: 'Uro', isDomain: false },
    neutral: { name: 'Neutral State', character: '' },
    none: { name: '', character: '' }
};

const UI = ({ technique, voiceActive, lastHeard, voiceLanguage, onToggleVoice, onToggleLanguage }) => {
    const data = TECH_DATA[technique] || { name: technique, character: '' };

    return (
        <>
            <div id="grain"></div>
            <div id="ui">
                <h1>呪術廻戦</h1>

                {data.isDomain && <div className="domain-label">領域展開 / DOMAIN EXPANSION</div>}

                <div id="technique-name">
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

            <div id="voice-controls">
                <div className="voice-buttons">
                    <button
                        id="mic-button"
                        className={voiceActive ? 'active' : ''}
                        onClick={onToggleVoice}
                        aria-label={voiceActive ? "Stop listening" : "Start listening"}
                    >
                        <span className="mic-icon">{voiceActive ? '🎤' : '🎙️'}</span>
                        {voiceActive && <div className="voice-wave"></div>}
                    </button>

                    <button
                        id="lang-toggle"
                        onClick={onToggleLanguage}
                        aria-label="Toggle language"
                    >
                        {voiceLanguage === 'en-US' ? 'EN' : 'JP'}
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
