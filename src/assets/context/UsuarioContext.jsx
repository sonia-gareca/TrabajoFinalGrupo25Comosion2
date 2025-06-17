import { createContext, useEffect, useState } from 'react';

export const UsuarioContext = createContext();

export function UsuarioProvider({ children }) {
  const [usuarioActual, setUsuarioActual] = useState(null);

  // Al iniciar, cargar el usuario del localStorage si existe
  useEffect(() => {
    const guardado = localStorage.getItem('usuarioActual');
    if (guardado) setUsuarioActual(guardado);
  }, []);

  // Cada vez que cambia el usuarioActual, lo guardamos
  useEffect(() => {
    if (usuarioActual) {
      localStorage.setItem('usuarioActual', usuarioActual);
    } else {
      localStorage.removeItem('usuarioActual');
    }
  }, [usuarioActual]);

  return (
    <UsuarioContext.Provider value={{ usuarioActual, setUsuarioActual }}>
      {children}
    </UsuarioContext.Provider>
  );
}
