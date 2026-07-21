import { BACKGROUND_IMAGES } from '../data/config.js';

let currentIndex = 0;
let container = null;
let intervalId = null;
let quizBgInterval = null;
let quizBgIndex = 0;

export function backgroundLayersHTML(layerClass = 'bg-layer', activeClass = 'bg-layer--active') {
  return BACKGROUND_IMAGES.map(
    (url, i) =>
      `<div class="${layerClass}${i === 0 ? ` ${activeClass}` : ''}" style="background-image:url('${url}')" aria-hidden="true"></div>`
  ).join('');
}

export function quizBackgroundHTML() {
  return `
    <div class="quiz-bg" aria-hidden="true">
      ${backgroundLayersHTML('quiz-bg__layer', 'quiz-bg__layer--active')}
    </div>
  `;
}

export function initBackground(containerEl) {
  destroyBackground();
  container = containerEl;
  container.innerHTML = backgroundLayersHTML();

  intervalId = setInterval(() => {
    const layers = container.querySelectorAll('.bg-layer');
    layers[currentIndex].classList.remove('bg-layer--active');
    currentIndex = (currentIndex + 1) % BACKGROUND_IMAGES.length;
    layers[currentIndex].classList.add('bg-layer--active');
  }, 5000);
}

export function initQuizBackground(root) {
  destroyQuizBackground();
  const layers = root.querySelectorAll('.quiz-bg__layer');
  if (!layers.length) return;

  quizBgIndex = 0;
  quizBgInterval = setInterval(() => {
    layers[quizBgIndex].classList.remove('quiz-bg__layer--active');
    quizBgIndex = (quizBgIndex + 1) % layers.length;
    layers[quizBgIndex].classList.add('quiz-bg__layer--active');
  }, 5000);
}

export function destroyBackground() {
  if (intervalId) clearInterval(intervalId);
  intervalId = null;
}

export function destroyQuizBackground() {
  if (quizBgInterval) clearInterval(quizBgInterval);
  quizBgInterval = null;
}
