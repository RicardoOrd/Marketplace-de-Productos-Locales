# Marketplace de Productos Locales — PoC
### Arquitectura de 3 Capas | Proyecto Escolar

> **Objetivo:** Demostrar empiricamente que la comunicacion entre las tres capas
> de la arquitectura funciona correctamente:
> `Peticion web → Servidor de Aplicacion → Base de Datos → Respuesta JSON`

---

## Estructura del Proyecto

```
marketplace-poc/
├── backend/                        # CAPA 2: Logica de Negocio
│   ├── database/
│   │   ├── db.js                   # Conexion y seed de SQLite
│   │   └── marketplace.db          # Archivo BD (generado al iniciar)
│   ├── controllers/
│   │   └── productosController.js  # Logica del endpoint
│   ├── routes/
│   │   └── productos.js            # Definicion de rutas
│   ├── server.js                   # Punto de entrada Express
│   └── package.json
│
└── frontend/                       # CAPA 1: Presentacion
    ├── src/
    │   ├── App.jsx                 # Componente principal React
    │   ├── main.jsx                # Punto de entrada React
    │   └── index.css               # Estilos globales
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## Instrucciones de Instalacion y Arranque

### PASO 1 — Backend (Puerto 3001)

```bash
# 1. Entra a la carpeta del backend
cd marketplace-poc/backend

# 2. Instala las dependencias
npm install

# 3. Inicia el servidor (modo desarrollo con auto-reinicio)
npm run dev

# O en modo produccion:
npm start
```

Deberas ver en la consola:
```
[DB] Tabla "productos" verificada/creada correctamente.
[DB] Datos semilla insertados exitosamente.
===================================================
  MARKETPLACE - Backend (Capa de Logica de Negocio)
===================================================
  Servidor Express corriendo en: http://localhost:3001
  Endpoint principal:            http://localhost:3001/api/productos
  Health check:                  http://localhost:3001/health
===================================================
```

**Verifica el backend (en otra terminal o en el navegador):**
```bash
curl http://localhost:3001/api/productos
```

---

### PASO 2 — Frontend (Puerto 3000)

Abre UNA NUEVA terminal (deja el backend corriendo):

```bash
# 1. Entra a la carpeta del frontend
cd marketplace-poc/frontend

# 2. Instala las dependencias
npm install

# 3. Inicia el servidor de desarrollo
npm run dev
```

Deberas ver:
```
  VITE v5.x.x  ready in XXX ms
  ➜  Local:   http://localhost:3000/
```

---

### PASO 3 — Prueba la PoC

1. Abre tu navegador en **http://localhost:3000**
2. Haz clic en el boton **"Ver Productos Disponibles"**
3. Observa como:
   - El diagrama de arquitectura se anima (Backend + BD se activan)
   - Aparece el estado "Consultando base de datos..."
   - Se recibe el JSON y se renderiza en tarjetas

---

## Dependencias

### Backend
| Paquete          | Version | Funcion                                    |
|------------------|---------|--------------------------------------------|
| `express`        | ^4.18   | Framework HTTP (servidor de la API REST)   |
| `better-sqlite3` | ^9.4    | Driver/conector nativo para SQLite         |
| `cors`           | ^2.8    | Middleware para cabeceras CORS             |
| `nodemon`        | ^3.1    | Auto-reinicio en desarrollo (devDependency)|

### Frontend
| Paquete              | Version | Funcion                                |
|----------------------|---------|----------------------------------------|
| `react`              | ^18.3   | Libreria de UI para la Capa Presentacion|
| `react-dom`          | ^18.3   | Renderizado de React en el DOM         |
| `vite`               | ^5.4    | Bundler y servidor de desarrollo       |
| `@vitejs/plugin-react`| ^4.3   | Plugin para soporte de JSX/React       |

---

## Flujo de Datos (Arquitectura 3 Capas)

```
CAPA 1: PRESENTACION          CAPA 2: LOGICA DE NEGOCIO       CAPA 3: DATOS
   React (Puerto 3000)           Express (Puerto 3001)            SQLite (.db)
        |                               |                              |
        |  GET /api/productos            |                              |
        |------------------------------>|                              |
        |                               |  SELECT * FROM productos     |
        |                               |----------------------------->|
        |                               |                              |
        |                               |  [{id, nombre, precio...}]   |
        |                               |<-----------------------------|
        |  200 OK { success, data: [] } |                              |
        |<------------------------------|                              |
        |                               |                              |
  [Renderiza tarjetas]                  |                              |
```

---

## Notas para el Reporte Escolar

- **SQLite** fue elegido sobre MySQL/PostgreSQL porque no requiere
  instalar ni configurar un servidor de BD separado. El archivo `.db`
  se crea automaticamente al iniciar el backend.
- **CORS** es necesario porque el navegador bloquea peticiones entre
  origenes distintos (localhost:3000 → localhost:3001 son origenes diferentes).
- **El proxy de Vite** (`vite.config.js`) redirige `/api/*` al backend
  durante el desarrollo, simplificando la configuracion de CORS.
- **`better-sqlite3`** usa binding nativo (C++) para maxima eficiencia.
  En produccion real se usaria PostgreSQL o MySQL con un ORM como Prisma.
