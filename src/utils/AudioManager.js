const BASE_URL = import.meta.env.BASE_URL || '/';

const sounds = {
    infiniteVoid: new Audio(`${BASE_URL}sounds/unlimited-void.mp3`),
    idleTransfiguration: new Audio(`${BASE_URL}sounds/idle-transfiguration.mp3`),
    cursedEnergy: new Audio(`${BASE_URL}sounds/cursed-energy.mp3`),
    blackFlash: new Audio(`${BASE_URL}sounds/yuji-itadori-black-flash.mp3`),
    malevolentShrine: new Audio(`${BASE_URL}sounds/unlimited-void.mp3`), // User mentioned unlimited-void (sukuna)
};

// -------------------
// THEME MUSIC
// -------------------

const themeMusic = new Audio(`${BASE_URL}sounds/theme.mp3`);

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

    return sound.play().catch((err) => {
        console.log(err);
    });
};

/**
 * Plays cursed energy charge up then the domain expansion sound
 */
const playDomain = (name, muted = false) => {
    if (muted) return;

    stop();
    const cursedEnergy = sounds.cursedEnergy;
    const domainSound = sounds[name];

    if (!cursedEnergy || !domainSound) {
        return play(name, muted);
    }

    cursedEnergy.currentTime = 0;
    cursedEnergy.play().then(() => {
        cursedEnergy.onended = () => {
            domainSound.currentTime = 0;
            domainSound.play().catch(err => console.log(err));
            cursedEnergy.onended = null;
        };
    }).catch(err => {
        console.log(err);
        play(name, muted);
    });
}

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
    playDomain,
    stop,
    toggleMute,
    startThemeMusic,
    stopThemeMusic
};

export default AudioManager;