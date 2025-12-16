window.addEventListener("load", () => {
    
    // Register GSAP plugins safely
    if (typeof gsap !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
        initWebsite();
    }
});

function initWebsite() {
    
    // 1. FILM PROJECTOR LOADER SEQUENCE
    const countdown = document.getElementById("countdown");
    let count = 3;

    const timer = setInterval(() => {
        count--;
        if(count > 0) {
            countdown.innerText = count;
            gsap.fromTo(countdown, {x: -5}, {x: 5, duration: 0.1, yoyo: true, repeat: 5});
        } else {
            clearInterval(timer);
            startBurnTransition();
        }
    }, 1000);

    function startBurnTransition() {
        countdown.style.display = "none";
        
        // Expand the burn hole
        gsap.to("#film-burn", {
            scale: 50, 
            opacity: 1,
            duration: 1.5,
            ease: "power2.in",
            onComplete: () => {
                document.getElementById("projector-loader").style.display = "none";
                revealSite();
            }
        });
    }

    function revealSite() {
        gsap.to("#content", { opacity: 1, duration: 2 });
        
        // Refresh ScrollTrigger after content reveal
        ScrollTrigger.refresh();
        
        startRandomScares(); 
        startEmbers(); 
    }


    // 2. CURSOR LOGIC (Desktop Only)
    if (window.matchMedia("(pointer: fine)").matches) {
        const cursor = document.getElementById("cursor");
        const links = document.querySelectorAll("a, button, .item-card");

        document.addEventListener("mousemove", (e) => {
            gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
        });

        links.forEach(link => {
            link.addEventListener("mouseenter", () => cursor.classList.add("cursor-hover"));
            link.addEventListener("mouseleave", () => cursor.classList.remove("cursor-hover"));
        });
    }


    // 3. SCROLL REVEAL 
    gsap.utils.toArray(".item-card, .group").forEach((el, i) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });


    // 4. SEWER TRAP
    window.enterSewers = function() {
        const btn = document.querySelector("button[onclick='enterSewers()']");
        btn.innerHTML = "YOU'LL FLOAT TOO...";
        btn.classList.add("bg-black", "text-red-700");
        
        gsap.to("body", { x: [-10, 10, -10, 10, 0], duration: 0.5 });
        
        // Reduce particles on mobile for performance
        const particleCount = window.innerWidth < 768 ? 15 : 40;

        for(let i=0; i<particleCount; i++) {
            setTimeout(() => spawnBalloon(true), i * 80);
        }

        setTimeout(() => {
            document.body.style.transition = "background-color 2s";
            document.body.style.backgroundColor = "black";
            document.getElementById("content").style.opacity = "0";
            
            const laugh = document.createElement("div");
            laugh.className = "fixed inset-0 flex items-center justify-center z-[200]";
            laugh.innerHTML = "<h1 class='font-drip text-red-600 text-6xl md:text-9xl animate-pulse'>HAHAHAHAHA</h1>";
            document.body.appendChild(laugh);
        }, 3000);
    };
}


// 5. BALLOON SPAWNER (Performance optimized)
function startRandomScares() {
    setInterval(() => {
        // Less frequent on mobile
        const chance = window.innerWidth < 768 ? 0.2 : 0.4;
        if(Math.random() > (1 - chance)) spawnBalloon(false);
    }, 4000);
}

function spawnBalloon(isFast) {
    const container = document.getElementById("scare-container");
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");
    
    const left = Math.random() * window.innerWidth;
    balloon.style.left = `${left}px`;
    
    container.appendChild(balloon);
    
    gsap.to(balloon, {
        y: -window.innerHeight - 200,
        x: Math.random() * 100 - 50, 
        rotation: Math.random() * 20 - 10,
        duration: isFast ? Math.random() * 2 + 2 : Math.random() * 5 + 5,
        ease: "linear",
        onComplete: () => balloon.remove()
    });
}

// 6. EMBER PARTICLES (Performance optimized)
function startEmbers() {
    const container = document.getElementById("embers-container");
    // Throttled creation rate based on device width
    const intervalTime = window.innerWidth < 768 ? 400 : 100;

    setInterval(() => {
        const ember = document.createElement("div");
        ember.classList.add("ember");
        container.appendChild(ember);

        const size = Math.random() * 5 + 2;
        ember.style.width = `${size}px`;
        ember.style.height = `${size}px`;
        ember.style.left = `${Math.random() * 100}%`;
        ember.style.bottom = "-10px";

        gsap.to(ember, {
            y: -500 - Math.random() * 300,
            x: Math.random() * 100 - 50,
            opacity: 0,
            duration: Math.random() * 3 + 2,
            ease: "power1.out",
            onComplete: () => ember.remove()
        });
    }, intervalTime);
}