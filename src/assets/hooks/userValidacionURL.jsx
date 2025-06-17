
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsuarioContext } from '../context/UsuarioContext.jsx';
import Errorpagina from '../paginas/Errorpagina.jsx';

const UserValidacionURL = ({ children, rol }) => {
  const { usuarioActual } = useContext(UsuarioContext);
  const navigate = useNavigate();
  const [mostrarError, setMostrarError] = useState(false);

  useEffect(() => {
    // Si no hay sesión, primero mostramos el error
    if (!usuarioActual) {
      setMostrarError(true);

      // Después de 3 segundos, redirigir al login
      const timeout = setTimeout(() => {
        navigate('/login');
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [usuarioActual, navigate]);

  // Si no hay sesión activa
  if (!usuarioActual) {
    return mostrarError ? (
      <Errorpagina mensaje="ERROR 102: Debe iniciar sesión para acceder a esta página" />
    ) : null;
  }

  // Si hay sesión pero el rol no coincide
  if (rol && usuarioActual !== rol) {
    return <Errorpagina mensaje="ERROR 102: No tiene permisos para acceder a esta página" />;
  }

  // Todo bien: mostrar contenido protegido
  return children;
};

export default UserValidacionURL;
