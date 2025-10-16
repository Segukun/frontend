import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import ModalCompra from "../components/layout/ModalCompra";
import { Link } from "react-router-dom";
import BDSimu from "../data/products";
import "../styles/components/pages/Carrito.css";

const Carrito = () => {
  const { carrito, eliminarCantidad } = useContext(CartContext);
  const [openModal, setOpenModal] = useState(false);
  const [itemsConDatos, setItemsConDatos] = useState([]);

  useEffect(() => {
    // sincronizo la info del producto con BDSimu para mostrar img y precio unitario
    const merged = carrito.map(ci => {
      const producto = BDSimu.find(p => p.nombre === ci.nombre) || {};
      return {...ci, img: producto.img, precioUnitario: producto.precio || Math.round(ci.precioTotal / Math.max(1, ci.cantidad))};
    });
    setItemsConDatos(merged);
  }, [carrito]);

  const onEliminar = (e, nombre, precioUnitario) => {
    e.preventDefault();
    const form = e.target;
    const cantidadARestar = parseInt(new FormData(form).get("cantidad") || form.querySelector("input[type=number]").value, 10);
    if (isNaN(cantidadARestar) || cantidadARestar <= 0) {
      alert("Ingresá una cantidad válida para eliminar.");
      return;
    }
    eliminarCantidad(nombre, cantidadARestar, precioUnitario);
  };

  return (
    <section id="compra" className="compra-page">
      <h2> Llevás: </h2>
      <ul id="carrito">
        {carrito.length === 0 && <p id="alerta">Tu carrito está vacío</p>}

        {itemsConDatos.map((prod) => (
          <li key={prod.nombre} className="item-carrito" data-nombre={prod.nombre}>
            <span className="cantidad">x{prod.cantidad} de {prod.nombre}</span>
            <p className="precio">${prod.precioTotal}</p>

            <form onSubmit={(e) => onEliminar(e, prod.nombre, prod.precioUnitario)}>
              <input name="cantidad" type="number" required min="1" max={prod.cantidad} />
              <input type="submit" value="Eliminar" />
            </form>
          </li>
        ))}
      </ul>

      <button id="check" className={carrito.length === 0 ? "disabled" : ""} onClick={() => carrito.length > 0 && setOpenModal(true)}>
        Ir a Pagar
      </button>

      {openModal && <ModalCompra onClose={() => setOpenModal(false)} />}
      <div style={{ marginTop: 20 }}>
        <Link to="/">Volver al catálogo</Link>
      </div>
    </section>
  );
};

export default Carrito;
// Página de carrito que muestra los productos agregados y permite eliminarlos o proceder al pago