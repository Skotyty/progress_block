// @ts-check
import {
  MIN_VALUE,
  MAX_VALUE,
  RADIUS
} from './constants.js';

/**
 * @typedef {{
 *   set: function(number): void,
 *   hide: function(): void,
 *   show: function(): void,
 *   enableAnimation: function(): void,
 *   disableAnimation: function(): void,
 *   getState: function(): { value: number, isHidden: boolean, isAnimating: boolean }
 * }} ProgressController
 */

/**
 * Создаёт контроллер для управления компонентом прогресса.
 * @param {HTMLElement} container - Корневой элемент прогресс-блока.
 * @param {{ restoreBtn?: HTMLElement | null }} [options]
 * @returns {ProgressController}
 */
export function createProgressController(container, { restoreBtn } = {}) {
  const bgCircle = /** @type {SVGCircleElement} */ (container.querySelector('circle.bg'));
  const fgCircle = /** @type {SVGCircleElement} */ (container.querySelector('circle.fg'));
  const progressRing = /** @type {HTMLElement} */ (container.querySelector('.progress-ring'));

  // Синхронизируем r в SVG с константой RADIUS
  bgCircle.setAttribute('r', String(RADIUS));
  fgCircle.setAttribute('r', String(RADIUS));

  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const CIRCUMFERENCE_STR = String(CIRCUMFERENCE);

  let _value = MIN_VALUE;
  let _isAnimating = false;
  let _isHidden = false;

  /**
   * Ограничивает значение в пределах допустимого диапазона.
   * @param {string|number} value
   * @returns {number}
   */
  function normalize(value) {
    const parsed = parseInt(String(value), 10);
    return Math.max(MIN_VALUE, Math.min(MAX_VALUE, isNaN(parsed) ? MIN_VALUE : parsed));
  }

  /**
   * Оповещает подписчиков об изменении состояния.
   */
  function _dispatchState() {
    container.dispatchEvent(new CustomEvent('progress:statechange', {
      bubbles: true,
      detail: {
        value: _value,
        isHidden: _isHidden,
        isAnimating: _isAnimating
      }
    }));
  }

  /**
   * Устанавливает визуальное значение прогресса.
   * @param {number} value - Значение от 0 до 100.
   */
  function setProgress(value) {
    const normalized = normalize(value);
    _value = normalized;

    if (normalized <= MIN_VALUE) {
      fgCircle.style.display = 'none';
      fgCircle.removeAttribute('stroke-dasharray');
      fgCircle.removeAttribute('stroke-dashoffset');
    } else {
      const offset = CIRCUMFERENCE * (1 - normalized / MAX_VALUE);
      fgCircle.style.display = 'inline';
      fgCircle.setAttribute('stroke-dasharray', CIRCUMFERENCE_STR);
      fgCircle.setAttribute('stroke-dashoffset', String(offset));
    }
    _dispatchState();
  }

  return {
    /** @param {number} value */
    set: setProgress,

    hide() {
      _isHidden = true;
      // Если уже прозрачен (повторный вызов) — применяем сразу, без ожидания перехода
      if (container.style.opacity === '0') {
        container.style.visibility = 'hidden';
        if (restoreBtn) restoreBtn.hidden = false;
      } else {
        container.style.opacity = '0';
        // Скрываем из потока только после завершения fade-out перехода
        container.addEventListener('transitionend', () => {
          if (_isHidden) {
            container.style.visibility = 'hidden';
            if (restoreBtn) restoreBtn.hidden = false;
          }
        }, { once: true });
      }
      _dispatchState();
    },

    show() {
      _isHidden = false;
      container.style.visibility = 'visible';
      container.style.opacity = '1';
      if (restoreBtn) restoreBtn.hidden = true;
      _dispatchState();
    },

    enableAnimation() {
      _isAnimating = true;
      progressRing.classList.add('animated');
      _dispatchState();
    },

    disableAnimation() {
      _isAnimating = false;
      progressRing.classList.remove('animated');
      _dispatchState();
    },

    /**
     * @returns {{ value: number, isHidden: boolean, isAnimating: boolean }}
     */
    getState() {
      return {
        value: _value,
        isHidden: _isHidden,
        isAnimating: _isAnimating
      };
    }
  };
}
