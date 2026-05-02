// ==========================================
// SPRING GROVE B&B - GALLERY JAVASCRIPT
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Gallery data for lightbox
    window.galleryData = [
        { title: 'Deluxe Room', desc: 'Spacious room with attached kitchen', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', icon: 'fa-bed' },
        { title: 'Standard Room', desc: 'Clean and comfortable', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', icon: 'fa-bed' },
        { title: 'Family Suite', desc: 'Extra spacious with living area', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', icon: 'fa-bed' },
        { title: 'Private Bathroom', desc: 'Modern and clean', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', icon: 'fa-bath' },
        { title: 'Property Exterior', desc: 'Peaceful green surroundings', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', icon: 'fa-home' },
        { title: 'Common Area', desc: 'Cozy sitting space', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', icon: 'fa-couch' },
        { title: 'Free Parking', desc: 'Secure parking for guests', gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', icon: 'fa-car' },
        { title: 'Spa & Massage', desc: 'Relax and rejuvenate', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', icon: 'fa-spa' },
        { title: 'Fresh Breakfast', desc: 'Delicious homemade meals', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', icon: 'fa-utensils' },
        { title: 'Local Cuisine', desc: 'Authentic Meghalaya flavors', gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', icon: 'fa-coffee' },
        { title: 'In-Room Kitchen', desc: 'Cook your own meals', gradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)', icon: 'fa-blender' },
        { title: 'Mountain View', desc: 'Breathtaking scenery nearby', gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)', icon: 'fa-mountain' },
        { title: 'Green Hills', desc: 'Lush landscapes of Meghalaya', gradient: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)', icon: 'fa-tree' },
        { title: 'Nearby Waterfall', desc: 'Explore natural wonders', gradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)', icon: 'fa-water' },
        { title: 'Sunset View', desc: 'Peaceful evenings', gradient: 'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)', icon: 'fa-sun' }
    ];

    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            // Filter items with animation
            galleryItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.animation = `fadeInUp 0.5s ease ${index * 0.05}s both`;
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // Lightbox state
    window.currentLightboxIndex = 0;
    window.visibleItems = [];

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') changeImage(-1);
        if (e.key === 'ArrowRight') changeImage(1);
    });

    console.log('📸 Gallery loaded successfully');
});

// Open lightbox
function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxCounter = document.getElementById('lightboxCounter');

    // Get currently visible items
    window.visibleItems = Array.from(document.querySelectorAll('.gallery-item:not(.hidden)'));
    
    // Find the actual index in visible items
    const allItems = Array.from(document.querySelectorAll('.gallery-item'));
    window.currentLightboxIndex = window.visibleItems.indexOf(allItems[index]);
    if (window.currentLightboxIndex === -1) window.currentLightboxIndex = 0;

    updateLightboxContent();

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Change image
function changeImage(direction) {
    window.currentLightboxIndex += direction;

    if (window.currentLightboxIndex < 0) {
        window.currentLightboxIndex = window.visibleItems.length - 1;
    } else if (window.currentLightboxIndex >= window.visibleItems.length) {
        window.currentLightboxIndex = 0;
    }

    updateLightboxContent();
}

// Update lightbox content
function updateLightboxContent() {
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxCounter = document.getElementById('lightboxCounter');

    const data = window.galleryData[window.currentLightboxIndex];

    lightboxImage.style.background = data.gradient;
    lightboxImage.innerHTML = `<i class="fas ${data.icon}"></i>`;

    lightboxCaption.innerHTML = `
        <h3>${data.title}</h3>
        <p>${data.desc}</p>
    `;

    lightboxCounter.textContent = `${window.currentLightboxIndex + 1} / ${window.visibleItems.length}`;
}

