document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/userdetails')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user details');
            }
            return response.json();
        })
        .then(user => {
            document.getElementById('username').textContent = user.username;
            document.getElementById('email').textContent = user.email;
            document.getElementById('dob').textContent = user.dateOfBirth;
            document.getElementById('location').textContent = user.location;
            if (user.profileImage) {
                document.getElementById('profile-pic').src = '/uploads/' + user.profileImage;
            }
        })
        .catch(err => {
            console.error('Error fetching user details:', err);
            // Redirect to login if user details cannot be fetched
            window.location.href = '/login.html';
        });
});
