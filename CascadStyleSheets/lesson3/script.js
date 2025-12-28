// Скрипт для переключения темы и навигации

// Ждем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================
    // 1. ПЕРЕКЛЮЧЕНИЕ ТЕМЫ
    // ============================
    
    // Находим кнопку переключения темы
    const themeToggle = document.getElementById('theme-toggle');
    
    // Проверяем, сохранена ли тема в localStorage
    function getSavedTheme() {
        // Получаем сохраненную тему из localStorage
        // Если ничего не сохранено, возвращаем 'light' (светлая тема по умолчанию)
        return localStorage.getItem('theme') || 'light';
    }
    
    // Применяем тему к странице
    function applyTheme(theme) {
        if (theme === 'dark') {
            // Добавляем класс для темной темы
            document.body.classList.add('dark-theme');
            // Обновляем текст и иконку на кнопке
            updateThemeButton('dark');
        } else {
            // Убираем класс для темной темы (остается светлая)
            document.body.classList.remove('dark-theme');
            // Обновляем текст и иконку на кнопке
            updateThemeButton('light');
        }
    }
    
    // Обновляем кнопку переключения темы
    function updateThemeButton(theme) {
        if (!themeToggle) return; // Если кнопки нет, выходим
        
        if (theme === 'dark') {
            // Для темной темы показываем солнце и текст "Светлая тема"
            themeToggle.innerHTML = '<i class="fas fa-sun"></i> Светлая тема';
        } else {
            // Для светлой темы показываем луну и текст "Тёмная тема"
            themeToggle.innerHTML = '<i class="fas fa-moon"></i> Тёмная тема';
        }
    }
    
    // Переключаем тему
    function toggleTheme() {
        // Проверяем, какая тема сейчас активна
        const isDarkTheme = document.body.classList.contains('dark-theme');
        
        if (isDarkTheme) {
            // Если сейчас темная тема, переключаем на светлую
            applyTheme('light');
            localStorage.setItem('theme', 'light');
        } else {
            // Если сейчас светлая тема, переключаем на темную
            applyTheme('dark');
            localStorage.setItem('theme', 'dark');
        }
    }
    
    // ============================
    // 2. ПОДСВЕТКА АКТИВНОЙ СТРАНИЦЫ
    // ============================
    
    // Определяем текущую страницу
    function highlightActivePage() {
        // Получаем все ссылки меню
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Получаем имя текущего файла (например: "index.html", "about.html")
        const currentPage = window.location.pathname.split('/').pop();
        
        // Перебираем все ссылки
        navLinks.forEach(link => {
            // Получаем имя файла из ссылки
            const linkPage = link.getAttribute('href');
            
            // Сравниваем имена файлов
            if (linkPage === currentPage) {
                // Если совпадает, добавляем класс active
                link.classList.add('active');
            } else {
                // Если не совпадает, убираем класс active
                link.classList.remove('active');
            }
        });
    }
    
    // ============================
    // 3. ИНИЦИАЛИЗАЦИЯ
    // ============================
    
    // Инициализируем тему при загрузке страницы
    function initTheme() {
        // Получаем сохраненную тему
        const savedTheme = getSavedTheme();
        // Применяем ее
        applyTheme(savedTheme);
    }
    
    // Инициализируем навигацию
    function initNavigation() {
        highlightActivePage();
    }
    
    // ============================
    // 4. НАСТРАИВАЕМ СОБЫТИЯ
    // ============================
    
    // Настраиваем обработчик клика на кнопку темы
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // ============================
    // 5. ЗАПУСКАЕМ ВСЁ
    // ============================
    
    // Запускаем инициализацию при загрузке страницы
    initTheme();
    initNavigation();
    
    // Выводим в консоль информацию для отладки (можно убрать в продакшене)
    console.log('Тема и навигация инициализированы!');
    console.log('Текущая тема:', getSavedTheme());
    
});