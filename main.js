// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
let isDark = prefersDark.matches;

function updateTheme() {
    document.documentElement.style.setProperty('--bg-primary', isDark ? '#0A0A0A' : '#FFFFFF');
    document.documentElement.style.setProperty('--bg-secondary', isDark ? '#141414' : '#F5F5F5');
    document.documentElement.style.setProperty('--text-primary', isDark ? '#FFFFFF' : '#000000');
    document.documentElement.style.setProperty('--text-secondary', isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)');
}

themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    updateTheme();
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all project and article cards
document.querySelectorAll('.project-card, .article-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Hover effect for cards
document.querySelectorAll('.project-card, .article-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
        card.style.transition = 'transform 0.2s ease';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});
