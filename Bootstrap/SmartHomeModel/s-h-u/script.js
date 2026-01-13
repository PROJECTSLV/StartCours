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