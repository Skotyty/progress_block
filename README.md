# Progress Block

Компонент кольцевого прогресса для мобильных web-приложений.
Разработан без сторонних библиотек на HTML + CSS (SCSS) + JavaScript.

## Демо

[Открыть на GitHub Pages](https://skotyty.github.io/progress_block/)

## Структура проекта

```
├── src/styles/           # Исходные SCSS-файлы
│   ├── _variables.scss   # Все CSS-переменные
│   ├── _base.scss
│   ├── _progress-block.scss
│   ├── _ring.scss
│   ├── _controls.scss
│   ├── _animations.scss
│   ├── _media.scss       # Адаптив под ориентацию
│   ├── _dark.scss        # Тёмная тема
│   └── main.scss
├── .github/workflows/deploy.yml
├── index.html
├── progress.js           # Логика компонента, публичный API
├── main.js               # Инициализация и обработчики UI
└── constants.js
```

## Запуск

```bash
npm install
npm run build   # SCSS → autoprefixer → cssnano → progress.css
npm run dev     # watch-режим с source map
npm run lint    # ESLint
```

## Особенности

- **Адаптив** — `@media (orientation: landscape)` меняет раскладку с вертикальной на горизонтальную
- **Тёмная тема** — через `prefers-color-scheme` без JS; хост-приложение может принудительно задать тему атрибутом `data-theme="dark"` или `data-theme="light"` на любом родительском элементе
- **Кнопка восстановления** — при скрытии блока появляется иконка-глаз, позволяющая вернуть блок обратно без перезагрузки страницы
- **Плавное скрытие** — блок исчезает с fade-анимацией; `visibility: hidden` применяется только после завершения перехода
- **Клавиатурная навигация** — поле ввода принимает только цифры, поддерживает `ArrowUp/Down`, `Home`, `End`; фокус виден только при навигации с клавиатуры
- **CSS-переменные** — все цвета, размеры и тайминги вынесены в `:root`, компонент легко стилизовать снаружи без правки исходников
- **CI/CD** — GitHub Actions собирает CSS и деплоит на GitHub Pages при каждом пуше в `main`

## API

После загрузки страницы объект `progressBlockAPI` доступен глобально:

```js
progressBlockAPI.set(75);           // значение 0–100
progressBlockAPI.hide();
progressBlockAPI.show();
progressBlockAPI.enableAnimation();
progressBlockAPI.disableAnimation();
progressBlockAPI.getState();        // { value, isHidden, isAnimating }
```

Компонент также генерирует событие при любом изменении состояния:

```js
document.getElementById('progressBlock').addEventListener('progress:statechange', (e) => {
  console.log(e.detail); // { value, isHidden, isAnimating }
});
```

