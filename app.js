document.addEventListener("DOMContentLoaded", () => {
    
    gsap.registerPlugin(ScrollTrigger);

    // --- 0. PRELOADER SEQUENCE ---
    const counter = { value: 0 };
    const loaderText = document.getElementById("loader-text");
    const loadTl = gsap.timeline();

    // A. Animate the Counter 0 to 100
    loadTl.to(counter, {
        value: 100,
        duration: 2.5,
        ease: "power4.inOut",
        onUpdate: () => {
            const val = Math.floor(counter.value);
            document.getElementById("counter").innerText = val;
            document.getElementById("counter-clone").innerText = val;
            
            // Fill effect (height grows with percentage)
            gsap.set("#counter-fill", { height: `${val}%` });
        }
    })
    
    // B. Animate Progress Bar width simultaneously
    .to("#progress-bar", { width: "100%", duration: 2.5, ease: "power4.inOut" }, "<")

    // C. Change Status Text dynamically
    .to(loaderText, { text: "LOADING ASSETS...", duration: 0.1 }, 0.5)
    .to(loaderText, { text: "CALIBRATING...", duration: 0.1 }, 1.5)
    .to(loaderText, { text: "SYSTEM READY", color: "#fff", duration: 0.1 }, 2.3)

    // D. Exit Preloader (Curtain Up Effect)
    .to("#loader", {
        yPercent: -100,
        duration: 1,
        ease: "power3.inOut",
        delay: 0.2,
        onComplete: revealSite // TRIGGER THE SITE ANIMATION
    });


    // --- 1. SITE REVEAL ANIMATIONS (Your Original Code) ---
    function revealSite() {
        
        const tl = gsap.timeline();
    
        tl.from("header", { y: -50, opacity: 0, duration: 1, ease: "power3.out" })
          .from(".reveal-text", { y: 100, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.5")
          .from(".project-card", { 
              y: 100, 
              opacity: 0, 
              duration: 1, 
              stagger: 0.2, 
              ease: "power3.out" 
          }, "-=0.5");

        // Initialize ScrollTrigger for the About Section
        initAboutSection();
    }


    // --- 2. ABOUT SECTION LOGIC ---
    function initAboutSection() {
        gsap.from(".about-reveal", {
            scrollTrigger: {
                trigger: "#about",
                start: "top 70%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });
    }


    // --- 3. CUSTOM CURSOR & HOVER LOGIC ---
    const dot = document.querySelector(".cursor-dot");
    const circle = document.querySelector(".cursor-circle");
    
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener("mousemove", (e) => {
            const x = e.clientX;
            const y = e.clientY;
            
            gsap.set(dot, { x: x, y: y });
            gsap.to(circle, { x: x, y: y, duration: 0.5, ease: "power2.out" });
        });
    }

    // Color Shifting Logic
    const glow = document.getElementById("ambient-glow");
    const cards = document.querySelectorAll(".project-card");

    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            const color = card.getAttribute("data-color");
            glow.style.setProperty("--glow-color", color);
            gsap.to(glow, { opacity: 0.2, duration: 0.5 });
            document.body.classList.add("hovering");
        });

        card.addEventListener("mouseleave", () => {
            glow.style.setProperty("--glow-color", "rgba(255,255,255,0.1)");
            gsap.to(glow, { opacity: 0.05, duration: 0.5 });
            document.body.classList.remove("hovering");
        });
    });
});