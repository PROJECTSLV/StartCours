# Урок 3: Создание игровой логики и системы уровней

## 📋 Что мы будем создавать в этом уроке

Теперь, когда у нас есть красивый интерфейс, пора добавить **"мозг"** игры! Мы создадим:
1. **Генератор уровней** — чтобы каждый уровень был уникальным и интересным
2. **Логику проверки слов** — систему, которая определяет, правильно ли игрок составил слово
3. **Систему очков и бонусов** — подсчет очков, подсказки, открытие букв
4. **Менеджер интерфейса** — свяжем логику с отображением на экране

---

## 🎯 Цель урока
Создать полную игровую логику, чтобы наша игра наконец-то заработала! Игрок должен:
- Видеть сгенерированные слова и буквы
- Составлять слова из доступных букв
- Получать очки за правильные слова
- Использовать подсказки и бонусы
- Переходить на новые уровни

---

## 📁 Шаг 1: Создание генератора уровней

### 1.1 Создаем файл js/level-generator.js
Этот файл будет отвечать за создание уровней для игры:

```javascript
// js/level-generator.js
// =====================
// В этом файле генерируем уровни для игры (слова и буквы)

const LevelGenerator = {
    // ГЕНЕРАЦИЯ БЕСКОНЕЧНОГО УРОВНЯ
    generateInfiniteLevel(level, wordList) {
        console.log(`🎲 Генерируем бесконечный уровень ${level}...`);
        
        // 1. ОПРЕДЕЛЯЕМ СЛОЖНОСТЬ
        // Чем выше уровень, тем больше слов
        const baseDifficulty = Math.min(2 + Math.floor(level / 3), 5);
        const wordCount = baseDifficulty;
        console.log(`📊 Сложность: ${wordCount} слов`);
        
        // 2. ВЫБИРАЕМ ПЕРВОЕ СЛОВО
        let selectedWords = [];
        let availableLetters = [];
        let allLetters = [];
        
        // Берем случайное слово из списка
        const startWordIndex = Math.floor(Math.random() * wordList.length);
        const startWord = wordList[startWordIndex];
        selectedWords.push(startWord);
        console.log(`✨ Первое слово: ${startWord}`);
        
        // 3. ДОБАВЛЯЕМ БУКВЫ ПЕРВОГО СЛОВА
        const startWordLetters = startWord.split('');
        allLetters.push(...startWordLetters); // Все буквы (с повторами)
        availableLetters = Utils.getUnique(startWordLetters); // Уникальные буквы
        console.log(`🔤 Буквы первого слова: ${availableLetters.join(', ')}`);
        
        // 4. ИЩЕМ СЛОВА, КОТОРЫЕ МОЖНО СОСТАВИТЬ ИЗ ЭТИХ БУКВ
        let availableWords = wordList.filter(word => {
            if (selectedWords.includes(word)) return false; // Уже выбрали
            
            // Считаем доступные буквы
            const availableCounts = Utils.countOccurrences(allLetters);
            
            // Проверяем, можно ли составить слово
            return Utils.canFormWord(word, availableLetters, availableCounts);
        });
        console.log(`📝 Доступно слов для добавления: ${availableWords.length}`);
        
        // 5. ДОБАВЛЯЕМ ДОПОЛНИТЕЛЬНЫЕ СЛОВА
        for (let i = 1; i < wordCount && availableWords.length > 0; i++) {
            const randomIndex = Math.floor(Math.random() * availableWords.length);
            const word = availableWords[randomIndex];
            
            selectedWords.push(word);
            allLetters.push(...word.split(''));
            availableLetters = Utils.getUnique(allLetters);
            
            console.log(`➕ Добавляем слово: ${word}`);
            
            // Обновляем список доступных слов
            availableWords = availableWords.filter(w => w !== word);
            availableWords = availableWords.filter(word => {
                const availableCounts = Utils.countOccurrences(allLetters);
                return Utils.canFormWord(word, availableLetters, availableCounts);
            });
        }
        
        // 6. ЕСЛИ СЛОВ МАЛО, ДОБАВЛЯЕМ С МИНИМАЛЬНЫМ ДОБАВЛЕНИЕМ БУКВ
        while (selectedWords.length < wordCount) {
            console.log(`⚠️  Слов мало (${selectedWords.length}/${wordCount}), ищем дополнительные...`);
            
            let bestWord = null;
            let bestNewLetters = Infinity;
            
            // Ищем слово с минимальным количеством новых букв
            wordList.forEach(word => {
                if (selectedWords.includes(word)) return;
                
                const wordLetters = word.split('');
                const newLetters = wordLetters.filter(letter => 
                    !allLetters.includes(letter)
                ).length;
                
                if (newLetters < bestNewLetters && newLetters <= 2) {
                    bestNewLetters = newLetters;
                    bestWord = word;
                }
            });
            
            if (bestWord) {
                selectedWords.push(bestWord);
                allLetters.push(...bestWord.split(''));
                availableLetters = Utils.getUnique(allLetters);
                console.log(`🎯 Добавляем слово с минимальными новыми буквами: ${bestWord}`);
            } else {
                // Если не нашли подходящее, берем любое
                const remainingWords = wordList.filter(word => !selectedWords.includes(word));
                if (remainingWords.length > 0) {
                    const randomWord = remainingWords[Math.floor(Math.random() * remainingWords.length)];
                    selectedWords.push(randomWord);
                    allLetters.push(...randomWord.split(''));
                    availableLetters = Utils.getUnique(allLetters);
                    console.log(`🎲 Добавляем случайное слово: ${randomWord}`);
                } else {
                    break; // Слова закончились
                }
            }
        }
        
        // 7. ОГРАНИЧИВАЕМ КОЛИЧЕСТВО БУКВ В КРУГЕ ДО 10
        if (availableLetters.length > 10) {
            console.log(`⚠️  Слишком много букв (${availableLetters.length}), ограничиваем до 10...`);
            
            // Считаем частоту букв
            const letterFrequency = {};
            allLetters.forEach(letter => {
                letterFrequency[letter] = (letterFrequency[letter] || 0) + 1;
            });
            
            // Берем 10 самых частых букв
            availableLetters = Object.keys(letterFrequency)
                .sort((a, b) => letterFrequency[b] - letterFrequency[a])
                .slice(0, 10);
                
            console.log(`🎯 Самые частые буквы: ${availableLetters.join(', ')}`);
        }
        
        // 8. ПЕРЕМЕШИВАЕМ БУКВЫ
        availableLetters = Utils.shuffleArray(availableLetters);
        console.log(`🔀 Перемешанные буквы: ${availableLetters.join(', ')}`);
        
        // 9. СОЗДАЕМ ЯЧЕЙКИ ДЛЯ ОТОБРАЖЕНИЯ СЛОВ
        const wordCells = {};
        selectedWords.forEach(word => {
            wordCells[word] = word.split('').map((letter, index) => ({
                revealed: false,    // Буква еще не открыта
                letter: letter,     // Сама буква
                index: index        // Позиция в слове
            }));
        });
        
        // 10. СОБИРАЕМ ВСЕ ДАННЫЕ УРОВНЯ
        const levelData = {
            availableLetters: availableLetters,  // Буквы для круга
            targetWords: selectedWords,          // Слова, которые нужно найти
            wordCells: wordCells,                // Данные для отображения слов
            allLetters: allLetters,              // Все буквы (с повторениями)
            maxAttempts: Math.max(allLetters.length * 2, 15) // Попытки
        };
        
        console.log(`✅ Уровень сгенерирован!`);
        console.log(`📊 Слова: ${selectedWords.join(', ')}`);
        console.log(`🔤 Всего букв: ${allLetters.length}`);
        console.log(`🎯 Попыток: ${levelData.maxAttempts}`);
        
        return levelData;
    },
    
    // ГЕНЕРАЦИЯ ЕЖЕДНЕВНОГО УРОВНЯ
    generateDailyLevel() {
        console.log('📅 Генерируем ежедневный уровень...');
        
        // 1. ВЫБИРАЕМ ТЕМУ ДЛЯ СЕГОДНЯ
        const themeIndex = Utils.getDailyThemeIndex();
        const theme = WORD_LIST.dailyThemes[themeIndex];
        console.log(`🎭 Тема дня: ${theme.name}`);
        console.log(`📝 Слова: ${theme.words.join(', ')}`);
        
        // 2. СОБИРАЕМ ВСЕ БУКВЫ ИЗ ВСЕХ СЛОВ
        const allLetters = [];
        theme.words.forEach(word => {
            allLetters.push(...word.split(''));
        });
        console.log(`🔤 Все буквы (с повторами): ${allLetters.length}`);
        
        // 3. БЕРЕМ БУКВЫ ДЛЯ КРУГА (ОГРАНИЧИВАЕМ 10)
        let availableLetters = theme.letters.slice(0, 10);
        console.log(`🎯 Исходные буквы для круга: ${availableLetters.join(', ')}`);
        
        // 4. ПРОВЕРЯЕМ, ЧТО ВСЕ СЛОВА МОЖНО СОСТАВИТЬ
        theme.words.forEach(word => {
            const wordLetters = word.split('');
            const letterCounts = Utils.countOccurrences(wordLetters);
            
            // Для каждой буквы в слове проверяем, достаточно ли её в круге
            for (const letter in letterCounts) {
                const availableCount = availableLetters.filter(l => l === letter).length;
                const neededCount = letterCounts[letter];
                
                // Если буквы не хватает, добавляем
                if (availableCount < neededCount) {
                    console.log(`➕ Добавляем букву "${letter}" (нужно ${neededCount}, есть ${availableCount})`);
                    
                    for (let i = availableCount; i < neededCount && availableLetters.length < 10; i++) {
                        availableLetters.push(letter);
                    }
                }
            }
        });
        
        console.log(`✅ Финальные буквы для круга: ${availableLetters.join(', ')}`);
        
        // 5. СОЗДАЕМ ЯЧЕЙКИ ДЛЯ ОТОБРАЖЕНИЯ
        const wordCells = {};
        theme.words.forEach(word => {
            wordCells[word] = word.split('').map((letter, index) => ({
                revealed: false,
                letter: letter,
                index: index
            }));
        });
        
        // 6. СОБИРАЕМ ДАННЫЕ УРОВНЯ
        const levelData = {
            availableLetters: availableLetters,
            targetWords: theme.words,
            wordCells: wordCells,
            allLetters: allLetters,
            maxAttempts: Math.max(allLetters.length * 2, 20),
            themeName: theme.name
        };
        
        console.log(`📊 Ежедневный уровень готов!`);
        console.log(`🎯 Попыток: ${levelData.maxAttempts}`);
        
        return levelData;
    }
};

// Делаем доступным глобально
window.LevelGenerator = LevelGenerator;
```

