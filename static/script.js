document.addEventListener('DOMContentLoaded', () => {
    // Chart.js example for statistics
    const ctx = document.getElementById('issuesChart').getContext('2d');
    const issuesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Water Shortage', 'Green Cover'],
            datasets: [{
                label: 'Issues Reported',
                data: [12, 19], // Example data
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Issue form submission
    document.getElementById('issueForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const issueType = document.getElementById('issueType').value;
        const description = document.getElementById('description').value;
        addIssue(issueType, description);
    });

    function addIssue(type, description) {
        const issueList = document.getElementById('issue-list');
        const newIssue = document.createElement('li');
        newIssue.textContent = `${type}: ${description}`;
        issueList.appendChild(newIssue);
        document.getElementById('issueForm').reset();
    }

    // Show the report form
    window.showReportForm = function() {
        document.getElementById('report-form').classList.toggle('active');
    };

    // Report issue button functionality
    window.reportIssue = function(type) {
        document.getElementById('issue-type').value = type;
    };

    // Contact status display
    const contactStatus = document.getElementById('contact-status');
    const statusTableBody = document.getElementById('status-table-body');
    
    // Retrieve contact data from localStorage
    const submissionId = localStorage.getItem('submissionId');
    if (submissionId) {
        contactStatus.style.display = 'block';
        fetch('http://127.0.0.1:5000/contact-data')
            .then(response => response.json())
            .then(data => {
                const contact = data.find(entry => entry.id === parseInt(submissionId));
                if (contact) {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${contact.id}</td>
                        <td>${contact.received ? '✔️' : '❌'}</td>
                        <td>${contact.being_reviewed ? '✔️' : '❌'}</td>
                        <td>${contact.reviewed ? '✔️' : '❌'}</td>
                        <td>${contact.message || 'No message'}</td>
                    `;
                    statusTableBody.appendChild(row);
                }
                localStorage.removeItem('submissionId');
            })
            .catch(error => {
                console.error('Error fetching contact data:', error);
                contactStatus.style.display = 'none';
            });
    } else {
        contactStatus.style.display = 'none';
    }
    const commentForms = document.querySelectorAll('.comment-form');

    // Load existing comments from localStorage for each section
    const sections = ['issues', 'water', 'greenspace'];
    sections.forEach(section => {
        loadComments(section);
    });

    commentForms.forEach(form => {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const section = form.getAttribute('data-section');
            const name = form.querySelector(`#comment-name-${section}`).value;
            const text = form.querySelector(`#comment-text-${section}`).value;
            const commentsList = document.getElementById(`comments-list-${section}`);

            const comment = document.createElement('div');
            comment.classList.add('comment');
            comment.innerHTML = `<strong>${name}</strong><p>${text}</p>`;

            commentsList.appendChild(comment);

            // Save comment to localStorage
            saveComment(section, name, text);

            form.reset();
        });
    });

    function loadComments(section) {
        const commentsList = document.getElementById(`comments-list-${section}`);
        const comments = JSON.parse(localStorage.getItem(`comments-${section}`)) || [];
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `<strong>${comment.name}</strong><p>${comment.text}</p>`;
            commentsList.appendChild(commentElement);
        });
    }

    function saveComment(section, name, text) {
        const comments = JSON.parse(localStorage.getItem(`comments-${section}`)) || [];
        comments.push({ name, text });
        localStorage.setItem(`comments-${section}`, JSON.stringify(comments));
    }
    const totalReports = 120;
    const waterShortageAreas = 30;
    const greenCoverAreas = 25;
    const recentReports = [
        { id: 1, type: 'Water Shortage', location: 'Yaya Centre', description: 'No water for 3 days' },
        { id: 2, type: 'Green Cover', location: 'Adams Arcade', description: 'Trees being cut down' }
    ];

    // Update statistics
    document.getElementById('total-reports').textContent = totalReports;
    document.getElementById('water-shortage-areas').textContent = waterShortageAreas;
    document.getElementById('green-cover-areas').textContent = greenCoverAreas;

    // Populate recent reports
    const recentReportsList = document.getElementById('recent-reports');
    recentReports.forEach(report => {
        const listItem = document.createElement('li');
        listItem.textContent = `${report.type} at ${report.location} - ${report.description}`;
        recentReportsList.appendChild(listItem);
    });

    // Chart data
    const ctx = document.getElementById('issueChart').getContext('2d');
    const issueChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Reported Issues',
                data: [12, 19, 3, 5, 2, 3, 7],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
