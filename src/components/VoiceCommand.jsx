import React, { useEffect, useRef, useState, useCallback } from 'react';

const VOICE_COMMANDS = {
  // English Domain Expansions
  "domain expansion malevolent shrine": "malevolentShrine",
  "domain expansion infinite void": "infiniteVoid",
  "domain expansion self-embodiment of perfection": "idleTransfiguration",
  "domain expansion horizon of the captivating skandha": "disasterFlames",
  "domain expansion chimera shadow garden": "tenShadows",

  // Japanese Domain Expansions (transliterated)
  "ryoiki tenkai fukuma mizushi": "malevolentShrine",
  "ryoiki tenkai mugen kosatsu": "infiniteVoid",
  "ryoiki tenkai jiko zanei no en": "idleTransfiguration",
  "ryoiki tenkai gyokusai no kaihoraku": "disasterFlames",
  "ryoiki tenkai kimeru shado gaden": "tenShadows",

  // English Techniques
  "black flash": "blackFlash",
  "cursed speech": "cursedSpeech",
  "boogie woogie": "boogieWoogie",
  "idle transfiguration": "idleTransfiguration",
  "ten shadows": "tenShadows",
  "blood manipulation": "bloodManipulation",
  "ratio technique": "ratioTechnique",
  "jackpot": "jackpot",
  "sky manipulation": "skyManipulation",
  "construction": "construction",
  "comedy": "comedy",
  "hollow purple": "hollowPurple",
  "murasaki": "hollowPurple",
  "red": "red",
  "aka": "red",

  // Japanese Techniques (transliterated)
  "kokusen": "blackFlash",
  "koto no shigami": "cursedSpeech",

  // Control Commands
  "activate": "activate",
  "release": "release",
  "return": "return",
  "stop": "stop"
};

const JAPANESE_NATIVE_COMMANDS = {
  "領域展開 伏魔御厨子": "malevolentShrine",
  "領域展開 無量空処": "infiniteVoid",
  "領域展開 自閉円頓裹": "idleTransfiguration",
  "領域展開 蓋棺鉄囲山": "disasterFlames",
  "領域展開 嵌合暗翳庭": "tenShadows",
  "黒閃": "blackFlash",
  "呪言": "cursedSpeech",
  "不義遊戯": "boogieWoogie",
  "十種影法術": "tenShadows",
  "虚式 茈": "hollowPurple",
  "赫": "red",
  "赤": "red",
  "紫": "hollowPurple",
  "解除": "release",
  "停止": "stop",
  "戻れ": "return"
};

const VoiceCommand = ({ onCommandDetected, onListeningChange, onError, active, language = 'en-US' }) => {
    const [isSupported] = useState(() => {
        return typeof window !== 'undefined' && !!(window.SpeechRecognition || window.webkitSpeechRecognition);
    });

    const processTranscript = useCallback((transcript) => {
        console.log(`Voice recognized: "${transcript}" (${language})`);
        const cleanTranscript = transcript.replace(/[:.,!?]/g, "").toLowerCase().trim();

        const mappings = language.startsWith('ja')
            ? { ...VOICE_COMMANDS, ...JAPANESE_NATIVE_COMMANDS }
            : VOICE_COMMANDS;

        let detectedTechId = null;

        // Try exact match
        for (const [command, techId] of Object.entries(mappings)) {
            const cleanCommand = command.replace(/[:.,!?]/g, "").toLowerCase().trim();
            if (cleanTranscript === cleanCommand) {
                detectedTechId = techId;
                break;
            }
        }

        // Try transcript includes command (e.g. "I say hollow purple now")
        if (!detectedTechId) {
            for (const [command, techId] of Object.entries(mappings)) {
                const cleanCommand = command.replace(/[:.,!?]/g, "").toLowerCase().trim();
                if (cleanTranscript.includes(cleanCommand)) {
                    detectedTechId = techId;
                    break;
                }
            }
        }

        // Try command includes transcript (e.g. "malevolent shrine")
        if (!detectedTechId && cleanTranscript.length > 4) {
            for (const [command, techId] of Object.entries(mappings)) {
                const cleanCommand = command.replace(/[:.,!?]/g, "").toLowerCase().trim();
                if (cleanCommand.includes(cleanTranscript)) {
                    detectedTechId = techId;
                    break;
                }
            }
        }

        onCommandDetected(detectedTechId, transcript);
    }, [onCommandDetected, language]);

    useEffect(() => {
        if (!isSupported || !active) {
            if (onListeningChange) onListeningChange(false);
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = language;

        recognition.onstart = () => {
            if (onListeningChange) onListeningChange(true);
        };

        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript;
            processTranscript(transcript);
        };

        recognition.onerror = (event) => {
            console.error("Speech Recognition Error:", event.error);
            if (event.error === 'not-allowed' && onError) {
                onError("Permission denied");
            }
        };

        recognition.onend = () => {
            // If it should still be active, restart it
            if (active) {
                try {
                    recognition.start();
                } catch (e) {
                    // Fail silently or handle
                }
            } else {
                if (onListeningChange) onListeningChange(false);
            }
        };

        try {
            recognition.start();
        } catch (e) {
            console.error("Start error:", e);
        }

        return () => {
            recognition.onend = null; // Prevent restart on unmount
            recognition.stop();
        };
    }, [active, language, isSupported, onListeningChange, onError, processTranscript]);

    return null;
};

export default VoiceCommand;
