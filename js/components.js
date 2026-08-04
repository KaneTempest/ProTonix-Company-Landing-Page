function loadComponent(selector, filePath, callback) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error("Could not load " + filePath);
            return response.text();
        })
        .then(html => {
            const element = document.querySelector(selector);
            if(element) {
                element.innerHTML = html;
                if (callback) callback();
            }
        })
        .catch(error => console.error(error));
}

document.addEventListener("DOMContentLoaded", function () {
    // Inject header, then setup theme toggle
    loadComponent("#header-placeholder", "components/header.html", () => {
        if (typeof window.initializeThemeToggle === "function") {
            window.initializeThemeToggle();
        }
    });
    
    // Inject footer
    loadComponent("#footer-placeholder", "components/footer.html");
});
