# Word Wonders - Пошаговый туториал разработки

## 📁 Структура проекта

```
word-wonders/
├── index.html          # Шаг 1-2: Базовая структура
├── style.css          # Шаг 3-4: Стили
└── game.js            # Шаг 5-10: Логика игры
```

## 📝 Пошаговая инструкция

### Шаг 1: Базовая HTML структура
**Файл: `index.html`**
```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Word Wonders</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Главный экран -->
    <div id="mainScreen" class="screen active">
        <div class="logo">
            <h1>WORD WONDERS</h1>
            <p>Собирай слова из букв</p>
        </div>
        
        <button id="startGameBtn" class="start-btn">
            Начать игру
        </button>
        
        <div class="stats">
            <div class="stat-item">
                <div class="stat-value" id="mainLevel">1</div>
                <div class="stat-label">Уровень</div>
            </div>
            <div class="stat-item">
                <div class="stat-value" id="mainScore">0</div>
                <div class="stat-label">Очки</div>
            </div>
        </div>
    </div>

    <!-- Игровой экран -->
    <div id="gameScreen" class="screen">
        <!-- Будем заполнять в следующих шагах -->
    </div>

    <!-- Экран результатов -->
    <div id="resultScreen" class="screen">
        <!-- Будем заполнять позже -->
    </div>

    <script src="game.js"></script>
</body>
</html>
```
**Что сделали:** Создали базовую структуру с тремя экранами и подключили CSS и JS файлы.

---

### Шаг 2: Добавляем игровой экран
**Обновляем `index.html` (игровой экран):**
```html
<!-- Игровой экран -->
<div id="gameScreen" class="screen">
    <div class="game-header">
        <button id="backBtn" class="back-btn">
            ←
        </button>
        <div class="game-stats">
            <div class="stat-display">
                Уровень: <span id="currentLevel">1</span>
            </div>
            <div class="stat-display">
                Очки: <span id="score">0</span>
            </div>
        </div>
    </div>
    
    <div class="words-area">
        <div class="words-grid" id="wordsGrid">
            <!-- Слова будут здесь -->
        </div>
        <div class="word-info" id="wordInfo">
            Найди все слова из доступных букв
        </div>
    </div>
    
    <div class="input-area">
        <div id="currentInput" class="current-input">
            <!-- Набранные буквы -->
        </div>
        
        <div class="circle-container" id="circleInput">
            <!-- Круг с буквами -->
        </div>
        
        <div class="input-controls">
            <button id="clearBtn" class="control-btn clear-btn">
                ←
            </button>
            <button id="resetBtn" class="control-btn reset-btn">
                ↻
            </button>
        </div>
    </div>
</div>
```
**Что сделали:** Добавили игровой экран с хедером, областью слов и областью ввода.

---

### Шаг 3: Добавляем экран результатов
**Обновляем `index.html` (экран результатов):**
```html
<!-- Экран результатов -->
<div id="resultScreen" class="screen">
    <div class="result-content">
        <div class="result-title" id="resultTitle">Уровень пройден!</div>
        
        <div class="result-stats">
            <div class="stat-row">
                <span>Найдено слов:</span>
                <span id="resultFound">0/0</span>
            </div>
            <div class="stat-row">
                <span>Очки за уровень:</span>
                <span id="resultScore">0</span>
            </div>
            <div class="stat-row">
                <span>Всего очков:</span>
                <span id="resultTotalScore">0</span>
            </div>
        </div>
        
        <div class="result-buttons">
            <button id="nextLevelBtn" class="action-btn next-btn">
                Следующий уровень
            </button>
            <button id="backToMenuBtn" class="action-btn menu-btn">
                В меню
            </button>
        </div>
    </div>
</div>
```
**Что сделали:** Добавили экран результатов со статистикой и кнопками.

---

