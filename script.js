
const USER_DATABASE = {
    "Mrs A Lopez": "12345678",

};

class SchoolMISLoginForm {
    static users = USER_DATABASE;

    constructor() {
        // Login form elements
        this.form = document.getElementById('loginForm');
        this.usernameInput = document.getElementById('username');
        this.passwordInput = document.getElementById('password');
        this.passwordToggle = document.getElementById('passwordToggle');
        this.submitButton = this.form.querySelector('.login-btn');
        this.successMessage = document.getElementById('successMessage');

        this.init();
    }

    init() {
        this.bindEvents();
        this.setupPasswordToggle();
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.usernameInput.addEventListener('blur', () => this.validateUsername());
        this.passwordInput.addEventListener('blur', () => this.validatePassword());
        this.usernameInput.addEventListener('input', () => this.clearError('username'));
        this.passwordInput.addEventListener('input', () => this.clearError('password'));
    }

    setupPasswordToggle() {
        this.passwordToggle.addEventListener('click', () => {
            const type = this.passwordInput.type === 'password' ? 'text' : 'password';
            this.passwordInput.type = type;
            const icon = this.passwordToggle.querySelector('.toggle-icon');
            icon.classList.toggle('show-password', type === 'text');
        });
    }
    
    validateUsername() {
        const username = this.usernameInput.value.trim();
        if (!username) {
            this.showError('username', 'Username is required');
            return false;
        }
        // Add more username validation if needed (e.g., allowed characters)
        this.clearError('username');
        return true;
    }
    
    validatePassword() {
        const password = this.passwordInput.value;
        if (!password) {
            this.showError('password', 'Password is required');
            return false;
        }
        if (password.length < 8) {
            this.showError('password', 'Password must be at least 8 characters');
            return false;
        }
        this.clearError('password');
        return true;
    }
    
    showError(field, message) {
        const formGroup = document.getElementById(field).closest('.form-group');
        const errorElement = document.getElementById(`${field}Error`);
        
        formGroup.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    clearError(field) {
        const formGroup = document.getElementById(field).closest('.form-group');
        const errorElement = document.getElementById(`${field}Error`);
        
        formGroup.classList.remove('error');
        errorElement.classList.remove('show');
        setTimeout(() => {
            errorElement.textContent = '';
        }, 300);
    }
    
    async handleSubmit(e) {
        e.preventDefault();

        const isUsernameValid = this.validateUsername();
        const isPasswordValid = this.validatePassword();
        if (!isUsernameValid || !isPasswordValid) {
            return;
        }

        this.setLoading(true);
        try {
            // Check credentials in in-memory users
            const users = SchoolMISLoginForm.users;
            const username = this.usernameInput.value.trim();
            const password = this.passwordInput.value;
            if (!users[username] || users[username] !== password) {
                this.showError('password', 'Invalid username or password.');
                return;
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.showSuccess();
        } catch (error) {
            this.showError('password', 'Authentication failed. Please contact IT support.');
        } finally {
            this.setLoading(false);
        }
    }

    setLoading(loading) {
        this.submitButton.classList.toggle('loading', loading);
        this.submitButton.disabled = loading;
    }

    showSuccess() {
        this.form.style.display = 'none';
        if (document.querySelector('.footer-links')) document.querySelector('.footer-links').style.display = 'none';
        this.successMessage.classList.add('show');
        setTimeout(() => {
            window.location.href = 'Dashboard.html';
        }, 1500);
    }
}

// Initialize the form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SchoolMISLoginForm();

});

