// Toggle mobile menu
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Scroll sections active link + scroll progress bar
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const scrollProgress = document.getElementById('scrollProgress');

window.onscroll = () => {
    // Scroll progress bar
    const scrollTop = document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    scrollProgress.style.width = ((scrollTop / docHeight) * 100) + '%';

    // Active navigation link
    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (scrollTop >= offset && scrollTop < offset + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector('header nav a[href*=' + id + ']');
            if (activeLink) activeLink.classList.add('active');
        }
    });

    // Close mobile menu on scroll
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// Dark / Light Mode Toggle
const themeIcon = document.querySelector('#theme-icon');
const body = document.body;

// On load: sync icon with current body class (dark-mode is default)
if (body.classList.contains('dark-mode')) {
    themeIcon.classList.replace('bx-moon', 'bx-sun');
}

const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.classList.remove('light-mode', 'dark-mode');
    body.classList.add(currentTheme);
    if (currentTheme === 'dark-mode') {
        themeIcon.classList.replace('bx-moon', 'bx-sun');
    } else {
        themeIcon.classList.replace('bx-sun', 'bx-moon');
    }
}

themeIcon.addEventListener('click', () => {
    if (body.classList.contains('light-mode')) {
        body.classList.replace('light-mode', 'dark-mode');
        themeIcon.classList.replace('bx-moon', 'bx-sun');
        localStorage.setItem('theme', 'dark-mode');
    } else {
        body.classList.replace('dark-mode', 'light-mode');
        themeIcon.classList.replace('bx-sun', 'bx-moon');
        localStorage.setItem('theme', 'light-mode');
    }
});

// Typed.js Animation
const typed = new Typed('.multiple-text', {
    strings: ['Java Developer', 'Spring Boot Developer', 'Angular Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// Scroll Reveal Animation
ScrollReveal({ distance: '40px', duration: 1800, delay: 200 });

ScrollReveal().reveal('.home-content, .heading',                                              { origin: 'top' });
ScrollReveal().reveal('.home-img, .skills-container, .projects-container, .contact-wrapper', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .timeline-item:nth-child(even)',                    { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-inner, .timeline-item:nth-child(odd)',        { origin: 'right' });
ScrollReveal().reveal('.tech-badges',                                                         { origin: 'bottom', delay: 300 });

// Skill bar animation — observe the section, trigger all bars at once
const skillsSection = document.querySelector('.skills');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Small delay to ensure ScrollReveal has made elements visible
            setTimeout(() => {
                document.querySelectorAll('.skill-progress').forEach(bar => bar.classList.add('animate'));
            }, 300);
            skillObserver.disconnect();
        }
    });
}, { threshold: 0.1 });

if (skillsSection) skillObserver.observe(skillsSection);

// Stats counter animation on .stat-number elements
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
            entry.target.dataset.counted = true;
            const target = +entry.target.dataset.target;
            const duration = 1500;
            const step = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    entry.target.textContent = target;
                    clearInterval(timer);
                } else {
                    entry.target.textContent = Math.floor(current);
                }
            }, 16);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

// Subtle 3D tilt effect on project cards
const tiltCards = document.querySelectorAll('.project-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.5s ease';
        setTimeout(() => { card.style.transition = ''; }, 500);
    });
});
