import { useContext } from 'react';
import { ProductoContext } from '../context/ProductoContext.jsx';
import CardProducto from '../componentes/CardProducto.jsx';

const Home = () => {
  const { productos } = useContext(ProductoContext);

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {/* Muestra todas las tarjetas de productos */}
      {productos.map(producto => (
        <CardProducto key={producto.id} producto={producto} />
      ))}
    </div>
  );
};

export default Home;