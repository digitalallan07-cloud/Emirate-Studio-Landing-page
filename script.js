/* ==========================================
   EMIRATES STUDIOS - 2025 PREMIUM INTERACTIONS
   Micro-animations, Custom Cursor, Smooth Scrolling
   ========================================== */

'use strict';

// ==========================================
// STATE MANAGEMENT
// ==========================================

const state = {
    isMenuOpen: false,
    cursorX: 0,
    cursorY: 0,
    currentTestimonial: 0,
    scrollY: 0
};

// ==========================================
// DOM ELEMENTS
// ==========================================

const DOM = {
    nav: document.getElementById('nav'),
    menuToggle: document.getElementById('menuToggle'),
    navMenu: document.getElementById('navMenu'),
    cursorDot: document.getElementById('cursorDot'),
    cursorRing: document.getElementById('cursorRing'),
    heroVideo: document.querySelector('.hero-video'),
    contactForm: document.getElementById('contactForm'),
    fileInput: document.getElementById('file'),
    bentoItems: document.querySelectorAll('.bento-item'),
    serviceCards: document.querySelectorAll('.service-card'),
    whatsappFloat: document.querySelector('.whatsapp-float')
};

// ==========================================
// CUSTOM CURSOR
// ==========================================

const Cursor = {
    init() {
        if (window.innerWidth < 768) return; // Disable on mobile
        
        document.addEventListener('mousemove', this.moveCursor.bind(this));
        
        // Cursor effects on hover
        const hoverElements = document.querySelectorAll('a, button, .bento-item, .service-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.scaleCursor(2));
            el.addEventListener('mouseleave', () => this.scaleCursor(1));
        });
    },

    moveCursor(e) {
        state.cursorX = e.clientX;
        state.cursorY = e.clientY;
        
        if (DOM.cursorDot) {
            DOM.cursorDot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
        }
        
        if (DOM.cursorRing) {
            // Smooth follow with delay
            setTimeout(() => {
                DOM.cursorRing.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
            }, 100);
        }
    },

    scaleCursor(scale) {
        if (DOM.cursorRing) {
            DOM.cursorRing.style.transform = `translate(${state.cursorX - 20}px, ${state.cursorY - 20}px) scale(${scale})`;
        }
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
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            state.scrollY = currentScroll;

            // Change nav background on scroll
            if (currentScroll > 100) {
                DOM.nav.style.background = 'rgba(10, 10, 10, 0.95)';
                DOM.nav.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.4)';
            } else {
                DOM.nav.style.background = 'rgba(10, 10, 10, 0.8)';
                DOM.nav.style.boxShadow = 'none';
            }

            // Hide nav on scroll down, show on scroll up
            if (currentScroll > lastScroll && currentScroll > 500) {
                DOM.nav.style.transform = 'translateY(-100%)';
            } else {
                DOM.nav.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;
        });
    },

    setupMobileMenu() {
        if (!DOM.menuToggle) return;

        DOM.menuToggle.addEventListener('click', () => {
            state.isMenuOpen = !state.isMenuOpen;
            
            if (state.isMenuOpen) {
                DOM.navMenu.style.display = 'flex';
                DOM.navMenu.style.position = 'fixed';
                DOM.navMenu.style.top = '80px';
                DOM.navMenu.style.left = '0';
                DOM.navMenu.style.right = '0';
                DOM.navMenu.style.bottom = '0';
                DOM.navMenu.style.flexDirection = 'column';
                DOM.navMenu.style.background = 'rgba(10, 10, 10, 0.98)';
                DOM.navMenu.style.padding = '2rem';
                DOM.navMenu.style.zIndex = '999';
                
                // Animate hamburger
                const spans = DOM.menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                DOM.navMenu.style.display = '';
                DOM.navMenu.style.position = '';
                DOM.navMenu.style.top = '';
                DOM.navMenu.style.left = '';
                DOM.navMenu.style.right = '';
                DOM.navMenu.style.bottom = '';
                DOM.navMenu.style.flexDirection = '';
                DOM.navMenu.style.background = '';
                DOM.navMenu.style.padding = '';
                
                const spans = DOM.menuToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.transform = '';
            }
        });

        // Close menu on link click
        DOM.navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (state.isMenuOpen) {
                    DOM.menuToggle.click();
                }
            });
        });
    },

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offset = 80;
                    const targetPosition = target.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
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

        // Pause video when not in viewport
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        DOM.heroVideo.play().catch(() => {
                            // Autoplay prevented, that's okay
                        });
                    } else {
                        DOM.heroVideo.pause();
                    }
                });
            },
            { threshold: 0.5 }
        );

        observer.observe(DOM.heroVideo);
    }
};

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

