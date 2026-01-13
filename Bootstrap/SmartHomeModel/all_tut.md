# 📘 Руководство для учеников: Создание интерфейса "Умный дом" с Bootstrap

## 🎯 Цель проекта
**Создать базовый веб-интерфейс** для управления умным домом используя **только Bootstrap 5** за **2-3 занятия**.

### 📋 Что вы сделаете:
1. **Главную страницу** с обзором системы
2. **3 раздела управления**: свет, климат, безопасность  
3. **Страницу сценариев** для автоматизации
4. **Навигацию** между всеми страницами
5. **Опубликуете** результат на GitHub Pages

---

## 🚀 ПОДГОТОВКА К РАБОТЕ

### ШАГ 1: Настройка рабочего пространства
```
1. Создайте на компьютере папку "smart_home"
2. Откройте её в редакторе кода (VS Code, Sublime Text, Notepad++)
3. Создайте внутри папку "src"
4. Внутри "src" создайте структуру:
   src/
   ├── index.html          # Главная страница
   ├── devices/            # Папка для устройств
   │   ├── lights.html     # Управление светом
   │   ├── climate.html    # Управление климатом
   │   └── security.html   # Безопасность
   ├── scenarios.html      # Сценарии автоматизации
   └── help.html           # Помощь и поддержка
```

### ШАГ 2: Базовый шаблон HTML
**Создайте файл `_template.html`** (это будет ваш шаблон для всех страниц):

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Умный Дом</title>
    
    <!-- Подключение Bootstrap - это ОБЯЗАТЕЛЬНО -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <!-- ВАШ КОД ЗДЕСЬ -->
    
    <!-- Bootstrap JavaScript (в конце страницы) -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

**💡 Совет:** Скопируйте этот код в каждый создаваемый HTML файл, меняя только `<title>`.

---

## 🧭 РАЗДЕЛ 1: СОЗДАНИЕ НАВИГАЦИИ

### Навигация будет ОДИНАКОВОЙ для всех страниц

### ШАГ 3: Простая навигация (добавьте в `<body>`)

```html
<!-- Контейнер Bootstrap для ограничения ширины -->
<div class="container mt-3">
    
    <!-- Шапка сайта -->
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="h4">
            🏠 Умный Дом
        </h1>
        <div>
            <!-- Кнопки навигации -->
            <a href="index.html" class="btn btn-sm btn-primary">Главная</a>
            <a href="devices/lights.html" class="btn btn-sm btn-outline-primary">Свет</a>
            <a href="devices/climate.html" class="btn btn-sm btn-outline-primary">Климат</a>
            <a href="devices/security.html" class="btn btn-sm btn-outline-primary">Безопасность</a>
            <a href="scenarios.html" class="btn btn-sm btn-outline-primary">Сценарии</a>
        </div>
    </div>
    
    <!-- Остальной контент страницы будет здесь -->
    
</div>
```

**🔍 Ищите в документации Bootstrap:**
- **"Containers"** для `.container`
- **"Flex"** для `.d-flex`
- **"Buttons"** для `.btn`

**💡 Совет:** Не забудьте поменять ссылки на другие страницы, когда будете создавать новые файлы.

---

## 🏠 РАЗДЕЛ 2: ГЛАВНАЯ СТРАНИЦА (`index.html`)

### ШАГ 4: Заголовок и описание

```html
<!-- После навигации, внутри контейнера -->
<div class="row mb-4">
    <div class="col-12">
        <h2 class="h5">Панель управления умным домом</h2>
        <p class="text-muted">Управляйте всеми устройствами вашего дома с одной панели</p>
    </div>
</div>
```

**🔍 Ищите:** "Typography" для текстовых классов

### ШАГ 5: Быстрые действия (карточки)

