# 🌭 SeeFood — Not Hotdog

> _"What would you say if I told you there is an app on the market that tells you if you have a hotdog or not a hotdog?"_
> — Jian-Yang, Silicon Valley S4E4

A faithful recreation of the legendary SeeFood app from HBO's **Silicon Valley**. Displayed inside a classic iPhone frame, powered by TensorFlow.js — runs entirely in your browser with zero setup.

## ✅ Hotdog &nbsp;&nbsp; ❌ Not Hotdog

That's it. That's the app.

---

## Live Demo

**[ripken808.github.io/SEEFOOD](https://ripken808.github.io/SEEFOOD)**

---

## Features

- **AI-powered classification** — MobileNet v2 running in-browser via TensorFlow.js
- **No API key required** — completely free, no accounts, no backend
- **Live camera** — point your webcam/phone camera at food in real-time
- **Classic iPhone frame** — displayed inside an iPhone 6/7/8 style bezel
- **Show-accurate UI** — red SEEFOOD banner, circle dot spinner, green/red verdict banners
- **Dramatic evaluating screen** — 2.5 second minimum reveal with "Evaluating..." spinner

## Tech Stack

- **React 18**
- **TensorFlow.js** + **MobileNet v2** (loaded via CDN, ~16MB cached after first visit)
- **Zero backend** — everything runs client-side

## Getting Started

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000). First visit downloads the AI model (~16MB), then it's cached.

## Deploy to GitHub Pages

```bash
npm run deploy
```

Then go to your repo **Settings → Pages → Source** and select the `gh-pages` branch.

## How It Works

1. Upload a photo (tap the dropzone) or use the live camera
2. "Evaluating..." with the show's circle dot spinner
3. **Hotdog** → green banner + checkmark at top
4. **Not hotdog** → red banner + X at bottom
5. Tap to try again

## Project Structure

```
seefood/
├── public/index.html
├── src/
│   ├── hooks/useClassifier.js    # MobileNet classification hook
│   ├── components/
│   │   ├── Header.js             # Red SEEFOOD banner
│   │   ├── ModelLoader.js        # Loading screen
│   │   ├── ImageCapture.js       # Upload dropzone
│   │   ├── LiveCamera.js         # getUserMedia camera feed
│   │   ├── Evaluating.js         # Spinner screen
│   │   └── Result.js             # Hotdog / Not Hotdog verdict
│   ├── App.js                    # State machine + iPhone frame
│   └── index.js
└── package.json
```

---

_SeeFood Technologies — "The Shazam for Food"_
