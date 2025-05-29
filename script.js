// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Enhanced Navigation
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle with animation
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Enhanced smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');

        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Form input animation
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');

formInputs.forEach(input => {
    // Add focus effect
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });

    // Validate on input
    input.addEventListener('input', () => {
        if (input.value) {
            input.classList.add('has-value');
        } else {
            input.classList.remove('has-value');
        }
    });
});

// Package Selection with Enhanced UI
const packageButtons = document.querySelectorAll('.package-button');
const packageSelect = document.querySelector('.package-select');
const packageCards = document.querySelectorAll('.package-card');

packageButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedPackage = button.getAttribute('data-package');
        
        // Update select input
        packageSelect.value = selectedPackage;
        packageSelect.classList.add('has-value');
        
        // Highlight selected package
        packageCards.forEach(card => {
            card.classList.remove('selected');
            if (card.contains(button)) {
                card.classList.add('selected');
            }
        });
        
        // Smooth scroll to contact form with highlight effect
        const contactForm = document.querySelector('#contact');
        contactForm.scrollIntoView({ behavior: 'smooth' });
        
        // Add highlight effect to form
        packageSelect.style.borderColor = 'var(--primary-color)';
        setTimeout(() => {
            packageSelect.style.borderColor = '';
        }, 2000);
    });
});

// Enhanced Form Submission
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Disable submit button and show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        const selectedPackage = packageSelect.value;
        let successMessage = `Thank you for your interest in our ${selectedPackage}!\n\n`;
        successMessage += 'We will contact you shortly to discuss the details.';
        
        alert(successMessage);
        contactForm.reset();
        
        // Reset form state
        formInputs.forEach(input => {
            input.classList.remove('has-value');
            input.parentElement.classList.remove('focused');
        });
        
        packageCards.forEach(card => card.classList.remove('selected'));
        
    } catch (error) {
        alert('Sorry, there was an error sending your message. Please try again.');
    } finally {
        // Reset button state
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
});

// Enhanced More Reviews functionality
const moreReviewsBtn = document.getElementById('moreReviewsBtn');
const hiddenReviews = document.querySelectorAll('.hidden-review');
let reviewsVisible = false;

moreReviewsBtn.addEventListener('click', () => {
    if (!reviewsVisible) {
        // Show hidden reviews with staggered animation
        hiddenReviews.forEach((review, index) => {
            setTimeout(() => {
                review.classList.add('show');
            }, index * 200); // 200ms delay between each review
        });
        moreReviewsBtn.textContent = 'Show Less';
        reviewsVisible = true;
    } else {
        // Hide reviews with reverse animation
        Array.from(hiddenReviews).reverse().forEach((review, index) => {
            setTimeout(() => {
                review.classList.remove('show');
            }, index * 150); // 150ms delay between each review hiding
        });
        moreReviewsBtn.textContent = 'More Reviews';
        reviewsVisible = false;
        
        // Smooth scroll back to visible reviews if needed
        const testimonialSection = document.querySelector('.testimonials');
        const headerOffset = 80;
        const elementPosition = testimonialSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
});

// Update testimonial hover effect to only affect visible cards
const updateTestimonialHoverEffects = () => {
    const visibleTestimonials = document.querySelectorAll('.testimonial-card:not(.hidden-review), .testimonial-card.hidden-review.show');
    
    visibleTestimonials.forEach(card => {
        card.addEventListener('mouseenter', () => {
            visibleTestimonials.forEach(c => {
                if (c !== card) {
                    c.style.transform = 'scale(0.95)';
                    c.style.opacity = '0.7';
                }
            });
        });

        card.addEventListener('mouseleave', () => {
            visibleTestimonials.forEach(c => {
                if (!c.classList.contains('hidden-review') || c.classList.contains('show')) {
                    c.style.transform = '';
                    c.style.opacity = '';
                }
            });
        });
    });
};

// Initialize hover effects
updateTestimonialHoverEffects();

// Update hover effects when reviews visibility changes
moreReviewsBtn.addEventListener('click', () => {
    setTimeout(updateTestimonialHoverEffects, 500); // Wait for animations to complete
});

// Testimonial Scroll Animation
const testimonialSection = document.querySelector('.testimonials');
const testimonialObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                testimonialCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.transform = 'translateY(0)';
                        card.style.opacity = '1';
                    }, index * 200);
                });
            }
        });
    },
    { threshold: 0.2 }
);

testimonialObserver.observe(testimonialSection);

// Add scroll-triggered animations for numbers
const animateValue = (obj, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Initialize counters when they come into view
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            animateValue(counter, 0, target, 2000);
            observer.unobserve(counter);
        }
    });
};

const observer = new IntersectionObserver(observerCallback, {
    threshold: 0.5
});

document.querySelectorAll('.counter').forEach(counter => {
    observer.observe(counter);
}); 