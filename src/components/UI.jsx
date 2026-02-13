import React from 'react';

const TECH_NAMES = {
    purple: 'Hollow Purple',
    red: 'Cursed Technique Reversal: Red',
    void: 'Unlimited Void',
    shrine: 'Malevolent Shrine',
    blackFlash: 'Black Flash',
    idleTransfiguration: 'Idle Transfiguration',
    boogieWoogie: 'Boogie Woogie',
    tenShadows: 'Ten Shadows Technique',
    disasterFlames: 'Disaster Flames',
    cursedSpeech: 'Cursed Speech',
    construction: 'Construction',
    comedy: 'Comedian',
    bloodManipulation: 'Blood Manipulation',
    ratioTechnique: 'Ratio Technique',
    jackpot: 'Idle Death Gamble: Jackpot',
    skyManipulation: 'Sky Manipulation',
    neutral: 'Neutral State',
    none: ''
};

const UI = ({ technique }) => {
    const name = TECH_NAMES[technique] || (technique !== 'none' ? technique : '');
    return (
        <>
            <div id="grain"></div>
            <div id="ui">
                <h1>呪術廻戦</h1>
                <div id="technique-name">{name}</div>
            </div>
        </>
    );
};

export default UI;
