// =============================================================
// CAPA DE LOGICA DE NEGOCIO (Business Logic Layer)
// Archivo: controllers/productosController.js
//
// FUNCION ARQUITECTONICA:
// El Controlador actua como el "cerebro" de cada operacion.
// Recibe la peticion HTTP, invoca al modelo/servicio de datos,
// aplica reglas de negocio (validaciones, transformaciones) y
// construye la respuesta HTTP adecuada.
//
// En una arquitectura N-Tier real, aqui iria logica como:
// - Validar que el usuario tiene permisos para ver los productos
// - Filtrar productos por disponibilidad o categoria
// - Calcular precios con descuentos o impuestos aplicables
// =============================================================

// Importamos la instancia de BD desde la Capa de Acceso a Datos.
// El controlador NO sabe como funciona SQLite; solo sabe que puede
// pedirle datos a este modulo. Esto es el principio de abstraccion.
const db = require('../database/db');

/**
 * Controlador: obtenerTodosLosProductos
 *
 * Maneja las peticiones GET /api/productos.
 * Consulta todos los productos disponibles en la base de datos
 * y los retorna como una respuesta JSON estructurada.
 *
 * @param {import('express').Request}  req - Objeto de peticion HTTP
 * @param {import('express').Response} res - Objeto de respuesta HTTP
 */
function obtenerTodosLosProductos(req, res) {
  try {
    // --- CONSULTA A LA CAPA DE DATOS ---
    // db.prepare() compila la sentencia SQL una vez para eficiencia.
    // .all() ejecuta la query y retorna un array de objetos JavaScript.
    // Cada objeto representa un registro de la tabla `productos`.
    const statement = db.prepare('SELECT * FROM productos ORDER BY id ASC');
    const productos = statement.all();

    console.log(`[CONTROLLER] Solicitud recibida. Retornando ${productos.length} producto(s).`);

    // --- CONSTRUCCION DE LA RESPUESTA ---
    // Envolvemos los datos en un objeto con metadata adicional.
    // Esto sigue el principio de diseno de APIs RESTful: proveer
    // contexto junto con los datos (envelope pattern).
    res.status(200).json({
      success: true,
      total: productos.length,
      data: productos,
    });

  } catch (error) {
    // Manejo de errores: si algo falla en la BD, respondemos con
    // HTTP 500 (Internal Server Error) y no exponemos detalles
    // tecnicos internos al cliente (buena practica de seguridad).
    console.error('[CONTROLLER] Error al consultar productos:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor al obtener productos.',
    });
  }
}

module.exports = { obtenerTodosLosProductos };
