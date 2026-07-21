# 20 de Julio — Presentación Interactiva

Presentación web a pantalla completa para conmemorar el **Día de la Independencia de Colombia (20 de julio)**, diseñada para proyección en salón de clases.

**Dispositivo objetivo:** iPad Pro en horizontal (4:3, 2732×2048) con AirPlay a proyector Epson.

## Inicio rápido

```bash
npm install
npm run dev
```

Abre la URL que muestra Vite (normalmente `http://localhost:5173`) en el iPad en modo horizontal.

### Producción / GitHub Pages

El sitio se publica en: `https://juancuellar030.github.io/20-de-julio-v2/`

1. En el repo de GitHub, ve a **Settings → Pages → Build and deployment**
2. En **Source**, elige **GitHub Actions** (no "Deploy from a branch" con la raíz del repo)
3. Haz push a `main` — el workflow `.github/workflows/deploy.yml` construye `dist/` y lo despliega automáticamente

Para probar el build localmente con la misma ruta base:

```bash
# PowerShell
$env:VITE_BASE_PATH="/20-de-julio-v2/"; npm run build; npm run preview
```

## Flujo de la presentación

1. **Inicio** — Título, selector de grado (1°–3° o 4°–5°), botón *Comenzar*
2. **Videos** — Himno Nacional (video o solo audio) + video de historia según grado + enlace de descarga WeTransfer
3. **Trivia** — 5 preguntas con animaciones (intro roja → transición en espiral → pregunta → revelación de respuesta)
4. **Felicitaciones** — Puntaje, confeti, opciones para reintentar, volver a videos o inicio

## Controles del docente

- **Videos:** *Ver video* / *Solo audio* para el himno; *Ir al trivia*
- **Quiz:** *Pausar* / *Continuar* el temporizador; *Saltar* a la siguiente pregunta
- **Final:** *Reintentar quiz*, *Volver a videos*, *Inicio*

## Assets locales pendientes

Coloca estos archivos en `public/assets/` antes de la clase:

| Archivo | Ruta | Estado |
|---------|------|--------|
| Logo del colegio | `public/assets/school-logo.png` | **Falta** — se muestra un marcador de posición hasta que lo agregues |
| Himno (solo audio) | `public/assets/Himno Nacional de la Republica de Colombia.mp3` | **Falta** — necesario para el modo *Solo audio* sin depender de YouTube |

### Sonidos del quiz

Los efectos de respuesta correcta/incorrecta se generan con la **Web Audio API** en el navegador (no requieren archivos externos). Si prefieres archivos MP3 propios, puedes añadirlos en `public/assets/sounds/` y adaptar `src/utils/sounds.js`.

## Contenido fuente

Las preguntas y URLs de medios provienen de:

- `slideshow-content.md`
- `first-to-third-grade-quiz-questions.md`
- `fourth-and-fifth-grade-quiz-questions.md`

## Requisitos de red

- Los embeds de **YouTube** requieren conexión a internet.
- Las imágenes de fondo y ayudas visuales se cargan desde URLs externas la primera vez.
- Si la red falla, usa el botón **Descargar videos** (WeTransfer) como respaldo.

## Tecnologías

- [Vite](https://vitejs.dev/) — bundler y servidor de desarrollo
- JavaScript vanilla (sin framework)
- [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) — efecto de confeti final

## Licencia

Contenido educativo para uso en el aula. Verifica los derechos de las imágenes y videos externos antes de redistribuir.