**Объяснение генератора уровней:**
1. **Определяем сложность** — на основе уровня игрока
2. **Выбираем первое слово** — случайно из списка
3. **Добавляем совместимые слова** — которые можно составить из тех же букв
4. **Балансируем буквы** — ограничиваем до 10 самых частых
5. **Создаем структуру для отображения** — готовим данные для интерфейса

---

### 🧪 Тест 1: Проверяем генератор уровней
Добавьте в тестовый код в конце `index.html`:

```html
<script>
console.log('🎲 Тестируем генератор уровней:');

// 1. Тестируем бесконечный уровень
console.log('=== ТЕСТ БЕСКОНЕЧНОГО УРОВНЯ ===');
const infiniteLevel = LevelGenerator.generateInfiniteLevel(1, WORD_LIST.common);
console.log('📊 Результат:', infiniteLevel);

// 2. Тестируем ежедневный уровень
console.log('=== ТЕСТ ЕЖЕДНЕВНОГО УРОВНЯ ===');
const dailyLevel = LevelGenerator.generateDailyLevel();
console.log('📊 Результат:', dailyLevel);

// 3. Проверяем, что все слова можно составить из доступных букв
function testLevelValidity(levelData) {
    console.log('🔍 Проверяем валидность уровня...');
    
    let allValid = true;
    
    levelData.targetWords.forEach(word => {
        const wordLetters = word.split('');
        const wordCounts = Utils.countOccurrences(wordLetters);
        const availableCounts = Utils.countOccurrences(levelData.allLetters);
        
        for (const letter in wordCounts) {
            if (!availableCounts[letter] || availableCounts[letter] < wordCounts[letter]) {
                console.error(`❌ Слово "${word}" нельзя составить! Не хватает буквы "${letter}"`);
                allValid = false;
            }
        }
        
        if (allValid) {
            console.log(`✅ Слово "${word}" можно составить`);
        }
    });
    
    return allValid;
}

console.log('🧪 Проверяем бесконечный уровень:');
testLevelValidity(infiniteLevel);

console.log('🧪 Проверяем ежедневный уровень:');
testLevelValidity(dailyLevel);
</script>
```

**Что должно быть в консоли:**
1. Подробный процесс генерации уровня
2. Итоговые данные уровня
3. Проверку, что все слова можно составить из доступных букв

---

## 🎮 Шаг 2: Создание менеджера интерфейса

### 2.1 Создаем файл js/ui-manager.js
Этот файл будет связывать логику игры с отображением на экране:

