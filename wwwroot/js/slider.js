const slider = document.querySelector('.slider');
let currentIndex = 0;

function showNextSlide() {
    currentIndex++;
    if (currentIndex >= slider.children.length) {
        currentIndex = 0; // Loop back to the first slide
    }
    slider.style.transform = `translateX(${-currentIndex * 100}%)`;
}

setInterval(showNextSlide, 3000); // Change slide every 3 seconds
