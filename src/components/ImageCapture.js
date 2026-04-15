import React, { useRef, useState, useEffect } from "react";
import "./ImageCapture.css";

function ImageCapture({
  onImageSelect,
  onCameraCapture,
  onOpenLiveCamera,
  preview,
  onClassify,
  appState,
}) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      onImageSelect(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
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
    <div className="capture-section">
      {!preview ? (
        <div className="capture-idle">
          <div
            className={`capture-dropzone ${dragOver ? "drag-over" : ""}`}
            onClick={() => inputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
          >
            <div className="dropzone-icon">🌭</div>
            <p className="dropzone-title">What are you eating?</p>
            <p className="dropzone-sub">Drop a photo or tap to upload</p>
          </div>

          <div className="capture-buttons">
            <button
              className="capture-btn capture-btn-primary"
              onClick={onOpenLiveCamera}
            >
              📹 Live Camera
            </button>
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden-input"
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>
      ) : (
        <div className="capture-preview">
          <div className="preview-frame">
            <img src={preview} alt="Food to evaluate" className="preview-img" />
          </div>
          <div className="preview-actions">
            <button className="evaluate-btn" onClick={onClassify}>
              Let's Eat Started
            </button>
            <button
              className="retake-btn"
              onClick={() => inputRef.current?.click()}
            >
              Choose Different Photo
            </button>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden-input"
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>
      )}
    </div>
  );
}

export default ImageCapture;
