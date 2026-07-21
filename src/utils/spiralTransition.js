import gsap from 'gsap';

export const SPIRAL_DURATION_MS = 1600;

function buildArchimedeanSpiralPath(cx, cy, turns, stepDeg = 1.25) {
  const totalSteps = Math.ceil((turns * 360) / stepDeg);
  let d = '';

  for (let i = 0; i <= totalSteps; i += 1) {
    const angle = (i * stepDeg * Math.PI) / 180 - Math.PI / 2;
    const r = (i / totalSteps) * 92;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    d += i === 0 ? `M ${x.toFixed(2)} ${y.toFixed(2)}` : ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
  }

  return d;
}

export function buildSpiralMarkup() {
  const path = buildArchimedeanSpiralPath(100, 100, 3.25);

  return `
    <svg viewBox="0 0 200 200" class="quiz-spiral__svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <path class="quiz-spiral__path" d="${path}" />
    </svg>
  `;
}

export function animateQuizSpiral(spiralEl, onComplete) {
  const svg = spiralEl.querySelector('.quiz-spiral__svg');
  const path = spiralEl.querySelector('.quiz-spiral__path');

  if (!svg || !path) {
    onComplete?.();
    return null;
  }

  const length = path.getTotalLength();

  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length,
  });
  gsap.set(svg, {
    scale: 0.04,
    rotation: 0,
    transformOrigin: '50% 50%',
  });
  gsap.set(spiralEl, { opacity: 1 });

  const tl = gsap.timeline({
    onComplete: () => onComplete?.(),
  });

  tl.to(
    path,
    {
      strokeDashoffset: 0,
      duration: 1.35,
      ease: 'power2.inOut',
    },
    0
  )
    .to(
      svg,
      {
        scale: 6,
        rotation: 630,
        duration: 1.35,
        ease: 'power3.inOut',
      },
      0
    )
    .to(
      spiralEl,
      {
        opacity: 0,
        duration: 0.28,
        ease: 'power1.in',
      },
      1.12
    );

  return tl;
}
