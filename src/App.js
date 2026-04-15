import React, { useState, useCallback } from "react";
import Header from "./components/Header";
import ImageCapture from "./components/ImageCapture";
import LiveCamera from "./components/LiveCamera";
import Evaluating from "./components/Evaluating";
import Result from "./components/Result";
import ModelLoader from "./components/ModelLoader";
import { useClassifier } from "./hooks/useClassifier";
import "./App.css";

function App() {
  const { modelReady, loadingProgress, classify } = useClassifier();
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [appState, setAppState] = useState("idle"); // idle | preview | camera | evaluating | result
  const [error, setError] = useState(null);

  const handleImageSelect = useCallback((file) => {
    const preview = URL.createObjectURL(file);
    setImage({ file, preview });
    setResult(null);
    setError(null);
    setAppState("preview");
  }, []);

  const classifyImage = useCallback(
    async (previewUrl) => {
      const url = previewUrl || image?.preview;
      if (!url) return;

      setAppState("evaluating");
      setError(null);

      try {
        // Start a minimum delay so the evaluating screen feels dramatic
        const minDelay = new Promise((r) => setTimeout(r, 2500));

        const imgEl = new Image();
        imgEl.crossOrigin = "anonymous";
        await new Promise((resolve, reject) => {
          imgEl.onload = resolve;
          imgEl.onerror = reject;
          imgEl.src = url;
        });

        // Run classification and minimum delay in parallel
        const [{ isHotdog }] = await Promise.all([classify(imgEl), minDelay]);
        setResult({ isHotdog });
        setAppState("result");
      } catch (err) {
        console.error("Classification error:", err);
        setError("Classification failed. Please try again.");
        setAppState("preview");
      }
    },
    [image, classify],
  );

  const handleCameraCapture = useCallback(
    (file) => {
      const preview = URL.createObjectURL(file);
      setImage({ file, preview });
      setResult(null);
      setError(null);
      setAppState("evaluating");
      setTimeout(() => classifyImage(preview), 150);
    },
    [classifyImage],
  );

  const handleReset = useCallback(() => {
    if (image?.preview) URL.revokeObjectURL(image.preview);
    setImage(null);
    setResult(null);
    setError(null);
    setAppState("idle");
  }, [image]);

  return (
    <div className="phone-frame">
      {/* Top bezel — speaker + front camera */}
      <div className="phone-top-bezel">
        <div className="phone-speaker" />
        <div className="phone-front-camera" />
      </div>

      <div className="app">
        {/* Header always visible except in camera mode */}
        {appState !== "camera" && <Header />}

        <main className="app-main">
          {/* Model loading */}
          {!modelReady && <ModelLoader message={loadingProgress} />}

          {/* Idle or Preview */}
          {modelReady && (appState === "idle" || appState === "preview") && (
            <>
              <ImageCapture
                onImageSelect={handleImageSelect}
                onCameraCapture={handleCameraCapture}
                onOpenLiveCamera={() => setAppState("camera")}
                preview={image?.preview}
                onClassify={() => classifyImage()}
                appState={appState}
              />
              {error && (
                <div className="error-banner">
                  <span>⚠</span> {error}
                </div>
              )}
            </>
          )}

          {/* Live Camera */}
          {modelReady && appState === "camera" && (
            <LiveCamera
              onCapture={handleCameraCapture}
              onClose={() => setAppState("idle")}
            />
          )}

          {/* Evaluating */}
          {appState === "evaluating" && image && (
            <Evaluating preview={image.preview} />
          )}

          {/* Result */}
          {appState === "result" && image && result && (
            <Result
              preview={image.preview}
              isHotdog={result.isHotdog}
              onReset={handleReset}
            />
          )}
        </main>
      </div>

      {/* Bottom bezel — home button */}
      <div className="phone-bottom-bezel">
        <div className="phone-home-button" />
      </div>
    </div>
  );
}

export default App;
