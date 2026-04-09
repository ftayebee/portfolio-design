$(document).ready(function () {
    // Apply stored theme on page load
    const toggleBtn = $('#toggle-theme');
    const themeIcon = $('.theme-icon');

    // Apply saved theme on load
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.dataset.theme = savedTheme;
    updateIcon(savedTheme);

    // Toggle theme
    toggleBtn.on('click', function () {
        const currentTheme = document.documentElement.dataset.theme;
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = newTheme;
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        if (theme === 'dark') {
            themeIcon.html(`
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                    class="bi bi-sun-fill" viewBox="0 0 16 16">
                    <path d="M8 0a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 8 0zm0 14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5zM0 8a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1A.5.5 0 0 1 0 8zm14 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zM3.354 3.354a.5.5 0 1 1 .707-.707l.707.707a.5.5 0 1 1-.707.707l-.707-.707zm9.192 9.192a.5.5 0 1 1 .707-.707l.707.707a.5.5 0 1 1-.707.707l-.707-.707zM3.354 12.646a.5.5 0 1 1 .707.707l-.707.707a.5.5 0 1 1-.707-.707l.707-.707zm9.192-9.192a.5.5 0 1 1 .707.707l-.707.707a.5.5 0 1 1-.707-.707l.707-.707zM8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"/>
                </svg>
            `);
        } else {
            themeIcon.html(`
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                    class="bi bi-moon-fill" viewBox="0 0 16 16">
                    <path d="M6 0a6 6 0 0 0 0 12c3.3 0 6-2.7 6-6S9.3 0 6 0z"/>
                </svg>
            `);
        }
    }

    window.addEventListener("scroll", function () {
        const navbar = document.getElementById("main-navbar");
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    const techSwiper = new Swiper('.techSwiper', {
        slidesPerView: 5,
        spaceBetween: 40,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        breakpoints: {
            320: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 5, spaceBetween: 40 },
        },
    });

    const marquee = document.querySelector('.sec-banner .marquee-content');
    if (marquee) {
        marquee.innerHTML += marquee.innerHTML;
    }

    const industriesMarquee = document.querySelector('.industries-section .marquee-content');
    if (industriesMarquee) {
        industriesMarquee.innerHTML += industriesMarquee.innerHTML;
    }

    document.querySelectorAll('.dev-step').forEach(step => {
        step.addEventListener('mouseenter', function () {

            document.querySelectorAll('.dev-step').forEach(s => s.classList.remove('active'));
            this.classList.add('active');

            const imgSrc = this.getAttribute('data-image');
            const img = document.getElementById('dev-main-image');

            img.style.opacity = 0;
            setTimeout(() => {
                img.src = imgSrc;
                img.style.opacity = 1;
            }, 200);
        });
    });

    const testimonialSwiper = new Swiper('.testimonial-swiper', {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        navigation: {
            nextEl: '#testNext',
            prevEl: '#testPrev',
        },
        pagination: {
            el: '.testimonial-pagination',
            clickable: true,
        },
        breakpoints: {
            768:  { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 }
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        }
    });

    document.addEventListener("scroll", function () {
        const cards = document.querySelectorAll(".dev-sticky-card");
        const img = document.getElementById("dev-main-image");

        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
                img.src = card.getAttribute("data-image");
            }
        });
    });

    const revealElements = document.querySelectorAll('.scroll-reveal');

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.2, // Trigger when 20% of element is visible
        }
    );

    // Observe each element
    revealElements.forEach(el => observer.observe(el));

    const openBtn  = document.getElementById("openThemePanel");
    const closeBtn = document.getElementById("closeThemePanel");
    const panel    = document.getElementById("theme-panel");
    const backdrop = document.getElementById("theme-backdrop");

    function openPanel()  { panel.classList.add("active");    backdrop.classList.add("active");    }
    function closePanel() { panel.classList.remove("active"); backdrop.classList.remove("active"); }

    if (openBtn)  openBtn.addEventListener("click", openPanel);
    if (closeBtn) closeBtn.addEventListener("click", closePanel);
    backdrop.addEventListener("click", closePanel);
    document.addEventListener("keydown", e => { if (e.key === "Escape") closePanel(); });

    function initTypewriter(sectionSelector, delay = 0) {
        const lines = document.querySelectorAll(`${sectionSelector} .ft-typewriter-lines .line`);
        let index = 0;

        function showNextLine() {
            lines.forEach(l => {
                l.style.display = "none";
                l.style.width = "0";
            });

            const current = lines[index];
            current.style.display = "block";

            // Restart animation
            current.style.animation = "none";
            void current.offsetWidth;
            current.style.animation = "typing 2.5s steps(40, end), blink 0.6s step-end infinite alternate";

            index = (index + 1) % lines.length;
        }

        // Start after delay
        setTimeout(() => {
            showNextLine();
            setInterval(showNextLine, 3000);
        }, delay);
    }

    // Initialize for each step with delays (in ms)
    initTypewriter(".step-1", 0);       // Step 1 starts immediately
    initTypewriter(".step-2", 500);     // Step 2 starts after 0.5s
    initTypewriter(".step-3", 1000);    // Step 3 starts after 1s
    initTypewriter(".step-4", 1500);    // Step 4 starts after 1.5s

    /* ===========================
    CHANGE BANNER BACKGROUND
    =========================== */
    document.querySelectorAll(".bg-item").forEach(item => {
        item.addEventListener("click", () => {
            const bg = item.dataset.bg;
            const banner = document.querySelector(".sec-banner");
            if (banner) {
                banner.style.backgroundImage = `url(${bg})`;
            }
            document.querySelectorAll(".bg-item").forEach(i => i.classList.remove("selected"));
            item.classList.add("selected");
            try { localStorage.setItem("ft-banner-bg", bg); } catch(e) {}
        });
    });

    /* ===========================
    CHANGE THEME COLOR
    =========================== */
    document.querySelectorAll(".color-item").forEach(color => {
        color.addEventListener("click", () => {
            const theme = color.dataset.theme;
            document.body.setAttribute("data-theme", theme);
            document.querySelectorAll(".color-item").forEach(c => c.classList.remove("selected"));
            color.classList.add("selected");
            try { localStorage.setItem("ft-theme", theme); } catch(e) {}
        });
    });

    /* ===========================
    CARD CORNER STYLE
    =========================== */
    document.querySelectorAll(".font-btn[data-radius]").forEach(btn => {
        btn.addEventListener("click", () => {
            const val = btn.dataset.radius;
            document.body.setAttribute("data-radius", val === "rounded" ? "" : "sharp");
            document.querySelectorAll(".font-btn[data-radius]").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            try { localStorage.setItem("ft-radius", val); } catch(e) {}
        });
    });

    /* ===========================
    FONT SCALE
    =========================== */
    document.querySelectorAll(".font-btn[data-font-scale]").forEach(btn => {
        btn.addEventListener("click", () => {
            const val = btn.dataset.fontScale;
            document.body.setAttribute("data-font-scale", val);
            document.querySelectorAll(".font-btn[data-font-scale]").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            try { localStorage.setItem("ft-font-scale", val); } catch(e) {}
        });
    });

    /* ===========================
    GLASS EFFECT TOGGLE
    =========================== */
    const toggleGlass = document.getElementById("toggleGlass");
    if (toggleGlass) {
        toggleGlass.addEventListener("change", () => {
            document.body.setAttribute("data-glass", toggleGlass.checked ? "on" : "off");
            try { localStorage.setItem("ft-glass", toggleGlass.checked ? "on" : "off"); } catch(e) {}
        });
    }

    /* ===========================
    ANIMATIONS TOGGLE
    =========================== */
    const toggleAnim = document.getElementById("toggleAnimations");
    if (toggleAnim) {
        toggleAnim.addEventListener("change", () => {
            if (!toggleAnim.checked) {
                document.querySelectorAll(".scroll-reveal").forEach(el => {
                    el.classList.add("visible");
                });
            }
            try { localStorage.setItem("ft-animations", toggleAnim.checked ? "on" : "off"); } catch(e) {}
        });
    }

    /* ===========================
    RESET TO DEFAULT
    =========================== */
    const resetBtn = document.getElementById("resetTheme");
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            document.body.setAttribute("data-theme", "dark-green");
            document.body.removeAttribute("data-radius");
            document.body.removeAttribute("data-font-scale");
            document.body.setAttribute("data-glass", "on");
            const banner = document.querySelector(".sec-banner");
            if (banner) banner.style.backgroundImage = "";
            document.querySelectorAll(".color-item").forEach((c,i) => c.classList.toggle("selected", i === 0));
            document.querySelectorAll(".bg-item").forEach((b,i) => b.classList.toggle("selected", i === 0));
            document.querySelectorAll(".font-btn[data-radius]").forEach((b,i) => b.classList.toggle("active", i === 0));
            document.querySelectorAll(".font-btn[data-font-scale]").forEach((b,i) => b.classList.toggle("active", i === 0));
            if (toggleGlass) { toggleGlass.checked = true; }
            if (toggleAnim)  { toggleAnim.checked = true; }
            try {
                localStorage.removeItem("ft-theme");
                localStorage.removeItem("ft-banner-bg");
                localStorage.removeItem("ft-radius");
                localStorage.removeItem("ft-font-scale");
                localStorage.removeItem("ft-glass");
            } catch(e) {}
        });
    }

    /* ===========================
    RESTORE SAVED SETTINGS
    =========================== */
    (function restoreSettings() {
        try {
            const savedTheme = localStorage.getItem("ft-theme");
            if (savedTheme) {
                document.body.setAttribute("data-theme", savedTheme);
                document.querySelectorAll(".color-item").forEach(c => {
                    c.classList.toggle("selected", c.dataset.theme === savedTheme);
                });
            }
            const savedBg = localStorage.getItem("ft-banner-bg");
            if (savedBg) {
                const banner = document.querySelector(".sec-banner");
                if (banner) banner.style.backgroundImage = `url(${savedBg})`;
                document.querySelectorAll(".bg-item").forEach(b => {
                    b.classList.toggle("selected", b.dataset.bg === savedBg);
                });
            }
            const savedRadius = localStorage.getItem("ft-radius");
            if (savedRadius === "sharp") {
                document.body.setAttribute("data-radius", "sharp");
                document.querySelectorAll(".font-btn[data-radius]").forEach(b => {
                    b.classList.toggle("active", b.dataset.radius === "sharp");
                });
            }
            const savedScale = localStorage.getItem("ft-font-scale");
            if (savedScale === "large") {
                document.body.setAttribute("data-font-scale", "large");
                document.querySelectorAll(".font-btn[data-font-scale]").forEach(b => {
                    b.classList.toggle("active", b.dataset.fontScale === "large");
                });
            }
            const savedGlass = localStorage.getItem("ft-glass");
            if (savedGlass === "off") {
                document.body.setAttribute("data-glass", "off");
                if (toggleGlass) toggleGlass.checked = false;
            }
        } catch(e) {}
    })();

});


