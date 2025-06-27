import { useState } from 'react';

/**
 * Formulario de login reutilizable.
 * Recibe una función onSubmit y un mensaje de error como props.
 */
const LoginForm = ({ onSubmit, error }) => {
  // Estados locales para usuario y clave
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');

  // Maneja el envío del formulario y llama a la función recibida por props
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(usuario, clave);
  };

  return (
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
      <button type="submit" className="btn-ingresar">Ingresar</button>
      {/* Muestra mensaje de error si existe */}
      {error && <div className="alerta-error visible">{error}</div>}
    </form>
  );
};

export default LoginForm;