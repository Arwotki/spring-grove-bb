// ==========================================
// SPRING GROVE B&B - MAIN JAVASCRIPT
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const stickyBar = document.getElementById('stickyBar');
    const backToTop = document.getElementById('backToTop');
    const contactForm = document.getElementById('contactForm');

    // Navbar scroll effect
    function handleScroll() {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        if (scrollY > window.innerHeight * 0.8) {
            stickyBar.classList.add('visible');
        } else {
            stickyBar.classList.remove('visible');
        }
        
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleScroll);

    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        const icon = mobileToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            document.body.style.overflow = 'hidden';
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = '';
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = '';
        });
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const checkinDate = document.getElementById('checkinDate').value;
            const guests = document.getElementById('guests').value;
            const message = document.getElementById('message').value;
            
            // Format the message exactly as specified
            let whatsappText = 'Hi,%20I%20want%20to%20book%20a%20room%20at%20Spring%20Grove%20B%26B.%0A%0A';
            whatsappText += 'Name:%20' + encodeURIComponent(name) + '%0A';
            whatsappText += 'Check-in%20Date:%20' + encodeURIComponent(checkinDate) + '%0A';
            whatsappText += 'Number%20of%20Guests:%20' + guests + '%0A';
            if (message) {
                whatsappText += 'Message:%20' + encodeURIComponent(message);
            }
            
            const whatsappUrl = 'https://wa.me/918413966410?text=' + whatsappText;
            window.open(whatsappUrl, '_blank');
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

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

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    const style = document.createElement('style');
    style.textContent = `
        section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        section.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        .hero, .urgency-banner, .navbar {
            opacity: 1;
            transform: none;
        }
    `;
    document.head.appendChild(style);

    // Guest pricing calculator
    const guestButtons = document.querySelectorAll('.guest-btn');
    const priceAmount = document.getElementById('priceAmount');
    const basePriceEl = document.querySelector('.base-price');
    const extraGuestsEl = document.getElementById('extraGuests');
    const breakfastNote = document.getElementById('breakfastNote');
    const bookBtn = document.getElementById('bookBtn');

    if (guestButtons.length > 0) {
        const BASE_PRICE = 1191;
        const EXTRA_PER_PERSON = 400;

        function updatePrice(guests) {
            const totalPrice = BASE_PRICE + ((guests - 1) * EXTRA_PER_PERSON);
            
            priceAmount.style.opacity = '0';
            setTimeout(function() {
                priceAmount.textContent = totalPrice;
                priceAmount.style.opacity = '1';
            }, 150);

            if (guests === 1) {
                basePriceEl.textContent = 'Base: Rs.' + BASE_PRICE;
                extraGuestsEl.style.display = 'none';
            } else {
                basePriceEl.textContent = 'Base: Rs.' + BASE_PRICE + ' + Rs.' + EXTRA_PER_PERSON + ' x ' + (guests - 1) + ' guest' + (guests > 2 ? 's' : '');
                extraGuestsEl.style.display = 'inline';
            }

            if (breakfastNote) {
                breakfastNote.textContent = '(for ' + guests + ')';
            }

            if (bookBtn) {
                bookBtn.href = 'https://wa.me/918413966410?text=Hi%20Spring%20Grove%20B%26B%2C%20I%20want%20to%20book%20a%20room%20for%20' + guests + '%20person' + (guests > 1 ? 's' : '') + '%20at%20Rs%20' + totalPrice;
            }
        }

        guestButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                guestButtons.forEach(function(b) { b.classList.remove('active'); });
                this.classList.add('active');
                
                const guests = parseInt(this.getAttribute('data-guests'));
                updatePrice(guests);
            });
        });
    }

    // Urgency banner countdown
    function updateUrgencyText() {
        const banner = document.querySelector('.urgency-banner p');
        if (banner) {
            const hours = Math.floor(Math.random() * 5) + 1;
            banner.innerHTML = '<i class="fas fa-fire"></i> <strong>Limited rooms available</strong> - ' + hours + ' people viewed this property in the last hour!';
        }
    }
    
    setInterval(updateUrgencyText, 30000);
    updateUrgencyText();

    console.log('Spring Grove B&B website loaded successfully');
});
