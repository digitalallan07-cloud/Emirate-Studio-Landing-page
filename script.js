/* ==========================================
   EMIRATES STUDIOS - PREMIUM INTERACTIONS
   Apple-Style Smooth Animations & UX
   ========================================== */

'use strict';

// ==========================================
// CONFIGURATION
// ==========================================

const CONFIG = {
    animationDuration: 300,
    scrollOffset: 80,
    statsAnimationSpeed: 50,
    testimonialAutoPlay: true,
    testimonialInterval: 5000
};

// ==========================================
// DOM ELEMENTS
// ==========================================

const DOM = {
    nav: document.getElementById('nav'),
    navToggle: document.getElementById('navToggle'),
    navLinks: document.getElementById('navLinks'),
    heroVideo: document.querySelector('.hero-video'),
    contactForm: document.getElementById('contactForm'),
    statNumbers: document.querySelectorAll('.stat-number'),
    testimonialsSlider: document.getElementById('testimonialsSlider'),
    testimonialsDots: document.getElementById('testimonialsDots'),
    whatsappFloat: document.querySelector('.whatsapp-float')
};

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

const Utils = {
    // Smooth scroll to element
    scrollTo(selector) {
        const element = document.querySelector(selector);
        if (element) {
            const offset = CONFIG.scrollOffset;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    },

    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Check if element is in viewport
    isInViewport(element, offset = 0) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 - offset &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Animate number counting
    animateNumber(element, target, duration) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = Math.round(target);
                clearInterval(timer);
            } else {
                element.textContent = Math.round(current);
            }
        }, 16);
    }
};

// ==========================================
// NAVIGATION
// ==========================================

const Navigation = {
    init() {
        this.setupScrollEffect();
        this.setupMobileMenu();
        this.setupSmoothScroll();
    },

    setupScrollEffect() {
        let lastScroll = 0;
        
        window.addEventListener('scroll', Utils.debounce(() => {
            const currentScroll = window.pageYOffset;

            // Add/remove background on scroll
            if (currentScroll > 100) {
                DOM.nav.style.background = 'rgba(255, 255, 255, 0.95)';
                DOM.nav.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.08)';
            } else {
                DOM.nav.style.background = 'rgba(255, 255, 255, 0.8)';
                DOM.nav.style.boxShadow = 'none';
            }

            // Hide/show nav on scroll
            if (currentScroll > lastScroll && currentScroll > 500) {
                DOM.nav.style.transform = 'translateY(-100%)';
            } else {
                DOM.nav.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;
        }, 10));
    },

    setupMobileMenu() {
        if (!DOM.navToggle) return;

        DOM.navToggle.addEventListener('click', () => {
            DOM.navLinks.classList.toggle('active');
            DOM.navToggle.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = DOM.navToggle.querySelectorAll('span');
            spans[0].style.transform = DOM.navToggle.classList.contains('active') 
                ? 'rotate(45deg) translate(5px, 5px)' 
                : 'none';
            spans[1].style.opacity = DOM.navToggle.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = DOM.navToggle.classList.contains('active') 
                ? 'rotate(-45deg) translate(7px, -6px)' 
                : 'none';
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                DOM.navLinks.classList.remove('active');
                DOM.navToggle.classList.remove('active');
            });
        });
    },

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = anchor.getAttribute('href');
                if (target !== '#') {
                    Utils.scrollTo(target);
                }
            });
        });
    }
};

// ==========================================
// HERO VIDEO
// ==========================================

const HeroVideo = {
    init() {
        if (!DOM.heroVideo) return;

        // Pause video when not in viewport (performance)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    DOM.heroVideo.play();
                } else {
                    DOM.heroVideo.pause();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(DOM.heroVideo);

        // Fallback for mobile (hide video)
        if (window.innerWidth < 768) {
            DOM.heroVideo.style.display = 'none';
        }
    }
};

// ==========================================
// STATS COUNTER
// ==========================================

