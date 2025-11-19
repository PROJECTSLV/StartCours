# Основы JavaScript для верстальщиков

Этот проект демонстрирует базовые концепции JavaScript, которые необходимо знать каждому верстальщику.

## Структура проекта

- `index.html` - HTML-страница с подключенными скриптами
- `js/script.js` - внешний JavaScript файл
- `css/style.css` - таблица стилей

## Демонстрационные примеры

### 1. Подключение JavaScript

В HTML JavaScript можно подключать несколькими способами:

```html
<!-- Внешний файл -->
<script src="js/script.js"></script>

<!-- Встроенный скрипт -->
<script>
  alert('hello, script!')
</script> 

#2. Взаимодействие с пользователем
```html
javascript
// Диалоговые окна
alert('hello, script!');        // Простое уведомление
confirm('you are started?');    // Окно с подтверждением (OK/Отмена)
prompt('your name is?');        // Запрос ввода текста

// Вывод в консоль браузера
console.log('Welcome!');
