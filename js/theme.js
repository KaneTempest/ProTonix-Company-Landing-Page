window.initializeThemeToggle = function() {
    const toggleBtn = document.getElementById("theme-toggle");
    if (!toggleBtn) return;

    function applyTheme(theme) {
        document.body.setAttribute("data-theme", theme);
        toggleBtn.textContent = theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
        localStorage.setItem("theme", theme);
    }

    function loadSavedTheme() {
        const savedTheme = localStorage.getItem("theme") || "light";
        applyTheme(savedTheme);
    }

    // Clone & replace button to prevent duplicate event listeners on re-fetch
    const newBtn = toggleBtn.cloneNode(true);
    toggleBtn.parentNode.replaceChild(newBtn, toggleBtn);

    newBtn.addEventListener("click", function() {
        const currentTheme = document.body.getAttribute("data-theme");
        applyTheme(currentTheme === "dark" ? "light" : "dark");
    });

    loadSavedTheme();
};
