// Newsletter Form Handler
// Handles form submission and validation with 3D effects

class NewsletterHandler {
    constructor() {
        this.form = document.querySelector('.newsletter-form');
        this.emailInput = document.querySelector('.newsletter-email');
        this.submitButton = document.querySelector('.newsletter-submit');
        this.messageDiv = document.querySelector('.newsletter-message');
        
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.emailInput?.addEventListener('input', () => this.validateEmail());
        this.emailInput?.addEventListener('focus', () => this.onFocus());
        this.emailInput?.addEventListener('blur', () => this.onBlur());
    }

    validateEmail() {
        const email = this.emailInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && !emailRegex.test(email)) {
            this.emailInput.classList.add('error');
            return false;
        } else {
            this.emailInput.classList.remove('error');
            return true;
        }
    }

    onFocus() {
        this.emailInput.parentElement?.classList.add('focused');
    }

    onBlur() {
        this.emailInput.parentElement?.classList.remove('focused');
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateEmail()) {
            this.showMessage('Please enter a valid email address', 'error');
            return;
        }

        const email = this.emailInput.value;
        
        // Disable form during submission
        this.submitButton.disabled = true;
        this.submitButton.textContent = 'Subscribing...';
        
        try {
            const response = await fetch('api/newsletter.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (data.success) {
                this.showMessage('Successfully subscribed! Thank you.', 'success');
                this.emailInput.value = '';
                this.animateSuccess();
            } else {
                this.showMessage(data.message || 'Something went wrong. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Newsletter error:', error);
            this.showMessage('Network error. Please try again later.', 'error');
        } finally {
            this.submitButton.disabled = false;
            this.submitButton.textContent = 'Subscribe';
        }
    }

    showMessage(message, type) {
        if (!this.messageDiv) return;
        
        this.messageDiv.textContent = message;
        this.messageDiv.className = `newsletter-message ${type}`;
        this.messageDiv.style.display = 'block';
        
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
    }

    animateSuccess() {
        // Add success animation to form
        this.form.classList.add('success-animation');
        setTimeout(() => {
            this.form.classList.remove('success-animation');
        }, 2000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new NewsletterHandler();
});

// Export for module or global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NewsletterHandler;
}
window.NewsletterHandler = NewsletterHandler;

