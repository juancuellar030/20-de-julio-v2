import { VIDEOS, WETRANSFER_URL, ANTHEM_AUDIO } from '../data/config.js';
import { schoolLogoHTML } from '../components/logo.js';

export function renderVideosScene(gradeBand) {
  const historyUrl = VIDEOS.history[gradeBand];
  const gradeLabel = gradeBand === '4-5' ? '4° – 5°' : '1° – 3°';

  return `
    <section class="scene scene--videos" aria-label="Videos del 20 de julio">
      ${schoolLogoHTML()}
      <div class="scene__content videos-scene">
        <header class="videos-scene__header">
          <h2 class="videos-scene__title">Videos del 20 de Julio</h2>
          <p class="videos-scene__grade">Grado: ${gradeLabel}</p>
        </header>

        <div class="videos-grid">
          <article class="video-card" aria-labelledby="anthem-heading">
            <h3 id="anthem-heading" class="video-card__title">Himno Nacional</h3>
            <div class="video-card__frame" id="anthem-frame">
              <iframe
                id="anthem-iframe"
                class="video-card__iframe"
                src="${VIDEOS.anthem}?enablejsapi=1"
                title="Himno Nacional de Colombia"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
              <div class="audio-mode-panel" id="audio-mode-panel" hidden>
                <div class="audio-mode-panel__visual" aria-hidden="true">
                  <span class="audio-mode-panel__note">♪</span>
                  <span class="audio-mode-panel__note audio-mode-panel__note--2">♫</span>
                  <span class="audio-mode-panel__note audio-mode-panel__note--3">♪</span>
                </div>
                <p class="audio-mode-panel__label">Escuchando el Himno Nacional</p>
                <audio id="anthem-audio" src="${ANTHEM_AUDIO}" preload="auto"></audio>
              </div>
            </div>
            <div class="video-card__controls">
              <button type="button" class="btn btn--media" id="btn-anthem-video" aria-pressed="true">
                Ver video
              </button>
              <button type="button" class="btn btn--media" id="btn-anthem-audio" aria-pressed="false">
                Solo audio
              </button>
            </div>
          </article>

          <article class="video-card" aria-labelledby="history-heading">
            <h3 id="history-heading" class="video-card__title">Historia del 20 de Julio</h3>
            <div class="video-card__frame">
              <iframe
                class="video-card__iframe"
                src="${historyUrl}"
                title="Historia del 20 de julio"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </article>
        </div>

        <div class="videos-scene__actions">
          <a
            class="btn btn--download"
            href="${WETRANSFER_URL}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Descargar videos — se abre en una nueva pestaña"
          >
            Descargar videos
          </a>
          <button type="button" class="btn btn--primary btn--xl" id="btn-to-quiz">
            Ir al trivia
          </button>
        </div>
      </div>
    </section>
  `;
}

export function bindVideosScene(root, { onNext }) {
  const iframe = root.querySelector('#anthem-iframe');
  const audioPanel = root.querySelector('#audio-mode-panel');
  const audioEl = root.querySelector('#anthem-audio');
  const btnVideo = root.querySelector('#btn-anthem-video');
  const btnAudio = root.querySelector('#btn-anthem-audio');

  function setVideoMode() {
    btnVideo.classList.add('btn--media-active');
    btnAudio.classList.remove('btn--media-active');
    btnVideo.setAttribute('aria-pressed', 'true');
    btnAudio.setAttribute('aria-pressed', 'false');
    iframe.hidden = false;
    audioPanel.hidden = true;
    audioEl.pause();
    audioEl.currentTime = 0;
  }

  function setAudioMode() {
    btnAudio.classList.add('btn--media-active');
    btnVideo.classList.remove('btn--media-active');
    btnAudio.setAttribute('aria-pressed', 'true');
    btnVideo.setAttribute('aria-pressed', 'false');
    iframe.hidden = true;
    audioPanel.hidden = false;
    audioEl.play().catch(() => {});
  }

  btnVideo.addEventListener('click', setVideoMode);
  btnAudio.addEventListener('click', setAudioMode);
  root.querySelector('#btn-to-quiz').addEventListener('click', onNext);

  return () => {
    audioEl.pause();
  };
}
