// ==============================
// НАСТРОЙКИ ИГРЫ
// ==============================

// Здесь вы можете настроить игру под себя:
const GAME_SETTINGS = {
    // Пороги для смены картинок (очки)
    imageThresholds: [10, 25, 50, 100, 200, 500],
    
    // Ссылки на ваши картинки (замените на свои)
    images: [
        "./images/2.png",
        "./images/3.png",
        "./images/4.png",
        "./images/5.png",
        "./images/6.png",
        "./images/7.png",
        "./images/8.png",
        "./images/9.png",
        "./images/10.png"
    ],
    
    // Названия картинок
    imageNames: [
        "Nidoqueen",
        "Картинка 2", 
        "Картинка 3",
        "Картинка 4",
        "Картинка 5",
        "Картинка 6",
        "Картинка 7"
    ]
};

// ==============================
// ПЕРЕМЕННЫЕ ИГРЫ
// ==============================

let score = 0; // Текущие очки
let currentImageIndex = 0; // Индекс текущей картинки
let nextThreshold = GAME_SETTINGS.imageThresholds[0]; // Порог для следующей картинки

// ==============================
// ПОЛУЧЕНИЕ ЭЛЕМЕНТОВ HTML
// ==============================

const scoreElement = document.getElementById('score');
const nextLevelCountElement = document.getElementById('next-level-count');
const mainImageElement = document.getElementById('main-image');
const imageNumberElement = document.getElementById('image-number');
const clickButton = document.getElementById('click-button');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');

// ==============================
// ФУНКЦИИ ИГРЫ
// ==============================

/**
 * Обновляет счетчик очков на экране
 */
function updateScore() {
    scoreElement.textContent = score;
}

/**
 * Обновляет отображение прогресса до следующей картинки
 */
function updateProgress() {
    // Вычисляем процент прогресса
    let progressPercent;
    
    if (currentImageIndex < GAME_SETTINGS.imageThresholds.length) {
        const prevThreshold = currentImageIndex === 0 ? 0 : GAME_SETTINGS.imageThresholds[currentImageIndex - 1];
        progressPercent = ((score - prevThreshold) / (nextThreshold - prevThreshold)) * 100;
    } else {
        // Если все картинки открыты
        progressPercent = 100;
    }
    
    // Ограничиваем процент от 0 до 100
    progressPercent = Math.min(Math.max(progressPercent, 0), 100);
    
    // Обновляем прогресс-бар
    progressFill.style.width = `${progressPercent}%`;
    progressText.textContent = `${Math.round(progressPercent)}%`;
}

/**
 * Обновляет информацию о следующей картинке
 */
function updateNextLevelInfo() {
    if (currentImageIndex < GAME_SETTINGS.imageThresholds.length) {
        nextLevelCountElement.textContent = nextThreshold;
    } else {
        nextLevelCountElement.textContent = "МАКСИМУМ!";
    }
}

/**
 * Проверяет, нужно ли сменить картинку
 */
function checkForImageChange() {
    // Если есть следующий порог и очки его достигли
    if (currentImageIndex < GAME_SETTINGS.imageThresholds.length && 
        score >= GAME_SETTINGS.imageThresholds[currentImageIndex]) {
        
        // Увеличиваем индекс картинки
        currentImageIndex++;
        
        // Если есть следующая картинка
        if (currentImageIndex < GAME_SETTINGS.images.length) {
            // Меняем картинку
            changeImage(currentImageIndex);
            
            // Обновляем следующий порог
            if (currentImageIndex < GAME_SETTINGS.imageThresholds.length) {
                nextThreshold = GAME_SETTINGS.imageThresholds[currentImageIndex];
            }
            
            // Создаем эффект смены картинки
            createImageChangeEffect();
        }
    }
}

/**
 * Меняет главную картинку
 * @param {number} imageIndex - Индекс новой картинки
 */
function changeImage(imageIndex) {
    mainImageElement.src = GAME_SETTINGS.images[imageIndex];
    imageNumberElement.textContent = GAME_SETTINGS.imageNames[imageIndex];
}

/**
 * Создает эффект при смене картинки
 */
function createImageChangeEffect() {
    // Добавляем класс для анимации
    mainImageElement.classList.add('image-change');
    
    // Убираем класс через 500мс
    setTimeout(() => {
        mainImageElement.classList.remove('image-change');
    }, 500);
    
    // Показываем сообщение
    alert(`🎉 Поздравляем! Открыта новая картинка: ${GAME_SETTINGS.imageNames[currentImageIndex]}!`);
}