/* =============================================================================
   PHASE 1 — FOUNDATION JS
   Vanilla JS — runs independently of jQuery, outside $(document).ready.
   ============================================================================= */

/* -----------------------------------------------------------------------------
   1. PAGE LOADER
   Hides the .page-loader overlay once all assets (window.load) are ready.
   A 300ms minimum display ensures the animation always completes gracefully.
   ----------------------------------------------------------------------------- */
(function () {
    const loader = document.querySelector('.page-loader');
    if (!loader) return;

    const minDisplay = 400; // ms — prevents instant flash on fast connections
    const start = performance.now();

    function hideLoader() {
        const elapsed = performance.now() - start;
        const remaining = Math.max(0, minDisplay - elapsed);
        setTimeout(function () {
            loader.classList.add('loaded');
        }, remaining);
    }

    if (document.readyState === 'complete') {
        hideLoader();
    } else {
        window.addEventListener('load', hideLoader);
    }
})();


/* -----------------------------------------------------------------------------
   2. SCROLL PROGRESS BAR
   Tracks scroll depth as a percentage and updates the bar width.
   ----------------------------------------------------------------------------- */
(function () {
    const bar = document.querySelector('.scroll-progress-bar');
    if (!bar) return;

    function updateBar() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = pct + '%';
    }

    window.addEventListener('scroll', updateBar, { passive: true });
    updateBar(); // set initial state
})();


