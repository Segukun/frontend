import React, { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "../../styles/components/layout/CardProducto.css";

const CardProducto = ({ item }) => {
  const { guardarACarrito } = useContext(CartContext);
  const [cantidad, setCantidad] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const cant = parseInt(cantidad, 10);
    if (isNaN(cant) || cant <= 0) {
      alert("Ingresá una cantidad válida.");
      return;
    }
    guardarACarrito(item, cant);
    setCantidad("");
  };

  return (
    <div className="card">
      <img className="img-card" src={item.img} alt={item.nombre} />
      <h2 className="titulo-card">{item.nombre}</h2>
      <p className="precio-card">${item.precio}</p>

      <form onSubmit={onSubmit}>
        <input
          type="number"
          required
          min="1"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />
        <input type="submit" value="+🛒" id={item.nombre} />
      </form>
    </div>
  );
};

export default CardProducto;
// Componente CardProducto que muestra un producto y permite agregarlo al carrito