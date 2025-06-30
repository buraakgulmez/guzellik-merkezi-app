import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoAura from "../../images/logo/aura-logo.jpg";
import "./header.component.css";

const HeaderItem = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header-style">
      <div className="logo-style">
        <Link to="/">
          <img className="logo-css" src={logoAura} alt="Aura Logo" />
        </Link>
      </div>

      <nav className={`nav-style ${menuOpen ? "open" : ""}`}>
        <ul className="ul-style">
          <li><Link to="/">Ana Sayfa</Link></li>
          <li><Link to="/">Hizmetlerimiz</Link></li>
          <li><Link to="/">Hakkımızda</Link></li>
          <li><Link to="/randevu">Randevu</Link></li>
          <li><Link to="/">İletişim</Link></li>
          <li>
            <Link className="randevu-btn" to="/randevu">
              Randevu Al
            </Link>
          </li>
        </ul>
      </nav>

      <div className="mobile-menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <div className={`bar ${menuOpen ? "change" : ""}`}></div>
        <div className={`bar ${menuOpen ? "change" : ""}`}></div>
        <div className={`bar ${menuOpen ? "change" : ""}`}></div>
      </div>
    </header>
  );
};

export default HeaderItem;
