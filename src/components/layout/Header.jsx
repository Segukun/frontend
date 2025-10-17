import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/components/layout/Header.css";

const Header = () => {
  const [modoOscuro, setModoOscuro] = useState(() => {
    const saved = localStorage.getItem("mode");
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  });
  const [scrolled, setScrolled] = useState(false);

  // 同期: body のライト/ダーク
  useEffect(() => {
    const body = document.body;
    body.classList.add("light-mode");
    body.classList.toggle("dark-mode", modoOscuro);
    localStorage.setItem("mode", JSON.stringify(modoOscuro));
  }, [modoOscuro]);

  // スクロールで is-scrolled を付与
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleModoOscuro = () => setModoOscuro(v => !v);

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <Link to="/" className="logo-link" aria-label="Ir al inicio">
          <img className="site-logo" src="/HolyShop-banner.png" alt="HolyShop" />
        </Link>

        <h2 className="header-title">The only shop that you need</h2>

        {/* 追加: 衝突回避のため nav とボタンを一括で並べる */}
        <div className="header-actions">
          <nav className="header-nav" aria-label="Navegación principal">
            <Link to="/">Inicio</Link>
            <Link to="/carrito">Carrito</Link>
          </nav>

          <button
            className="toggle-mode"
            type="button"
            onClick={toggleModoOscuro}
            aria-pressed={modoOscuro}
            aria-label={modoOscuro ? "Cambiar a modo claro (Alt+D)" : "Cambiar a modo oscuro (Alt+D)"}
            title={modoOscuro ? "Modo oscuro activo — Alt+D" : "Modo claro activo — Alt+D"}
          >
            {modoOscuro ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </header>

      {/* 固定ヘッダーのぶんのスペーサー */}
      <div className="header-spacer" aria-hidden="true"></div>
    </>
  );
};

export default Header;
