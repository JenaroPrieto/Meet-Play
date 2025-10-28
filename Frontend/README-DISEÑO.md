# Meet & Play – Guía de Diseño (Design System)

Este documento define la identidad visual y los estándares GUI de **Meet & Play** para mantener consistencia en todo el producto.

---

## 1) Identidad

- **Logo:** pin azul con balón (versión SVG preferida; si no, PNG/JPG). Mantener margen de aire mínimo = altura del balón alrededor.
- **Fondo:** césped (`/public/Background_Pasto.webp` con fallback `.jpg`). Uso fijo, centrado y con overlay oscuro para contraste.
- **Tono:** deportivo, cercano y confiable. Minimalista, con foco en acción.

---

## 2) Paleta de color (roles)

| Token           | HEX      | Uso principal                             |
|----------------|----------|-------------------------------------------|
| `--primary`    | #3B82F6  | Acciones principales, enlaces activos     |
| `--primary-hover` | #2563EB | Hover de acciones                         |
| `--surface`    | rgba(15,23,42,.85) | Cards, modales, paneles sobre el pasto |
| `--text`       | #FFFFFF  | Texto sobre superficies oscuras           |
| `--text-muted` | #E6EBF5  | Texto secundario                          |
| `--border`     | rgba(255,255,255,.18) | Bordes sutiles                    |
| `--success`    | #22C55E  | Éxitos                                    |
| `--danger`     | #EF4444  | Errores                                   |
| `--warning`    | #F59E0B  | Advertencias                              |

> **Regla:** No usar colores “crudos”; siempre a través de tokens.

---

## 3) Tipografía

- **Primaria:** Inter / Roboto / sistema sans-serif.
- **Tamaños base:** 16px (desktop). Escala: 12, 14, **16**, 18, 20, 24, 32.
- **Jerarquía:**
  - H1: 32–40px (landing)
  - H2: 24–28px (títulos de tarjetas/páginas)
  - Body: 16px
  - Nota/Hints: 14px
- **Peso:** 700 para títulos/botones; 400–500 para párrafos.

---

## 4) Layout y espaciado

- **Grid:** contenedor `max-width: 1200px` con padding lateral 16px.
- **Baseline:** múltiplos de 8px (`--space-2=8px`, `--space-4=16px`, etc.).
- **Radius:** `--radius=16px` (tarjetas), `--radius-sm=10px` (inputs/badges).
- **Sombras:** `--shadow-1` para lista; `--shadow-2` para hover/énfasis.

---

## 5) Componentes (estándares GUI)

### 5.1 Navbar
- Izquierda: logo + “Meet & Play”.
- Derecha: enlaces “Partidos”, “Crear”, login/usuario.
- Estados:
  - **Activo:** pill con fondo `primary` 22% + subrayado interno.
  - **Focus:** `outline` visible (no quitar).
- Altura fija: `--nav-h=72px`.

### 5.2 Botones
- Variantes: `btn-primary` (acción principal), `btn-secondary` (acción secundaria), `btn-ghost` (acciones de poco peso), `btn-danger` (peligro).
- Tamaños: `btn--sm`, `btn--md` (default), `btn--lg`.
- Estados: `hover` eleva 1–2px; `disabled` reduce opacidad; `focus-visible` con anillo.

### 5.3 Formularios
- Bloque `.field` con:
  - `.field__label` (obligatorio),
  - `.field__hint` (opcional),
  - `.field__error` (cuando aplique).
- Inputs y selects con misma altura, borde sin outline propio; focus mediante `outline` global.
- Validaciones:
  - Error: rojo (`--danger`) con texto claro.
  - Success: opcional, verde (`--success`) para confirmaciones.

### 5.4 Tarjetas (Card)
- Fondo `--surface`, borde `--border`, radio `--radius`, sombra `--shadow-1`.
- Padding interno 24–36px.
- No saturar: máximo 2–3 acciones primarias por card.

### 5.5 Listado de Partidos
- **Título** (`.match-title`) + **metadatos** (`.match-meta`).
- Usar **badges** para: estado (abierto/cerrado), distancia, deporte.
- Botón “Unirse” deshabilitado en `cerrado` o si el usuario ya participa.

### 5.6 Alertas
- `alert alert--success` / `alert alert--error` para feedback global.
- Se ubican debajo del título o sobre el listado.

---

## 6) Iconografía
- Estilo de trazo simple, consistente (24px base). Preferir **SVG inline**.
- Conjunto sugerido: calendario, ubicación, usuario, balón, cerrar.
- Evitar íconos con relleno pesado en superficies oscuras.

---

## 7) Accesibilidad (WCAG 2.1 AA)

- Contraste mínimo 4.5:1 en texto normal (cumplido por tokens).
- `:focus-visible` siempre presente y **no** eliminado.
- Áreas táctiles ≥ 44×44 px.
- Etiquetas para inputs (`label for` + `id`) y `aria-live` si hay toasts.
- No depender del color para transmitir estado (usar texto/ícono).

---

## 8) Movimiento

- Duraciones: 150–250ms.
- Easing: `cubic-bezier(.2,.8,.2,1)` (natural).
- Usar elevación + leve `translateY` para hover de cards/botones.
- Respetar `prefers-reduced-motion: reduce`.

---

## 9) Assets

- **Fondo:** `/public/Background_Pasto.webp` (≤120 KB). Fallback `.jpg`.
- **Logo:** `/public/Logo_M&P.svg` (si es posible). Mín. 24px, máx. 40px en navbar.
- Nombrar archivos con PascalCase y sin espacios.

---

## 10) Código y estructura

- Todos los colores a través de **tokens** (ver `:root`).
- Nomenclatura simple `bloque--modificador` (ej: `btn btn--lg`, `badge badge--warn`).
- Evitar estilos inline en componentes; usar clases del sistema.
- No usar librerías de UI distintas sin documentarlo aquí.
- Ficheros:
  - `src/index.css` → base + componentes comunes
  - `public/` → imágenes (fondo, logo)
  - (opcional) `src/styles/tokens.css` si se escalan los temas

---

## 11) Ejemplos de pantallas

- Landing con **CTA primaria** (azul) y secundaria (transparente).
- Lista de partidos con badges y botón “Unirse”.
- Formulario “Crear Partido” con `field__label` + `field__hint`.

---

## 12) Checklist antes de merge

- [ ] ¿Se usaron tokens en vez de hex directos?
- [ ] ¿Los botones siguen variantes definidas?
- [ ] ¿Inputs tienen label y focus accesible?
- [ ] ¿Contraste validado (≥4.5:1)?
- [ ] ¿Sin estilos inline? ¿Clases reutilizables?
