// ========================================
// FARES AHMED PORTFOLIO
// Interactive Features
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    // Enable reveal animations only when JS is running
    document.documentElement.classList.add("js-enabled");

    // 1. MOBILE NAVIGATION
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", isOpen);
            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        // Close the menu after clicking a navigation link
        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";
            });
        });

        // Close the menu when returning to desktop width
        window.addEventListener("resize", () => {
            if (window.innerWidth > 760) {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";
            }
        });
    }


    // 2. SCROLL PROGRESS BAR
    const scrollProgress = document.getElementById("scrollProgress");

    function updateScrollProgress() {
        if (!scrollProgress) return;

        const scrollableHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        if (scrollableHeight <= 0) {
            scrollProgress.style.width = "0%";
            return;
        }

        const progress =
            (window.scrollY / scrollableHeight) * 100;

        scrollProgress.style.width = `${Math.min(progress, 100)}%`;
    }

    window.addEventListener("scroll", updateScrollProgress, {
        passive: true
    });

    window.addEventListener("resize", updateScrollProgress);
    updateScrollProgress();


    // 3. REVEAL ELEMENTS WHEN THEY ENTER THE SCREEN
    const revealElements = document.querySelectorAll(".reveal");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !prefersReducedMotion) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -30px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        // Fallback for older browsers or reduced-motion preferences
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }


    // 4. SMOOTH SCROLL FOR INTERNAL LINKS
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: prefersReducedMotion ? "auto" : "smooth",
                    block: "start"
                });
            }
        });
    });


    // 5. CURRENT YEAR IN THE FOOTER
    const copyright = document.querySelector(".copyright");

    if (copyright) {
        copyright.textContent =
            `© ${new Date().getFullYear()} Fares Ahmed. Built with curiosity.`;
    }


    // 6. SMALL CONSOLE MESSAGE FOR DEVELOPERS
    console.log(
        "%cFARES AHMED PORTFOLIO",
        "font-size:18px;font-weight:bold;color:#4169f5;"
    );

    console.log(
        "Thanks for checking out my portfolio. Keep learning and building!"
    );

});
