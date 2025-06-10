// AMENDED 20/2/2025 TO STOP INVALIDATING A SESSION ON THE WEB APP AND REDIRECTING THE USER TO THE SIGN IN PAGE

// DUMMY DATA FOR USERNAME AND PASSWORDS
const validUsers = [
    { username: "admin1", password: "pass1" },
    { username: "admin2", password: "pass2" }
];

document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('loggedIn') === 'true') {
        document.getElementById('signInSection').style.display = 'none';
        document.getElementById('securityCheck').style.display = 'none';
    } else {
        document.getElementById('signInSection').style.display = 'block';
    }

    document.getElementById('logIn').addEventListener('click', function() {
        const usernameInput = document.getElementById('username').value.trim();
        const user = validUsers.find(user => user.username === usernameInput);

        if (!user) {
            alert('Invalid username. Please try again.');
            return;
        }

        // Hide username section
        document.getElementById('username').style.display = 'none';
        document.getElementById('logIn').style.display = 'none';
        document.getElementById('usernameButtons').style.display = 'none';

        // Show password section correctly
        document.getElementById('passwordMessage').style.display = 'block';
        document.getElementById('password').style.display = 'inline-block';
        document.getElementById('passwordLogIn').style.display = 'block';
        document.getElementById('passwordButtons').style.display = 'flex';
    });

    document.getElementById('passwordLogIn').addEventListener('click', function() {
        const usernameInput = document.getElementById('username').value;
        const passwordInput = document.getElementById('password').value;
        const user = validUsers.find(user => user.username === usernameInput);

        // Validate password if entered
        if (passwordInput) {
            if (user && user.password === passwordInput) {
                localStorage.setItem('loggedIn', 'true'); // Store login session
                showHomePage();
                document.getElementById('signInSection').style.display = 'none';
            } else {
                alert('Incorrect password. Please try again.');
            }
        }
    });

    document.getElementById('resetPassword').addEventListener('click', function() {
        document.getElementById('password').value = "";
    });

    document.getElementById('cancelPassword').addEventListener('click', function() {
        document.getElementById('password').value = "";
        document.getElementById('passwordMessage').style.display = 'none';
        document.getElementById('password').style.display = 'none';
        document.getElementById('passwordLogIn').style.display = 'none';
        document.getElementById('passwordButtons').style.display = 'none';

        document.getElementById('username').style.display = 'inline-block';
        document.getElementById('logIn').style.display = 'block';
        document.getElementById('usernameButtons').style.display = 'flex';
    });

    document.getElementById('forgotPasswordLink').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('forgotPasswordMessage').style.display = 'block';

        setTimeout(function() {
            document.getElementById('forgotPasswordMessage').style.display = 'none';
        }, 5000);
    });

    document.getElementById('username').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById('logIn').click();
        }
    });

    document.getElementById('password').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById('passwordLogIn').click();
        }
    });
});


// FUNCTION TO REDIRECT TO THE HOME PAGE
function showHomePage() {
    window.location.href = 'dashboard2.html';
}

// FUNCTION TO LOG OUT AND CLEAR USER SESSION
function cancelButton() {
    window.location.href = 'postLogIn.html'; // Redirects to the post login page
}
