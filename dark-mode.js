/**
 * Dark Mode and Advanced Features for Malik Portfolio
 * Author: Malik Ribeiro Mourad
 */

class PortfolioApp {
    constructor() {
        this.darkMode = false;
        this.isLoading = true;
        this.currentSection = 'hero';
        this.init();
    }

    init() {
        this.setupDarkMode();
        this.setupSmoothScrolling();
        this.setupFormHandling();
        this.setupScrollAnimations();
        this.setupTypewriter();
        this.setupProgressBars();
        this.setupScrollToTop();
        this.setupNavigation();
        this.hideLoader();
    }

    // Dark Mode Functionality
    setupDarkMode() {
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            this.enableDarkMode();
        }

        // Create dark mode toggle button
        this.createDarkModeToggle();
    }

    createDarkModeToggle() {
        const nav = document.querySelector('.nav');
        if (!nav) return;

        const toggleButton = document.createElement('button');
        toggleButton.className = 'dark-mode-toggle';
        toggleButton.innerHTML = this.darkMode ? '☀️' : '🌙';
        toggleButton.setAttribute('aria-label', 'Toggle dark mode');
        
        toggleButton.addEventListener('click', () => {
            this.toggleDarkMode();
        });

        nav.appendChild(toggleButton);
    }

    enableDarkMode() {
        this.darkMode = true;
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        this.updateToggleButton();
    }

    disableDarkMode() {
        this.darkMode = false;
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        this.updateToggleButton();
    }

    toggleDarkMode() {
        if (this.darkMode) {
            this.disableDarkMode();
        } else {
            this.enableDarkMode();
        }
    }

    updateToggleButton() {
        const button = document.querySelector('.dark-mode-toggle');
        if (button) {
            button.innerHTML = this.darkMode ? '☀️' : '🌙';
        }
    }

    // Smooth Scrolling
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    this.updateActiveSection(anchor.getAttribute('href').substring(1));
                }
            });
        });
    }

    // Form Handling with PHP Backend
    setupFormHandling() {
        const form = document.querySelector('form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleFormSubmission(form);
        });
    }

    async handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = 'Enviando...';
        submitButton.disabled = true;

        try {
            const response = await fetch('contact.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                this.showMessage('success', result.message);
                form.reset();
            } else {
                this.showMessage('error', result.message || 'Erro ao enviar mensagem');
            }
        } catch (error) {
            this.showMessage('error', 'Erro de conexão. Tente novamente.');
        } finally {
            // Reset button state
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    }

    showMessage(type, message) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                <span class="message-icon">${type === 'success' ? '✅' : '❌'}</span>
                <span class="message-text">${message}</span>
            </div>
        `;

        // Insert after form
        const form = document.querySelector('form');
        form.parentNode.insertBefore(messageDiv, form.nextSibling);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    // Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Trigger progress bars animation
                    if (entry.target.id === 'about') {
                        this.animateProgressBars();
                    }
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }

    // Typewriter Effect
    setupTypewriter() {
        const typewriterElement = document.querySelector('.typewriter');
        if (!typewriterElement) return;

        const texts = [
            'Analista de Dados',
            'Desenvolvedor BI',
            'Especialista em Power BI',
            'Programador Python',
            'Aspirante a Dev Web'
        ];

        let currentTextIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;

        const typeWriter = () => {
            const currentText = texts[currentTextIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentText.substring(0, currentCharIndex - 1);
                currentCharIndex--;
            } else {
                typewriterElement.textContent = currentText.substring(0, currentCharIndex + 1);
                currentCharIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && currentCharIndex === currentText.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % texts.length;
                typeSpeed = 500; // Pause before next text
            }

            setTimeout(typeWriter, typeSpeed);
        };

        typeWriter();
    }

    // Progress Bars Animation
    setupProgressBars() {
        this.progressBarsAnimated = false;
    }

    animateProgressBars() {
        if (this.progressBarsAnimated) return;
        
        const progressBars = document.querySelectorAll('.skill-progress');
        progressBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }, index * 200);
        });
        
        this.progressBarsAnimated = true;
    }

    // Scroll to Top
    setupScrollToTop() {
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.innerHTML = '↑';
        scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
        
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        document.body.appendChild(scrollToTopBtn);

        // Show/hide on scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }

            this.updateHeaderOnScroll();
            this.updateActiveNavigation();
        });
    }

    // Navigation Updates
    setupNavigation() {
        // Mobile menu toggle
        this.createMobileMenuToggle();
    }

    createMobileMenuToggle() {
        const nav = document.querySelector('.nav');
        if (!nav) return;

        const mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-menu-toggle';
        mobileToggle.innerHTML = '☰';
        mobileToggle.setAttribute('aria-label', 'Toggle mobile menu');
        
        mobileToggle.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                navLinks.classList.toggle('mobile-open');
                mobileToggle.innerHTML = navLinks.classList.contains('mobile-open') ? '✕' : '☰';
            }
        });

        nav.appendChild(mobileToggle);
    }

    updateHeaderOnScroll() {
        const header = document.querySelector('.header');
        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    updateActiveNavigation() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    updateActiveSection(sectionId) {
        this.currentSection = sectionId;
    }

    // Loader
    hideLoader() {
        setTimeout(() => {
            const loader = document.querySelector('.loader');
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }
            this.isLoading = false;
        }, 1500);
    }

    // Utility Methods
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
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}

// Additional CSS for dark mode and animations
const additionalCSS = `
/* Dark Mode Styles */
.dark-mode {
    --bg-primary: #111827;
    --bg-secondary: #1f2937;
    --text-primary: #f9fafb;
    --text-secondary: #d1d5db;
    --border-color: #374151;
}

