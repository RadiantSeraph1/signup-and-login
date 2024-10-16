// script.js

document.addEventListener('DOMContentLoaded', () => {
    const signupDiv = document.getElementById('signupdiv');
    const loginDiv = document.getElementById('logindiv');
    const toggleSwitch = document.getElementById('toggleSwitch');

    // Initially hide the signup form
    signupDiv.classList.add('hidden');

    // Event listener for the toggle switch
    toggleSwitch.addEventListener('change', () => {
        if (toggleSwitch.checked) {
            // Show signup and hide login
            loginDiv.classList.add('hidden'); // Hide login form
            signupDiv.classList.remove('hidden'); // Show signup form
        } else {
            // Show login and hide signup
            signupDiv.classList.add('hidden'); // Hide signup form
            loginDiv.classList.remove('hidden'); // Show login form
        }
    });
});
