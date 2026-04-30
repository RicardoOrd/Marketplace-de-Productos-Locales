// =============================================================
// CAPA DE LOGICA DE NEGOCIO (Business Logic Layer)
// Archivo: server.js  (Punto de Entrada Principal del Backend)
//
// FUNCION ARQUITECTONICA:
// Este archivo es el "director de orquesta" del servidor.
// Su responsabilidad es:
//   1. Configurar el framework HTTP (Express)
//   2. Registrar middlewares globales (CORS, parseo de JSON)
//   3. Montar los routers en sus rutas base
//   4. Iniciar el servidor en el puerto definido
//
// NO contiene logica de negocio. Solo configuracion e inicializacion.
// =============================================================

const express = require('express');
const cors    = require('cors');

// --- INICIALIZACION DE CAPAS ---
// Al importar db.js, se ejecuta la funcion initializeDatabase(),
// lo que crea/verifica la BD y los datos semilla ANTES de que
// el servidor empiece a aceptar peticiones. Orden garantizado.
require('./database/db');

// Importamos el router de productos (Capa de Rutas)
const productosRouter = require('./routes/productos');

const app  = express();
const PORT = process.env.PORT || 3001;

// =============================================================
// MIDDLEWARES GLOBALES
// Los middlewares son funciones que se ejecutan en cada peticion
// ANTES de llegar al controlador final. Forman una "cadena de
// procesamiento" (pipeline) de la solicitud HTTP.
// =============================================================

// --- CORS (Cross-Origin Resource Sharing) ---
// PROBLEMA: Los navegadores bloquean por seguridad las peticiones
// HTTP que van de un origen (dominio:puerto) a otro distinto.
// Nuestro frontend (localhost:3000) llama al backend (localhost:3001),
// por lo que son origenes diferentes -> el navegador bloquea la peticion.
//
// SOLUCION: El servidor backend debe incluir en su respuesta las
// cabeceras HTTP `Access-Control-Allow-Origin` y otras relacionadas,
// indicandole al navegador que este origen especifico tiene permiso.
// El paquete `cors` hace esto automaticamente.
app.use(cors({
  // En produccion, esto deberia ser la URL exacta del frontend desplegado:
  // origin: 'https://mi-marketplace.com'
  // Para la PoC, permitimos solo nuestro frontend de desarrollo:
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  methods: ['GET'],       // Solo permitimos metodo GET para esta PoC
  optionsSuccessStatus: 200,
}));

// Middleware para parsear cuerpos de peticion en formato JSON
// (necesario para futuros endpoints POST/PUT)
app.use(express.json());

// --- RUTA DE HEALTH CHECK ---
// Endpoint simple para verificar que el servidor esta vivo.
// Util en entornos de CI/CD y monitoreo.
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    message: 'Backend del Marketplace funcionando correctamente.',
  });
});

// =============================================================
// MONTAJE DE ROUTERS (Registro de Rutas de la API)
// app.use('/api/productos', productosRouter) significa:
// "Cualquier peticion que llegue a /api/productos, pasala al
//  router de productos para que la maneje."
// =============================================================
app.use('/api/productos', productosRouter);

// --- MIDDLEWARE DE RUTA NO ENCONTRADA (404) ---
// Si ninguna ruta anterior coincidio, respondemos con 404.
// Debe ir DESPUES de todos los routers.
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Ruta ${req.method} ${req.url} no encontrada en el servidor.`,
  });
});

// --- INICIO DEL SERVIDOR ---
app.listen(PORT, () => {
  console.log('');
  console.log('='.repeat(55));
  console.log('  MARKETPLACE - Backend (Capa de Logica de Negocio)');
  console.log('='.repeat(55));
  console.log(`  Servidor Express corriendo en: http://localhost:${PORT}`);
  console.log(`  Endpoint principal:            http://localhost:${PORT}/api/productos`);
  console.log(`  Health check:                  http://localhost:${PORT}/health`);
  console.log('='.repeat(55));
  console.log('');
});

module.exports = app;
