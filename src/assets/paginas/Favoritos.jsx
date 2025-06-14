import { useContext } from 'react';
import { ProductoContext } from '../context/ProductoContext.jsx';
import CardProducto from '../componentes/CardProducto.jsx';

const Favoritos = () => {
  const { productos, favoritos } = useContext(ProductoContext);

  // Filtra los productos que son favoritos
  const favoritosFiltrados = productos.filter(p => favoritos.includes(p.id));

  return (
  <>
    <div className="text-center my-4">
      <h1>Productos Favoritos</h1>
      <p>Estos son tus productos favoritos Seleccionados</p>
      </div>
    <div className="d-flex flex-wrap justify-content-center">
      {/* Muestra solo los productos favoritos */}
      {favoritosFiltrados.map(producto => (
        <CardProducto key={producto.id} producto={producto} />
      ))}
    </div>
    </>
  );
};

export default Favoritos;
