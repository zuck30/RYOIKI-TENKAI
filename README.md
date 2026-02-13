# RYOIKI-TENKAI (React Refactor)

RYOIKI-TENKAI is a cursed technique visualizer based on the popular anime series, Jujutsu Kaisen 呪術廻戦. It combines the MediaPipe library with Three.js to recreate cursed techniques from Jujutsu Kaisen.

![Demo GIF](https://github.com/user-attachments/assets/8ad2b871-02c0-4b97-95f3-34682e745be0)

## Project Overview
This project has been refactored from a single `index.html` file into a modern React.js application using Vite. The logic is now modularized into React components for better maintainability and scalability.

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

## Tech Stack
- **React.js**: Frontend framework.
- **Vite**: Build tool and dev server.
- **Three.js**: 3D rendering and particle systems.
- **MediaPipe Hands**: Hand tracking and gesture recognition.

## Getting Started

### Prerequisites
You need [Node.js](https://nodejs.org/) installed on your machine, a modern web browser, and a webcam.

### Installation
1.  **Clone the repo**
    ```bash
    git clone https://github.com/zuck30/RYOIKI-TENKAI.git
    cd RYOIKI-TENKAI
    ```
2.  **Install dependencies**
    ```bash
    npm install
    ```

### Running the Application
To start the development server:
```bash
npm run dev
```

### Building for Production
To create a production build:
```bash
npm run build
```

## Project Structure
- `src/components/CursedVisualizer.jsx`: Handles Three.js scene and particle animations.
- `src/components/HandTracker.jsx`: Manages MediaPipe Hands initialization and gesture detection.
- `src/components/UI.jsx`: Renders the heads-up display and technique names.
- `src/App.jsx`: Main application container and state management.
- `src/App.css`: Global styles.