```javascript
// js/ui-manager.js
// =================
// В этом файле управляем отображением игры на экране

const UIManager = {
    // ОБНОВЛЕНИЕ ГЛАВНОГО ЭКРАНА
    updateMainScreen(gameState) {
        console.log('🏠 Обновляем главный экран...');
        
        // 1. ОБНОВЛЯЕМ ЦИФРЫ
        document.getElementById('mainLevel').textContent = gameState.level;
        document.getElementById('mainHints').textContent = gameState.hints;
        document.getElementById('mainAttempts').textContent = gameState.revealAttempts;
        
        // 2. ОБНОВЛЯЕМ СТАТУС ЕЖЕДНЕВНОЙ ИГРЫ
        const dailyBtn = document.getElementById('dailyMode');
        const dailyStatus = document.getElementById('dailyStatus');
        
        if (gameState.dailyCompleted) {
            dailyStatus.textContent = 'Пройдено';
            dailyStatus.className = 'mode-status status-completed';
            dailyBtn.disabled = true;
            console.log('📅 Ежедневная игра уже пройдена');
        } else {
            dailyStatus.textContent = 'Доступно';
            dailyStatus.className = 'mode-status status-available';
            dailyBtn.disabled = false;
            console.log('📅 Ежедневная игра доступна');
        }
    },
    
    // ОБНОВЛЕНИЕ ИГРОВОГО ЭКРАНА
    updateGameScreen(gameState) {
        console.log('🎮 Обновляем игровой экран...');
        
        if (!gameState.levelData) {
            console.error('❌ Нет данных уровня!');
            return;
        }
        
        // 1. ОБНОВЛЯЕМ СТАТИСТИКУ В ХЕДЕРЕ
        document.getElementById('currentLevel').textContent = gameState.level;
        document.getElementById('score').textContent = gameState.score;
        
        // 2. ОБНОВЛЯЕМ ПОПЫТКИ
        const remainingAttempts = gameState.levelData.maxAttempts - gameState.attemptsUsed;
        document.getElementById('remainingAttempts').textContent = remainingAttempts;
        document.getElementById('totalLetters').textContent = gameState.levelData.maxAttempts;
        
        // 3. ОБНОВЛЯЕМ ИНФОРМАЦИЮ О СЛОВАХ
        const foundCount = gameState.foundWords.length;
        const totalWords = gameState.levelData.targetWords.length;
        document.getElementById('wordInfo').textContent = 
            `Найдено слов: ${foundCount}/${totalWords}`;
            
        console.log(`📊 Статистика обновлена: ${foundCount}/${totalWords} слов, ${remainingAttempts} попыток`);
    },
    
    // ОТОБРАЖЕНИЕ СЕТКИ СЛОВ (загаданных слов)
    renderWordsGrid(gameState) {
        console.log('📝 Отображаем сетку слов...');
        
        const container = document.getElementById('wordsGrid');
        container.innerHTML = ''; // Очищаем контейнер
        
        if (!gameState.levelData || !gameState.levelData.targetWords) {
            console.error('❌ Нет данных для отображения слов');
            return;
        }
        
        // ДЛЯ КАЖДОГО ЗАГАДАННОГО СЛОВА
        gameState.levelData.targetWords.forEach(word => {
            const wordRow = document.createElement('div');
            wordRow.className = 'word-row';
            
            // Проверяем, найдено ли это слово
            const isFound = gameState.foundWords.includes(word);
            
            // СОЗДАЕМ ЯЧЕЙКИ ДЛЯ КАЖДОЙ БУКВЫ
            gameState.levelData.wordCells[word].forEach((cell, index) => {
                const cellElement = document.createElement('div');
                cellElement.className = 'letter-cell';
                
                // Если слово найдено или буква открыта через подсказку
                if (isFound || cell.revealed) {
                    cellElement.textContent = cell.letter;
                    cellElement.classList.add('revealed');
                    console.log(`🔓 Отображаем букву "${cell.letter}" слова "${word}"`);
                } else {
                    console.log(`🔒 Скрываем букву "${cell.letter}" слова "${word}"`);
                }
                
                wordRow.appendChild(cellElement);
            });
            
            container.appendChild(wordRow);
        });
        
        console.log(`✅ Отображено ${gameState.levelData.targetWords.length} слов`);
    },
    
    // ОТОБРАЖЕНИЕ ТЕКУЩЕГО ВВОДА (буквы, которые игрок набрал)
    renderCurrentInput(gameState) {
        console.log('⌨️  Отображаем текущий ввод...');
        
        const container = document.getElementById('currentInput');
        container.innerHTML = ''; // Очищаем
        
        // СОЗДАЕМ ДИВ ДЛЯ КАЖДОЙ НАБРАННОЙ БУКВЫ
        gameState.currentInput.forEach(letter => {
            const div = document.createElement('div');
            div.className = 'input-letter';
            div.textContent = letter;
            container.appendChild(div);
        });
        
        console.log(`✅ Отображено ${gameState.currentInput.length} набранных букв`);
    },
    
    // ОТОБРАЖЕНИЕ КРУГА С БУКВАМИ
    renderCircleInput(gameState) {
        console.log('🔵 Отображаем круг с буквами...');
        
        const container = document.getElementById('circleInput');
        container.innerHTML = ''; // Очищаем
        
        if (!gameState.levelData || !gameState.levelData.availableLetters) {
            console.error('❌ Нет данных для отображения круга');
            return;
        }
        
        // 1. СОЗДАЕМ ЦЕНТРАЛЬНУЮ КНОПКУ ПОДТВЕРЖДЕНИЯ
        const center = document.createElement('div');
        center.className = 'circle-center';
        center.innerHTML = '<i class="fas fa-check"></i>';
        center.title = 'Проверить слово';
        container.appendChild(center);
        
        console.log('✅ Центральная кнопка создана');
        
        // 2. СОЗДАЕМ БУКВЫ ВОКРУГ ЦЕНТРА
        const letters = gameState.levelData.availableLetters;
        const radius = 75;    // Радиус круга в пикселях
        const centerX = 110;  // Центр по X
        const centerY = 110;  // Центр по Y
        
        console.log(`🔤 Располагаем ${letters.length} букв по кругу`);
        
        letters.forEach((letter, index) => {
            // ВЫЧИСЛЯЕМ УГОЛ ДЛЯ ЭТОЙ БУКВЫ
            // Разделяем полный круг (2π радиан) на количество букв
            const angle = (index / letters.length) * 2 * Math.PI;
            
            // ВЫЧИСЛЯЕМ КООРДИНАТЫ БУКВЫ
            // Используем тригонометрию: x = центр + радиус * cos(угол)
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            
            // СОЗДАЕМ ЭЛЕМЕНТ БУКВЫ
            const btn = document.createElement('div');
            btn.className = 'circle-letter';
            btn.textContent = letter;
            btn.style.left = `${x - 18}px`; // 18 = половина ширины (36/2)
            btn.style.top = `${y - 18}px`;  // 18 = половина высоты (36/2)
            btn.title = `Набрать букву ${letter}`;
            
            container.appendChild(btn);
        });
        
        console.log('✅ Круг с буквами создан');
    },
    
    // ПОКАЗАТЬ ЭКРАН ПОБЕДЫ
    showLevelComplete(gameState) {
        console.log('🏆 Показываем экран победы...');
        
        if (!gameState.levelData) return;
        
        // 1. ЗАПОЛНЯЕМ СТАТИСТИКУ
        document.getElementById('resultFound').textContent = 
            `${gameState.foundWords.length}/${gameState.levelData.targetWords.length}`;
        document.getElementById('resultScore').textContent = gameState.score;
        document.getElementById('resultAttempts').textContent = 
            gameState.levelData.maxAttempts - gameState.attemptsUsed;
        document.getElementById('resultNextLevel').textContent = gameState.level + 1;
        
        // 2. НАСТРАИВАЕМ СООБЩЕНИЕ
        document.getElementById('resultIcon').textContent = '🏆';
        document.getElementById('resultTitle').textContent = 'Уровень пройден!';
        document.getElementById('resultMessage').textContent = 
            `Отлично! Вы нашли все ${gameState.levelData.targetWords.length} слов.`;
        
        // 3. ПОКАЗЫВАЕМ КНОПКУ "СЛЕДУЮЩИЙ УРОВЕНЬ"
        document.getElementById('nextLevelBtn').style.display = 'flex';
        
        console.log('✅ Экран победы готов');
    },
    
    // ПОКАЗАТЬ ЭКРАН ПОРАЖЕНИЯ
    showLevelFailed(gameState) {
        console.log('😔 Показываем экран поражения...');
        
        if (!gameState.levelData) return;
        
        // 1. ЗАПОЛНЯЕМ СТАТИСТИКУ
        document.getElementById('resultFound').textContent = 
            `${gameState.foundWords.length}/${gameState.levelData.targetWords.length}`;
        document.getElementById('resultScore').textContent = gameState.score;
        document.getElementById('resultAttempts').textContent = 0;
        document.getElementById('resultNextLevel').textContent = gameState.level;
        
        // 2. НАСТРАИВАЕМ СООБЩЕНИЕ
        document.getElementById('resultIcon').textContent = '😔';
        document.getElementById('resultTitle').textContent = 'Уровень не пройден';
        document.getElementById('resultMessage').textContent = 
            `Попытки закончились. Попробуйте еще раз!`;
        
        // 3. СКРЫВАЕМ КНОПКУ "СЛЕДУЮЩИЙ УРОВЕНЬ"
        document.getElementById('nextLevelBtn').style.display = 'none';
        
        console.log('✅ Экран поражения готов');
    },
    
    // ПОКАЗАТЬ СООБЩЕНИЕ (всплывающее окно)
    showMessage(text, icon = '✨') {
        console.log(`💬 Показываем сообщение: ${text}`);
        
        document.getElementById('messageIcon').textContent = icon;
        document.getElementById('messageText').textContent = text;
        document.getElementById('messageOverlay').classList.add('active');
        
        // АВТОМАТИЧЕСКОЕ СКРЫТИЕ ЧЕРЕЗ 2 СЕКУНДЫ
        setTimeout(() => {
            if (document.getElementById('messageOverlay').classList.contains('active')) {
                this.hideMessage();
            }
        }, 2000);
    },
    
    // СКРЫТЬ СООБЩЕНИЕ
    hideMessage() {
        console.log('🗑️  Скрываем сообщение');
        document.getElementById('messageOverlay').classList.remove('active');
    }
};

// Делаем доступным глобально
window.UIManager = UIManager;
```

**Объяснение UIManager:**
1. **Обновление интерфейса** — связывает данные игры с HTML
2. **Рендеринг элементов** — создает DOM-элементы из данных
3. **Обработка сообщений** — показывает уведомления игроку
4. **Экраны результатов** — показывает победу или поражение

---

### 🧪 Тест 2: Проверяем менеджер интерфейса
Добавьте в тестовый код:

