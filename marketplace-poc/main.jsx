// =============================================================
// CAPA DE PRESENTACION (Presentation Layer)
// Archivo: src/App.jsx (Componente Principal / Vista)
//
// FUNCION ARQUITECTONICA:
// Este componente es la "Vista" en el patron MVC/MVP aplicado
// al frontend. Sus responsabilidades son:
//   1. Gestionar el estado de la UI (cargando, error, datos)
//   2. Hacer la peticion HTTP hacia la Capa de Logica de Negocio
//   3. Renderizar los datos recibidos de forma comprensible
//
// La comunicacion sigue el flujo de la arquitectura de 3 capas:
// [Usuario hace clic] -> [React llama al backend via fetch]
//    -> [Backend consulta SQLite] -> [Respuesta JSON]
//       -> [React actualiza el estado] -> [UI se re-renderiza]
// =============================================================

import { useState } from 'react';

// --- CONSTANTE DE CONFIGURACION ---
// La URL del endpoint de la Capa de Logica de Negocio (Backend).
// En desarrollo, Vite proxea /api a http://localhost:3001.
// En produccion, esto seria la URL del servidor real.
const API_URL = '/api/productos';

// --- COMPONENTE: TarjetaProducto ---
// Componente hijo reutilizable que renderiza la informacion
// de un solo producto. Sigue el principio de componentes pequenos
// y enfocados (Single Responsibility en el frontend).
function TarjetaProducto({ producto }) {
  return (
    <article className="producto-card">
      <div className="producto-header">
        <span className="producto-id">#{producto.id}</span>
        <span className="producto-precio">
          ${producto.precio.toFixed(2)}
          <small> / {producto.unidad}</small>
        </span>
      </div>
      <h3 className="producto-nombre">{producto.nombre}</h3>
      <p className="producto-descripcion">{producto.descripcion}</p>
      <footer className="producto-footer">
        <span className="productor-tag">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          {producto.productor}
        </span>
      </footer>
    </article>
  );
}

