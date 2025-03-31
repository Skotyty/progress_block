import {
  MIN_VALUE,
  MAX_VALUE,
  RADIUS,
  STROKE_COLOR,
  RESTORE_BTN_OFFSET
} from '../constants.js';

/**
 * Создаёт контроллер для управления компонентом прогресса.
 * @param {HTMLElement} container - Корневой элемент прогресс-блока.
 * @returns {Object} API управления состоянием прогресс-блока.
 */
export function createProgressController(container) {
  const valueInput = container.querySelector('#valueInput');
  const animateToggle = container.querySelector('#animateToggle');
  const hideToggle = container.querySelector('#hideToggle');
  const fgCircle = container.querySelector('circle.fg');
  const restoreBtn = document.getElementById('restoreBtn');
  const progressBlock = container;

  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  /**
   * Ограничивает значение в пределах допустимого диапазона.
   * @param {string|number} value - Введённое значение.
   * @returns {number} Корректное значение.
   */
  function normalize(value) {
    return Math.max(MIN_VALUE, Math.min(MAX_VALUE, parseInt(value) || MIN_VALUE));
  }

  /**
   * Устанавливает визуальное значение прогресса.
   * @param {number} value - Значение от 0 до 100.
   */
  function setProgress(value) {
    value = normalize(value);
    valueInput.value = value;

    if (value <= MIN_VALUE) {
      fgCircle.style.display = 'none';
      fgCircle.removeAttribute('stroke');
      fgCircle.removeAttribute('stroke-dasharray');
      fgCircle.removeAttribute('stroke-dashoffset');
      fgCircle.classList.remove('animated');
    } else {
      const offset = CIRCUMFERENCE * (1 - value / MAX_VALUE);
      fgCircle.style.display = 'inline';
      fgCircle.setAttribute('stroke', STROKE_COLOR);
      fgCircle.setAttribute('stroke-dasharray', CIRCUMFERENCE);
      fgCircle.setAttribute('stroke-dashoffset', offset);
    }

    if (value === MIN_VALUE || value === MAX_VALUE) {
      animateToggle.checked = false;
      fgCircle.classList.remove('animated');
    }
  }

  /**
   * Обновляет позицию кнопки восстановления (глаза).
   */
  function positionRestoreBtn() {
    const rect = progressBlock.getBoundingClientRect();
    restoreBtn.style.left = rect.left + RESTORE_BTN_OFFSET + 'px';
    restoreBtn.style.top = rect.top + RESTORE_BTN_OFFSET + 'px';
  }

  /**
   * API управления состоянием прогресс-блока.
   */
  return {
    /**
     * Устанавливает значение прогресса.
     * @param {number} value
     */
    set: setProgress,

    /** Скрывает блок */
    hide() {
      hideToggle.checked = true;
      progressBlock.style.opacity = '0';
      progressBlock.style.pointerEvents = 'none';
      restoreBtn.hidden = false;
      positionRestoreBtn();
    },

    /** Показывает блок */
    show() {
      hideToggle.checked = false;
      progressBlock.style.opacity = '1';
      progressBlock.style.pointerEvents = 'auto';
      restoreBtn.hidden = true;
    },

    /** Включает анимацию */
    enableAnimation() {
      animateToggle.checked = true;
      fgCircle.classList.add('animated');
    },

    /** Выключает анимацию */
    disableAnimation() {
      animateToggle.checked = false;
      fgCircle.classList.remove('animated');
    },

    /**
     * Возвращает текущее состояние блока.
     * @returns {{ value: number, isHidden: boolean, isAnimating: boolean }}
     */
    getState() {
      return {
        value: normalize(valueInput.value),
        isHidden: hideToggle.checked,
        isAnimating: animateToggle.checked
      };
    }
  };
}
