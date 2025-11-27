document.addEventListener('DOMContentLoaded', () => {

    // -------------------------------------------------------
    // 1. Navbar Toggle for Mobile
    // -------------------------------------------------------
    const navToggle = document.getElementById('nav-toggle');
    const navList = document.getElementById('nav-list');

    if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
            navList.classList.toggle('open');
        });

        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('open');
            });
        });
    }

    // -------------------------------------------------------
    // 2. Intersection Observer
    // -------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(element => observer.observe(element));

    // -------------------------------------------------------
    // 3. WEB3FORMS SUBMISSION (direct email)
    // -------------------------------------------------------
    const enquiryForm = document.getElementById('enquiry-form');
    const formMessage = document.getElementById('form-message');

    if (enquiryForm && formMessage) {

        enquiryForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Basic validation
            if (!enquiryForm.checkValidity()) {
                formMessage.textContent = 'Please fill all required fields.';
                formMessage.style.color = 'var(--accent-secondary)';
                setTimeout(() => formMessage.textContent = '', 4000);
                return;
            }

            formMessage.textContent = "Sending...";
            formMessage.style.color = 'var(--accent-main)';

            const formData = new FormData(enquiryForm);

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                formMessage.textContent = 'Success! Your message has been sent.';
                formMessage.style.color = 'var(--accent-main)';
                enquiryForm.reset();
                setTimeout(() => formMessage.textContent = '', 4000);
            } else {
                formMessage.textContent = 'Error! Please try again.';
                formMessage.style.color = 'var(--accent-secondary)';
                setTimeout(() => formMessage.textContent = '', 4000);
            }
        });
    }

    // -------------------------------------------------------
    // 4. Footer Year
    // -------------------------------------------------------
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});