const ScrollAnimations = {
    init() {
        this.observeElements();
        this.setupParallax();
    },

    observeElements() {
        const options = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        // Observe all animated elements
        const elements = document.querySelectorAll(
            '.service-card, .bento-item, .process-step, .about-content, .about-visual'
        );

        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px)';
            el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
            observer.observe(el);
        });
    },

    setupParallax() {
        const parallaxElements = document.querySelectorAll('.hero-video, .about-image img');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(el => {
                const speed = el.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
};

// ==========================================
// BENTO GRID PORTFOLIO
// ==========================================

const Portfolio = {
    init() {
        this.setupHoverEffects();
        this.setupCategoryFilter();
    },

    setupHoverEffects() {
        DOM.bentoItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.zIndex = '10';
                
                // Magnetic effect
                const rect = this.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const handleMouseMove = (e) => {
                    const deltaX = (e.clientX - centerX) * 0.05;
                    const deltaY = (e.clientY - centerY) * 0.05;
                    this.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                };
                
                this.addEventListener('mousemove', handleMouseMove);
                
                this.addEventListener('mouseleave', function() {
                    this.style.zIndex = '1';
                    this.style.transform = '';
                    this.removeEventListener('mousemove', handleMouseMove);
                }, { once: true });
            });
        });
    },

    setupCategoryFilter() {
        // Can be extended with filter buttons
        console.log('Portfolio categories:', 
            [...new Set([...DOM.bentoItems].map(item => item.dataset.category))]
        );
    }
};

// ==========================================
// SERVICE CARDS MICRO-ANIMATIONS
// ==========================================

const Services = {
    init() {
        DOM.serviceCards.forEach((card, index) => {
            card.addEventListener('mouseenter', function() {
                // Tilt effect
                this.addEventListener('mousemove', handleTilt);
            });

            card.addEventListener('mouseleave', function() {
                this.removeEventListener('mousemove', handleTilt);
                this.style.transform = 'translateY(-8px) rotateX(0) rotateY(0)';
            });

            function handleTilt(e) {
                const card = this;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;
                
                card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });
    }
};

// ==========================================
// CONTACT FORM
// ==========================================

const ContactForm = {
    init() {
        if (!DOM.contactForm) return;

        DOM.contactForm.addEventListener('submit', this.handleSubmit.bind(this));
        
        // File input handler
        if (DOM.fileInput) {
            DOM.fileInput.addEventListener('change', (e) => {
                const fileName = e.target.files[0]?.name;
                const fileNameDisplay = document.querySelector('.file-name');
                if (fileNameDisplay && fileName) {
                    fileNameDisplay.textContent = fileName;
                    fileNameDisplay.style.color = 'var(--color-primary)';
                }
            });
        }

        // Input focus animations
        const inputs = DOM.contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
                this.parentElement.style.transition = 'transform 0.2s ease';
            });

            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });
    },

    async handleSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

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
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Show loading
        submitBtn.innerHTML = `
            <span>Sending...</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="animate-spin">
                <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" opacity="0.25"/>
                <path d="M10 2a8 8 0 018 8" stroke="currentColor" stroke-width="2"/>
            </svg>
        `;
        submitBtn.disabled = true;

        try {
            // Simulate API call (replace with your endpoint)
            await this.submitToServer(data);

            // Success
            submitBtn.innerHTML = `
                <span>✓ Message Sent!</span>
            `;
            submitBtn.style.background = 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)';

            form.reset();
            this.showNotification('Thanks! We\'ll get back to you within 24 hours.', 'success');

            // Open WhatsApp (optional)
            setTimeout(() => {
                const whatsappNumber = data.whatsapp.replace(/\D/g, '');
                const message = `Hi! I'm ${data.name}. I'm interested in ${data.service}. ${data.message}`;
                window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
            }, 1000);

            // Reset button
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);

        } catch (error) {
            console.error('Form submission error:', error);
            
            submitBtn.innerHTML = `
                <span>✗ Error. Try again</span>
            `;
            submitBtn.style.background = 'linear-gradient(135deg, #ff0080 0%, #ff6b35 100%)';

            this.showNotification('Something went wrong. Please try again.', 'error');

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }
    },

    validateForm(data) {
        if (!data.name || !data.email || !data.phone || !data.whatsapp || !data.service) {
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return false;
        }

        return true;
    },

    async submitToServer(data) {
        // Replace with your actual API endpoint
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form data:', data);
                resolve({ success: true });
            }, 1500);
        });

        // Example with actual API:
        // const response = await fetch('https://your-api.com/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // });
        // return response.json();
    },

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 16px 24px;
            background: ${type === 'success' ? 'rgba(0, 255, 136, 0.2)' : 'rgba(255, 0, 128, 0.2)'};
            border: 1px solid ${type === 'success' ? 'var(--color-primary)' : 'var(--color-secondary)'};
            border-radius: 12px;
            color: white;
            font-family: var(--font-mono);
            font-size: 0.875rem;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            backdrop-filter: blur(10px);
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
};

// ==========================================
// WHATSAPP FLOAT BUTTON
// ==========================================

const WhatsAppFloat = {
    init() {
        if (!DOM.whatsappFloat) return;

        // Show/hide on scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                DOM.whatsappFloat.style.opacity = '1';
                DOM.whatsappFloat.style.pointerEvents = 'all';
            } else {
                DOM.whatsappFloat.style.opacity = '0';
                DOM.whatsappFloat.style.pointerEvents = 'none';
            }
        });

        // Pulse animation on hover
        DOM.whatsappFloat.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'float 3s ease-in-out infinite';
            }, 10);
        });

        // Track clicks
        DOM.whatsappFloat.addEventListener('click', () => {
            Analytics.trackEvent('WhatsApp', 'Click', 'Float Button');
        });
    }
};

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

