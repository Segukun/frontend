import React from "react";
import { Link } from "react-router-dom";
import "../../styles/components/layout/Header.css";

const Header = () => {
  return (
    <header className="site-header">
      <Link to="/" className="logo-link">
        <img className="site-logo" src="public/HolyShop-banner.png" alt="logo" />
      </Link>
      <h2 className="header-title">The only shop that you need</h2>
      <nav className="header-nav">
        <Link to="/">Inicio</Link>
        <Link to="/carrito">Carrito</Link>
      </nav>
    </header>
  );
};

export default Header;
// Componente Header con navegación básicas
