import React, { useState } from "react";
import Mensaje from "./Mensaje";
import ImagenCerrar from "../img/cerrar.svg";

const VentanaModal = ({
  setVentanaModal,
  animarModal,
  setAnimarModal,
  guardarGasto,
}) => {
  const [mensaje, setMensaje] = useState("");
  const [datosGasto, setDatosGasto] = useState({
    nombre: "",
    cantidad: "",
    categoria: "",
  });
  const { nombre, cantidad, categoria } = datosGasto;

  const agregarGasto = (e) => {
    setDatosGasto({
      ...datosGasto,
      [e.target.name]: e.target.value,
    });
  };

  const cerrarModal = () => {
    setAnimarModal(false);

    setTimeout(() => {
      setVentanaModal(false);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([nombre, cantidad, categoria].includes("")) {
      setMensaje("Todos los camposo son obligatorios");
      setTimeout(() => {
        setMensaje("");
      }, 1500);
      return;
    }
    guardarGasto(datosGasto);
    cerrarModal();
  };

  return (
    <div className="modal">
      <div className="cerrar-modal" onClick={cerrarModal}>
        <img src={ImagenCerrar} alt="Cerrar Modal" />
      </div>
      <form
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
        onSubmit={handleSubmit}
      >
        <legend>Nuevo Gasto</legend>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            placeholder="Añade nombre del gasto"
            value={nombre}
            onChange={agregarGasto}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            type="number"
            name="cantidad"
            id="Cantidad"
            placeholder="Añade la cantidad del gasto"
            value={cantidad}
            onChange={agregarGasto}
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoría</label>
          <select name="categoria" id="categoria" onChange={agregarGasto}>
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
        <input type="submit" value="Añadir Gasto" />
      </form>
    </div>
  );
};

export default VentanaModal;
