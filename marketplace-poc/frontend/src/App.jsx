import { useState } from 'react';

const API_URL = '/api/productos';

export default function App() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const obtenerProductos = async () => {
    setCargando(true);
    setError(null);
    try {
      const respuesta = await fetch(API_URL);
      if (!respuesta.ok) {
        throw new Error('Error al conectar con el servidor');
      }
      const resultado = await respuesta.json();
      setProductos(resultado.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Marketplace de Productos Locales</h1>
        <p>Encuentra los mejores productos de tu comunidad</p>
      </header>
      
      <main className="main-content">
        <div className="acciones">
          <button 
            className="btn-primary"
            onClick={obtenerProductos} 
            disabled={cargando}
          >
            {cargando ? 'Cargando datos...' : 'Ver Productos'}
          </button>
        </div>

        {error && (
          <div className="alerta-error">
            <strong>Error: </strong> {error}
          </div>
        )}

        {productos.length > 0 && (
          <div className="resultados-container">
            <details className="debug-json">
              <summary>Ver JSON recibido del Backend</summary>
              <pre>{JSON.stringify(productos, null, 2)}</pre>
            </details>

            <div className="productos-grid">
              {productos.map(producto => (
                <div key={producto.id} className="producto-card">
                  <div className="producto-precio">${producto.precio.toFixed(2)}</div>
                  <h3 className="producto-nombre">{producto.nombre}</h3>
                  <p className="producto-descripcion">{producto.descripcion}</p>
                  <div className="producto-footer">
                    <span className="productor-nombre">Vendedor: {producto.productor}</span>
                    <span className="producto-unidad">Por {producto.unidad}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