```html
<div class="row g-3">
    <!-- Карточка 1 -->
    <div class="col-md-6 col-lg-3">
        <div class="card">
            <div class="card-body text-center">
                <div class="fs-3 mb-2">💡</div>
                <h5 class="card-title">Освещение</h5>
                <p class="card-text">Управление светом</p>
                <a href="devices/lights.html" class="btn btn-primary btn-sm">Перейти</a>
            </div>
        </div>
    </div>
    
    <!-- Карточка 2 -->
    <div class="col-md-6 col-lg-3">
        <div class="card">
            <div class="card-body text-center">
                <div class="fs-3 mb-2">🌡️</div>
                <h5 class="card-title">Климат</h5>
                <p class="card-text">Температура и влажность</p>
                <a href="devices/climate.html" class="btn btn-primary btn-sm">Перейти</a>
            </div>
        </div>
    </div>
    
    <!-- Карточка 3 -->
    <div class="col-md-6 col-lg-3">
        <div class="card">
            <div class="card-body text-center">
                <div class="fs-3 mb-2">🔒</div>
                <h5 class="card-title">Безопасность</h5>
                <p class="card-text">Охрана и камеры</p>
                <a href="devices/security.html" class="btn btn-primary btn-sm">Перейти</a>
            </div>
        </div>
    </div>
    
    <!-- Карточка 4 -->
    <div class="col-md-6 col-lg-3">
        <div class="card">
            <div class="card-body text-center">
                <div class="fs-3 mb-2">⚡</div>
                <h5 class="card-title">Энергия</h5>
                <p class="card-text">Потребление и экономия</p>
                <a href="#" class="btn btn-primary btn-sm">Перейти</a>
            </div>
        </div>
    </div>
</div>
```

**🔍 Ищите:**
- **"Grid"** для `.row` и `.col-*`
- **"Cards"** для `.card` и `.card-body`
- **"Spacing"** для `.g-3`, `.mb-2`

**💡 Совет:** Создайте 4 карточки по этому образцу. Можно менять эмодзи и текст.

### ШАГ 6: Статус системы

```html
<div class="row mt-4">
    <div class="col-12">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">Статус системы</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-6 col-md-3 text-center">
                        <div class="text-success">✓</div>
                        <p class="mb-0">Безопасность</p>
                        <small class="text-muted">Активна</small>
                    </div>
                    <div class="col-6 col-md-3 text-center">
                        <div class="text-success">✓</div>
                        <p class="mb-0">Устройства</p>
                        <small class="text-muted">12 онлайн</small>
                    </div>
                    <div class="col-6 col-md-3 text-center">
                        <div class="text-warning">⚠</div>
                        <p class="mb-0">Энергия</p>
                        <small class="text-muted">1.2 кВт</small>
                    </div>
                    <div class="col-6 col-md-3 text-center">
                        <div class="text-success">✓</div>
                        <p class="mb-0">Сеть</p>
                        <small class="text-muted">Стабильно</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```

**💡 Совет:** Используйте классы `.text-success`, `.text-warning` для цветов статусов.

---

## 💡 РАЗДЕЛ 3: СТРАНИЦА ОСВЕЩЕНИЯ (`devices/lights.html`)

### ШАГ 7: Заголовок и переключатели

```html
<!-- Используйте тот же шаблон с навигацией -->

<!-- После навигации -->
<h2 class="h4 mb-4">Управление освещением</h2>

<!-- Переключатель "Все светильники" -->
<div class="card mb-3">
    <div class="card-body">
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <h5 class="card-title mb-0">Все светильники</h5>
                <p class="text-muted mb-0">8 устройств подключено</p>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" checked>
            </div>
        </div>
    </div>
</div>
```

**🔍 Ищите:** "Forms" → "Checks & switches" для переключателей

### ШАГ 8: Список устройств

```html
<!-- Список светильников по комнатам -->
<div class="row">
    <!-- Гостиная -->
    <div class="col-md-6 mb-3">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">🏠 Гостиная</h5>
            </div>
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span>Основной свет</span>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" checked>
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span>Торшер</span>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox">
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <span>Подсветка ТВ</span>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" checked>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Спальня -->
    <div class="col-md-6 mb-3">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">🛏️ Спальня</h5>
            </div>
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span>Основной свет</span>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox">
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span>Прикроватные</span>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" checked>
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <span>Ночник</span>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" checked>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```

