import React from 'react';

const TECH_DATA = {
    purple: { name: 'Hollow Purple', character: 'Gojo Satoru' },
    red: { name: 'Cursed Technique Reversal: Red', character: 'Gojo Satoru' },
    void: { name: 'Unlimited Void', character: 'Gojo Satoru' },
    shrine: { name: 'Malevolent Shrine', character: 'Ryomen Sukuna' },
    blackFlash: { name: 'Black Flash', character: 'Yuji Itadori' },
    idleTransfiguration: { name: 'Idle Transfiguration', character: 'Mahito' },
    boogieWoogie: { name: 'Boogie Woogie', character: 'Todo Aoi' },
    tenShadows: { name: 'Ten Shadows Technique', character: 'Megumi Fushiguro' },
    disasterFlames: { name: 'Disaster Flames', character: 'Jogo' },
    cursedSpeech: { name: 'Cursed Speech', character: 'Inumaki Toge' },
    construction: { name: 'Construction', character: 'Yorozu' },
    comedy: { name: 'Comedian', character: 'Takaba' },
    bloodManipulation: { name: 'Blood Manipulation', character: 'Choso' },
    ratioTechnique: { name: 'Ratio Technique', character: 'Nanami Kento' },
    jackpot: { name: 'Idle Death Gamble', character: 'Kinji Hakari' },
    skyManipulation: { name: 'Sky Manipulation', character: 'Takako Uro' },
    neutral: { name: 'Neutral State', character: '' },
    none: { name: '', character: '' }
};

const UI = ({ technique }) => {
    const data = TECH_DATA[technique] || { name: technique, character: '' };
    return (
        <>
            <div id="grain"></div>
            <div id="ui">
                <h1>呪術廻戦</h1>
                <div id="technique-name">{data.name}</div>
                {data.character && <div id="character-name">{data.character}</div>}
            </div>
        </>
    );
};

export default UI;
