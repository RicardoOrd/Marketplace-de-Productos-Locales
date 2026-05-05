/* =============================================================
   CAPA DE PRESENTACION - Estilos Globales (index.css)
   
   Paleta: Tierra / Mercado artesanal
   Fuentes: Fraunces (display serif) + DM Sans (body sans-serif)
   ============================================================= */

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --color-bg:         #faf7f2;
  --color-surface:    #ffffff;
  --color-border:     #e8e0d5;
  --color-accent:     #c4622d;
  --color-accent-2:   #4a7c59;
  --color-text:       #2c2416;
  --color-text-muted: #7a6e61;
  --color-frontend:   #3b5998;
  --color-backend:    #c4622d;
  --color-datos:      #4a7c59;

  --font-display: 'Fraunces', Georgia, serif;
  --font-body:    'DM Sans', system-ui, sans-serif;
  --radius:       10px;
  --shadow:       0 2px 16px rgba(44, 36, 22, 0.08);
  --transition:   all 0.25s ease;
}

body {
  font-family: var(--font-body);
  background-color: var(--color-bg);
  color: var(--color-text);
  min-height: 100vh;
  line-height: 1.6;
}

/* ============ APP LAYOUT ============ */

.app-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1.5rem 4rem;
}

/* ============ HEADER ============ */

.app-header {
  text-align: center;
  padding: 3.5rem 0 2rem;
}

.header-badge {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent);
  background: rgba(196, 98, 45, 0.1);
  border: 1px solid rgba(196, 98, 45, 0.25);
  border-radius: 50px;
  padding: 0.3em 1em;
  margin-bottom: 1.2rem;
}

.app-titulo {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 6vw, 3.4rem);
  font-weight: 600;
  line-height: 1.1;
  color: var(--color-text);
  letter-spacing: -0.02em;
}

.app-titulo em {
  font-style: italic;
  color: var(--color-accent);
}

.app-subtitulo {
  margin-top: 0.8rem;
  color: var(--color-text-muted);
  font-size: 1.05rem;
}

/* ============ DIAGRAMA DE ARQUITECTURA ============ */

.arquitectura-banner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 1.25rem 2rem;
  margin: 1.5rem 0 2rem;
  box-shadow: var(--shadow);
  flex-wrap: wrap;
  gap: 0.5rem;
}

.capa {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: 2px solid var(--color-border);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-text-muted);
  transition: var(--transition);
  min-width: 140px;
  text-align: center;
}

.capa-icono { font-size: 1.4rem; }

.capa small {
  font-size: 0.7rem;
  font-weight: 400;
  opacity: 0.8;
  font-family: monospace;
}

.capa.activa { color: var(--color-text); border-color: currentColor; }
.capa-frontend.activa { border-color: var(--color-frontend); color: var(--color-frontend); background: rgba(59,89,152,0.05); }
.capa-backend.activa  { border-color: var(--color-backend);  color: var(--color-backend);  background: rgba(196,98,45,0.05); }
.capa-datos.activa    { border-color: var(--color-datos);    color: var(--color-datos);    background: rgba(74,124,89,0.05); }

.pulsando { animation: pulsar 1s ease-in-out infinite alternate; }

@keyframes pulsar {
  from { opacity: 0.6; transform: scale(0.98); }
  to   { opacity: 1;   transform: scale(1); }
}

.capa-flecha {
  font-size: 1.5rem;
  color: var(--color-border);
  flex-shrink: 0;
  margin: 0 0.25rem;
}

/* ============ SECCION PRINCIPAL ============ */

.app-main { display: flex; flex-direction: column; gap: 2rem; }

.accion-container {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 2rem;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
}

.accion-descripcion {
  color: var(--color-text-muted);
  max-width: 520px;
  line-height: 1.7;
}

.accion-descripcion code {
  font-family: monospace;
  background: rgba(196,98,45,0.1);
  color: var(--color-accent);
  padding: 0.1em 0.4em;
  border-radius: 4px;
  font-size: 0.9em;
}

/* ============ BOTON PRINCIPAL ============ */