**💡 Совет:** Создайте 2-4 комнаты по аналогии. Меняйте эмодзи и названия светильников.

### ШАГ 9: Кнопки управления

```html
<div class="row mt-4">
    <div class="col-12">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Быстрые действия</h5>
                <div class="d-flex flex-wrap gap-2">
                    <button class="btn btn-outline-primary">Включить все</button>
                    <button class="btn btn-outline-secondary">Выключить все</button>
                    <button class="btn btn-outline-success">Вечерний свет</button>
                    <button class="btn btn-outline-warning">Ночной режим</button>
                </div>
            </div>
        </div>
    </div>
</div>
```

**🔍 Ищите:** "Utilities" → "Flex" для `.d-flex`, `.flex-wrap`, `.gap-2`

---

## 🌡️ РАЗДЕЛ 4: СТРАНИЦА КЛИМАТА (`devices/climate.html`)

### ШАГ 10: Показатели температуры

```html
<!-- После навигации -->
<h2 class="h4 mb-4">Управление климатом</h2>

<div class="row mb-4">
    <div class="col-md-4">
        <div class="card text-center">
            <div class="card-body">
                <div class="fs-1">🌡️</div>
                <h3 class="card-title">22°C</h3>
                <p class="text-muted">Гостиная</p>
                <div class="btn-group" role="group">
                    <button class="btn btn-outline-primary btn-sm">-</button>
                    <button class="btn btn-outline-primary btn-sm">+</button>
                </div>
            </div>
        </div>
    </div>
    
    <div class="col-md-4">
        <div class="card text-center">
            <div class="card-body">
                <div class="fs-1">💧</div>
                <h3 class="card-title">45%</h3>
                <p class="text-muted">Влажность</p>
                <span class="badge bg-success">Норма</span>
            </div>
        </div>
    </div>
    
    <div class="col-md-4">
        <div class="card text-center">
            <div class="card-body">
                <div class="fs-1">⚡</div>
                <h3 class="card-title">0.8 кВт</h3>
                <p class="text-muted">Кондиционер</p>
                <div class="form-check form-switch d-inline-block">
                    <input class="form-check-input" type="checkbox" checked>
                </div>
            </div>
        </div>
    </div>
</div>
```

**🔍 Ищите:** "Button group" для группировки кнопок

### ШАГ 11: Устройства климат-контроля

```html
<div class="row">
    <div class="col-md-6 mb-3">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">❄️ Кондиционер</h5>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label class="form-label">Температура: <strong>22°C</strong></label>
                    <input type="range" class="form-range" min="16" max="30" value="22">
                </div>
                <div class="mb-3">
                    <label class="form-label">Режим:</label>
                    <select class="form-select">
                        <option>Охлаждение</option>
                        <option>Обогрев</option>
                        <option>Вентиляция</option>
                    </select>
                </div>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" checked>
                    <label class="form-check-label">Включен</label>
                </div>
            </div>
        </div>
    </div>
    
    <div class="col-md-6 mb-3">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">🔥 Обогреватель</h5>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label class="form-label">Мощность: <strong>Средняя</strong></label>
                    <input type="range" class="form-range" min="1" max="3" value="2">
                </div>
                <div class="mb-3">
                    <label class="form-label">Таймер:</label>
                    <select class="form-select">
                        <option>Без таймера</option>
                        <option>1 час</option>
                        <option>2 часа</option>
                        <option>До утра</option>
                    </select>
                </div>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox">
                    <label class="form-check-label">Включен</label>
                </div>
            </div>
        </div>
    </div>
</div>
```

**🔍 Ищите:** "Forms" → "Range" для ползунков

---

## 🔒 РАЗДЕЛ 5: СТРАНИЦА БЕЗОПАСНОСТИ (`devices/security.html`)

### ШАГ 12: Статус безопасности

```html
<!-- После навигации -->
<h2 class="h4 mb-4">Система безопасности</h2>

<div class="card mb-4">
    <div class="card-body">
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <h5 class="card-title mb-1">Охранная система</h5>
                <p class="text-muted mb-0">Все датчики активны</p>
            </div>
            <div>
                <span class="badge bg-success me-2">Активна</span>
                <div class="form-check form-switch d-inline-block">
                    <input class="form-check-input" type="checkbox" checked>
                </div>
            </div>
        </div>
    </div>
</div>
```