/* -----------------------------------------------------------------------------
   3. BACK TO TOP BUTTON
   Shows after 400px of scrolling. Smooth-scrolls to top on click.
   ----------------------------------------------------------------------------- */
(function () {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    btn.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();


/* -----------------------------------------------------------------------------
   4. COUNT-UP ANIMATION
   Triggered by IntersectionObserver when .stat-counter-number enters viewport.
   Usage: <span class="stat-counter-number" data-count="150" data-suffix="+">0</span>
   ----------------------------------------------------------------------------- */
(function () {
    const counters = document.querySelectorAll('.stat-counter-number[data-count]');
    if (!counters.length) return;

    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    function animateCounter(el) {
        const target  = parseFloat(el.dataset.count)  || 0;
        const suffix  = el.dataset.suffix  || '';
        const prefix  = el.dataset.prefix  || '';
        const decimal = el.dataset.decimal ? parseInt(el.dataset.decimal) : 0;
        const duration = 1800; // ms
        let startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed  = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased    = easeOutQuart(progress);
            const current  = target * eased;

            el.textContent = prefix + current.toFixed(decimal) + suffix;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = prefix + target.toFixed(decimal) + suffix;
            }
        }

        requestAnimationFrame(step);
    }

    const counterObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(function (el) {
        counterObserver.observe(el);
    });
})();


