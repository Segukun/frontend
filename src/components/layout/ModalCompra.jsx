import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "../../styles/components/layout/ModalCompra.css";

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
      console.error("Error al cargar datos guardados:", e);
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

  // flip control (usa clase flipped)
  const [flip, setFlip] = useState(false);

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target.className === "modal-overlay") onClose();
      }}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">X</button>

        <div className="contenedor" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", alignItems: "start" }}>
          {/* TARJETA */}
          <div
            className={`tarjeta ${flip ? "flipped" : ""}`}
            onClick={() => setFlip((s) => !s)} // permite hacer click para girar
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setFlip((s) => !s); }}
          >
            <div className="tarjeta-inner">
              {/* FRONT */}
              <div className="front">
                <h2 id="numero">{tarjeta || "1234 5678 9012 3456"}</h2>
                <div className="flexbox">
                  <div className="box">
                    <p id="nombre">{nombre || "NOMBRE APELLIDO"}</p>
                  </div>
                  <div className="box">
                    <p>expira</p>
                    <div className="expira">
                      <p id="exp-month">{mes || "MM"}</p>
                      <p id="exp-year">{año || "YY"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* BACK */}
              <div className="back">
                {/* back image */}
                <img className="back-image" src="/tarjetadetras.jpg" alt="Back card background" />

                {/* máscara superior para "tapar" otras cosas y dar efecto */}
                <div className="cvv-mask" />

                <div className="raya"></div>

                <div className="box">
                  <div style={{ flex: 1 }}>
                    <p id="cvv">{cvv || "CVV"}</p>
                  </div>
                  <img src="/visa.jpg" alt="brand" />
                </div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <form id="formulario" onSubmit={handleSubmit} style={{ alignSelf: "start" }}>
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
                  {Array.from({ length: 12 }, (_, i) => {
                    const val = (i + 1).toString().padStart(2, "0");
                    return <option key={val} value={val}>{val}</option>;
                  })}
                </select>
              </div>
              <div className="input">
                <p>expiration yy</p>
                <select className="year-input" required value={año} onChange={(e) => setAño(e.target.value)}>
                  <option value="" disabled>yy</option>
                  {["2025","2026","2027","2028","2029","2030"].map(y => (
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
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                onMouseEnter={() => setFlip(true)}
                onMouseLeave={() => setFlip(false)}
                onFocus={() => setFlip(true)}
                onBlur={() => setFlip(false)}
                aria-label="cvv"
              />
            </div>

            <div className="inputBox">
              <input
                className="mail"
                type="email"
                placeholder="Ingrese su correo"
                required
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </div>

            <input type="submit" value="submit" className="submit-btn" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalCompra;
