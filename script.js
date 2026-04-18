let tg = window.Telegram.WebApp;

// Расширяем на весь экран
tg.expand();

// Устанавливаем данные пользователя
if (tg.initDataUnsafe.user) {
    document.getElementById('user-name').innerText = tg.initDataUnsafe.user.first_name;
    document.getElementById('user-status').innerText = "VIP Пользователь"; // Тут можно сделать проверку

    if (tg.initDataUnsafe.user.photo_url) {
        document.getElementById('user-photo').src = tg.initDataUnsafe.user.photo_url;
    }
}

// Функция отправки данных обратно в бот
function sendAction(action) {
    tg.sendData(action); // Бот получит этот текст в message.text
}
// Функция, которая срабатывает при нажатии на кнопку в приложении
function openMaterial(materialId) {
    // materialId — это ID файла из твоей базы данных (например, "12")
    tg.sendData("view_mat_" + materialId);
    // Как только эта строка сработает, Mini App закроется,
    // а бот получит сообщение с текстом "view_mat_12"
}

async function loadLibrary() {
    // Делаем запрос к твоему боту на PythonAnywhere
    const response = await fetch('https://pythonanywhere.com');
    const data = await response.json();

    const container = document.querySelector('.library-grid');
    container.innerHTML = ''; // Очищаем старое

    data.forEach(item => {
        // Создаем карточку для каждого видео из базы
        const card = `
            <div class="card" onclick="openMaterial('${item.item_id}')">
                <img src="https://placeholder.com" class="card-thumb">
                <div class="card-content">
                    <span class="card-type">${item.content_type}</span>
                    <p class="card-title">${item.title}</p>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

// Вызываем загрузку при открытии
loadLibrary();