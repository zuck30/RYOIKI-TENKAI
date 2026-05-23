import React, { useState } from 'react';

const GESTURES = [
  {
    id: 'hollowPurple',
    name: 'Hollow Purple',
    character: 'Gojo Satoru',
    color: '#a333ff',
    trigger: 'Pinch — touch thumb tip to index tip',
    fingers: { thumb: 'down', index: 'down', middle: 'up', ring: 'up', pinky: 'up' },
    note: 'Tips of thumb and index must be very close together',
    svg: `<svg viewBox="0 0 80 100" width="80" height="100">
      <line x1="40" y1="95" x2="40" y2="65" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
      <line x1="40" y1="65" x2="28" y2="55" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="28" y1="55" x2="22" y2="40" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="20" cy="36" r="5" fill="#a333ff" stroke="#fff" stroke-width="1.5"/>
      <line x1="40" y1="65" x2="36" y2="48" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="36" y1="48" x2="26" y2="34" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="24" cy="30" r="5" fill="#a333ff" stroke="#fff" stroke-width="1.5"/>
      <text x="23" y="22" fill="#a333ff" font-size="9" text-anchor="middle">pinch</text>
      <line x1="40" y1="65" x2="44" y2="40" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="44" cy="36" r="4" fill="#555" stroke="#fff" stroke-width="1.5"/>
      <line x1="40" y1="65" x2="52" y2="48" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="52" cy="44" r="4" fill="#555" stroke="#fff" stroke-width="1.5"/>
      <line x1="40" y1="65" x2="58" y2="55" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="58" cy="51" r="4" fill="#555" stroke="#fff" stroke-width="1.5"/>
    </svg>`
  },
  {
    id: 'infiniteVoid',
    name: 'Infinite Void',
    character: 'Gojo Satoru',
    color: '#ffffff',
    trigger: 'Index + Middle fingers up, others folded',
    fingers: { thumb: 'down', index: 'up', middle: 'up', ring: 'down', pinky: 'down' },
    note: 'Like a peace sign — two fingers extended upward',
    svg: `<svg viewBox="0 0 80 100" width="80" height="100">
      <line x1="40" y1="95" x2="40" y2="65" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
      <line x1="40" y1="65" x2="28" y2="55" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="28" cy="51" r="4" fill="#555" stroke="#fff" stroke-width="1.5"/>
      <line x1="40" y1="65" x2="33" y2="35" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="33" y1="35" x2="31" y2="15" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="31" cy="11" r="5" fill="#ffffff" stroke="#aaa" stroke-width="1.5"/>
      <line x1="40" y1="65" x2="44" y2="30" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="44" y1="30" x2="46" y2="10" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="46" cy="6" r="5" fill="#ffffff" stroke="#aaa" stroke-width="1.5"/>
      <line x1="40" y1="65" x2="52" y2="55" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="52" cy="51" r="4" fill="#555" stroke="#fff" stroke-width="1.5"/>
      <line x1="40" y1="65" x2="58" y2="58" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="58" cy="54" r="4" fill="#555" stroke="#fff" stroke-width="1.5"/>
    </svg>`
  },
  {
    id: 'red',
    name: 'Red',
    character: 'Gojo Satoru',
    color: '#ff0000',
    trigger: 'Index finger pointing up only',
    fingers: { thumb: 'down', index: 'up', middle: 'down', ring: 'down', pinky: 'down' },
    note: 'Only index finger extended upward, rest curled',
    svg: `<svg viewBox="0 0 80 100" width="80" height="100">
      <line x1="40" y1="95" x2="40" y2="65" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
      <line x1="40" y1="65" x2="28" y2="55" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="28" cy="51" r="4" fill="#555" stroke="#fff" stroke-width="1.5"/>
      <line x1="40" y1="65" x2="35" y2="32" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="35" y1="32" x2="34" y2="10" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="34" cy="6" r="5" fill="#ff0000" stroke="#fff" stroke-width="1.5"/>
      <line x1="40" y1="65" x2="46" y2="52" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="46" cy="48" r="4" fill="#555" stroke="#fff" stroke-width="1.5"/>
      <line x1="40" y1="65" x2="52" y2="55" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="52" cy="51" r="4" fill="#555" stroke="#fff" stroke-width="1.5"/>
      <line x1="40" y1="65" x2="58" y2="58" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="58" cy="54" r="4" fill="#555" stroke="#fff" stroke-width="1.5"/>
    </svg>`
  },
  {
    id: 'malevolentShrine',
    name: 'Malevolent Shrine',
    character: 'Ryomen Sukuna',
    color: '#ff3300',
    trigger: 'All 4 fingers + thumb fully extended open',
    fingers: { thumb: 'up', index: 'up', middle: 'up', ring: 'up', pinky: 'up' },
    note: 'Full open palm facing camera, all fingers spread',
    svg: `<svg viewBox="0 0 80 100" width="80" height="100">
      <line x1="40" y1="95" x2="40" y2="65" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
      <line x1="40" y1="65" x2="22" y2="50" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="22" y1="50" x2="16" y2="30" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="16" cy="26" r="5" fill="#ff3300" stroke="#fff" stroke-width="1.5"/>
      <line x1="40" y1="65" x2="30" y2="40" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="30" y1="40" x2="27" y2="18" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="27" cy="14" r="5" fill="#ff3300" stroke="#fff" stroke-width="1.5"/>
      <line x1="40" y1="65" x2="40" y2="38" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="40" y1="38" x2="40" y2="14" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="40" cy="10" r="5" fill="#ff3300" stroke="#fff" stroke-width="1.5"/>
      <line x1="40" y1="65" x2="50" y2="40" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="50" y1="40" x2="53" y2="18" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="53" cy="14" r="5" fill="#ff3300" stroke="#fff" stroke-width="1.5"/>
      <line x1="40" y1="65" x2="58" y2="50" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="58" y1="50" x2="64" y2="30" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="64" cy="26" r="5" fill="#ff3300" stroke="#fff" stroke-width="1.5"/>
    </svg>`
  },
  {
    id: 'blackFlash',
    name: 'Black Flash',
    character: 'Yuji Itadori',
    color: '#ff0055',
    trigger: 'Closed fist (all fingers curled down)',
    fingers: { thumb: 'down', index: 'down', middle: 'down', ring: 'down', pinky: 'down' },
    note: 'Make a tight fist — keep it below your head height',
    svg: `<svg viewBox="0 0 80 100" width="80" height="100">
      <line x1="40" y1="95" x2="40" y2="68" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
      <rect x="22" y="48" width="36" height="24" rx="8" fill="#333" stroke="#fff" stroke-width="2"/>
      <line x1="26" y1="48" x2="24" y2="42" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="33" y1="48" x2="32" y2="40" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="40" y1="48" x2="40" y2="40" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="47" y1="48" x2="48" y2="40" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="54" y1="48" x2="56" y2="44" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'jackpot',
    name: 'Jackpot',
    character: 'Hakari',
    color: '#00ffff',
    trigger: 'Closed fist raised HIGH (above 35% of frame)',
    fingers: { thumb: 'down', index: 'down', middle: 'down', ring: 'down', pinky: 'down' },
    note: 'Same fist as Black Flash but raise your arm up high!',
    svg: `<svg viewBox="0 0 80 100" width="80" height="100">
      <line x1="40" y1="95" x2="40" y2="38" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
      <rect x="22" y="18" width="36" height="24" rx="8" fill="#333" stroke="#fff" stroke-width="2"/>
      <line x1="26" y1="18" x2="24" y2="12" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="33" y1="18" x2="32" y2="10" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="40" y1="18" x2="40" y2="10" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="47" y1="18" x2="48" y2="10" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="54" y1="18" x2="56" y2="14" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
      <text x="40" y="96" fill="#00ffff" font-size="8" text-anchor="middle">raise it high!</text>
    </svg>`
  },
  {
    id: 'comedy',
    name: 'Comedy',
    character: 'Takaba',
    color: '#ff00ff',
    trigger: 'Finger guns — index up + thumb out, others folded',
    fingers: { thumb: 'up', index: 'up', middle: 'down', ring: 'down', pinky: 'down' },
    note: 'Like shooting finger guns — index and thumb extended',
    svg: `<svg viewBox="0 0 80 100" width="80" height="100">
      <line x1="40" y1="95" x2="40" y2="65" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
      <line x1="40" y1="65" x2="22" y2="58" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="22" y1="58" x2="10" y2="52" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="7" cy="51" r="5" fill="#ff00ff" stroke="#fff" stroke-width="1.5"/>
      <line x1="40" y1="65" x2="36" y2="35" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="36" y1="35" x2="35" y2="12" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="35" cy="8" r="5" fill="#ff00ff" stroke="#fff" stroke-width="1.5"/>
      <line x1="40" y1="65" x2="47" y2="52" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="47" cy="48" r="4" fill="#555" stroke="#fff" stroke-width="1.5"/>
      <line x1="40" y1="65" x2="53" y2="55" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="53" cy="51" r="4" fill="#555" stroke="#fff" stroke-width="1.5"/>
      <line x1="40" y1="65" x2="58" y2="58" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="58" cy="54" r="4" fill="#555" stroke="#fff" stroke-width="1.5"/>
    </svg>`
  },
  {
    id: 'bloodManipulation',
    name: 'Blood Manipulation',
    character: 'Choso / Kamo',
    color: '#880000',
    trigger: 'Index finger only pointing sideways/drawing',
    fingers: { thumb: 'down', index: 'up', middle: 'down', ring: 'down', pinky: 'down' },
    note: 'Extend only index finger, curl everything else tight',
    svg: `<svg viewBox="0 0 80 100" width="80" height="100">
      <line x1="40" y1="95" x2="40" y2="65" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
      <line x1="40" y1="65" x2="28" y2="55" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="28" cy="51" r="4" fill="#555" stroke="#fff" stroke-width="1.5"/>
      <line x1="40" y1="65" x2="35" y2="32" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="35" y1="32" x2="34" y2="10" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="34" cy="6" r="5" fill="#880000" stroke="#fff" stroke-width="1.5"/>
      <line x1="40" y1="65" x2="46" y2="52" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="46" cy="48" r="4" fill="#555" stroke="#fff" stroke-width="1.5"/>
      <line x1="40" y1="65" x2="52" y2="55" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="52" cy="51" r="4" fill="#555" stroke="#fff" stroke-width="1.5"/>
      <line x1="40" y1="65" x2="58" y2="58" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="58" cy="54" r="4" fill="#555" stroke="#fff" stroke-width="1.5"/>
    </svg>`
  },
  {
    id: 'disasterFlames',
    name: 'Disaster Flames',
    character: 'Jogo',
    color: '#ff6600',
    trigger: 'Claw hand — fingers curled but not fully closed',
    fingers: { thumb: 'mid', index: 'mid', middle: 'mid', ring: 'mid', pinky: 'mid' },
    note: 'Spread fingers and curl them inward like a claw',
    svg: `<svg viewBox="0 0 80 100" width="80" height="100">
      <line x1="40" y1="95" x2="40" y2="65" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
      <line x1="40" y1="65" x2="22" y2="52" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="22" y1="52" x2="18" y2="40" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="18" y1="40" x2="23" y2="34" stroke="#ff6600" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="40" y1="65" x2="30" y2="42" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="30" y1="42" x2="28" y2="28" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="28" y1="28" x2="33" y2="22" stroke="#ff6600" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="40" y1="65" x2="40" y2="40" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="40" y1="40" x2="40" y2="25" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="40" y1="25" x2="45" y2="19" stroke="#ff6600" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="40" y1="65" x2="50" y2="42" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="50" y1="42" x2="52" y2="28" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="52" y1="28" x2="57" y2="22" stroke="#ff6600" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="40" y1="65" x2="58" y2="52" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="58" y1="52" x2="62" y2="40" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="62" y1="40" x2="57" y2="34" stroke="#ff6600" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'ratioTechnique',
    name: 'Ratio Technique',
    character: 'Nanami',
    color: '#ccff00',
    trigger: 'Open palm flat — all fingers straight + close together',
    fingers: { thumb: 'up', index: 'up', middle: 'up', ring: 'up', pinky: 'up' },
    note: 'Flat open palm but fingers must be CLOSE together (chopping motion)',
    svg: `<svg viewBox="0 0 80 100" width="80" height="100">
      <line x1="40" y1="95" x2="40" y2="65" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
      <line x1="40" y1="65" x2="24" y2="52" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="24" y1="52" x2="20" y2="32" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="20" cy="28" r="5" fill="#ccff00" stroke="#555" stroke-width="1.5"/>
      <line x1="40" y1="65" x2="31" y2="40" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="31" y1="40" x2="29" y2="18" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="29" cy="14" r="5" fill="#ccff00" stroke="#555" stroke-width="1.5"/>
      <line x1="40" y1="65" x2="40" y2="38" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="40" y1="38" x2="40" y2="15" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="40" cy="11" r="5" fill="#ccff00" stroke="#555" stroke-width="1.5"/>
      <line x1="40" y1="65" x2="49" y2="40" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="49" y1="40" x2="51" y2="18" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="51" cy="14" r="5" fill="#ccff00" stroke="#555" stroke-width="1.5"/>
      <line x1="40" y1="65" x2="56" y2="52" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="56" y1="52" x2="60" y2="32" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="60" cy="28" r="5" fill="#ccff00" stroke="#555" stroke-width="1.5"/>
      <text x="40" y="96" fill="#ccff00" font-size="8" text-anchor="middle">fingers together!</text>
    </svg>`
  },
  {
    id: 'idleTransfiguration',
    name: 'Idle Transfiguration',
    character: 'Mahito',
    color: '#00ffcc',
    trigger: 'All fingers bent downward (wiggling/grasping)',
    fingers: { thumb: 'down', index: 'down', middle: 'down', ring: 'down', pinky: 'down' },
    note: 'Curl fingers so tips go below knuckles — like reaching down',
    svg: `<svg viewBox="0 0 80 100" width="80" height="100">
      <line x1="40" y1="95" x2="40" y2="65" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
      <line x1="40" y1="65" x2="24" y2="55" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="24" y1="55" x2="20" y2="48" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="20" y1="48" x2="24" y2="58" stroke="#00ffcc" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="40" y1="65" x2="31" y2="52" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="31" y1="52" x2="28" y2="42" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="28" y1="42" x2="32" y2="52" stroke="#00ffcc" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="40" y1="65" x2="40" y2="50" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="40" y1="50" x2="40" y2="38" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="40" y1="38" x2="40" y2="50" stroke="#00ffcc" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="40" y1="65" x2="49" y2="52" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="49" y1="52" x2="52" y2="42" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="52" y1="42" x2="48" y2="52" stroke="#00ffcc" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="40" y1="65" x2="56" y2="55" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="56" y1="55" x2="60" y2="48" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="60" y1="48" x2="56" y2="58" stroke="#00ffcc" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'boogieWoogie',
    name: 'Boogie Woogie',
    character: 'Todo Aoi',
    color: '#ffff00',
    trigger: 'BOTH hands close together (clap position)',
    fingers: { thumb: 'up', index: 'up', middle: 'up', ring: 'up', pinky: 'up' },
    note: 'Need both hands! Bring palms close together in front of camera',
    svg: `<svg viewBox="0 0 80 100" width="80" height="100">
      <line x1="22" y1="95" x2="22" y2="72" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <rect x="8" y="55" width="22" height="20" rx="5" fill="#333" stroke="#fff" stroke-width="1.5"/>
      <line x1="13" y1="55" x2="12" y2="48" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
      <line x1="18" y1="55" x2="18" y2="46" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
      <line x1="23" y1="55" x2="24" y2="46" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
      <line x1="28" y1="55" x2="29" y2="48" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
      <line x1="58" y1="95" x2="58" y2="72" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <rect x="50" y="55" width="22" height="20" rx="5" fill="#333" stroke="#fff" stroke-width="1.5"/>
      <line x1="53" y1="55" x2="51" y2="48" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
      <line x1="58" y1="55" x2="57" y2="46" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
      <line x1="63" y1="55" x2="62" y2="46" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
      <line x1="68" y1="55" x2="68" y2="48" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
      <text x="40" y="44" fill="#ffff00" font-size="9" text-anchor="middle">both hands!</text>
      <line x1="30" y1="65" x2="50" y2="65" stroke="#ffff00" stroke-width="1.5" stroke-dasharray="3,2"/>
    </svg>`
  },
  {
    id: 'tenShadows',
    name: 'Ten Shadows',
    character: 'Megumi Fushiguro',
    color: '#aaaaaa',
    trigger: 'BOTH hands — fingertip of one near thumb of other',
    fingers: { thumb: 'up', index: 'up', middle: 'up', ring: 'up', pinky: 'up' },
    note: 'Shadow puppet pose — bring one hand\'s index near other hand\'s thumb',
    svg: `<svg viewBox="0 0 80 100" width="80" height="100">
      <line x1="20" y1="95" x2="20" y2="68" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <rect x="6" y="50" width="22" height="20" rx="5" fill="#333" stroke="#fff" stroke-width="1.5"/>
      <line x1="11" y1="50" x2="10" y2="40" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
      <line x1="16" y1="50" x2="15" y2="38" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
      <line x1="21" y1="50" x2="21" y2="38" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
      <line x1="60" y1="95" x2="60" y2="68" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <rect x="52" y="50" width="22" height="20" rx="5" fill="#333" stroke="#fff" stroke-width="1.5"/>
      <line x1="57" y1="50" x2="55" y2="40" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
      <line x1="62" y1="50" x2="61" y2="38" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
      <line x1="67" y1="50" x2="67" y2="40" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
      <circle cx="22" cy="38" r="4" fill="#aaaaaa" stroke="#fff" stroke-width="1"/>
      <circle cx="55" cy="40" r="4" fill="#aaaaaa" stroke="#fff" stroke-width="1"/>
      <line x1="22" y1="38" x2="55" y2="40" stroke="#aaaaaa" stroke-width="1.5" stroke-dasharray="3,2"/>
      <text x="40" y="30" fill="#aaa" font-size="8" text-anchor="middle">tips close!</text>
    </svg>`
  },
  {
    id: 'skyManipulation',
    name: 'Sky Manipulation',
    character: 'Uro',
    color: '#aaaaff',
    trigger: 'Open palm but move hand to far LEFT or RIGHT edge',
    fingers: { thumb: 'up', index: 'up', middle: 'up', ring: 'up', pinky: 'up' },
    note: 'Open palm same as Construction but move it to the edge of frame',
    svg: `<svg viewBox="0 0 80 100" width="80" height="100">
      <line x1="15" y1="95" x2="15" y2="65" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="15" y1="65" x2="5" y2="52" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="5" cy="49" r="4" fill="#aaaaff" stroke="#fff" stroke-width="1"/>
      <line x1="15" y1="65" x2="10" y2="45" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="10" cy="41" r="4" fill="#aaaaff" stroke="#fff" stroke-width="1"/>
      <line x1="15" y1="65" x2="15" y2="43" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="15" cy="39" r="4" fill="#aaaaff" stroke="#fff" stroke-width="1"/>
      <line x1="15" y1="65" x2="20" y2="45" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="20" cy="41" r="4" fill="#aaaaff" stroke="#fff" stroke-width="1"/>
      <line x1="15" y1="65" x2="25" y2="52" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="25" cy="49" r="4" fill="#aaaaff" stroke="#fff" stroke-width="1"/>
      <text x="50" y="60" fill="#aaaaff" font-size="8" text-anchor="middle">← edge of</text>
      <text x="50" y="70" fill="#aaaaff" font-size="8" text-anchor="middle">the frame</text>
    </svg>`
  },
  {
    id: 'construction',
    name: 'Construction',
    character: 'Mai / Yorozu',
    color: '#999999',
    trigger: 'Open palm centered in the frame',
    fingers: { thumb: 'up', index: 'up', middle: 'up', ring: 'up', pinky: 'up' },
    note: 'Open palm facing camera, keep hand near center of frame',
    svg: `<svg viewBox="0 0 80 100" width="80" height="100">
      <line x1="40" y1="95" x2="40" y2="65" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
      <line x1="40" y1="65" x2="24" y2="52" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="24" y1="52" x2="20" y2="32" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="20" cy="28" r="5" fill="#999" stroke="#fff" stroke-width="1.5"/>
      <line x1="40" y1="65" x2="31" y2="40" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="31" y1="40" x2="29" y2="18" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="29" cy="14" r="5" fill="#999" stroke="#fff" stroke-width="1.5"/>
      <line x1="40" y1="65" x2="40" y2="38" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="40" y1="38" x2="40" y2="15" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="40" cy="11" r="5" fill="#999" stroke="#fff" stroke-width="1.5"/>
      <line x1="40" y1="65" x2="49" y2="40" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="49" y1="40" x2="51" y2="18" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="51" cy="14" r="5" fill="#999" stroke="#fff" stroke-width="1.5"/>
      <line x1="40" y1="65" x2="56" y2="52" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="56" y1="52" x2="60" y2="32" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="60" cy="28" r="5" fill="#999" stroke="#fff" stroke-width="1.5"/>
      <text x="40" y="96" fill="#999" font-size="8" text-anchor="middle">center of frame</text>
    </svg>`
  },
  {
    id: 'cursedSpeech',
    name: 'Cursed Speech',
    character: 'Inumaki Toge',
    color: '#0066ff',
    trigger: 'Index up + hand low in frame (below 60% height)',
    fingers: { thumb: 'down', index: 'up', middle: 'down', ring: 'down', pinky: 'down' },
    note: 'Point index finger but keep your hand LOW in the camera frame',
    svg: `<svg viewBox="0 0 80 100" width="80" height="100">
      <line x1="40" y1="95" x2="40" y2="75" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
      <line x1="40" y1="75" x2="28" y2="68" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="28" cy="65" r="4" fill="#555" stroke="#fff" stroke-width="1.5"/>
      <line x1="40" y1="75" x2="36" y2="55" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="36" y1="55" x2="35" y2="42" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="35" cy="38" r="5" fill="#0066ff" stroke="#fff" stroke-width="1.5"/>
      <line x1="40" y1="75" x2="47" y2="65" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="47" cy="62" r="4" fill="#555" stroke="#fff" stroke-width="1.5"/>
      <line x1="40" y1="75" x2="53" y2="68" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="53" cy="65" r="4" fill="#555" stroke="#fff" stroke-width="1.5"/>
      <line x1="40" y1="75" x2="58" y2="70" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="58" cy="67" r="4" fill="#555" stroke="#fff" stroke-width="1.5"/>
      <text x="40" y="30" fill="#0066ff" font-size="8" text-anchor="middle">hand LOW</text>
      <text x="40" y="20" fill="#0066ff" font-size="8" text-anchor="middle">in frame!</text>
    </svg>`
  },
];

const GestureGuide = ({ onClose, onTechSelect }) => {
  const [active, setActive] = useState(null);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.95)', zIndex: 300,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      backdropFilter: 'blur(10px)', overflowY: 'auto', padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{ width: '100%', maxWidth: '900px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '1.2rem', fontWeight: 900, letterSpacing: '6px', color: '#c8a96e' }}>
            GESTURE GUIDE
          </div>
          <button onClick={onClose} style={{
            background: 'transparent', border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff', fontFamily: "'Cinzel', serif", fontSize: '0.75rem',
            letterSpacing: '2px', padding: '8px 16px', borderRadius: '4px',
            cursor: 'pointer'
          }}>✕ CLOSE</button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '12px'
        }}>
          {GESTURES.map(g => (
            <div
              key={g.id}
              onClick={() => { setActive(g.id === active ? null : g.id); onTechSelect(g.id); }}
              style={{
                background: active === g.id ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${active === g.id ? g.color : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '8px', padding: '14px 16px', cursor: 'pointer',
                display: 'flex', gap: '14px', alignItems: 'center',
                transition: 'all 0.2s ease',
                boxShadow: active === g.id ? `0 0 15px ${g.color}33` : 'none',
                position: 'relative', overflow: 'hidden'
              }}
            >
              <div style={{ width: '3px', position: 'absolute', left: 0, top: 0, bottom: 0, background: g.color, boxShadow: `0 0 6px ${g.color}` }} />
              <div style={{ flexShrink: 0, opacity: 0.9 }} dangerouslySetInnerHTML={{ __html: g.svg }} />
              <div>
                {g.id === 'boogieWoogie' || g.id === 'tenShadows' ? (
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: '0.6rem', color: '#ffff00', letterSpacing: '2px', marginBottom: '3px' }}>2 HANDS</div>
                ) : null}
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: '0.8rem', fontWeight: 700, color: '#fff', letterSpacing: '1px', lineHeight: 1.3, marginBottom: '4px' }}>{g.name}</div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic', marginBottom: '6px' }}>{g.character}</div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: '0.68rem', color: g.color, lineHeight: 1.4 }}>{g.note}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '16px', textAlign: 'center', fontFamily: "'Cinzel', serif", fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px' }}>
          CLICK A CARD TO PREVIEW THE TECHNIQUE
        </div>
      </div>
    </div>
  );
};

export default GestureGuide;