// Esta función recibe un objeto "producto" y devuelve un mensaje de error si algo está mal.
// Si todo está bien, devuelve null (sin errores).
export const validarProducto = (producto) => {
  const { title, price, description, category, image } = producto; //desestructuracion del objeto
  
  if (!title || !price || !description || !category || !image) {
    return '⚠️ Todos los campos son obligatorios :( !!!';
  }

  //isNaN y Number son funciones nativas de JavaScript para validar números
  if (isNaN(price) || Number(price) <= 0) {
    return '💰 El precio debe ser un número positivo.';
  }

  if (!image.startsWith('http')) {
    return '🖼️ La URL de imagen debe comenzar con http o https.';
  }

  return null; // todo bien
};
