/* =========================================================================
   Portfolio Interactive JavaScript (FIXED)
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.project-slide');
    const dots = document.querySelectorAll('.dot');
    const carouselContainer = document.querySelector('.carousel-container');

    let currentSlide = 0;
    const slideIntervalTime = 5000;
    let slideTimer;

    // Changes visible slide
    function goToSlide(n) {
        // Pause all videos gracefully
        slides.forEach(slide => {
            const video = slide.querySelector('.project-video');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
            slide.classList.remove('active');
        });

        // Reset indicators
        dots.forEach(dot => dot.classList.remove('active'));

        // Wrap around logic
        currentSlide = (n + slides.length) % slides.length;

        // Activate target slide
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        // CRITICAL FIX: Check if mouse is hovering over carousel
        if (carouselContainer.matches(':hover')) {
            return; // Don't advance if user is hovering
        }
        goToSlide(currentSlide + 1);
    }

    // Auto-advance loop
    function startSlide() {
        if (slides.length <= 1) return;
        clearInterval(slideTimer); // Clear any existing interval first
        slideTimer = setInterval(nextSlide, slideIntervalTime);
    }

    // Pause auto-advance loop
    function pauseSlide() {
        clearInterval(slideTimer);
    }

    // Dot navigation listener
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            pauseSlide();
            startSlide();
        });
    });

    // Hover Interaction: Pause carousel and play video demo
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            pauseSlide(); // Stop automatic advancing

            // Find current video and play it
            const activeSlide = slides[currentSlide];
            const video = activeSlide.querySelector('.project-video');
            if (video) {
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log("Video Playback prevented:", error);
                    });
                }
            }
        });

        carouselContainer.addEventListener('mouseleave', () => {
            startSlide(); // Resume automatic advancing

            // Pause current video
            const activeSlide = slides[currentSlide];
            const video = activeSlide.querySelector('.project-video');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        });
    }

    // Initialize the carousel logic
    if (slides.length > 0) {
        goToSlide(0);
        startSlide();
    }

    // --- Custom Inverse Cursor Logic ---
    const cursor = document.querySelector('.cursor-lens');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });

        const interactiveElements = document.querySelectorAll('a, button, .btn, .dot, .project-media');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
        });
    }
});
