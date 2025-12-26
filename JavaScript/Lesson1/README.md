# Основы JavaScript для верстальщиков

Этот проект демонстрирует базовые концепции JavaScript, которые необходимо знать каждому верстальщику.

## Структура проекта

- `index.html` - HTML-страница с подключенными скриптами
- `js/script.js` - внешний JavaScript файл
- `css/style.css` - таблица стилей

## Демонстрационные примеры


В HTML JavaScript можно подключать несколькими способами:

```html
1. Подключение JavaScript
<!-- Внешний файл -->
<script src="js/script.js"></script>

<!-- Встроенный скрипт -->
<script>
  alert('hello, script!')
</script> 

#2. Взаимодействие с пользователем

javascript
// Диалоговые окна
alert('hello, script!');        // Простое уведомление
confirm('you are started?');    // Окно с подтверждением (OK/Отмена)
prompt('your name is?');        // Запрос ввода текста

// Вывод в консоль браузера
console.log('Welcome!');

3. Переменные и типы данных
javascript
// Объявление переменных
let number = 5;                 // Число
let $tring = 'Sorry';           // Строка
const floatNumber = 10.5;       // Число с плавающей точкой
const string = 'Мы вам перезвоним...'; // Строка
const boolean = true;           // Логическое значение

// Особые типы
const sym = Symbol();           // Символ (уникальный идентификатор)
let typeUndefined;              // undefined (неопределенное значение)
const typeNull = null;          // null (пустое значение)

// Объектные типы
const object = {};              // Объект
const arr = [];                 // Массив
const func = function() {};     // Функция
Ключевые различия:

let - переменная, которую можно изменять

const - константа, нельзя переназначить

4. Шаблонные строки (Template Literals)
javascript
// Старый способ конкатенации
const item2 = '<article class = "item">' +
              'Их нет у меня)  (senior)' +
              '</article>';

// Новый способ с шаблонными строками
const item3 = `
    <article class="item">
        Я могу вам помочь? (junior)
    </article>
`;

// Шаблонные строки с интерполяцией
const item4 = `
    <article class="item">
        <h2>Не думаю... (meedle)</h2>
        <h2>Вообще нет! ${string}(senior)</h2>
    </article>
`;
Преимущества шаблонных строк:

Многострочность без конкатенации

Интерполяция переменных через ${}

Более читаемый код

5. Оператор typeof
javascript
console.log(typeof number);      // "number"
console.log(typeof $tring);      // "string"
console.log(typeof floatNumber); // "number"
console.log(typeof arr);         // "object" (особенность JavaScript)
Оператор typeof возвращает строку, указывающую тип операнда.

Комментарии в JavaScript
javascript
// Однострочный комментарий

/* 
  Многострочный комментарий
  Можно писать на нескольких строках
*/
Как использовать
Откройте index.html в браузере

Откройте инструменты разработчика (F12)

Перейдите на вкладку "Console" чтобы увидеть результаты выполнения скриптов

Важные заметки
JavaScript выполняется в порядке подключения в HTML

Диалоговые окна (alert, confirm, prompt) блокируют выполнение кода

Для отладки используйте console.log()

Современный JavaScript рекомендует использовать const и let вместо var
