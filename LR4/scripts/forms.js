document.getElementById('ratingForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    const name = document.getElementById('name').value.trim();
    const rating = document.querySelector('input[name="rating"]:checked');

    // Проверка имени: только буквы без пробелов
    const nameRegex = /^[A-Za-zА-Яа-яЁё]+$/; // Регулярное выражение для проверки имени

    if (!nameRegex.test(name)) {
        alert('Имя должно содержать только буквы без пробелов.');
        return;
    }

    if (!rating) {
        alert('Пожалуйста, выберите оценку.');
        return;
    }

    const ratingValue = rating.value;

    // Отправка POST-запроса
    sendData(name, ratingValue);
});

function sendData(name, rating) {
    fetch('http://localhost:4000/ratings', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, rating })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Сеть ответила с ошибкой');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('responseMessage').innerText = `Спасибо, ${name}! Вы оценили сервис на ${rating} звёзд!`;
        console.log(data);
        
        // Получение данных для заполнения таблицы
        fetchData();
        
    })
    .catch(error => {
        console.error('Ошибка:', error);
        document.getElementById('responseMessage').innerText = 'Произошла ошибка при отправке данных.';
    });
}

// Асинхронный запрос для получения данных
function fetchData() {
    fetch('http://localhost:4000/ratings') 
        .then(response => {
            if (!response.ok) {
                throw new Error('Сеть ответила с ошибкой');
            }
            return response.json();
        })
        .then(data => {
            populateTable(data);
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Не удалось загрузить данные.');
        });
}


// Заполнение таблицы данными
function populateTable(data) {
    const table = document.createElement('table');
    
    data.forEach(item => {
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        
        cell1.innerText = item.title; 
        cell2.innerText = item.body; 
    });

   // Добавляем таблицу в div
   const dataTableDiv = document.getElementById('dataTable');
   dataTableDiv.innerHTML = ''; // Очищаем предыдущие данные
   dataTableDiv.appendChild(table); // Добавляем новую таблицу
}

// Вызов функции для получения данных при загрузке страницы
window.onload = function() {
   fetchData();
};
