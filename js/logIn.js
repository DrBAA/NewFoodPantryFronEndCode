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