.btn-principal {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  background: var(--color-accent);
  border: none;
  border-radius: 50px;
  padding: 0.85rem 2.2rem;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: 0 4px 14px rgba(196, 98, 45, 0.35);
}

.btn-principal:hover:not(:disabled) {
  background: #a8521f;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(196, 98, 45, 0.4);
}

.btn-principal:active:not(:disabled) { transform: translateY(0); }

.btn-principal:disabled {
  opacity: 0.8;
  cursor: not-allowed;
  transform: none;
}

/* ============ SPINNER ============ */

.spinner {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2.5px solid rgba(255,255,255,0.35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: girar 0.7s linear infinite;
}

@keyframes girar { to { transform: rotate(360deg); } }

/* ============ ESTADOS ============ */

.estado-error {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: #fef2f0;
  border: 1px solid #f5c4bb;
  border-left: 4px solid #e55a3a;
  border-radius: var(--radius);
  padding: 1.25rem 1.5rem;
  color: #8b2a15;
}

.estado-error svg { flex-shrink: 0; margin-top: 2px; }
.estado-error strong { display: block; margin-bottom: 0.25rem; }
.estado-error p { font-size: 0.9rem; }

.estado-vacio {
  text-align: center;
  color: var(--color-text-muted);
  padding: 2rem;
  border: 2px dashed var(--color-border);
  border-radius: var(--radius);
}

/* ============ RESULTADOS ============ */

.resultados-container { display: flex; flex-direction: column; gap: 1.5rem; }

.resultados-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.resultados-header h2 {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 600;
}

.badge-total {
  font-size: 0.8rem;
  font-weight: 500;
  background: rgba(74,124,89,0.12);
  color: var(--color-accent-2);
  border: 1px solid rgba(74,124,89,0.3);
  border-radius: 50px;
  padding: 0.25em 0.9em;
}

/* JSON Raw viewer */
.json-raw {
  background: #1e1b18;
  border-radius: var(--radius);
  overflow: hidden;
}

.json-raw summary {
  padding: 0.75rem 1.25rem;
  color: #a09080;
  cursor: pointer;
  font-size: 0.85rem;
  font-family: monospace;
  user-select: none;
}

.json-raw summary:hover { color: #d0c0b0; }

.json-raw pre {
  padding: 1rem 1.5rem 1.5rem;
  color: #a8d8a8;
  font-family: 'Fira Code', 'Cascadia Code', monospace;
  font-size: 0.82rem;
  line-height: 1.7;
  overflow-x: auto;
  max-height: 320px;
}

/* ============ GRID DE PRODUCTOS ============ */

.grid-titulo {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 600;
}

.productos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.25rem;
}

/* ============ TARJETA DE PRODUCTO ============ */

.producto-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  box-shadow: var(--shadow);
  transition: var(--transition);
}

.producto-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(44,36,22,0.12);
  border-color: var(--color-accent);
}

.producto-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.producto-id {
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--color-text-muted);
  font-family: monospace;
}

.producto-precio {
  font-weight: 600;
  color: var(--color-accent-2);
  font-size: 1rem;
}

.producto-precio small {
  font-weight: 400;
  font-size: 0.72rem;
  color: var(--color-text-muted);
}

.producto-nombre {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--color-text);
}

.producto-descripcion {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  line-height: 1.55;
  flex: 1;
}

.producto-footer {
  padding-top: 0.5rem;
  border-top: 1px solid var(--color-border);
  margin-top: 0.25rem;
}

.productor-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.78rem;
  color: var(--color-text-muted);
  font-weight: 500;
}

/* ============ FOOTER ============ */

.app-footer {
  text-align: center;
  padding-top: 3rem;
  color: var(--color-text-muted);
  font-size: 0.82rem;
}

/* ============ RESPONSIVE ============ */

@media (max-width: 600px) {
  .arquitectura-banner { flex-direction: column; }
  .capa-flecha { transform: rotate(90deg); }
  .accion-container { padding: 1.5rem; }
  .productos-grid { grid-template-columns: 1fr; }
}
