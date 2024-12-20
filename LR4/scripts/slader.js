function changeSlide(direction, sliderId) {
    const slides = document.querySelectorAll(`#${sliderId} .slide`);
    let currentSlide = parseInt(document.querySelector(`#${sliderId} .current-slide`)?.dataset.index) || 0;

    currentSlide += direction;

    if (currentSlide >= slides.length) {
        currentSlide = 0; // Возвращаемся к первому слайду
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1; // Переходим к последнему слайду
    }

    const offset = -currentSlide * 100; // Сдвиг в процентах
    document.querySelector(`#${sliderId} .slides`).style.transform = `translateX(${offset}%)`;

    // Обновляем текущий индекс
    slides.forEach((slide, index) => {
        slide.classList.remove('current-slide');
        if (index === currentSlide) {
            slide.classList.add('current-slide');
            slide.dataset.index = currentSlide; // Сохраняем текущий индекс
        }
    });
}
