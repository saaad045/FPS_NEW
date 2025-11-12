//////////////////////////////////////hero section (home page)  
// NEW: Interactive cursor trail
        document.addEventListener('DOMContentLoaded', function() {
            const cursorTrail = document.getElementById('cursorTrail');
            let mouseX = 0, mouseY = 0;
            let trailX = 0, trailY = 0;
            
            document.addEventListener('mousemove', function(e) {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });
            
            function animateCursor() {
                trailX += (mouseX - trailX) * 0.1;
                trailY += (mouseY - trailY) * 0.1;
                
                cursorTrail.style.left = trailX + 'px';
                cursorTrail.style.top = trailY + 'px';
                cursorTrail.style.opacity = '0.7';
                
                requestAnimationFrame(animateCursor);
            }
            
            animateCursor();
            
            // NEW: Create interactive background shapes
            const interactiveShapes = document.getElementById('interactiveShapes');
            const shapes = [];
            
            for (let i = 0; i < 5; i++) {
                const shape = document.createElement('div');
                shape.classList.add('shape');
                
                const size = Math.random() * 300 + 100;
                shape.style.width = size + 'px';
                shape.style.height = size + 'px';
                
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                shape.style.left = x + '%';
                shape.style.top = y + '%';
                
                interactiveShapes.appendChild(shape);
                shapes.push(shape);
            }
            
            // NEW: Make shapes follow cursor slightly
            document.addEventListener('mousemove', function(e) {
                const mouseX = e.clientX / window.innerWidth;
                const mouseY = e.clientY / window.innerHeight;
                
                shapes.forEach((shape, index) => {
                    const speed = 0.01 + (index * 0.005);
                    const x = parseFloat(shape.style.left) + (mouseX * 100 - parseFloat(shape.style.left)) * speed;
                    const y = parseFloat(shape.style.top) + (mouseY * 100 - parseFloat(shape.style.top)) * speed;
                    
                    shape.style.left = x + '%';
                    shape.style.top = y + '%';
                });
            });
            
            // NEW: Particle system
            const particlesContainer = document.getElementById('particlesContainer');
            
            function createParticle() {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                const size = Math.random() * 5 + 2;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                
                const startX = Math.random() * window.innerWidth;
                particle.style.left = startX + 'px';
                
                const duration = Math.random() * 20 + 10;
                particle.style.animationDuration = duration + 's';
                
                const delay = Math.random() * 5;
                particle.style.animationDelay = delay + 's';
                
                particlesContainer.appendChild(particle);
                
                // Remove particle after animation completes
                setTimeout(() => {
                    particle.remove();
                }, (duration + delay) * 1000);
            }
            
            // Create initial particles
            for (let i = 0; i < 30; i++) {
                createParticle();
            }
            
            // Continue creating particles
            setInterval(createParticle, 500);
            
            // NEW: Button interaction enhancement
            const buttons = document.querySelectorAll('.btn-accent, .btn-outline-accent');
            
            buttons.forEach(button => {
                button.addEventListener('mouseenter', function() {
                    // Create ripple effect
                    const ripple = document.createElement('span');
                    ripple.classList.add('ripple-effect');
                    ripple.style.position = 'absolute';
                    ripple.style.borderRadius = '50%';
                    ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                    ripple.style.transform = 'scale(0)';
                    ripple.style.animation = 'ripple 0.6s linear';
                    ripple.style.pointerEvents = 'none';
                    
                    const size = Math.max(button.offsetWidth, button.offsetHeight);
                    ripple.style.width = size + 'px';
                    ripple.style.height = size + 'px';
                    
                    const rect = button.getBoundingClientRect();
                    ripple.style.left = (event.clientX - rect.left - size/2) + 'px';
                    ripple.style.top = (event.clientY - rect.top - size/2) + 'px';
                    
                    button.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
            });
            
            // Add CSS for ripple effect
            const style = document.createElement('style');
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
            
            // NEW: Text animation on scroll into view
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, observerOptions);
            
            // Observe elements for animation
            document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons').forEach(el => {
                observer.observe(el);
            });
        });