```html
<script>
console.log('🎨 Тестируем UIManager:');

// Создаем тестовое состояние игры
const testState = new GameState();
testState.level = 3;
testState.score = 450;
testState.hints = 2;
testState.revealAttempts = 3;
testState.dailyCompleted = false;

// Тестируем обновление главного экрана
console.log('=== ТЕСТ ОБНОВЛЕНИЯ ГЛАВНОГО ЭКРАНА ===');
UIManager.updateMainScreen(testState);

// Создаем тестовые данные уровня
testState.levelData = {
    targetWords: ['КОТ', 'ДОМ', 'ЛЕС'],
    availableLetters: ['К', 'О', 'Т', 'Д', 'М', 'Л', 'Е', 'С'],
    allLetters: ['К', 'О', 'Т', 'Д', 'О', 'М', 'Л', 'Е', 'С'],
    maxAttempts: 15,
    wordCells: {
        'КОТ': [{letter: 'К', revealed: false}, {letter: 'О', revealed: false}, {letter: 'Т', revealed: false}],
        'ДОМ': [{letter: 'Д', revealed: false}, {letter: 'О', revealed: false}, {letter: 'М', revealed: false}],
        'ЛЕС': [{letter: 'Л', revealed: false}, {letter: 'Е', revealed: false}, {letter: 'С', revealed: false}]
    }
};

testState.foundWords = ['КОТ'];
testState.currentInput = ['Д', 'О', 'М'];
testState.attemptsUsed = 5;

// Переключаемся на игровой экран для тестирования
ScreenManager.show('gameScreen');

// Тестируем обновление игрового экрана
setTimeout(() => {
    console.log('=== ТЕСТ ОБНОВЛЕНИЯ ИГРОВОГО ЭКРАНА ===');
    UIManager.updateGameScreen(testState);
    UIManager.renderWordsGrid(testState);
    UIManager.renderCurrentInput(testState);
    UIManager.renderCircleInput(testState);
    
    // Тестируем сообщения
    console.log('=== ТЕСТ СООБЩЕНИЙ ===');
    UIManager.showMessage('Тестовое сообщение!', '🎯');
    
    // Тестируем экран победы
    console.log('=== ТЕСТ ЭКРАНА ПОБЕДЫ ===');
    UIManager.showLevelComplete(testState);
    
    // Тестируем экран поражения
    console.log('=== ТЕСТ ЭКРАНА ПОРАЖЕНИЯ ===');
    UIManager.showLevelFailed(testState);
    
}, 100);
</script>
```

**Что должно получиться:**
1. Обновится главный экран (цифры в статистике)
2. На игровом экране появятся слова (одно открытое, два скрытых)
3. Появятся набранные буквы "ДОМ"
4. Появится круг с 8 буквами
5. Появится тестовое сообщение
6. Экран результатов покажет статистику

---

## 🔧 Шаг 3: Создание обработчиков событий

### 3.1 Создаем файл js/event-handlers.js
Этот файл будет обрабатывать все действия игрока:

```javascript
// js/event-handlers.js
// ====================
// В этом файле обрабатываем ВСЕ действия игрока (клики, нажатия клавиш)

const EventHandlers = {
    // ИНИЦИАЛИЗАЦИЯ ВСЕХ ОБРАБОТЧИКОВ
    init(game) {
        console.log('🎯 Инициализируем обработчики событий...');
        
        this.game = game; // Сохраняем ссылку на игру
        
        // 1. ГЛАВНЫЙ ЭКРАН
        this.setupMainScreenHandlers();
        
        // 2. ИГРОВОЙ ЭКРАН
        this.setupGameScreenHandlers();
        
        // 3. ЭКРАН РЕЗУЛЬТАТОВ
        this.setupResultScreenHandlers();
        
        // 4. СООБЩЕНИЯ
        this.setupMessageHandlers();
        
        // 5. КЛАВИАТУРА
        this.setupKeyboardHandlers();
        
        console.log('✅ Все обработчики инициализированы');
    },
    
    // НАСТРОЙКА ОБРАБОТЧИКОВ ГЛАВНОГО ЭКРАНА
    setupMainScreenHandlers() {
        console.log('🏠 Настраиваем обработчики главного экрана...');
        
        // КНОПКА "БЕСКОНЕЧНАЯ ИГРА"
        document.getElementById('infiniteMode').addEventListener('click', () => {
            console.log('🎮 Запускаем бесконечную игру');
            this.game.startGame('infinite');
        });
        
        // КНОПКА "СЛОВО ДНЯ"
        document.getElementById('dailyMode').addEventListener('click', () => {
            if (!this.game.state.dailyCompleted) {
                console.log('📅 Запускаем слово дня');
                this.game.startGame('daily');
            } else {
                console.log('⏰ Слово дня уже пройдено сегодня');
            }
        });
    },
    
    // НАСТРОЙКА ОБРАБОТЧИКОВ ИГРОВОГО ЭКРАНА
    setupGameScreenHandlers() {
        console.log('🎮 Настраиваем обработчики игрового экрана...');
        
        // 1. КНОПКА "НАЗАД"
        document.getElementById('backBtn').addEventListener('click', () => {
            console.log('↩️  Возвращаемся в меню');
            ScreenManager.show('mainScreen');
            UIManager.updateMainScreen(this.game.state);
        });
        
        // 2. КНОПКИ УПРАВЛЕНИЯ ВВОДОМ
        document.getElementById('clearBtn').addEventListener('click', () => {
            console.log('🗑️  Очищаем ввод');
            this.game.clearInput();
        });
        
        document.getElementById('resetBtn').addEventListener('click', () => {
            console.log('🔄 Сбрасываем набранные буквы');
            this.game.resetInput();
        });
        
        document.getElementById('shuffleBtn').addEventListener('click', () => {
            console.log('🔀 Перемешиваем буквы');
            this.game.shuffleLetters();
        });
        
        // 3. КНОПКИ ПОДСКАЗОК В ХЕДЕРЕ
        document.getElementById('hintBtnHeader').addEventListener('click', () => {
            console.log('💡 Используем подсказку');
            this.game.useHint();
        });
        
        document.getElementById('revealBtnHeader').addEventListener('click', () => {
            console.log('👁️  Открываем случайную букву');
            this.game.revealRandomLetter();
        });
        
        // 4. ДИНАМИЧЕСКИЕ ЭЛЕМЕНТЫ (буквы в круге)
        // Эти обработчики будут добавляться при создании круга
        this.setupDynamicHandlers();
    },
    
    // НАСТРОЙКА ДИНАМИЧЕСКИХ ОБРАБОТЧИКОВ (для элементов, создаваемых через JS)
    setupDynamicHandlers() {
        console.log('🎯 Настраиваем динамические обработчики...');
        
        // Используем "делегирование событий" - вешаем обработчик на контейнер
        // Это работает даже для элементов, которые будут созданы позже
        
        // 1. ОБРАБОТЧИК ДЛЯ БУКВ В КРУГЕ
        document.addEventListener('click', (e) => {
            // Проверяем, кликнули ли на букву в круге
            if (e.target.closest('.circle-letter')) {
                const letter = e.target.closest('.circle-letter').textContent;
                console.log(`🔤 Нажата буква в круге: ${letter}`);
                this.game.addLetter(letter);
            }
        });
        
        // 2. ОБРАБОТЧИК ДЛЯ ЦЕНТРАЛЬНОЙ КНОПКИ
        document.addEventListener('click', (e) => {
            if (e.target.closest('.circle-center')) {
                console.log('✅ Нажата центральная кнопка проверки');
                this.game.submitWord();
            }
        });
    },
    
    // НАСТРОЙКА ОБРАБОТЧИКОВ ЭКРАНА РЕЗУЛЬТАТОВ
    setupResultScreenHandlers() {
        console.log('🏆 Настраиваем обработчики экрана результатов...');
        
        // КНОПКА "СЛЕДУЮЩИЙ УРОВЕНЬ"
        document.getElementById('nextLevelBtn').addEventListener('click', () => {
            console.log('➡️  Переходим на следующий уровень');
            this.game.nextLevel();
        });
        
        // КНОПКА "В МЕНЮ"
        document.getElementById('backToMenuBtn').addEventListener('click', () => {
            console.log('🏠 Возвращаемся в меню');
            ScreenManager.show('mainScreen');
            UIManager.updateMainScreen(this.game.state);
        });
    },
    
    // НАСТРОЙКА ОБРАБОТЧИКОВ СООБЩЕНИЙ
    setupMessageHandlers() {
        console.log('💬 Настраиваем обработчики сообщений...');
        
        document.getElementById('messageOk').addEventListener('click', () => {
            console.log('👌 Нажата кнопка OK в сообщении');
            UIManager.hideMessage();
        });
    },
    
    // НАСТРОЙКА ОБРАБОТЧИКОВ КЛАВИАТУРЫ
    setupKeyboardHandlers() {
        console.log('⌨️  Настраиваем обработчики клавиатуры...');
        
        document.addEventListener('keydown', (e) => {
            // Работаем только на игровом экране
            if (ScreenManager.getCurrentScreen() === 'gameScreen') {
                
                // BACKSPACE - удалить последнюю букву
                if (e.key === 'Backspace') {
                    console.log('⌫ Удаляем последнюю букву');
                    this.game.removeLastLetter();
                    e.preventDefault(); // Отменяем стандартное поведение
                }
                
                // ENTER - проверить слово
                else if (e.key === 'Enter') {
                    console.log('↵ Проверяем слово');
                    this.game.submitWord();
                    e.preventDefault();
                }
                
                // БУКВЫ - добавить букву
                else if (e.key.length === 1 && /[а-яА-Яa-zA-Z]/.test(e.key)) {
                    const letter = e.key.toUpperCase();
                    console.log(`🔤 Добавляем букву с клавиатуры: ${letter}`);
                    this.game.addLetter(letter);
                    e.preventDefault();
                }
            }
        });
        
        console.log('✅ Обработчики клавиатуры настроены');
    }
};

// Делаем доступным глобально
window.EventHandlers = EventHandlers;
```

