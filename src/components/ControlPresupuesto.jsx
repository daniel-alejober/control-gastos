import React, { useEffect, useState } from "react";

const ControlPresupuesto = ({ presupuesto, gastos }) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  /*
   *el 0 quiere decir que iniciara en 0,
   *el primer valor total es el valor acumulado de la suma
   *gasto es el valor actual que le estamos agragando
   *ya que empieza en 0 seria 200 + 0 = 200
   *la segunda vez es 100+200 = 300 */
  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => Number(gasto.cantidad) + total,
      0
    );
    const totalDisponible = presupuesto - totalGastado;
    setGastado(totalGastado);
    setDisponible(totalDisponible);
  }, [gastos]);

  /*
   *Formatear para que aparezca la moneda con centavos todo dependera las opciones que le pases*/
  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };
  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <p>Grafica</p>
      </div>
      <div className="contenido-presupuesto">
        <p>
          <span>Presupuesto: </span>
          {formatearCantidad(presupuesto)}
        </p>
        <p>
          <span>Disponible: </span>
          {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado: </span>
          {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
