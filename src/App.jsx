import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './assets/paginas/Home.jsx';
import Favoritos from './assets/paginas/Favoritos.jsx';
import DetalleProducto from './assets/paginas/DetalleProducto.jsx';
import FormularioProducto from './assets/componentes/FormularioProducto.jsx';
import Footer from './assets/componentes/Footer.jsx';
import Menu from './assets/componentes/Navbar.jsx';
import Errorpagina from './assets/paginas/Errorpagina.jsx';
import InicioSecion from './assets/paginas/InicioSecion.jsx';
import UserValidacionURL from './assets/hooks/userValidacionURL.jsx';
import Papelera from './assets/paginas/Papelera.jsx';
<<<<<<< HEAD

import { ProductoProvider } from './assets/context/ProductoContext.jsx';
import { AutorizarProvider } from './assets/context/AurorizacionesContex.jsx';
=======
import { ProductoProvider } from './assets/context/ProductoContext.jsx';
import { UsuarioProvider, UsuarioContext } from './assets/context/UsuarioContext.jsx';
import { useContext } from 'react';

// Ruta protegida solo para Home, redirige al login si no hay sesión
function RutaProtegidaHome() {
  const { usuarioActual } = useContext(UsuarioContext);
  return usuarioActual ? <Home /> : <Navigate to="/login" />;
}
>>>>>>> 5ce9d87d23f8798a72836ac590f8eebd4f84e029

function App() {
  return (
    <AutorizarProvider>
      <ProductoProvider>      
        <BrowserRouter>
          <Menu />

          <Routes>
            {/* Página de inicio de sesión */}
            <Route path="/login" element={<InicioSecion />} />

<<<<<<< HEAD
            {/* Página principal (Home) visible para todos */}
            <Route path="/" element={<Home />} />
=======
            {/* Página principal (requiere sesión iniciada) */}
            <Route path="/" element={<RutaProtegidaHome />} />
>>>>>>> 5ce9d87d23f8798a72836ac590f8eebd4f84e029

            {/* Página de productos favoritos (protegida) */}
            <Route
              path="/favoritos"
              element={
                <UserValidacionURL>
                  <Favoritos />
                </UserValidacionURL>
              }
            />

            {/* Página de detalle individual del producto (protegida) */}
            <Route
              path="/producto/:id"
              element={
                <UserValidacionURL>
                  <DetalleProducto />
                </UserValidacionURL>
              }
            />
            <Route
              path="/papelera"
              element={
                <UserValidacionURL rol="admin">
                  <Papelera />
                </UserValidacionURL>
              }
            />


            {/* Formulario para crear nuevo producto (solo admin) */}
            <Route
              path="/crear"
              element={
                <UserValidacionURL rol="admin">
                  <FormularioProducto />
                </UserValidacionURL>
              }
            />

            {/* Formulario para editar producto existente (solo admin) */}
            <Route
              path="/editar/:id"
              element={
                <UserValidacionURL rol="admin">
                  <FormularioProducto />
                </UserValidacionURL>
              }
            />

            {/* Papelera solo para admin */}
            <Route
              path="/papelera"
              element={
                <UserValidacionURL rol="admin">
                  <Papelera />
                </UserValidacionURL>
              }
            />

            {/* Página de error genérica */}
            <Route path="/error" element={<Errorpagina />} />

            {/* Ruta no encontrada */}
            <Route
              path="*"
              element={<Errorpagina mensaje="Página no encontrada (Error 404)" />}
            />
          </Routes>

          <Footer />
        </BrowserRouter>
      </ProductoProvider>
    </AutorizarProvider>
  );
}

export default App;