////////////////////////////////////// end hero section (home page)////////////

////////////////////////////////navbar section//////////////////////
document.addEventListener("scroll", () => {
            const navbar = document.querySelector(".custom-navbar");
            if (window.scrollY > 50) {
                navbar.classList.add("visible");
            } else {
                navbar.classList.remove("visible");
            }
        });

        // Show navbar on load with a delay
        window.addEventListener("load", () => {
            setTimeout(() => {
                document.querySelector(".custom-navbar").classList.add("visible");
            }, 300);
        });

        // Enhanced dropdown functionality for desktop
        document.addEventListener('DOMContentLoaded', function() {
            const dropdowns = document.querySelectorAll('.dropdown');
            
            // Only apply hover effects for desktop
            if (window.innerWidth > 992) {
                dropdowns.forEach(dropdown => {
                    dropdown.addEventListener('mouseenter', function() {
                        this.querySelector('.dropdown-menu').style.opacity = '1';
                        this.querySelector('.dropdown-menu').style.visibility = 'visible';
                        this.querySelector('.dropdown-menu').style.transform = 'translateY(0)';
                    });
                    
                    dropdown.addEventListener('mouseleave', function() {
                        this.querySelector('.dropdown-menu').style.opacity = '0';
                        this.querySelector('.dropdown-menu').style.visibility = 'hidden';
                        this.querySelector('.dropdown-menu').style.transform = 'translateY(10px)';
                    });
                });
            }

            // Add ripple effect to buttons
            const buttons = document.querySelectorAll('.btn-accent, .nav-link');
            
            buttons.forEach(button => {
                button.addEventListener('click', function(e) {
                    // Don't create ripple if it's a dropdown toggle on mobile
                    if (this.classList.contains('dropdown-toggle') && window.innerWidth <= 992) {
                        return;
                    }
                    
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.style.width = ripple.style.height = size + 'px';
                    ripple.style.left = x + 'px';
                    ripple.style.top = y + 'px';
                    ripple.classList.add('ripple');
                    
                    this.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
            });

            // Close mobile menu when clicking on a link
            const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 992) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                            toggle: false
                        });
                        bsCollapse.hide();
                    }
                });
            });

            // Handle window resize
            window.addEventListener('resize', function() {
                // Reset dropdown styles on resize
                if (window.innerWidth > 992) {
                    dropdowns.forEach(dropdown => {
                        const menu = dropdown.querySelector('.dropdown-menu');
                        menu.style.opacity = '';
                        menu.style.visibility = '';
                        menu.style.transform = '';
                    });
                }
            });
        });
////////////////////////////////end navbar section//////////////////////



//////////////////////////////////////services section (home page)
    document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('serviceCarousel');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const indicatorsContainer = document.getElementById('carouselIndicators');

    let cardWidth;
    let cardsPerView;
    let currentPosition = 0;
    let totalCards;
    let totalSlides;
    let currentSlide = 0;
    let isMobileView = window.innerWidth <= 768;

    function initializeCarousel() {
        if (!carousel) return;

        isMobileView = window.innerWidth <= 768;

        if (isMobileView) {
            // On mobile — let scroll-snap handle scrolling
            nextBtn.style.display = 'none';
            prevBtn.style.display = 'none';
            indicatorsContainer.style.display = 'none';
            return;
        }

        // Desktop logic
        nextBtn.style.display = '';
        prevBtn.style.display = '';
        indicatorsContainer.style.display = '';

        const card = carousel.querySelector('.service-card');
        cardWidth = card ? card.offsetWidth + 30 : 380;
        cardsPerView = 3;
        totalCards = carousel.children.length;
        totalSlides = Math.ceil(totalCards / cardsPerView);

        indicatorsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }

        currentPosition = 0;
        currentSlide = 0;
        updateButtonStates();
    }

    function updateButtonStates() {
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === totalSlides - 1;

        document.querySelectorAll('.indicator').forEach((ind, index) => {
            ind.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(slideIndex) {
        if (isMobileView) return;
        currentSlide = slideIndex;
        currentPosition = slideIndex * cardWidth * cardsPerView;
        carousel.scrollTo({
            left: currentPosition,
            behavior: 'smooth'
        });
        updateButtonStates();
    }

    nextBtn.addEventListener('click', () => {
        if (isMobileView) return;
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            goToSlide(currentSlide);
        }
    });

    prevBtn.addEventListener('click', () => {
        if (isMobileView) return;
        if (currentSlide > 0) {
            currentSlide--;
            goToSlide(currentSlide);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (isMobileView) return;
        if (e.key === 'ArrowLeft') prevBtn.click();
        else if (e.key === 'ArrowRight') nextBtn.click();
    });

    // Touch/swipe support (desktop swipe only)
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (isMobileView) return;
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) nextBtn.click();
        else if (touchEndX > touchStartX + swipeThreshold) prevBtn.click();
    }

    // Initialize carousel
    initializeCarousel();

    // Recalculate on resize
    window.addEventListener('resize', () => {
        initializeCarousel();
    });
});

