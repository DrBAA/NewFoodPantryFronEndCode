document.addEventListener('DOMContentLoaded', function() {
    // Your code here
    console.log('DOM fully loaded and parsed');
});

import config from './config.js';

// Add an event listener to validate the input while typing
document.getElementById('searchNameOnPostcode').addEventListener('input', function(event) {
    event.preventDefault();  // Prevent the form from refreshing the page

    const name = event.target.value;
    const nameRegex = /^[A-Za-z]*$/; // Allow empty input for continuous typing validation      

    if (!nameRegex.test(name)) {
        document.getElementById('name-and-postcode-warning').style.display = 'inline';
    } else {
        document.getElementById('name-and-postcode-warning').style.display = 'none';
    }
});

function fetchDataByNameAndPostCode() {
    console.log("fetchDataByNameAndPostCode() function is executing..."); // Debugging log
    const name = document.getElementById('searchNameOnPostcode').value; // retrieves value from the Name input field for postcode search
    const postCode = document.getElementById('searchPostcode').value; // retrieves value from the Postcode input field

    // Check if both the name and postcode fields are filled in correctly
    if (!name || !postCode) {
        alert('Please enter both the member\'s name and postcode. Ensure to enter alphabetical characters in the name section');
        return; // Exit the function if validation fails
    }

    // Validate that the name contains only alphabetical letters
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(name)) {
        alert('Please enter only alphabetical letters for the name.');
        return; // Exit the function if validation fails
    }

    // fetch(`http://localhost:8080/api/check-member-eligibility-by-name-and-post-code/${name}/${postCode}`)        
    fetch(`${config.BACKEND_URL_FOR_JAVA_API}/api/check-member-eligibility-by-name-and-post-code/${name}/${postCode}`)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the fetched data for debugging
            if (data.length > 0) {  // Check if data is not empty
                const member = data[0]; // Assuming data is an array, get the first element
                const table = 
                    `<table>
                        <thead>
                            <tr>
                                <th>Member ID</th>
                                <th>Members Name</th>
                                <th>Post Code</th>
                                <th>Type of Food</th>
                                <th>Collection Point</th>
                                <th>Date Last Issued A Food Parcel</th>
                                <th>Days Since Last Issue</th>
                                <th>Date Due For Next Issue</th>
                                <th>Issue a Food Parcel Today or Not</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${member.member_id}</td>
                                <td>${member.members_name}</td>
                                <td>${member.post_code}</td>
                                <td>${member.type_of_food}</td>
                                <td>${member.collection_point}</td>
                                <td>${member.date_last_collected_a_food_parcel}</td>
                                <td>${member.days_since_last_collection}</td>
                                <td>${member.date_due_for_next_collection}</td>
                                <td class="issue-food-parcel">
                                ${member.Issue_a_food_parcel_today_or_Not === "YES" ?
                                `<a href='../html/issueFoodParcel.html' class='issue-food-link'>YES, Issue a food parcel</a>` : 
                                member.Issue_a_food_parcel_today_or_Not
                                }</td>
                            </tr>
                        </tbody>
                    </table>`;
                document.getElementById('name-and-postcode-data-display').innerHTML = table;

                // Add event listeners for table rows after the table is added to the DOM
                document.querySelectorAll('tbody tr').forEach(row => {
                    row.addEventListener('mouseover', () => {
                        row.style.backgroundColor = '#f2f2f2';
                    });
                    row.addEventListener('mouseout', () => {
                        row.style.backgroundColor = '';
                    });
                });
            } else {
                console.log("No data found returned from the API");
                document.getElementById('name-and-postcode-data-display').innerHTML = 
                `<p style="color: darkblue;">
                    <b>
                        <span style="color: red; font-size: 24px; position: relative;">
                            <!-- &#x25BC;  Downward triangle symbol -->
                             &#x25B2; <!-- Upward triangle symbol -->
                            <span style="color: darkblue; font-size: 16px; position: absolute; top: 4px; left: 9px;">!</span>
                        </span>
                        <i>Member not found. Please Clear the data and try again</i>
                    </b>
                </p>`;
            }
        })
        .catch(error => console.error('Error fetching data:', error.message));
}

window.fetchDataByNameAndPostCode = fetchDataByNameAndPostCode; // Make it globally accessible

// FUNCTION TO CLEAR DATA FROM TABLES AND INPUT FIELDS
function clearNameAndPostCodeData() {

    document.getElementById('searchIdName').value = ""; // Clear the input field for Name
    document.getElementById('searchId').value = ""; // Clear the input field for Member ID

    // Clear the warning message
    document.getElementById('name-and-Id-warning').style.display = 'none';
  
    // Clear the entire HTML table
    document.getElementById('name-and-id-data-display').innerHTML = "";    

    document.getElementById('searchNameOnPostcode').value = ""; // Clear the input field for Name
    document.getElementById('searchPostcode').value = ""; // Clear the input field for Postcode

    // Clear the warning message
    document.getElementById('name-and-postcode-warning').style.display = 'none';

    // Clear the entire HTML table
    document.getElementById('name-and-postcode-data-display').innerHTML = "";

}

// ADD EVENT LISTENERS
// Event listeners to fetch data
document.getElementById('searchByNamePostcodeBtn').addEventListener('click', fetchDataByNameAndPostCode);

// Event listener for "Clear" in Search section
document.getElementById('clearNameAndPostcodeBtn').addEventListener('click', clearNameAndPostCodeData);
