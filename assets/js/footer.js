document.addEventListener("DOMContentLoaded", () => {
    const footer = document.createElement("footer");

    // Check if we are inside the 'ua' directory or 'ua' language
    const isUA = window.location.pathname.includes("/ua/") || new URLSearchParams(window.location.search).get("lang") === "ua";
    const year = new Date().getFullYear();

    // Simple footer content
    // If we are on a sub-page (not index.html directly), we might want a back link, 
    // but looking at the design, the footer itself is just the copyright.
    // The "Back to main page" link was part of the body in the gallery pages, not the footer element itself in some files,
    // but let's check. In the original files, "Back to main page" IS inside the footer tag or just above it?
    // Checking 3d.html: <a href="index.html" class="back-link">...</a> inside <footer>.
    // So we should verify if we are on the homepage or not to show the back link.

    const isHome = window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("/");

    let backLinkHtml = "";
    if (!isHome) {
        const backText = isUA ? "← На головну" : "← Back to main page";
        const backHref = isUA ? "ua/index.html" : "index.html";

        // Correcting path if we are in a subfolder or using gallery.html at root
        // If gallery.html is at root, backHref should be simple.
        // If we are in ua/index.html, we don't need back link.

        // However, for gallery.html?id=... we definitely need it.
        // Let's rely on the pages to have their specific main content, 
        // but the request was "unified footer".
        // The footer in 3d.html contained the back link. The footer in index.html did not.

        // To make it truly unified, we can inject the back link if it's a gallery page.
        if (window.location.pathname.includes("gallery.html")) {
            // We are at root/gallery.html
            // If lang=ua, go to ua/index.html? No, ua/index.html is a physical file.
            // So back link should account for that.
            const targetIndex = isUA ? "ua/index.html" : "index.html";
            backLinkHtml = `<a href="${targetIndex}" class="back-link">${backText}</a>`;
        }
    }

    const copyrightText = isUA ? `© Сергій Кибальник` : `© Sergii Kybalnyk`;

    footer.innerHTML = `
    ${backLinkHtml}
    <p class="copyright">${copyrightText}</p>
  `;

    document.body.appendChild(footer);
});
