// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// --- HERO ANIMATIONS ---
// Note: 'logo-trigger' class is now on both header elements so they animate together
const heroTl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.5 } });

heroTl.to(".logo-trigger", { opacity: 1, duration: 1, delay: 0.5 })
      .to("#heroBg", { scale: 1, opacity: 1, filter: "contrast(1.25) brightness(0.75) grayscale(0%)", duration: 2.5 }, "<")
      .to(".hero-text-container", { opacity: 1, y: 0, duration: 1.2 }, "-=1.5")
      .to(".hero-sub-container", { opacity: 1, y: 0, duration: 1 }, "-=1");


// --- SCROLL-TRIGGERED TEXT REVEALS ---
gsap.utils.toArray(".split-text-reveal").forEach(text => {
    gsap.from(text, {
        scrollTrigger: {
            trigger: text,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
    });
});


// --- THE COOKS CARDS FADE UP ---
gsap.utils.toArray(".cook-card").forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        delay: i * 0.2, // Stagger
        ease: "power2.out"
    });
});


// --- NET WORTH COUNTER ---
const counterTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".net-worth-trigger",
        start: "top 75%",
        toggleActions: "play none none reverse"
    }
});

counterTl.to(".scale-up-reveal", { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" })
         .to(".dollar-reveal", { opacity: 1, x: 0, duration: 0.5 }, "-=0.4");

// The actual number counter
counterTl.fromTo("#counter", 
    { innerText: 0 }, 
    { 
        innerText: 80000000, 
        duration: 2.5, 
        ease: "power3.inOut",
        snap: { innerText: 1 }, // Increment by integers
        onUpdate: function() {
            // Format with commas during animation
            this.targets()[0].innerText = Number(this.targets()[0].innerText).toLocaleString();
        }
    }, 
    "-=0.5"
);

counterTl.to(".fade-up-reveal", { opacity: 1, y: 0, duration: 0.8 }, "-=1");


// --- PRODUCT LIST SLIDE IN ---
gsap.utils.toArray(".product-item").forEach((item, i) => {
    gsap.to(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 90%",
        },
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
    });
});

// --- WIRETAPS STAGGERED GRID ---
ScrollTrigger.batch(".wiretap-item", {
    start: "top 85%",
    onEnter: batch => gsap.to(batch, {
        opacity: 1, 
        y: 0, 
        stagger: 0.15, 
        duration: 0.8, 
        ease: "power2.out"
    }),
    onLeaveBack: batch => gsap.to(batch, { opacity: 0, y: 12, stagger: 0.1, duration: 0.5 })
});