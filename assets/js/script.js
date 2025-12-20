document.addEventListener('DOMContentLoaded', () => {
    // Lightbox functionality
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox hidden';
    lightbox.innerHTML = `
    <div class="lightbox-content">
      <span class="lightbox-close">&times;</span>
      <img src="" alt="Zoomed artwork">
    </div>
  `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    // Open lightbox
    // Select both technique cards (if we decide to make them zoomable) and gallery artworks
    const zoomableImages = document.querySelectorAll('.artwork img');

    zoomableImages.forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling if inside a link
            lightboxImg.src = e.target.src;
            lightbox.classList.remove('hidden');
            lightbox.classList.add('active');
        });
    });

    // Optional: Also allow clicking the .artwork container
    document.querySelectorAll('.artwork').forEach(card => {
        card.addEventListener('click', (e) => {
            const img = card.querySelector('img');
            if (img) {
                lightboxImg.src = img.src;
                lightbox.classList.remove('hidden');
                lightbox.classList.add('active');
            }
        });
    });

    // Close lightbox
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === closeBtn) {
            lightbox.classList.add('hidden');
        }
    });
});
