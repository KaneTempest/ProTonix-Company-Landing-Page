document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    if (!form) return;

    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorMsg = field.nextElementSibling;
        if(errorMsg && errorMsg.classList.contains("error-msg")) {
            errorMsg.textContent = message;
            errorMsg.style.display = "block";
            field.classList.add("invalid");
        }
    }

    function clearError(fieldId) {
        const field = document.getElementById(fieldId);
        const errorMsg = field.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains("error-msg")) {
            errorMsg.textContent = "";
            errorMsg.style.display = "none";
            field.classList.remove("invalid");
        }
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let isValid = true;

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name) {
            showError("name", "Name is required.");
            isValid = false;
        }

        if (!email || !validateEmail(email)) {
            showError("email", "Valid email is required.");
            isValid = false;
        }

        if (message.length < 20) {
            showError("message", "Message must be at least 20 characters.");
            isValid = false;
        }

        if (isValid) {
            form.innerHTML = "<h3 class='success-msg'>Thank you! Form successfully validated and submitted.</h3>";
        }
    });

    ["name", "email", "message"].forEach(function (id) {
        const field = document.getElementById(id);
        if(field) {
            field.addEventListener("input", function () {
                clearError(id);
            });
        }
    });
});
