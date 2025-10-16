import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/components/layout/Header.css";

const Header = () => {
  const [modoOscuro, setModoOscuro] = useState(() => {
    const modoGuardado = localStorage.getItem("mode");
    return modoGuardado ? JSON.parse(modoGuardado) : false;
  });

  useEffect(() => {
    if (modoOscuro) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("mode", JSON.stringify(modoOscuro));
  }, [modoOscuro]);

  const toggleModoOscuro = () => {
    setModoOscuro((prev) => !prev);
  };

  return (
    <header className="site-header">
      <Link to="/" className="logo-link">
        <img
          className="site-logo"
          src="public/HolyShop-banner.png"
          alt="logo"
        />
      </Link>
      <h2 className="header-title">The only shop that you need</h2>

      <nav className="header-nav">
        <Link to="/">Inicio</Link>
        <Link to="/carrito">Carrito</Link>
      </nav>

      <button
        className="toggle-mode"
        type="button"
        onClick={toggleModoOscuro}
      >
        🌓
      </button>
    </header>
  );
};

export default Header;