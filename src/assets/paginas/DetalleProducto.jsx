import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { ProductoContext } from '../context/ProductoContext.jsx';

const DetalleProducto = () => {
  const { id } = useParams(); // Obtiene el ID de la URL
  const { productos, toggleFavorito, favoritos } = useContext(ProductoContext);

  // Busca el producto según su ID
  const producto = productos.find(p => p.id === parseInt(id));

  if (!producto) return <p>Producto no encontrado</p>;

  const esFavorito = favoritos.includes(producto.id);

  return (
    <div className="p-4">
      <h2>{producto.title}</h2>
      <img src={producto.image} style={{ width: '200px' }} />
      <p>{producto.description}</p>
      <p>Precio: {producto.price} USD</p>
      <p>Categoría: {producto.category}</p>

      {/* Botón para marcar/desmarcar como favorito */}
      <button onClick={() => toggleFavorito(producto.id)}>
        {esFavorito ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
      </button>
    </div>
  );
};

export default DetalleProducto;