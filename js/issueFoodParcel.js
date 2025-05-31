document.getElementById("issueForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    
    document.getElementById("member_id").focus(); // Bring focus back to the first input after submission

    // Get form values
    const member_id = document.getElementById("member_id").value;
    const food_parcel_id = document.getElementById("food_parcel_id").value;
    const collection_point_id = document.getElementById("collection_point_id").value;
    const date_last_issued = document.getElementById("date_last_issued").value;
    const amount_issued = document.getElementById("amount_issued").value;

    if (!food_parcel_id) {
        alert("Please select a food parcel type.");
        return;
    }

    if (!collection_point_id) {
        alert("Please select a collection point.");
        return;
    }

    // Mapping codes to descriptions
    const foodParcelDescriptions = {
        "FP01": "Normal diet",
        "FP02": "Halal",
        "FP03": "Normal diabetic",
        "FP04": "Vegan",
        "FP05": "Vegetarian"
    };

    const collectionPointDescriptions = {
        "BCC01": "British Heart Foundation, Birmingham City Centre",
        "DUD02": "Good Samaritans, Digbeth, Birmingham",
        "ERD01": "Church of the Saviour, Erdington, Birmingham",
        "WAL01": "Good Samaritans, Plex, Walsall",
        "WAL02": "Swan Bank Church, Town Centre, Walsall"
    };

    // Get selected values
    const foodParcelCode = document.getElementById("food_parcel_id").value;
    const collectionPointCode = document.getElementById("collection_point_id").value;

    // Get descriptions based on selected codes
    const foodParcelName = foodParcelDescriptions[foodParcelCode] || "Not selected";
    const collectionPointName = collectionPointDescriptions[collectionPointCode] || "Not selected";

    // Check for constraint violation before confirming submission
    if (amount_issued > 1) {
        document.getElementById("responseMessage").innerText = "⚠️ Error: Only one food parcel can be issued. Please try again.";
        document.getElementById("responseMessage").style.color = "red"; // Highlight in red
        return; // Stop further execution if error is found
    }

    // Confirm details on the form with real descriptions before submitting it
    const confirmation = confirm(
        `Confirm Submission:\n\nMember ID: ${member_id}\n
        Food Parcel: ${foodParcelName}\n
        Collection Point: ${collectionPointName}\n
        Date Last Issued: ${date_last_issued || "Not provided"}\n
        Amount Issued: ${amount_issued || "Not provided"}`
    );

    if (!confirmation) return; // Stop submission if user cancels

    
    // Construct query parameters
    const params = new URLSearchParams({
        member_id,
        food_parcel_id,
        collection_point_id
    });

    if (date_last_issued) params.append("date_last_issued", date_last_issued);
    if (amount_issued) params.append("amount_issued", amount_issued);


    // Send the POST (create) request to the Java API using Fetch API. This calls a Stored Procedure on MYSQL database and adds the provided data to the database to issue a food parcel. If you try to issue a food parcel more than once within 7 days, you will get an error message saying "you cannot issue a food parcel more than once within 7 days"
    fetch(`http://localhost:8080/api/issue-food-parcel?${params.toString()}`, {
        method: "POST"
    })
    .then(response => response.text())
    .then(data => {
        // Check if the response contains the 7-day restriction error
        if (data.includes("you cannot issue a food parcel more than once within 7 days")) {
            document.getElementById("responseMessage").innerText = "⚠️ Error: You cannot issue a food parcel more than once within 7 days.";
            document.getElementById("responseMessage").style.color = "red"; // Highlight in red
        }    
        else {
            document.getElementById("responseMessage").innerText = data;

            // Automatically reset the dropdowns after successful submission
            document.getElementById("food_parcel_id").selectedIndex = 0;
            document.getElementById("collection_point_id").selectedIndex = 0;

            // Optionally clear other fields
            document.getElementById("member_id").value = "";
            document.getElementById("date_last_issued").value = "";
            document.getElementById("amount_issued").value = "";
        }
    })
    .catch(error => {
        document.getElementById("responseMessage").innerText = "Error: " + error.message;
    });

});


// FUNCTION TO MANUALLY CLEAR DATA FROM INPUT FIELDS
function reset() {
    // Reset input fields
    document.getElementById('member_id').value = ""; 
    document.getElementById('food_parcel_id').selectedIndex = 0; 
    document.getElementById('collection_point_id').selectedIndex = 0; 
    document.getElementById('date_last_issued').value = ""; 
    document.getElementById('amount_issued').value = ""; 

    // Get the response message element
    const responseMessage = document.getElementById("responseMessage");

    // Clear response message
    responseMessage.style.display = "none"; // Hide the element
    responseMessage.innerText = ""; // Remove message text
    responseMessage.style.color = ""; // Reset styling
    responseMessage.innerHTML = ""; // Clear any potential inner HTML content

}


// Your JavaScript code does use the Fetch API, but it is primarily handling form submission rather than dynamically loading content between pages. Let me clarify what I mean by using the Fetch API for smooth transitions across different pages.

// What Your Code Does:
// It listens for the form submission event.

// It prevents the default form submission.

// It constructs query parameters from form inputs.

// It sends a POST request to your API (http://localhost:8080/api/issue-food-parcel).

// It processes the server’s response and updates the responseMessage element accordingly.

// This means the Fetch API in your code communicates with the backend to store data in the database without requiring a full-page reload. That part is correct! 👏 However, it does not dynamically load different HTML pages within the web app.