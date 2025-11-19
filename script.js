// Emirates Studios - Main JavaScript

// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const contactForm = document.getElementById('contactForm');
const heroVideo = document.getElementById('heroVideo');

// Portfolio Slider
const sliderTrack = document.getElementById('sliderTrack');
const prevSlide = document.getElementById('prevSlide');
const nextSlide = document.getElementById('nextSlide');
const sliderDots = document.getElementById('sliderDots').children;
let currentSlide = 0;
const totalSlides = sliderTrack.children.length;

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('bg-black');
        navbar.classList.remove('bg-black/90');
    } else {
        navbar.classList.remove('bg-black');
        navbar.classList.add('bg-black/90');
    }
});

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    } else {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    }
});

// Close mobile menu when clicking on a link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Portfolio Slider Functions
function updateSlider() {
    const offset = -currentSlide * 100;
    sliderTrack.style.transform = `translateX(${offset}%)`;
    
    // Update dots
    Array.from(sliderDots).forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('bg-primary');
            dot.classList.remove('bg-gray-300');
        } else {
            dot.classList.remove('bg-primary');
            dot.classList.add('bg-gray-300');
        }
    });
}

function nextSlideHandler() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function prevSlideHandler() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

// Event Listeners for Slider
nextSlide.addEventListener('click', nextSlideHandler);
prevSlide.addEventListener('click', prevSlideHandler);

// Slider Dots Click
Array.from(sliderDots).forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
    });
});

// Auto-advance slider every 5 seconds
let sliderInterval = setInterval(nextSlideHandler, 5000);

// Pause auto-advance on hover
const portfolioSlider = document.getElementById('portfolioSlider');
portfolioSlider.addEventListener('mouseenter', () => {
    clearInterval(sliderInterval);
});

portfolioSlider.addEventListener('mouseleave', () => {
    sliderInterval = setInterval(nextSlideHandler, 5000);
});

// Keyboard Navigation for Slider
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlideHandler();
    } else if (e.key === 'ArrowRight') {
        nextSlideHandler();
    }
});

// Contact Form Submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual backend endpoint)
    try {
        // Example: await fetch('/api/contact', { method: 'POST', body: formData });
        
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        submitBtn.textContent = '✓ Message Sent!';
        submitBtn.classList.add('bg-green-500');
        submitBtn.classList.remove('bg-primary');
        
        // Reset form
        contactForm.reset();
        
        // Redirect to WhatsApp (optional)
        const phone = formData.get('whatsapp');
        const service = formData.get('service');
        const message = `Hi! I'm interested in ${service}. Can we discuss my project?`;
        window.open(`https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.classList.remove('bg-green-500');
            submitBtn.classList.add('bg-primary');
            submitBtn.disabled = false;
        }, 3000);
        
    } catch (error) {
        console.error('Form submission error:', error);
        submitBtn.textContent = '✗ Error. Try again';
        submitBtn.classList.add('bg-red-500');
        submitBtn.classList.remove('bg-primary');
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.classList.remove('bg-red-500');
            submitBtn.classList.add('bg-primary');
            submitBtn.disabled = false;
        }, 3000);
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Height of fixed navbar
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Video Background Optimization
// Pause video when not in viewport to save resources
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            heroVideo.play();
        } else {
            heroVideo.pause();
        }
    });
}, { threshold: 0.5 });

if (heroVideo) {
    heroObserver.observe(document.getElementById('hero'));
}

// Lazy Load Images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// WhatsApp Floating Button - Show/Hide on Scroll
let lastScroll = 0;
const whatsappFloat = document.getElementById('whatsappFloat');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 300) {
        whatsappFloat.style.opacity = '1';
        whatsappFloat.style.pointerEvents = 'all';
    } else {
        whatsappFloat.style.opacity = '0';
        whatsappFloat.style.pointerEvents = 'none';
    }
    
    lastScroll = currentScroll;
});

// Preload Critical Images
const preloadImages = [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200',
    'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1200'
];

preloadImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
});

// Performance: Reduce animations on low-end devices
if (navigator.hardwareConcurrency < 4) {
    document.body.classList.add('reduce-animations');
}

// Console Easter Egg
console.log('%c🎬 Emirates Studios', 'font-size: 20px; font-weight: bold; color: #D4AF37;');
console.log('%cLooking for a job? Email us at careers@emiratesstudios.ae', 'font-size: 14px; color: #666;');

// Analytics Event Tracking (Google Analytics example)
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Track form submissions
contactForm.addEventListener('submit', () => {
    trackEvent('Form', 'Submit', 'Contact Form');
});

// Track WhatsApp clicks
whatsappFloat.addEventListener('click', () => {
    trackEvent('Button', 'Click', 'WhatsApp Float');
});

// Track portfolio views
prevSlide.addEventListener('click', () => {
    trackEvent('Slider', 'Navigate', 'Previous Slide');
});

nextSlide.addEventListener('click', () => {
    trackEvent('Slider', 'Navigate', 'Next Slide');
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Emirates Studios - Landing Page Loaded');
    
    // Add any initialization code here
    updateSlider();
});