const Performance = {
    init() {
        this.lazyLoadImages();
        this.preloadCriticalAssets();
        this.optimizeAnimations();
    },

    lazyLoadImages() {
        if ('loading' in HTMLImageElement.prototype) {
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
                img.src = img.src;
            });
        } else {
            // Fallback for older browsers
            const images = document.querySelectorAll('img[loading="lazy"]');
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.src;
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    },

    preloadCriticalAssets() {
        // Preload hero video
        if (DOM.heroVideo) {
            const videoLink = document.createElement('link');
            videoLink.rel = 'preload';
            videoLink.as = 'video';
            videoLink.href = DOM.heroVideo.querySelector('source')?.src || '';
            document.head.appendChild(videoLink);
        }
    },

    optimizeAnimations() {
        // Reduce animations on low-end devices
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            document.body.classList.add('reduce-animations');
        }

        // Respect user motion preferences
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (prefersReducedMotion.matches) {
            document.body.classList.add('reduce-animations');
        }
    }
};

// ==========================================
// ANALYTICS
// ==========================================

const Analytics = {
    init() {
        this.trackPageView();
        this.setupEventTracking();
    },

    trackPageView() {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_view', {
                page_title: document.title,
                page_location: window.location.href,
                page_path: window.location.pathname
            });
        }
    },

    setupEventTracking() {
        // Track CTA clicks
        document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
            btn.addEventListener('click', function() {
                Analytics.trackEvent('Button', 'Click', this.textContent.trim());
            });
        });

        // Track portfolio views
        DOM.bentoItems.forEach(item => {
            item.addEventListener('click', function() {
                const title = this.querySelector('.bento-title')?.textContent || 'Unknown';
                Analytics.trackEvent('Portfolio', 'View', title);
            });
        });

        // Track service card interactions
        DOM.serviceCards.forEach(card => {
            card.addEventListener('click', function() {
                const title = this.querySelector('.service-title')?.textContent || 'Unknown';
                Analytics.trackEvent('Service', 'Click', title);
            });
        });
    },

    trackEvent(category, action, label) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label
            });
        }
        console.log(`📊 Event: ${category} - ${action} - ${label}`);
    }
};

// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================

const KeyboardShortcuts = {
    init() {
        document.addEventListener('keydown', (e) => {
            // ESC to close mobile menu
            if (e.key === 'Escape' && state.isMenuOpen) {
                DOM.menuToggle.click();
            }

            // CMD/CTRL + K to focus search (if implemented)
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                // Implement search if needed
            }
        });
    }
};

// ==========================================
// EASTER EGGS
// ==========================================

const EasterEggs = {
    init() {
        let konamiCode = [];
        const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.key);
            konamiCode = konamiCode.slice(-10);

            if (konamiCode.join('') === konamiSequence.join('')) {
                this.activateRainbow();
            }
        });

        // Console art
        console.log('%c🎬 EMIRATES STUDIOS', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
        console.log('%cWe\'re hiring! Send your portfolio to careers@emiratesstudios.com', 'font-size: 14px; color: #a0a0a0;');
        console.log('%cTip: Try the Konami Code 😉', 'font-size: 12px; color: #00ff88;');
    },

    activateRainbow() {
        document.body.style.animation = 'rainbow 2s linear infinite';
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => {
            document.body.style.animation = '';
            style.remove();
        }, 5000);

        ContactForm.showNotification('🌈 Rainbow mode activated!', 'success');
    }
};

// ==========================================
// GLOBAL FUNCTIONS (for inline onclick)
// ==========================================

window.scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
};

window.scrollToWork = () => {
    document.querySelector('#work')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
};

// ==========================================
// INITIALIZATION
// ==========================================

class App {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initModules());
        } else {
            this.initModules();
        }
    }

    initModules() {
        console.log('🚀 Initializing Emirates Studios...');

        // Initialize all modules
        Cursor.init();
        Navigation.init();
        HeroVideo.init();
        ScrollAnimations.init();
        Portfolio.init();
        Services.init();
        ContactForm.init();
        WhatsAppFloat.init();
        Performance.init();
        Analytics.init();
        KeyboardShortcuts.init();
        EasterEggs.init();

        console.log('✅ Emirates Studios Ready!');
    }
}

// Start the application
new App();

// ==========================================
// ERROR HANDLING
// ==========================================

window.addEventListener('error', (e) => {
    console.error('❌ Global error:', e.error);
    // Send to error tracking service (Sentry, etc.)
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('❌ Unhandled promise rejection:', e.reason);
    // Send to error tracking service
});

// ==========================================
// SERVICE WORKER (PWA Ready)
// ==========================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('✅ Service Worker registered'))
        //     .catch(err => console.log('❌ Service Worker registration failed:', err));
    });
}
