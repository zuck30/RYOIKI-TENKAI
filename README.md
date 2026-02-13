
# RYOIKI-TENKAI

![Banner](https://capsule-render.vercel.app/api?type=venom&height=200&color=0:667eea,100:764ba2&text=RYOIKI-TENKAI&textBg=false&desc=(Domain+Expansion)&descAlign=79&fontAlign=50&descAlignY=70&fontColor=f7f5f5)

<p align="center">
RYOIKI-TENKAI is a cursed technique visualizer based on the popular anime series, Jujutsu Kaisen 呪術廻戦. It combines the MediaPipe library with Three.js to recreate cursed techniques from Jujutsu Kaisen through hand gestures and particle systems. Now featuring 16 unique techniques and domain expansions!
</p>

![Demo GIF](https://github.com/user-attachments/assets/8ad2b871-02c0-4b97-95f3-34682e745be0)

![React](https://img.shields.io/badge/React-18.2.0-blue) ![Three.js](https://img.shields.io/badge/Three.js-r128-green) ![MediaPipe](https://img.shields.io/badge/MediaPipe-Hands-brightgreen) ![Vite](https://img.shields.io/badge/Vite-4.0-purple) ![Techniques](https://img.shields.io/badge/Techniques-16-orange)

<br>

<h2 id=lang>Tech Stack</h2>

**Frontend**

![technologies](https://skillicons.dev/icons?i=react,js,html,css&perline=10)

**3D & ML**

![technologies](https://skillicons.dev/icons?i=threejs,python&perline=10)

**Tools & Platforms**

![technologies](https://skillicons.dev/icons?i=github,vscode,vercel&perline=10)


<h2> Quick Start</h2>

### Prerequisites

- Node.js 14+
- Modern web browser with webcam support
- Webcam for gesture detection

## Project Structure

- `src/components/`: React components for visualization and hand tracking
- `src/App.jsx`: Main application container and state management
- `src/App.css`: Global styles and animations

## Setup and Installation

### Backend (Not applicable - Fully frontend)

This is a client-side only application running entirely in the browser.

### Frontend

1.  Clone the repository:
    ```bash
    git clone https://github.com/zuck30/RYOIKI-TENKAI.git
    cd RYOIKI-TENKAI
    ```
2.  Install the required npm packages:
    ```bash
    npm install
    ```
3.  Start the React development server:
    ```bash
    npm run dev
    ```
4.  Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Features

This project utilizes particles to render volume-based cursed techniques. Below are all 16 implemented techniques:

### Original Techniques (4)

| Technique | Character | Trigger | Visual Effect |
|-----------|-----------|---------|---------------|
| **Hollow Purple** | Gojo Satoru | Pinch gesture (Thumb + Index touching) | Chaotic singularity combining attraction and repulsion |
| **Infinite Void** | Gojo Satoru | Cross gesture (Index + Middle fingers crossed) | Multi-layered celestial domain with event horizon ring |
| **Red** | Gojo Satoru | Index finger pointing up | Blinding white-hot core with jagged sphere of repulsive force |
| **Malevolent Shrine** | Ryomen Sukuna | Flat hand / Prayer gesture | Dark, ominous aura representing the King of Curses |

### New Techniques (12)

| Technique | Character | Trigger | Visual Effect |
|-----------|-----------|---------|---------------|
| **Black Flash** | Yuji Itadori | Closed fist punch | Concentric rings of black/red lightning with space-time distortion |
| **Idle Transfiguration** | Mahito | Wiggling fingers + grasping | Morphing soul particles that reshape and deform space |
| **Boogie Woogie** | Todo Aoi | Hand clap | Rapid teleportation flashes with purple energy swaps |
| **Ten Shadows** | Megumi Fushiguro | Shadow puppet gestures | Shadow beasts emerging from darkness (Nue, Mahoraga) |
| **Disaster Flames** | Jogo | Clawed hand reaching upward | Volcanic eruption with magma particles and heat distortion |
| **Cursed Speech** | Inumaki Toge | Hand over mouth then pointing | Sound wave kanji particles compelling action |
| **Construction** | Mai/Yorozu | Open palm gathering energy | Matter materialization from cursed energy particles |
| **Comedy** | Takaba | Laughter gesture + finger guns | Cartoon effects, question marks, absurd physics |
| **Blood Manipulation** | Choso/Kamo | Finger drawing motion | Crimson blood particles forming piercing blades |
| **Ratio Technique** | Nanami | Hand chopping with precise angle | Grid lines with 7:3 ratio division and golden ratio highlights |
| **Jackpot** | Hakari | Fist pump + victory pose | Pachinko lights, rolling numbers, golden sparks |
| **Sky Manipulation** | Uro | Sweeping arm motion | Glass-like space fracturing and bending |

## Project Components

- `CursedVisualizer.jsx`: Handles Three.js scene and particle animations for all 16 techniques
- `HandTracker.jsx`: Manages MediaPipe Hands initialization and detects 16 different gestures
- `UI.jsx`: Renders the heads-up display showing current technique and character

## Performance Optimizations

- **Instanced Meshes:** Used for similar particles across techniques
- **LOD System:** Level of Detail adjustments for complex effects
- **Resource Management:** Proper disposal of Three.js resources
- **Optimized Particle Counts:** 500-2000 particles per technique for smooth performance

## Adding New Techniques

The modular architecture makes it easy to add more techniques:

1. Add gesture detection logic in `HandTracker.jsx`
2. Create particle effect in `CursedVisualizer.jsx`
3. Add technique name to `UI.jsx`
4. Test with webcam

## Future Techniques (Planned)

- **Mythical Beast Amber** (Kashimo) - Lightning/plasma effects
- **Granite Blast** (Ryu) - Concentrated beam attacks
- **Star Rage** (Yuki) - Black hole/virtual mass
- **Cursed Spirit Manipulation** (Geto) - Spirit merging
- **Heavenly Restriction** (Toji) - Pure physical afterimages

## License

This project is licensed under the MIT License, see the [LICENSE.md](LICENSE.md) file for details.

## Support

If you have any questions or issues, please open an issue on GitHub or contact the maintainer.

## Acknowledgments

- **Jujutsu Kaisen** (Gege Akutami) for the incredible inspiration
- **MediaPipe** for hand tracking capabilities
- **Three.js community** for 3D rendering tools
- All contributors and testers who helped expand the technique library

## Enjoy Your Cursed Techniques! 🎮

*"Throughout Heaven and Earth, I alone am the honored one."* - Gojo Satoru

<p align="center">
Made with 💜 for Jujutsu Kaisen fans
</p>