//////////////////////////////////////end services section (home page)


////////////////////////////////////// about section (home page)
 // Animated counter for stats
        document.addEventListener('DOMContentLoaded', function() {
            const counters = document.querySelectorAll('.stat-number');
            const speed = 200;
            
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-count');
                    const count = +counter.innerText;
                    const increment = target / speed;
                    
                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = target;
                    }
                };
                
                // Start counter when element is in viewport
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            updateCount();
                            observer.unobserve(entry.target);
                        }
                    });
                });
                
                observer.observe(counter);
            });

            // Add hover effect to about image
            const aboutImg = document.querySelector('.about-img');
            aboutImg.addEventListener('mousemove', (e) => {
                const { left, top, width, height } = aboutImg.getBoundingClientRect();
                const x = (e.clientX - left) / width - 0.5;
                const y = (e.clientY - top) / height - 0.5;
                
                aboutImg.style.transform = `perspective(1000px) rotateY(${-x * 5}deg) rotateX(${y * 5}deg) scale(1.02)`;
            });
            
            aboutImg.addEventListener('mouseleave', () => {
                aboutImg.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(5deg)';
            });
        });
////////////////////////////////////// end about section (home page)

////////////////////////////////////// process section (home page)
// Add intersection observer for animation triggers
      document.addEventListener('DOMContentLoaded', () => {
  const steps = document.querySelectorAll('.process-step, .process-center');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.3 });

  steps.forEach(step => observer.observe(step));
});

////////////////////////////////////// end process section (home page)


