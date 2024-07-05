document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    //get reference of the elements 
    const usernameError=document.getElementById('usernameError');
    const passwordError=document.getElementById('passwordError');
    const responseMessage=document.getElementById('responseMessage');
    const loadingSpinner=document.getElementById('loadingSpinner');

    // Clear previous error messages
    usernameError.textContent = '';
    passwordError.textContent = '';
    responseMessage.textContent = '';

    // Get form values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Validate form fields
    let valid = true;

    if (!username) {
        usernameError.textContent = 'Username/Email is required';
        valid = false;
    } else if (!validateEmail(username)) {
        usernameError.textContent = 'Enter a valid email';
        valid = false;
    }

    if (!password) {
        passwordError.textContent = 'Password is required';
        valid = false;
    } else if (password.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters long';
        valid = false;
    }

    if (valid) {
        // Show spinner
        loadingSpinner.style.display = 'block';

        // Perform API call
        const requestBody = {
            username: username,
            password: password,
            rememberMe: rememberMe
        };

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => response.json())
        .then(data => {
            loadingSpinner.style.display = 'none'; // Hide spinner

            responseMessage.textContent = 'Login successful!';
            responseMessage.style.color = 'green';
        })
        .catch(error => {
            
            loadingSpinner.style.display = 'none'; // Hide spinner

            responseMessage.textContent = 'Login failed. Please try again.';
            responseMessage.style.color = 'red';
        });
    }
});

document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordField = document.getElementById('password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.textContent = type === 'password' ? 'Show' : 'Hide';
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
