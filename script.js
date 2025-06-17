document.getElementById('currentYear').textContent = new Date().getFullYear();

const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuButton.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.toggle('hidden');
    mobileMenuButton.setAttribute('aria-expanded', !isHidden);
});

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

const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    formStatus.textContent = '';
    formStatus.classList.remove('text-red-600', 'text-green-600', 'fade-in-up', 'shake-horizontal');

    let isValid = true;

    if (nameInput.value.trim() === '') {
        nameError.textContent = 'Name is required.';
        isValid = false;
    }

    if (emailInput.value.trim() === '') {
        emailError.textContent = 'Email is required.';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    if (messageInput.value.trim() === '') {
        messageError.textContent = 'Message cannot be empty.';
        isValid = false;
    }

    if (!isValid) {
        formStatus.textContent = "❗ Please fix the errors above.";
        formStatus.classList.add("text-red-600", "shake-horizontal");
        return;
    }

    const formData = new FormData();
    formData.append("entry.963455521", nameInput.value.trim());
    formData.append("entry.962606298", emailInput.value.trim());
    formData.append("entry.1372555964", contactForm.subject.value.trim());
    formData.append("entry.1695708713", messageInput.value.trim());

    fetch("https://docs.google.com/forms/d/e/1FAIpQLScGvLE8Rt6rj5avLulcH6RaucCust_1GyWu4gHMr32WdNik6Q/formResponse", {
        method: "POST",
        mode: "no-cors",
        body: formData
    }).then(() => {
        formStatus.textContent = "✅ Message sent successfully! Thank you for reaching out.";
        formStatus.classList.add("text-green-600", "fade-in-up");
        contactForm.reset();
    }).catch((error) => {
        console.error('Form submission error:', error);
        formStatus.textContent = "❌ Submission failed. Please try again later.";
        formStatus.classList.add("text-red-600", "shake-horizontal");
    });
});

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
