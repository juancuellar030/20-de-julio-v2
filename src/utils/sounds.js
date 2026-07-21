let audioCtx = null;

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function playTone({ freq, duration = 0.15, type = 'sine', gain = 0.25, ramp = 0.02 }) {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  g.gain.setValueAtTime(0, ctx.currentTime);
  g.gain.linearRampToValueAtTime(gain, ctx.currentTime + ramp);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration + 0.05);
}

export function playCorrectSound() {
  const ctx = getCtx();
  if (ctx.state === 'suspended') ctx.resume();
  playTone({ freq: 523.25, duration: 0.12, type: 'triangle', gain: 0.2 });
  setTimeout(() => playTone({ freq: 659.25, duration: 0.15, type: 'triangle', gain: 0.22 }), 90);
  setTimeout(() => playTone({ freq: 783.99, duration: 0.2, type: 'triangle', gain: 0.24 }), 180);
}

export function playIncorrectSound() {
  const ctx = getCtx();
  if (ctx.state === 'suspended') ctx.resume();
  playTone({ freq: 220, duration: 0.25, type: 'sawtooth', gain: 0.12 });
  setTimeout(() => playTone({ freq: 185, duration: 0.3, type: 'sawtooth', gain: 0.1 }), 120);
}

export function resumeAudio() {
  const ctx = getCtx();
  if (ctx.state === 'suspended') ctx.resume();
}
