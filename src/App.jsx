import { useState } from "react";
import Header from "./components/Header";
import VentanaModal from "./components/VentanaModal";
import { generarId } from "./helpers/generarId";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
function App() {
  const [presupuesto, setPresupuesto] = useState(0);
  const [presupuestoValido, setPresupuestoValido] = useState(false);
  const [ventanaModal, setVentanaModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState([]);

  const handleNuevoGasto = () => {
    setVentanaModal(true);
    setTimeout(() => {
      setAnimarModal(true);
    }, 600);
  };

  const guardarGasto = (gasto) => {
    gasto.id = generarId();
    setGastos([...gastos, gasto]);
  };
  console.log(gastos);

  return (
    <div>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        setPresupuestoValido={setPresupuestoValido}
        presupuestoValido={presupuestoValido}
      />
      {presupuestoValido && (
        <div className="nuevo-gasto">
          <img
            src={IconoNuevoGasto}
            alt="Icono Nuevo Gasto"
            onClick={handleNuevoGasto}
          />
        </div>
      )}
      {ventanaModal && (
        <VentanaModal
          setVentanaModal={setVentanaModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
        />
      )}
    </div>
  );
}

export default App;
