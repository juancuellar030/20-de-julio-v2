import { QUIZ_TIMER_SECONDS } from '../data/config.js';
import { getQuizForGrade } from '../data/quizzes.js';
import { schoolLogoHTML } from '../components/logo.js';
import { quizBackgroundHTML, initQuizBackground, destroyQuizBackground } from '../components/background.js';
import { playCorrectSound, playIncorrectSound } from '../utils/sounds.js';
import { startQuizMusic, stopQuizMusic } from '../utils/music.js';
import { animateQuizSpiral, buildSpiralMarkup } from '../utils/spiralTransition.js';
import gsap from 'gsap';

const INTRO_DURATION_DEFAULT = 2200;
const REVEAL_DELAY = 1800;

const urlParams = new URLSearchParams(window.location.search);
const FREEZE_QUIZ_INTRO = urlParams.has('freezeIntro');
const INTRO_DURATION = FREEZE_QUIZ_INTRO
  ? null
  : Number(urlParams.get('introDuration')) || INTRO_DURATION_DEFAULT;

const CLOCK_TICKS = Array.from({ length: 12 }, (_, i) => `<span style="--tick:${i}"></span>`).join('');

export function renderQuizScene() {
  return `
    <section class="scene scene--quiz" aria-label="Trivia del 20 de julio">
      ${schoolLogoHTML()}
      <div class="quiz-container" id="quiz-container"></div>
      <div class="quiz-teacher-bar" aria-label="Controles del docente">
        <button type="button" class="btn btn--teacher" id="btn-quiz-pause" aria-label="Pausar temporizador">Pausar</button>
        <button type="button" class="btn btn--teacher" id="btn-quiz-skip" aria-label="Saltar a la siguiente pregunta">Saltar</button>
      </div>
    </section>
  `;
}

