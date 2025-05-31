document.addEventListener("DOMContentLoaded", () => {
    const contentContainer = document.getElementById("contentContainer");

    // Define all functionality pages
    const pages = {
        checkRegistrationBtn: "../html/checkRegistration.html",
        registerMemberBtn: "../html/registerMember.html",
        updateMemberDetailsBtn: "../html/updateMemberDetails.html",
        searchByNameIdBtn: "../html/checkEligibilityForFoodParcels.html",
        issueFoodParcelBtn: "../html/issueFoodParcel.html",
        searchByNamePostcodeBtn: "../html/checkEligibilityForLaptops.html",
        issueLaptopBtn: "../html/issueLaptop.html",
        checkStockLevels: "../html/checkStockLevels.html",
        addIncomingStockBtn: "../html/addIncomingStock.html",
    };

    // Attach event listeners for each button dynamically
    Object.keys(pages).forEach(buttonId => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener("click", () => {
                loadPage(pages[buttonId], buttonId);
            });
        }
    });

    // Function to dynamically load HTML content while preserving scripts and styles
    function loadPage(pageUrl, buttonId) {
        fetch(pageUrl)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");

                // Inject content into the dashboard
                contentContainer.innerHTML = doc.body.innerHTML;
                console.log(`Loaded: ${pageUrl}`);

                // Manually load scripts AFTER content injection
                loadScriptsForPage(buttonId);

                // Attach event listeners after loading new content
                setTimeout(() => {
                    attachSearchEventListeners();
                }, 500);
            })
            .catch(error => console.error(`Error loading ${pageUrl}:`, error));
    }

    // Function to ensure scripts execute after dynamic content injection
    function loadScriptsForPage(buttonId) {
        const scripts = {
            searchByNameIdBtn: ["../js/searchByNameAndId.js", "../js/searchByNameAndPostcode.js"],
            issueFoodParcelBtn: ["../js/issueFoodParcel.js"],
            searchByNamePostcodeBtn: ["../js/searchByNameAndPostcode.js"],
            issueLaptopBtn: ["../js/issueLaptop.js"],
            checkStockLevels: ["../js/checkStockLevels.js"],
            addIncomingStockBtn: ["../js/addIncomingStock.js"],
        };

        if (scripts[buttonId]) {
            scripts[buttonId].forEach(scriptSrc => {
                const script = document.createElement("script");
                script.src = scriptSrc;
                script.type = "module"; 
                document.body.appendChild(script);
                console.log(`Script executed: ${scriptSrc}`);
            });
        }
    }

    // Function to attach search event listeners directly in `navigation.js`
    function attachSearchEventListeners() {
        const searchButton = document.getElementById("searchByNameIdBtn");

        if (!searchButton) {
            console.error("Error: Search button not found.");
            return;
        }

        console.log("Event listener attached to search button.");

        searchButton.addEventListener("click", () => {
            console.log("Search button clicked—checking input fields at click time.");

            // Find inputs fresh at click-time
            const nameInput = document.querySelector("#searchIdName");
            const idInput = document.querySelector("#searchId");

            console.log("DEBUG: Checking inputs at execution...");
            console.log("Name Input Exists:", nameInput !== null);
            console.log("ID Input Exists:", idInput !== null);

            if (!nameInput || !idInput) {
                console.error("Error: Input fields missing when search button clicked.");
                return;
            }

            const name = nameInput.value.trim();
            const memberId = idInput.value.trim();

            console.log(`Captured input values dynamically: name="${name}", memberId="${memberId}"`);

            if (!name || !memberId) {
                console.error("Error: Empty input values detected.");
                return;
            }

            fetchDataByNameAndId(name, memberId);
        });
    }

    // Clear button functionality to reset contentContainer
    const clearContentBtn = document.getElementById("clearContentBtn");
    if (clearContentBtn) {
        clearContentBtn.addEventListener("click", () => {
            contentContainer.innerHTML = `<p style="color: gray; font-style: italic; text-align: center;">
                <br><br><br><br>When you select an option from the left panel, its content will appear here.
            </p>`;
            console.log("Page cleared");
        });
    }
});
