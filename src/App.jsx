import { BrowserRouter } from 'react-router-dom';
import Menu from './assets/componentes/Navbar';
import Footer from './assets/componentes/Footer';
import { ProductoProvider } from './assets/context/ProductoContext';
import { AutorizarProvider } from './assets/context/AurorizacionesContex';
import RoutesApp from './assets/routes/RoutesApp';

function App() {
  return (
    // Proveedor de contexto para autorizaciones y productos
    // Esto permite que los componentes hijos accedan a los datos y funciones de estos contextos
    <AutorizarProvider>
      {/* Proveedor de contexto para productos */}
      {/* Esto permite que los componentes hijos accedan a los datos y funciones relacionadas con productos */} 
      <ProductoProvider>
        {/* Envolviendo la aplicación con BrowserRouter para manejar las rutas */}
        {/* Esto permite que los componentes de la aplicación utilicen el enrutamiento de React Router */}
        <BrowserRouter>
          {/* Componente de navegación y menú */}
          {/* Este componente contiene enlaces de navegación y posiblemente un logo */}
          <Menu />
          <RoutesApp />
          <Footer />
        </BrowserRouter>
      </ProductoProvider>
    </AutorizarProvider>
  );
}

export default App;