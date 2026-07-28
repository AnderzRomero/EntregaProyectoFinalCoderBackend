const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
const dotsContainer = document.querySelector('.slider-dots');

let counter = 0;
const intervalTime = 4000;
let slideInterval;

// Create dots
slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = `slider-dot${i === 0 ? ' active' : ''}`;
    dot.setAttribute('aria-label', `Ir a slide ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
});

function goToSlide(index) {
    counter = index;
    slider.style.transform = `translateX(${-100 * counter}%)`;
    document.querySelectorAll('.slider-dot').forEach((d, i) => {
        d.classList.toggle('active', i === counter);
    });
}

function slideNext() {
    goToSlide(counter >= slides.length - 1 ? 0 : counter + 1);
}

function slidePrev() {
    if (counter > 0) goToSlide(counter - 1);
}

function startSlide() { slideInterval = setInterval(slideNext, intervalTime); }
function stopSlide() { clearInterval(slideInterval); }

nextBtn.addEventListener('click', () => { slideNext(); stopSlide(); });
prevBtn.addEventListener('click', () => { slidePrev(); stopSlide(); });

slider.addEventListener('mouseover', stopSlide);
slider.addEventListener('mouseleave', startSlide);

startSlide();

// Handle resize
window.addEventListener('resize', () => goToSlide(counter));
