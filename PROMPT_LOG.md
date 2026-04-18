# PROMPT LOG — SeeFood Project

---

## Prompts 1–12 (summarized)

1. Initial scope + Phase 1 MVP
2. Phase 2 first pass — camera, animations
3. Full redesign to match show — SeeFood branding
4. Fix eslint error
5. Redesigned header to match show
6. Where to find Anthropic API key
7. Switched to TensorFlow.js MobileNet (free)
8. iPhone frame, inline results
9. Classic iPhone frame, live camera
10. 2.5s minimum evaluating delay
11. Removed Take Photo + Upload buttons
12. Git push + .gitignore for node_modules

---

## Prompt 13

**Date:** 2026-04-17

**Prompt:**

> [Screenshot of half-eaten hotdog classified as "Not hotdog"]
> I used an actual image of a half eaten hotdog that I took and it was not able to detect it

**Effectiveness:** ✅ High — Real-world testing revealing a real limitation

**What was delivered:**

- Expanded HOTDOG_LABELS from 4 to 17 terms: now includes frankfurter, wiener, sausage, bratwurst, corn dog, knackwurst, polish sausage, link, etc.
- Added EXCLUDE_LABELS to prevent false positives (banana, burrito, pretzel)
- Increased predictions from top 5 to top 10 for better coverage
- Added console.log debug output so you can open browser DevTools and see exactly what MobileNet thinks the image is
- Added exclusion logic so sausage-adjacent but non-hotdog items don't false-positive

**Note:** MobileNet is a general image classifier trained on stock photos — it will always struggle with unusual angles, partial food, wrapping/paper, dark lighting, etc. If accuracy on real-world photos becomes important, switching back to Claude Vision API (or another vision LLM) would be dramatically more accurate. For a gimmick resume project though, this expanded label set should catch most cases.

**Files:**

```
src/hooks/useClassifier.js    ← REPLACE
```

---

## Reconstruction Prompt

> Reconstruct the "SeeFood" project — Silicon Valley Not Hotdog app recreation inside a classic iPhone frame. React 18, TensorFlow.js MobileNet v2, no API key.
>
> **Key detail for classifier:** useClassifier.js checks top 10 predictions (not 5) against expanded HOTDOG_LABELS: hotdog, hot dog, hot_dog, red hot, frankfurter, frank, wiener, weiner, vienna sausage, sausage, bratwurst, brat, chili dog, corn dog, knackwurst, knockwurst, polish sausage, link. Has EXCLUDE_LABELS (banana, burrito, pretzel) to prevent false positives. Logs predictions to console for debugging. 2.5s minimum eval delay in App.js.
>
> **Full structure:** [same as previous reconstruction prompt]
>
> Regenerate all files.
