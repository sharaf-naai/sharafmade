document.addEventListener("DOMContentLoaded", () => {
    
    // 1. HERO ANIMATION ON LOAD
    const heroContent = document.querySelector('.hero-content');
    setTimeout(() => {
        heroContent.style.opacity = "1";
        heroContent.style.transform = "translateY(0)";
        heroContent.style.transition = "all 1.5s ease-out";
    }, 200);

    // 2. PARALLAX EFFECT FOR HERO IMAGE
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxImg = document.querySelector('.parallax-img');
        if(parallaxImg) {
            parallaxImg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // 3. SCROLL REVEAL OBSERVER
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Select elements to animate
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-image, .reveal-item');
    revealElements.forEach(el => observer.observe(el));

});