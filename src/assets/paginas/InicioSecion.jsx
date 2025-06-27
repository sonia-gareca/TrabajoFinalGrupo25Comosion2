import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AutorizarContext } from '../context/AurorizacionesContex.jsx';
import validarUsuario from '../hooks/ValidacionUser.js';
import LoginForm from '../componentes/LoginForm.jsx';
import '../css/IniciarSesion.css';

const InicioSesion = () => {
  const { setUsuarioActual } = useContext(AutorizarContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Esta función se pasa al formulario y valida el usuario
  const handleLogin = (usuario, clave) => {
    const resultado = validarUsuario(usuario, clave);
    if (!resultado.valido) {
      const mensajes = Object.values(resultado.errores).join('\n');
      setError(mensajes);
      return;
    }
    setUsuarioActual ({ nombre: resultado.nombre, rol: resultado.tipo }); // 'admin' o 'user'
    navigate('/');
  };

  return (
    <div className="login-container">
      <h2 className="titulo-login">Iniciar Sesión</h2>
      <LoginForm onSubmit={handleLogin} error={error} />
    </div>
  );
};

export default InicioSesion;