const StatsCounter = {
    animated: false,

    init() {
        window.addEventListener('scroll', Utils.debounce(() => {
            this.checkAndAnimate();
        }, 100));
    },

    checkAndAnimate() {
        if (this.animated) return;

        const firstStat = DOM.statNumbers[0];
        if (firstStat && Utils.isInViewport(firstStat, 200)) {
            this.animateStats();
            this.animated = true;
        }
    },

    animateStats() {
        DOM.statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            
            // Add + or % suffix if needed
            const hasSuffix = stat.textContent.includes('+') || stat.textContent.includes('%');
            const suffix = stat.textContent.includes('%') ? '%' : 
                          stat.textContent.includes('+') ? '+' : '';

            let current = 0;
            const increment = target / (duration / 16);
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = Math.round(target) + suffix;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.round(current) + suffix;
                }
            }, 16);
        });
    }
};

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

const ScrollAnimations = {
    init() {
        this.setupIntersectionObserver();
    },

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        // Observe all animatable elements
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .process-step, .testimonial-card');
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(el);
        });
    }
};

// ==========================================
// PORTFOLIO GRID
// ==========================================

const Portfolio = {
    init() {
        this.setupHoverEffects();
        this.setupLazyLoading();
    },

    setupHoverEffects() {
        const items = document.querySelectorAll('.portfolio-item');
        
        items.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.zIndex = '10';
            });

            item.addEventListener('mouseleave', function() {
                this.style.zIndex = '1';
            });
        });
    },

    setupLazyLoading() {
        if ('loading' in HTMLImageElement.prototype) {
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
                img.src = img.src;
            });
        } else {
            // Fallback for browsers that don't support lazy loading
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
            document.body.appendChild(script);
        }
    }
};

// ==========================================
// TESTIMONIALS SLIDER
// ==========================================

const Testimonials = {
    currentSlide: 0,
    autoPlayInterval: null,

    init() {
        if (!DOM.testimonialsSlider) return;
        
        this.setupDots();
        
        if (CONFIG.testimonialAutoPlay) {
            this.startAutoPlay();
        }
    },

    setupDots() {
        const cards = DOM.testimonialsSlider.querySelectorAll('.testimonial-card');
        
        // Create dots if there are multiple testimonials
        if (cards.length > 1 && window.innerWidth < 768) {
            cards.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('testimonial-dot');
                if (index === 0) dot.classList.add('active');
                
                dot.addEventListener('click', () => {
                    this.goToSlide(index);
                });
                
                DOM.testimonialsDots.appendChild(dot);
            });
        }
    },

    goToSlide(index) {
        const cards = DOM.testimonialsSlider.querySelectorAll('.testimonial-card');
        const dots = DOM.testimonialsDots.querySelectorAll('.testimonial-dot');

        this.currentSlide = index;

        // Update active states
        cards.forEach((card, i) => {
            card.style.display = i === index ? 'block' : 'none';
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    },

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            const cards = DOM.testimonialsSlider.querySelectorAll('.testimonial-card');
            this.currentSlide = (this.currentSlide + 1) % cards.length;
            this.goToSlide(this.currentSlide);
        }, CONFIG.testimonialInterval);
    },

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
};

// ==========================================
// CONTACT FORM
// ==========================================

const ContactForm = {
    init() {
        if (!DOM.contactForm) return;

        DOM.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit(e);
        });

        // File upload preview
        const fileInput = document.getElementById('reference');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                const fileName = e.target.files[0]?.name;
                if (fileName) {
                    const label = fileInput.parentElement.querySelector('span');
                    label.textContent = `✓ ${fileName}`;
                }
            });
        }
    },

    async handleSubmit(e) {
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            whatsapp: formData.get('whatsapp'),
            service: formData.get('service'),
            message: formData.get('message')
        };

        // Validate
        if (!this.validateForm(data)) {
            return;
        }

        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.st
