import React, { useEffect } from "react";
import "../../styles/components/layout/Hero.css";

const Hero = () => {
  const [texto, setTexto] = React.useState(" Productos VTuber, voces exclusivas, ilustraciones y más.");  

  useEffect(() => {
    const yaVisitado = sessionStorage.getItem("yaVisito");
    if (texto === " Productos VTuber, voces exclusivas, ilustraciones y más.") {
      if (yaVisitado) {
        setTexto(" Bienvenido de nuevo a VTuber Store!");
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
        <h1 id="texto">{texto} Consigue productos de VTubers, voces exclusivas, ilustraciones y más. </h1>
        <a href="#catalogo"> Ver ahora! </a>
      </div>
    </section>
  );
};

export default Hero;
// Componente Hero con video y mensaje de bienvenida