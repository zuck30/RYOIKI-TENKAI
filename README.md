Here's your refined README.md with the same look and design as the template:

# RYOIKI-TENKAI (React Refactor)

![Banner](https://capsule-render.vercel.app/api?type=venom&height=200&color=0:667eea,100:764ba2&text=RYOIKI-TENKAI&textBg=false&desc=(Cursed+Technique+Visualizer)&descAlign=79&fontAlign=50&descAlignY=70&fontColor=f7f5f5)

<p align="center">
RYOIKI-TENKAI is a cursed technique visualizer based on the popular anime series, Jujutsu Kaisen 呪術廻戦. It combines the MediaPipe library with Three.js to recreate cursed techniques from Jujutsu Kaisen through hand gestures and particle systems.
</p>

![Demo GIF](https://github.com/user-attachments/assets/8ad2b871-02c0-4b97-95f3-34682e745be0)

![React](https://img.shields.io/badge/React-18.2.0-blue) ![Three.js](https://img.shields.io/badge/Three.js-r128-green) ![MediaPipe](https://img.shields.io/badge/MediaPipe-Hands-brightgreen) ![Vite](https://img.shields.io/badge/Vite-4.0-purple)

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


 <!-- ### RYOIKI-TENKAI overview
<h2>Cursed Technique: Red</h2>

![Technique Preview](./screenshots/red-preview.png)

<h2>Domain Expansion: Infinite Void</h2>

![Domain Preview](./screenshots/infinite-void-preview.png) -->

## Features

This project utilizes particles to render volume-based cursed techniques:

* **Secret Technique: Hollow Purple**
    * **Visuals:** A chaotic singularity combining attraction and repulsion.
    * **Trigger:** "Pinch" gesture (Thumb + Index touching).

* **Domain Expansion: Infinite Void**
    * **Visuals:** A multi-layered celestial domain featuring a bright event horizon ring, a vertical stream of infinite information, and a deep cosmos background.
    * **Trigger:** "Cross" gesture (Index + Middle fingers crossed).

* **Cursed Technique Reversal: Red**
    * **Visuals:** A blinding white-hot core generating a violent, jagged sphere of repulsive force.
    * **Trigger:** Index finger pointing up.

* **Domain Expansion: Malevolent Shrine**
    * **Visuals:** A dark, ominous aura representing the King of Curses.
    * **Trigger:** Flat hand / Prayer gesture.

## Project Components

- `CursedVisualizer.jsx`: Handles Three.js scene and particle animations
- `HandTracker.jsx`: Manages MediaPipe Hands initialization and gesture detection
- `UI.jsx`: Renders the heads-up display and technique names

## License

This project is licensed under the MIT License, see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Jujutsu Kaisen for the inspiration
- MediaPipe for hand tracking capabilities
- Three.js community for 3D rendering tools

## Enjoy!