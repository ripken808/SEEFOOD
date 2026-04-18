import { useState, useEffect, useCallback, useRef } from "react";

const HOTDOG_LABELS = [
  "hotdog",
  "hot dog",
  "hot_dog",
  "red hot",
  "frankfurter",
  "frank",
  "wiener",
  "weiner",
  "vienna sausage",
  "sausage",
  "bratwurst",
  "brat",
  "chili dog",
  "corn dog",
  "knackwurst",
  "knockwurst",
  "polish sausage",
  "link",
];

const EXCLUDE_LABELS = ["banana", "burrito", "pretzel"];

export function useClassifier() {
  const [modelReady, setModelReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState("Loading AI model...");
  const modelRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function loadModel() {
      try {
        setLoadingProgress("Loading TensorFlow.js...");

        const waitForTf = () =>
          new Promise((resolve) => {
            const check = () => {
              if (window.tf && window.mobilenet) resolve();
              else setTimeout(check, 100);
            };
            check();
          });

        await waitForTf();
        if (cancelled) return;

        setLoadingProgress("Downloading MobileNet (~16MB)...");
        const model = await window.mobilenet.load({ version: 2, alpha: 1.0 });

        if (cancelled) return;
        modelRef.current = model;
        setModelReady(true);
        setLoadingProgress("Ready!");
      } catch (err) {
        console.error("Failed to load model:", err);
        setLoadingProgress("Failed to load AI model. Please refresh.");
      }
    }

    loadModel();
    return () => {
      cancelled = true;
    };
  }, []);

  const classify = useCallback(async (imgElement) => {
    if (!modelRef.current) throw new Error("Model not loaded");

    const predictions = await modelRef.current.classify(imgElement, 10);

    console.log(
      "🌭 SeeFood predictions:",
      predictions.map(
        (p) => `${p.className}: ${(p.probability * 100).toFixed(1)}%`,
      ),
    );

    const isHotdog = predictions.some((p) => {
      const name = p.className.toLowerCase();
      if (EXCLUDE_LABELS.some((ex) => name.includes(ex))) return false;
      return HOTDOG_LABELS.some((label) => name.includes(label));
    });

    return { isHotdog, predictions };
  }, []);

  return { modelReady, loadingProgress, classify };
}
