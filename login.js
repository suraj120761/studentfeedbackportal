document.addEventListener('DOMContentLoaded', function() {
    var form_modal = document.querySelector('.cd-user-modal');
    var form_login = form_modal.querySelector('#cd-login');
    var form_signup = form_modal.querySelector('#cd-signup');
    var form_forgot_password = form_modal.querySelector('#cd-reset-password');
    var form_modal_tab = document.querySelector('.cd-switcher');
    var tab_login = form_modal_tab.children[0].querySelector('a');
    var tab_signup = form_modal_tab.children[1].querySelector('a');
    var forgot_password_link = form_login.querySelector('.cd-form-bottom-message a');
    var back_to_login_link = form_forgot_password.querySelector('.cd-form-bottom-message a');
    var main_nav = document.querySelector('.main-nav');

    // Open modal
    main_nav.addEventListener('click', function(event) {
        if (event.target === main_nav) {
            // On mobile, open the submenu
            main_nav.children[0].classList.toggle('is-visible');
        } else {
            // On mobile, close submenu
            main_nav.children[0].classList.remove('is-visible');
            // Show modal layer
            form_modal.classList.add('is-visible');
            // Show the selected form
            if (event.target.classList.contains('cd-signup')) {
                signup_selected();
            } else {
                login_selected();
            }
        }
    });

    // Close modal
    form_modal.addEventListener('click', function(event) {
        if (event.target === form_modal || event.target.classList.contains('cd-close-form')) {
            form_modal.classList.remove('is-visible');
        }
    });

    // Close modal when clicking the esc keyboard button
    document.addEventListener('keyup', function(event) {
        if (event.which === 27) {
            form_modal.classList.remove('is-visible');
        }
    });

    // Switch from a tab to another
    form_modal_tab.addEventListener('click', function(event) {
        event.preventDefault();
        if (event.target === tab_login) {
            login_selected();
        } else {
            signup_selected();
        }
    });

    // Hide or show password
    document.querySelector('.hide-password').addEventListener('click', function() {
        var password_field = this.previousElementSibling;
        if (password_field.type === 'password') {
            password_field.type = 'text';
        } else {
            password_field.type = 'password';
        }
        this.textContent = (this.textContent === 'Hide') ? 'Show' : 'Hide';
        // Focus and move cursor to the end of input field
        putCursorAtEnd(password_field);
    });

    // Show forgot-password form
    forgot_password_link.addEventListener('click', function(event) {
        event.preventDefault();
        forgot_password_selected();
    });

    // Back to login from the forgot-password form
    back_to_login_link.addEventListener('click', function(event) {
        event.preventDefault();
        login_selected();
    });

    function login_selected() {
        form_login.classList.add('is-selected');
        form_signup.classList.remove('is-selected');
        form_forgot_password.classList.remove('is-selected');
        tab_login.classList.add('selected');
        tab_signup.classList.remove('selected');
    }

    function signup_selected() {
        form_login.classList.remove('is-selected');
        form_signup.classList.add('is-selected');
        form_forgot_password.classList.remove('is-selected');
        tab_login.classList.remove('selected');
        tab_signup.classList.add('selected');
    }

    function forgot_password_selected() {
        form_login.classList.remove('is-selected');
        form_signup.classList.remove('is-selected');
        form_forgot_password.classList.add('is-selected');
    }

    // REMOVE THIS - It's just to show error messages
    form_login.querySelector('input[type="submit"]').addEventListener('click', function(event) {
        event.preventDefault();
        var email_input = form_login.querySelector('input[type="email"]');
        email_input.classList.toggle('has-error');
        email_input.nextElementSibling.classList.toggle('is-visible');
    });

    form_signup.querySelector('input[type="submit"]').addEventListener('click', function(event) {
        event.preventDefault();
        var email_input = form_signup.querySelector('input[type="email"]');
        email_input.classList.toggle('has-error');
        email_input.nextElementSibling.classList.toggle('is-visible');
    });

    // IE9 placeholder fallback
    var placeholders = document.querySelectorAll('[placeholder]');
    Array.prototype.forEach.call(placeholders, function(input) {
        input.addEventListener('focus', function() {
            if (this.value === this.getAttribute('placeholder')) {
                this.value = '';
            }
        });
        input.addEventListener('blur', function() {
            if (this.value === '' || this.value === this.getAttribute('placeholder')) {
                this.value = this.getAttribute('placeholder');
            }
        });
    });
});

// Move cursor to the end of input field
function putCursorAtEnd(el) {
    el.focus();
    if (typeof el.selectionStart === 'number') {
        el.selectionStart = el.selectionEnd = el.value.length;
    } else if (typeof el.createTextRange !== 'undefined') {
        var range = el.createTextRange();
        range.collapse(false);
        range.select();
    }
}