// --- COMPONENTE PRINCIPAL: App ---
// Orquesta toda la Capa de Presentacion.
export default function App() {
  // --- GESTION DE ESTADO (State Management) ---
  // React usa estado local para determinar QUE mostrar en pantalla.
  // Cada llamada a un setter (setX) provoca un nuevo renderizado del componente.
  const [productos, setProductos] = useState([]);       // Array de productos recibidos
  const [cargando, setCargando]   = useState(false);    // Indicador de peticion en vuelo
  const [error, setError]         = useState(null);     // Mensaje de error, si ocurre
  const [fueConsultado, setFueConsultado] = useState(false); // Controla si ya se cargo

  // --- FUNCION DE COMUNICACION CON EL BACKEND ---
  // Esta funcion implementa el "puente" entre la Capa de Presentacion
  // y la Capa de Logica de Negocio via protocolo HTTP.
  const obtenerProductos = async () => {
    // Reseteamos el estado antes de cada peticion para manejar
    // el caso de que el usuario haga clic varias veces.
    setCargando(true);
    setError(null);
    setProductos([]);
    setFueConsultado(true);

    try {
      console.log(`[FRONTEND] Enviando peticion GET a: ${API_URL}`);

      // fetch() es la API nativa del navegador para hacer peticiones HTTP.
      // Retorna una Promesa que resuelve cuando llega la respuesta.
      // La palabra 'await' pausa la ejecucion hasta recibir la respuesta,
      // sin bloquear el hilo principal del navegador (es asincrono).
      const respuesta = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Accept': 'application/json', // Le decimos al servidor que esperamos JSON
        },
      });

      // Verificamos que el servidor respondio con un codigo HTTP 2xx (exito).
      // Un status 404 o 500 no lanza un error en fetch; debemos chequearlo manual.
      if (!respuesta.ok) {
        throw new Error(
          `El servidor respondio con error HTTP ${respuesta.status}: ${respuesta.statusText}`
        );
      }

      // .json() parsea el cuerpo de la respuesta (texto) como JSON
      // y retorna el objeto JavaScript equivalente.
      const resultado = await respuesta.json();

      console.log(`[FRONTEND] Respuesta recibida:`, resultado);

      // Actualizamos el estado con los datos recibidos.
      // React detecta el cambio y re-renderiza el componente automaticamente.
      setProductos(resultado.data);

    } catch (err) {
      // Capturamos errores de red (servidor caido, sin conexion)
      // o errores de parseo JSON.
      console.error('[FRONTEND] Error en la peticion:', err);
      setError(
        err.message.includes('Failed to fetch')
          ? 'No se pudo conectar al servidor. Verifica que el backend este corriendo en el puerto 3001.'
          : `Error: ${err.message}`
      );
    } finally {
      // `finally` se ejecuta SIEMPRE, haya exito o error.
      // Garantiza que el indicador de carga siempre se desactive.
      setCargando(false);
    }
  };

  // --- RENDERIZADO (Render) ---
  // Basado en el estado actual, React decide que mostrar.
  // Esto se llama "renderizado condicional" (conditional rendering).
  return (
    <div className="app-container">

      {/* === ENCABEZADO === */}
      <header className="app-header">
        <div className="header-badge">Prueba de Concepto &bull; Arquitectura 3 Capas</div>
        <h1 className="app-titulo">
          Marketplace de
          <em> Productos Locales</em>
        </h1>
        <p className="app-subtitulo">
          Conectando productores locales con la comunidad
        </p>
      </header>

      {/* === DIAGRAMA DE ARQUITECTURA (solo para la PoC) === */}
      <section className="arquitectura-banner">
        <div className="capa capa-frontend activa">
          <span className="capa-icono">🖥</span>
          <span>Presentacion</span>
          <small>React · :3000</small>
        </div>
        <div className="capa-flecha">&#8646;</div>
        <div className={`capa capa-backend ${cargando ? 'activa pulsando' : ''}`}>
          <span className="capa-icono">⚙</span>
          <span>Logica de Negocio</span>
          <small>Express · :3001</small>
        </div>
        <div className="capa-flecha">&#8646;</div>
        <div className={`capa capa-datos ${cargando ? 'activa pulsando' : ''}`}>
          <span className="capa-icono">🗄</span>
          <span>Acceso a Datos</span>
          <small>SQLite</small>
        </div>
      </section>

      {/* === SECCION DE ACCION PRINCIPAL === */}
      <main className="app-main">
        <div className="accion-container">
          <p className="accion-descripcion">
            Al hacer clic, el frontend enviara una peticion{' '}
            <code>GET /api/productos</code> al servidor backend,
            que consultara la base de datos SQLite y retornara los resultados en JSON.
          </p>

          {/* BOTON PRINCIPAL: dispara la comunicacion entre capas */}
          <button
            className={`btn-principal ${cargando ? 'btn-cargando' : ''}`}
            onClick={obtenerProductos}
            disabled={cargando}
            aria-busy={cargando}
          >
            {cargando ? (
              <>
                <span className="spinner" aria-hidden="true"></span>
                Consultando base de datos...
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                Ver Productos Disponibles
              </>
            )}
          </button>
        </div>

        {/* === AREA DE RESULTADOS (renderizado condicional) === */}

        {/* Estado: Error */}
        {error && (
          <div className="estado-error" role="alert">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <div>
              <strong>Error de comunicacion</strong>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Estado: Datos recibidos exitosamente */}
        {!cargando && !error && fueConsultado && productos.length > 0 && (
          <section className="resultados-container">
            <div className="resultados-header">
              <h2>Respuesta JSON del Backend</h2>
              <span className="badge-total">{productos.length} productos encontrados</span>
            </div>

            {/* Vista JSON cruda (para demostrar la PoC) */}
            <details className="json-raw">
              <summary>Ver JSON crudo recibido</summary>
              <pre>{JSON.stringify(productos, null, 2)}</pre>
            </details>

            {/* Vista renderizada como tarjetas */}
            <h2 className="grid-titulo">Datos Renderizados como Componentes</h2>
            <div className="productos-grid">
              {productos.map((producto) => (
                <TarjetaProducto key={producto.id} producto={producto} />
              ))}
            </div>
          </section>
        )}

        {/* Estado: Carga completada pero sin productos */}
        {!cargando && !error && fueConsultado && productos.length === 0 && (
          <div className="estado-vacio">
            No se encontraron productos en la base de datos.
          </div>
        )}
      </main>

      <footer className="app-footer">
        PoC &mdash; Arquitectura de 3 Capas &bull; Marketplace de Productos Locales
      </footer>
    </div>
  );
}