/* -----------------------------------------------------------------------------
   5. ACTIVE NAV STATE
   Reads data-page attribute from <body> and adds .active class to the
   matching nav link (identified by .nav-{pagename} class).
   ----------------------------------------------------------------------------- */
(function () {
    const page = document.body.dataset.page;
    if (!page) return;

    // Desktop + mobile nav links
    const target = document.querySelectorAll('.nav-' + page);
    target.forEach(function (link) {
        link.classList.add('active');
    });
})();


/* -----------------------------------------------------------------------------
   6. PAGE TRANSITION OVERLAY
   Fades the overlay in on outgoing link click, then navigates.
   The overlay fades out automatically on the incoming page (CSS handles it).
   Only applies to same-origin internal links; ignores #anchors, new-tab links,
   and the current page.
   ----------------------------------------------------------------------------- */
(function () {
    const overlay = document.querySelector('.page-transition-overlay');
    if (!overlay) return;

    // Fade out on page entry
    window.addEventListener('pageshow', function () {
        overlay.classList.remove('entering');
    });

    document.addEventListener('click', function (e) {
        const link = e.target.closest('a[href]');
        if (!link) return;

        const href = link.getAttribute('href');

        // Skip: external, new-tab, anchor-only, javascript:, mailto:, tel:
        if (
            !href ||
            href.startsWith('#') ||
            href.startsWith('mailto:') ||
            href.startsWith('tel:') ||
            href.startsWith('javascript:') ||
            link.target === '_blank' ||
            link.origin !== window.location.origin
        ) return;

        // Skip if already on this page
        if (link.href === window.location.href) return;

        e.preventDefault();
        overlay.classList.add('entering');

        setTimeout(function () {
            window.location.href = href;
        }, 340);
    });
})();


/* -----------------------------------------------------------------------------
   7. MOBILE DRAWER
   Full-screen slide-in nav drawer. Replaces Bootstrap collapse for mobile.
   Handles toggle, close on link click, close on ESC, body scroll lock.
   ----------------------------------------------------------------------------- */
(function () {
    const toggle   = document.getElementById('mobileToggle');
    const drawer   = document.getElementById('mobileMenu');
    const navbar   = document.getElementById('main-navbar');
    if (!toggle || !drawer) return;

    function openDrawer() {
        drawer.classList.add('is-open');
        drawer.removeAttribute('aria-hidden');
        toggle.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.classList.add('drawer-open');
    }

    function closeDrawer() {
        drawer.classList.remove('is-open');
        drawer.setAttribute('aria-hidden', 'true');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('drawer-open');
    }

    toggle.addEventListener('click', function () {
        const isOpen = drawer.classList.contains('is-open');
        isOpen ? closeDrawer() : openDrawer();
    });

    // Close on any link click inside drawer
    drawer.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeDrawer);
    });

    // Close on ESC key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
            closeDrawer();
            toggle.focus();
        }
    });

    // Close if user taps outside drawer (on the translucent area)
    document.addEventListener('click', function (e) {
        if (drawer.classList.contains('is-open')
            && !drawer.contains(e.target)
            && e.target !== toggle
            && !toggle.contains(e.target)) {
            closeDrawer();
        }
    });
})();


/* -----------------------------------------------------------------------------
   8. GLASS ACCORDION — custom toggle (supplements Bootstrap)
   Adds .open on the .accordion-item when its panel is open so the gradient
   border rule in CSS applies correctly.
   ----------------------------------------------------------------------------- */
(function () {
    document.querySelectorAll('.glass-accordion .accordion-button').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const item = btn.closest('.accordion-item');
            if (!item) return;

            // BS fires its own collapse; we just sync the .open class
            const targetId = btn.dataset.bsTarget || btn.getAttribute('data-bs-target');
            const panel = targetId ? document.querySelector(targetId) : null;

            if (panel) {
                // Wait one tick for BS to toggle the class
                setTimeout(function () {
                    const isOpen = panel.classList.contains('show');
                    item.classList.toggle('open', isOpen);
                }, 10);
            }
        });
    });
})();


/* -----------------------------------------------------------------------------
   8. FORM VALIDATION + TOAST HELPER
   Lightweight validation for .contact-form-wrapper forms.
   Usage: <form class="ft-form" novalidate> ... </form>
   Toast: showToast('Message text', 'success' | 'error')
   ----------------------------------------------------------------------------- */
