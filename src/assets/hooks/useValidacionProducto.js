// Esta función recibe un objeto "producto" y devuelve un mensaje de error si algo está mal.
// Si todo está bien, devuelve null (sin errores).
export const validarProducto = (producto) => {
  const { title, price, description, category, image } = producto; // Desestructuración del objeto

  // 1. Validación de campos obligatorios y tipo de título
  if (!title) {
    return '⚠️ El nombre del producto es obligatorio.';
  }
  
  // Verifica que el título tenga al menos 3 caracteres
  if (title.length < 3) {
    return '⚠️ El nombre debe tener al menos 3 caracteres.';
  }
  //
  if (!price) {
    return '💰 El precio del producto es obligatorio.';
  }
  // Verifica que el precio sea un número y positivo
  if (isNaN(price) || Number(price) <= 0) {
    return '💰 El precio debe ser un número válido y positivo.';
  }

  if (!category) {
    return '🏷️ La categoría del producto es obligatoria.';
  }

  
  if (!description) {
    return '📝 La descripción del producto es obligatoria.';
  }


  if (!image) {
    return '🖼️ La URL de la imagen es obligatoria.';
  }
  
  // Verifica que la URL de la imagen comience con http o https
  if (!image.startsWith('http')) {
    return '🖼️ La URL de la imagen debe comenzar con http o https.';
  }

  // Si todas las validaciones pasaron, no hay errores
  return null;
};