document.addEventListener('DOMContentLoaded', function() {
    // Your code here
    console.log('DOM fully loaded and parsed');
});

import config from './config.js';

// Add an event listener to validate the input while typing
document.getElementById('searchIdName').addEventListener('input', function(event) {
  event.preventDefault();  // Prevent the form from refreshing the page

  const name = event.target.value;
  const nameRegex = /^[A-Za-z]*$/; // Allow empty input for continuous typing validation      

  if (!nameRegex.test(name)) {
      document.getElementById('name-and-Id-warning').style.display = 'inline';
  } else {
      document.getElementById('name-and-Id-warning').style.display = 'none';
  }
});

function fetchDataByNameAndId() {
    console.log("fetchDataByNameAndId() function is executing..."); // Debugging log

  const name = document.getElementById('searchIdName')?.value; // retrieves value from the Name input field
  const memberId = document.getElementById('searchId')?.value; // retrieves value from the ID input field

  console.log(`Dynamic values: name=${name}, memberId=${memberId}`);

  // Check if both the name and ID fields are filled in correctly
  if (!name || !memberId) {
      alert('Please enter both the member\'s name and ID. Ensure to enter alphabetical characters in the name section');
      return; // Exit the function if validation fails
  }

  // Validate that the name contains only alphabetical letters
  const nameRegex = /^[A-Za-z]+$/;
  if (!nameRegex.test(name)) {
      alert('Please enter only alphabetical letters for the name.');
      return; // Exit the function if validation fails
  }

//   fetch(`http://localhost:8080/api/${name}/${memberId}`)
  fetch(`${config.BACKEND_URL_FOR_JAVA_API}/api/${name}/${memberId}`)
      .then(response => {
        console.log(`API Request Sent: ${config.BACKEND_URL_FOR_JAVA_API}/api/${name}/${memberId}`); // Log the URL        
        return response.json()
      })
      .then(data => {
          console.log("API response received:", data); // Log the API response
          console.log(data); // Log the fetched data for debugging
          if (data.length > 0) {  // Check if data is not empty
              const member = data[0]; // Assuming data is an array, get the first element
              const table = `
                  <table>
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
                                `<a href='../html/issueFoodParcel.html' class='issue-food-link'>YES</a>` : 
                                member.Issue_a_food_parcel_today_or_Not}
                              </td>
                          </tr>
                      </tbody>
                  </table>`;

              document.getElementById('name-and-id-data-display').innerHTML = table;          

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
              document.getElementById('name-and-id-data-display').innerHTML = `
              <p style="color: darkblue;">
                  <b>
                      <span style="color: red; font-size: 24px; position: relative;">
                          <!--&#x25BC;  Downward triangle symbol -->
                          &#x25B2; <!-- Upward triangle symbol -->
                          <span style="color: darkblue; font-size: 16px; position: absolute; top: 4px; left: 9px;">!</span>
                      </span>
                      <i>Member not found. Please Clear the data and try again</i>
                  </b>
              </p>`;
          }
      })
      .catch(error => console.error('Error fetching data:', error.message));
      console.log("fetchDataByNameAndId function executed");
}

window.fetchDataByNameAndId = fetchDataByNameAndId; // Make it globally accessible


