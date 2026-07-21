import { SCHOOL_LOGO } from '../data/config.js';

export function schoolLogoHTML() {
  return `
    <img
      class="school-logo"
      src="${SCHOOL_LOGO}"
      alt="Logo del colegio"
      onerror="this.classList.add('school-logo--placeholder')"
    />
  `;
}
