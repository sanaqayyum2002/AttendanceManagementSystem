document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Retrieve username and password values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Redirect to the admin panel regardless of input
    window.location.href = 'admin_panel.html';
});
