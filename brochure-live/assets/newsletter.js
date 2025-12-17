/**
 * Newsletter Form Handler
 * Handles form submission and validation with proper error handling
 */

class NewsletterHandler {
    constructor() {
        this.form = document.querySelector('.newsletter-form');
        this.emailInput = document.querySelector('.newsletter-email');
        this.submitButton = document.querySelector('.newsletter-submit');
        this.messageDiv = document.querySelector('.newsletter-message');
        
        // Get API endpoint from config
        this.apiEndpoint = window.CONFIG?.API?.NEWSLETTER_ENDPOINT || '/api/newsletter';
        this.logger = window.logger || {
            error: (msg, err) => console.error(msg, err),
            info: (msg) => console.info(msg)
        };
        
        if (this.form) {
            this.init();
        }
    }

    init() {
        try {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            this.emailInput?.addEventListener('input', () => this.validateEmail());
            this.emailInput?.addEventListener('focus', () => this.onFocus());
            this.emailInput?.addEventListener('blur', () => this.onBlur());
        } catch (error) {
            this.logger.error('NewsletterHandler:init', error);
        }
    }

    validateEmail() {
        try {
            const email = this.emailInput.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                this.emailInput.classList.add('error');
                return false;
            } else {
                this.emailInput.classList.remove('error');
                return true;
            }
        } catch (error) {
            this.logger.error('NewsletterHandler:validateEmail', error);
            return false;
        }
    }

    onFocus() {
        try {
            this.emailInput.parentElement?.classList.add('focused');
        } catch (error) {
            this.logger.error('NewsletterHandler:onFocus', error);
        }
    }

    onBlur() {
        try {
            this.emailInput.parentElement?.classList.remove('focused');
        } catch (error) {
            this.logger.error('NewsletterHandler:onBlur', error);
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateEmail()) {
            this.showMessage('Please enter a valid email address', 'error');
            return;
        }

        const email = this.emailInput.value.trim();
        
        if (!email) {
            this.showMessage('Please enter your email address', 'error');
            return;
        }
        
        // Disable form during submission
        this.submitButton.disabled = true;
        const originalText = this.submitButton.textContent;
        this.submitButton.textContent = 'Subscribing...';
        
        try {
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                this.showMessage('Successfully subscribed! Thank you.', 'success');
                this.emailInput.value = '';
                this.animateSuccess();
            } else {
                this.showMessage(data.message || 'Something went wrong. Please try again.', 'error');
            }
        } catch (error) {
            this.logger.error('NewsletterHandler:handleSubmit', error, { email });
            this.showMessage('Network error. Please try again later.', 'error');
        } finally {
            this.submitButton.disabled = false;
            this.submitButton.textContent = originalText;
        }
    }

    showMessage(message, type) {
        try {
            if (!this.messageDiv) return;
            
            this.messageDiv.textContent = message;
            this.messageDiv.className = `newsletter-message ${type}`;
            this.messageDiv.style.display = 'block';
            this.messageDiv.setAttribute('role', 'alert');
            this.messageDiv.setAttribute('aria-live', 'polite');
            
            // Animate message appearance
            setTimeout(() => {
                this.messageDiv.style.opacity = '1';
                this.messageDiv.style.transform = 'translateY(0)';
            }, 10);

            // Auto-hide after 5 seconds
            setTimeout(() => {
                this.messageDiv.style.opacity = '0';
                this.messageDiv.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    this.messageDiv.style.display = 'none';
                }, 300);
            }, 5000);
        } catch (error) {
            this.logger.error('NewsletterHandler:showMessage', error);
        }
    }

    animateSuccess() {
        try {
            // Add success animation to form
            this.form.classList.add('success-animation');
            setTimeout(() => {
                this.form.classList.remove('success-animation');
            }, 2000);
        } catch (error) {
            this.logger.error('NewsletterHandler:animateSuccess', error);
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new NewsletterHandler();
    });
} else {
    new NewsletterHandler();
}

// Export for module or global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NewsletterHandler;
}
window.NewsletterHandler = NewsletterHandler;
