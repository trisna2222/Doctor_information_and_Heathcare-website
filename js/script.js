document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slide');
    const prevBtn = document.querySelector('.hero-nav-btn.prev');
    const nextBtn = document.querySelector('.hero-nav-btn.next');
    let currentSlide = 0;
    const slideInterval = 6000; // 6 seconds per slide
    let autoSlideTimer;

    // Initial setup
    function initSlider() {
        if (slides.length > 0) {
            slides[0].classList.add('active');
            startAutoSlide();
        }
    }

    function showSlide(index) {
        // Handle wrapping
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        // Remove active class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Add active class to current slide
        slides[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
        resetAutoSlide();
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
        resetAutoSlide();
    }

    function startAutoSlide() {
        autoSlideTimer = setInterval(() => {
            showSlide(currentSlide + 1);
        }, slideInterval);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideTimer);
        startAutoSlide();
    }

    // Event Listeners
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }

    // Initialize
    initSlider();
});