// FUNCTION TO CLEAR DATA FROM TABLES AND INPUT FIELDS
function clearNameAndIdData() {

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
document.getElementById('searchByNameIdBtn').addEventListener('click', fetchDataByNameAndId);

// Event listener for "Clear" in Search section
document.getElementById('clearNameAndIdBtn').addEventListener('click', clearNameAndIdData);


   
// BELOW CODE NOT WORKING
      
    //   // Add an event listener to validate the input while typing
    //   document.getElementById('searchName').addEventListener('input', function(event) {
    //     event.preventDefault();  // Prevent the form from refreshing the page
  
    //     const name = event.target.value;
    //     const nameRegex = /^[A-Za-z]*$/; // Allow empty input for continuous typing validation      
  
    //     if (!nameRegex.test(name)) {
    //       document.getElementById('name-warning').style.display = 'inline';
    //     } else {
    //       document.getElementById('name-warning').style.display = 'none';
    //     }
    //   });
  
    //   function fetchData() {
    //     // document.getElementById('searchId') is a method that selects the HTML element with the specified id.
    //     // .value is a property that accesses the current value (user input) of that selected element.
    //     // The HTML elements are the input fields where the user enters the name and member ID.
    //     const name = document.getElementById('searchName').value; // selects the input html element with the id of "searchName" and retrieves whatever value the user has entered into that input field
    //     const memberId = document.getElementById('searchId').value; // selects the input html element with the id of "searchId" and retrieves whatever value the user has entered into that input field
    //           // This approach allows your code to dynamically access user input and use it in further operations, such as making an API call.
  
    //     // console.log('Fetching data for:', memberName, memberId); // Log inputs
             
    //     // Check if both the name and ID fields are filled in correctly
    //     if (!name || !memberId) {
    //       alert('Please enter both the member\'s name and ID. Ensure to enter alphabetical characters in the name section');
    //       return; // Exit the function if validation fails
    //     }
  
  
    //     // Validate that the name contains only alphabetical letters
    //     const nameRegex = /^[A-Za-z]+$/;
    //     if (!nameRegex.test(name)) {
    //       alert('Please enter only alphabetical letters for the name.');
    //       return; // Exit the function if validation fails
    //     }
  
    
    //     // fetch(`http://localhost:8080/api/api/check-member-eligibility-by-name-and-Id?members_name=${name}&member_id=${memberId}`)
    //     fetch(`http://localhost:8080/api/check-member-eligibility-by-name-and-Id${name}/${memberId}`)
    //       .then(response => response.json())
    //       .then(data => {
    //         console.log(data); // Log the fetched data for debugging
    //         if (data.length > 0) {  // Check if data is not empty
    //           const member = data[0]; // Assuming data is an array, get the first element
    //           const table = `
    //             <table>
    //               <thead>
    //                 <tr>
    //                   <th>Member ID</th>
    //                   <th>Members Name</th>
    //                   <th>Post Code</th>
    //                   <th>Type of Food</th>
    //                   <th>Collection Point</th>
    //                   <th>Date Last Issued A Food Parcel</th>
    //                   <th>Days Since Last Issue</th>
    //                   <th>Date Due For Next Issue</th>
    //                   <th>Issue a Food Parcel Today or Not</th>
    //                 </tr>
    //               </thead>
    //               <tbody>
    //                 <tr>
    //                   <td>${member.member_id}</td>
    //                   <td>${member.members_name}</td>
    //                   <td>${member.post_code}</td>
    //                   <td>${member.type_of_food}</td>
    //                   <td>${member.collection_point}</td>
    //                   <td>${member.date_last_collected_a_food_parcel}</td>
    //                   <td>${member.days_since_last_collection}</td>
    //                   <td>${member.date_due_for_next_collection}</td>
    //                   <td>${member.Issue_a_food_parcel_today_or_Not}</td>
    //                 </tr>
    //               </tbody>
    //             </table>`;
    //           document.getElementById('data-display').innerHTML = table;
  
    //           // Add event listeners for table rows after the table is added to the DOM
    //           document.querySelectorAll('tbody tr').forEach(row => {
    //             row.addEventListener('mouseover', () => {
    //               row.style.backgroundColor = '#f2f2f2';
    //             });
    //             row.addEventListener('mouseout', () => {
    //               row.style.backgroundColor = '';
    //             });
    //           });
    //         } else {
    //           console.log("No data found returned from the API");
    //           document.getElementById('data-display').innerHTML = `
    //           <p style="color: darkblue;">
    //             <b><i>
    //               <span style="color: red; font-size: 24px; position: relative;">
    //                 &#x25BC; <!-- Downward triangle symbol -->
    //                 <!-- &#x25B2; Upward triangle symbol -->
    //                 <span style="color: darkblue; font-size: 16px; position: absolute; top: 4px; left: 9px;">!</span>
    //               </span>
    //               Member not found. Please Clear the data and try again
    //             </i></b>
    //           </p>`;
    //         }
    //       })
    //       .catch(error => console.error('Error fetching data:', error.message));
    //   }
  
    // function clearData() {
    //   const tableBody = document.querySelector('#data-display table tbody');
    //   if (tableBody) {
    //     tableBody.innerHTML = ''; // Clear only the table body rows
    //   }
    //   document.getElementById('searchName').value = ''; // Clear the input field for Name
    //   document.getElementById('searchId').value = ''; // Clear the input field for Member ID
  
    //   // Clear the warning message
    //   document.getElementById('name-warning').style.display = 'none';
  
    //   // Optionally, clear the message for no data found
    //   if (!tableBody) {
    //     document.getElementById('data-display').innerHTML = ''; // Clear the entire content only if there's no table structure
    //   }
    // };

    // // Add event listeners for buttons
    // document.getElementById('searchByNameIdBtn').addEventListener('click', fetchData);
    // document.getElementById('clearDataBtn1').addEventListener('click', clearData);




// document.getElementById('eligibilityForm').addEventListener('submit', async function(event) {
//     event.preventDefault();  // Prevent the form from refreshing the page
    
//     const memberName = document.getElementById('memberName').value;
//     const memberId = document.getElementById('memberId').value;
    
//     console.log('Fetching data for:', memberName, memberId); // Log inputs

//     try {
//         const response = await fetch(`http://localhost:8080/api/check-member-eligibility/${memberName}/${memberId}`);
        
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
//         }

//         const data = await response.json();
        
//         console.log('Response Data:', data); // Log the response data to verify it

//         const tableBody = document.getElementById('resultTable').querySelector('tbody');
//         tableBody.innerHTML = ''; // Clear any existing rows

//         if (Array.isArray(data) && data.length > 0) {
//             data.forEach(item => {
//                 const row = document.createElement('tr');
                
//                 row.innerHTML = `
//                     <td>${item.member_id}</td>
//                     <td>${item.members_name}</td>
//                     <td>${item.post_code}</td>
//                     <td>${item.type_of_food}</td>
//                     <td>${item.collection_point_location}</td>
//                     <td>${item.date_last_issued}</td>
//                     <td>${item.days_since_last_issue}</td>
//                     <td>${item.next_issue_due_date}</td>
//                     <td>${item.Issue_a_food_parcel_or_Not}</td>
//                 `;
//                 tableBody.appendChild(row);
//             });
//         } else {
//             console.warn('No data returned from the API'); // Log if no data is returned
//         }
//     } catch (error) {
//         console.error('Error fetching data:', error.message); // Improved error logging
//     }
// });

