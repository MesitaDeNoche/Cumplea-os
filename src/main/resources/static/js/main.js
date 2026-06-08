/* ============================================================
   LOCKSCREEN — Cuenta regresiva hasta el 7 de junio
============================================================ */
(function initLockscreen() {
    const lockscreen = document.getElementById('lockscreen');
    if (!lockscreen) return;

    /* Fecha objetivo: 7 de junio del año actual (o siguiente si ya pasó) */
    function getBirthday() {
        const now  = new Date();
        let target = new Date(now.getFullYear(), 5, 7, 0, 0, 0); // mes 5 = junio
        if (now >= target) {
            /* Si ya pasó este año, apuntar al siguiente */
            target = new Date(now.getFullYear() + 1, 5, 7, 0, 0, 0);
        }
        return target;
    }

    function isBirthday() {
        const now = new Date();
        return now.getMonth() === 5 && now.getDate() === 7;
    }

    function pad(n) { return String(n).padStart(2, '0'); }

    function updateCountdown() {
        const now = new Date();

        if (isBirthday()) {
            unlock();
            return;
        }

        const target = getBirthday();
        const diff   = target - now;

        if (diff <= 0) {
            unlock();
            return;
        }

        const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('lsDays').textContent    = days;
        document.getElementById('lsHours').textContent   = pad(hours);
        document.getElementById('lsMinutes').textContent = pad(minutes);
        document.getElementById('lsSeconds').textContent = pad(seconds);
    }

    function spawnHearts() {
        const emojis = ['💜', '✨', '🤍', '💫', '💜'];
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const el = document.createElement('div');
                el.classList.add('unlock-heart');
                el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                el.style.left  = Math.random() * 100 + 'vw';
                el.style.animationDuration = (Math.random() * 1.5 + 1.2) + 's';
                el.style.animationDelay    = (Math.random() * 0.8) + 's';
                document.body.appendChild(el);
                setTimeout(() => el.remove(), 3000);
            }, i * 60);
        }
    }

    function unlock() {
        clearInterval(timer);
        spawnHearts();
        document.body.classList.remove('locked');
        lockscreen.classList.add('unlocked');
        /* Iniciar partículas del contenido principal */
        setTimeout(() => {
            const ev = new Event('DOMContentLoaded');
            document.dispatchEvent(ev);
        }, 900);
    }

    /* Partículas del lockscreen */
    const lockParticles = document.getElementById('lockParticles');
    if (lockParticles) {
        const colors = ['#c084fc', '#a855f7', '#e9d5ff', '#7c3aed', '#ffffff'];
        for (let i = 0; i < 40; i++) {
            const p = document.createElement('div');
            p.classList.add('particle');
            const size  = Math.random() * 5 + 2;
            const color = colors[Math.floor(Math.random() * colors.length)];
            p.style.cssText = `
                width:${size}px; height:${size}px;
                background:${color};
                left:${Math.random()*100}%;
                bottom:-10px;
                --dur:${(Math.random()*10+6).toFixed(1)}s;
                --delay:${(Math.random()*12).toFixed(1)}s;
                box-shadow:0 0 ${size*2}px ${color};
            `;
            lockParticles.appendChild(p);
        }
    }

    /* Si es el cumpleaños, desbloquear de inmediato */
    if (isBirthday()) {
        unlock();
        return;
    }

    /* Bloquear scroll mientras cuenta regresiva */
    document.body.classList.add('locked');

    /* Botón manual para ir a la página */
    const unlockBtn = document.getElementById('unlockBtn');
    if (unlockBtn) {
        unlockBtn.addEventListener('click', unlock);
    }

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
})();

