document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
        // Ensure the page stays on the current URL by redirecting to the current URL
        history.pushState(null, null, document.URL);
        window.location.replace(document.URL); // Ensure the page reloads to the same URL
        // Replace the state again to effectively disable the back button
        history.replaceState(null, null, document.URL);
        showSection(currentSection);

    });

});    


function showLoginPage() {
    document.getElementById('postLogInPage').style.display = 'none';
    window.location.href = 'prelogIn.html';  // Redirects to the login page
}


function closeTheApp(){
    document.getElementById('postLogInPage').style.display = 'none';
    document.getElementById('logInAgain').style.display = 'none';
    document.getElementById('closeTheApp').style.display = 'none';
}


document.getElementById('logInAgain').addEventListener('click', showLoginPage);
document.getElementById('closeTheApp').addEventListener('click', closeTheApp);