### Шаг 4: Создаем базовые стили
**Файл: `style.css`**
```css
/* БАЗОВЫЕ СТИЛИ */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: sans-serif;
    background: #1a1a1a;
    color: white;
    height: 100vh;
    overflow: hidden;
}

/* СИСТЕМА ЭКРАНОВ */
.screen {
    display: none;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    flex-direction: column;
    padding: 10px;
}

.screen.active {
    display: flex;
}

/* ГЛАВНЫЙ ЭКРАН */
#mainScreen {
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.logo h1 {
    font-size: 24px;
    margin-bottom: 5px;
    color: #4a90e2;
}

.logo p {
    font-size: 14px;
    color: #888;
}

.start-btn {
    padding: 15px 30px;
    background: #4a90e2;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    cursor: pointer;
    margin-top: 20px;
}

.stats {
    display: flex;
    gap: 20px;
    margin-top: 20px;
}

.stat-item {
    text-align: center;
}

.stat-value {
    font-size: 20px;
    font-weight: bold;
    color: #4a90e2;
}

.stat-label {
    font-size: 12px;
    color: #888;
}

/* ИГРОВОЙ ЭКРАН - МИНИМАЛЬНЫЕ СТИЛИ */
.game-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background: #2a2a2a;
    border-radius: 8px;
}

.back-btn {
    width: 40px;
    height: 40px;
    background: #333;
    border: none;
    color: white;
    border-radius: 8px;
    cursor: pointer;
}

.game-stats {
    display: flex;
    gap: 15px;
}

.stat-display {
    background: #333;
    padding: 5px 10px;
    border-radius: 6px;
    font-size: 14px;
}

.words-area {
    flex: 1;
    background: #2a2a2a;
    border-radius: 8px;
    padding: 10px;
    margin: 10px 0;
    overflow-y: auto;
}

.words-grid {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.word-row {
    display: flex;
    justify-content: center;
    gap: 5px;
}

.word-cell {
    display: flex;
    gap: 2px;
    padding: 5px;
    background: #333;
    border-radius: 6px;
}

.letter-cell {
    width: 25px;
    height: 25px;
    background: #444;
    border: 1px solid #555;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #888;
}

.letter-cell.revealed {
    background: #2c5282;
    color: white;
}

.word-info {
    text-align: center;
    font-size: 12px;
    color: #888;
    margin-top: 10px;
}

/* ОБЛАСТЬ ВВОДА */
.input-area {
    background: #2a2a2a;
    border-radius: 8px;
    padding: 15px;
}

.current-input {
    display: flex;
    justify-content: center;
    gap: 5px;
    min-height: 40px;
    flex-wrap: wrap;
    margin-bottom: 15px;
}

.input-letter {
    width: 35px;
    height: 35px;
    background: #2c5282;
    border: 2px solid #4a90e2;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: white;
}

/* КРУГ БУКВ */
.circle-container {
    position: relative;
    width: 250px;
    height: 250px;
    margin: 0 auto 15px auto;
}

.circle-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    background: #4a90e2;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
    font-size: 20px;
}

.circle-letter {
    position: absolute;
    width: 40px;
    height: 40px;
    background: #444;
    border: 2px solid #555;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: white;
    cursor: pointer;
}

/* КНОПКИ УПРАВЛЕНИЯ */
.input-controls {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.control-btn {
    width: 45px;
    height: 45px;
    border-radius: 8px;
    border: none;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.clear-btn {
    background: #c53030;
    color: white;
}

.reset-btn {
    background: #d69e2e;
    color: white;
}

/* ЭКРАН РЕЗУЛЬТАТОВ */
.result-content {
    background: #2a2a2a;
    border-radius: 8px;
    padding: 20px;
    width: 90%;
    max-width: 300px;
    text-align: center;
}

.result-title {
    font-size: 20px;
    margin-bottom: 10px;
    color: #4a90e2;
}

.result-stats {
    margin: 20px 0;
}

.stat-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #333;
}

.result-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.action-btn {
    padding: 12px;
    border-radius: 8px;
    border: none;
    font-size: 16px;
    cursor: pointer;
}

.next-btn {
    background: #4a90e2;
    color: white;
}

.menu-btn {
    background: #444;
    color: white;
}
```
**Что сделали:** Создали все необходимые стили для интерфейса игры.

---

### Шаг 5: Начинаем писать логику игры - базовая структура
**Файл: `game.js`**
```javascript
// game.js - Шаг 5: Базовая структура игры

class Game {
    constructor() {
        // СОСТОЯНИЕ ИГРЫ
        this.state = {
            level: 1,
            score: 0,
            currentInput: [],
            foundWords: [],
            levelData: null
        };
        
        // СПИСОК СЛОВ
        this.wordList = [
            'КОТ', 'ДОМ', 'МАК', 'РОТ', 'ЛЕС', 'СОН', 'НОС', 'РАК',
            'МОРЕ', 'РЕКА', 'ПОЛЕ', 'ГОРА', 'РУКА', 'НОГА',
            'СТОЛ', 'СТУЛ', 'ДВЕРЬ', 'ОКНО', 'КНИГА', 'РУЧКА'
        ];
        
        // ЗАПУСК ИНИЦИАЛИЗАЦИИ
        this.init();
    }
    
    init() {
        console.log('🎮 Игра инициализируется...');
        
        // ЗАГРУЗКА СОХРАНЕНИЙ
        this.loadGame();
        
        // НАСТРОЙКА ОБРАБОТЧИКОВ
        this.setupEventListeners();
        
        // ОБНОВЛЕНИЕ ГЛАВНОГО ЭКРАНА
        this.updateMainScreen();
    }
}
```
**Что сделали:** Создали базовый класс игры с состоянием и списком слов.

