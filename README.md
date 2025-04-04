# Progress Block

Компонент для отображения прогресса в виде кольца с возможностью управления значением, включения анимации и скрытия блока. 
Разработан для использования в мобильных web-приложениях

## Описание

Проект представляет собой интерактивный UI-блок, разработанный с нуля на HTML, CSS и JavaScript без использования сторонних библиотек. 
Компонент адаптивен, легко встраивается в другие приложения и предоставляет публичный API для управления.

## Онлайн-демо

[Открыть на GitHub Pages](https://skotyty.github.io/progress_block/)

## Структура проекта

- `index.html` — основной HTML-файл, подключающий все остальные ресурсы.
- `progress.css` — стили компонента, организованные с использованием CSS-переменных.
- `main.js` — инициализация компонента, обработка событий ввода, переключателей и окна.
- `progress.js` — логика отображения прогресса и управление состоянием через API.
- `constants.js` — вынесенные значения (радиус, цвет, границы значений) и доступ к CSS-переменным.

## Публичный API

После загрузки страницы объект `progressBlockAPI` доступен глобально и предоставляет следующие методы:

```js
// Установить значение прогресса (от 0 до 100)
progressBlockAPI.set(75);

// Скрыть блок прогресса
progressBlockAPI.hide();

// Показать блок прогресса
progressBlockAPI.show();

// Включить анимацию (вращение кольца)
progressBlockAPI.enableAnimation();

// Выключить анимацию
progressBlockAPI.disableAnimation();

// Получить текущее состояние
progressBlockAPI.getState();
// {
//     value: Number,
//     isHidden: Boolean,
//     isAnimating: Boolean
// }
