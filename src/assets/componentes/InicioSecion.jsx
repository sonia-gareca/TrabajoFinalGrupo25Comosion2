import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsuarioContext } from '../context/UsuarioContext.jsx';
import validarUsuario from '../hooks/ValidacionUser.js';
import '../css/IniciarSesion.css';

// Componente funcional para el inicio de sesión
const InicioSesion = () => {
  // Obtiene la función para actualizar el usuario actual desde el contexto
  const { setUsuarioActual } = useContext(UsuarioContext);

  // Estados locales para usuario, clave y mensajes de error
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');

  // Hook para navegar entre rutas
  const navigate = useNavigate();

  // Maneja el envío del formulario de inicio de sesión
  const handleSubmit = (e) => {
    e.preventDefault();

    // Valida los datos ingresados usando el hook de validación
    const resultado = validarUsuario(usuario, clave);

    // Si hay errores, los muestra y detiene el proceso
    if (!resultado.valido) {
      const mensajes = Object.values(resultado.errores).join('\n');
      setError(mensajes);
      return;
    }

    // Si es válido, actualiza el usuario en el contexto y navega al home
    setUsuarioActual(resultado.tipo); // 'admin' o 'user'
    navigate('/');
  };

  return (
    <div className="login-container">
      {/* Título del formulario */}
      <h2 className="titulo-login">Iniciar Sesión</h2>
      {/* Muestra mensaje de error si existe */}
      {error && <div className="alerta-error visible">{error}</div>}

      {/* Formulario de inicio de sesión */}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="campo-formulario">
          <label htmlFor="usuario">Usuario:</label>
          <input
            id="usuario"
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Ingrese su usuario"
          />
        </div>

        <div className="campo-formulario">
          <label htmlFor="clave">Clave:</label>
          <input
            id="clave"
            type="password"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            placeholder="Ingrese su clave"
          />
        </div>

        {/* Botón para enviar el formulario */}
        <button type="submit" className="btn-ingresar">Ingresar</button>
      </form>
    </div>
  );
};

export default InicioSesion;