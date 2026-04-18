import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-red">
        <h1 className="header-title">SEEFOOD</h1>
      </div>
      <div className="header-white">
        <p className="header-tagline">"The Shazam for Food"</p>
      </div>
    </header>
  );
}

export default Header;
