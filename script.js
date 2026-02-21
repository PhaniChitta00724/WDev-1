/* ========================================
   DeVASTHRA — Culture in Motion
   Interactive Functionality
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ── Element References ──
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');

    // ── DeVASTHRA Brand Colors ──
    const BRAND_MAROON = '#6B0F2B';
    const BRAND_GOLD = '#DAA520';

    // ── 1. Sticky Header Shadow on Scroll ──
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    }, { passive: true });

    // ── 2. Mobile Hamburger Menu ──
    function openMenu() {
        hamburger.classList.add('active');
        navLinks.classList.add('open');
        mobileOverlay.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        mobileOverlay.classList.remove('visible');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    mobileOverlay.addEventListener('click', closeMenu);

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // ── 3. Smooth Scroll for Anchor Links ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ── 4. Scroll-Triggered Fade-In Animations ──
    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // ── 5. Toast Notification Helper ──
    let toastTimeout;
    function showToast(message) {
        clearTimeout(toastTimeout);
        toastMessage.textContent = message;
        toast.classList.add('show');
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // ── 6. Add to Cart Buttons ──
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productName = btn.getAttribute('data-product');
            showToast(`${productName} added to cart`);

            // Button feedback animation with brand color
            btn.textContent = '✓ Added';
            btn.style.background = BRAND_GOLD;
            btn.style.color = '#fff';
            setTimeout(() => {
                btn.textContent = 'Add to Cart';
                btn.style.background = '';
                btn.style.color = '';
            }, 2000);
        });
    });

    // ── 7. Product Size Selection ──
    document.querySelectorAll('.product-sizes span').forEach(sizeBtn => {
        sizeBtn.addEventListener('click', () => {
            // Deselect siblings
            const parent = sizeBtn.parentElement;
            parent.querySelectorAll('span').forEach(s => {
                s.style.borderColor = '';
                s.style.color = '';
                s.style.background = '';
            });
            // Select with brand maroon
            sizeBtn.style.borderColor = BRAND_MAROON;
            sizeBtn.style.color = BRAND_MAROON;
            sizeBtn.style.background = 'rgba(107, 15, 43, 0.08)';
        });
    });

    // ── 8. Contact Form Validation ──
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const message = document.getElementById('contactMessage').value.trim();

        if (!name || !email || !message) {
            showToast('Please fill in all fields');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast('Please enter a valid email address');
            return;
        }

        showToast('Message sent successfully!');
        contactForm.reset();
    });

    // ── 9. Newsletter Form ──
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input');
        const email = input.value.trim();

        if (!email) {
            showToast('Please enter your email');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast('Please enter a valid email address');
            return;
        }

        showToast('Welcome to the DeVASTHRA family!');
        input.value = '';
    });

    // ── 10. Active Nav Link on Scroll ──
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');

    function setActiveNavLink() {
        const scrollY = window.pageYOffset + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                navAnchors.forEach(a => {
                    a.style.color = '';
                    if (a.getAttribute('href') === `#${id}`) {
                        a.style.color = BRAND_MAROON;
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveNavLink, { passive: true });
    setActiveNavLink();
});
