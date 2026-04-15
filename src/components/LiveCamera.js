import React, { useRef, useState, useCallback, useEffect } from "react";
import "./LiveCamera.css";

function LiveCamera({ onCapture, onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);
  const [flash, setFlash] = useState(false);
  const [facingMode, setFacingMode] = useState("environment");

  const startCamera = useCallback(async (facing) => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
    }
    setReady(false);
    setError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facing,
          width: { ideal: 1280 },
          height: { ideal: 960 },
        },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => setReady(true);
      }
    } catch (err) {
      if (err.name === "NotAllowedError") {
        setError("Camera access denied. Please allow camera permissions.");
      } else if (err.name === "NotFoundError") {
        setError("No camera found on this device.");
      } else {
        setError("Could not access camera.");
      }
    }
  }, []);

  useEffect(() => {
    startCamera(facingMode);
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
    // eslint-disable-next-line
  }, []);

  const handleFlip = useCallback(() => {
    const next = facingMode === "environment" ? "user" : "environment";
    setFacingMode(next);
    startCamera(next);
  }, [facingMode, startCamera]);

  const handleCapture = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);

    setFlash(true);
    setTimeout(() => setFlash(false), 200);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], "camera-capture.jpg", {
            type: "image/jpeg",
          });
          if (streamRef.current) {
            streamRef.current.getTracks().forEach((t) => t.stop());
          }
          onCapture(file);
        }
      },
      "image/jpeg",
      0.9,
    );
  }, [onCapture]);

  if (error) {
    return (
      <div className="live-camera">
        <div className="live-camera-error">
          <span className="live-error-icon">📷</span>
          <p>{error}</p>
          <button className="live-back-btn" onClick={onClose}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="live-camera">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`live-video ${ready ? "visible" : ""}`}
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {flash && <div className="live-flash" />}

      {/* Viewfinder */}
      <div className="live-viewfinder">
        <div className="vf vf-tl" />
        <div className="vf vf-tr" />
        <div className="vf vf-bl" />
        <div className="vf vf-br" />
      </div>

      {/* Controls */}
      <div className="live-controls">
        <button className="live-ctrl-btn" onClick={onClose}>
          ✕
        </button>
        <button
          className="live-shutter"
          onClick={handleCapture}
          disabled={!ready}
        >
          <span className="shutter-ring" />
        </button>
        <button className="live-ctrl-btn" onClick={handleFlip}>
          🔄
        </button>
      </div>

      {!ready && (
        <div className="live-loading">
          <div className="live-loading-dot" />
          <div className="live-loading-dot d2" />
          <div className="live-loading-dot d3" />
        </div>
      )}
    </div>
  );
}

export default LiveCamera;