/**
 * Обрабатывает клик по кнопке
 */
function handleClick() {
    // Увеличиваем счет
    score += 1;
    
    // Обновляем отображение
    updateScore();
    updateProgress();
    
    // Проверяем, нужно ли менять картинку
    checkForImageChange();
    updateNextLevelInfo();
    
    // Создаем эффект клика
    createClickEffect();
}

/**
 * Создает визуальный эффект при клике
 */
function createClickEffect() {
    // Создаем элемент для эффекта
    const effect = document.createElement('div');
    effect.className = 'click-effect';
    effect.textContent = '+1';
    effect.style.position = 'fixed';
    effect.style.color = '#667eea';
    effect.style.fontWeight = 'bold';
    effect.style.fontSize = '20px';
    effect.style.pointerEvents = 'none';
    effect.style.zIndex = '1000';
    
    // Позиционируем эффект рядом с кнопкой
    const buttonRect = clickButton.getBoundingClientRect();
    effect.style.left = `${buttonRect.left + buttonRect.width/2}px`;
    effect.style.top = `${buttonRect.top}px`;
    
    // Добавляем на страницу
    document.body.appendChild(effect);
    
    // Анимация эффекта
    let opacity = 1;
    let top = buttonRect.top;
    
    function animate() {
        opacity -= 0.02;
        top -= 2;
        
        effect.style.opacity = opacity;
        effect.style.top = `${top}px`;
        
        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            effect.remove();
        }
    }
    
    animate();
}

/**
 * Инициализирует игру
 */
function initGame() {
    console.log('🎮 Игра инициализирована!');
    console.log('Настройки игры:', GAME_SETTINGS);
    
    // Настраиваем начальные значения
    updateScore();
    updateNextLevelInfo();
    updateProgress();
    
    // Устанавливаем первую картинку
    changeImage(0);
    
    // Добавляем обработчик клика на кнопку
    clickButton.addEventListener('click', handleClick);
    
    // Добавляем обработчик для клавиши пробел
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
            event.preventDefault();
            handleClick();
        }
    });
    
    // Добавляем CSS для анимации смены картинки
    const style = document.createElement('style');
    style.textContent = `
        .image-change {
            animation: imageChange 0.5s ease;
        }
        
        @keyframes imageChange {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}

// ==============================
// ЗАПУСК ИГРЫ
// ==============================

// Запускаем игру, когда страница загрузится
window.addEventListener('load', initGame);

// ==============================
// ИНСТРУКЦИИ ДЛЯ НАСТРОЙКИ
// ==============================

/*
Как настроить игру под себя:

1. ЗАМЕНИТЕ КАРТИНКИ:
   В объекте GAME_SETTINGS в массиве images замените ссылки на свои картинки.
   Можно использовать:
   - Прямые ссылки на картинки в интернете
   - Относительные пути к файлам в вашей папке
   
   Пример:
   images: [
       "img/my-image-1.jpg",
       "img/my-image-2.jpg",
       "img/my-image-3.jpg"
   ]

2. НАСТРОЙТЕ ПОРОГИ:
   В массиве imageThresholds укажите, при каком количестве очков 
   будет меняться каждая следующая картинка.
   
   Пример для 5 картинок:
   imageThresholds: [50, 150, 300, 600, 1200]

3. ИЗМЕНИТЕ НАЗВАНИЯ КАРТИНОК:
   В массиве imageNames укажите названия для ваших картинок.

4. ДОБАВЬТЕ СВОИ КАРТИНКИ:
   - Создайте папку "img" в вашем проекте
   - Поместите туда ваши картинки
   - Обновите ссылки в массиве images
   
5. ЕСЛИ ХОТИТЕ БОЛЬШЕ КАРТИНОК:
   - Добавьте больше ссылок в массивы images и imageNames
   - Добавьте больше порогов в массив imageThresholds
*/

// Для тестирования можно добавить эту функцию:
function cheatAddPoints(points) {
    score += points;
    updateScore();
    updateProgress();
    checkForImageChange();
    updateNextLevelInfo();
    alert(`Добавлено ${points} очков!`);
}

// Чтобы использовать читы, откройте консоль браузера (F12)
// и введите: cheatAddPoints(1000)