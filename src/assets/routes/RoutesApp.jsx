import { Routes, Route } from 'react-router-dom';
import Home from '../paginas/Home';
import Favoritos from '../paginas/Favoritos';
import DetalleProducto from '../paginas/DetalleProducto';
import FormularioProducto from '../componentes/FormularioProducto';
import Errorpagina from '../paginas/Errorpagina';
import InicioSecion from '../paginas/InicioSecion';
import UserValidacionURL from '../hooks/userValidacionURL';
import Papelera from '../paginas/Papelera';

const RoutesApp = () => (
  <Routes>
    // Rutas públicas
    <Route path="/login" element={<InicioSecion />} />
    // Rutas protegidas
    <Route path="/" element={<Home />} />
    // Rutas protegidas con validación de usuario
    <Route path="/favoritos" element={<UserValidacionURL><Favoritos /></UserValidacionURL>} />
    // Rutas protegidas con validación de usuario y rol de administrador
    <Route path="/producto/:id" element={<UserValidacionURL><DetalleProducto /></UserValidacionURL>} />
    <Route path="/crear" element={<UserValidacionURL rol="admin"><FormularioProducto /></UserValidacionURL>} />
    <Route path="/editar/:id" element={<UserValidacionURL rol="admin"><FormularioProducto /></UserValidacionURL>} />
    <Route path="/papelera" element={<UserValidacionURL rol="admin"><Papelera /></UserValidacionURL>} />
    // Rutas de error
    <Route path="/error" element={<Errorpagina />} />
    <Route path="*" element={<Errorpagina mensaje="Página no encontrada (Error 404)" />} />
  </Routes>
);

export default RoutesApp;