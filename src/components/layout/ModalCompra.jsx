import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "../../styles/components/layout/ModalCompra.css";

/*
  Este componente reproduce la funcionalidad de compra (compra/compra.html)
  pero en modal. Guarda en localStorage con la misma clave "formularioPago".
  También rota la tarjeta al pasar por el input CVV como en tu original.
*/

const ModalCompra = ({ onClose }) => {
  const { vaciarCarrito } = useContext(CartContext);

  const [tarjeta, setTarjeta] = useState("");
  const [nombre, setNombre] = useState("");
  const [mes, setMes] = useState("");
  const [año, setAño] = useState("");
  const [cvv, setCvv] = useState("");
  const [correo, setCorreo] = useState("");

  useEffect(() => {
    try {
      const datosGuardados = JSON.parse(localStorage.getItem("formularioPago"));
      if (datosGuardados) {
        setTarjeta(datosGuardados.tarjeta || "");
        setNombre(datosGuardados.nombre || "");
        setMes(datosGuardados.expiracion?.mes || "");
        setAño(datosGuardados.expiracion?.año || "");
        setCorreo(datosGuardados.correo || "");
      }
    } catch (e) {

        // si hay error, no hago nada
        console.error("Error al cargar datos guardados:", e);

        //TODO: podria mostrar un mensaje al usuario si quisiera
      // no hay guardado aún
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const datos = {
      nombre,
      correo,
      tarjeta,
      expiracion: { mes, año },
    };
    localStorage.setItem("formularioPago", JSON.stringify(datos));
    alert("pago realizado :)");
    vaciarCarrito();
    onClose();
  };

  // efecto para rotar la tarjeta al hover sobre CVV: usaremos clases inline
  const [flip, setFlip] = useState(false);

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target.className === "modal-overlay") onClose(); }}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>X</button>

        <div className="contenedor">
          <div className="tarjeta" style={{ transform: flip ? "rotateY(180deg)" : "rotateY(0deg)", transition: "transform 0.6s ease" }}>
            <div className="front">
              <h2 id="numero">{tarjeta || "1234 5678 9012 3456"}</h2>
              <div className="flexbox">
                <div className="box">
                  <p id="nombre">{nombre || "nombre"}</p>
                </div>
                <div className="box">
                  <p>expira</p>
                  <div className="expira">
                    <p id="exp-month">{mes || "mm"}</p>
                    <p id="exp-year">{año || "yy"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="back">
              <div className="raya"></div>
              <div className="box">
                <p id="cvv">{cvv || "CVV"}</p>
                <div className="cvv-box"></div>
                <img src="/assets/mastercard.png" alt="" />
              </div>
            </div>
          </div>

          <form id="formulario" onSubmit={handleSubmit}>
            <div className="input">
              <p>card number</p>
              <input
                type="text"
                maxLength="19"
                className="card-number-input"
                required
                value={tarjeta}
                onChange={(e) => setTarjeta(e.target.value)}
              />
            </div>
            <div className="input">
              <p>card holder</p>
              <input
                type="text"
                pattern="^[A-Za-z ]+$"
                className="card-holder-input"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="flexbox">
              <div className="input">
                <p>expiration mm</p>
                <select className="month-input" required value={mes} onChange={(e) => setMes(e.target.value)}>
                  <option value="" disabled>mm</option>
                  {Array.from({length:12},(_,i)=> {
                    const val = (i+1).toString().padStart(2,"0");
                    return <option key={val} value={val}>{val}</option>;
                  })}
                </select>
              </div>
              <div className="input">
                <p>expiration yy</p>
                <select className="year-input" required value={año} onChange={(e) => setAño(e.target.value)}>
                  <option value="" disabled>yy</option>
                  {["2025","2026","2027","2028","2029","2030"].map(y=>(
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="inputBox">
              <p>cvv</p>
              <input
                type="text"
                maxLength="3"
                className="cvv-input"
                required
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                onMouseEnter={() => setFlip(true)}
                onMouseLeave={() => setFlip(false)}
              />
            </div>

            <div className="inputBox">
              <input className="mail" type="email" placeholder="Ingrese su correo" required value={correo} onChange={(e) => setCorreo(e.target.value)} />
            </div>

            <input type="submit" value="submit" className="submit-btn" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalCompra;
// Componente ModalCompra que maneja el formulario de pago en un modal