document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = new FormData(contactForm);

        fetch("http://127.0.0.1:5000/submit-contact", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.message.includes('Your submission ID is')) {
                // Store the submission ID in localStorage
                localStorage.setItem('submissionId', data.submissionId);

                // Redirect to the index page
                window.location.href = 'index.html';
            } else {
                // Display error message
                alert(data.message);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Failed to submit contact form.");
        });
    });
});
