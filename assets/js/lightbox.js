document.addEventListener("DOMContentLoaded", () => {
    // Inject Lightbox HTML with Info Section
    const lightboxHtml = `
        <div id="lightbox" class="lightbox">
            <button class="lightbox-close" aria-label="Close">&times;</button>
            <div class="lightbox-content">
                <img id="lightbox-img" src="" alt="View">
                <div class="lightbox-info" id="lightbox-info">
                    <h3 id="lb-title"></h3>
                    <p id="lb-meta" class="lb-meta"></p>
                    <p id="lb-desc" class="lb-desc"></p>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHtml);

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lbTitle = document.getElementById("lb-title");
    const lbMeta = document.getElementById("lb-meta");
    const lbDesc = document.getElementById("lb-desc");
    const closeBtn = document.querySelector(".lightbox-close");

    // Open Lightbox
    const openLightbox = (imgElement) => {
        lightboxImg.src = imgElement.src;

        // Handle Metadata
        const d = imgElement.dataset;
        const parts = [];
        if (d.material) parts.push(d.material);
        if (d.size) parts.push(d.size);
        if (d.year) parts.push(d.year);

        lbTitle.textContent = d.title || "";
        lbMeta.textContent = parts.join(" · ");
        lbDesc.textContent = d.description || "";

        // Hide info box if empty
        const infoBox = document.getElementById("lightbox-info");
        if (!d.title && parts.length === 0 && !d.description) {
            infoBox.style.display = "none";
        } else {
            infoBox.style.display = "block";
        }

        lightbox.classList.add("active");
        document.body.style.overflow = 'hidden';
    };

    // Close Lightbox
    const closeLightbox = () => {
        lightbox.classList.remove("active");
        setTimeout(() => {
            lightboxImg.src = "";
            document.body.style.overflow = '';
        }, 300);
    };

    // Event Delegation for Gallery Images
    const container = document.getElementById("gallery-grid") || document.querySelector(".gallery-grid");
    if (container) {
        container.addEventListener("click", (e) => {
            const artwork = e.target.closest(".artwork");
            if (artwork) {
                const img = artwork.querySelector("img");
                if (img) openLightbox(img);
            }
        });
    }

    // Event Listeners for Close
    closeBtn.addEventListener("click", closeLightbox);

    // Close on click outside
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightbox.classList.contains("active")) {
            closeLightbox();
        }
    });
});
