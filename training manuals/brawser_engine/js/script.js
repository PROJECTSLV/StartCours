// Данные для модального окна
const layerData = {
    'user-interface': {
        title: 'Пользовательский интерфейс',
        content: `
            <p>Пользовательский интерфейс (UI) - это видимая часть браузера, с которой взаимодействует пользователь. Он включает в себя:</p>
            <ul>
                <li>Адресную строку для ввода URL</li>
                <li>Кнопки навигации (вперед/назад/обновить)</li>
                <li>Панель закладок и истории</li>
                <li>Меню настроек и расширений</li>
                <li>Панель вкладок</li>
                <li>Кнопки для управления окном</li>
            </ul>
            <p>UI обеспечивает удобное взаимодействие пользователя с веб-контентом и настройками браузера.</p>
        `,
        links: [
            {
                title: 'MDN Web Docs - Browser UI',
                url: 'https://developer.mozilla.org/en-US/docs/Glossary/UI',
                icon: 'fas fa-external-link-alt'
            },
            {
                title: 'Chrome UI Guidelines',
                url: 'https://developer.chrome.com/docs/extensions/mv3/user_interface/',
                icon: 'fas fa-book'
            }
        ]
    },
    'browser-engine': {
        title: 'Движок браузера',
        content: `
            <p>Движок браузера - это центральный координатор, который связывает все компоненты браузера. Его основные функции:</p>
            <ul>
                <li>Обработка пользовательского ввода (клики, нажатия клавиш)</li>
                <li>Управление загрузкой и отображением страниц</li>
                <li>Координация работы движка рендеринга и JavaScript интерпретатора</li>
                <li>Управление жизненным циклом страницы</li>
                <li>Обработка событий и их распределение</li>
            </ul>
            <p>Движок обеспечивает слаженную работу всех систем браузера.</p>
        `,
        links: [
            {
                title: 'How Browsers Work',
                url: 'https://web.dev/howbrowserswork/',
                icon: 'fas fa-external-link-alt'
            },
            {
                title: 'Browser Architecture',
                url: 'https://developer.chrome.com/blog/inside-browser-part1/',
                icon: 'fas fa-book'
            }
        ]
    },
    'rendering-engine': {
        title: 'Движок рендеринга',
        content: `
            <p>Движок рендеринга отвечает за преобразование HTML, CSS и JavaScript в визуальное представление. Процесс включает:</p>
            <ul>
                <li><strong>Парсинг HTML</strong> - построение DOM дерева</li>
                <li><strong>Парсинг CSS</strong> - построение CSSOM дерева</li>
                <li><strong>Построение дерева рендеринга</strong> - комбинация DOM и CSSOM</li>
                <li><strong>Layout</strong> - расчет позиций и размеров элементов</li>
                <li><strong>Painting</strong> - отрисовка пикселей на экране</li>
                <li><strong>Compositing</strong> - объединение слоев</li>
            </ul>
            <p>Популярные движки: Blink (Chrome, Edge), Gecko (Firefox), WebKit (Safari).</p>
        `,
        links: [
            {
                title: 'MDN - Rendering Engine',
                url: 'https://developer.mozilla.org/en-US/docs/Glossary/Rendering_engine',
                icon: 'fas fa-external-link-alt'
            },
            {
                title: 'Critical Rendering Path',
                url: 'https://developer.mozilla.org/en-US/docs/Web/Performance/Critical_rendering_path',
                icon: 'fas fa-book'
            }
        ]
    },
    'networking': {
        title: 'Сетевые возможности',
        content: `
            <p>Сетевой модуль обрабатывает все коммуникации браузера с интернетом. Основные функции:</p>
            <ul>
                <li>Обработка HTTP/HTTPS запросов и ответов</li>
                <li>Управление кэшированием ресурсов</li>
                <li>Поддержка различных протоколов (HTTP/1.1, HTTP/2, HTTP/3)</li>
                <li>Управление соединениями и пулинг</li>
                <li>Безопасность (SSL/TLS, CORS, CSP)</li>
                <li>Сжатие данных и оптимизация</li>
            </ul>
            <p>Сетевой стек обеспечивает быструю и безопасную загрузку веб-ресурсов.</p>
        `,
        links: [
            {
                title: 'HTTP Overview',
                url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview',
                icon: 'fas fa-external-link-alt'
            },
            {
                title: 'Network Protocols',
                url: 'https://web.dev/networking-basics/',
                icon: 'fas fa-book'
            }
        ]
    },
    'javascript-interpreter': {
        title: 'JavaScript интерпретатор',
        content: `
            <p>JavaScript движок выполняет и оптимизирует JavaScript код. Современные движки используют:</p>
            <ul>
                <li><strong>JIT-компиляция</strong> - компиляция "на лету" для оптимизации</li>
                <li><strong>Inlining</strong> - встраивание часто вызываемых функций</li>
                <li><strong>Hidden Classes</strong> - оптимизация доступа к свойствам</li>
                <li><strong>Garbage Collection</strong> - автоматическое управление памятью</li>
                <li><strong>Hot Function Optimization</strong> - оптимизация часто выполняемого кода</li>
            </ul>
            <p>Популярные движки: V8 (Chrome), SpiderMonkey (Firefox), JavaScriptCore (Safari).</p>
        `,
        links: [
            {
                title: 'V8 Engine Guide',
                url: 'https://v8.dev/',
                icon: 'fas fa-external-link-alt'
            },
            {
                title: 'JavaScript Engine Fundamentals',
                url: 'https://mathiasbynens.be/notes/shapes-ics',
                icon: 'fas fa-book'
            }
        ]
    },
    'ui-backend': {
        title: 'Бэкенд пользовательского интерфейса',
        content: `
            <p>Бэкенд UI обеспечивает низкоуровневую отрисовку и взаимодействие с операционной системой:</p>
            <ul>
                <li>Отрисовка базовых виджетов (окна, кнопки, поля ввода)</li>
                <li>Работа с системными API для графики</li>
                <li>Обработка системных событий (мышь, клавиатура)</li>
                <li>Управление буфером обмена</li>
                <li>Интеграция с файловой системой</li>
                <li>Поддержка accessibility features</li>
            </ul>
            <p>Этот слой абстрагирует различия между операционными системами.</p>
        `,
        links: [
            {
                title: 'OS GUI Integration',
                url: 'https://en.wikipedia.org/wiki/Graphical_user_interface',
                icon: 'fas fa-external-link-alt'
            },
            {
                title: 'System APIs',
                url: 'https://developer.mozilla.org/en-US/docs/Web/API',
                icon: 'fas fa-book'
            }
        ]
    },
    'data-storage': {
        title: 'Хранилище данных',
        content: `
            <p>Хранилище данных обеспечивает сохранение информации на клиентской стороне:</p>
            <ul>
                <li><strong>Local Storage</strong> - постоянное хранение ключ-значение</li>
                <li><strong>Session Storage</strong> - хранение данных на время сессии</li>
                <li><strong>IndexedDB</strong> - NoSQL база данных в браузере</li>
                <li><strong>Cookies</strong> - небольшие данные для сервера</li>
                <li><strong>Web SQL</strong> - реляционная база данных (устарело)</li>
                <li><strong>Cache API</strong> - кэширование ресурсов для offline работы</li>
            </ul>
            <p>Хранилища позволяют веб-приложениям работать офлайн и сохранять состояние.</p>
        `,
        links: [
            {
                title: 'Web Storage API',
                url: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API',
                icon: 'fas fa-external-link-alt'
            },
            {
                title: 'Client-Side Storage',
                url: 'https://web.dev/storage-for-the-web/',
                icon: 'fas fa-book'
            }
        ]
    }
};

// Функции для работы с модальным окном
function showMoreInfo(layerId) {
    const data = layerData[layerId];
    if (!data) return;

    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalContent').innerHTML = data.content;
    
    const linksContainer = document.getElementById('modalLinks');
    linksContainer.innerHTML = '';
    
    data.links.forEach(link => {
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.target = '_blank';
        linkElement.className = 'modal-link';
        linkElement.innerHTML = `
            <i class="${link.icon}"></i>
            <span>${link.title}</span>
        `;
        linksContainer.appendChild(linkElement);
    });
    
    document.getElementById('infoModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('infoModal').style.display = 'none';
}

// Закрытие модального окна при клике вне его
document.getElementById('infoModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Закрытие модального окна по ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Анимация появления карточек
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.layer-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Добавляем интерактивность для карточек
document.querySelectorAll('.layer-card').forEach(card => {
    card.addEventListener('click', function() {
        const layerId = this.getAttribute('data-layer');
        showMoreInfo(layerId);
    });
});