**Объяснение обработчиков событий:**
1. **Делегирование событий** — обработчики на контейнере для динамических элементов
2. **Обработка клавиатуры** — поддержка физической клавиатуры
3. **Разделение ответственности** — каждый метод обрабатывает свою группу событий

---

### 🧪 Тест 3: Проверяем обработчики событий
Обновите тестовый код, чтобы использовать реальные обработчики:

```html
<script>
console.log('🎯 Тестируем обработчики событий:');

// Создаем тестовую игру
const testGame = {
    state: new GameState(),
    
    // Тестовые методы
    startGame(mode) {
        console.log(`🎮 Запускаем игру в режиме: ${mode}`);
        ScreenManager.show('gameScreen');
    },
    
    clearInput() {
        console.log('🗑️  Очищаем ввод (тест)');
    },
    
    addLetter(letter) {
        console.log(`🔤 Добавляем букву: ${letter} (тест)`);
    },
    
    submitWord() {
        console.log('✅ Проверяем слово (тест)');
    }
};

// Инициализируем обработчики
EventHandlers.init(testGame);

// Тестируем клики (вручную вызываем события)
console.log('=== ТЕСТ КЛИКОВ ===');

// Симулируем клик по бесконечной игре
console.log('👉 Симулируем клик по "Бесконечная игра":');
document.getElementById('infiniteMode').click();

// Симулируем нажатие клавиши
console.log('⌨️  Симулируем нажатие клавиши "A":');
const keyEvent = new KeyboardEvent('keydown', { key: 'A' });
document.dispatchEvent(keyEvent);

// Симулируем нажатие Enter
console.log('↵ Симулируем нажатие Enter:');
const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
document.dispatchEvent(enterEvent);

// Симулируем нажатие Backspace
console.log('⌫ Симулируем нажатие Backspace:');
const backspaceEvent = new KeyboardEvent('keydown', { key: 'Backspace' });
document.dispatchEvent(backspaceEvent);
</script>
```

---

## 💾 Шаг 4: Создание системы сохранения

### 4.1 Создаем файл js/storage-manager.js
Этот файл будет сохранять и загружать прогресс игрока:

```javascript
// js/storage-manager.js
// =====================
// В этом файле работаем с localStorage для сохранения прогресса

const StorageManager = {
    // КЛЮЧ ДЛЯ ХРАНЕНИЯ В LOCALSTORAGE
    SAVE_KEY: 'wordWondersSave',
    
    // ЗАГРУЗИТЬ СОХРАНЕННУЮ ИГРУ
    load() {
        console.log('💾 Загружаем сохраненную игру...');
        
        try {
            // Пытаемся получить данные из localStorage
            const saved = localStorage.getItem(this.SAVE_KEY);
            
            if (saved) {
                // Парсим JSON строку обратно в объект
                const data = JSON.parse(saved);
                console.log('✅ Игра загружена из сохранения');
                return data;
            } else {
                console.log('📝 Сохранение не найдено, начинаем с начала');
                return null;
            }
            
        } catch (error) {
            // Если что-то пошло не так (некорректный JSON и т.д.)
            console.error('❌ Ошибка загрузки сохранения:', error);
            return null;
        }
    },
    
    // СОХРАНИТЬ ИГРУ
    save(data) {
        console.log('💾 Сохраняем игру...');
        
        try {
            // Преобразуем объект в JSON строку
            const jsonString = JSON.stringify(data);
            
            // Сохраняем в localStorage
            localStorage.setItem(this.SAVE_KEY, jsonString);
            
            console.log('✅ Игра успешно сохранена');
            return true;
            
        } catch (error) {
            // Если не хватает места или другая ошибка
            console.error('❌ Ошибка сохранения:', error);
            return false;
        }
    },
    
    // ОЧИСТИТЬ СОХРАНЕНИЕ (для тестирования)
    clear() {
        console.log('🗑️  Очищаем сохранение...');
        localStorage.removeItem(this.SAVE_KEY);
        console.log('✅ Сохранение очищено');
    },
    
    // ПРОВЕРИТЬ, ЕСТЬ ЛИ СОХРАНЕНИЕ
    hasSave() {
        return localStorage.getItem(this.SAVE_KEY) !== null;
    },
    
    // ПОЛУЧИТЬ ИНФОРМАЦИЮ О СОХРАНЕНИИ (размер, дата)
    getSaveInfo() {
        const saved = localStorage.getItem(this.SAVE_KEY);
        
        if (!saved) {
            return { exists: false };
        }
        
        return {
            exists: true,
            size: saved.length, // Размер в символах
            sizeKB: (saved.length / 1024).toFixed(2) // Размер в КБ
        };
    }
};

// Делаем доступным глобально
window.StorageManager = StorageManager;
```

**Объяснение системы сохранения:**
1. **localStorage** — встроенное в браузер хранилище
2. **JSON** — формат для хранения данных
3. **Обработка ошибок** — на случай проблем с сохранением

---

### 🧪 Тест 4: Проверяем систему сохранения
Добавьте в тестовый код:

```html
<script>
console.log('💾 Тестируем систему сохранения:');

// 1. Тестируем сохранение
console.log('=== ТЕСТ СОХРАНЕНИЯ ===');
const testSaveData = {
    state: {
        level: 5,
        score: 1250,
        hints: 2,
        revealAttempts: 3,
        dailyCompleted: true,
        dailyDate: new Date().toDateString()
    }
};

StorageManager.save(testSaveData);
console.log('✅ Данные сохранены');

// 2. Тестируем загрузку
console.log('=== ТЕСТ ЗАГРУЗКИ ===');
const loadedData = StorageManager.load();
console.log('📥 Загруженные данные:', loadedData);

// 3. Тестируем информацию о сохранении
console.log('=== ТЕСТ ИНФОРМАЦИИ ===');
const saveInfo = StorageManager.getSaveInfo();
console.log('📊 Информация о сохранении:', saveInfo);

// 4. Тестируем очистку (раскомментируйте для теста)
// console.log('=== ТЕСТ ОЧИСТКИ ===');
// StorageManager.clear();
// console.log('✅ Сохранение очищено');
</script>
```

---

## 🎮 Шаг 5: Создание основной игры

### 5.1 Создаем файл js/game.js
Этот файл будет связывать ВСЕ компоненты вместе:

