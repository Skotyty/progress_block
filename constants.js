export const MIN_VALUE = 0;
export const MAX_VALUE = 100;

// Радиус окружности прогресса 
export const RADIUS = 50;

// Цвет обводки прогресса
export const STROKE_COLOR = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-accent')
  .trim();

// Смещение для позиционирования кнопки "глаз"
export const RESTORE_BTN_OFFSET = parseInt(
  getComputedStyle(document.documentElement)
    .getPropertyValue('--progress-title-offset')
);
