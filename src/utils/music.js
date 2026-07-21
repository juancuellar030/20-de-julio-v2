import { INVITATION_MUSIC, QUIZ_MUSIC } from '../data/config.js';
import { resumeAudio } from './sounds.js';

let bgMusic = null;
let currentTrack = null;
let invitationPreload = null;

function getBgMusic() {
  if (!bgMusic) {
    bgMusic = new Audio();
    bgMusic.preload = 'auto';
  }
  return bgMusic;
}

function preloadInvitationTrack() {
  if (!invitationPreload) {
    invitationPreload = new Audio(INVITATION_MUSIC);
    invitationPreload.preload = 'auto';
    invitationPreload.load();
  }
}

function playTrack(src, volume, loop = true) {
  const audio = getBgMusic();
  resumeAudio();

  const startPlayback = () => {
    audio.play().catch(() => {});
  };

  if (currentTrack === src) {
    audio.volume = volume;
    audio.loop = loop;
    if (audio.paused) startPlayback();
    return;
  }

  currentTrack = src;
  audio.pause();
  audio.src = src;
  audio.loop = loop;
  audio.volume = volume;

  if (audio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
    startPlayback();
  } else {
    audio.addEventListener('canplay', startPlayback, { once: true });
    audio.load();
  }
}

export function startQuizMusic() {
  playTrack(QUIZ_MUSIC, 0.18, true);
  preloadInvitationTrack();
}

export function stopQuizMusic() {
  if (!bgMusic) return;
  bgMusic.pause();
  bgMusic.currentTime = 0;
  if (currentTrack === QUIZ_MUSIC) currentTrack = null;
}

export function startInvitationMusic() {
  playTrack(INVITATION_MUSIC, 0.5, true);
}

export function ensureInvitationMusicPlaying() {
  if (!bgMusic || bgMusic.paused || currentTrack !== INVITATION_MUSIC) {
    startInvitationMusic();
  }
}

export function stopInvitationMusic() {
  if (!bgMusic) return;
  bgMusic.pause();
  bgMusic.currentTime = 0;
  if (currentTrack === INVITATION_MUSIC) currentTrack = null;
}

export function stopAllMusic() {
  if (!bgMusic) return;
  bgMusic.pause();
  bgMusic.currentTime = 0;
  currentTrack = null;
}
