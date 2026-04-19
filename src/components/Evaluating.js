import React from "react";
import "./Evaluating.css";

function Evaluating({ preview }) {
  const dots = Array.from({ length: 12 }, (_, i) => {
    const angle = i * 30 * (Math.PI / 180);
    const x = 50 + 36 * Math.cos(angle - Math.PI / 2);
    const y = 50 + 36 * Math.sin(angle - Math.PI / 2);

    const shifted = (i + 7) % 12;
    const t = shifted / 11;
    const r = 5.5 - t * 3.2;
    const opacity = 1 - t * 0.8;
    const green = Math.round(57 + t * 198);
    const blue = Math.round(53 + t * 202);

    return { x, y, r, opacity, color: `rgb(229, ${green}, ${blue})` };
  });

  return (
    <div className="eval-screen">
      <img src={preview} alt="" className="eval-bg" />
      <div className="eval-overlay" />
      <div className="eval-content">
        <div className="eval-spinner">
          <svg viewBox="0 0 100 100" className="eval-spinner-svg">
            {dots.map((dot, i) => (
              <circle
                key={i}
                cx={dot.x}
                cy={dot.y}
                r={dot.r}
                fill={dot.color}
                opacity={dot.opacity}
              />
            ))}
          </svg>
        </div>
        <h2 className="eval-text">Evaluating...</h2>
      </div>
    </div>
  );
}

export default Evaluating;
