document.addEventListener("DOMContentLoaded", () => {
    // Inject Minimal Lightbox HTML (No Text)
    const lightboxHtml = `
        <div id="lightbox" class="lightbox">
            <button class="lightbox-close" aria-label="Close">&times;</button>
            <div class="lightbox-content">
                <img id="lightbox-img" src="" alt="View">
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHtml);

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".lightbox-close");

    // Open Lightbox
    const openLightbox = (imgSource) => {
        lightboxImg.src = imgSource;
        lightbox.classList.add("active");
        document.body.style.overflow = 'hidden'; // Lock scroll
    };

    // Close Lightbox
    const closeLightbox = () => {
        lightbox.classList.remove("active");
        setTimeout(() => {
            lightboxImg.src = "";
            document.body.style.overflow = ''; // Unlock scroll
        }, 300);
    };

    // Event Delegation for Gallery Images
    const container = document.getElementById("gallery-grid") || document.querySelector(".gallery-grid");
    if (container) {
        container.addEventListener("click", (e) => {
            const artwork = e.target.closest(".artwork");
            if (artwork) {
                const img = artwork.querySelector("img");
                if (img) openLightbox(img.src);
            }
        });
    }

    // Event Listeners for Close
    closeBtn.addEventListener("click", closeLightbox);

    // Close on click OUTSIDE image (backdrop)
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
        }
    });

    // Close on click ON image (as requested for easy exit/toggle)
    lightboxImg.addEventListener("click", closeLightbox);

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightbox.classList.contains("active")) {
            closeLightbox();
        }
    });
});