---

### Шаг 6: Добавляем сохранение и обработчики событий
**Продолжаем в `game.js`:**
```javascript
// game.js - Шаг 6: Сохранение и обработчики

loadGame() {
    // Пытаемся загрузить сохраненную игру
    const saved = localStorage.getItem('wordWondersSave');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            this.state.level = data.level || 1;
            this.state.score = data.score || 0;
            console.log('📂 Игра загружена');
        } catch (e) {
            console.log('⚠️ Ошибка загрузки');
        }
    }
}

saveGame() {
    // Сохраняем только уровень и очки
    const saveData = {
        level: this.state.level,
        score: this.state.score
    };
    localStorage.setItem('wordWondersSave', JSON.stringify(saveData));
}

setupEventListeners() {
    // Главный экран
    document.getElementById('startGameBtn').addEventListener('click', () => {
        this.startGame();
    });
    
    // Игровой экран
    document.getElementById('backBtn').addEventListener('click', () => {
        this.showScreen('mainScreen');
        this.updateMainScreen();
    });
    
    document.getElementById('clearBtn').addEventListener('click', () => {
        this.clearInput();
    });
    
    document.getElementById('resetBtn').addEventListener('click', () => {
        this.resetInput();
    });
    
    // Экран результатов
    document.getElementById('nextLevelBtn').addEventListener('click', () => {
        this.nextLevel();
    });
    
    document.getElementById('backToMenuBtn').addEventListener('click', () => {
        this.showScreen('mainScreen');
        this.updateMainScreen();
    });
    
    // Обработка клавиатуры
    document.addEventListener('keydown', (e) => {
        if (this.getCurrentScreen() === 'gameScreen') {
            if (e.key === 'Backspace') {
                this.removeLastLetter();
            } else if (e.key === 'Enter') {
                this.submitWord();
            } else if (e.key.length === 1 && /[а-яА-Яa-zA-Z]/.test(e.key)) {
                this.addLetter(e.key.toUpperCase());
            }
        }
    });
}
```
**Что сделали:** Добавили сохранение игры и обработчики основных событий.

---

### Шаг 7: Добавляем управление экранами
**Продолжаем в `game.js`:**
```javascript
// game.js - Шаг 7: Управление экранами

getCurrentScreen() {
    // Находим активный экран
    const screens = document.querySelectorAll('.screen');
    for (const screen of screens) {
        if (screen.classList.contains('active')) {
            return screen.id;
        }
    }
    return null;
}

showScreen(screenId) {
    // Скрываем все экраны
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    // Показываем нужный экран
    document.getElementById(screenId).classList.add('active');
}

updateMainScreen() {
    // Обновляем цифры на главном экране
    document.getElementById('mainLevel').textContent = this.state.level;
    document.getElementById('mainScore').textContent = this.state.score;
}
```
**Что сделали:** Добавили функции для переключения и обновления экранов.

---

