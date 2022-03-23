import { useState } from "react";
import Header from "./components/Header";
function App() {
  const [presupuesto, setPresupuesto] = useState(0);
  const [presupuestoValido, setPresupuestoValido] = useState(false);
  return (
    <div>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        setPresupuestoValido={setPresupuestoValido}
        presupuestoValido={presupuestoValido}
      />
    </div>
  );
}

export default App;
