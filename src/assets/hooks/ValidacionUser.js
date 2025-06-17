// Función para validar usuario y clave en el inicio de sesión
function validarUsuario(usuario, clave) {
  const errores = {};

  // Verifica que el campo usuario no esté vacío
  if (!usuario.trim()) errores.usuario = 'Debe ingresar un nombre de usuario';
  // Verifica que el campo clave no esté vacío
  if (!clave.trim()) errores.clave = 'Debe ingresar una clave';

  // Si hay errores, retorna que no es válido y los errores encontrados
  if (Object.keys(errores).length > 0) {
    return { valido: false, errores };
  }

  // Valida si es el usuario administrador
  if (usuario === 'ProfeSosa2025' && clave === 'PV2025grupo25') {
    return { valido: true, tipo: 'admin' };
  }

  // Valida si es un usuario normal
  if (usuario === 'Grupo25' && clave === 'PV2025grupo25') {
    return { valido: true, tipo: 'user' };
  }

  // Si no coincide con ningún usuario válido, retorna error
  errores.usuario = 'Usuario o clave incorrectos';
  return { valido: false, errores };
};

export default validarUsuario ;
