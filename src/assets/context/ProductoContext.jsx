import { createContext, useState, useEffect, useContext } from 'react';
import { AutorizarContext } from './AurorizacionesContex.jsx';

// Se crea un contexto para compartir estado global de productos y favoritos
export const ProductoContext = createContext(null);

export const ProductoProvider = ({ children }) => {
  // Estado para almacenar los productos cargados desde la API
  const [productos, setProductos] = useState([]);
  // Estado para almacenar los IDs de productos marcados como favoritos
  const [favoritos, setFavoritos] = useState([]);
  // Estado para almacenar los productos originales (sin eliminar)
  const [productosOriginales, setProductosOriginales] = useState([]);


  // Se ejecuta solo una vez al iniciar la aplicación
  useEffect(() => {
    // Petición GET a la API para obtener los productos
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        // Se agregan flags de eliminado (para el borrado lógico)
        const dataConFlags = data.map(p => ({ ...p, eliminado: false }));
        setProductos(dataConFlags);
        setProductosOriginales(dataConFlags); // Copia base
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
  // Buscar el producto original
  const productoOriginal = productosOriginales.find(p => p.id === id);
  // Si no se encuentra, no hace nada
  if (!productoOriginal) return; // Si no se encuentra, no hace nada
  // Reemplaza el producto actual con su versión original + marcado como eliminado
  setProductos(prev =>
    // Reemplaza el producto actual con su versión original + marcado como eliminado
    prev.map(p =>
      p.id === id ? { ...productoOriginal, eliminado: true } : p
    )
  );
  // Eliminarlo de favoritos si estaba
  setFavoritos(prev => prev.filter(fid => fid !== id));
};


  // Edita un producto existente con nuevos datos
  const editarProducto = (nuevoProducto) => {
    // Verifica si el producto existe
    setProductos(prev =>
      // Actualiza el producto existente con los nuevos datos
      prev.map(p => p.id === nuevoProducto.id ? nuevoProducto : p)
    );
  };

  // Agrega un nuevo producto al listado
  const agregarProducto = (nuevoProducto) => {
    setProductos(prev => [...prev, nuevoProducto]);
  };
  // Obtén el usuario actual del contexto de autorización
  const { usuarioActual } = useContext(AutorizarContext);

  // Limpia favoritos cada vez que cambia el usuario logueado
  useEffect(() => {
    setFavoritos([]);
  }, [usuarioActual]);

   // Limpia favoritos manualmente (opcional)
  const limpiarFavoritos = () => setFavoritos([]);


  // Devuelve un producto por ID
const obtenerProducto = (id) => {
  return productos.find(p => p.id === parseInt(id));
};

  // El proveedor expone todos los datos y funciones al resto de la app
  return (
    <ProductoContext.Provider
      value={{ productos, favoritos, toggleFavorito, eliminarProducto, editarProducto, agregarProducto, obtenerProducto, limpiarFavoritos }}
    >
      {children}
    </ProductoContext.Provider>
  );
};