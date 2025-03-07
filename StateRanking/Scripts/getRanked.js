const uuids = ["cb860439-54a7-4ba0-abbd-d21179d00bfa", "97800bfa-7f1c-42e1-9162-ea1c2bc7078b", "d41f0f3c-aebe-45e1-bc6a-380fedf54ca9"]; // Replace with actual UUIDs
const cache = [];
let dataRanked = null;

const titleRow = ["MCSR Ranked Any%"];
const HeaderRow = ["#º", "RUNNER", "TEMPO"];

async function fetchRanked(variableName) {
    const apiKey = 'AIzaSyAgRJh3hMNn84hWJYnwoXhq3Pw_Ew1yyrw';
    const spreadsheetId = '1zTaSiWIDf2VQjf4yW6mdYkOXx1g7Mrs1s3b8vWVMeAw';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${variableName}?alt=json&key=${apiKey}`;
    
    try {
        console.log("trying to fetch ranked");
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
    console.log("fetchedranked sheet data", data);

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

                cache.push({ ...userData, name: name, state }); // Save to cache with extra fields
                console.log(cache);
            } catch (error) {
                console.error(error);
            }
        }
    }

    return cache; // Return cache for later use
}

function handleRankedButtonClick(buttonId, cat, visibility) {
    unselectButtons(buttonId);
    setCatButton(buttonId);
    document.getElementById(buttonId).style.backgroundColor = "#666494";
    selectedCat = cat;
    if (selectedState != "none") {
      //getState();
      if (cat === "1.16ssg"){
        divVer.style.visibility = "hidden";
      }
       else divVer.style.visibility = "visible";
      
    } else {
        createRankedElements()
        divVer.style.visibility = visibility;
    }
    
}

function createRankedElements() {
    const divContainer = document.getElementById('tbl-data');
    clearContainer(divContainer); // Clear container before creating elements

    createRankedHeader(divContainer, titleRow);
    createRankedHeader(divContainer, HeaderRow);

    // Sort cache by bestTime.ranked (lowest first)
    let sortedCache = cache.slice(1).sort((a, b) => {
        let timeA = a.data.statistics.total.bestTime.ranked ?? Infinity; // If null, place last
        let timeB = b.data.statistics.total.bestTime.ranked ?? Infinity;
        return timeA - timeB; // Ascending order
    });

    sortedCache.forEach((rowData, index) => {
        if (rowData.name === ".") return; // Stop condition

        createRankedCells(index + 1, divContainer, rowData); // Create row elements
    });
}



function createRankedCells(i,container, values) {
    let div = document.createElement('div');
    div.classList.add(...runsClasses);
  
    let pIndex = document.createElement('p');
    pIndex.textContent = "#" + (i); // Display the row index
  
    let p1 = document.createElement('p');
    p1.textContent = values.name; // Use the first value from the array
    
    let p2 = document.createElement('p');
    let ConvertedTime = values.data.statistics.total.bestTime.ranked / 60000; // In minutes
    let minutes = Math.floor(ConvertedTime); // Get whole minutes
    let seconds = Math.round((ConvertedTime - minutes) * 60); // Get the remaining seconds
    let formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    p2.textContent = formattedTime; // Example: "8:11"
  
    let iconElement = document.createElement('i');
    iconElement.classList.add('fa-solid', 'fa-arrow-up-right-from-square');
  
    document.body.appendChild(p2);
    
    div.appendChild(pIndex);
    div.appendChild(p1);
    div.appendChild(p2);
    
    
    container.appendChild(div);
  }

function createRankedHeader(container, values) {
    let div = document.createElement('div');
    div.classList.add(...runsClasses);
  
    let pIndex = document.createElement('p');
    pIndex.textContent = values[0]
  
    let p1 = document.createElement('p');
    p1.textContent = values[1];
    
    let p2 = document.createElement('p');
    p2.textContent = values[2];
  
    document.body.appendChild(p2);
    
    div.appendChild(pIndex);
    div.appendChild(p1);
    div.appendChild(p2);
    
    
    container.appendChild(div);
  }

  fetchRanked("ranked");