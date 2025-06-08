document.addEventListener('DOMContentLoaded', function() {
    // FUNCTION TO LOG OUT AND CLEAR USER SESSION
    function logOut() {
        localStorage.removeItem('loggedIn');
        window.location.href = 'postLogIn.html';  // Redirects to the post login page
    }

    // Add event listener to log out button after DOM is fully loaded
    const logOutButton = document.getElementById("logoutBtn");
    if (logOutButton) {
        logOutButton.addEventListener("click", logOut);
    }
});


// The logOut function is inside DOMContentLoaded as this ensures the script runs only after the HTML document has fully loaded. If the script executes before the DOM is ready, the log-out button might not exist yet, causing an error when trying to attach the event listener.

// By placing the function inside the event listener, it guarantees that the log-out logic is only assigned when the elements are available. This prevents issues related to trying to manipulate elements before they exist.
