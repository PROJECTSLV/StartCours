let students = [];

// Чтение файла
document.getElementById('fileInput').onchange = function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        students = e.target.result.split('\n')
            .map(name => name.trim())
            .filter(name => name !== '');
        
        document.getElementById('result').textContent = `Загружено: ${students.length} студентов`;
    };
    
    reader.readAsText(file);
};

// Начало рандомизации
function start() {
    if (students.length === 0) {
        alert('Сначала загрузите файл!');
        return;
    }
    
    // Перемешиваем массив
    for (let i = students.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [students[i], students[j]] = [students[j], students[i]];
    }
    
    // Сразу показываем первого студента
    const student = students.shift();
    document.getElementById('result').textContent = `Выбран: ${student}`;
}

// Выбор следующего студента
function next() {
    if (students.length === 0) {
        document.getElementById('result').textContent = 'Все студенты выбраны!';
        return;
    }
    
    const student = students.shift();
    document.getElementById('result').textContent = `Выбран: ${student}`;
}