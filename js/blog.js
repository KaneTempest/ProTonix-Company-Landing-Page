document.addEventListener("DOMContentLoaded", function () {
    const blogList = document.getElementById("blog-list");
    if (!blogList) return;

    fetch("data/posts.json")
        .then(response => response.json())
        .then(posts => {
            // Sort posts from newest to oldest
            posts.sort((a, b) => new Date(b.date) - new Date(a.date));

            posts.forEach((post, index) => {
                const postElement = document.createElement("div");
                postElement.classList.add("post-card", "card");

                // Parse and format Date avoiding timezone offset issues
                const dateObj = new Date(post.date);
                const formattedDate = new Date(dateObj.getTime() + dateObj.getTimezoneOffset() * 60000)
                    .toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });

                const badge = index === 0 ? `<span class="badge">Latest Post</span>` : "";

                postElement.innerHTML = `
                    <h3 class="card-title">${post.title} ${badge}</h3>
                    <p class="post-meta card-category">${formattedDate} | ${post.category}</p>
                    <p class="card-desc">${post.summary}</p>
                    <div class="full-content" style="display:none; margin-top: 15px;">${post.content}</div>
                    <button class="cta-btn read-more" style="margin-top: 10px;">Read More</button>
                `;

                // Handle 'Read More' toggle
                const btn = postElement.querySelector(".read-more");
                const content = postElement.querySelector(".full-content");
                btn.addEventListener("click", () => {
                    if (content.style.display === "none") {
                        content.style.display = "block";
                        btn.textContent = "Read Less";
                    } else {
                        content.style.display = "none";
                        btn.textContent = "Read More";
                    }
                });

                blogList.appendChild(postElement);
            });
            
            // Re-run filter initialization so search box recognizes newly injected DOM cards
            if (typeof window.setupFilter === "function") {
                window.setupFilter();
            }
        })
        .catch(error => console.error("Error loading posts:", error));
});
