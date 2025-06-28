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

  const handleLogin = (usuario, clave) => {
    const resultado = validarUsuario(usuario, clave);
    if (!resultado.valido) {
      const mensajes = Object.values(resultado.errores).join('\n');
      setError(mensajes);
      return;
    }
    setUsuarioActual({ nombre: resultado.nombre, rol: resultado.tipo });
    navigate('/');
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <h2>¡¡ Bienvenidos a nuestra !!<br />Tienda ClickZone</h2>
        <p>¡Inicie sesión para obtener nuevas funciones!</p>
        <p>Saludos para el equipo de PV-2025!</p>
      </div>
      <div className="login-right">
        <div className="login-box">
          <h3>Inicie Sesión</h3>
          <LoginForm onSubmit={handleLogin} error={error} />
        </div>
      </div>
    </div>
  );
};

export default InicioSesion;
