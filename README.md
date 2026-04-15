# 🌭 SeeFood — Not Hotdog

> *"What would you say if I told you there is an app on the market that tells you if you have a hotdog or not a hotdog?"*
> — Jian-Yang, Silicon Valley S4E4

The only food identification app that matters. A faithful recreation of the legendary SeeFood app from HBO's **Silicon Valley**.

Upload or snap a photo and this app will tell you one of two things:
- **Hotdog** ✅ (green banner, checkmark)
- **Not Hotdog** ❌ (red banner, X)

That's it. That's the app.

---

## Tech Stack

- **React 18** — UI framework
- **Claude Vision API** (Anthropic) — Image classification
- **Zero backend** — API calls happen client-side

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

You'll be prompted for your Anthropic API key on first visit. The key is stored in your browser's localStorage and only sent directly to the Anthropic API.

## How It Works

1. User uploads or takes a photo of food (or anything, really)
2. Full-screen "Evaluating..." with the show's circle dot spinner
3. Verdict: Green "Hotdog" banner at top or Red "Not hotdog" banner at bottom
4. Tap anywhere to try again

## Project Structure

```
seefood/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ApiKeyInput.js / .css
│   │   ├── Evaluating.js / .css
│   │   ├── Header.js / .css
│   │   ├── ImageCapture.js / .css
│   │   └── Result.js / .css
│   ├── App.js / .css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Phases

- [x] **Phase 1** — Core MVP (upload + classify + result)
- [x] **Phase 2** — Show-accurate UI (SeeFood branding, evaluating spinner, green/red verdict banners, camera capture)
- [ ] **Phase 3** — Personality, scan history, deployment

---

*SeeFood Technologies — "It's not a 'not hotdog' app. It's much more than that."*
