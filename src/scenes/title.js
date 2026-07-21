import { schoolLogoHTML } from '../components/logo.js';
import { resumeAudio } from '../utils/sounds.js';

export function renderTitleScene({ gradeBand, onStart }) {
  return `
    <section class="scene scene--title" aria-label="Pantalla de inicio">
      ${schoolLogoHTML()}
      <div class="scene__content title-scene">
        <div class="title-scene__decor title-scene__decor--circle" aria-hidden="true"></div>
        <div class="title-scene__decor title-scene__decor--diamond" aria-hidden="true"></div>
        <div class="title-scene__decor title-scene__decor--burst" aria-hidden="true"></div>

        <header class="title-scene__header">
          <p class="title-scene__eyebrow">Día de la Independencia</p>
          <h1 class="title-scene__title">20 de Julio</h1>
          <p class="title-scene__subtitle">Independencia de Colombia</p>
        </header>

        <div class="grade-picker" role="group" aria-label="Seleccionar grado">
          <p class="grade-picker__label">Selecciona el grado</p>
          <div class="grade-picker__buttons">
            <button
              type="button"
              class="btn btn--grade ${gradeBand === '1-3' ? 'btn--grade-active' : ''}"
              data-grade="1-3"
              aria-pressed="${gradeBand === '1-3'}"
            >
              <span class="btn--grade__num">1° – 3°</span>
              <span class="btn--grade__hint">Primero a tercero</span>
            </button>
            <button
              type="button"
              class="btn btn--grade ${gradeBand === '4-5' ? 'btn--grade-active' : ''}"
              data-grade="4-5"
              aria-pressed="${gradeBand === '4-5'}"
            >
              <span class="btn--grade__num">4° – 5°</span>
              <span class="btn--grade__hint">Cuarto y quinto</span>
            </button>
          </div>
        </div>

        <button type="button" class="btn btn--primary btn--xl title-scene__cta" id="btn-start">
          Comenzar
        </button>
      </div>
    </section>
  `;
}

export function bindTitleScene(root, { gradeBand, setGradeBand, onStart }) {
  root.querySelectorAll('[data-grade]').forEach((btn) => {
    btn.addEventListener('click', () => {
      resumeAudio();
      setGradeBand(btn.dataset.grade);
      root.querySelectorAll('[data-grade]').forEach((b) => {
        const active = b.dataset.grade === btn.dataset.grade;
        b.classList.toggle('btn--grade-active', active);
        b.setAttribute('aria-pressed', String(active));
      });
    });
  });

  root.querySelector('#btn-start').addEventListener('click', () => {
    resumeAudio();
    const active = root.querySelector('.btn--grade-active');
    if (active) setGradeBand(active.dataset.grade);
    onStart();
  });
}
