import { schoolLogoHTML } from '../components/logo.js';

export function renderCongratsScene({ score, total }) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  let message = '¡Buen intento! Sigue aprendiendo sobre el 20 de julio.';
  if (pct === 100) message = '¡Perfecto! Eres un experto en el 20 de julio.';
  else if (pct >= 80) message = '¡Excelente trabajo! Conoces muy bien la historia.';
  else if (pct >= 60) message = '¡Muy bien! Vas por buen camino.';

  return `
    <section class="scene scene--congrats" aria-label="Felicitaciones">
      ${schoolLogoHTML()}
      <div class="scene__content congrats-scene">
        <div class="congrats-scene__decor congrats-scene__decor--left" aria-hidden="true"></div>
        <div class="congrats-scene__decor congrats-scene__decor--right" aria-hidden="true"></div>

        <h2 class="congrats-scene__title">¡Felicitaciones!</h2>
        <p class="congrats-scene__score" aria-live="polite">
          Obtuviste <strong>${score}</strong> de <strong>${total}</strong>
        </p>
        <p class="congrats-scene__message">${message}</p>
        <p class="congrats-scene__tagline">¡Viva Colombia! 🇨🇴</p>

        <div class="congrats-scene__actions">
          <button type="button" class="btn btn--primary" id="btn-retry">Reintentar quiz</button>
          <button type="button" class="btn btn--secondary" id="btn-videos">Volver a videos</button>
          <button type="button" class="btn btn--secondary" id="btn-home">Inicio</button>
        </div>
      </div>
    </section>
  `;
}

export function bindCongratsScene(root, { onRetry, onVideos, onHome }) {
  root.querySelector('#btn-retry').addEventListener('click', onRetry);
  root.querySelector('#btn-videos').addEventListener('click', onVideos);
  root.querySelector('#btn-home').addEventListener('click', onHome);
}
