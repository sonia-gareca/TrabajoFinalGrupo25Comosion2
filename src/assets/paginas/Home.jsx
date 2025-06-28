import { useContext } from 'react';
import { ProductoContext } from '../context/ProductoContext.jsx';
import CardProducto from '../componentes/CardProducto.jsx';
import { Carousel, Row, Col } from 'react-bootstrap';
import '../css/home.css';


const Home = () => {
  const { productos } = useContext(ProductoContext);
  // Filtrar productos que no están marcados como eliminados
  const productosActivos = productos.filter(p => !p.eliminado);
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
      <div className='cards-container'>
        <Row>
          {/*muestra todas las cards de producto*/}
          {productosActivos.map(producto => (
            <Col
              key={producto.id}
              xs={12} sm={6} md={4} lg={3} // 1 card por fila en móvil, 2 en tablet, 3-4 en PC
              className="mb-4 d-flex justify-content-center"
            >
              <CardProducto producto={producto} />
            </Col>
          ))}
        </Row>
      </div>
      
    </div>
  );
};

export default Home;