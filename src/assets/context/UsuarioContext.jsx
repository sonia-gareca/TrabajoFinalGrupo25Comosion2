import { createContext, useEffect, useState } from 'react';

export const UsuarioContext = createContext();

export function UsuarioProvider({ children }) {
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const guardado = localStorage.getItem('usuarioActual');
    if (guardado) setUsuarioActual(guardado);
    setCargando(false);
  }, []);

  useEffect(() => {
    if (usuarioActual) {
      localStorage.setItem('usuarioActual', usuarioActual);
    } else {
      localStorage.removeItem('usuarioActual');
    }
  }, [usuarioActual]);

  return (
    <UsuarioContext.Provider value={{ usuarioActual, setUsuarioActual, cargando }}>
      {children}
    </UsuarioContext.Provider>
  );
}
