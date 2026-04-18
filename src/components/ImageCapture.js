import React, { useRef, useEffect } from "react";
import "./ImageCapture.css";

function ImageCapture({
  onImageSelect,
  onOpenLiveCamera,
  preview,
  onClassify,
}) {
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      onImageSelect(file);
    }
  };

  // Global paste
  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of items) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) onImageSelect(file);
          break;
        }
      }
    };
    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [onImageSelect]);

  return (
    <div className="capture">
      {!preview ? (
        /* ── Idle: upload prompt ── */
        <div className="capture-idle">
          <div
            className="capture-center"
            onClick={() => inputRef.current?.click()}
          >
            <span className="capture-emoji">🌭</span>
            <p className="capture-title">What are you eating?</p>
            <p className="capture-sub">Tap to upload a photo</p>
          </div>

          <button className="capture-camera-btn" onClick={onOpenLiveCamera}>
            📹 Live Camera
          </button>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>
      ) : (
        /* ── Preview: show image + classify ── */
        <div className="capture-has-image">
          <div className="capture-img-wrap">
            <img src={preview} alt="Food" className="capture-img" />
          </div>
          <div className="capture-actions">
            <button className="capture-go-btn" onClick={onClassify}>
              Evaluate
            </button>
            <button
              className="capture-change-btn"
              onClick={() => inputRef.current?.click()}
            >
              Change photo
            </button>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>
      )}
    </div>
  );
}

export default ImageCapture;
