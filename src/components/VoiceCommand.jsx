import React, { useEffect, useRef, useState, useCallback } from 'react';

const VOICE_COMMANDS = {
  // English Domain Expansions
  "domain expansion: malevolent shrine": "malevolentShrine",
  "domain expansion: infinite void": "infiniteVoid",
  "domain expansion: self-embodiment of perfection": "idleTransfiguration",
  "domain expansion: horizon of the captivating skandha": "disasterFlames",
  "domain expansion: chimera shadow garden": "tenShadows",

  // Japanese Domain Expansions (transliterated)
  "ryoiki tenkai: fukuma mizushi": "malevolentShrine",
  "ryoiki tenkai: mugen kosatsu": "infiniteVoid",
  "ryoiki tenkai: jiko zan'ei no en": "idleTransfiguration",
  "ryoiki tenkai: gyokusai no kaihoraku": "disasterFlames",
  "ryoiki tenkai: kimeru shado gaden": "tenShadows",

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

// Native Japanese script mappings for ja-JP recognition
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
    const recognitionRef = useRef(null);
    const isActiveRef = useRef(active);
    const [isSupported] = useState(() => {
        return typeof window !== 'undefined' && !!(window.SpeechRecognition || window.webkitSpeechRecognition);
    });

    // Keep ref in sync to avoid stale closures in recognition handlers
    useEffect(() => {
        isActiveRef.current = active;
    }, [active]);

    const processTranscript = useCallback((transcript) => {
        console.log(`Detected voice transcript (${language}):`, transcript);

        // Clean transcript from common punctuation
        const cleanTranscript = transcript.replace(/[:.,!?]/g, "").toLowerCase().trim();

        let detectedTechId = null;
        let matchedText = transcript;

        const mappings = language.startsWith('ja')
            ? { ...VOICE_COMMANDS, ...JAPANESE_NATIVE_COMMANDS }
            : VOICE_COMMANDS;

        // Try exact match first
        for (const [command, techId] of Object.entries(mappings)) {
            const cleanCommand = command.replace(/[:.,!?]/g, "").toLowerCase().trim();
            if (cleanTranscript === cleanCommand) {
                detectedTechId = techId;
                matchedText = command;
                break;
            }
        }

        // If no exact match, try includes
        if (!detectedTechId) {
            for (const [command, techId] of Object.entries(mappings)) {
                const cleanCommand = command.replace(/[:.,!?]/g, "").toLowerCase().trim();
                if (cleanTranscript.includes(cleanCommand)) {
                    detectedTechId = techId;
                    matchedText = command;
                    break;
                }
            }
        }

        if (detectedTechId) {
            onCommandDetected(detectedTechId, transcript);
        } else if (matchedText) {
            // Even if no tech ID, we can report what was heard if needed,
            // but the current App logic expects a technique or control command.
            onCommandDetected(null, transcript);
        }
    }, [onCommandDetected, language]);

    useEffect(() => {
        if (!isSupported) {
            if (onError) onError("Web Speech API is not supported in this browser.");
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

        recognition.onend = () => {
            // Only notify parent if we really want to be inactive
            if (!isActiveRef.current) {
                if (onListeningChange) onListeningChange(false);
            } else {
                // If we should be active, restart it
                try {
                    recognition.start();
                } catch (err) {
                    console.error("Failed to restart recognition:", err);
                    if (onListeningChange) onListeningChange(false);
                }
            }
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            if (event.error === 'not-allowed') {
                if (onError) onError("Microphone permission denied.");
            } else if (event.error === 'network') {
                if (onError) onError("Network error during speech recognition.");
            }
            // recognition.onend will handle restart if active
        };

        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript;
            processTranscript(transcript);
        };

        recognitionRef.current = recognition;

        if (active) {
            try {
                recognition.start();
            } catch (err) {
                console.error("Initial start failed:", err);
            }
        }

        return () => {
            recognitionRef.current = null;
            recognition.stop();
        };
    }, [language, onListeningChange, onError, isSupported, processTranscript]); // Note: 'active' omitted to prevent full re-init on toggle

    // Handle manual toggle
    useEffect(() => {
        if (!recognitionRef.current) return;

        if (active) {
            try {
                recognitionRef.current.start();
            } catch (err) {
                // Already started or error
            }
        } else {
            try {
                recognitionRef.current.stop();
            } catch (err) {
                // Already stopped
            }
        }
    }, [active]);

    if (!isSupported) return null;

    return null;
};

export default VoiceCommand;
