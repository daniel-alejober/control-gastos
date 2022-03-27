import React, { useState, useEffect } from "react";
import Mensaje from "./Mensaje";
import ImagenCerrar from "../img/cerrar.svg";

const VentanaModal = ({
  setVentanaModal,
  animarModal,
  setAnimarModal,
  guardarGasto,
  editarGasto,
  setEditarGasto,
}) => {
  const [mensaje, setMensaje] = useState("");
  const [gastoEditado, setGastoEditado] = useState(""); //state para saber si estamos editando un gasto
  const [fecha, setFecha] = useState(""); //state para agregar una fecha cuando lo actualizamos
  const [datosGasto, setDatosGasto] = useState({
    nombre: "",
    cantidad: "",
    categoria: "",
  });
  const { nombre, cantidad, categoria } = datosGasto;

  /*se ejecutara cuando el cliente mueva para editar su gasto, y vamos a llenar
  los inputs con los nuevo valores */
  useEffect(() => {
    if (Object.keys(editarGasto).length > 0) {
      setDatosGasto({
        nombre: editarGasto.nombre,
        cantidad: editarGasto.cantidad,
        categoria: editarGasto.categoria,
      });
      setGastoEditado(editarGasto.id); //llenamos el state con el id del gasto que estamos editando
      setFecha(editarGasto.fecha);
    }
  }, []);

  const agregarGasto = (e) => {
    setDatosGasto({
      ...datosGasto,
      [e.target.name]: e.target.value,
    });
  };

  const cerrarModal = () => {
    setAnimarModal(false);
    setEditarGasto({});
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
    guardarGasto({
      ...datosGasto,
      id: gastoEditado,
      fecha,
    }); //gasto editado tiene el id se lo pasamos al app.jsx
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
        <legend>{editarGasto.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>
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
          <select
            name="categoria"
            id="categoria"
            onChange={agregarGasto}
            value={categoria}
          >
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
        <input
          type="submit"
          value={editarGasto.nombre ? "Guardar Cambios" : "Añadir Gasto"}
        />
      </form>
    </div>
  );
};

export default VentanaModal;