(function () {

    // ── Toast ──────────────────────────────────────────────────────────────────
    window.showToast = function (message, type) {
        type = type || 'success';
        let toast = document.querySelector('.form-toast');

        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'form-toast';
            toast.innerHTML = '<span class="form-toast-icon"></span><span class="form-toast-msg"></span>';
            document.body.appendChild(toast);
        }

        toast.className = 'form-toast toast-' + type;
        toast.querySelector('.form-toast-icon').className =
            'form-toast-icon ' + (type === 'success' ? 'ri-checkbox-circle-line' : 'ri-error-warning-line');
        toast.querySelector('.form-toast-msg').textContent = message;

        // Show
        requestAnimationFrame(function () {
            toast.classList.add('show');
        });

        // Auto-hide after 4s
        clearTimeout(toast._hideTimer);
        toast._hideTimer = setTimeout(function () {
            toast.classList.remove('show');
        }, 4000);
    };

    // ── Inline form validation ──────────────────────────────────────────────────
    document.querySelectorAll('form.ft-form').forEach(function (form) {

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            let valid = true;

            // Validate required fields
            form.querySelectorAll('[required]').forEach(function (field) {
                const value = field.value.trim();
                const isEmpty = value === '';
                const isEmail = field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

                if (isEmpty || isEmail) {
                    field.classList.add('is-invalid');
                    field.classList.remove('is-valid');
                    valid = false;
                } else {
                    field.classList.remove('is-invalid');
                    field.classList.add('is-valid');
                }
            });

            if (!valid) {
                showToast('Please fill in all required fields correctly.', 'error');
                return;
            }

            // Loading state
            const submitBtn = form.querySelector('[type="submit"]');
            if (submitBtn) submitBtn.classList.add('btn-submit-loading');

            // Simulate async submission (replace with real fetch in production)
            setTimeout(function () {
                if (submitBtn) submitBtn.classList.remove('btn-submit-loading');
                showToast('Message sent successfully! I\'ll be in touch soon.', 'success');
                form.reset();
                form.querySelectorAll('.is-valid').forEach(function (f) {
                    f.classList.remove('is-valid');
                });
            }, 1800);
        });

        // Live validation: clear error on input
        form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(function (field) {
            field.addEventListener('input', function () {
                if (field.value.trim()) {
                    field.classList.remove('is-invalid');
                }
            });
        });
    });

})();


/* -----------------------------------------------------------------------------
   9. COUNTDOWN TIMER  (Coming Soon page)
   Usage: <div class="ft-countdown" data-target="2026-12-31T00:00:00"></div>
   Looks for .countdown-block elements with IDs: cd-days, cd-hours, cd-mins, cd-secs
   ----------------------------------------------------------------------------- */
(function () {
    const cdWrap = document.querySelector('.ft-countdown');
    if (!cdWrap) return;

    const targetDate = new Date(cdWrap.dataset.target).getTime();
    if (isNaN(targetDate)) return;

    const daysEl  = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl  = document.getElementById('cd-mins');
    const secsEl  = document.getElementById('cd-secs');

    function pad(n) {
        return String(n).padStart(2, '0');
    }

    function tick() {
        const now  = Date.now();
        const diff = Math.max(0, targetDate - now);

        const days  = Math.floor(diff / 86400000);
        const hours = Math.floor((diff % 86400000) / 3600000);
        const mins  = Math.floor((diff % 3600000)  / 60000);
        const secs  = Math.floor((diff % 60000)    / 1000);

        function update(el, val) {
            if (!el) return;
            const str = pad(val);
            if (el.textContent !== str) {
                el.textContent = str;
                // Tick animation
                el.closest('.countdown-block').classList.add('tick');
                setTimeout(function () {
                    el.closest('.countdown-block').classList.remove('tick');
                }, 200);
            }
        }

        update(daysEl,  days);
        update(hoursEl, hours);
        update(minsEl,  mins);
        update(secsEl,  secs);

        if (diff > 0) {
            setTimeout(tick, 1000);
        }
    }

    tick();
})();


/* -----------------------------------------------------------------------------
   10. TABLE OF CONTENTS — Active Section Highlight  (Legal pages, Blog)
   Observes h2 elements in .article-body and highlights the corresponding
   .toc-list a link as each section scrolls into view.
   ----------------------------------------------------------------------------- */
(function () {
    const tocLinks = document.querySelectorAll('.toc-list a');
    if (!tocLinks.length) return;

    const headings = document.querySelectorAll('.article-body h2[id]');
    if (!headings.length) return;

    const tocObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                tocLinks.forEach(function (link) {
                    link.classList.toggle(
                        'active',
                        link.getAttribute('href') === '#' + entry.target.id
                    );
                });
            }
        });
    }, {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    });

    headings.forEach(function (h) { tocObserver.observe(h); });
})();
