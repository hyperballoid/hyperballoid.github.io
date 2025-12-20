document.addEventListener("DOMContentLoaded", () => {
    // 1. Inject Lightbox HTML if not present
    if (!document.getElementById("lightbox")) {
        const lightboxHtml = `
            <div id="lightbox" class="lightbox">
                <button class="lightbox-close" aria-label="Close">&times;</button>
                <div class="lightbox-content">
                    <img id="lightbox-img" src="" alt="Zoomed view">
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHtml);
    }

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".lightbox-close");

    // 2. Core Functions
    const openLightbox = (src) => {
        if (!src) return;
        lightboxImg.src = src;
        lightbox.classList.add("active");
        document.body.style.overflow = 'hidden'; // Lock scroll
    };

    const closeLightbox = () => {
        lightbox.classList.remove("active");
        setTimeout(() => {
            if (!lightbox.classList.contains("active")) {
                lightboxImg.src = "";
                document.body.style.overflow = ''; // Unlock scroll
            }
        }, 300); // Wait for fade out
    };

    // 3. Event Delegation for Gallery Images
    // Targeting .artwork img specifically as requested for gallery functionality.
    // If we want homepage cards to zoom, we'd need to intercept their links, but assuming user meant gallery pages.
    document.body.addEventListener("click", (e) => {
        // Find if clicked element is an image inside .artwork
        const artwork = e.target.closest(".artwork");
        if (artwork) {
            const img = artwork.querySelector("img");
            // If the user clicked the image specifically
            if (e.target.tagName === 'IMG' && img) {
                e.stopPropagation(); // Just in case
                openLightbox(img.src);
            }
        }
    });

    // 4. Close Handlers
    closeBtn.addEventListener("click", closeLightbox);

    // Close on backdrop click
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
        }
    });

    // Close on image click (toggle behavior)
    lightboxImg.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent bubbling to backdrop
        closeLightbox();
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightbox.classList.contains("active")) {
            closeLightbox();
        }
    });
});
