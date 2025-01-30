let bg = document.getElementById('bg')
let mountain = document.getElementById('mountain')
let mid = document.getElementById('mid')
let front = document.getElementById('front')
let text = document.getElementById('text')

window.addEventListener('scroll', ()=> {
    let value = window.scrollY

    bg.style.top = value * 0.5 + 'px'
    mountain.style.top = -value * 0.15 + 'px'
    mid.style.top = value * 0.03 + 'px'
    front.style.top = value * 0.5 + 'px'
    text.style.top = value * 1 + 'px'
})

const list = document.querySelectorAll('.carousel .list .item');
const carousel = document.querySelector('.carousel');
const dots = document.querySelectorAll('.dots li');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

const lastPosition = list.length - 1;
const TRANSITION_DURATION = 1500; 
const AUTO_RUN_DELAY = 5000; 

let active = 0;
let zIndex = 2;
let autoRun;
let removeEffect;

nextBtn.addEventListener('click', () => changeSlide(active + 1 > lastPosition ? 0 : active + 1));
prevBtn.addEventListener('click', () => changeSlide(active - 1 < 0 ? lastPosition : active - 1));

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => changeSlide(index));
});

function changeSlide(newValue) {
    if (newValue === active) return; 
    const direction = newValue > active ? 'next' : 'prev';
    active = newValue;
    updateSlider(direction);
}

function updateSlider(direction) {
    carousel.style.pointerEvents = 'none';

    const itemActiveOld = document.querySelector('.carousel .list .item.active');
    if (itemActiveOld) itemActiveOld.classList.remove('active');

    zIndex++;
    list[active].style.zIndex = zIndex;
    list[active].classList.add('active');

    const transformValue = direction === 'next' ? '300px' : '-300px';
    carousel.style.setProperty('--transform', transformValue);
    carousel.classList.add('effect');

    const dotActiveOld = document.querySelector('.dots li.active');
    if (dotActiveOld) dotActiveOld.classList.remove('active');
    dots[active].classList.add('active');

    clearTimeout(removeEffect);
    removeEffect = setTimeout(() => {
        carousel.classList.remove('effect');
        carousel.style.pointerEvents = 'auto';
    }, TRANSITION_DURATION);

    resetAutoRun();
}

function resetAutoRun() {
    clearTimeout(autoRun);
    autoRun = setTimeout(() => nextBtn.click(), AUTO_RUN_DELAY);
}

resetAutoRun();