**🔍 Ищите:** "Badges" для меток статусов

### ШАГ 13: Камеры и датчики

```html
<div class="row mb-4">
    <div class="col-md-4 mb-3">
        <div class="card text-center">
            <div class="card-body">
                <div class="fs-1">📹</div>
                <h5 class="card-title">Входная дверь</h5>
                <span class="badge bg-success">Онлайн</span>
                <div class="mt-2">
                    <button class="btn btn-sm btn-outline-primary">Просмотр</button>
                </div>
            </div>
        </div>
    </div>
    
    <div class="col-md-4 mb-3">
        <div class="card text-center">
            <div class="card-body">
                <div class="fs-1">📹</div>
                <h5 class="card-title">Кухня</h5>
                <span class="badge bg-success">Онлайн</span>
                <div class="mt-2">
                    <button class="btn btn-sm btn-outline-primary">Просмотр</button>
                </div>
            </div>
        </div>
    </div>
    
    <div class="col-md-4 mb-3">
        <div class="card text-center">
            <div class="card-body">
                <div class="fs-1">📹</div>
                <h5 class="card-title">Гостиная</h5>
                <span class="badge bg-warning">Выключена</span>
                <div class="mt-2">
                    <button class="btn btn-sm btn-outline-warning">Включить</button>
                </div>
            </div>
        </div>
    </div>
</div>
```

**💡 Совет:** Создайте 3-4 карточки камер. Меняйте статусы и цвета кнопок.

### ШАГ 14: Датчики движения и дверей

```html
<div class="row">
    <div class="col-md-6">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">Датчики движения</h5>
            </div>
            <div class="card-body">
                <div class="list-group">
                    <div class="list-group-item d-flex justify-content-between align-items-center">
                        Гостиная
                        <span class="badge bg-success">Активен</span>
                    </div>
                    <div class="list-group-item d-flex justify-content-between align-items-center">
                        Кухня
                        <span class="badge bg-success">Активен</span>
                    </div>
                    <div class="list-group-item d-flex justify-content-between align-items-center">
                        Прихожая
                        <span class="badge bg-secondary">Выключен</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="col-md-6">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">Датчики дверей</h5>
            </div>
            <div class="card-body">
                <div class="list-group">
                    <div class="list-group-item d-flex justify-content-between align-items-center">
                        Входная дверь
                        <span class="badge bg-success">Закрыта</span>
                    </div>
                    <div class="list-group-item d-flex justify-content-between align-items-center">
                        Балкон
                        <span class="badge bg-warning">Открыта</span>
                    </div>
                    <div class="list-group-item d-flex justify-content-between align-items-center">
                        Гараж
                        <span class="badge bg-success">Закрыта</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```

**🔍 Ищите:** "List group" для списков элементов

---

## 🎭 РАЗДЕЛ 6: СЦЕНАРИИ (`scenarios.html`)

### ШАГ 15: Карточки сценариев

```html
<!-- После навигации -->
<h2 class="h4 mb-4">Сценарии автоматизации</h2>

<div class="row g-3">
    <!-- Сценарий 1 -->
    <div class="col-md-6 col-lg-4">
        <div class="card">
            <div class="card-body text-center">
                <div class="fs-1 mb-2">🌅</div>
                <h5 class="card-title">Доброе утро</h5>
                <p class="card-text text-muted small">
                    Плавное пробуждение: свет, музыка, кофе
                </p>
                <button class="btn btn-success">Активировать</button>
            </div>
        </div>
    </div>
    
    <!-- Сценарий 2 -->
    <div class="col-md-6 col-lg-4">
        <div class="card">
            <div class="card-body text-center">
                <div class="fs-1 mb-2">🏠</div>
                <h5 class="card-title">Режим "Дома"</h5>
                <p class="card-text text-muted small">
                    Комфортные настройки при присутствии
                </p>
                <button class="btn btn-success">Активировать</button>
            </div>
        </div>
    </div>
    
    <!-- Сценарий 3 -->
    <div class="col-md-6 col-lg-4">
        <div class="card">
            <div class="card-body text-center">
                <div class="fs-1 mb-2">🚶</div>
                <h5 class="card-title">Режим "Ушел"</h5>
                <p class="card-text text-muted small">
                    Экономия энергии при отсутствии
                </p>
                <button class="btn btn-outline-secondary">Активировать</button>
            </div>
        </div>
    </div>
</div>
```