////case studies section (home page)
const caseData = [
            {
                title: "Conversion Rate Optimization",
                image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800",
                stat1: "72%",
                stat2: "80%",
                label1: "Increase in User Retention",
                label2: "Increase in Qualified Leads"
            },
            {
                title: "Competitor Research and Insights",
                image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
                stat1: "64%",
                stat2: "70%",
                label1: "Better Market Visibility",
                label2: "Faster Brand Growth"
            },
            {
                title: "Market Trends and Analysis",
                image: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=800",
                stat1: "82%",
                stat2: "93%",
                label1: "Improved Forecast Accuracy",
                label2: "Higher ROI Planning"
            },
            {
                title: "SEO Audit and Optimization",
                image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
                stat1: "76%",
                stat2: "84%",
                label1: "Increase in Organic Traffic",
                label2: "Boost in Domain Authority"
            },
            {
                title: "Performance Tracking and Reporting",
                image: "https://images.unsplash.com/photo-1686061592689-312bbfb5c055?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
                stat1: "90%",
                stat2: "99%",
                label1: "Improved Campaign Efficiency",
                label2: "Boost in Conversion Rate"
            }
        ];

        const tabs = document.querySelectorAll(".tab");
        const caseImage = document.getElementById("caseImage");
        const caseTitle = document.getElementById("caseTitle");
        const stat1 = document.getElementById("stat1");
        const stat2 = document.getElementById("stat2");
        const label1 = document.getElementById("label1");
        const label2 = document.getElementById("label2");
        const caseSlide = document.querySelector(".case-slide");

        // Initialize with first case study
        updateCaseStudy(0);

        tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove("active"));
                
                // Add active class to clicked tab
                tab.classList.add("active");

                const index = parseInt(tab.dataset.index);
                updateCaseStudy(index);
            });
        });

        function updateCaseStudy(index) {
            const data = caseData[index];
            
            // Add fade-out animation
            caseImage.style.opacity = 0;
            caseSlide.style.transform = "scale(0.98)";
            
            setTimeout(() => {
                // Update content
                caseImage.src = data.image;
                caseTitle.textContent = data.title;
                stat1.textContent = data.stat1;
                stat2.textContent = data.stat2;
                label1.textContent = data.label1;
                label2.textContent = data.label2;
                
                // Add fade-in animation
                caseImage.style.opacity = 1;
                caseSlide.style.transform = "scale(1)";
            }, 300);
        }

        // Add hover effect to case study slide
        caseSlide.addEventListener('mouseenter', () => {
            caseSlide.style.transform = "translateY(-5px) scale(1.02)";
        });
        
        caseSlide.addEventListener('mouseleave', () => {
            caseSlide.style.transform = "translateY(0) scale(1)";
        });

        // Add click animation to contact button
        const contactBtn = document.querySelector('.contact-btn');
        contactBtn.addEventListener('click', function() {
            this.style.transform = "scale(0.95)";
            setTimeout(() => {
                this.style.transform = "";
            }, 150);
            
            // Add your contact form logic here
            console.log("Contact button clicked!");
        });

////////////////////////////////////// end case studies section (home page)

