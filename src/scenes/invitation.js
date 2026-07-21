import { INVITATION_CARD } from '../data/config.js';
import { schoolLogoHTML } from '../components/logo.js';
import { startInvitationMusic, stopInvitationMusic, ensureInvitationMusicPlaying } from '../utils/music.js';

export function renderInvitationScene() {
  return `
    <section class="scene scene--invitation" aria-label="Invitación a la celebración del 20 de julio">
      ${schoolLogoHTML()}
      <div class="invitation-scene">
        <div class="invitation-scene__card-wrap">
          <img
            class="invitation-scene__card"
            src="${INVITATION_CARD}"
            alt="Invitación: Izada de bandera el lunes 27 de julio — Día de la Independencia de Colombia"
          />
        </div>
        <div class="invitation-scene__actions">
          <button type="button" class="btn btn--primary" id="btn-invitation-retry">Reintentar quiz</button>
          <button type="button" class="btn btn--secondary" id="btn-invitation-home">Inicio</button>
        </div>
      </div>
    </section>
  `;
}

export function bindInvitationScene(root, { onRetry, onHome }) {
  startInvitationMusic();

  const unlockMusic = () => ensureInvitationMusicPlaying();
  root.addEventListener('pointerdown', unlockMusic);

  root.querySelector('#btn-invitation-retry').addEventListener('click', onRetry);
  root.querySelector('#btn-invitation-home').addEventListener('click', onHome);

  return () => {
    root.removeEventListener('pointerdown', unlockMusic);
    stopInvitationMusic();
  };
}
