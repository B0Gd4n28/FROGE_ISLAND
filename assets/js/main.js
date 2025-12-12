/* ============================================
   FORGE ACADEMY ICELAND LANDING PAGE
   JavaScript - Animations & Interactions
   ============================================ */

// ============================================
// INITIALIZE AOS (Animate On Scroll)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Refresh AOS on window resize
    window.addEventListener('resize', function() {
        AOS.refresh();
    });
    
    // ============================================
    // HAMBURGER MENU & SIDEBAR NAVIGATION
    // ============================================
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sidebarNav = document.getElementById('sidebarNav');
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');

    // Open sidebar
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            sidebarNav.classList.add('active');
            sidebarOverlay.classList.add('active');
            hamburgerBtn.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close sidebar
    function closeSidebar() {
        if (sidebarNav) sidebarNav.classList.remove('active');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        if (hamburgerBtn) hamburgerBtn.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close sidebar with X button
    if (sidebarClose) {
        sidebarClose.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Sidebar close clicked!');
            closeSidebar();
        });
    }

    // Close sidebar with overlay
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    // Close sidebar when clicking a link
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeSidebar();
        });
    });
});

// ============================================
// HEADER SCROLL BEHAVIOR
// ============================================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
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

// ============================================
// NUMBER COUNTER ANIMATION
// ============================================
const counters = document.querySelectorAll('.stat-number');
let counterAnimated = false;

function animateCounters() {
    if (counterAnimated) return;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
    
    counterAnimated = true;
}

// Trigger counter animation when about section is in view
const aboutSection = document.querySelector('.about-forge');
if (aboutSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(aboutSection);
}

// ============================================
// INTERACTIVE MAP
// ============================================
const mapPoints = document.querySelectorAll('.map-point');
const locationCards = document.querySelectorAll('.location-card');

// Map point hover interactions
mapPoints.forEach(point => {
    point.addEventListener('mouseenter', function() {
        const location = this.getAttribute('data-location');
        
        // Remove active class from all cards
        locationCards.forEach(card => card.classList.remove('active'));
        
        // Add active class to corresponding card
        const correspondingCard = document.querySelector(`.location-card[data-location="${location}"]`);
        if (correspondingCard) {
            correspondingCard.classList.add('active');
            correspondingCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
});

// Location card click interactions
locationCards.forEach(card => {
    card.addEventListener('click', function() {
        const location = this.getAttribute('data-location');
        
        // Remove active class from all cards
        locationCards.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked card
        this.classList.add('active');
        
        // Highlight corresponding map point
        const correspondingPoint = document.querySelector(`.map-point[data-location="${location}"]`);
        if (correspondingPoint) {
            // Add temporary highlight effect
            const circle = correspondingPoint.querySelector('circle:first-child');
            circle.style.fill = '#ff9033';
            setTimeout(() => {
                circle.style.fill = '#FF7B09';
            }, 500);
        }
    });
});

// ============================================
// FAQ ACCORDION
// ============================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ============================================
// PARALLAX EFFECT FOR HERO SECTION
// ============================================
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    if (!hero) return;
    
    const scrolled = window.pageYOffset;
    const heroHeight = hero.offsetHeight;
    
    if (scrolled < heroHeight) {
        const parallaxSpeed = 0.5;
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            heroContent.style.opacity = 1 - (scrolled / heroHeight) * 0.8;
        }
    }
});

// ============================================
// GALLERY IMAGE MODAL (Optional Enhancement)
// ============================================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        // Add click effect
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
        
        // You can add a lightbox/modal here to show full-size images
        console.log('Gallery item clicked:', this.querySelector('.image-placeholder span').textContent);
    });
});

// ============================================
// TIMELINE PROGRESS INDICATOR
// ============================================
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, {
    threshold: 0.2
});

timelineItems.forEach((item, index) => {
    // Initial state for animation
    item.style.opacity = '0';
    item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
    item.style.transition = 'all 0.6s ease';
    
    timelineObserver.observe(item);
});

// ============================================
// MOBILE MENU TOGGLE (if needed)
// ============================================
// Add a hamburger menu for mobile if navigation is hidden
const createMobileMenu = () => {
    if (window.innerWidth <= 768) {
        const nav = document.querySelector('.nav');
        if (nav && nav.style.display === 'none') {
            // Create hamburger button
            const hamburger = document.createElement('button');
            hamburger.className = 'hamburger-menu';
            hamburger.innerHTML = '☰';
            hamburger.style.cssText = `
                font-size: 2rem;
                background: none;
                border: none;
                color: var(--forge-flame);
                cursor: pointer;
            `;
            
            // Insert hamburger before nav
            nav.parentNode.insertBefore(hamburger, nav);
            
            // Toggle menu on click
            hamburger.addEventListener('click', () => {
                nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
                nav.style.flexDirection = 'column';
                nav.style.position = 'absolute';
                nav.style.top = '100%';
                nav.style.left = '0';
                nav.style.right = '0';
                nav.style.background = 'var(--forge-coal)';
                nav.style.padding = 'var(--spacing-md)';
            });
        }
    }
};

// ============================================
// LOADING ANIMATION
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #FF7B09, #ff9033);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createScrollProgress();

// ============================================
// FORM INPUT ENHANCEMENTS
// ============================================
const formInputs = document.querySelectorAll('.booking-form input, .booking-form textarea');

formInputs.forEach(input => {
    // Add focus effect
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateX(5px)';
        this.parentElement.style.transition = 'transform 0.3s ease';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateX(0)';
    });
    
    // Add real-time validation feedback
    input.addEventListener('input', function() {
        if (this.validity.valid) {
            this.style.borderColor = '#4ade80';
        } else {
            this.style.borderColor = 'rgba(255, 123, 9, 0.3)';
        }
    });
});