.dark-mode body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
}

.dark-mode .card {
    background-color: var(--bg-secondary);
    border-color: var(--border-color);
}

.dark-mode .bg-gray-50 {
    background-color: var(--bg-secondary);
}

.dark-mode .text-gray-600 {
    color: var(--text-secondary);
}

.dark-mode .text-gray-900 {
    color: var(--text-primary);
}

/* Dark Mode Toggle */
.dark-mode-toggle {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 0.5rem;
    transition: background-color 0.2s;
}

.dark-mode-toggle:hover {
    background-color: rgba(0, 0, 0, 0.1);
}

.dark-mode .dark-mode-toggle:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
    display: none;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
}

@media (max-width: 768px) {
    .mobile-menu-toggle {
        display: block;
    }
    
    .nav-links {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 1rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .dark-mode .nav-links {
        background: var(--bg-secondary);
    }
    
    .nav-links.mobile-open {
        display: flex;
    }
}

/* Scroll to Top Button */
.scroll-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 3rem;
    height: 3rem;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
    z-index: 1000;
}

.scroll-to-top.visible {
    opacity: 1;
    visibility: visible;
}

.scroll-to-top:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

/* Header Scroll Effect */
.header.scrolled {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

.dark-mode .header.scrolled {
    background: rgba(17, 24, 39, 0.95);
}

/* Active Navigation */
.nav-links a.active {
    color: #3b82f6;
    font-weight: 600;
}

/* Form Messages */
.form-message {
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 0.5rem;
    animation: slideIn 0.3s ease-out;
}

.form-message.success {
    background-color: #d1fae5;
    border: 1px solid #10b981;
    color: #065f46;
}

.form-message.error {
    background-color: #fee2e2;
    border: 1px solid #ef4444;
    color: #991b1b;
}

.dark-mode .form-message.success {
    background-color: #064e3b;
    color: #a7f3d0;
}

.dark-mode .form-message.error {
    background-color: #7f1d1d;
    color: #fca5a5;
}

.message-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

/* Animations */
@keyframes slideIn {
    from {
        transform: translateY(-10px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.animate-in {
    animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
    from {
        transform: translateY(30px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

/* Typewriter Effect */
.typewriter::after {
    content: '|';
    animation: blink 1s infinite;
}

@keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
}

/* Loader */
.loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.5s;
}

.dark-mode .loader {
    background: var(--bg-primary);
}
`;

// Inject additional CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Export for potential use in other scripts
window.PortfolioApp = PortfolioApp;