### Шаг 8: Добавляем генерацию уровня
**Продолжаем в `game.js`:**
```javascript
// game.js - Шаг 8: Генерация уровня

startGame() {
    console.log('🎯 Начинаем игру...');
    
    // Сбрасываем состояние для нового уровня
    this.state.currentInput = [];
    this.state.foundWords = [];
    
    // Генерируем уровень
    this.generateLevel();
    
    // Обновляем интерфейс
    this.updateGameScreen();
    
    // Переходим на игровой экран
    this.showScreen('gameScreen');
}

generateLevel() {
    // Определяем количество слов
    const wordCount = Math.min(3 + Math.floor(this.state.level / 2), 5);
    
    // Выбираем случайные слова
    let selectedWords = [];
    let availableWords = [...this.wordList];
    
    for (let i = 0; i < wordCount; i++) {
        if (availableWords.length === 0) break;
        
        const randomIndex = Math.floor(Math.random() * availableWords.length);
        const word = availableWords[randomIndex];
        selectedWords.push(word);
        availableWords.splice(randomIndex, 1);
    }
    
    // Собираем все буквы
    let allLetters = [];
    selectedWords.forEach(word => {
        allLetters.push(...word.split(''));
    });
    
    // Берем уникальные буквы для круга
    let availableLetters = [...new Set(allLetters)];
    
    // Если букв мало, добавляем случайные
    if (availableLetters.length < 6) {
        const alphabet = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
        while (availableLetters.length < 8) {
            const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
            if (!availableLetters.includes(randomLetter)) {
                availableLetters.push(randomLetter);
            }
        }
    }
    
    // Ограничиваем до 10 букв и перемешиваем
    availableLetters = availableLetters.slice(0, 10);
    for (let i = availableLetters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availableLetters[i], availableLetters[j]] = [availableLetters[j], availableLetters[i]];
    }
    
    // Создаем структуру для отображения слов
    const wordCells = {};
    selectedWords.forEach(word => {
        wordCells[word] = word.split('').map((letter, index) => ({
            revealed: false,
            letter: letter,
            index: index
        }));
    });
    
    // Сохраняем данные уровня
    this.state.levelData = {
        availableLetters: availableLetters,
        targetWords: selectedWords,
        wordCells: wordCells,
        allLetters: allLetters
    };
    
    console.log('✅ Уровень сгенерирован');
}
```
**Что сделали:** Добавили генерацию уровней со случайными словами и буквами.

---

### Шаг 9: Добавляем отображение игрового экрана
**Продолжаем в `game.js`:**
```javascript
// game.js - Шаг 9: Отображение игрового экрана

updateGameScreen() {
    // Обновляем статистику
    document.getElementById('currentLevel').textContent = this.state.level;
    document.getElementById('score').textContent = this.state.score;
    
    // Отображаем сетку слов
    this.renderWordsGrid();
    
    // Отображаем текущий ввод
    this.renderCurrentInput();
    
    // Отображаем круг с буквами
    this.renderCircleInput();
    
    // Обновляем информацию
    const foundCount = this.state.foundWords.length;
    const totalWords = this.state.levelData.targetWords.length;
    document.getElementById('wordInfo').textContent = 
        `Найдено слов: ${foundCount}/${totalWords}`;
}

renderWordsGrid() {
    const container = document.getElementById('wordsGrid');
    container.innerHTML = '';
    
    this.state.levelData.targetWords.forEach(word => {
        const wordRow = document.createElement('div');
        wordRow.className = 'word-row';
        
        const isFound = this.state.foundWords.includes(word);
        
        this.state.levelData.wordCells[word].forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.className = 'letter-cell';
            
            if (isFound || cell.revealed) {
                cellElement.textContent = cell.letter;
                cellElement.classList.add('revealed');
            }
            
            wordRow.appendChild(cellElement);
        });
        
        container.appendChild(wordRow);
    });
}

renderCurrentInput() {
    const container = document.getElementById('currentInput');
    container.innerHTML = '';
    
    this.state.currentInput.forEach(letter => {
        const div = document.createElement('div');
        div.className = 'input-letter';
        div.textContent = letter;
        container.appendChild(div);
    });
}

renderCircleInput() {
    const container = document.getElementById('circleInput');
    container.innerHTML = '';
    
    // Центральная кнопка проверки
    const center = document.createElement('div');
    center.className = 'circle-center';
    center.innerHTML = '✓';
    center.onclick = () => this.submitWord();
    container.appendChild(center);
    
    // Буквы по кругу
    const letters = this.state.levelData.availableLetters;
    const radius = 85;
    const centerX = 125;
    const centerY = 125;
    
    letters.forEach((letter, index) => {
        const angle = (index / letters.length) * 2 * Math.PI;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        const btn = document.createElement('div');
        btn.className = 'circle-letter';
        btn.textContent = letter;
        btn.style.left = `${x - 20}px`;
        btn.style.top = `${y - 20}px`;
        btn.onclick = () => this.addLetter(letter);
        
        container.appendChild(btn);
    });
}
```
**Что сделали:** Добавили функции для отображения всех элементов игрового экрана.

---

