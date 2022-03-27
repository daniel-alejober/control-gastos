import { useState, useEffect } from "react";
import Header from "./components/Header";
import VentanaModal from "./components/VentanaModal";
import ListadoGastos from "./components/ListadoGastos";
import { generarId } from "./helpers/generarId";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
function App() {
  /*vamos a cambiar el valor inicial ya que si hay un presupuesto en LS tomara ese presupuesto
  y si no hay ninguno sera 0 */
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  );
  /*Su valor inicial sera se encuentra algo en LS enonces tomara ese valor
  y si no sera un array vacio */
  const [gastos, setGastos] = useState(
    localStorage.getItem("gastos")
      ? JSON.parse(localStorage.getItem("gastos"))
      : []
  );
  const [presupuestoValido, setPresupuestoValido] = useState(false);
  const [ventanaModal, setVentanaModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [editarGasto, setEditarGasto] = useState({});

  /*abrira la ventana modal si hay valores en editar gasto */
  useEffect(() => {
    if (Object.keys(editarGasto).length > 0) {
      setVentanaModal(true);
      setTimeout(() => {
        setAnimarModal(true);
      }, 600);
    }
  }, [editarGasto]);

  /*Guardar el LS, le ponemos un nombre y su valor, y si no esta presente ese valor
  le vamos a poner un 0*/
  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto]);

  /*ya que no podemos almacenar arreglos en LS lo convertimos a string */
  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  }, [gastos]);

  /*este usf se encarga de verificar si ya hay un presupuesto en ls si lo hay
  va a redireccionar al dashboard*/
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0;
    if (presupuestoLS > 0) {
      setPresupuestoValido(true);
    }
  }, []);
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
      setEditarGasto({});
    } else {
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
  };

  const eliminarGasto = (id) => {
    const gastoEliminado = gastos.filter((gasto) => gasto.id !== id);
    setGastos(gastoEliminado);
  };

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
            <ListadoGastos
              gastos={gastos}
              setEditarGasto={setEditarGasto}
              eliminarGasto={eliminarGasto}
            />
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
          setEditarGasto={setEditarGasto}
        />
      )}
    </div>
  );
}

export default App;
