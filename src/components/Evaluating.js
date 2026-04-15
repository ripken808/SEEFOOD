import React from "react";
import "./Evaluating.css";

function Evaluating({ preview }) {
  const dots = Array.from({ length: 12 }, (_, i) => {
    const angle = i * 30 * (Math.PI / 180);
    const x = 50 + 36 * Math.cos(angle - Math.PI / 2);
    const y = 50 + 36 * Math.sin(angle - Math.PI / 2);
    return { x, y, delay: i * 0.08 };
  });

  return (
    <div className="evaluating-screen">
      <img src={preview} alt="" className="evaluating-bg" />
      <div className="evaluating-overlay" />
      <div className="evaluating-content">
        <div className="spinner-circle">
          <svg viewBox="0 0 100 100" className="spinner-svg">
            {dots.map((dot, i) => (
              <circle
                key={i}
                cx={dot.x}
                cy={dot.y}
                r="4.5"
                className="spinner-dot"
                style={{ animationDelay: `${dot.delay}s` }}
              />
            ))}
          </svg>
        </div>
        <h2 className="evaluating-text">Evaluating...</h2>
      </div>
    </div>
  );
}

export default Evaluating;
