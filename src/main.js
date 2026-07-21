import './styles/main.css';
import { initBackground, destroyBackground } from './components/background.js';
import { stopAllMusic } from './utils/music.js';
import { renderTitleScene, bindTitleScene } from './scenes/title.js';
import { renderVideosScene, bindVideosScene } from './scenes/videos.js';
import { renderQuizScene, bindQuizScene } from './scenes/quiz.js';
import { renderInvitationScene, bindInvitationScene } from './scenes/invitation.js';
import confetti from 'canvas-confetti';

const SCENES = {
  TITLE: 'title',
  VIDEOS: 'videos',
  QUIZ: 'quiz',
  INVITATION: 'invitation',
};

const state = {
  scene: SCENES.TITLE,
  gradeBand: '1-3',
};

let cleanupFn = null;
const app = document.getElementById('app');

function setScene(scene) {
  if (cleanupFn) {
    cleanupFn();
    cleanupFn = null;
  }
  state.scene = scene;
  render();
}

function render() {
  const bgHTML = '<div class="bg-watermark" id="bg-watermark" aria-hidden="true"></div>';
  let sceneHTML = '';

  switch (state.scene) {
    case SCENES.TITLE:
      sceneHTML = renderTitleScene({ gradeBand: state.gradeBand });
      break;
    case SCENES.VIDEOS:
      sceneHTML = renderVideosScene(state.gradeBand);
      break;
    case SCENES.QUIZ:
      sceneHTML = renderQuizScene();
      break;
    case SCENES.INVITATION:
      sceneHTML = renderInvitationScene();
      break;
    default:
      sceneHTML = renderTitleScene({ gradeBand: state.gradeBand });
  }

  app.innerHTML = bgHTML + sceneHTML;
  initBackground(document.getElementById('bg-watermark'));
  bindCurrentScene();
}

function bindCurrentScene() {
  const root = app.querySelector('.scene');
  if (!root) return;

  switch (state.scene) {
    case SCENES.TITLE:
      bindTitleScene(root, {
        gradeBand: state.gradeBand,
        setGradeBand: (g) => {
          state.gradeBand = g;
        },
        onStart: () => setScene(SCENES.VIDEOS),
      });
      break;

    case SCENES.VIDEOS:
      cleanupFn = bindVideosScene(root, {
        onNext: () => setScene(SCENES.QUIZ),
      });
      break;

    case SCENES.QUIZ:
      cleanupFn = bindQuizScene(root, {
        gradeBand: state.gradeBand,
        onComplete: () => {
          setScene(SCENES.INVITATION);
        },
      });
      break;

    case SCENES.INVITATION:
      cleanupFn = bindInvitationScene(root, {
        onRetry: () => setScene(SCENES.QUIZ),
        onHome: () => setScene(SCENES.TITLE),
      });
      fireConfetti();
      break;
  }
}

function fireConfetti() {
  const duration = 2800;
  const end = Date.now() + duration;
  const colors = ['#C41E3A', '#F5C518', '#1A2B5F', '#2E8B3C', '#F5F0E1'];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();

  setTimeout(() => {
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.55 },
      colors,
    });
  }, 300);
}

window.addEventListener('beforeunload', () => {
  destroyBackground();
  stopAllMusic();
});
render();
