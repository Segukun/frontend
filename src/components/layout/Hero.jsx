import React, { useEffect } from "react";
import "../../styles/components/layout/Hero.css";

const Hero = () => {
  useEffect(() => {
    const yaVisitado = sessionStorage.getItem("yaVisito");
    const textoInicio = document.getElementById("texto");
    if (textoInicio) {
      if (yaVisitado) {
        textoInicio.textContent = "¡Bienvenido de nuevo! " + textoInicio.textContent;
      } else {
        sessionStorage.setItem("yaVisito", "true");
      }
    }
  }, []);

  return (
    <section className="container">
      <video autoPlay loop muted playsInline className="background-clip">
        <source src="/videotiburon.mp4" type="video/mp4" />
      </video>

      <div className="content">
        <h1 id="texto"> Consigue productos de VTubers, voces exclusivas, ilustraciones y más.</h1>
        <a href="#catalogo"> Ver ahora! </a>
      </div>
    </section>
  );
};

export default Hero;
// Componente Hero con video de fondo y mensaje de bienvenida