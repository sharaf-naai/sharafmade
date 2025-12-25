gsap.registerPlugin(ScrollTrigger);

// --- NAVBAR SCROLL EFFECT ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg', 'py-2');
        navbar.classList.remove('py-4');
    } else {
        navbar.classList.remove('shadow-lg', 'py-2');
        navbar.classList.add('py-4');
    }
});

// --- MENU CARD ANIMATIONS ---
// They pop in one by one
gsap.utils.toArray('.menu-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: "back.out(1.7)"
    });
});

// --- GUS IMAGE SLIDE IN ---
gsap.to(".gus-image-trigger", {
    scrollTrigger: {
        trigger: ".gus-image-trigger",
        start: "top 75%",
    },
    x: 0,
    opacity: 1,
    duration: 1.2,
    ease: "power3.out"
});

// --- SECTION TITLE REVEALS ---
gsap.utils.toArray('section h2').forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: "top 90%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });
});