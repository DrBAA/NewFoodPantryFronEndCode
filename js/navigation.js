document.addEventListener('DOMContentLoaded', function() {
    console.log("Navigation initialized");

    // Event listeners for navigation buttons
    document.getElementById("searchByNameIdBtn").addEventListener("click", function() {
        loadPage("../html/checkEligibilityForFoodParcels.html");
    });

    document.getElementById("searchByNamePostcodeBtn").addEventListener("click", function() {
        loadPage("../html/checkEligibilityForFoodParcels.html");
    });

    document.getElementById("issueFoodParcelBtn").addEventListener("click", function() {
        loadPage("../html/issueFoodParcel.html");
    });

});

document.getElementById("clearContentBtn").addEventListener("click", function() {
    document.getElementById("contentContainer").innerHTML = `
        <p style="color: gray; font-style: italic; text-align: center;">
            <br><br><br><br>Select an option from the left panel to load the relevant content here.
        </p>
    `;
});


// Function to fetch and insert new page content dynamically
// Ensures relevant js file runs every time its corresponding html file is loaded dynamically
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

        // Ensure relevant search files are reloaded when checkEligibilityForFoodParcels.html is loaded dynamically
        if (pageUrl.includes("checkEligibilityForFoodParcels.html")) {
            const script1 = document.createElement("script");
            script1.src = "../js/searchByNameAndId.js";
            script1.type = "module";
            document.body.appendChild(script1);
            console.log("searchByNameAndId.js reloaded dynamically");
            script1.onload = () => {
                console.log("searchByNameAndId.js has finished loading");
                fetchDataByNameAndId(); // Manually trigger execution
            };

            const script2 = document.createElement("script");
            script2.src = "../js/searchByNameAndPostCode.js";
            script2.type = "module";
            document.body.appendChild(script2);
            console.log("searchByNameAndPostCode.js reloaded dynamically");
            script2.onload = () => {
                console.log("searchByNameAndPostCode.js has finished loading");
                fetchDataByNameAndPostCode(); // Manually trigger execution
            };            
        }
    
        // Delay slightly to ensure elements exist
        setTimeout(() => {
            initializePageScripts();
        }, 500);
        // initializePageScripts(); // Ensure other event listeners reattach
    })
    .catch(error => console.error("Error loading page:", error));
}

// Function to reinitialize event listeners on dynamically loaded pages
function initializePageScripts() {
    const issueForm = document.getElementById('issueForm');
    const searchByNameIdBtn = document.getElementById('searchByNameIdBtn');
    const searchByNamePostcodeBtn = document.getElementById('searchByNamePostcodeBtn');
    const clearNameAndIdBtn = document.getElementById('clearNameAndIdBtn');
    const clearNameAndPostcodeBtn = document.getElementById('clearNameAndPostcodeBtn');

    if (issueForm) {
        issueForm.addEventListener("submit", function(event) {
            event.preventDefault(); // prevents the default behaviour of a submit button from submitting and refreshing the page
            console.log("Food parcel issuance form submitted");
            // Your food parcel issuance logic will still work dynamically
        });
    }

    // Use MutationObserver to detect when input fields are added dynamically
    const observer = new MutationObserver((mutations) => {
        const nameInput = document.getElementById('searchIdName');
        const idInput = document.getElementById('searchId');

        if (nameInput && idInput) {
            console.log("Input fields for Name and Id detected—attaching event listeners");
            observer.disconnect(); // Stop observing once elements exist

            if (searchByNameIdBtn) {
                searchByNameIdBtn.addEventListener("click", () => {
                    console.log("Search button clicked");

                    // Log values BEFORE fetching to confirm they're properly set
                    console.log(`Before capturing values, current input field values: searchIdName=${nameInput.value}, searchId=${idInput.value}`);

                    const name = nameInput.value.trim();
                    const memberId = idInput.value.trim();

                    console.log(`Captured input values dynamically: name=${name}, memberId=${memberId}`);

                    if (!name || !memberId) {
                        console.error("Error: Empty input values detected.");
                        return;
                    }

                    fetchDataByNameAndId(); // Call the function only when inputs are verified
                });
            }
        }
    });

    // Start observing the DOM for dynamically added input fields
    observer.observe(document.body, { childList: true, subtree: true });

    if (searchByNamePostcodeBtn) {
        searchByNamePostcodeBtn.addEventListener('click', () => {
            console.log("Search button for Name and PostCode clicked");

            // Delay execution slightly to ensure elements exist
            setTimeout(() => {
                const nameInput = document.getElementById('searchNameOnPostcode');
                const idInput = document.getElementById('searchPostCode');

                if (!nameInput || !idInput) {
                    console.error("Error: Input fields for Name and Postcode not found in DOM.");
                    return;
                }

                fetchDataByNameAndPostCode(); // Run search function safely
            }, 500); // Adjust delay if needed
        });
    }

    if (clearNameAndIdBtn) {
        clearNameAndIdBtn.addEventListener('click', function() {
            console.log("Clear button for Name and Id clicked");
            document.getElementById('searchIdName').value = '';
            document.getElementById('searchId').value = '';
            document.getElementById('name-and-id-data-display').innerHTML = '';
        });
    }

    if (clearNameAndPostcodeBtn) {
        clearNameAndPostcodeBtn.addEventListener('click', function() {
            console.log("Clear button for Name and PostCode clicked");
            document.getElementById('searchNameOnPostcode').value = '';
            document.getElementById('searchPostcode').value = '';
            document.getElementById('name-and-postcode-data-display').innerHTML = '';
        });
    }

    console.log("Search event listeners reattached dynamically.");
    
}
    // CLEAR THE DYNAMICALLY LOADED HTML PAGE
    // document.getElementById("contentContainer").innerHTML = ""; // Clears dynamic content 

    // Why this code worked and issued a food parcel

