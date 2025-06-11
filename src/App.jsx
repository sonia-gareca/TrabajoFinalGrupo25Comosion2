import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Importa las páginas o vistas principales
import Home from './assets/paginas/Home.jsx';
import Favoritos from './assets/paginas/Favoritos.jsx';
import DetalleProducto from './assets/paginas/DetalleProducto.jsx';
import FormularioProducto from './assets/componentes/FormularioProducto.jsx';
import Footer from './assets/componentes/Footer.jsx';
import Menu from './assets/componentes/Navbar.jsx';
// Importa el contexto global de productos
import { ProductoProvider } from './assets/context/ProductoContext.jsx';



function App() {
  return(
    // Proveedor global para toda la aplicación
    <ProductoProvider>
      <BrowserRouter>
        <Menu />
        <Routes>
          {/* Página principal */}
          <Route path="/" element={<Home />} />
          
          {/* Página de productos favoritos */}
          <Route path="/favoritos" element={<Favoritos />} />
          
          {/* Página de detalle individual del producto */}
          <Route path="/producto/:id" element={<DetalleProducto />} />
          
          {/* Formulario para crear nuevo producto */}
          <Route path="/crear" element={<FormularioProducto />} />
          
          {/* Formulario para editar producto existente */}
          <Route path="/editar/:id" element={<FormularioProducto />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </ProductoProvider>
  )
}

export default App ;
