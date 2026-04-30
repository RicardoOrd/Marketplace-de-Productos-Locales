// =============================================================
// CAPA DE ACCESO A DATOS (Data Access Layer)
// Archivo: database/db.js
//
// FUNCION ARQUITECTONICA:
// Este modulo es el unico punto de contacto entre la aplicacion
// y el sistema de almacenamiento. Encapsula toda la logica de
// conexion y preparacion de la base de datos, siguiendo el
// principio de Responsabilidad Unica (SRP).
//
// DRIVER/CONECTOR (better-sqlite3):
// Un "driver" o "conector" es una libreria que implementa el
// protocolo de comunicacion especifico de un motor de base de
// datos. Sin el, Node.js no sabe como "hablar" con SQLite.
// 'better-sqlite3' traduce las llamadas JavaScript a operaciones
// nativas del archivo .db de SQLite de forma sincrona y eficiente.
// =============================================================

const Database = require('better-sqlite3');
const path = require('path');

// Definimos la ruta del archivo de la base de datos SQLite.
// SQLite no es un servidor; es simplemente un archivo en disco.
// Esto lo hace ideal para PoCs sin necesidad de infraestructura externa.
const DB_PATH = path.join(__dirname, 'marketplace.db');

/**
 * Inicializa la base de datos: crea el archivo si no existe,
 * define el esquema y siembra los datos iniciales (seed data).
 * @returns {Database} La instancia de conexion activa a la BD.
 */
function initializeDatabase() {
  // Al instanciar Database, 'better-sqlite3' abre (o crea) el
  // archivo .db. La opcion `verbose` envia cada sentencia SQL
  // ejecutada a la consola, util para depuracion en una PoC.
  const db = new Database(DB_PATH, {
    verbose: (message) => console.log(`  [SQL] ${message}`),
  });

  // WAL (Write-Ahead Logging): modo de journaling que mejora el
  // rendimiento en escrituras concurrentes. Buena practica general.
  db.pragma('journal_mode = WAL');

  // --- DEFINICION DEL ESQUEMA (DDL - Data Definition Language) ---
  // Usamos CREATE TABLE IF NOT EXISTS para que el script sea
  // idempotente: puede ejecutarse multiples veces sin errores.
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS productos (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre      TEXT    NOT NULL,
      descripcion TEXT    NOT NULL,
      precio      REAL    NOT NULL,
      unidad      TEXT    NOT NULL,
      productor   TEXT    NOT NULL
    )
  `;
  db.exec(createTableSQL);
  console.log('[DB] Tabla "productos" verificada/creada correctamente.');

  // --- DATOS SEMILLA (Seed Data) ---
  // Solo insertamos si la tabla esta vacia para no duplicar datos
  // en cada reinicio del servidor durante el desarrollo.
  const rowCount = db.prepare('SELECT COUNT(*) AS total FROM productos').get();

  if (rowCount.total === 0) {
    console.log('[DB] Tabla vacia. Insertando datos semilla...');

    const insertProducto = db.prepare(`
      INSERT INTO productos (nombre, descripcion, precio, unidad, productor)
      VALUES (@nombre, @descripcion, @precio, @unidad, @productor)
    `);

    // Usamos una transaccion para que todos los inserts sean atomicos:
    // o todos se guardan, o ninguno. Garantiza consistencia de datos.
    const seedTransaction = db.transaction((productos) => {
      for (const producto of productos) {
        insertProducto.run(producto);
      }
    });

    seedTransaction([
      {
        nombre: 'Miel Artesanal de Mezquite',
        descripcion: 'Miel pura cosechada de colmenas en la sierra. Sin procesar, con todo su sabor natural.',
        precio: 120.00,
        unidad: 'frasco 500ml',
        productor: 'Apiario Los Pinos',
      },
      {
        nombre: 'Queso Ranchero Regional',
        descripcion: 'Queso fresco elaborado con leche de vaca entera de ganaderia local. Textura suave y cremosa.',
        precio: 85.00,
        unidad: 'pza 400g',
        productor: 'Rancho El Nogal',
      },
      {
        nombre: 'Pan de Cazuela Artesanal',
        descripcion: 'Pan horneado en horno de barro con receta familiar de tres generaciones.',
        precio: 35.00,
        unidad: 'pieza grande',
        productor: 'Panaderia Dona Lupe',
      },
      {
        nombre: 'Salsa Macha de Chile Piquin',
        descripcion: 'Salsa artesanal con chile piquin de la region, aceite de oliva, ajo y cacahuate tostado.',
        precio: 65.00,
        unidad: 'frasco 250ml',
        productor: 'Condimentos La Huerta',
      },
    ]);

    console.log('[DB] Datos semilla insertados exitosamente.');
  } else {
    console.log(`[DB] La tabla ya contiene ${rowCount.total} registro(s). Omitiendo seed.`);
  }

  return db;
}

// Exportamos la instancia inicializada (Patron Singleton implicito).
// Node.js cachea los modulos, por lo que esta funcion se ejecuta
// una sola vez y la misma instancia de `db` se reutiliza en toda la app.
const db = initializeDatabase();

module.exports = db;
