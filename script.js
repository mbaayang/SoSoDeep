    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Mobile menu toggle
    document.getElementById('menu-btn').addEventListener('click', function() {
        document.getElementById('mobile-menu').classList.toggle('hidden');
    });

    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100', 'visible');
        } else {
            backToTopButton.classList.remove('opacity-100', 'visible');
            backToTopButton.classList.add('opacity-0', 'invisible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Language switcher (basic example)
    const languageButtons = document.querySelectorAll('.language-selector a');
    languageButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Fonctionnalité de changement de langue sera implémentée ici');
        });
    });

    // Contact Form Submission
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const statusElement = document.getElementById('contact-status');
        statusElement.classList.remove('success', 'error');
        
        // Verify reCAPTCHA
        const recaptchaResponse = grecaptcha.getResponse();
        if (recaptchaResponse.length === 0) {
            statusElement.textContent = "Veuillez compléter le reCAPTCHA.";
            statusElement.classList.add('error');
            return;
        }
        
        // Get form data
        const formData = new FormData(this);
        formData.append('g-recaptcha-response', recaptchaResponse);
        
        // Simulate form submission (replace with actual AJAX call)
        statusElement.textContent = "Envoi en cours...";
        statusElement.classList.add('success');
        
        // In a real implementation, you would use fetch or XMLHttpRequest to send the data to your server
        setTimeout(() => {
            statusElement.textContent = "Merci pour votre message! Nous vous contacterons bientôt.";
            statusElement.classList.add('success');
            this.reset();
            grecaptcha.reset();
        }, 1500);
    });

    // Newsletter Form Submission
    document.getElementById('newsletter-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const statusElement = document.getElementById('newsletter-status');
        statusElement.classList.remove('success', 'error');
        
        // Get email value
        const email = document.getElementById('newsletter-email').value;
        
        // Simple email validation
        if (!email.includes('@') || !email.includes('.')) {
            statusElement.textContent = "Veuillez entrer une adresse email valide.";
            statusElement.classList.add('error');
            return;
        }
        
        // Simulate form submission (replace with actual AJAX call)
        statusElement.textContent = "Abonnement en cours...";
        statusElement.classList.add('success');
        
        // In a real implementation, you would use fetch or XMLHttpRequest to send the data to your server
        setTimeout(() => {
            statusElement.textContent = "Merci pour votre inscription à notre newsletter!";
            statusElement.classList.add('success');
            this.reset();
        }, 1500);
    });