```javascript
// js/game.js
// ===========
// ГЛАВНЫЙ ФАЙЛ ИГРЫ - связывает все компоненты вместе

class Game {
    constructor() {
        console.log('🎮 Создаем новую игру...');
        
        // 1. СОЗДАЕМ СОСТОЯНИЕ ИГРЫ
        this.state = new GameState();
        
        // 2. ЗАГРУЖАЕМ СОХРАНЕННУЮ ИГРУ
        this.loadGame();
        
        console.log('✅ Игра создана');
        console.log(`📊 Начальное состояние: Уровень ${this.state.level}, Очки ${this.state.score}`);
    }
    
    // ИНИЦИАЛИЗАЦИЯ ИГРЫ
    init() {
        console.log('🚀 Инициализируем игру...');
        
        // 1. НАСТРАИВАЕМ ЕЖЕДНЕВНУЮ ИГРУ
        this.setupDaily();
        
        // 2. ИНИЦИАЛИЗИРУЕМ ОБРАБОТЧИКИ СОБЫТИЙ
        EventHandlers.init(this);
        
        // 3. ОБНОВЛЯЕМ ГЛАВНЫЙ ЭКРАН
        UIManager.updateMainScreen(this.state);
        
        console.log('✅ Игра инициализирована и готова к работе!');
    }
    
    // ЗАГРУЗКА ИГРЫ ИЗ СОХРАНЕНИЯ
    loadGame() {
        console.log('📂 Загружаем игру...');
        
        const savedData = StorageManager.load();
        if (savedData) {
            this.state.initFromSave(savedData);
            console.log(`✅ Игра загружена: Уровень ${this.state.level}`);
        } else {
            console.log('🆕 Начинаем новую игру');
        }
    }
    
    // НАСТРОЙКА ЕЖЕДНЕВНОЙ ИГРЫ
    setupDaily() {
        console.log('📅 Настраиваем ежедневную игру...');
        
        const today = Utils.getTodayString();
        
        // Если сегодняшняя дата отличается от даты последней игры
        if (this.state.dailyDate !== today) {
            console.log('🆕 Новый день, сбрасываем ежедневную игру');
            this.state.dailyCompleted = false;
            this.state.dailyDate = today;
            this.saveGame();
        } else {
            console.log('✅ Ежедневная игра уже настроена для сегодня');
        }
    }
    
    // СОХРАНЕНИЕ ИГРЫ
    saveGame() {
        console.log('💾 Сохраняем игру...');
        
        const saveData = this.state.getSaveData();
        StorageManager.save(saveData);
    }
    
    // ЗАПУСК НОВОЙ ИГРЫ
    startGame(mode) {
        console.log(`🎯 Запускаем новую игру в режиме: ${mode}`);
        
        // 1. СБРАСЫВАЕМ СОСТОЯНИЕ ДЛЯ НОВОЙ ИГРЫ
        this.state.resetForNewGame(mode);
        
        // 2. ГЕНЕРИРУЕМ УРОВЕНЬ
        if (mode === 'infinite') {
            console.log(`🎲 Генерируем бесконечный уровень ${this.state.level}`);
            this.generateInfiniteLevel();
        } else {
            console.log('📅 Генерируем ежедневный уровень');
            this.generateDailyLevel();
        }
        
        // 3. ОБНОВЛЯЕМ ИНТЕРФЕЙС
        this.updateGameScreen();
        
        // 4. ПЕРЕКЛЮЧАЕМСЯ НА ИГРОВОЙ ЭКРАН
        ScreenManager.show('gameScreen');
        
        console.log('✅ Игра началась!');
    }
    
    // ГЕНЕРАЦИЯ БЕСКОНЕЧНОГО УРОВНЯ
    generateInfiniteLevel() {
        console.log(`🎲 Генерируем уровень ${this.state.level}...`);
        
        this.state.levelData = LevelGenerator.generateInfiniteLevel(
            this.state.level, 
            WORD_LIST.common
        );
        
        this.state.totalLettersCount = this.state.levelData.allLetters.length;
        console.log(`✅ Уровень ${this.state.level} сгенерирован`);
    }
    
    // ГЕНЕРАЦИЯ ЕЖЕДНЕВНОГО УРОВНЯ
    generateDailyLevel() {
        console.log('📅 Генерируем ежедневный уровень...');
        
        this.state.levelData = LevelGenerator.generateDailyLevel();
        this.state.totalLettersCount = this.state.levelData.allLetters.length;
        console.log('✅ Ежедневный уровень сгенерирован');
    }
    
    // ОБНОВЛЕНИЕ ИГРОВОГО ЭКРАНА
    updateGameScreen() {
        console.log('🔄 Обновляем игровой экран...');
        
        UIManager.updateGameScreen(this.state);
        UIManager.renderWordsGrid(this.state);
        UIManager.renderCurrentInput(this.state);
        UIManager.renderCircleInput(this.state);
        
        console.log('✅ Игровой экран обновлен');
    }
    
    // ДОБАВЛЕНИЕ БУКВЫ
    addLetter(letter) {
        console.log(`➕ Добавляем букву: ${letter}`);
        
        // 1. ПРОВЕРЯЕМ, МОЖНО ЛИ ИСПОЛЬЗОВАТЬ ЭТУ БУКВУ
        // Считаем, сколько раз уже использовали эту букву
        const usedCount = this.state.currentInput.filter(l => l === letter).length;
        
        // Считаем, сколько раз эта буква доступна в уровне
        const availableCount = this.state.levelData.allLetters.filter(l => l === letter).length;
        
        console.log(`📊 Буква "${letter}": использовано ${usedCount}, доступно ${availableCount}`);
        
        // 2. ЕСЛИ БУКВУ МОЖНО ИСПОЛЬЗОВАТЬ
        if (usedCount < availableCount) {
            this.state.currentInput.push(letter);
            this.updateGameScreen();
            console.log(`✅ Буква "${letter}" добавлена`);
        } else {
            // Если букву использовали максимальное количество раз
            UIManager.showMessage(`Буква "${letter}" уже использована максимальное количество раз!`, '⚠️');
            console.log(`❌ Буква "${letter}" уже использована максимальное количество раз`);
        }
    }
    
    // УДАЛЕНИЕ ПОСЛЕДНЕЙ БУКВЫ
    removeLastLetter() {
        if (this.state.currentInput.length > 0) {
            const removedLetter = this.state.currentInput.pop();
            console.log(`🗑️  Удаляем последнюю букву: ${removedLetter}`);
            this.updateGameScreen();
        } else {
            console.log('ℹ️  Нечего удалять - ввод пуст');
        }
    }
    
    // ОЧИСТКА ВВОДА
    clearInput() {
        console.log('🗑️  Очищаем весь ввод');
        this.state.currentInput = [];
        this.updateGameScreen();
    }
    
    // СБРОС НАБРАННЫХ БУКВ
    resetInput() {
        this.clearInput();
        UIManager.showMessage('Все набранные буквы сброшены', '🔄');
    }
    
    // ПЕРЕМЕШИВАНИЕ БУКВ В КРУГЕ
    shuffleLetters() {
        console.log('🔀 Перемешиваем буквы в круге');
        
        if (!this.state.levelData || !this.state.levelData.availableLetters) {
            console.error('❌ Нет данных для перемешивания');
            return;
        }
        
        // Перемешиваем массив букв
        this.state.levelData.availableLetters = Utils.shuffleArray(
            this.state.levelData.availableLetters
        );
        
        // Обновляем отображение
        this.updateGameScreen();
        UIManager.showMessage('Буквы перемешаны!', '🔀');
    }
    
    // ИСПОЛЬЗОВАНИЕ ПОДСКАЗКИ
    useHint() {
        console.log('💡 Используем подсказку...');
        
        // 1. ПРОВЕРЯЕМ, ЕСТЬ ЛИ ПОДСКАЗКИ
        if (this.state.hints > 0) {
            console.log(`📊 Подсказок доступно: ${this.state.hints}`);
            
            // 2. ИЩЕМ НЕНАЙДЕННЫЕ СЛОВА
            const unrevealedWords = this.state.levelData.targetWords.filter(word => 
                !this.state.foundWords.includes(word)
            );
            
            console.log(`📝 Ненайденных слов: ${unrevealedWords.length}`);
            
            // 3. ЕСЛИ ЕСТЬ ЧТО ОТКРЫВАТЬ
            if (unrevealedWords.length > 0) {
                // Выбираем случайное ненайденное слово
                const randomIndex = Math.floor(Math.random() * unrevealedWords.length);
                const word = unrevealedWords[randomIndex];
                
                console.log(`🎯 Открываем слово: ${word}`);
                
                // 4. ДОБАВЛЯЕМ СЛОВО В НАЙДЕННЫЕ
                this.state.foundWords.push(word);
                
                // 5. ТРАТИМ ПОДСКАЗКУ
                this.state.hints--;
                
                // 6. НАЧИСЛЯЕМ ОЧКИ (меньше, чем за самостоятельное нахождение)
                const points = Math.floor(word.length * 5);
                this.state.score += points;
                
                console.log(`⭐ Начислено очков: ${points}, всего: ${this.state.score}`);
                
                // 7. ОБНОВЛЯЕМ ИНТЕРФЕЙС
                this.updateGameScreen();
                this.saveGame();
                
                // 8. ПОКАЗЫВАЕМ СООБЩЕНИЕ
                UIManager.showMessage(`Подсказка: слово "${word}" открыто! +${points} очков`, '💡');
                
                // 9. ПРОВЕРЯЕМ, ЗАВЕРШЕН ЛИ УРОВЕНЬ
                this.checkLevelCompletion();
                
            } else {
                console.log('✅ Все слова уже найдены');
                UIManager.showMessage('Все слова уже найдены!', '✅');
            }
            
        } else {
            console.log('❌ Недостаточно подсказок');
            UIManager.showMessage('Недостаточно подсказок!', '⚠️');
        }
    }
    
    // ОТКРЫТИЕ СЛУЧАЙНОЙ БУКВЫ
    revealRandomLetter() {
        console.log('👁️  Открываем случайную букву...');
        
        // 1. ПРОВЕРЯЕМ, ЕСТЬ ЛИ ПОПЫТКИ
        if (this.state.revealAttempts > 0) {
            console.log(`📊 Попыток открыть букву: ${this.state.revealAttempts}`);
            
            // 2. ИЩЕМ СКРЫТЫЕ БУКВЫ В НЕНАЙДЕННЫХ СЛОВАХ
            const hiddenCells = [];
            
            this.state.levelData.targetWords.forEach(word => {
                if (!this.state.foundWords.includes(word)) {
                    this.state.levelData.wordCells[word].forEach((cell, index) => {
                        if (!cell.revealed) {
                            hiddenCells.push({ word, cell, index });
                        }
                    });
                }
            });
            
            console.log(`🔍 Скрытых букв найдено: ${hiddenCells.length}`);
            
            // 3. ЕСЛИ ЕСТЬ ЧТО ОТКРЫВАТЬ
            if (hiddenCells.length > 0) {
                // Выбираем случайную скрытую букву
                const randomIndex = Math.floor(Math.random() * hiddenCells.length);
                const { word, cell, index } = hiddenCells[randomIndex];
                
                console.log(`🎯 Открываем букву "${cell.letter}" в слове "${word}"`);
                
                // 4. ОТКРЫВАЕМ БУКВУ
                this.state.levelData.wordCells[word][index].revealed = true;
                
                // 5. ТРАТИМ ПОПЫТКУ
                this.state.revealAttempts--;
                
                // 6. ОБНОВЛЯЕМ ИНТЕРФЕЙС
                this.updateGameScreen();
                this.saveGame();
                
                // 7. ПОКАЗЫВАЕМ СООБЩЕНИЕ
                UIManager.showMessage(`Открыта буква "${cell.letter}"`, '👁️');
                
                // 8. ПРОВЕРЯЕМ, ОТКРЫЛОСЬ ЛИ ЦЕЛОЕ СЛОВО
                this.checkWordCompletion(word);
                
            } else {
                console.log('✅ Все буквы уже открыты');
                UIManager.showMessage('Все буквы уже открыты!', '✅');
            }
            
        } else {
            console.log('❌ Недостаточно попыток');
            UIManager.showMessage('Недостаточно попыток!', '⚠️');
        }
    }
    
    // ПРОВЕРКА, ОТКРЫЛОСЬ ЛИ ЦЕЛОЕ СЛОВО ЧЕРЕЗ БУКВЫ
    checkWordCompletion(word) {
        console.log(`🔍 Проверяем, открылось ли слово "${word}"...`);
        
        // Проверяем, все ли буквы слова открыты
        const allRevealed = this.state.levelData.wordCells[word].every(cell => cell.revealed);
        
        if (allRevealed && !this.state.foundWords.includes(word)) {
            console.log(`✨ Слово "${word}" полностью открыто через буквы!`);
            
            // Добавляем слово в найденные
            this.state.foundWords.push(word);
            
            // Начисляем очки (но меньше, чем за самостоятельное нахождение)
            const points = word.length * 10;
            this.state.score += points;
            
            console.log(`⭐ Начислено очков: ${points}, всего: ${this.state.score}`);
            
            // Обновляем интерфейс и сохраняем
            this.updateGameScreen();
            this.saveGame();
            
            // Показываем сообщение
            UIManager.showMessage(`Слово "${word}" полностью открыто! +${points} очков`, '✨');
            
            // Проверяем, завершен ли уровень
            this.checkLevelCompletion();
        }
    }
    
    // ПРОВЕРКА СЛОВА (когда игрок нажал Enter)
    submitWord() {
        console.log('✅ Проверяем слово...');
        
        // 1. СОБИРАЕМ НАБРАННЫЕ БУКВЫ В СЛОВО
        const word = this.state.currentInput.join('').toUpperCase();
        console.log(`📝 Проверяем слово: "${word}"`);
        
        // 2. ПРОВЕРЯЕМ МИНИМАЛЬНУЮ ДЛИНУ
        if (word.length < 2) {
            console.log('❌ Слово слишком короткое');
            UIManager.showMessage('Слово должно содержать минимум 2 буквы!', '⚠️');
            return;
        }
        
        // 3. ПРОВЕРЯЕМ ИСПОЛЬЗОВАНИЕ БУКВ
        const letterCounts = Utils.countOccurrences(this.state.currentInput);
        const availableCounts = Utils.countOccurrences(this.state.levelData.allLetters);
        
        console.log('📊 Проверяем использование букв...');
        
        let isValid = true;
        for (const letter in letterCounts) {
            if (!availableCounts[letter] || availableCounts[letter] < letterCounts[letter]) {
                isValid = false;
                console.log(`❌ Неправильное использование буквы "${letter}"`);
                break;
            }
        }
        
        // 4. ЕСЛИ БУКВЫ ИСПОЛЬЗОВАНЫ НЕПРАВИЛЬНО
        if (!isValid) {
            console.log('❌ Использованы недоступные буквы');
            
            // Тратим попытку
            this.state.attemptsUsed++;
            console.log(`📊 Попыток использовано: ${this.state.attemptsUsed}/${this.state.levelData.maxAttempts}`);
            
            // Показываем сообщение
            UIManager.showMessage('Использованы недоступные буквы!', '❌');
            
            // Проверяем, не закончились ли попытки
            if (this.state.attemptsUsed >= this.state.levelData.maxAttempts) {
                console.log('😔 Попытки закончились');
                setTimeout(() => {
                    this.showLevelFailed();
                }, 1000);
            }
            
            // Очищаем ввод
            this.clearInput();
            this.saveGame();
            return;
        }
        
        // 5. ПРОВЕРЯЕМ, ЕСТЬ ЛИ ТАКОЕ СЛОВО В УРОВНЕ
        if (this.state.levelData.targetWords.includes(word)) {
            console.log(`🎯 Слово "${word}" есть в уровне!`);
            
            // 6. ПРОВЕРЯЕМ, НЕ НАЙДЕНО ЛИ УЖЕ ЭТО СЛОВО
            if (!this.state.foundWords.includes(word)) {
                console.log(`✨ Слово "${word}" еще не найдено!`);
                
                // Добавляем слово в найденные
                this.state.foundWords.push(word);
                
                // Начисляем очки (10 очков за букву)
                const points = word.length * 10;
                this.state.score += points;
                
                // Тратим попытку
                this.state.attemptsUsed++;
                
                console.log(`⭐ Начислено очков: ${points}, всего: ${this.state.score}`);
                console.log(`📊 Попыток использовано: ${this.state.attemptsUsed}/${this.state.levelData.maxAttempts}`);
                
                // Показываем сообщение
                UIManager.showMessage(`Правильно! "${word}" найдено! +${points} очков`, '✅');
                
                // Проверяем завершение уровня
                this.checkLevelCompletion();
                
            } else {
                console.log(`ℹ️  Слово "${word}" уже найдено`);
                
                // Тратим попытку (даже за повтор)
                this.state.attemptsUsed++;
                
                UIManager.showMessage('Это слово уже найдено!', '⚠️');
            }
            
        } else {
            console.log(`❌ Слова "${word}" нет в уровне`);
            
            // Тратим попытку
            this.state.attemptsUsed++;
            console.log(`📊 Попыток использовано: ${this.state.attemptsUsed}/${this.state.levelData.maxAttempts}`);
            
            UIManager.showMessage('Такого слова нет в этом уровне!', '❌');
            
            // Проверяем, не закончились ли попытки
            if (this.state.attemptsUsed >= this.state.levelData.maxAttempts) {
                console.log('😔 Попытки закончились');
                setTimeout(() => {
                    this.showLevelFailed();
                }, 1000);
            }
        }
        
        // 7. ОЧИЩАЕМ ВВОД И СОХРАНЯЕМ ИГРУ
        this.clearInput();
        this.saveGame();
    }
    
    // ПРОВЕРКА ЗАВЕРШЕНИЯ УРОВНЯ
    checkLevelCompletion() {
        console.log('🔍 Проверяем завершение уровня...');
        
        // Проверяем, все ли слова найдены
        const allFound = this.state.levelData.targetWords.every(word => 
            this.state.foundWords.includes(word)
        );
        
        if (allFound) {
            console.log('🎉 Все слова найдены! Уровень пройден!');
            
            // Показываем экран победы через 1 секунду
            setTimeout(() => {
                this.showLevelComplete();
            }, 1000);
        } else {
            const foundCount = this.state.foundWords.length;
            const totalCount = this.state.levelData.targetWords.length;
            console.log(`📊 Найдено ${foundCount}/${totalCount} слов`);
        }
    }
    
    // ПОКАЗАТЬ ЭКРАН ПОБЕДЫ
    showLevelComplete() {
        console.log('🏆 Показываем экран победы');
        
        UIManager.showLevelComplete(this.state);
        ScreenManager.show('resultScreen');
    }
    
    // ПОКАЗАТЬ ЭКРАН ПОРАЖЕНИЯ
    showLevelFailed() {
        console.log('😔 Показываем экран поражения');
        
        UIManager.showLevelFailed(this.state);
        ScreenManager.show('resultScreen');
    }
    
    // ПЕРЕХОД НА СЛЕДУЮЩИЙ УРОВЕНЬ
    nextLevel() {
        console.log('➡️  Переходим на следующий уровень...');
        
        // Обновляем состояние после прохождения уровня
        this.state.updateAfterLevelComplete();
        
        // Сохраняем игру
        this.saveGame();
        
        // Запускаем следующий уровень
        if (this.state.mode === 'infinite') {
            this.startGame('infinite');
        } else {
            // В ежедневном режиме возвращаем в меню
            ScreenManager.show('mainScreen');
            UIManager.updateMainScreen(this.state);
        }
    }
};

// СОЗДАЕМ И ИНИЦИАЛИЗИРУЕМ ИГРУ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Страница загружена, запускаем игру...');
    
    // Создаем экземпляр игры
    window.game = new Game();
    
    // Инициализируем игру
    game.init();
    
    console.log('🎮 Игра готова! Добро пожаловать в Word Wonders!');
});
```