/* ============================================================
   PARTÍCULAS DE FONDO
============================================================ */
(function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const colors = ['#c084fc', '#a855f7', '#e9d5ff', '#7c3aed', '#ffffff'];
    const count = 35;

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');

        const size = Math.random() * 6 + 2; // 2–8 px
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const dur = (Math.random() * 10 + 6).toFixed(1);   // 6–16 s
        const delay = (Math.random() * 12).toFixed(1);      // 0–12 s

        p.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            left: ${left}%;
            bottom: -10px;
            --dur: ${dur}s;
            --delay: ${delay}s;
            box-shadow: 0 0 ${size * 2}px ${color};
        `;
        container.appendChild(p);
    }
})();

/* ============================================================
   CARRUSEL + MODAL PANTALLA COMPLETA
============================================================ */
(function initCarousel() {
    const track     = document.getElementById('carouselTrack');
    const prevBtn   = document.getElementById('prevBtn');
    const nextBtn   = document.getElementById('nextBtn');
    const dotsWrap  = document.getElementById('carouselDots');

    if (!track) return;

    const slides = Array.from(track.querySelectorAll('.carousel-slide'));
    const total  = slides.length;
    let current  = 0;
    let autoTimer;

    /* ── Crear dots ── */
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        dot.setAttribute('aria-label', `Ir a la foto ${i + 1}`);
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
    });

    const dots = Array.from(dotsWrap.querySelectorAll('.carousel-dot'));

    /* ── Ir a slide ── */
    function goTo(index) {
        current = (index + total) % total;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
        prevBtn.disabled = false;
        nextBtn.disabled = false;
        resetAuto();
    }

    /* ── Botones carrusel ── */
    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    /* ── Auto-play cada 5 s ── */
    function startAuto() {
        autoTimer = setInterval(() => goTo(current + 1), 5000);
    }
    function resetAuto() {
        clearInterval(autoTimer);
        startAuto();
    }
    startAuto();

    /* ── Swipe táctil ── */
    let touchStartX = 0;
    track.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    track.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    }, { passive: true });

    /* ────────────────────────────────────────────
       MODAL PANTALLA COMPLETA
    ──────────────────────────────────────────── */
    const modal        = document.getElementById('photoModal');
    const modalImg     = document.getElementById('modalImg');
    const modalDate    = document.getElementById('modalDate');
    const modalDesc    = document.getElementById('modalDesc');
    const modalCounter = document.getElementById('modalCounter');
    const modalClose   = document.getElementById('modalClose');
    const modalPrev    = document.getElementById('modalPrev');
    const modalNext    = document.getElementById('modalNext');

    if (!modal) return;

    let modalCurrent = 0;

    /* Recopilar datos de cada slide */
    const slideData = slides.map(slide => ({
        src:  slide.querySelector('img').src,
        alt:  slide.querySelector('img').alt,
        date: slide.querySelector('.carousel-card__date').textContent,
        desc: slide.querySelector('.carousel-card__desc').textContent.trim()
    }));

    function openModal(index) {
        modalCurrent = (index + total) % total;
        updateModal();
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        modalClose.focus();
    }

    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    function updateModal() {
        const d = slideData[modalCurrent];
        modalImg.src     = d.src;
        modalImg.alt     = d.alt;
        modalDate.textContent = d.date;
        modalDesc.textContent = d.desc;
        modalCounter.textContent = `${modalCurrent + 1} / ${total}`;
    }

    function modalGoTo(index) {
        modalCurrent = (index + total) % total;
        /* Animación suave de fade */
        modalImg.style.opacity = '0';
        setTimeout(() => {
            updateModal();
            modalImg.style.opacity = '1';
        }, 180);
    }

    /* Abrir desde botón de cada slide */
    slides.forEach((slide, i) => {
        const btn = slide.querySelector('.carousel-card__fullscreen-btn');
        if (btn) btn.addEventListener('click', () => openModal(i));
        /* También al hacer clic en la imagen */
        const img = slide.querySelector('img');
        if (img) {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => openModal(i));
        }
    });

    /* Controles del modal */
    modalClose.addEventListener('click', closeModal);
    modalPrev.addEventListener('click', () => modalGoTo(modalCurrent - 1));
    modalNext.addEventListener('click', () => modalGoTo(modalCurrent + 1));

    /* Cerrar con Escape o clic en fondo */
    document.addEventListener('keydown', e => {
        if (!modal.classList.contains('open')) return;
        if (e.key === 'Escape')      closeModal();
        if (e.key === 'ArrowLeft')   modalGoTo(modalCurrent - 1);
        if (e.key === 'ArrowRight')  modalGoTo(modalCurrent + 1);
    });

    modal.addEventListener('click', e => {
        if (e.target === modal) closeModal();
    });

    /* Swipe táctil en el modal */
    let mTouchX = 0;
    modal.addEventListener('touchstart', e => { mTouchX = e.touches[0].clientX; }, { passive: true });
    modal.addEventListener('touchend', e => {
        const diff = mTouchX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) modalGoTo(diff > 0 ? modalCurrent + 1 : modalCurrent - 1);
    }, { passive: true });

    /* Transición suave de la imagen */
    modalImg.style.transition = 'opacity 0.18s ease';
})();

/* ============================================================
   CONSTELACIÓN — Starfield canvas + Puzzle
============================================================ */
(function initConstellation() {

    /* ── Starfield canvas ── */
    const canvas = document.getElementById('starCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let stars = [];

        function resizeCanvas() {
            canvas.width  = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            buildStars();
        }

        function buildStars() {
            stars = [];
            const count = Math.floor((canvas.width * canvas.height) / 3000);
            for (let i = 0; i < count; i++) {
                stars.push({
                    x:       Math.random() * canvas.width,
                    y:       Math.random() * canvas.height,
                    r:       Math.random() * 1.4 + 0.3,
                    alpha:   Math.random(),
                    speed:   Math.random() * 0.008 + 0.002,
                    dir:     Math.random() > 0.5 ? 1 : -1
                });
            }
        }

        function drawStars() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach(s => {
                s.alpha += s.speed * s.dir;
                if (s.alpha >= 1 || s.alpha <= 0) s.dir *= -1;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
                ctx.fill();
            });
            requestAnimationFrame(drawStars);
        }

        const ro = new ResizeObserver(resizeCanvas);
        ro.observe(canvas);
        resizeCanvas();
        drawStars();
    }

    /* ── Puzzle de constelación ── */
    const svg        = document.getElementById('constellationSvg');
    const linesGroup = document.getElementById('constLines');
    const progressEl = document.getElementById('constProgressText');
    const resetBtn   = document.getElementById('constReset');
    const message    = document.getElementById('constMessage');
    const msgClose   = document.getElementById('constMsgClose');

    if (!svg) return;

    const TOTAL = 8;
    let nextExpected = 1;
    let lastConnected = null; // {x, y}

    const starEls = Array.from(svg.querySelectorAll('.const-star'));

    function getStarEl(index) {
        return starEls.find(s => parseInt(s.dataset.index) === index);
    }

    function updateProgress() {
        if (nextExpected > TOTAL) {
            progressEl.innerHTML = '¡Constelación completa! 💜';
        } else {
            progressEl.innerHTML = `Toca la estrella <strong>${nextExpected}</strong>`;
        }
    }

    function markNext() {
        starEls.forEach(s => s.classList.remove('next'));
        if (nextExpected <= TOTAL) {
            getStarEl(nextExpected)?.classList.add('next');
        }
    }

    function drawLine(x1, y1, x2, y2) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        linesGroup.appendChild(line);
    }

    function openMessage() {
        setTimeout(() => {
            message.classList.add('open');
        }, 600);
    }

    function reset() {
        nextExpected  = 1;
        lastConnected = null;
        linesGroup.innerHTML = '';
        starEls.forEach(s => {
            s.classList.remove('done', 'next');
        });
        markNext();
        updateProgress();
        message.classList.remove('open');
    }

    /* Click / tap en cada estrella */
    starEls.forEach(starEl => {
        starEl.addEventListener('click', () => {
            const idx = parseInt(starEl.dataset.index);
            if (idx !== nextExpected) return; // orden incorrecto, ignorar

            const x = parseFloat(starEl.dataset.x);
            const y = parseFloat(starEl.dataset.y);

            /* Dibujar línea desde la anterior */
            if (lastConnected) {
                drawLine(lastConnected.x, lastConnected.y, x, y);
            }

            /* Cerrar el polígono al llegar a la última */
            if (idx === TOTAL) {
                const first = getStarEl(1);
                drawLine(x, y, parseFloat(first.dataset.x), parseFloat(first.dataset.y));
            }

            starEl.classList.add('done');
            starEl.classList.remove('next');
            lastConnected = { x, y };
            nextExpected++;

            updateProgress();
            markNext();

            if (nextExpected > TOTAL) openMessage();
        });
    });

    /* Reset */
    resetBtn.addEventListener('click', reset);
    msgClose.addEventListener('click', () => message.classList.remove('open'));
    message.addEventListener('click', e => { if (e.target === message) message.classList.remove('open'); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') message.classList.remove('open'); });

    /* Iniciar */
    reset();
})();

/* ============================================================
   CONTADOR DE DÍAS JUNTOS
============================================================ */
(function initDayCounter() {
    const START = new Date('2022-12-07T00:00:00');

    function calculate() {
        const now   = new Date();
        const diffMs = now - START;
        const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        /* Desglose exacto en años, meses y días restantes */
        let y = now.getFullYear() - START.getFullYear();
        let m = now.getMonth()    - START.getMonth();
        let d = now.getDate()     - START.getDate();

        if (d < 0) {
            m--;
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            d += prevMonth.getDate();
        }
        if (m < 0) { y--; m += 12; }

        return { totalDays, y, m, d };
    }

    function animateNumber(el, target, duration) {
        const start     = performance.now();
        const startVal  = 0;
        const update = (time) => {
            const elapsed  = time - start;
            const progress = Math.min(elapsed / duration, 1);
            /* Ease out cubic */
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(startVal + (target - startVal) * eased);
            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = target;
        };
        requestAnimationFrame(update);
    }

    function render() {
        const { totalDays, y, m, d } = calculate();
        const elDays   = document.getElementById('dayCount');
        const elYears  = document.getElementById('yearsCount');
        const elMonths = document.getElementById('monthsCount');
        const elDaysR  = document.getElementById('daysCount');

        if (!elDays) return;

        animateNumber(elDays,   totalDays, 2000);
        animateNumber(elYears,  y,         1200);
        animateNumber(elMonths, m,         1400);
        animateNumber(elDaysR,  d,         1600);
    }

    /* Lanzar cuando la sección entra en pantalla */
    const section = document.getElementById('counter-section');
    if (!section) return;

    let triggered = false;
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !triggered) {
            triggered = true;
            render();
            observer.disconnect();
        }
    }, { threshold: 0.3 });

    observer.observe(section);

    /* Actualizar a medianoche sin recargar */
    function msUntilMidnight() {
        const now  = new Date();
        const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        return next - now;
    }
    setTimeout(function tick() {
        if (triggered) render();
        setTimeout(tick, msUntilMidnight());
    }, msUntilMidnight());
})();

/* ============================================================
   SCROLL REVEAL
============================================================ */
(function initScrollReveal() {
    const targets = document.querySelectorAll(
        '.carousel-section__header, .carousel-wrapper, .carousel-dots, .closing__content, .song-section__content'
    );

    targets.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    targets.forEach(el => observer.observe(el));
})();

/* ============================================================
   SMOOTH SCROLL para el botón CTA
============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
