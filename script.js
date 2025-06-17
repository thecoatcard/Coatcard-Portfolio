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
        // Hide mobile menu after clicking a link
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
    rootMargin: '-50% 0px -50% 0px', // Adjust this margin to control when the active state changes
    threshold: 0 // As soon as any part of the section enters/leaves the rootMargin, trigger
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        const id = entry.target.id;
        const correspondingLink = document.querySelector(`.nav-link[href="#${id}"]`);

        if (entry.isIntersecting) {
            // Remove 'active' from all links
            navLinks.forEach(link => link.classList.remove('active'));
            // Add 'active' to the current section's link
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}, observerOptions);

// Observe each section
sections.forEach(section => {
    sectionObserver.observe(section);
});

// Set 'Home' as active on initial load if no other section is intersecting
document.addEventListener('DOMContentLoaded', () => {
    const homeLink = document.querySelector('.nav-link[href="#home"]');
    // Check if any link currently has the 'active' class (set by IntersectionObserver)
    if (homeLink && !document.querySelector('.nav-link.active')) {
        homeLink.classList.add('active');
    }
});


// Contact form validation and submission
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    // Clear previous error and status messages
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    formStatus.textContent = '';
    formStatus.classList.remove('text-red-600', 'text-green-600', 'fade-in-up', 'shake-horizontal'); // Remove animation classes

    let isValid = true;

    // Validate Name
    if (nameInput.value.trim() === '') {
        nameError.textContent = 'Name is required.';
        isValid = false;
    }

    // Validate Email
    if (emailInput.value.trim() === '') {
        emailError.textContent = 'Email is required.';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    // Validate Message
    if (messageInput.value.trim() === '') {
        messageError.textContent = 'Message cannot be empty.';
        isValid = false;
    }

    if (!isValid) {
        formStatus.textContent = "❗ Please fix the errors above.";
        formStatus.classList.add("text-red-600", "shake-horizontal"); // Add shake animation
        return; // Stop submission if validation fails
    }

    // If validation passes, proceed with form submission
    const formData = new FormData();
    formData.append("entry.963455521", nameInput.value.trim());      // Name
    formData.append("entry.962606298", emailInput.value.trim());     // Email
    formData.append("entry.1372555964", contactForm.subject.value.trim());  // Subject
    formData.append("entry.1695708713", messageInput.value.trim());  // Message

    fetch("https://docs.google.com/forms/d/e/1FAIpQLScGvLE8Rt6rj5avLulcH6RaucCust_1GyWu4gHMr32WdNik6Q/formResponse", {
        method: "POST",
        mode: "no-cors", // Required for Google Forms
        body: formData
    }).then(() => {
        formStatus.textContent = "✅ Message sent successfully! Thank you for reaching out.";
        formStatus.classList.add("text-green-600", "fade-in-up"); // Add fade-in animation
        contactForm.reset(); // Clear the form
    }).catch((error) => {
        console.error('Form submission error:', error);
        formStatus.textContent = "❌ Submission failed. Please try again later.";
        formStatus.classList.add("text-red-600", "shake-horizontal"); // Add shake animation
    });
});


// Scroll to top button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

// Show/hide scroll to top button based on scroll position
window.onscroll = function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

// Scroll to top when button is clicked
scrollToTopBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Custom cursor (desktop only)
const customCursor = document.getElementById('custom-cursor');

// Only enable custom cursor for wider screens (desktop)
if (window.innerWidth > 768) {
    // Move custom cursor with mouse
    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = `${e.clientX}px`;
        customCursor.style.top = `${e.clientY}px`;
    });

    // Define elements that the cursor should "grow" over
    const interactiveElements = document.querySelectorAll('a, button, input[type="submit"], input[type="text"], input[type="email"], textarea, .card-hover-effect');

    // Add event listeners for cursor growth effect
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            customCursor.classList.add('grow');
        });
        element.addEventListener('mouseleave', () => {
            customCursor.classList.remove('grow');
        });
    });
}

// Animate on scroll elements using Intersection Observer
const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
const sectionTitleElements = document.querySelectorAll('.section-title');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add 'is-visible' class to trigger CSS animation
            entry.target.classList.add('is-visible');
            // Stop observing once the element is visible
            observer.unobserve(entry.target);
        }
    });
}, {
    root: null, // Use the viewport as the root
    rootMargin: '0px', // No margin around the root
    threshold: 0.1 // Trigger when 10% of the element is visible
});

// Observe all elements with 'animate-on-scroll' class
animateOnScrollElements.forEach(el => {
    revealObserver.observe(el);
});

// Observe all elements with 'section-title' class for animation
sectionTitleElements.forEach(el => {
    revealObserver.observe(el);
});
