const uuids = ["cb860439-54a7-4ba0-abbd-d21179d00bfa", "97800bfa-7f1c-42e1-9162-ea1c2bc7078b", "d41f0f3c-aebe-45e1-bc6a-380fedf54ca9"]; // Replace with actual UUIDs

// Use an object for caching for faster lookups by UUID
const cache = {}; // Changed to object: { uuid: userData, ... }
let dataRanked = null;
let isFetchingRanked = false; // Flag to prevent multiple simultaneous fetches
let initialFetchComplete = false; // Flag to know if initial data is ready

const titleRow = ["MCSR Ranked Any%"];
const HeaderRow = ["#º", "RUNNER", "TEMPO"];
const rankedRunsClasses = ['d-flex', 'justify-content-between', 'runner']; // Assuming this was defined elsewhere

// --- Fetching Logic ---

async function fetchRanked(variableName) {
    // Prevent concurrent fetches if already running
    if (isFetchingRanked) {
        console.log("Fetch already in progress.");
        return;
    }
    isFetchingRanked = true;
    console.log("Trying to fetch ranked sheet data...");
    const apiKey = 'AIzaSyAgRJh3hMNn84hWJYnwoXhq3Pw_Ew1yyrw'; // Be careful exposing API keys directly in client-side code
    const spreadsheetId = '1zTaSiWIDf2VQjf4yW6mdYkOXx1g7Mrs1s3b8vWVMeAw';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${variableName}?alt=json&key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        dataRanked = await response.json();
        console.log("Ranked sheet data fetched: ", dataRanked.values);

        // Wait for all user data fetches to complete
        await fetchRankedUserData(dataRanked.values);

        console.log("All user data fetched and cached.");
        initialFetchComplete = true; // Mark initial fetch as complete
        isFetchingRanked = false; // Reset fetching flag

        // Perform initial rendering *after* all data is fetched
        

    } catch (error) {
        console.error('Error fetching data:', error);
        const tbody = document.querySelector('#data-table tbody'); // Assuming #data-table exists elsewhere
        if (tbody) { // Check if tbody exists before manipulating
             tbody.innerHTML = `<tr><td colspan="5">Error loading data: ${error.message}</td></tr>`;
        } else {
            // Fallback or alternative error display if #data-table tbody isn't the target
            const divContainer = document.getElementById('tbl-data');
             if (divContainer) {
                clearContainer(divContainer);
                divContainer.textContent = `Error loading data: ${error.message}`;
             }
        }
        isFetchingRanked = false; // Reset fetching flag on error
    }
}

