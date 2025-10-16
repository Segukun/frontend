import React from "react";
import BDSimu from "../data/products";
import CardProducto from "../components/layout/CardProducto";
import "../styles/components/pages/Catalogo.css";

const Catalogo = () => {
  return (
    <div id="catalogo-wrap">
      {/* El contenedor "catalogo" original era una sección vacía. Aquí rendereamos las cards */}
      <div className="catalogo-grid" id="catalogo">
        {BDSimu.map((item) => (
          <CardProducto key={item.nombre} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Catalogo;
// Página de catálogo que muestra todos los productos disponibles