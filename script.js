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

    // Contact Form Submission avec Formspree
    document.getElementById('contact-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const statusElement = document.getElementById('contact-status');
        const form = e.target;
        const submitButton = form.querySelector('button[type="submit"]');
        
        // Réinitialiser le statut
        statusElement.textContent = '';
        statusElement.className = 'form-status';
        
        // Vérification reCAPTCHA
        if (grecaptcha.getResponse().length === 0) {
            statusElement.textContent = "Veuillez compléter le reCAPTCHA.";
            statusElement.classList.add('error');
            return;
        }
        
        // Désactiver le bouton pendant l'envoi
        submitButton.disabled = true;
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<span class="relative z-10">Envoi en cours...</span>';
        
        try {
            // Envoyer les données à Formspree
            const response = await fetch('https://formspree.io/f/xzzeqrvb', {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                statusElement.textContent = "Merci pour votre message! Nous vous contacterons bientôt.";
                statusElement.classList.add('success');
                form.reset();
                grecaptcha.reset();
            } else {
                throw new Error('Erreur lors de l\'envoi');
            }
        } catch (error) {
            console.error('Erreur:', error);
            statusElement.textContent = "Une erreur s'est produite. Veuillez réessayer plus tard.";
            statusElement.classList.add('error');
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
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
