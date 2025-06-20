document.getElementById('report-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch('http://127.0.0.1:5000/api/report', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Issue reported successfully!');
            this.reset();
            window.location.href = '../templates/index.html';  // Redirect to index.html
        } else {
            alert('There was an error reporting the issue. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error reporting the issue. Please try again.');
    });
});
