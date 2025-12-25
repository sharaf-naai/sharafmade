document.addEventListener("DOMContentLoaded", () => {
    
    // 1. HERO ANIMATION ON LOAD
    const heroContent = document.querySelector('.hero-content');
    setTimeout(() => {
        heroContent.style.opacity = "1";
        heroContent.style.transform = "translateY(0)";
        heroContent.style.transition = "all 1.5s ease-out";
    }, 200);

    // 2. PARALLAX EFFECT (Lightweight)
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxImg = document.querySelector('.parallax-img');
        if(parallaxImg) {
            // Move background slower than scroll
            parallaxImg.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
    });

    // 3. SCROLL REVEAL OBSERVER
    const observerOptions = {
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    // Select elements to animate
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-image, .reveal-item');
    revealElements.forEach(el => observer.observe(el));

});