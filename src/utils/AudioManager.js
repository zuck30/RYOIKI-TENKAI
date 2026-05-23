const sounds = {
    infiniteVoid: new Audio('/sounds/unlimited-void.mp3'),
    idleTransfiguration: new Audio('/sounds/idle-transfiguration.mp3'),
    cursedEnergy: new Audio('/sounds/cursed-energy.mp3'),

    // ADD MORE TECHNIQUES HERE
    // hollowPurple: new Audio('/sounds/hollow-purple.mp3'),
    // malevolentShrine: new Audio('/sounds/malevolent-shrine.mp3'),
    // blackFlash: new Audio('/sounds/black-flash.mp3'),
};

// -------------------
// THEME MUSIC
// -------------------

const themeMusic = new Audio('/sounds/theme.mp3');

themeMusic.loop = true;
themeMusic.volume = 0.35;

// -------------------
// PRELOAD
// -------------------

Object.values(sounds).forEach((sound) => {
    sound.preload = 'auto';
});

themeMusic.preload = 'auto';

// -------------------
// STOP ALL EFFECTS
// -------------------

const stop = () => {

    Object.values(sounds).forEach((sound) => {
        sound.pause();
        sound.currentTime = 0;
    });
};

// -------------------
// PLAY EFFECT SOUND
// -------------------

const play = (name, muted = false) => {

    if (muted) return;

    const sound = sounds[name];

    if (!sound) {
        console.log('Sound not found:', name);
        return;
    }

    // stop previous sounds
    stop();

    sound.currentTime = 0;

    sound.play().catch((err) => {
        console.log(err);
    });
};

// -------------------
// START THEME
// -------------------

const startThemeMusic = (muted = false) => {

    if (muted) return;

    if (themeMusic.paused) {

        themeMusic.play().catch((err) => {
            console.log('Theme music blocked:', err);
        });
    }
};

// -------------------
// STOP THEME
// -------------------

const stopThemeMusic = () => {

    themeMusic.pause();
};

// -------------------
// MUTE TOGGLE
// -------------------

let isMuted = false;

const toggleMute = () => {

    isMuted = !isMuted;

    if (isMuted) {
        stop();
        stopThemeMusic();
    }

    return isMuted;
};

// -------------------
// EXPORT
// -------------------

const AudioManager = {
    play,
    stop,
    toggleMute,
    startThemeMusic,
    stopThemeMusic
};

export default AudioManager;