window.addEventListener("load", () => {
    
    // --- 0. PRELOADER SEQUENCE ---
    const preloader = document.getElementById('preloader');
    
    // Animate preloader out
    gsap.to(preloader, {
        opacity: 0,
        duration: 3,
        ease: "power2.inOut",
        onComplete: () => {
            preloader.style.display = "none";
            initWebsite(); 
        }
    });

    function initWebsite() {
        // Register Plugins
        gsap.registerPlugin(ScrollTrigger, Flip, MotionPathPlugin);

        // --- 1. LOCOMOTIVE SCROLL SETUP ---
        const scrollContainer = document.querySelector(".smooth-scroll");
        
        // Detect Mobile
        const isMobile = window.innerWidth <= 768;

        const locoScroll = new LocomotiveScroll({
            el: scrollContainer,
            smooth: true,
            // Lower multiplier on mobile for natural feel, heavy on desktop
            multiplier: isMobile ? 1 : 0.7, 
            smartphone: { smooth: true },
            tablet: { smooth: true }
        });

        // Sync Locomotive + ScrollTrigger
        locoScroll.on("scroll", ScrollTrigger.update);

        ScrollTrigger.scrollerProxy(scrollContainer, {
            scrollTop(value) {
                return arguments.length
                    ? locoScroll.scrollTo(value, { duration: 0, disableLerp: true })
                    : locoScroll.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
            },
            pinType: scrollContainer.style.transform ? "transform" : "fixed"
        });

        // Navbar Links Logic
        document.querySelectorAll('[data-scroll-to]').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-scroll-to');
                const targetEl = document.querySelector(targetId);
                if(targetEl) locoScroll.scrollTo(targetEl, { duration: 1.5 });
            });
        });

        ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
        ScrollTrigger.defaults({ scroller: ".smooth-scroll" });


        // --- 2. SVG PATH SCROLL DRAWING (Desktop Only) ---
        if (!isMobile) {
            const path = document.querySelector("#scrollPath");
            if(path) {
                const pathLength = path.getTotalLength();
                gsap.set(path, {
                    strokeDasharray: pathLength,
                    strokeDashoffset: pathLength,
                    visibility: "visible"
                });

                gsap.to(path, {
                    strokeDashoffset: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: "#main-container",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1.5,
                    }
                });
            }
        }

        // --- 3. HERO ANIMATIONS ---
        const heroText = document.querySelector('.hero-text-reveal');
        if(heroText) {
            gsap.to(heroText, {
                opacity: 1, scale: 1, duration: 2, ease: "power4.out", delay: 0.3
            });
        }

        // Floating glasses
        gsap.to(".floating-glass", {
            y: "-30px", rotation: "+=5", duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 1
        });


        // --- 4. BOTTLE FLIP ---
        const img1 = document.querySelector("#img1");
        const img2 = document.querySelector("#img2");
        const container1 = document.querySelector("#container1");
        const container2 = document.querySelector("#container2");

        if (img1 && img2 && container1 && container2) {
            
            const state = Flip.getState([img1, img2]);

            // Move to Final
            container1.appendChild(img1);
            container2.appendChild(img2);

            Flip.from(state, {
                absolute: true, 
                scale: true,
                simple: true,
                zIndex: 999,
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    endTrigger: "#menu",
                    end: "center center",
                    scrub: 2,
                    immediateRender: true
                },
                ease: "power2.inOut",
                spin: true,
                onEnter: () => gsap.set([img1, img2], { visibility: "visible" })
            });
            // Fallback
            gsap.set([img1, img2], { visibility: "visible", delay: 0.1 });
        }


        // --- 5. REVEAL ANIMATIONS ---
        gsap.utils.toArray('.reveal-text').forEach(text => {
            gsap.from(text.children, {
                scrollTrigger: { trigger: text, start: "top 85%" },
                y: 50, opacity: 0, duration: 1.2, stagger: 0.2, ease: "power3.out"
            });
        });

        gsap.utils.toArray('.reveal-image img').forEach(img => {
            gsap.from(img, {
                scrollTrigger: { trigger: img.parentElement, start: "top 80%" },
                scale: 1.1, filter: "blur(10px) grayscale(100%)", duration: 1.5, ease: "power2.out"
            });
        });
        
        gsap.utils.toArray('.fade-in-text').forEach(text => {
            gsap.to(text, {
                scrollTrigger: { trigger: text, start: "top 85%" },
                opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power2.out"
            });
        });

        // --- 6. BETTING ODDS ---
        gsap.utils.toArray('.race-row').forEach((row, i) => {
            gsap.from(row, {
                scrollTrigger: { trigger: row, start: "top 90%" },
                x: isMobile ? 0 : -50, // No X movement on mobile to prevent overflow
                y: isMobile ? 30 : 0,
                opacity: 0, duration: 0.8, delay: i * 0.1, ease: "power2.out"
            });
        });

        gsap.utils.toArray('.odds-ticker').forEach((ticker) => {
            ScrollTrigger.create({
                trigger: ticker, start: "top 85%",
                onEnter: () => {
                    let originalText = ticker.innerText;
                    let counter = 0;
                    let interval = setInterval(() => {
                        ticker.innerText = Math.floor(Math.random() * 10) + "/" + Math.floor(Math.random() * 5);
                        counter++;
                        if (counter > 10) {
                            clearInterval(interval);
                            ticker.innerText = originalText;
                        }
                    }, 50);
                }
            });
        });

        // --- 7. CURSOR (Desktop Only) ---
        if (!isMobile) {
            const cursorDot = document.querySelector(".cursor-dot");
            const cursorOutline = document.querySelector(".cursor-outline");

            window.addEventListener("mousemove", (e) => {
                const posX = e.clientX;
                const posY = e.clientY;
                cursorDot.style.left = `${posX}px`;
                cursorDot.style.top = `${posY}px`;

                cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 500, fill: "forwards" });
            });

            const interactiveElements = document.querySelectorAll('a, button, .cursor-pointer, .race-row, input');
            interactiveElements.forEach(el => {
                el.addEventListener("mouseenter", () => {
                    document.body.classList.add("hovering");
                    gsap.to(cursorDot, { scale: 1.5, duration: 0.2 });
                });
                el.addEventListener("mouseleave", () => {
                    document.body.classList.remove("hovering");
                    gsap.to(cursorDot, { scale: 1, duration: 0.2 });
                });
            });
        }

        // Final Refresh
        ScrollTrigger.refresh();
    }
});