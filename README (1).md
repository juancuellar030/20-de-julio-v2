# 20 de Julio — Slideshow de la Independencia de Colombia

Slideshow web fullscreen para proyección en salón de clase (iPad Pro landscape → Apple TV → proyector Epson). Construido en **HTML/CSS/JS puro, sin bundler**, para que un profesor pueda abrirlo o subirlo sin instalar nada.

## Cómo usarlo

**Opción A — abrir directamente:**
Haz doble clic en `index.html`. Funciona en cualquier navegador moderno. (Los videos de YouTube necesitan internet; el resto funciona sin conexión una vez cargado.)

**Opción B — servidor local simple (recomendado, evita restricciones de `file://` en algunos navegadores):**
```bash
cd 20-de-julio
python3 -m http.server 8000
# luego abre http://localhost:8000 en Safari/Chrome del iPad o de tu computador
```
No hay `npm install` ni paso de build — es intencional: menos piezas que puedan fallar el día del evento.

**Para GitHub Pages:** sube la carpeta tal cual y activa Pages en la rama principal; `index.html` en la raíz funciona sin configuración adicional.

## Estructura

```
20-de-julio/
├── index.html
├── css/styles.css
├── js/
│   ├── app.js          # navegación de escenas, lógica del quiz, timer
│   ├── sounds.js        # efectos de sonido correcto/incorrecto (sintetizados, sin archivos)
│   ├── confetti.js       # confeti final (canvas, sin dependencias)
│   └── data/quiz-data.js # preguntas exactas de los .md fuente
└── assets/
    ├── school-logo.png
    ├── Himno Nacional de la Republica de Colombia.mp3
    └── sounds/            # sin usar — ver nota abajo
```

## ⚠️ Assets pendientes / a verificar

- **`assets/school-logo.png`** — el código ya apunta aquí. Copia tu logo con exactamente ese nombre de archivo. Si el archivo no existe, el logo simplemente no se muestra (no rompe el layout).
- **`assets/Himno Nacional de la Republica de Colombia.mp3`** — el botón "Solo audio" del himno intenta reproducir este archivo local primero (nombre exacto, con espacios). Si falta o el navegador lo bloquea, cae automáticamente al modo YouTube como respaldo.
- **Efectos de sonido correcto/incorrecto** — **no son archivos**. En vez de bundlear MP3s de sonido (que no pude verificar que fueran libres de derechos), los generé con Web Audio API directamente en `js/sounds.js`. Esto es más confiable para un salón sin internet, pero si prefieres sonidos grabados reales, reemplaza `SFX.playCorrect()` / `SFX.playIncorrect()` por un `<audio>` apuntando a tus propios archivos en `assets/sounds/`.
- **Imágenes de fondo y de preguntas** — todas se cargan desde las URLs externas del `slideshow-content.md` (Unsplash, Pexels, etc). **Requieren internet** el día del evento. Si el salón puede quedarse sin red, descarga esas imágenes con anticipación y cámbialas a rutas locales en `js/data/quiz-data.js` y `index.html` (sección `.bg-slide`).

## Notas de comportamiento

- El profesor elige el grado (1°–3° o 4°–5°) justo después de la portada; esa elección determina el video de historia y el set de preguntas.
- Las preguntas y respuestas correctas están copiadas literalmente de `first-to-third-grade-quiz-questions.md` y `fourth-and-fifth-grade-quiz-questions.md` — no se inventó ni cambió ninguna opción.
- El timer por pregunta es de 18 segundos (ajustable en `state.timeTotal` dentro de `app.js`), con controles de pausa/saltar para el profesor.
- Los videos de YouTube se insertan solo al presionar "Ver video" (no autoplay oculto), para no gastar ancho de banda innecesariamente.
- Botón "Descargar videos" abre el enlace de WeTransfer en pestaña nueva, como respaldo si falla la red del salón.

## Checklist de aceptación (estado)

- [x] Portada → Videos → Quiz → Felicitaciones
- [x] Selección de grado cambia video de historia + set de preguntas
- [x] Himno soporta modo video y modo solo-audio
- [x] Botón de WeTransfer funciona
- [x] Fondos en crossfade continuo (cada 6s)
- [x] Paleta, transición espiral, y regla de encogimiento/escala en la revelación de respuestas
- [x] SFX correcto/incorrecto (sintetizados)
- [x] Confeti en escena final
- [x] Logo en esquina, presente en todas las escenas
- [x] Preguntas exactas de los dos .md
- [ ] **Pendiente de tu verificación:** que el logo y el MP3 realmente se vean/suenen bien en el iPad + proyector — pruébalo antes del evento.
