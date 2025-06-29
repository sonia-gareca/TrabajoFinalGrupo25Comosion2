import { useContext, useState } from 'react';
import { ProductoContext } from '../context/ProductoContext.jsx';
import CardProducto from '../componentes/CardProducto.jsx';
import { Carousel } from 'react-bootstrap';
import '../css/home.css';
import '../css/filtrar.css';

const Home = () => {
  const { productos } = useContext(ProductoContext);
  // Filtrar productos que no están marcados como eliminados
  const productosActivos = productos.filter(p => !p.eliminado);

  // Obtener categorías únicas
  const categorias = [...new Set(productosActivos.map(p => p.category))];

  // Estado para la categoría seleccionada
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas');

  // Filtrar productos por categoría seleccionada
  const productosFiltrados = categoriaSeleccionada === 'todas'
    ? productosActivos
    : productosActivos.filter(p => p.category === categoriaSeleccionada);

  return (
    <div>
      <Carousel>
         <Carousel.Item>
          <img 
          className="d-block w-100 carousel-img-fija"  src= "https://marketplace.canva.com/EAGOmfkcEoI/2/0/1600w/canva-banner-nueva-colecci%C3%B3n-indumentaria-y-moda-minimalista-blanco-y-negro-ExtyDoYt06k.jpg" alt="Banner 1" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 carousel-img-fija"  src= "https://img.freepik.com/psd-gratis/plantilla-banner-concepto-tienda-moda_23-2148626847.jpg?semt=ais_hybrid&w=740" alt="Banner 2" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 carousel-img-fija"  src= "https://www.clarin.com/2021/06/28/7E5R10CvG_720x0__1.jpg" alt="Banner 3" />
        </Carousel.Item>
      </Carousel>
      <h1>Todos Nuestros Productos</h1>

      {/* Lista desplegable para filtrar por categoría */}
      <div className="filtrar-barra">
        <label htmlFor="categoria-select">Filtrar por categoría: </label>
        <select
          id="categoria-select"
          value={categoriaSeleccionada}
          onChange={e => setCategoriaSeleccionada(e.target.value)}
        >
          <option value="todas">Todas</option>
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className='cards-container'>
        <div className="cards-wrapper">
          {/* Muestra todas las tarjetas de productos filtrados */}
          {productosFiltrados.map(producto => (
            <div key={producto.id} className="card-wrapper">
              <CardProducto producto={producto} />
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default Home;