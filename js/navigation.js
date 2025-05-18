document.addEventListener('DOMContentLoaded', function() {
    console.log("Navigation initialized");

    // Event listeners for navigation buttons
    document.getElementById("searchByNameIdBtn").addEventListener("click", function() {
        loadPage("../html/searchByNameAndId.html");
    });

    document.getElementById("searchByNamePostcodeBtn").addEventListener("click", function() {
        loadPage("../html/searchByNameAndPostcode.html");
    });

    document.getElementById("issueFoodParcelBtn").addEventListener("click", function() {
        loadPage("../html/issueFoodParcel.html");
    });

});

// Clear Page Button Event Listener
// document.getElementById("clearContentBtn").addEventListener("click", function () {
//     document.getElementById("contentContainer").innerHTML = ""; // Clears dynamic content
// });

document.getElementById("clearContentBtn").addEventListener("click", function() {
    document.getElementById("contentContainer").innerHTML = `
        <p style="color: gray; font-style: italic; text-align: center;">
            <br><br><br><br>Select an option from the left panel to load the relevant content here.
        </p>
    `;
});


// Function to fetch and insert new page content dynamically
function loadPage(pageUrl) {
    fetch(pageUrl)
    .then(response => response.text())
    .then(htmlContent => {
        document.getElementById("contentContainer").innerHTML = htmlContent;
        initializePageScripts(); // Ensures dynamically loaded content functions properly
    })
    .catch(error => console.error("Error loading page:", error));
}

// Function to reinitialize event listeners on dynamically loaded pages
function initializePageScripts() {
    // Ensure elements from the loaded page are accessible
    const searchByNameIdBtn = document.getElementById('searchByNameIdBtn');
    const searchByNamePostcodeBtn = document.getElementById('searchByNamePostcodeBtn');
    const issueForm = document.getElementById('issueForm');

    if (searchByNameIdBtn) {
        document.getElementById('searchByNameIdBtn').addEventListener('click', fetchDataByNameAndId);
    }

    if (searchByNamePostcodeBtn) {
        document.getElementById('searchByNamePostcodeBtn').addEventListener('click', fetchDataByNameAndPostCode);
    }

    if (issueForm) {
        issueForm.addEventListener("submit", function(event) {
            event.preventDefault();
            console.log("Food parcel issuance form submitted");
            // Your food parcel issuance logic will still work dynamically
        });
    }

    // CLEAR THE DYNAMICALLY LOADED HTML PAGE
    document.getElementById("contentContainer").innerHTML = ""; // Clears dynamic content
}
