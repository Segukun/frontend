import React from "react";
import "../../styles/components/layout/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <h3 className="footer__brand">HolyShop</h3>
        <p className="footer__text">
          &copy; 2025 HolyShop — The only shop that you need.<br />
          Todos los derechos reservados.
        </p>
        <div className="footer__links">
          <a href="#">Términos</a>
          <a href="#">Privacidad</a>
          <a href="#">Contacto</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
