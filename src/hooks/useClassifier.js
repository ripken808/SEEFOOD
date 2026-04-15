import { useState, useEffect, useCallback, useRef } from "react";

// Hotdog-related class names in MobileNet/ImageNet
const HOTDOG_LABELS = ["hotdog", "hot dog", "hot_dog", "red hot"];

export function useClassifier() {
  const [modelReady, setModelReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState("Loading AI model...");
  const modelRef = useRef(null);

  // Load MobileNet on mount
  useEffect(() => {
    let cancelled = false;

    async function loadModel() {
      try {
        setLoadingProgress("Loading TensorFlow.js...");

        // Dynamically import tf and mobilenet from CDN-loaded globals
        // They're loaded via script tags in index.html
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

        const model = await window.mobilenet.load({
          version: 2,
          alpha: 1.0,
        });

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

    // MobileNet returns top 5 predictions
    const predictions = await modelRef.current.classify(imgElement, 5);

    // Check if any prediction contains a hotdog-related label
    const isHotdog = predictions.some((p) =>
      HOTDOG_LABELS.some((label) => p.className.toLowerCase().includes(label)),
    );

    return {
      isHotdog,
      predictions, // for debugging if needed
    };
  }, []);

  return { modelReady, loadingProgress, classify };
}