**💡 Совет:** Создайте 6 сценариев по этому образцу. Меняйте эмодзи, названия и цвета кнопок.

### ШАГ 16: Кнопка создания сценария

```html
<div class="row mt-4">
    <div class="col-12">
        <div class="card">
            <div class="card-body text-center">
                <h5 class="card-title">Создать новый сценарий</h5>
                <p class="text-muted">Настройте автоматизацию под свои нужды</p>
                <button class="btn btn-primary">
                    + Новый сценарий
                </button>
            </div>
        </div>
    </div>
</div>
```

---

## ❓ РАЗДЕЛ 7: ПОМОЩЬ (`help.html`)

### ШАГ 17: FAQ (раскрывающиеся блоки)

```html
<!-- После навигации -->
<h2 class="h4 mb-4">Помощь и поддержка</h2>

<div class="accordion" id="faqAccordion">
    <!-- Вопрос 1 -->
    <div class="accordion-item">
        <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                Как добавить новое устройство?
            </button>
        </h2>
        <div id="faq1" class="accordion-collapse collapse show">
            <div class="accordion-body">
                Перейдите в настройки → Устройства → Добавить новое устройство
            </div>
        </div>
    </div>
    
    <!-- Вопрос 2 -->
    <div class="accordion-item">
        <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                Почему устройство не отвечает?
            </button>
        </h2>
        <div id="faq2" class="accordion-collapse collapse">
            <div class="accordion-body">
                Проверьте подключение к интернету и убедитесь, что устройство включено
            </div>
        </div>
    </div>
</div>
```

**🔍 Ищите:** "Accordion" для раскрывающихся блоков

### ШАГ 18: Контакты поддержки

```html
<div class="row mt-4">
    <div class="col-md-6">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Контакты поддержки</h5>
                <p><strong>Телефон:</strong> 8-800-123-45-67</p>
                <p><strong>Email:</strong> support@smart-home.ru</p>
                <p><strong>Часы работы:</strong> Круглосуточно</p>
            </div>
        </div>
    </div>
    
    <div class="col-md-6">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Форма обратной связи</h5>
                <div class="mb-3">
                    <label class="form-label">Ваше сообщение</label>
                    <textarea class="form-control" rows="3"></textarea>
                </div>
                <button class="btn btn-primary">Отправить</button>
            </div>
        </div>
    </div>
</div>
```

---

## 🚀 РАЗДЕЛ 8: ПУБЛИКАЦИЯ НА GITHUB PAGES

### ШАГ 19: Создание GitHub репозитория

1. **Зайдите на github.com** (зарегистрируйтесь, если нет аккаунта)
2. **Нажмите "+" → "New repository"**
3. **Название:** `smart-home-project`
4. **Описание:** "Проект интерфейса умного дома на Bootstrap"
5. **Выберите:** Public
6. **Добавьте:** README.md файл
7. **Нажмите:** Create repository

### ШАГ 20: Загрузка файлов

1. **На главной репозитория** найдите кнопку "Add file" → "Upload files"
2. **Перетащите** всю вашу папку `src` с файлами
3. **Напишите комментарий:** "Initial commit: все страницы"
4. **Нажмите:** Commit changes

### ШАГ 21: Настройка GitHub Pages

1. **Зайдите в Settings** (вкладка вверху репозитория)
2. **Найдите слева** "Pages"
3. **В "Source" выберите:** "main" branch
4. **Папка:** `/` (root)
5. **Нажмите:** Save
6. **Подождите 1-2 минуты** пока сайт опубликуется
7. **Ваш сайт будет доступен по адресу:** `ваш-логин.github.io/smart-home-project`