async function fetchRankedUserData(data) {
    console.log("Fetching individual user data from sheet rows:", data);
    const fetchPromises = []; // Store all fetch promises

    if (!Array.isArray(data)) {
        console.error("Sheet data is not an array:", data);
        return; // Exit if data format is unexpected
    }


    for (const row of data) {
        // Skip header row or invalid rows early
        if (!Array.isArray(row) || row.length < 2 || row[0] === "RUNNER" || row[0] === "#º") { // Added check for header
             console.warn("Skipping invalid or header row:", row);
            continue;
        }

        // Adjust destructuring based on your actual sheet columns
        // Assuming Name is column 0, UUID is column 1, State might be column 2
        const name = row[0];
        const uuid = row[1];
        const state = row[2] || null; // Handle if state column doesn't exist

        // Basic UUID validation (optional but good practice)
        if (typeof uuid !== 'string' || uuid.length < 30) { // Basic check
            console.error("Invalid UUID format in row:", row);
            continue;
        }


        if (!cache[uuid]) { // Check cache using UUID as key
            console.log(`Workspaceing data for UUID: ${uuid} (Name: ${name})`);
            const userFetchPromise = fetch(`https://mcsrranked.com/api/users/${uuid}`)
                .then(response => {
                    if (!response.ok) {
                        // Throw an error specific to this user fetch
                        throw new Error(`Failed to fetch data for UUID: ${uuid}, Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(userData => {
                    // Add fetched data to cache with extra fields
                    cache[uuid] = { ...userData, name: name, state: state };
                    console.log(`Cached data for UUID: ${uuid}`);
                })
                .catch(error => {
                    // Log specific user fetch errors but don't stop other fetches
                    console.error(error);
                    // Optionally cache an error state or null for this UUID
                    cache[uuid] = { error: true, name: name, state: state, message: error.message };
                });

            fetchPromises.push(userFetchPromise); // Add promise to the list
        } else {
             console.log(`UUID: ${uuid} found in cache. Skipping fetch.`);
             // Ensure existing cache entry has name/state if spreadsheet updated
             if (!cache[uuid].name || !cache[uuid].state) {
                cache[uuid].name = name;
                cache[uuid].state = state;
             }
        }
    }

    // Wait for all the fetch promises initiated in the loop to settle (resolve or reject)
    await Promise.allSettled(fetchPromises); // Use allSettled to wait for all, even if some fail

    console.log("fetchRankedUserData finished processing all rows.");
    // No need to return cache, it's modified directly
}

// --- UI Interaction Logic ---

function handleRankedButtonClick(buttonId, cat, visibility) {
    hideVerDiv();
    unselectButtons(buttonId); // Assuming these functions exist
    setCatButton(buttonId);    // Assuming these functions exist
    document.getElementById(buttonId).style.backgroundColor = "#666494";
    console.log(`Button ${buttonId} clicked. Category: ${cat}`);

    // selectedCat = cat; // Assuming selectedCat is defined elsewhere

    // Instead of complex state checks here, just re-render.
    // createRankedElements will use the latest cache.
    if (initialFetchComplete) {
        createRankedElements(); // Re-render the table with current cache data
    } else {
        console.log("Initial data fetch not yet complete. Rendering will happen once data is ready.");
        // Optionally display a loading indicator here
        const divContainer = document.getElementById('tbl-data');
        if (divContainer) {
            clearContainer(divContainer);
            divContainer.textContent = "Loading ranked data...";
        }
    }


    // Handle visibility for 'divVer' based on category if needed
    const divVer = document.getElementById('divVer'); // Assuming divVer exists
    if (divVer) {
        if (cat === "1.16ssg") { // Example category check
            divVer.style.visibility = "hidden";
        } else {
            divVer.style.visibility = visibility || "visible"; // Use passed visibility or default
        }
    }
}

// --- Rendering Logic ---

function createRankedElements() {
    const divContainer = document.getElementById('tbl-data');
    if (!divContainer) {
        console.error("Container 'tbl-data' not found.");
        return;
    }
    clearContainer(divContainer); // Clear container before creating elements

    createRankedHeader(divContainer, titleRow); // Create Title Row
    createRankedHeader(divContainer, HeaderRow); // Create Header Row


    // Get data from the cache object, convert to array, and filter out errors/missing data
    let cachedDataArray = Object.values(cache).filter(entry =>
        entry && !entry.error && entry.data?.statistics?.total?.bestTime?.ranked !== undefined && entry.data?.statistics?.total?.bestTime?.ranked !== null
    );


    // Sort cache by bestTime.ranked (lowest first)
    let sortedCache = cachedDataArray.sort((a, b) => {
        // Use nullish coalescing for safety, treat missing times as Infinity (sort last)
        let timeA = a.data.statistics.total.bestTime.ranked ?? Infinity;
        let timeB = b.data.statistics.total.bestTime.ranked ?? Infinity;
        return timeA - timeB; // Ascending order
    });

    console.log("Sorted data for rendering:", sortedCache);


    if (sortedCache.length === 0 && initialFetchComplete) {
         const noDataMsg = document.createElement('div');
         noDataMsg.textContent = "No ranked data available or failed to load.";
         noDataMsg.style.padding = '10px';
         noDataMsg.style.textAlign = 'center';
         divContainer.appendChild(noDataMsg);
         return;
    }


    sortedCache.forEach((rowData, index) => {
        // You might have specific filtering logic here based on 'selectedCat' or 'selectedState'
        // if (selectedState != "none" && rowData.state !== selectedState) return;

        createRankedCells(index + 1, divContainer, rowData); // Create row elements
    });
}


function createRankedCells(i, container, values) {
    let div = document.createElement('div');
    div.classList.add(...rankedRunsClasses); // Use defined classes

    let pIndex = document.createElement('p');
    pIndex.textContent = `#${i}`; // Display the rank

    let p1 = document.createElement('p');
    // Use the name stored in the cache entry
    p1.textContent = values.name || 'Unknown Runner'; // Fallback name

    let p2 = document.createElement('p');
    let timeMs = values.data.statistics.total.bestTime.ranked;

    // Check if timeMs is a valid number before calculations
    if (typeof timeMs === 'number' && isFinite(timeMs)) {
         let totalSeconds = timeMs / 1000; // Convert ms to seconds
         let minutes = Math.floor(totalSeconds / 60);
         let seconds = Math.floor(totalSeconds % 60);
         let milliseconds = Math.round((totalSeconds - Math.floor(totalSeconds)) * 1000); // Get ms part

        // Format: MM:SS.mmm (adjust format as needed)
        p2.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
    } else {
         p2.textContent = "N/A"; // Display for invalid or missing time
    }


    // You had an icon element, re-add if needed
    // let iconElement = document.createElement('i');
    // iconElement.classList.add('fa-solid', 'fa-arrow-up-right-from-square');
    // div.appendChild(iconElement); // Append where appropriate

    // Append elements to the row div
    div.appendChild(pIndex);
    div.appendChild(p1);
    div.appendChild(p2);


    // Append the row div to the container
    container.appendChild(div);
}

function createRankedHeader(container, values) {
    let div = document.createElement('div');
    // Add specific styling/classes for header rows if needed
    div.classList.add(...rankedRunsClasses, 'header-row'); // Example: add 'header-row' class
    div.style.fontWeight = 'bold'; // Example style


    // Create <p> elements for each header cell
    values.forEach(value => {
        let p = document.createElement('p');
        p.textContent = value || ''; // Handle potential undefined values
        div.appendChild(p);
    });

    // Ensure the number of <p> elements matches expected columns if layout depends on it
     while (div.children.length < 3) { // Assuming 3 columns (#, Runner, Time)
        let p = document.createElement('p');
        div.appendChild(p); // Add empty placeholders if needed
     }


    container.appendChild(div);
}

function clearContainer(container) {
    // Simple clearing method
    container.innerHTML = '';
}


// --- Initial Execution ---
// Call fetchRanked when the script loads to start the process
fetchRanked("ranked!A2:C"); // Fetch from row 2 downwards in columns A to C
                           // Adjust the range ("ranked!A2:C") based on your sheet layout
                           // Ensure it includes Name, UUID, and optionally State