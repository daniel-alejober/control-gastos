import React from "react";
import Gasto from "./Gasto";

const ListadoGastos = ({
  gastos,
  setEditarGasto,
  eliminarGasto,
  gastosFiltrados,
  filtro,
}) => {
  return (
    <div className="listado-gastos contenedor">
      {/* Si hay un filtro vamos a iterar sobre gastos filtrados si no sobre todos los gastos*/}
      {filtro ? (
        <>
          <h2>
            {gastosFiltrados.length
              ? "Gatos"
              : "No hay gastos en esta categoría"}
          </h2>
          {gastosFiltrados.map((gasto) => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setEditarGasto={setEditarGasto}
              eliminarGasto={eliminarGasto}
            />
          ))}
        </>
      ) : (
        <>
          <h2>{gastos.length ? "Gatos" : "No hay gastos aún"}</h2>
          {gastos.map((gasto) => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setEditarGasto={setEditarGasto}
              eliminarGasto={eliminarGasto}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ListadoGastos;
