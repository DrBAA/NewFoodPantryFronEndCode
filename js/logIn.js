// AMENDED 20/2/2025 TO STOP INVALIDATING A SESSION ON THE WEB APP AND REDIRECTING THE USER TO THE SIGN IN PAGE
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    // Check user session on page load
    if (localStorage.getItem('loggedIn') === 'true') {
        document.getElementById('search-sections').style.display = 'block';
        document.getElementById('signInSection').style.display = 'none';
        document.getElementById('securityCheck').style.display = 'none';
    } else {
        document.getElementById('search-sections').style.display = 'none';
        document.getElementById('signInSection').style.display = 'block';
    }

    // ADD EVENT LISTENERS
    document.getElementById('logIn').addEventListener('click', validateSignIn);
    document.getElementById('logOutButton').addEventListener('click', logOut);
    document.getElementById('forgotPasswordLink').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default link behavior
        document.getElementById('forgotPasswordMessage').style.display = 'block';

        // Hide the message after 5 seconds
        setTimeout(function() {
            document.getElementById('forgotPasswordMessage').style.display = 'none';
        }, 5000); // 5000 milliseconds = 5 seconds
    });
    
    // EVENT LISTENER FOR USERNAME INPUT TO SHOW PASSWORD FIELD
    function validateSignIn() {
        const usernameInput = document.getElementById('username').value;
        const passwordInput = document.getElementById('password').value;
        const passwordMessage = document.getElementById('passwordMessage');
        const passwordLabel = document.getElementById('passwordLabel');
        const passwordField = document.getElementById('password');
        
        const usernameLabel = document.querySelector("label[for='username']");
        const usernameMessage = document.querySelector("h3"); // Adjust if needed

        const user = validUsers.find(user => user.username === usernameInput);

        if (!user) {
            alert('Invalid username. Please try again.');
            return;
        }

        // Hide ALL username-related elements
        document.getElementById('username').style.display = 'none';
        if (usernameLabel) usernameLabel.style.display = 'none';
        if (usernameMessage) usernameMessage.style.display = 'none';

        // Show password message and password field
        passwordMessage.style.display = 'block';
        passwordLabel.style.display = 'inline';
        passwordField.style.display = 'inline';


        // Focus on the password input field for user convenience
        passwordField.focus();

        // Validate password if entered
        if (passwordInput) {
            if (user.password === passwordInput) {
                localStorage.setItem('loggedIn', 'true'); // Store login session
                document.getElementById('search-sections').style.display = 'block';
                document.getElementById('signInSection').style.display = 'none';
            } else {
                alert('Incorrect password. Please try again.');
            }
        }
    }
    
    // EVENT LISTENER FOR RESET BUTTON FUNCTIONALITY
    document.getElementById('resetLogin').addEventListener('click', function() {
        // Reset username field and show it again
        const usernameField = document.getElementById('username');
        usernameField.value = "";
        usernameField.style.display = "inline";

        // Reset password field and hide it
        const passwordField = document.getElementById('password');
        passwordField.value = "";
        passwordField.style.display = "none";

        // Reset labels and messages
        document.getElementById('passwordLabel').style.display = "none";
        document.getElementById('passwordMessage').style.display = "none";
        
        // Restore username label and message if they exist
        const usernameLabel = document.querySelector("label[for='username']");
        const usernameMessage = document.querySelector("h3"); // Adjust if needed
        if (usernameLabel) usernameLabel.style.display = "inline";
        if (usernameMessage) usernameMessage.style.display = "block";
    });

    // EVENT LISTENER FOR USERNAME ENTER KEY FUNCTIONALITY
    document.getElementById('username').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission (if inside a form)
            document.getElementById('logIn').click(); // Simulates clicking "Sign In"
        }
    });

    // EVENT LISTENER FOR PASSWORD ENTER KEY FUNCTIONALITY
    document.getElementById('password').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission (if inside a form)
            document.getElementById('logIn').click(); // Simulates clicking "Sign In"
        }
    });

    // EVENT LISTENER FOR CLEARING THE PASSWORD
    document.getElementById('clearPassword').addEventListener('click', function() {
        document.getElementById('password').value = ""; // Clears the password input
        document.getElementById('password').focus(); // Moves focus back to the password field
    });

});

// DUMMY DATA FOR USERNAME AND PASSWORDS
const validUsers = [
    { username: "admin1", password: "pass1" },
    { username: "admin2", password: "pass2" }
];

// FUNCTION TO VALIDATE THE SIGN-IN FORM AND STORE USER SESSION
function validateSignIn() {
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    const user = validUsers.find(user => user.username === usernameInput && user.password === passwordInput);

    if (user) {
        // Store user session in Local Storage
        localStorage.setItem('loggedIn', 'true');

        document.getElementById('search-sections').style.display = 'block';
        document.getElementById('signInSection').style.display = 'none';
        document.getElementById('securityCheck').style.display = 'none';

        // Clear the input fields
        document.getElementById('username').value = "";
        document.getElementById('password').value = "";
    } else {
        alert('Invalid username or password. Please try again.');
    }
}

// FUNCTION TO LOG OUT AND CLEAR USER SESSION
function logOut() {
    localStorage.removeItem('loggedIn');
    document.getElementById('search-sections').style.display = 'none';
    window.location.href = 'postLogIn.html';  // Redirects to the post login page
}




// document.addEventListener('DOMContentLoaded', function() {
//     console.log('DOM fully loaded and parsed');
    
//     // Prevent back navigation - ADDED 19 2 2025 to ensure users can't navigate back using the browser's back and forward buttons while on the login page - NOT WORKING
//     history.pushState(null, null, document.URL);
//     window.addEventListener('popstate', function () {
//         history.pushState(null, null, document.URL);
//     });

// });


// // DUMMY DATA FOR USERNAME AND PASWORDS
// const validUsers = [
//     { username: "admin1", password: "pass1" },
//     { username: "admin2", password: "pass2" }
// ];

// // FUNCTION TO VALIDATE THE SIGN-IN FORM

// function validateSignIn() {
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     const user = validUsers.find(user => user.username === username && user.password === password);

//     if (user) {
//         document.getElementById('search-sections').style.display = 'block';
//         document.getElementById('signInSection').style.display = 'none';

//         // Clear the input fields
//         document.getElementById('username').value = "";
//         document.getElementById('password').value = "";

//     } else {
//         alert('Invalid username or password. Please try again.');
//     }
// }

// // EVENT LISTENERS

// // Event listener for the sign-in button
// document.getElementById('logIn').addEventListener('click', validateSignIn);


// // FUNCTION TO LOG OUT OF THE APP
// function logOut() {
//     document.getElementById('search-sections').style.display = 'none';
//     document.getElementById('signInSection').style.display = 'block';
// }
// // Event listener for the log-out button
// document.getElementById('logOutButton').addEventListener('click', logOut);

