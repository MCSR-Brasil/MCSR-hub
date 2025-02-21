
let brRankingjsonData = null; // Global variable to store JSON data
// for beta
async function fetch116SheetsBackend(variableName, catStart, catEnd) {
    const apiKey = 'AIzaSyAgRJh3hMNn84hWJYnwoXhq3Pw_Ew1yyrw';
    const spreadsheetId = '1zTaSiWIDf2VQjf4yW6mdYkOXx1g7Mrs1s3b8vWVMeAw';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${variableName}?alt=json&key=${apiKey}`;
    
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            data116 = await response.json();
            
            console.log(data116.values); // Log the entire data array
            // Call a function to render data in HTML
            renderSheets116Data(data116.values, catStart, catEnd);
        } catch (error) {
            console.error('Error fetching data:', error);
            const tbody = document.querySelector('#data-table tbody');
            tbody.innerHTML = `<tr><td colspan="5">Error loading data: ${error.message}</td></tr>`;
        }
    }



async function fetchBrRankingData(variableName, catStart, catEnd) {
    const apiKey = 'AIzaSyAgRJh3hMNn84hWJYnwoXhq3Pw_Ew1yyrw';
    const spreadsheetId = '1wHgbckH2QZwaD_yxUynviNxNGsN0o7H97aN8BKOkIBM';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${variableName}?alt=json&key=${apiKey}`;
    
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            brRankingjsonData = await response.json();
            brRankingjsonData.values.shift();
            console.log(brRankingjsonData.values); // Log the entire data array
            // Call a function to render data in HTML
            renderSheets116Data(brRankingjsonData.values, catStart, catEnd);
        } catch (error) {
            console.error('Error fetching data:', error);
            const tbody = document.querySelector('#data-table tbody');
            tbody.innerHTML = `<tr><td colspan="5">Error loading data: ${error.message}</td></tr>`;
        }
    }

    async function fetchDataOnly(variableName, catStart, catEnd) {
        const apiKey = 'AIzaSyAgRJh3hMNn84hWJYnwoXhq3Pw_Ew1yyrw';
        const spreadsheetId = '1wHgbckH2QZwaD_yxUynviNxNGsN0o7H97aN8BKOkIBM';
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${variableName}?alt=json&key=${apiKey}`;
        
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                brRankingjsonData = await response.json();
                brRankingjsonData.values.shift();
                console.log(brRankingjsonData.values);
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    
    function renderData(values, catStart, catEnd) {
        const tbody = document.querySelector('#data-table tbody');
        tbody.innerHTML = ''; // Clear existing content
        
        if (values && values.length > 0) {
            values.forEach((row, rowIndex) => {
                // Check if the row has any non-empty cells within the range
                const hasContent = row.slice(catStart, catEnd + 1).some(cell => cell !== undefined && cell !== '');
        
                if (hasContent) {
                    const tr = document.createElement('tr');
                    
                    // Get the URL from the fifth column (assuming zero-based indexing)
                    const url = row[4 + catStart];
                    
        
                    // Add event listener to the row
                    tr.addEventListener('click', () => {
                        if (url) {
                            createRun(1, url);
                            console.log(row);
                        }
                    });
        
                    for (let cellIndex = catStart; cellIndex <= catEnd; cellIndex++) {
                        const td = document.createElement('td');
                        td.textContent = row[cellIndex] || '';
                        tr.appendChild(td);
                    }
                    tbody.appendChild(tr);
                }
            });
        } else {
            tbody.innerHTML = '<tr><td colspan="5">No data found</td></tr>';
        } 
    }

    function renderSheets116Data(values, catStart, catEnd) {
        const tbody = document.querySelector('#data-table tbody');
        tbody.innerHTML = ''; // Clear existing content
        
        if (values && values.length > 0) {
            // HEADER
            const headerRow = document.createElement('tr');
            const headers = ['#', 'RUNNER', 'TEMPO', 'BASTION'];
            
            headers.forEach(headerText => {
                const td = document.createElement('td');
                td.textContent = headerText;
                headerRow.appendChild(td);
            });
            
            tbody.appendChild(headerRow);
        
            // Create data rows
            values.forEach((row, rowIndex) => {
                // Check if the row has any non-empty cells within the range
                const hasContent = row.slice(catStart, catEnd + 1).some(cell => 
                    cell !== undefined && cell !== '');
        
                if (hasContent) {
                    const tr = document.createElement('tr');
                    
                    // Get the URL from the fifth column (assuming zero-based indexing)
                    const url = row[7];
                    
                    // Add event listener to the row
                    tr.addEventListener('click', () => {
                        
                            createRun(1, row[2], row[3], row[4], row[5], row[6], url, row[8], row[9]);
                            console.log(url);
                        
                    });
        
                    // Add index column
                    const indexTd = document.createElement('td');
                    indexTd.textContent = "#" + (rowIndex + 1);
                    tr.appendChild(indexTd);
        
                    // Add other cells
                    for (let cellIndex = catStart; cellIndex <= catEnd; cellIndex++) {
                        if (cellIndex !== 4 + catStart) { // Skip the URL column
                            const td = document.createElement('td');
                            td.textContent = row[cellIndex] || '';
                            tr.appendChild(td);
                        }
                    }
                    
                    tbody.appendChild(tr);
                }
            });
        } else {
            tbody.innerHTML = '<tr><td colspan="4">No data found</td></tr>';
        }
    }
    

    function createRun(runIndex,time,bastion,date,verified,seed,runUrl,desc,rankGlobe) {
           const videoId = extractYouTubeVideoId(runUrl);
           console.log(videoId);
        

    
        const embedUrl = `https://www.youtube.com/embed/${videoId}?si=Ul2hMu_3HWnljoMw`;
    
        // Update the modal content
        const modalIframe = document.getElementById('modalIframe');
        modalIframe.src = embedUrl;

        const modalDate = document.getElementById('modalDate');
        modalDate.textContent = date;

        const modalVerified = document.getElementById('modalVerified');
        modalVerified.textContent = verified;

        const modalBastion = document.getElementById('modalBastion');
        modalBastion.textContent = bastion;

        const modalSeed = document.getElementById('modalSeed');
        modalSeed.textContent = seed;

        const modalTime = document.getElementById('modalTime');
        modalTime.textContent = time;

        const modalDesc = document.getElementById('modalDesc'); 
        modalDesc.textContent = desc;
    
        // Display the modal
        const modal = document.getElementById('runModal');
        modal.style.display = 'block';
    }
    
    function closeModal() {
        const modal = document.getElementById('runModal');
        modal.style.display = 'none';
        
        // Stop the video by clearing the iframe src
        const modalIframe = document.getElementById('modalIframe');
        modalIframe.src = '';
    }


    function extractYouTubeVideoId(url) {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : 'a5uQMwRMHcs';
    }


    function handleCatChange(cat) {
        if (cat == "1.16+") {
            renderSheets116Data(data116.values, 1, 3);
        }
        else if (cat == "SSG 1.16+") {
            renderData(brRankingjsonData.values, 16, 19);
        }
        else if (cat == "1.13-1.15") {
            renderData(brRankingjsonData.values, 6, 9);
        }
        else if (cat == "1.9-1.12") {
            renderData(brRankingjsonData.values, 21, 24);
        }
        else if (cat == "Pre 1.9") {
            renderData(brRankingjsonData.values, 11, 14);
        }
    }
   
    fetchDataOnly('Principais', 0, 3);
    fetch116SheetsBackend('116rsg', 1, 3);
    