// ============================================
// EASTER EGG: KONAMI CODE
// ============================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
            alert('🔥 Forge Academy Secret Unlocked! You are a true leader! 🔥');
        }, 2000);
    }
});

// Add rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c🔥 FORGE ACADEMY 🔥', 'font-size: 20px; font-weight: bold; color: #FF7B09;');
console.log('%cКовать лидеров будущего', 'font-size: 14px; color: #FFFFFF;');
console.log('%cInterested in joining? Visit the booking section!', 'font-size: 12px; color: #9E9E9E;');

// ============================================
// PERFORMANCE MONITORING
// ============================================
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// INTERACTIVE MAP FUNCTIONALITY
// ============================================
const locationData = {
    'reykjavik': {
        number: '01',
        title: 'Рейкьявик',
        description: 'Столица Исландии — наша база и отправная точка для всех приключений',
        badge: 'Главная база',
        icon: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>'
    },
    'snaefellsnes': {
        number: '02',
        title: 'Полуостров Снайфедльснес',
        description: 'Киркьюфетль, Чёрная церковь, колония тюленей — "Исландия в миниатюре"',
        badge: 'День 4',
        icon: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>'
    },
    'thingvellir': {
        number: '03',
        title: 'Тингведлир',
        description: 'Национальный парк UNESCO — место встречи тектонических плит',
        badge: 'Золотое кольцо',
        icon: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>'
    },
    'geysir': {
        number: '04',
        title: 'Гейсир',
        description: 'Геотермальная зона с гейзером Строккур — извержение каждые 5-10 минут',
        badge: 'Золотое кольцо',
        icon: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>'
    },
    'gullfoss': {
        number: '05',
        title: 'Гюдльфосс',
        description: 'Золотой водопад — 32 метра впечатляющей мощи природы',
        badge: 'Золотое кольцо',
        icon: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"/><path d="M12 6v6l4 2"/></svg>'
    },
    'south-coast': {
        number: '06',
        title: 'Южное побережье',
        description: 'Сельяландсфосс, Скоугафосс, пляж с чёрным песком — драматическое побережье',
        badge: 'День 7',
        icon: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>'
    }
};

const mapPins = document.querySelectorAll('.map-pin');
const detailCard = document.getElementById('mapDetailCard');
const closeDetailBtn = document.getElementById('closeDetailCard');

mapPins.forEach(pin => {
    pin.addEventListener('click', () => {
        const location = pin.getAttribute('data-location');
        const data = locationData[location];
        
        if (data) {
            // Remove active class from all pins
            mapPins.forEach(p => p.classList.remove('active'));
            // Add active class to clicked pin
            pin.classList.add('active');
            
            // Populate card content
            document.querySelector('.detail-number').textContent = data.number;
            document.querySelector('.detail-icon').innerHTML = data.icon;
            document.querySelector('.detail-title').textContent = data.title;
            document.querySelector('.detail-description').textContent = data.description;
            document.querySelector('.detail-badge').textContent = data.badge;
            
            // Show card
            detailCard.classList.add('active');
        }
    });
});

// Close detail card
closeDetailBtn.addEventListener('click', () => {
    detailCard.classList.remove('active');
    mapPins.forEach(p => p.classList.remove('active'));
});

// Close on click outside
detailCard.addEventListener('click', (e) => {
    if (e.target === detailCard) {
        detailCard.classList.remove('active');
        mapPins.forEach(p => p.classList.remove('active'));
    }
});

// ============================================
// PROGRAM DAYS NAVIGATION
// ============================================
const dayNavBtns = document.querySelectorAll('.day-nav-btn');
const dayDetails = document.querySelectorAll('.day-detail');

dayNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const dayNumber = btn.getAttribute('data-day');
        
        // Remove active class from all buttons and details
        dayNavBtns.forEach(b => b.classList.remove('active'));
        dayDetails.forEach(d => d.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show corresponding day detail
        const targetDetail = document.querySelector(`.day-detail[data-day="${dayNumber}"]`);
        if (targetDetail) {
            targetDetail.classList.add('active');
            
            // Smooth scroll to the detail card with some offset
            setTimeout(() => {
                const targetPosition = targetDetail.getBoundingClientRect().top + window.pageYOffset - 100;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }, 100);
        }
    });
});



// ============================================
// BOOKING FORM SUBMISSION (Google Sheets Integration)
// ============================================
const bookingForm = document.getElementById('bookingForm');
const formSuccess = document.getElementById('formSuccess');

if (bookingForm) {
    bookingForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('span:not(.loading)');
        const btnLoading = submitBtn.querySelector('.loading');
        
        // Show loading state
        if (btnText) btnText.textContent = 'Отправка...';
        submitBtn.disabled = true;
        
        // Collect form data
        const formData = new FormData(this);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            occupation: formData.get('occupation'),
            linkedin: formData.get('linkedin'),
            message: formData.get('message'),
            gdpr: formData.get('gdpr') === 'on'
        };
        
        try {
            // Google Apps Script Web App URL
            const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyy4ju01EToIyMzhT3Ao2N5Nf2OHhEgLP_zNlgIcGNhirmm69lA7ESBoerYn70ImICJ/exec';
            
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Required for Google Apps Script
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            // Show success message
            this.style.display = 'none';
            if (formSuccess) {
                formSuccess.style.display = 'block';
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
        } catch (error) {
            alert('Ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');
            console.error('Form submission error:', error);
            
            // Reset button state on error
            if (btnText) btnText.textContent = 'Отправить заявку';
            submitBtn.disabled = false;
        }
    });
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { debounce, throttle };
}
