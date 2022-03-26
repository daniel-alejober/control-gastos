import React from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { formatearFecha } from "../helpers/formatearFecha";
import IconoAhorro from "../img/icono_ahorro.svg";
import IconoCasa from "../img/icono_casa.svg";
import IconoComida from "../img/icono_comida.svg";
import IconoGastos from "../img/icono_gastos.svg";
import IconoOcio from "../img/icono_ocio.svg";
import IconoSalud from "../img/icono_salud.svg";
import IconoSubs from "../img/icono_suscripciones.svg";

/*
 *diccionarioIconos[categoria] asi se debe hacer para que encuentre el icono que le estamos
 *pasando dinamicamente */
const diccionarioIconos = {
  ahorro: IconoAhorro,
  comida: IconoComida,
  casa: IconoCasa,
  gastos: IconoGastos,
  ocio: IconoOcio,
  salud: IconoSalud,
  suscripciones: IconoSubs,
};

const Gasto = ({ gasto, setEditarGasto }) => {
  const { categoria, nombre, fecha, id, cantidad } = gasto;

  /*Esta funcion va a cargar un componente por eso lleva () en lugar de {},
  es obligatorio pasarle una funcion OnClick, le puedes cambiar los
  estilos a las clases .swipe-action__leading y .swipe-action__trailing*/
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setEditarGasto(gasto)}>Editar</SwipeAction>
    </LeadingActions>
  );
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={() => console.log("Eliminar..")}>
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()} //sera la funcion(accion) que se ejecute cuento se arrastre de izquierda a derecha
        trailingActions={trailingActions()} //sera la funcion(accion) que se ejecute cuento se arrastre de derecha a izquierda
      >
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
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default Gasto;
