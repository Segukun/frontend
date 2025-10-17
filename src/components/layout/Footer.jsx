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

        {/* ======= Formspree Newsletter / Contact ======= */}
        <form
          action="https://formspree.io/f/myznobzo"
          method="POST"
          className="footer__form"
        >
          <label htmlFor="email">Suscribite a nuestro newsletter para recibir nuestras novedades:</label>
          <div className="footer__form-group">
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Tu correo electrónico"
            />
            <button type="submit">Enviar</button>
          </div>
        </form>

        {/* ======= Footer links ======= */}
        <div className="footer__links">
          <a href="https://shop.hololivepro.com/pages/terms">Términos</a>
          <a href="https://shop.hololivepro.com/pages/privacy-policy">Privacidad</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
