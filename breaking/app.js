window.addEventListener("load", () => {
    
    gsap.registerPlugin(ScrollTrigger);

    // --- 0. PRELOADER SEQUENCE ---
    const tl = gsap.timeline();
    
    tl.to("#el-1", { opacity: 1, duration: 0.1, scale: 1.1, ease: "back.out" })
      .to("#el-1", { scale: 1, duration: 0.2 })
      .to("#el-2", { opacity: 1, duration: 0.1, scale: 1.1, ease: "back.out" }, "+=0.2")
      .to("#el-2", { scale: 1, duration: 0.2 })
      .to("#loader-bar", { width: "100%", duration: 1.5, ease: "power2.inOut" })
      .to("#preloader", {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
          onComplete: () => {
             document.getElementById("preloader").style.display = "none";
             initWebsite(); 
          }
      });

    function initWebsite() {
        
        // --- 1. LOCOMOTIVE SCROLL (Optimized for Mobile) ---
        // We disable smooth scrolling on smartphones for performance
        const scrollContainer = document.querySelector(".smooth-scroll");
        const locoScroll = new LocomotiveScroll({
            el: scrollContainer,
            smooth: true,
            multiplier: 1,
            tablet: { smooth: false }, // Native scroll on tablet
            smartphone: { smooth: false } // Native scroll on phone
        });

        // Sync GSAP + Locomotive
        locoScroll.on("scroll", ScrollTrigger.update);
        ScrollTrigger.scrollerProxy(scrollContainer, {
            scrollTop(value) {
                return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
            },
            pinType: scrollContainer.style.transform ? "transform" : "fixed"
        });

        // --- 2. CHAOS ENGINE (Responsive count) ---
        const chaosContainer = document.getElementById("chaos-container");
        // Reduce particles on mobile to save battery/performance
        const shardCount = window.innerWidth < 768 ? 8 : 20; 

        for (let i = 0; i < shardCount; i++) {
            let shard = document.createElement("div");
            shard.classList.add("chaos-shard");
            
            let size = Math.random() * 100 + 20;
            let posX = Math.random() * 100;
            let posY = Math.random() * 100;
            
            shard.style.width = `${size}px`;
            shard.style.height = `${size}px`;
            shard.style.left = `${posX}%`;
            shard.style.top = `${posY}%`;
            
            // Random polygon shape
            shard.style.clipPath = `polygon(${Math.random()*100}% 0%, 100% ${Math.random()*100}%, 0% 100%)`;

            chaosContainer.appendChild(shard);

            gsap.to(shard, {
                y: (Math.random() - 0.5) * 800,
                rotation: Math.random() * 720,
                scrollTrigger: {
                    trigger: "body",
                    scroller: ".smooth-scroll",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1
                }
            });
        }

        // --- 3. ANIMATIONS ---
        
        // Owner Cards Reveal
        gsap.utils.toArray('.owner-card').forEach(card => {
            gsap.from(card, {
                y: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: card,
                    scroller: ".smooth-scroll",
                    start: "top 85%"
                }
            });
        });

        // Money Counter
        let moneyObj = { val: 0 };
        gsap.to(moneyObj, {
            val: 80000000,
            duration: 3,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#money-counter",
                scroller: ".smooth-scroll",
                start: "top 80%",
                toggleActions: "play none none reverse" 
            },
            onUpdate: function() {
                document.getElementById("money-counter").innerText = Math.floor(moneyObj.val).toLocaleString();
            }
        });

        // Glitch Effect (Mouseover)
        const glitchText = document.querySelector('.glitch-text');
        if(glitchText && window.matchMedia("(pointer: fine)").matches) {
            glitchText.addEventListener('mouseenter', () => {
                let original = glitchText.dataset.text;
                let iterations = 0;
                const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*";
                
                const interval = setInterval(() => {
                    glitchText.innerText = original.split("")
                        .map((letter, index) => {
                            if(index < iterations) return original[index];
                            return letters[Math.floor(Math.random() * 26)];
                        })
                        .join("");
                    
                    if(iterations >= original.length) clearInterval(interval);
                    iterations += 1 / 3;
                }, 30);
            });
        }

        ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
        ScrollTrigger.refresh();
    }
});