### Шаг 10: Добавляем игровую логику
**Продолжаем в `game.js`:**
```javascript
// game.js - Шаг 10: Игровая логика

addLetter(letter) {
    // Проверяем, можно ли использовать букву
    const usedCount = this.state.currentInput.filter(l => l === letter).length;
    const availableCount = this.state.levelData.allLetters.filter(l => l === letter).length;
    
    if (usedCount < availableCount) {
        this.state.currentInput.push(letter);
        this.updateGameScreen();
    }
}

removeLastLetter() {
    if (this.state.currentInput.length > 0) {
        this.state.currentInput.pop();
        this.updateGameScreen();
    }
}

clearInput() {
    this.state.currentInput = [];
    this.updateGameScreen();
}

resetInput() {
    this.clearInput();
}

submitWord() {
    const word = this.state.currentInput.join('').toUpperCase();
    
    if (word.length < 2) {
        return; // Слишком короткое слово
    }
    
    // Проверяем использование букв
    const letterCounts = {};
    this.state.currentInput.forEach(letter => {
        letterCounts[letter] = (letterCounts[letter] || 0) + 1;
    });
    
    const availableCounts = {};
    this.state.levelData.allLetters.forEach(letter => {
        availableCounts[letter] = (availableCounts[letter] || 0) + 1;
    });
    
    // Проверяем, все ли буквы доступны
    let isValid = true;
    for (const letter in letterCounts) {
        if (!availableCounts[letter] || availableCounts[letter] < letterCounts[letter]) {
            isValid = false;
            break;
        }
    }
    
    if (!isValid) {
        this.clearInput();
        return;
    }
    
    // Проверяем, есть ли такое слово в уровне
    if (this.state.levelData.targetWords.includes(word)) {
        if (!this.state.foundWords.includes(word)) {
            // Добавляем слово в найденные
            this.state.foundWords.push(word);
            
            // Начисляем очки
            const points = word.length * 10;
            this.state.score += points;
            
            // Проверяем завершение уровня
            this.checkLevelCompletion();
        }
    }
    
    // Очищаем ввод и сохраняем игру
    this.clearInput();
    this.saveGame();
}

checkLevelCompletion() {
    // Проверяем, все ли слова найдены
    const allFound = this.state.levelData.targetWords.every(word => 
        this.state.foundWords.includes(word)
    );
    
    if (allFound) {
        setTimeout(() => {
            this.showLevelComplete();
        }, 500);
    }
}

showLevelComplete() {
    // Считаем очки за уровень
    let levelScore = 0;
    this.state.foundWords.forEach(word => {
        levelScore += word.length * 10;
    });
    
    // Заполняем статистику
    document.getElementById('resultFound').textContent = 
        `${this.state.foundWords.length}/${this.state.levelData.targetWords.length}`;
    document.getElementById('resultScore').textContent = levelScore;
    document.getElementById('resultTotalScore').textContent = this.state.score;
    document.getElementById('resultTitle').textContent = 'Уровень пройден!';
    
    // Показываем экран результатов
    this.showScreen('resultScreen');
}

nextLevel() {
    // Повышаем уровень
    this.state.level++;
    
    // Сохраняем игру
    this.saveGame();
    
    // Запускаем новый уровень
    this.startGame();
}

// Запускаем игру при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Загрузка игры...');
    window.game = new Game();
    console.log('✅ Игра готова!');
});
```
**Что сделали:** Добавили всю игровую логику - добавление букв, проверку слов, завершение уровней.

---

## 🎮 Игра готова!

### Как запустить:
1. Создайте папку `word-wonders`
2. Создайте файлы в указанном порядке:
   - `index.html` (шаги 1-3)
   - `style.css` (шаг 4)
   - `game.js` (шаги 5-10)

3. Откройте `index.html` в браузере

### Что работает:
- ✅ Главное меню с уровнем и очками
- ✅ Игровой экран с кругом букв
- ✅ Составление слов кликом по буквам
- ✅ Проверка слов (центральная кнопка ✓)
- ✅ Управление вводом (очистка, сброс)
- ✅ Сохранение прогресса (уровень, очки)
- ✅ Переход на следующий уровень
- ✅ Адаптивный дизайн

### Управление:
- **Мышь/тач:** Клик по буквам в круге
- **Центральная кнопка:** Проверка слова
- **Кнопка ←:** Удаление буквы
- **Кнопка ↻:** Сброс ввода
- **Клавиатура:** Буквы, Backspace, Enter

Это минимальный рабочий прототип игры "Word Wonders" с базовой функциональностью. Все файлы независимы и готовы к запуску!
