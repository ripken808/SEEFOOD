import React from "react";
import "./ModelLoader.css";

function ModelLoader({ message }) {
  return (
    <div className="loader-screen">
      <div className="loader-content">
        <div className="loader-hotdog">🌭</div>
        <div className="loader-bar-track">
          <div className="loader-bar-fill" />
        </div>
        <p className="loader-message">{message}</p>
        <p className="loader-sub">
          First visit downloads the AI model (~16MB).
          <br />
          It's cached after that.
        </p>
      </div>
    </div>
  );
}

export default ModelLoader;