// 1️⃣ Dynamic Page Loading Breaks Event Listeners Since navigation.js was loading issueFoodParcel.html dynamically, the event listener inside issueFoodParcel.js wasn't being reattached when the page changed. JavaScript doesn't automatically apply scripts to newly inserted HTML, which is why the form submission stopped working.

// 2️⃣ Manual Script Injection Restores Functionality By manually reloading issueFoodParcel.js every time issueFoodParcel.html was loaded, we ensured that the event listener properly attaches to the form each time. This prevented the issue where clicking "Issue Food Parcel" would load the page but not trigger the form submission logic.

// adding the below code inside the loadPage() function ensured that issueFoodParcel.js gets reattached every time issueFoodParcel.html is loaded dynamically.
// Before the fix, the form submission event listener inside issueFoodParcel.js was only added when the full page loaded, meaning that when navigation.js replaced #contentContainer with the issue food parcel form, the listener wasn’t there. Manually reloading the script solved that problem.
//             script.src = "../js/issueFoodParcel.js";
//             script.type = "module";
//             document.body.appendChild(script);
//             console.log("issueFoodParcel.js reloaded dynamically");

// OLD CODE




// WORKING CODE
// // Function to reinitialize event listeners on dynamically loaded pages
// function initializePageScripts() {
//     // Ensure elements from the loaded page are accessible
//     const searchByNameIdBtn = document.getElementById('searchByNameIdBtn');

//     const searchByNamePostcodeBtn = document.getElementById('searchByNamePostcodeBtn');

//     const issueForm = document.getElementById('issueForm');

//     if (searchByNameIdBtn) {
//         document.getElementById('searchByNameIdBtn').addEventListener('click', fetchDataByNameAndId);
//     }

//     if (searchByNamePostcodeBtn) {
//         document.getElementById('searchByNamePostcodeBtn').addEventListener('click', fetchDataByNameAndPostCode);
//     }

//     if (issueForm) {
//         issueForm.addEventListener("submit", function(event) {
//             event.preventDefault();
//             console.log("Food parcel issuance form submitted");
//             // Your food parcel issuance logic will still work dynamically
//         });
//     }

//     // CLEAR THE DYNAMICALLY LOADED HTML PAGE
//     document.getElementById("contentContainer").innerHTML = ""; // Clears dynamic content
// }

// STILL NOT WORKIGN CODE

// function loadPage(pageUrl) {
//     fetch(pageUrl)
//     .then(response => response.text())
//     .then(htmlContent => {
//         document.getElementById("contentContainer").innerHTML = htmlContent;

//         // Ensure issueFoodParcel.js is reloaded when issueFoodParcel.html is loaded dynamically
//         if (pageUrl.includes("issueFoodParcel.html")) {
//             const script = document.createElement("script");
//             script.src = "../js/issueFoodParcel.js";
//             script.type = "module";
//             document.body.appendChild(script);
//             console.log("issueFoodParcel.js reloaded dynamically");
//         }

//         // Ensure relevant search files are reloaded when checkEligibilityForFoodParcels.html is loaded dynamically
//         if (pageUrl.includes("checkEligibilityForFoodParcels.html")) {
//             const script1 = document.createElement("script");
//             script1.src = "../js/searchByNameAndId.js";
//             script1.type = "module";
//             script1.onload = function () { // Ensure script loads before initialization
//                 console.log("searchByNameAndId.js fully loaded");
//             };
//             document.body.appendChild(script1);
            
//             const script2 = document.createElement("script");
//             script2.src = "../js/searchByNameAndPostCode.js";
//             script2.type = "module";
//             script2.onload = function () { 
//                 console.log("searchByNameAndPostCode.js fully loaded");
//                 initializePageScripts(); // Run initialization ONLY after scripts have loaded
//             };
//             document.body.appendChild(script2);
//         } else {
//             initializePageScripts(); // Run normally for other pages
//         }
//     })
//     .catch(error => console.error("Error loading page:", error));
// }