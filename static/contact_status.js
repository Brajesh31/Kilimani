document.addEventListener('DOMContentLoaded', () => {
document.addEventListener('DOMContentLoaded', () => {
    const contactStatusSection = document.getElementById('contact-status');
    const statusTableBody = document.getElementById('status-table-body');
    const submissionId = localStorage.getItem('submissionId');

    if (submissionId) {
        // Show the contact status section
        contactStatusSection.style.display = 'block';

        // Fetch contact data
        fetch('http://127.0.0.1:5000/contact-data')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Debugging
                console.log('Fetched data:', data);

                // Find the submission by ID
                const contact = data.find(entry => entry.id === parseInt(submissionId));

                if (contact) {
                    // Create a row for the submission status
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${contact.id}</td>
                        <td>${contact.received ? '✔️' : '❌'}</td>
                        <td>${contact.being_reviewed ? '✔️' : '❌'}</td>
                        <td>${contact.reviewed ? '✔️' : '❌'}</td>
                        <td>${contact.message}</td> <!-- Display the message -->
                    `;
                    statusTableBody.appendChild(row);
                } else {
                    // If no contact found, hide the section
                    contactStatusSection.style.display = 'none';
                }
            })
            .catch(error => {
                console.error('Error fetching contact data:', error);
                // Hide the section if there's an error
                contactStatusSection.style.display = 'none';
            });

        // Remove the submission ID from localStorage
        localStorage.removeItem('submissionId');
    } else {
        // Hide the section if there's no submission ID
        contactStatusSection.style.display = 'none';
    }
});
