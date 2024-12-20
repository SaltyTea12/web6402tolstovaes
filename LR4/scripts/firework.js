function createFirework(x, y) {
    const firework = document.createElement('div');
    const size = Math.random() * 20 + 10; // Размер фейерверка
    firework.classList.add('firework');
    firework.style.width = `${size}px`;
    firework.style.height = `${size}px`;
    firework.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`; // Случайный цвет
    firework.style.left = `${x}px`;
    firework.style.top = `${y}px`;
    
    document.getElementById('fireworks-container').appendChild(firework);

    // Анимация
    setTimeout(() => {
        firework.style.transform = `translateY(-200px) scale(0)`;
        firework.style.opacity = '0';
        setTimeout(() => {
            firework.remove(); // Удаляем элемент после анимации
        }, 500);
    }, 10);
}

function launchFireworks() {
    for (let i = 0; i < 200; i++) { // Количество фейерверков
        const x = Math.random() * window.innerWidth; // Случайная позиция по X
        const y = Math.random() * window.innerHeight; // Случайная позиция по Y
        createFirework(x, y);
    }
}

// Запускаем анимацию при загрузке страницы
window.onload = launchFireworks;
