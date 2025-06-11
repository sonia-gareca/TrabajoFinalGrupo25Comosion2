import { createContext, useState, useEffect } from 'react';

// Se crea un contexto para compartir estado global de productos y favoritos
export const ProductoContext = createContext(null);

export const ProductoProvider = ({ children }) => {
  // Estado para almacenar los productos cargados desde la API
  const [productos, setProductos] = useState([]);
  // Estado para almacenar los IDs de productos marcados como favoritos
  const [favoritos, setFavoritos] = useState([]);

  // Se ejecuta solo una vez al iniciar la aplicación
  useEffect(() => {
    // Petición GET a la API para obtener los productos
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        // Se agregan flags de eliminado (para el borrado lógico)
        const dataConFlags = data.map(p => ({ ...p, eliminado: false }));
        setProductos(dataConFlags);
      });
  }, []);

   // Alterna el estado de favorito de un producto según su ID CREA UN ARRAY CON LOS FAVORITOS
  const toggleFavorito = (id) => {
    setFavoritos(prev =>
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };
  // Marca un producto como eliminado (borrado lógico)
  const eliminarProducto = (id) => {
    setProductos(prev =>
      prev.map(p => p.id === id ? { ...p, eliminado: true } : p)
    );
  };

  // Edita un producto existente con nuevos datos
  const editarProducto = (nuevoProducto) => {
    setProductos(prev =>
      prev.map(p => p.id === nuevoProducto.id ? nuevoProducto : p)
    );
  };

  // Agrega un nuevo producto al listado
  const agregarProducto = (nuevoProducto) => {
    setProductos(prev => [...prev, nuevoProducto]);
  };

  // El proveedor expone todos los datos y funciones al resto de la app
  return (
    <ProductoContext.Provider
      value={{ productos, favoritos, toggleFavorito, eliminarProducto, editarProducto, agregarProducto }}
    >
      {children}
    </ProductoContext.Provider>
  );
};