---

### 🧪 Тест 5: Полный тест игры
**Удалите ВЕСЬ тестовый код из конца index.html** и оставьте только:

```html
<script>
// Этот код уже не нужен - теперь игра работает через класс Game
// Всё тестирование будет происходить через консоль
console.log('🎮 Игра загружается через основной механизм...');

// Для отладки можно оставить глобальную ссылку на игру
window.debugGame = window.game;
</script>
```

---

## 🧪 ИТОГОВЫЙ ТЕСТ: Запускаем полную игру!

1. **Откройте index.html в браузере**
2. **Нажмите F12 → Console** для просмотра логов
3. **Нажмите "Бесконечная игра"**

**Что должно произойти:**
1. В консоли увидите процесс генерации уровня
2. Появится игровой экран с кругом букв
3. Вверху будет статистика
4. Посередине - скрытые слова
5. Попробуйте:
   - Кликнуть на буквы в круге
   - Нажать центральную кнопку проверки
   - Использовать подсказки
   - Составить слово "КОТ" или "ДОМ"

---

## 📝 Краткий итог третьего урока

### ✅ Что мы создали:
1. **Генератор уровней** — умная система создания уровней
2. **Менеджер интерфейса** — связь логики с отображением
3. **Обработчики событий** — реагирование на действия игрока
4. **Систему сохранения** — хранение прогресса
5. **Основную игру** — связь всех компонентов вместе

