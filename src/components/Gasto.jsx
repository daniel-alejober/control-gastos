import React from "react";
import { formatearFecha } from "../helpers/formatearFecha";
import IconoAhorro from "../img/icono_ahorro.svg";
import IconoCasa from "../img/icono_casa.svg";
import IconoComida from "../img/icono_comida.svg";
import IconoGastos from "../img/icono_gastos.svg";
import IconoOcio from "../img/icono_ocio.svg";
import IconoSalud from "../img/icono_salud.svg";
import IconoSubs from "../img/icono_suscripciones.svg";

const diccionarioIconos = {
  ahorro: IconoAhorro,
  comida: IconoComida,
  casa: IconoCasa,
  gastos: IconoGastos,
  ocio: IconoOcio,
  salud: IconoSalud,
  suscripciones: IconoSubs,
};
/*
 *diccionarioIconos[categoria] asi se debe hacer para que encuentre el icono que le estamos
 *pasando dinamicamente */

const Gasto = ({ gasto }) => {
  const { categoria, nombre, fecha, id, cantidad } = gasto;
  return (
    <div className="gasto sombra">
      <div className="contenido-gasto">
        <img src={diccionarioIconos[categoria]} alt={categoria} />
        <div className="descripcion-gasto">
          <p className="categoria">{categoria}</p>
          <p className="nombre-gasto">{nombre}</p>
          <p className="fecha-gasto">
            Agregado el: <span>{formatearFecha(fecha)}</span>
          </p>
        </div>
      </div>
      <p className="cantidad-gasto">${cantidad}</p>
    </div>
  );
};

export default Gasto;
