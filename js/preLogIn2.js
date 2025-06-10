// This code hides the preLogInPage element and then redirects the user to the logIn.html file
// using window.location.href.
// It transitions the user to a completely different HTML file for the login page.
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    // Prevent back navigation - ADDED 19 2 2025 TO ensure users can't navigate back using the browser's back and forward buttons while on the pre-login page.
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL);
    });

    // Move the event listener inside the DOMContentLoaded handler
    const acceptButton = document.getElementById('acceptButton');
    if (acceptButton) {
        acceptButton.addEventListener('click', showLoginPage);
    } else {
        console.error('acceptButton element not found');
    }

});    

// function showLoginPage() {
//     document.getElementById('preLogInPage').style.display = 'none';
//     window.location.href = 'index.html';  // Redirects to the login page
// }


function showLoginPage() {
    document.getElementById('preLogInPage').style.display = 'none';
    window.location.href = 'logIn2.html';  // Redirects to the login page
}

// document.getElementById('acceptButton').addEventListener('click', showLoginPage);



//--===============================================================================================
//This code hides the preLogInPage element and shows the loginPage element on the same HTML file.
// The pre-login content and login content need to be on the same HTML file.
/*
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
});

function showLoginPage() {
    document.getElementById('preLogInPage').style.display = 'none';
    document.getElementById('loginPage').style.display = 'block';
}

document.getElementById('acceptButton').addEventListener('click', showLoginPage);
*/
