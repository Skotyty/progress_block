import { createProgressController } from './progress/progress.js';
import { MIN_VALUE, MAX_VALUE, RESTORE_BTN_OFFSET } from './constants.js';

const container = document.getElementById('progressBlock');
const controller = createProgressController(container);

const valueInput = container.querySelector('#valueInput');
const animateToggle = container.querySelector('#animateToggle');
const hideToggle = container.querySelector('#hideToggle');
const restoreBtn = document.getElementById('restoreBtn');

/**
 * Обработка ввода значения: фильтрация, ограничение, установка прогресса
 * @param {InputEvent} e
 */
valueInput.addEventListener('input', (e) => {
  const raw = valueInput.value.replace(/\D/g, '');
  const val = Math.max(MIN_VALUE, Math.min(MAX_VALUE, parseInt(raw || '0')));
  valueInput.value = val;
  controller.set(val);
});

/**
 * Блокировка ввода любых символов, кроме цифр и клавиш навигации
 * @param {KeyboardEvent} e
 */
valueInput.addEventListener('keydown', (e) => {
  const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
  if ((e.key >= '0' && e.key <= '9') || allowed.includes(e.key)) return;
  e.preventDefault();
});

/**
 * Включение/отключение анимации по переключателю
 * @param {Event} e
 */
animateToggle.addEventListener('change', (e) => {
  animateToggle.checked ? controller.enableAnimation() : controller.disableAnimation();
});

/**
 * Скрытие/показ блока по переключателю
 * @param {Event} e
 */
hideToggle.addEventListener('change', (e) => {
  hideToggle.checked ? controller.hide() : controller.show();
});

/**
 * Клик по кнопке-глазу — показать блок
 */
restoreBtn.addEventListener('click', () => controller.show());

/**
 * При изменении размера окна — пересчитать позицию restore-кнопки
 */
window.addEventListener('resize', () => {
  if (!restoreBtn.hidden) {
    const rect = container.getBoundingClientRect();
    restoreBtn.style.left = rect.left + RESTORE_BTN_OFFSET + 'px';
    restoreBtn.style.top = rect.top + RESTORE_BTN_OFFSET + 'px';
  }
});

/**
 * Устанавливаем начальное значение прогресса из input
 */
controller.set(parseInt(valueInput.value, 10) || 0);

/**
 * Экспортируем API в глобальную область (для отладки или использования другими модулями)
 */
window.progressBlockAPI = controller;
