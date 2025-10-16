import React, { useState, useEffect } from "react";
import { CartContext } from "./CartContext";

const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("carrito")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const guardarACarrito = (item, cantidad) => {
    setCarrito(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      const idx = copy.findIndex(p => p.nombre === item.nombre);
      if (idx >= 0) {
        copy[idx].cantidad += cantidad;
        copy[idx].precioTotal += item.precio * cantidad;
      } else {
        copy.push({
          nombre: item.nombre,
          cantidad,
          precioTotal: item.precio * cantidad,
        });
      }
      return copy;
    });
  };

  const eliminarCantidad = (nombre, cantidadARestar, precioUnitario) => {
    setCarrito(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      const idx = copy.findIndex(p => p.nombre === nombre);
      if (idx === -1) return copy;
      copy[idx].cantidad -= cantidadARestar;
      copy[idx].precioTotal -= precioUnitario * cantidadARestar;
      if (copy[idx].cantidad <= 0) copy.splice(idx, 1);
      return copy;
    });
  };

  const vaciarCarrito = () => setCarrito([]);

  return (
    <CartContext.Provider value={{ carrito, guardarACarrito, eliminarCantidad, vaciarCarrito }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
// Sólo exporta el contexto (no hay componentes en este archivo)
// El proveedor del contexto se define en main.jsx
