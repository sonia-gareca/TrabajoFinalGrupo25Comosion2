import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './assets/paginas/Home.jsx';
import Favoritos from './assets/paginas/Favoritos.jsx';
import DetalleProducto from './assets/paginas/DetalleProducto.jsx';
import FormularioProducto from './assets/componentes/FormularioProducto.jsx';
import Footer from './assets/componentes/Footer.jsx';
import Menu from './assets/componentes/Navbar.jsx';
import Errorpagina from './assets/paginas/Errorpagina.jsx';
import InicioSecion from './assets/paginas/InicioSecion.jsx';
import UserValidacionURL from './assets/hooks/userValidacionURL.jsx';

import { ProductoProvider } from './assets/context/ProductoContext.jsx';
import { AutorizarProvider } from './assets/context/AurorizacionesContex.jsx';

function App() {
  return (
    <AutorizarProvider>
      <ProductoProvider>      
        <BrowserRouter>
          <Menu />

          <Routes>
            {/* Página de inicio de sesión */}
            <Route path="/login" element={<InicioSecion />} />

            {/* Página principal (Home) visible para todos */}
            <Route path="/" element={<Home />} />

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
