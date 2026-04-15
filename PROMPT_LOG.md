# PROMPT LOG — SeeFood Project

---

## Prompts 1–10 (summarized)

1. Initial scope + Phase 1 MVP
2. Phase 2 first pass — camera, animations
3. Full redesign to match show — SeeFood branding
4. Fix eslint error
5. Redesigned header to match show
6. Where to find Anthropic API key
7. Switched to TensorFlow.js MobileNet (free)
8. iPhone frame, inline results
9. Classic iPhone frame, live camera via getUserMedia
10. 2.5s minimum evaluating delay

---

## Prompt 11

**Date:** 2026-04-15

**Prompt:**

> [Screenshot of three buttons] get rid of the extra two buttons at the bottom since i can just click on the center area to add a photo

**Effectiveness:** ✅ High — Clear, one-line request

**What was delivered:**

- Removed "📷 Take Photo" and "🖼 Upload" buttons
- Removed unused cameraRef and native camera input
- Kept only "📹 Live Camera" button + the dropzone (tap to upload)

**Files:**

```
src/components/ImageCapture.js    ← REPLACE
```

---

## Reconstruction Prompt

> Reconstruct the "SeeFood" project — a faithful recreation of the Not Hotdog app from HBO's Silicon Valley, displayed inside a classic iPhone (6/7/8 style) frame. React web app, TensorFlow.js MobileNet classification, no API key.
>
> **Tech stack:** React 18 (create-react-app), no backend. TF.js + MobileNet v2 via CDN.
>
> **Design:** Classic iPhone frame centered on dark background. All states inline.
>
> **Structure:**
>
> ```
> seefood/
> ├── public/index.html (Oswald + Source Sans 3, TF.js + MobileNet CDN)
> ├── src/
> │   ├── index.js, index.css (dark bg, phone vars)
> │   ├── App.js (classic bezels, states: idle/preview/camera/evaluating/result, 2.5s min eval delay)
> │   ├── App.css (bezels, home button, responsive)
> │   ├── hooks/useClassifier.js (MobileNet v2, hotdog labels)
> │   ├── components/
> │   │   ├── Header.js/.css (Red "SEEFOOD" + tagline)
> │   │   ├── ModelLoader.js/.css (Bouncing 🌭, progress bar)
> │   │   ├── ImageCapture.js/.css (Dropzone tap-to-upload + "📹 Live Camera" button only. NO Take Photo or Upload buttons. Paste listener. Preview: image + "Let's Eat Started" + "Choose Different Photo".)
> │   │   ├── LiveCamera.js/.css (getUserMedia, shutter, flip, viewfinder)
> │   │   ├── Evaluating.js/.css (Inline, spinner, "Evaluating...")
> │   │   └── Result.js/.css (Inline, green/red banners, tap reset)
> │   └── assets/ (empty)
> ├── package.json (seefood, react 18.2)
> └── README.md
> ```
>
> **Classification:** MobileNet v2 via TF.js CDN. Labels: hotdog, hot dog, hot_dog, red hot. 2.5s minimum eval delay.
>
> **Phase status:** Phase 1 ✅. Phase 2 ✅. Phase 3 NOT started.
>
> **Logging:** Append PROMPT_LOG.md after each prompt. Individual replacement files.
>
> Regenerate all files.
