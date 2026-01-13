# 🏡 Руководство по созданию адаптивного веб-интерфейса для "Умного дома" с Bootstrap

## 📋 Оглавление
1. [Цель проекта](#цель-проекта)
2. [Необходимые инструменты](#необходимые-инструменты)
3. [Структура проекта](#структура-проекта)
4. [Шаг 1: Базовая настройка](#шаг-1-базовая-настройка)
5. [Шаг 2: Навигационная панель](#шаг-2-навигационная-панель)
6. [Шаг 3: Главная панель управления](#шаг-3-главная-панель-управления)
7. [Шаг 4: Страница управления устройствами](#шаг-4-страница-управления-устройствами)
8. [Шаг 5: Страница сценариев](#шаг-5-страница-сценариев)
9. [Шаг 6: Адаптивность и финальные штрихи](#шаг-6-адаптивность-и-финальные-штрихи)
10. [Дополнительные идеи для развития](#дополнительные-идеи-для-развития)

---

## 🎯 Цель проекта

Создать адаптивный веб-интерфейс системы "Умный дом" с несколькими страницами, используя Bootstrap 5. Интерфейс должен работать без бэкенда и демонстрировать концепцию управления устройствами через веб-браузер.

**Ключевые концепции для изучения:**
- Сетка Bootstrap (Grid System)
- Компоненты Bootstrap (карточки, кнопки, навигация)
- Адаптивный дизайн
- Псевдо-взаимодействие через JavaScript
- Организация многостраничного интерфейса

---

## 🛠 Необходимые инструменты

1. **Редактор кода** (VS Code, Sublime Text, или даже Notepad++)
2. **Браузер** (Chrome, Firefox, Edge)
3. **Bootstrap 5** (будем использовать CDN)
4. **Font Awesome** (для иконок, через CDN)
5. **Базовые знания HTML/CSS**

---

## 📁 Структура проекта

```
smart-home-ui/
├── index.html          # Главная страница (панель управления)
├── devices.html        # Страница управления устройствами
├── scenarios.html      # Страница сценариев
├── styles.css          # Дополнительные стили (опционально)
└── script.js           # Простой JavaScript для имитации работы
```

---

## 🚀 Шаг 1: Базовая настройка

Создайте файл `index.html` и добавьте базовую структуру с подключением Bootstrap:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Умный Дом - Панель управления</title>
    
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Font Awesome для иконок -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Наши дополнительные стили -->
    <link rel="stylesheet" href="styles.css">
    
    <!-- Favicon -->
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏠</text></svg>">
    
    <style>
        /* Базовые стили для проекта */
        :root {
            --primary-color: #4361ee;
            --secondary-color: #3a0ca3;
            --success-color: #4cc9f0;
            --light-bg: #f8f9fa;
        }
        
        body {
            padding-top: 20px;
            background-color: #f5f7fb;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .device-card {
            transition: transform 0.3s, box-shadow 0.3s;
            border-radius: 15px;
            overflow: hidden;
        }
        
        .device-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        
        .navbar-brand {
            font-weight: 700;
            color: var(--primary-color) !important;
        }
    </style>
</head>
<body>
    <!-- Навигация будет здесь -->
    
    <!-- Основной контент будет здесь -->
    
    <!-- Bootstrap JS + Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    
    <!-- Наш JavaScript файл -->
    <script src="script.js"></script>
</body>
</html>
```

---

## 🧭 Шаг 2: Навигационная панель

Добавьте навигацию внутри `<body>` после открывающего тега:

```html
<!-- Навигационная панель -->
<nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm rounded-3 mx-3 mb-4">
    <div class="container-fluid">
        <a class="navbar-brand" href="index.html">
            <i class="fas fa-home me-2"></i>Умный Дом
        </a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
                <li class="nav-item">
                    <a class="nav-link active" href="index.html">
                        <i class="fas fa-tachometer-alt me-1"></i>Панель управления
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="devices.html">
                        <i class="fas fa-plug me-1"></i>Устройства
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="scenarios.html">
                        <i class="fas fa-play-circle me-1"></i>Сценарии
                    </a>
                </li>
            </ul>
            
            <div class="d-flex align-items-center">
                <span class="me-3 text-muted d-none d-md-block">
                    <i class="fas fa-user-circle me-1"></i>Привет, Алексей!
                </span>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="darkModeSwitch">
                    <label class="form-check-label" for="darkModeSwitch">Темная тема</label>
                </div>
            </div>
        </div>
    </div>
</nav>
```

---

## 📊 Шаг 3: Главная панель управления

Замените комментарий "Основной контент будет здесь" на:

```html
<!-- Основной контент -->
<main class="container-fluid">
    <div class="row">
        <!-- Левая колонка - Основные показатели -->
        <div class="col-lg-8">
            <div class="row mb-4">
                <div class="col-12">
                    <h2 class="mb-4">
                        <i class="fas fa-tachometer-alt me-2 text-primary"></i>Панель управления
                    </h2>
                </div>
                
                <!-- Карточки с показателями -->
                <div class="col-md-6 col-lg-3 mb-3">
                    <div class="card device-card border-primary">
                        <div class="card-body text-center">
                            <i class="fas fa-thermometer-half fa-2x text-primary mb-2"></i>
                            <h5 class="card-title">Температура</h5>
                            <h2 class="card-text" id="temperature">22.5°C</h2>
                            <div class="btn-group btn-group-sm mt-2">
                                <button class="btn btn-outline-primary" onclick="adjustTemperature(-0.5)">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <button class="btn btn-outline-primary" onclick="adjustTemperature(0.5)">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-6 col-lg-3 mb-3">
                    <div class="card device-card border-success">
                        <div class="card-body text-center">
                            <i class="fas fa-tint fa-2x text-success mb-2"></i>
                            <h5 class="card-title">Влажность</h5>
                            <h2 class="card-text" id="humidity">45%</h2>
                            <span class="badge bg-success">Норма</span>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-6 col-lg-3 mb-3">
                    <div class="card device-card border-warning">
                        <div class="card-body text-center">
                            <i class="fas fa-lightbulb fa-2x text-warning mb-2"></i>
                            <h5 class="card-title">Энергия</h5>
                            <h2 class="card-text" id="energy">1.2 кВт</h2>
                            <div class="progress mt-2" style="height: 8px;">
                                <div class="progress-bar bg-warning" style="width: 65%"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-6 col-lg-3 mb-3">
                    <div class="card device-card border-info">
                        <div class="card-body text-center">
                            <i class="fas fa-shield-alt fa-2x text-info mb-2"></i>
                            <h5 class="card-title">Безопасность</h5>
                            <h2 class="card-text">Включено</h2>
                            <button class="btn btn-sm btn-info mt-2" id="securityToggle">
                                <i class="fas fa-power-off me-1"></i>Выключить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- График/состояние устройств -->
            <div class="row">
                <div class="col-12">
                    <div class="card shadow-sm">
                        <div class="card-header bg-white">
                            <h5 class="mb-0">
                                <i class="fas fa-chart-line me-2"></i>Активность устройств
                            </h5>
                        </div>
                        <div class="card-body">
                            <!-- Упрощенный "график" -->
                            <div class="row text-center">
                                <div class="col">
                                    <div class="p-3 bg-light rounded">
                                        <i class="fas fa-sun fa-lg text-warning mb-2"></i>
                                        <p class="mb-1">Освещение</p>
                                        <span class="badge bg-success">Вкл</span>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="p-3 bg-light rounded">
                                        <i class="fas fa-temperature-low fa-lg text-primary mb-2"></i>
                                        <p class="mb-1">Кондиционер</p>
                                        <span class="badge bg-danger">Выкл</span>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="p-3 bg-light rounded">
                                        <i class="fas fa-tv fa-lg text-info mb-2"></i>
                                        <p class="mb-1">Телевизор</p>
                                        <span class="badge bg-success">Вкл</span>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="p-3 bg-light rounded">
                                        <i class="fas fa-blender fa-lg text-secondary mb-2"></i>
                                        <p class="mb-1">Кофеварка</p>
                                        <span class="badge bg-danger">Выкл</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Правая колонка - Быстрые действия и уведомления -->
        <div class="col-lg-4 mt-4 mt-lg-0">
            <!-- Быстрые действия -->
            <div class="card shadow-sm mb-4">
                <div class="card-header bg-white">
                    <h5 class="mb-0">
                        <i class="fas fa-bolt me-2"></i>Быстрые действия
                    </h5>
                </div>
                <div class="card-body">
                    <div class="d-grid gap-2">
                        <button class="btn btn-outline-primary" onclick="toggleAllLights()">
                            <i class="fas fa-lightbulb me-2"></i>Все светильники
                        </button>
                        <button class="btn btn-outline-success" onclick="activateScenario('home')">
                            <i class="fas fa-play me-2"></i>Сценарий "Дома"
                        </button>
                        <button class="btn btn-outline-warning" onclick="activateScenario('away')">
                            <i class="fas fa-running me-2"></i>Сценарий "Ушел"
                        </button>
                        <button class="btn btn-outline-info" onclick="activateScenario('night')">
                            <i class="fas fa-moon me-2"></i>Сценарий "Ночь"
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Уведомления -->
            <div class="card shadow-sm">
                <div class="card-header bg-white">
                    <h5 class="mb-0">
                        <i class="fas fa-bell me-2"></i>Уведомления
                    </h5>
                </div>
                <div class="card-body">
                    <div class="list-group list-group-flush">
                        <div class="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <i class="fas fa-check-circle text-success me-2"></i>
                                <small>Дверь закрыта</small>
                            </div>
                            <small class="text-muted">2 мин назад</small>
                        </div>
                        <div class="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <i class="fas fa-info-circle text-primary me-2"></i>
                                <small>Температура повышена</small>
                            </div>
                            <small class="text-muted">10 мин назад</small>
                        </div>
                        <div class="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <i class="fas fa-exclamation-triangle text-warning me-2"></i>
                                <small>Кофеварка не выключена</small>
                            </div>
                            <small class="text-muted">1 час назад</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
```

---

## 📱 Шаг 4: Страница управления устройствами

Создайте файл `devices.html` с аналогичной навигацией и следующим основным содержимым:

```html
<main class="container-fluid">
    <div class="row mb-4">
        <div class="col-12">
            <h2 class="mb-4">
                <i class="fas fa-plug me-2 text-primary"></i>Управление устройствами
            </h2>
            <p class="text-muted">Управляйте всеми устройствами вашего умного дома</p>
        </div>
    </div>
    
    <!-- Фильтры устройств -->
    <div class="row mb-4">
        <div class="col-12">
            <div class="card shadow-sm">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6 mb-3 mb-md-0">
                            <h6 class="mb-2">Фильтр по типу:</h6>
                            <div class="btn-group flex-wrap" role="group">
                                <input type="radio" class="btn-check" name="deviceFilter" id="filterAll" checked>
                                <label class="btn btn-outline-primary" for="filterAll">Все</label>
                                
                                <input type="radio" class="btn-check" name="deviceFilter" id="filterLights">
                                <label class="btn btn-outline-primary" for="filterLights">Освещение</label>
                                
                                <input type="radio" class="btn-check" name="deviceFilter" id="filterClimate">
                                <label class="btn btn-outline-primary" for="filterClimate">Климат</label>
                                
                                <input type="radio" class="btn-check" name="deviceFilter" id="filterSecurity">
                                <label class="btn btn-outline-primary" for="filterSecurity">Безопасность</label>
                            </div>
                        </div>
                        
                        <div class="col-md-6">
                            <h6 class="mb-2">Статус:</h6>
                            <div class="btn-group" role="group">
                                <input type="radio" class="btn-check" name="statusFilter" id="statusAll" checked>
                                <label class="btn btn-outline-success" for="statusAll">Все</label>
                                
                                <input type="radio" class="btn-check" name="statusFilter" id="statusOn">
                                <label class="btn btn-outline-success" for="statusOn">Включены</label>
                                
                                <input type="radio" class="btn-check" name="statusFilter" id="statusOff">
                                <label class="btn btn-outline-success" for="statusOff">Выключены</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Список устройств -->
    <div class="row" id="devicesContainer">
        <!-- Устройства будут добавляться через JavaScript -->
    </div>
</main>
```

---

## 🎭 Шаг 5: Страница сценариев

Создайте файл `scenarios.html` с аналогичной навигацией и следующим основным содержимым:

```html
<main class="container-fluid">
    <div class="row mb-4">
        <div class="col-12">
            <h2 class="mb-4">
                <i class="fas fa-play-circle me-2 text-primary"></i>Сценарии
            </h2>
            <p class="text-muted">Создавайте и управляйте сценариями автоматизации</p>
        </div>
    </div>
    
    <div class="row">
        <!-- Создание нового сценария -->
        <div class="col-lg-4 mb-4">
            <div class="card shadow-sm h-100">
                <div class="card-header bg-white">
                    <h5 class="mb-0">
                        <i class="fas fa-plus-circle me-2"></i>Новый сценарий
                    </h5>
                </div>
                <div class="card-body">
                    <form id="newScenarioForm">
                        <div class="mb-3">
                            <label for="scenarioName" class="form-label">Название сценария</label>
                            <input type="text" class="form-control" id="scenarioName" placeholder="Например: 'Вечерний отдых'">
                        </div>
                        
                        <div class="mb-3">
                            <label class="form-label">Устройства в сценарии</label>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="scenarioLight">
                                <label class="form-check-label" for="scenarioLight">
                                    <i class="fas fa-lightbulb text-warning me-1"></i>Приглушить свет
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="scenarioTemp">
                                <label class="form-check-label" for="scenarioTemp">
                                    <i class="fas fa-thermometer-half text-primary me-1"></i>Установить температуру 23°C
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="scenarioMusic">
                                <label class="form-check-label" for="scenarioMusic">
                                    <i class="fas fa-music text-success me-1"></i>Включить расслабляющую музыку
                                </label>
                            </div>
                        </div>
                        
                        <div class="mb-3">
                            <label for="scenarioTime" class="form-label">Время выполнения</label>
                            <select class="form-select" id="scenarioTime">
                                <option value="now">Немедленно</option>
                                <option value="schedule">По расписанию</option>
                                <option value="trigger">По триггеру</option>
                            </select>
                        </div>
                        
                        <button type="submit" class="btn btn-primary w-100">
                            <i class="fas fa-save me-2"></i>Сохранить сценарий
                        </button>
                    </form>
                </div>
            </div>
        </div>
        
        <!-- Список сценариев -->
        <div class="col-lg-8">
            <div class="row" id="scenariosContainer">
                <!-- Сценарии будут добавляться через JavaScript -->
            </div>
        </div>
    </div>
</main>
```

---

## 🔧 Шаг 6: Адаптивность и финальные штрихи

### Файл `script.js` - для имитации работы системы:

```javascript
// script.js - Основная логика для демонстрации работы умного дома

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация страницы устройств
    if (document.getElementById('devicesContainer')) {
        initializeDevicesPage();
    }
    
    // Инициализация страницы сценариев
    if (document.getElementById('scenariosContainer')) {
        initializeScenariosPage();
    }
    
    // Обработчик переключателя темы
    const darkModeSwitch = document.getElementById('darkModeSwitch');
    if (darkModeSwitch) {
        darkModeSwitch.addEventListener('change', function() {
            document.body.classList.toggle('dark-mode');
            document.querySelectorAll('.card').forEach(card => {
                card.classList.toggle('bg-dark');
                card.classList.toggle('text-light');
            });
        });
    }
    
    // Обработчик кнопки безопасности
    const securityToggle = document.getElementById('securityToggle');
    if (securityToggle) {
        securityToggle.addEventListener('click', function() {
            const isActive = this.innerHTML.includes('Выключить');
            
            if (isActive) {
                this.innerHTML = '<i class="fas fa-power-off me-1"></i>Включить';
                this.classList.remove('btn-info');
                this.classList.add('btn-danger');
                showNotification('Система безопасности выключена', 'warning');
            } else {
                this.innerHTML = '<i class="fas fa-power-off me-1"></i>Выключить';
                this.classList.remove('btn-danger');
                this.classList.add('btn-info');
                showNotification('Система безопасности включена', 'success');
            }
        });
    }
    
    // Обработка фильтров на странице устройств
    document.querySelectorAll('input[name="deviceFilter"], input[name="statusFilter"]').forEach(filter => {
        filter.addEventListener('change', filterDevices);
    });
});

// Функции для главной страницы
function adjustTemperature(change) {
    const tempElement = document.getElementById('temperature');
    let currentTemp = parseFloat(tempElement.textContent);
    currentTemp += change;
    tempElement.textContent = currentTemp.toFixed(1) + '°C';
    
    const message = change > 0 ? 'Температура повышена' : 'Температура понижена';
    showNotification(message, 'info');
}

function toggleAllLights() {
    showNotification('Все светильники переключены', 'success');
}

function activateScenario(scenarioName) {
    const scenarioNames = {
        'home': 'Дома',
        'away': 'Ушел',
        'night': 'Ночь'
    };
    
    showNotification(`Сценарий "${scenarioNames[scenarioName]}" активирован`, 'success');
}

// Инициализация страницы устройств
function initializeDevicesPage() {
    const devices = [
        { id: 1, name: 'Умная лампочка', type: 'light', status: true, icon: 'lightbulb', color: 'warning' },
        { id: 2, name: 'Кондиционер', type: 'climate', status: false, icon: 'snowflake', color: 'primary' },
        { id: 3, name: 'Умная розетка', type: 'socket', status: true, icon: 'plug', color: 'success' },
        { id: 4, name: 'Камера безопасности', type: 'security', status: true, icon: 'camera', color: 'info' },
        { id: 5, name: 'Обогреватель', type: 'climate', status: false, icon: 'fire', color: 'danger' },
        { id: 6, name: 'Умный замок', type: 'security', status: true, icon: 'lock', color: 'dark' },
        { id: 7, name: 'Мультиварка', type: 'appliance', status: false, icon: 'utensils', color: 'secondary' },
        { id: 8, name: 'Дачник влажности', type: 'climate', status: true, icon: 'tint', color: 'info' }
    ];
    
    const container = document.getElementById('devicesContainer');
    container.innerHTML = '';
    
    devices.forEach(device => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4 col-xl-3 mb-4';
        
        col.innerHTML = `
            <div class="card device-card" data-type="${device.type}" data-status="${device.status}">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <div>
                            <i class="fas fa-${device.icon} fa-2x text-${device.color}"></i>
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input device-toggle" type="checkbox" 
                                   ${device.status ? 'checked' : ''} data-id="${device.id}">
                        </div>
                    </div>
                    <h5 class="card-title">${device.name}</h5>
                    <p class="card-text">
                        <span class="badge bg-${device.status ? 'success' : 'secondary'}">
                            ${device.status ? 'Включено' : 'Выключено'}
                        </span>
                        <span class="badge bg-light text-dark ms-1">${getTypeName(device.type)}</span>
                    </p>
                    <button class="btn btn-sm btn-outline-${device.color} w-100 mt-2">
                        <i class="fas fa-cog me-1"></i>Настройки
                    </button>
                </div>
            </div>
        `;
        
        container.appendChild(col);
    });
    
    // Добавляем обработчики для переключателей
    document.querySelectorAll('.device-toggle').forEach(toggle => {
        toggle.addEventListener('change', function() {
            const deviceId = this.getAttribute('data-id');
            const isOn = this.checked;
            
            showNotification(`Устройство ${deviceId} ${isOn ? 'включено' : 'выключено'}`, 
                           isOn ? 'success' : 'warning');
        });
    });
}

// Инициализация страницы сценариев
function initializeScenariosPage() {
    const scenarios = [
        { id: 1, name: 'Утро', description: 'Просыпаемся с комфортом', active: true, icon: 'sun' },
        { id: 2, name: 'Рабочий день', description: 'Фокус на работе', active: false, icon: 'laptop' },
        { id: 3, name: 'Вечерний отдых', description: 'Расслабление после работы', active: true, icon: 'couch' },
        { id: 4, name: 'Ночь', description: 'Готовимся ко сну', active: false, icon: 'moon' },
        { id: 5, name: 'Экономия энергии', description: 'Минимальное потребление', active: false, icon: 'bolt' },
        { id: 6, name: 'Прием гостей', description: 'Создаем атмосферу', active: false, icon: 'users' }
    ];
    
    const container = document.getElementById('scenariosContainer');
    
    scenarios.forEach(scenario => {
        const col = document.createElement('div');
        col.className = 'col-md-6 mb-4';
        
        col.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <i class="fas fa-${scenario.icon} fa-2x text-primary mb-3"></i>
                            <h5 class="card-title">${scenario.name}</h5>
                            <p class="card-text text-muted">${scenario.description}</p>
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input scenario-toggle" type="checkbox" 
                                   ${scenario.active ? 'checked' : ''} data-id="${scenario.id}">
                        </div>
                    </div>
                    <div class="mt-3">
                        <button class="btn btn-sm btn-outline-primary me-2" onclick="runScenario(${scenario.id})">
                            <i class="fas fa-play me-1"></i>Запустить
                        </button>
                        <button class="btn btn-sm btn-outline-secondary">
                            <i class="fas fa-edit me-1"></i>Изменить
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(col);
    });
    
    // Обработчик формы создания сценария
    const form = document.getElementById('newScenarioForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('scenarioName').value;
            
            if (name) {
                showNotification(`Сценарий "${name}" создан!`, 'success');
                this.reset();
            }
        });
    }
}

// Вспомогательные функции
function getTypeName(type) {
    const types = {
        'light': 'Освещение',
        'climate': 'Климат',
        'security': 'Безопасность',
        'socket': 'Розетка',
        'appliance': 'Устройство'
    };
    
    return types[type] || type;
}

function filterDevices() {
    const typeFilter = document.querySelector('input[name="deviceFilter"]:checked').id;
    const statusFilter = document.querySelector('input[name="statusFilter"]:checked').id;
    
    document.querySelectorAll('.device-card').forEach(card => {
        const type = card.getAttribute('data-type');
        const status = card.getAttribute('data-status') === 'true';
        
        let showType = true;
        let showStatus = true;
        
        // Фильтр по типу
        if (typeFilter !== 'filterAll') {
            const filterType = typeFilter.replace('filter', '').toLowerCase();
            showType = type === filterType;
        }
        
        // Фильтр по статусу
        if (statusFilter !== 'statusAll') {
            if (statusFilter === 'statusOn') {
                showStatus = status === true;
            } else if (statusFilter === 'statusOff') {
                showStatus = status === false;
            }
        }
        
        // Показать/скрыть карточку
        if (showType && showStatus) {
            card.parentElement.style.display = 'block';
        } else {
            card.parentElement.style.display = 'none';
        }
    });
}

function runScenario(id) {
    showNotification(`Сценарий #${id} запущен`, 'success');
}

function showNotification(message, type = 'info') {
    // Создаем уведомление
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alert.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alert);
    
    // Автоматически скрываем через 3 секунды
    setTimeout(() => {
        if (alert.parentNode) {
            alert.parentNode.removeChild(alert);
        }
    }, 3000);
}
```

---

## 🎨 Файл дополнительных стилей `styles.css`

```css
/* Дополнительные стили для проекта */

/* Анимация для уведомлений */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Темная тема */
.dark-mode {
    background-color: #121212;
    color: #ffffff;
}

.dark-mode .card {
    background-color: #1e1e1e;
    border-color: #333;
}

.dark-mode .navbar, 
.dark-mode .card-header {
    background-color: #1a1a1a !important;
}

.dark-mode .list-group-item {
    background-color: #252525;
    color: #ffffff;
    border-color: #333;
}

/* Анимации */
.device-card, .alert {
    animation: fadeInUp 0.3s ease-out;
}

/* Кастомные стили для переключателей */
.form-switch .form-check-input:checked {
    background-color: #4361ee;
    border-color: #4361ee;
}

/* Стили для сценариев */
.scenario-card {
    border-left: 4px solid #4361ee;
}

/* Адаптивные улучшения */
@media (max-width: 768px) {
    .btn-group {
        display: flex;
        flex-wrap: wrap;
    }
    
    .btn-group .btn {
        flex: 1;
        min-width: 80px;
    }
}

/* Стили для состояния загрузки */
.loading-spinner {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: 0.2em solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spinner-border 0.75s linear infinite;
}

@keyframes spinner-border {
    to { transform: rotate(360deg); }
}
```

---

## 🚀 Дополнительные идеи для развития проекта

1. **Добавьте страницу статистики** с графиками (можно использовать Chart.js)
2. **Реализуйте управление через голосовые команды** (имитация)
3. **Добавьте режим "гость"** с ограниченным функционалом
4. **Создайте мобильное меню** с быстрыми действиями
5. **Добавьте геолокацию** для автоматического включения сценариев
6. **Реализуйте систему уведомлений** на основе времени
7. **Создайте планировщик** для устройств

---

## 📱 Референс - Примерный результат

### На десктопе (1200px+):
```
+---------------------------------------------------------+
|  [🏠 Умный Дом]       Навигация              [Тема]     |
+---------------------------------------------------------+
|                                                         |
|  [22.5°C] [45%] [1.2кВт] [Включено]                    |
|  Температура Влажность  Энергия    Безопасность        |
|                                                         |
|  +-------------------+  +------------------------+     |
|  | Активность        |  | Быстрые действия       |     |
|  | устройств         |  |                        |     |
|  |                   |  | [Все светильники]      |     |
|  | [💡] [❄️] [📺] [☕]|  | [Сценарий "Дома"]     |     |
|  |                   |  | [Сценарий "Ушел"]      |     |
|  +-------------------+  | [Сценарий "Ночь"]      |     |
|                         |                        |     |
|                         +------------------------+     |
|                                                         |
+---------------------------------------------------------+
```

### На планшете (768px):
```
+-----------------------------------+
| [🏠] Навигация [☰]               |
+-----------------------------------+
|                                   |
| [22.5°C]  [45%]                   |
| [1.2кВт]  [Включено]              |
|                                   |
| +-----------------------------+   |
| | Активность устройств        |   |
| |                             |   |
| +-----------------------------+   |
|                                   |
| +-----------------------------+   |
| | Быстрые действия            |   |
| |                             |   |
| +-----------------------------+   |
|                                   |
+-----------------------------------+
```

### На мобильном (360px):
```
+-------------------------+
| [🏠] [☰]               |
+-------------------------+
|                         |
| [22.5°C]                |
| [45%]                   |
| [1.2кВт]                |
| [Включено]              |
|                         |
| +-------------------+   |
| | Устройства        |   |
| |                   |   |
| +-------------------+   |
|                         |
| +-------------------+   |
| | Действия          |   |
| |                   |   |
| +-------------------+   |
|                         |
+-------------------------+
```

---

## 📚 Что ученики изучат на практике

1. **Bootstrap Grid System** - создание адаптивных макетов
2. **Компоненты Bootstrap** - карточки, кнопки, навигация, формы
3. **Адаптивный дизайн** - работа с разными размерами экранов
4. **JavaScript базовый** - обработка событий, изменение DOM
5. **Организация проекта** - структура файлов, многостраничность
6. **UI/UX принципы** - интуитивный интерфейс, визуальная иерархия

---

Удачи в проведении занятия! Этот проект позволит ученикам увидеть практическое применение Bootstrap и создать работающий прототип интерфейса "Умного дома" за одно занятие. 🎓✨