// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuButton.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.toggle('hidden');
    mobileMenuButton.setAttribute('aria-expanded', !isHidden);
});

// Smooth scroll on nav-link click
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.setAttribute('aria-expanded', false);
        }
    });
});

// Active nav-link highlight on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        const id = entry.target.id;
        const correspondingLink = document.querySelector(`.nav-link[href="#${id}"]`);

        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

document.addEventListener('DOMContentLoaded', () => {
    const homeLink = document.querySelector('.nav-link[href="#home"]');
    if (homeLink && !document.querySelector('.nav-link.active')) {
        homeLink.classList.add('active');
    }
});

// Contact form validation
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const formStatus = document.getElementById('formStatus');



// Scroll to top button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.onscroll = function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

scrollToTopBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Custom cursor (desktop only)
const customCursor = document.getElementById('custom-cursor');

if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = `${e.clientX}px`;
        customCursor.style.top = `${e.clientY}px`;
    });

    const interactiveElements = document.querySelectorAll('a, button, input[type="submit"], input[type="text"], input[type="email"], textarea, .card-hover-effect');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            customCursor.classList.add('grow');
        });
        element.addEventListener('mouseleave', () => {
            customCursor.classList.remove('grow');
        });
    });
}

// Animate on scroll elements
const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
const sectionTitleElements = document.querySelectorAll('.section-title');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
});

animateOnScrollElements.forEach(el => {
    revealObserver.observe(el);
});

sectionTitleElements.forEach(el => {
    revealObserver.observe(el);
});
