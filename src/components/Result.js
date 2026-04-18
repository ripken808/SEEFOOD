import React, { useState, useEffect } from "react";
import "./Result.css";

function Result({ preview, isHotdog, onReset }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="res-screen" onClick={onReset}>
      <img src={preview} alt="" className="res-bg" />

      {isHotdog ? (
        /* ── HOTDOG: banner at top, checkmark below it ── */
        <div className={`res-verdict res-hotdog ${animate ? "res-in" : ""}`}>
          <div className="res-banner res-banner-green">
            <h1 className="res-label">Hotdog</h1>
          </div>
          <div className="res-icon-circle res-circle-green">
            <svg viewBox="0 0 24 24" className="res-icon-svg">
              <polyline
                points="4 12 10 18 20 6"
                fill="none"
                stroke="white"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      ) : (
        /* ── NOT HOTDOG: X above, banner at bottom ── */
        <div className={`res-verdict res-nothotdog ${animate ? "res-in" : ""}`}>
          <div className="res-icon-circle res-circle-red">
            <svg viewBox="0 0 24 24" className="res-icon-svg">
              <line
                x1="6"
                y1="6"
                x2="18"
                y2="18"
                stroke="white"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <line
                x1="18"
                y1="6"
                x2="6"
                y2="18"
                stroke="white"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="res-banner res-banner-red">
            <h1 className="res-label">Not hotdog</h1>
          </div>
        </div>
      )}

      <div className={`res-tap ${animate ? "res-tap-in" : ""}`}>
        Tap to try again
      </div>
    </div>
  );
}

export default Result;