### 🎯 Ключевые алгоритмы:
```javascript
// Генерация совместимых слов
Utils.canFormWord(word, availableLetters, availableCounts)

// Подсчет очков
word.length * 10 // за самостоятельное нахождение
word.length * 5  // за подсказку

// Проверка завершения уровня
allWords.every(word => foundWords.includes(word))
```

### 🔄 Как работает игровой цикл:
```
1. Игрок выбирает буквы → addLetter()
2. Нажимает проверку → submitWord()
3. Проверяем буквы → проверяем слово → начисляем очки
4. Обновляем интерфейс → проверяем завершение уровня
5. Победа/поражение → следующий уровень/меню
```

---

## 🏠 Домашнее задание

### Задание 1: Улучшите генератор уровней
1. Добавьте разные типы сложности (легкий/средний/сложный)
2. Создайте тематические уровни (животные, города, профессии)
3. Добавьте специальные буквы (удвоенные, бонусные)

### Задание 2: Расширьте систему очков
1. Добавьте комбо-систему (дополнительные очки за несколько слов подряд)
2. Создайте бонусы за скорость
3. Добавьте достижения (первое слово, все слова за 30 секунд и т.д.)

### Задание 3: Улучшите интерфейс
1. Добавьте анимации для правильных/неправильных слов
2. Создайте визуальные подсказки (подсветка доступных букв)
3. Добавьте звуковые эффекты

### Задание 4: Создайте дополнительные режимы
1. Режим "на время" (найдите как можно больше слов за 60 секунд)
2. Режим "словарь" (составьте самое длинное слово)
3. Кооперативный режим (два игрока по очереди)

---

## ⏭️ Что будет в четвертом уроке

**В четвертом уроке мы:**
1. Создадим **полноценный экран результатов** 🏆
2. Добавим **анимации и эффекты** ✨
3. Реализуем **звуковое сопровождение** 🔊
4. Создадим **систему достижений** 🏅
5. Добавим **настройки игры** ⚙️
6. Протестируем и **оптимизируем** игру 🚀

**Подготовьтесь:** 
- Придумайте 5-10 достижений для игры
- Подберите звуковые эффекты (или приготовьтесь их создать)
- Подумайте, какие настройки нужны игроку

---

**💡 Профессиональный совет:**
Всегда тестируйте игру после каждого изменения:
1. Проверяйте консоль на ошибки
2. Тестируйте на мобильном устройстве
3. Проверяйте разные сценарии игры
4. Просите других людей поиграть и дать feedback

**🎉 Потрясающая работа!** Вы создали полноценную работающую игру с нуля! В следующем уроке мы доведем её до совершенства и сделаем по-настоящему профессиональной.

**❓ Вопрос для размышления:** Как вы думаете, что самое сложное было в создании игры? Что бы вы сделали иначе, если бы начинали сейчас?
