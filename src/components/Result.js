import React, { useState, useEffect } from "react";
import "./Result.css";

function Result({ preview, isHotdog, onReset }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="result-screen" onClick={onReset}>
      <img src={preview} alt="" className="result-bg" />

      <div
        className={`verdict-container ${animate ? "verdict-animate" : ""} ${isHotdog ? "verdict-hotdog" : "verdict-not"}`}
      >
        <div className="verdict-icon-circle">
          {isHotdog ? (
            <svg viewBox="0 0 24 24" className="verdict-icon-svg">
              <polyline
                points="4 12 10 18 20 6"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="verdict-icon-svg">
              <line
                x1="6"
                y1="6"
                x2="18"
                y2="18"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <line
                x1="18"
                y1="6"
                x2="6"
                y2="18"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>

        <div className="verdict-banner">
          <h1 className="verdict-text">{isHotdog ? "Hotdog" : "Not hotdog"}</h1>
        </div>
      </div>

      <div className={`tap-hint ${animate ? "hint-visible" : ""}`}>
        Tap to try again
      </div>
    </div>
  );
}

export default Result;
