// =============================================================
// CAPA DE LOGICA DE NEGOCIO (Business Logic Layer)
// Archivo: routes/productos.js
//
// FUNCION ARQUITECTONICA:
// El Router es el "mapa de rutas" del servidor. Define que URL
// mapea a que controlador. Separar rutas de controladores
// facilita el mantenimiento y permite versionar la API (/api/v1,
// /api/v2) sin modificar la logica de negocio.
// =============================================================

const express = require('express');
const { obtenerTodosLosProductos } = require('../controllers/productosController');

// Creamos un Router de Express (sub-aplicacion enrutable)
const router = express.Router();

// --- DEFINICION DE ENDPOINTS ---
// GET /api/productos -> delega al controlador correspondiente
// El prefijo /api/productos lo aplica server.js al montar este router.
router.get('/', obtenerTodosLosProductos);

// Aqui podrian agregarse mas rutas en el futuro:
// router.get('/:id', obtenerProductoPorId);
// router.post('/', crearProducto);
// router.put('/:id', actualizarProducto);
// router.delete('/:id', eliminarProducto);

module.exports = router;
