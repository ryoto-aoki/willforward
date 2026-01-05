/**
 * We are the World - Site Interactions
 * スクロールアニメーション・スムーズスクロール
 */

(function () {
    'use strict';

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMobile = document.querySelector('.nav-mobile');
    const overlay = document.querySelector('.menu-overlay');

    if (menuToggle && navMobile && overlay) {
        // Toggle menu
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMobile.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking overlay
        overlay.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMobile.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close menu when clicking nav link
        navMobile.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMobile.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ========================================
    // Scroll Fade-in Animation
    // ========================================
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach((element) => {
        fadeInObserver.observe(element);
    });

    // ========================================
    // Smooth Scroll for Navigation Links
    // ========================================
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href === '#') return;

            e.preventDefault();

            const target = document.querySelector(href);
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

    // ========================================
    // Hero Scroll Indicator Hide on Scroll
    // ========================================
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (scrollIndicator) {
        let scrollTimeout;

        window.addEventListener('scroll', () => {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(() => {
                    const scrollY = window.scrollY;

                    if (scrollY > 100) {
                        scrollIndicator.style.opacity = '0';
                    } else {
                        scrollIndicator.style.opacity = '1';
                    }

                    scrollTimeout = null;
                }, 10);
            }
        });
    }

    // ========================================
    // Parallax Effect for Hero Circles (subtle)
    // ========================================
    const heroSection = document.querySelector('.hero');
    const circles = document.querySelectorAll('.circle');

    if (heroSection && circles.length > 0) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroHeight = heroSection.offsetHeight;

            if (scrollY < heroHeight) {
                const parallaxFactor = scrollY * 0.15;

                circles.forEach((circle, index) => {
                    const direction = index === 0 ? 1 : -1;
                    circle.style.transform = `translateY(calc(-50% + ${parallaxFactor * direction}px))`;
                });
            }
        });
    }

    // ========================================
    // Add loaded class for initial animations
    // ========================================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // ========================================
    // Members Marquee Drag Functionality
    // ========================================
    const membersMarquee = document.querySelector('.members-marquee');
    const membersTrack = document.querySelector('.members-track');

    if (membersMarquee && membersTrack) {
        let isDragging = false;
        let startX = 0;
        let prevPosition = 0;
        let animationId = null;
        const speed = 1; // pixels per frame (adjust for speed)
        const trackWidth = membersTrack.scrollWidth / 2; // Half because content is duplicated
        
        // Start from middle position for seamless loop appearance
        let currentPosition = -trackWidth / 2;

        // Disable CSS animation, use JS instead
        membersTrack.style.animation = 'none';

        // Auto scroll function
        const autoScroll = () => {
            if (!isDragging) {
                currentPosition -= speed;
                // Loop back when reached end of first set
                if (Math.abs(currentPosition) >= trackWidth) {
                    currentPosition = 0;
                }
                // Loop forward when dragged past start
                if (currentPosition > 0) {
                    currentPosition = -trackWidth;
                }
                membersTrack.style.transform = `translateX(${currentPosition}px)`;
            }
            animationId = requestAnimationFrame(autoScroll);
        };

        // Start auto scroll
        autoScroll();

        // Mouse events
        membersMarquee.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            prevPosition = currentPosition;
            membersMarquee.style.cursor = 'grabbing';
            e.preventDefault();
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const deltaX = e.clientX - startX;
            currentPosition = prevPosition + deltaX;
            membersTrack.style.transform = `translateX(${currentPosition}px)`;
        });

        window.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                membersMarquee.style.cursor = 'grab';
                // Auto scroll resumes immediately from current position
            }
        });

        // Touch events for mobile
        membersMarquee.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].clientX;
            prevPosition = currentPosition;
        }, { passive: true });

        membersMarquee.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const deltaX = e.touches[0].clientX - startX;
            currentPosition = prevPosition + deltaX;
            membersTrack.style.transform = `translateX(${currentPosition}px)`;
        }, { passive: true });

        membersMarquee.addEventListener('touchend', () => {
            isDragging = false;
            // Auto scroll resumes immediately from current position
        });

        // Set initial cursor style
        membersMarquee.style.cursor = 'grab';
    }

})();
