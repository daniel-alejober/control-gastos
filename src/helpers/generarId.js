export const generarId = () => {
  /*
   *.toString()-- pasa numeros a string dentro de los parametros le ponemos
   *ya que esa es una base que tambien convierte numeros a letras y subString(2)
   *para que elimine los primeros dos caracteres */
  const random = Math.random().toString(36).substring(2);
  const fecha = Date.now().toString(36);
  return random + fecha;
};