---

## ✅ ЧЕК-ЛИСТ ЗАВЕРШЕНИЯ ПРОЕКТА

### Обязательные страницы (минимум):
- [ ] `index.html` - Главная с 4 карточками
- [ ] `devices/lights.html` - Управление светом с переключателями
- [ ] `devices/climate.html` - Управление климатом с ползунками
- [ ] `devices/security.html` - Безопасность с камерами
- [ ] `scenarios.html` - 3+ сценария
- [ ] `help.html` - FAQ и контакты

### Проверьте:
- [ ] Навигация работает на всех страницах
- [ ] Ссылки ведут на правильные файлы
- [ ] Все страницы используют один и тот же шаблон
- [ ] Адаптивность (проверьте на телефоне/планшете)
- [ ] Сайт опубликован на GitHub Pages

---

## 💡 СОВЕТЫ И ЛАЙФХАКИ

### Если не работает:
1. **Проверьте пути к файлам** - если страница не открывается, скорее всего неправильная ссылка
2. **Обновляйте страницу** после изменений в коде
3. **Используйте консоль разработчика** (F12) для поиска ошибок

### Для экономии времени:
1. **Копируйте готовые блоки** с одной страницы на другую
2. **Используйте эмодзи** вместо иконок - не нужно скачивать картинки
3. **Начинайте с мобильной версии** - Bootstrap делает desktop сам

### Что улучшить (если успеете):
1. **Добавьте подвал** (footer) на всех страницах
2. **Создайте страницу "Настройки"** с формой
3. **Добавьте страницу "Энергопотребление"** с графиками
4. **Используйте больше компонентов Bootstrap**: таблицы, прогресс-бары, тосты

---

## 📚 ГДЕ ИСКАТЬ ПОМОЩЬ

### Документация Bootstrap:
- **getbootstrap.com/docs** - официальная документация
- **Раздел "Components"** - все готовые компоненты
- **Раздел "Utilities"** - классы для стилизации

### В поиске Google:
- "Bootstrap 5 карточки пример"
- "Bootstrap навигация между страницами"
- "Bootstrap переключатели формы"
- "Bootstrap адаптивная сетка"

### Что искать на сайте Bootstrap:
1. **Layout → Grid** - как располагать элементы в ряд
2. **Components → Cards** - информационные блоки
3. **Components → Buttons** - кнопки разных цветов и размеров
4. **Forms → Checks & switches** - переключатели Вкл/Выкл
5. **Components → Badge** - цветные метки статусов
6. **Components → Accordion** - раскрывающиеся блоки

---

## 🎯 ЧТО ВЫ НАУЧИЛИСЬ

### После этого проекта вы сможете:
1. **Создавать многостраничные сайты** на Bootstrap
2. **Использовать готовые компоненты** без написания CSS
3. **Делать адаптивный дизайн** который работает на телефоне и ПК
4. **Публиковать сайты** на GitHub Pages
5. **Работать с формами** и интерактивными элементами

### Главные концепции Bootstrap:
- **Контейнеры** - ограничивают ширину контента
- **Сетка (Grid)** - основа адаптивности
- **Карточки (Cards)** - универсальные блоки контента
- **Утилитарные классы** - быстрое стилизация через классы
- **Компоненты** - готовые строительные блоки интерфейса

---

## 🚀 СТАРТУЕМ!

### Ваш план действий:
**День 1 (45-90 минут):**
1. Создайте базовый шаблон и навигацию
2. Сделайте главную страницу с карточками
3. Создайте страницу освещения

**День 2 (45-90 минут):**
1. Завершите страницы климата и безопасности
2. Создайте страницу сценариев
3. Сделайте страницу помощи

**День 3 (45 минут):**
1. Проверьте все ссылки
2. Опубликуйте на GitHub Pages
3. Протестируйте на разных устройствах

**Помните:** Не стремитесь к идеалу с первого раза. Главное - сделать рабочий прототип. Bootstrap сделает за вас всю сложную работу с CSS!

**Удачи в создании вашего первого интерфейса умного дома!** 🏠✨