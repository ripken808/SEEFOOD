import React from "react";
import "./Evaluating.css";

function Evaluating({ preview }) {
  // 12 dots: go from large+red+opaque to small+white+transparent
  // Arranged clockwise starting from top
  const dots = Array.from({ length: 12 }, (_, i) => {
    const angle = i * 30 * (Math.PI / 180);
    const x = 50 + 36 * Math.cos(angle - Math.PI / 2);
    const y = 50 + 36 * Math.sin(angle - Math.PI / 2);

    // Dots go from fully visible/large/red (index 0) to faded/small/white (index 11)
    // But we want the "head" to be at the bottom-left like the show
    // Shift by 7 positions so the brightest dots are at bottom-left
    const shifted = (i + 7) % 12;
    const t = shifted / 11; // 0 = brightest/largest, 1 = faintest/smallest

    const r = 5.5 - t * 3.2; // radius: 5.5 → 2.3
    const opacity = 1 - t * 0.8; // opacity: 1 → 0.2

    // Color interpolation: red (#e53935) → pink (#e8a0a0) → white
    const red = 229;
    const green = Math.round(57 + t * 198); // 57 → 255
    const blue = Math.round(53 + t * 202); // 53 → 255

    return { x, y, r, opacity, color: `rgb(${red}, ${green}, ${blue})` };
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