export function bindQuizScene(root, { gradeBand, onComplete }) {
  const quiz = getQuizForGrade(gradeBand);
  const container = root.querySelector('#quiz-container');
  const btnPause = root.querySelector('#btn-quiz-pause');
  const btnSkip = root.querySelector('#btn-quiz-skip');

  let questionIndex = 0;
  let score = 0;
  let timerId = null;
  let introTimeout = null;
  let revealTimeout = null;
  let spiralTween = null;
  let paused = false;
  let timeLeft = QUIZ_TIMER_SECONDS;
  let answered = false;
  let selectedLetter = null;

  let introAdvanceHandler = null;

  function clearTimers() {
    if (timerId) clearInterval(timerId);
    if (introTimeout) clearTimeout(introTimeout);
    if (revealTimeout) clearTimeout(revealTimeout);
    if (introAdvanceHandler) {
      window.removeEventListener('keydown', introAdvanceHandler);
      introAdvanceHandler = null;
    }
    spiralTween?.kill();
    timerId = introTimeout = revealTimeout = null;
    spiralTween = null;
  }

  function renderIntro(q) {
    const devHint = FREEZE_QUIZ_INTRO
      ? '<p class="quiz-intro__dev-hint">Modo edición — presiona Espacio para continuar</p>'
      : '';

    container.innerHTML = `
      <div class="quiz-intro" role="status" aria-live="polite">
        <div class="quiz-intro__clock" aria-hidden="true">${CLOCK_TICKS}</div>
        <div class="quiz-intro__triangles" aria-hidden="true">
          <span></span><span></span><span></span>
        </div>
        <p class="quiz-intro__label">PREGUNTA</p>
        <p class="quiz-intro__number"><span class="quiz-intro__number-text">N° ${q.id}</span></p>
        <p class="quiz-intro__brand">20 de Julio</p>
        ${devHint}
      </div>
    `;
  }

  function proceedToSpiral(q, onReady) {
    renderSpiral(q, onReady);
  }

  function renderSpiral(q, onDone) {
    container.innerHTML = `
      <div class="quiz-spiral-wrap">
        ${quizBackgroundHTML()}
        <div class="quiz-question quiz-question--hidden" id="quiz-question-pending">
          ${buildQuestionHTML(q)}
        </div>
        <div class="quiz-spiral" aria-hidden="true">
          ${buildSpiralMarkup()}
        </div>
      </div>
    `;

    initQuizBackground(container);

    const spiral = container.querySelector('.quiz-spiral');
    const pending = container.querySelector('#quiz-question-pending');

    spiralTween = animateQuizSpiral(spiral, () => {
      pending?.classList.remove('quiz-question--hidden');
      spiral?.remove();
      onDone();
    });
  }

  function buildQuestionHTML(q) {
    const hasImage = Boolean(q.image);
    const timerBarHTML = `
      <div class="quiz-timer-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100">
        <div class="quiz-timer-bar__fill" id="timer-fill"></div>
      </div>
    `;

    const imageBlock = hasImage
      ? `
        <figure class="quiz-question__figure">
          <img class="quiz-question__image" src="${q.image}" alt="Ayuda visual para la pregunta ${q.id}" />
          ${timerBarHTML}
        </figure>
      `
      : '';

    const optionsClasses = [
      'quiz-options',
      !hasImage ? 'quiz-options--grid' : '',
      q.imageOptions ? 'quiz-options--images' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const optionsHTML = q.options
      .map((opt, i) => {
        const imgPart =
          q.imageOptions && q.optionImages?.[opt.letter]
            ? `<img class="quiz-option__thumb" src="${q.optionImages[opt.letter]}" alt="" />`
            : '';
        return `
          <button
            type="button"
            class="quiz-option${!hasImage ? ' quiz-option--card' : ''}"
            data-letter="${opt.letter}"
            style="--opt-delay: ${i * 0.1}s"
            aria-label="Opción ${opt.letter}: ${opt.text}"
          >
            <span class="quiz-option__letter">${opt.letter}</span>
            <span class="quiz-option__body">
              ${imgPart}
              <span class="quiz-option__text">${opt.text}</span>
            </span>
          </button>
        `;
      })
      .join('');

    const bodyClass = hasImage ? 'quiz-question__body' : 'quiz-question__body quiz-question__body--no-image';
    const questionClass = hasImage ? 'quiz-question' : 'quiz-question quiz-question--no-image';

    return `
      <div class="${questionClass}" id="quiz-question-active">
        <header class="quiz-question__header">
          <h3 class="quiz-question__title">${q.question}</h3>
        </header>
        <div class="${bodyClass}">
          ${imageBlock}
          <div class="${optionsClasses}" role="group" aria-label="Opciones de respuesta">
            ${optionsHTML}
          </div>
          ${hasImage ? '' : `<div class="quiz-question__timer">${timerBarHTML}</div>`}
        </div>
      </div>
    `;
  }

  function startTimer() {
    timeLeft = QUIZ_TIMER_SECONDS;
    paused = false;
    btnPause.textContent = 'Pausar';
    updateTimerBar();

    timerId = setInterval(() => {
      if (paused || answered) return;
      timeLeft -= 0.1;
      if (timeLeft <= 0) {
        timeLeft = 0;
        updateTimerBar();
        clearInterval(timerId);
        timerId = null;
        if (!answered) revealAnswer(null);
        return;
      }
      updateTimerBar();
    }, 100);
  }

  function updateTimerBar() {
    const fill = container.querySelector('#timer-fill');
    const bar = container.querySelector('.quiz-timer-bar');
    const pct = (timeLeft / QUIZ_TIMER_SECONDS) * 100;
    if (fill) fill.style.width = `${pct}%`;
    if (bar) bar.setAttribute('aria-valuenow', String(Math.round(pct)));
  }

  function bindOptions(q) {
    container.querySelectorAll('.quiz-option').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (answered) return;
        selectedLetter = btn.dataset.letter;
        revealAnswer(selectedLetter);
      });
    });
  }

  function revealAnswer(letter) {
    if (answered) return;
    answered = true;
    clearInterval(timerId);
    timerId = null;

    const q = quiz[questionIndex];
    const isCorrect = letter === q.correct;
    if (letter !== null) {
      if (isCorrect) {
        score += 1;
        playCorrectSound();
      } else {
        playIncorrectSound();
      }
    }

    container.querySelectorAll('.quiz-option').forEach((btn) => {
      btn.disabled = true;
      const l = btn.dataset.letter;
      if (l === q.correct) {
        btn.classList.add('quiz-option--correct');
      } else if (l === letter) {
        btn.classList.add('quiz-option--wrong');
      } else {
        btn.classList.add('quiz-option--dimmed');
      }
    });

    const active = container.querySelector('#quiz-question-active');
    active?.classList.add('quiz-question--revealed');
    active?.classList.add(isCorrect ? 'quiz-question--answered-correct' : 'quiz-question--answered-wrong');

    const correctBtn = container.querySelector('.quiz-option--correct');
    if (isCorrect && correctBtn) {
      gsap.fromTo(
        correctBtn,
        { scale: 1 },
        { scale: 1.12, duration: 0.28, ease: 'back.out(2)', yoyo: true, repeat: 1 }
      );
    } else if (!isCorrect && letter) {
      const wrongBtn = container.querySelector('.quiz-option--wrong');
      if (wrongBtn) {
        gsap.fromTo(wrongBtn, { x: 0 }, { x: -8, duration: 0.08, yoyo: true, repeat: 3, ease: 'power1.inOut' });
      }
    }

    revealTimeout = setTimeout(() => {
      questionIndex += 1;
      if (questionIndex >= quiz.length) {
        onComplete(score, quiz.length);
      } else {
        runQuestion();
      }
    }, REVEAL_DELAY);
  }

  function runQuestion() {
    clearTimers();
    answered = false;
    selectedLetter = null;
    const q = quiz[questionIndex];

    renderIntro(q);

    const startSpiral = () => {
      proceedToSpiral(q, () => {
        bindOptions(q);
        startTimer();
      });
    };

    if (FREEZE_QUIZ_INTRO) {
      introAdvanceHandler = (event) => {
        if (event.code !== 'Space' && event.key !== ' ') return;
        event.preventDefault();
        window.removeEventListener('keydown', introAdvanceHandler);
        introAdvanceHandler = null;
        startSpiral();
      };
      window.addEventListener('keydown', introAdvanceHandler);
    } else {
      introTimeout = setTimeout(startSpiral, INTRO_DURATION);
    }
  }

  btnPause.addEventListener('click', () => {
    if (answered) return;
    paused = !paused;
    btnPause.textContent = paused ? 'Continuar' : 'Pausar';
  });

  btnSkip.addEventListener('click', () => {
    if (answered) return;
    revealAnswer(null);
  });

  runQuestion();
  startQuizMusic();

  return () => {
    clearTimers();
    destroyQuizBackground();
    stopQuizMusic();
  };
}