////////////////////////////////////// contact section (home page)
 // DOM Elements
        const contactCards = document.querySelectorAll('.contact-card');
        const contactModal = document.getElementById('contactModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');
        const closeModal = document.getElementById('closeModal');
        const openContactForm = document.getElementById('openContactForm');

        // Contact methods data
        const contactMethods = {
            call: {
                title: "Call Us",
                content: `
                    <p>Speak directly with our team. We're available during business hours to discuss your project.</p>
                    <div style="text-align: center; margin: 25px 0;">
                        <a href="tel:+15551234567" class="btn-accent" style="text-decoration: none;">
                            <i class="fas fa-phone"></i>
                            Call +1 (555) 123-4567
                        </a>
                    </div>
                    <p><strong>Business Hours:</strong><br>
                    Monday - Friday: 9:00 AM - 6:00 PM EST<br>
                    Saturday: 10:00 AM - 2:00 PM EST</p>
                `
            },
            email: {
                title: "Email Us",
                content: `
                    <p>Send us an email and we'll get back to you within 24 hours.</p>
                    <div style="text-align: center; margin: 25px 0;">
                        <a href="mailto:hello@fullplatestudio.com" class="btn-accent" style="text-decoration: none;">
                            <i class="fas fa-envelope"></i>
                            Send Email
                        </a>
                    </div>
                    <p>Prefer to write directly? Email us at <strong>hello@fullplatestudio.com</strong></p>
                `
            },
            whatsapp: {
                title: "WhatsApp Chat",
                content: `
                    <p>Chat with us instantly on WhatsApp for quick questions and support.</p>
                    <div style="text-align: center; margin: 25px 0;">
                        <a href="https://wa.me/15551234567" target="_blank" class="whatsapp-link">
                            <i class="fab fa-whatsapp"></i>
                            Start WhatsApp Chat
                        </a>
                    </div>
                    <p>We typically respond within minutes during business hours.</p>
                `
            },
            form: {
                title: "Contact Form",
                content: `
                    <form id="contactForm">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Your Name" required>
                        </div>
                        <div class="form-group">
                            <input type="email" class="form-control" placeholder="Your Email" required>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Subject">
                        </div>
                        <div class="form-group">
                            <textarea class="form-control" placeholder="Your Message" required></textarea>
                        </div>
                        <button type="submit" class="btn-accent" style="width: 100%;">
                            <i class="fas fa-paper-plane"></i>
                            Send Message
                        </button>
                    </form>
                    <div class="success-message" id="formSuccess">
                        <i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.
                    </div>
                `
            },
            support: {
                title: "24/7 Support",
                content: `
                    <p>Our support team is available around the clock to assist you with any urgent matters.</p>
                    <div style="text-align: center; margin: 25px 0;">
                        <a href="tel:+15551234567" class="btn-accent" style="text-decoration: none; margin: 5px;">
                            <i class="fas fa-phone"></i>
                            Emergency Support
                        </a>
                        <a href="mailto:support@fullplatestudio.com" class="btn-accent" style="text-decoration: none; margin: 5px;">
                            <i class="fas fa-envelope"></i>
                            Support Email
                        </a>
                    </div>
                    <p><strong>For urgent matters outside business hours:</strong><br>
                    Call our emergency support line or send an email marked "URGENT".</p>
                `
            },
            location: {
                title: "Our Location",
                content: `
                    <p>Visit us at our studio or get directions to our location.</p>
                    <div class="map-container">
                        <div class="map-placeholder">
                            <div style="text-align: center;">
                                <i class="fas fa-map-marker-alt" style="font-size: 2rem; margin-bottom: 10px;"></i>
                                <p>123 Creative Avenue<br>Innovation District, CA 90210</p>
                                <a href="https://maps.google.com/?q=123+Creative+Avenue+Innovation+District+CA+90210" 
                                   target="_blank" class="btn-accent" style="text-decoration: none; margin-top: 15px;">
                                    <i class="fas fa-directions"></i>
                                    Get Directions
                                </a>
                            </div>
                        </div>
                    </div>
                `
            }
        };

        // Event Listeners
        contactCards.forEach(card => {
            card.addEventListener('click', () => {
                const action = card.getAttribute('data-action');
                openModal(action);
            });
        });

        openContactForm.addEventListener('click', () => {
            openModal('form');
        });

        closeModal.addEventListener('click', closeModalFunc);

        // Close modal when clicking outside
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                closeModalFunc();
            }
        });

        // Functions
        function openModal(action) {
            const method = contactMethods[action];
            if (method) {
                modalTitle.textContent = method.title;
                modalContent.innerHTML = method.content;
                
                // Add form submission handler if it's the contact form
                if (action === 'form') {
                    setTimeout(() => {
                        const contactForm = document.getElementById('contactForm');
                        const successMessage = document.getElementById('formSuccess');
                        
                        if (contactForm) {
                            contactForm.addEventListener('submit', (e) => {
                                e.preventDefault();
                                // Simulate form submission
                                contactForm.style.display = 'none';
                                successMessage.style.display = 'block';
                                
                                // Reset form after 3 seconds
                                setTimeout(() => {
                                    contactForm.style.display = 'block';
                                    successMessage.style.display = 'none';
                                    contactForm.reset();
                                }, 3000);
                            });
                        }
                    }, 100);
                }
                
                contactModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }

        function closeModalFunc() {
            contactModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Add hover effects to contact cards
        contactCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
////////////////////////////////////// end contact section (home page)

////////////////////////////////////// footer section (home page)
  // Newsletter Form Submission
        const newsletterForm = document.getElementById('newsletterForm');
        const newsletterSuccess = document.getElementById('newsletterSuccess');

        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            newsletterForm.style.display = 'none';
            newsletterSuccess.style.display = 'block';
            
            // Reset form after 3 seconds
            setTimeout(() => {
                newsletterForm.style.display = 'flex';
                newsletterSuccess.style.display = 'none';
                newsletterForm.reset();
            }, 3000);
        });

        // Back to Top Button
        const backToTop = document.getElementById('backToTop');

        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Add hover effects to footer links
        const footerLinks = document.querySelectorAll('.footer-links a');
        
        footerLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(5px)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
        });
////////////////////////////////////// end footer section (home page)