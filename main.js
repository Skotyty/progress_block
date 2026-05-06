// @ts-check
import { createProgressController } from './progress.js';
import { MIN_VALUE, MAX_VALUE } from './constants.js';

const container = /** @type {HTMLElement} */ (document.getElementById('progressBlock'));
const restoreBtn = /** @type {HTMLButtonElement} */ (document.getElementById('restoreBtn'));
const controller = createProgressController(container, { restoreBtn });

const valueInput = /** @type {HTMLInputElement} */ (document.getElementById('valueInput'));
const animateToggle = /** @type {HTMLInputElement} */ (document.getElementById('animateToggle'));
const hideToggle = /** @type {HTMLInputElement} */ (document.getElementById('hideToggle'));

container.addEventListener('progress:statechange', (e) => {
  const { value, isHidden, isAnimating } = /** @type {CustomEvent} */ (e).detail;
  valueInput.value = String(value);
  hideToggle.checked = isHidden;
  animateToggle.checked = isAnimating;
});

valueInput.addEventListener('input', () => {
  const raw = valueInput.value.replace(/\D/g, '');
  const val = Math.max(MIN_VALUE, Math.min(MAX_VALUE, parseInt(raw || '0', 10)));
  controller.set(val);
});

valueInput.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey) return;
  const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab', 'Home', 'End'];
  if ((e.key >= '0' && e.key <= '9') || allowed.includes(e.key)) return;
  e.preventDefault();
});

animateToggle.addEventListener('change', () => {
  animateToggle.checked ? controller.enableAnimation() : controller.disableAnimation();
});

hideToggle.addEventListener('change', () => {
  hideToggle.checked ? controller.hide() : controller.show();
});

restoreBtn.addEventListener('click', () => controller.show());

controller.set(parseInt(valueInput.value, 10) || 0);

// @ts-ignore
window.progressBlockAPI = controller;
