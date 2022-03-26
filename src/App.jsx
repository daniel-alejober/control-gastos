import { useState, useEffect } from "react";
import Header from "./components/Header";
import VentanaModal from "./components/VentanaModal";
import ListadoGastos from "./components/ListadoGastos";
import { generarId } from "./helpers/generarId";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
function App() {
  const [presupuesto, setPresupuesto] = useState(0);
  const [presupuestoValido, setPresupuestoValido] = useState(false);
  const [ventanaModal, setVentanaModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState([]);
  const [editarGasto, setEditarGasto] = useState({});

  /*Esta funcion se encargar de mostrar la ventana modal */
  const handleNuevoGasto = () => {
    setVentanaModal(true);
    setEditarGasto({});
    setTimeout(() => {
      setAnimarModal(true);
    }, 600);
  };
  /*verificamos si vienen con un id eso quiere decir que se esta editando un gasto y si no
  le agregamos propiedades id, fecha y lo guardamos en el array para que pueda ser iterado,
  en el .map() si los ids son iguales entonces regresa el gasto que te estamos pasando
  ya que esta editado si no se parecen en el id no los toques ya que esos gastos no estan editados */
  const guardarGasto = (gasto) => {
    if (gasto.id) {
      const gastoActualizado = gastos.map((gastoEditado) =>
        gastoEditado.id === gasto.id ? gasto : gastoEditado
      );
      setGastos(gastoActualizado);
    } else {
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
  };
  useEffect(() => {
    if (Object.keys(editarGasto).length > 0) {
      setVentanaModal(true);
      setTimeout(() => {
        setAnimarModal(true);
      }, 600);
    }
  }, [editarGasto]);

  return (
    <div className={ventanaModal ? "fijar" : ""}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        setPresupuestoValido={setPresupuestoValido}
        presupuestoValido={presupuestoValido}
        gastos={gastos}
      />
      {presupuestoValido && (
        <>
          <main>
            <ListadoGastos gastos={gastos} setEditarGasto={setEditarGasto} />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="Icono Nuevo Gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}
      {ventanaModal && (
        <VentanaModal
          setVentanaModal={setVentanaModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          editarGasto={editarGasto}
        />
      )}
    </div>
  );
}

export default App;
