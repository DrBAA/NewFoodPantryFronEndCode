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
// Ensures issueFoodParcel.js runs every time the issue food parcel page is loaded dynamically
// Prevents form submission failures due to missing event listeners
// Allows your API request logic to function normally in the dashboard
function loadPage(pageUrl) {
    fetch(pageUrl)
    .then(response => response.text())
    .then(htmlContent => {
        document.getElementById("contentContainer").innerHTML = htmlContent;

        // Ensure issueFoodParcel.js is reloaded when issueFoodParcel.html is loaded dynamically
        if (pageUrl.includes("issueFoodParcel.html")) {
            const script = document.createElement("script");
            script.src = "../js/issueFoodParcel.js";
            script.type = "module";
            document.body.appendChild(script);
            console.log("issueFoodParcel.js reloaded dynamically");
        }

        initializePageScripts(); // Ensure other event listeners reattach
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


// Why this code worked and issued a food parcel

// 1️⃣ Dynamic Page Loading Breaks Event Listeners Since navigation.js was loading issueFoodParcel.html dynamically, the event listener inside issueFoodParcel.js wasn't being reattached when the page changed. JavaScript doesn't automatically apply scripts to newly inserted HTML, which is why the form submission stopped working.

// 2️⃣ Manual Script Injection Restores Functionality By manually reloading issueFoodParcel.js every time issueFoodParcel.html was loaded, we ensured that the event listener properly attaches to the form each time. This prevented the issue where clicking "Issue Food Parcel" would load the page but not trigger the form submission logic.

// adding the below code inside the loadPage() function ensured that issueFoodParcel.js gets reattached every time issueFoodParcel.html is loaded dynamically.
// Before the fix, the form submission event listener inside issueFoodParcel.js was only added when the full page loaded, meaning that when navigation.js replaced #contentContainer with the issue food parcel form, the listener wasn’t there. Manually reloading the script solved that problem.
//             script.src = "../js/issueFoodParcel.js";
//             script.type = "module";
//             document.body.appendChild(script);
//             console.log("issueFoodParcel.js reloaded dynamically");