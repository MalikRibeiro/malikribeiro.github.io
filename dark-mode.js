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
        /*this.setupDarkMode();
        this.setupSmoothScrolling();
        this.setupFormHandling();
        this.setupScrollAnimations();
        this.setupTypewriter();
        this.setupProgressBars();
        this.setupScrollToTop();
        this.setupNavigation();
        this.hideLoader();*/
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
        // Use existing button from HTML instead of creating a new one
        const toggleButton = document.getElementById('darkModeToggle');
        if (!toggleButton) {
            // Fallback: create button if it doesn't exist
            const nav = document.querySelector('.nav');
            if (!nav) return;

            const newToggleButton = document.createElement('button');
            newToggleButton.className = 'dark-mode-toggle';
            newToggleButton.id = 'darkModeToggle';
            newToggleButton.innerHTML = `<span class="sun-icon">${this.darkMode ? '🌙' : '☀️'}</span>`;
            newToggleButton.setAttribute('aria-label', 'Alternar modo escuro');
            
            newToggleButton.addEventListener('click', () => {
                this.toggleDarkMode();
            });

            nav.appendChild(newToggleButton);
        } else {
            // Button exists, just add event listener
            toggleButton.addEventListener('click', () => {
                this.toggleDarkMode();
            });
            this.updateToggleButton();
        }
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
            const sunIcon = button.querySelector('.sun-icon');
            const moonIcon = button.querySelector('.moon-icon');
            
            if (sunIcon && moonIcon) {
                // Use the span structure
                if (this.darkMode) {
                    sunIcon.style.display = 'none';
                    moonIcon.style.display = 'inline';
                } else {
                    sunIcon.style.display = 'inline';
                    moonIcon.style.display = 'none';
                }
            } else {
                // Fallback to simple innerHTML
                button.innerHTML = this.darkMode ? '☀️' : '🌙';
            }
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

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Export for potential use in other scripts
window.PortfolioApp = PortfolioApp;