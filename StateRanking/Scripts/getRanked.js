const uuids = ["cb860439-54a7-4ba0-abbd-d21179d00bfa", "97800bfa-7f1c-42e1-9162-ea1c2bc7078b", "d41f0f3c-aebe-45e1-bc6a-380fedf54ca9"]; // Replace with actual UUIDs
const cache = {};
let dataRanked = null;

async function fetchRanked(variableName) {
    const apiKey = 'AIzaSyAgRJh3hMNn84hWJYnwoXhq3Pw_Ew1yyrw';
    const spreadsheetId = '1zTaSiWIDf2VQjf4yW6mdYkOXx1g7Mrs1s3b8vWVMeAw';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${variableName}?alt=json&key=${apiKey}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        dataRanked = await response.json();
            
        console.log("ranked: ", dataRanked.values); // Log the entire data array

        fetchRankedUserData(dataRanked.values);
    } catch (error) {
        console.error('Error fetching data:', error);
        const tbody = document.querySelector('#data-table tbody');
        tbody.innerHTML = `<tr><td colspan="5">Error loading data: ${error.message}</td></tr>`;
    }
}

async function fetchRankedUserData(data) {
    const cache = {}; // Initialize cache

    for (const row of data) {
        if (!Array.isArray(row) || row.length < 3) {
            console.error("Invalid row format:", row);
            continue; // Skip if the row is not an array or doesn't have enough elements
        }

        const [name, uuid, state] = row; // Destructure directly

        if (!cache[uuid]) { // Check if data is already cached
            try {
                const response = await fetch(`https://mcsrranked.com/api/users/${uuid}`);
                if (!response.ok) throw new Error(`Failed to fetch data for UUID: ${uuid}`);
                const userData = await response.json();

                cache[uuid] = { ...userData, title: name, state }; // Save to cache with extra fields
            } catch (error) {
                console.error(error);
            }
        }
    }

    return cache; // Return cache for later use
}

function handleRankedButtonClick() {
    console.log(cache);
    createRankedElements()
    
}

function createRankedElements() {
    const divContainer = document.getElementById('tbl-data');
    clearContainer(divContainer); // Clear container before creating elements
  
    // Create container for category headers
    const categoryHeaderDiv = document.createElement('div');
    categoryHeaderDiv.classList.add('category-headers'); // Add CSS class
  
    divContainer.appendChild(categoryHeaderDiv); // Add headers to container
  
    createCatDiv(divContainer, cache[0].slice(0, 2));  
  
    // Create rows
    for (let i = 1; i < cache.length; i++) {
      const rowData = cache[i].slice(0, 2);
      if (rowData[0] == ".") { // Check for stop condition, adjust if needed
        break;
      }
  
      createRunsDiv(divContainer, rowData); // Create row elements for data
    }
  }

fetchRanked("ranked");