window.setupFilter = function() {
    const filterInput = document.getElementById("filter-input");
    const noResults = document.getElementById("no-results");
    
    if (!filterInput) return;

    filterInput.addEventListener("input", function () {
        const query = this.value.toLowerCase().trim();
        const cards = document.querySelectorAll(".card");
        let visibleCount = 0;

        cards.forEach(function (card) {
            const title = card.querySelector(".card-title")?.textContent.toLowerCase() || "";
            const category = card.querySelector(".card-category")?.textContent.toLowerCase() || "";
            const desc = card.querySelector(".card-desc")?.textContent.toLowerCase() || "";

            if (title.includes(query) || category.includes(query) || desc.includes(query)) {
                card.style.display = "";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        if (noResults) {
            noResults.style.display = visibleCount === 0 ? "block" : "none";
        }
    });
};

document.addEventListener("DOMContentLoaded", function () {
    // Run immediately for static cards on Case Studies page
    window.setupFilter(); 
});
