// =============================================================
// CAPA DE PRESENTACION (Presentation Layer)
// Archivo: src/main.jsx (Punto de Entrada del Frontend)
//
// FUNCION ARQUITECTONICA:
// Este archivo inicializa el motor de React y lo conecta al
// nodo DOM raiz definido en index.html.
// Equivale al app.listen() del backend: es el arranque.
// =============================================================

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// React.StrictMode envuelve la app para detectar problemas
// potenciales durante el desarrollo (doble render, APIs obsoletas).
// No afecta al comportamiento en produccion.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
