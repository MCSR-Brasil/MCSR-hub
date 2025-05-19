let brRankingjsonData = null;
let data116 = null; 
const API_KEY = 'AIzaSyAgRJh3hMNn84hWJYnwoXhq3Pw_Ew1yyrw';
const BR_RANKING_SPREADSHEET_ID = '1wHgbckH2QZwaD_yxUynviNxNGsN0o7H97aN8BKOkIBM';
const RSG116_SPREADSHEET_ID = '1zTaSiWIDf2VQjf4yW6mdYkOXx1g7Mrs1s3b8vWVMeAw';

const loadingIndicator = document.getElementById('loading-indicator');
const errorMessageContainer = document.getElementById('error-message-container');
const tableBody = document.querySelector('#data-table tbody');
const tableHead = document.querySelector('#data-table thead');


function showLoading(isLoading) {
    if (loadingIndicator) loadingIndicator.style.display = isLoading ? 'block' : 'none';
}

function displayError(message) {
    if (errorMessageContainer) {
        errorMessageContainer.textContent = message;
        errorMessageContainer.style.display = 'block';
    }
    if (tableBody) tableBody.innerHTML = ''; // Clear table on error
    if (tableHead) tableHead.innerHTML = ''; // Clear head on error
}

async function fetchData(spreadsheetId, range, variableToStoreData) {
    showLoading(true);
    displayError(''); // Clear previous errors
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?alt=json&key=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP error! status: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
        }
        const jsonData = await response.json();
        if (jsonData && jsonData.values) {
            return jsonData.values;
        } else {
            throw new Error('No data found or unexpected format.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        displayError(`Error loading data: ${error.message}`);
        return null; // Return null on error
    } finally {
        showLoading(false);
    }
}

function setTableHeaders(headers) {
    if (!tableHead) return;
    tableHead.innerHTML = ''; // Clear existing headers
    const headerRow = document.createElement('tr');
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    tableHead.appendChild(headerRow);
}

function renderGenericData(values, columnConfig) {
    if (!tableBody) return;
    tableBody.innerHTML = '';

    if (!values || values.length === 0) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = columnConfig.headers.length;
        td.textContent = 'No data found for this category.';
        td.style.textAlign = 'center';
        tr.appendChild(td);
        tableBody.appendChild(tr);
        return;
    }

    setTableHeaders(columnConfig.headers);

    let displayedRowCount = 0; // To keep your #1, #2, #3 ranking correct

    for (let rowIndex = 0; rowIndex < values.length; rowIndex++) {
        const row = values[rowIndex];

        if (!row) continue; // Skip if row is null/undefined

        // --- CHECK FOR "STOP" in name or time column ---
        const timeCellIndex = columnConfig.dataIndices.time;
        const nameCellIndex = columnConfig.displayIndices[0]; // Assuming first displayIndex is name

        let stopFound = false;

        // Check time column for "STOP"
        if (typeof timeCellIndex === 'number' && row.length > timeCellIndex &&
            row[timeCellIndex] && typeof row[timeCellIndex] === 'string' &&
            row[timeCellIndex].trim().toUpperCase() === "STOP") {
            stopFound = true;
        }

        // Check name column for "STOP" (if not already found)
        if (!stopFound && typeof nameCellIndex === 'number' && row.length > nameCellIndex &&
            row[nameCellIndex] && typeof row[nameCellIndex] === 'string' &&
            row[nameCellIndex].trim().toUpperCase() === "STOP") {
            stopFound = true;
        }

        if (stopFound) {
            console.log(`"STOP" marker encountered at source row index ${rowIndex}. Halting processing.`);
            break; // Exit the loop
        }
        // --- END CHECK FOR "STOP" ---


        // Your existing row skipping conditions (like N/A time)
        if (row[columnConfig.dataIndices.time] === 'N/A') {
            console.warn('Skipping row due to "N/A" time:', row);
            continue; // Skip this iteration
        }
        // Add other conditions from your previous version if needed, for example:
        // if (row.length < columnConfig.dataIndices.url) { ... continue; }


        // If we reach here, the row is to be displayed
        displayedRowCount++;
        const tr = document.createElement('tr');

        // Add Rank
        const rankTd = document.createElement('td');
        if (displayedRowCount === 1) {
            rankTd.innerHTML = '<span style="color:rgb(255, 242, 58);">#1</span>';
        } else if (displayedRowCount === 2) {
            rankTd.innerHTML = '<span style="color:rgb(236, 242, 255);">#2</span>';
        } else if (displayedRowCount === 3) {
            rankTd.innerHTML = '<span style="color:rgb(156, 127, 83);">#3</span>';
        } else {
            rankTd.textContent = `#${displayedRowCount}`;
        }
        tr.appendChild(rankTd);

        // Add data cells based on displayIndices
        columnConfig.displayIndices.forEach(dataIdx => {
            const td = document.createElement('td');
            td.textContent = (row.length > dataIdx && row[dataIdx] != null) ? String(row[dataIdx]) : '';
            tr.appendChild(td);
        });

        // Event listener for modal
        tr.addEventListener('mousedown', () => {
            const getData = (index, defaultVal = 'N/A') => (typeof index === 'number' && row.length > index && row[index] != null) ? String(row[index]) : defaultVal;
            const getUrl = (index) => (typeof index === 'number' && row.length > index && row[index]) ? String(row[index]) : '';

            const runData = {
                time: getData(columnConfig.dataIndices.time),
                bastion: getData(columnConfig.dataIndices.bastion),
                date: getData(columnConfig.dataIndices.date),
                verified: getData(columnConfig.dataIndices.verified),
                seed: getData(columnConfig.dataIndices.seed),
                runUrl: getUrl(columnConfig.dataIndices.url),
                desc: getData(columnConfig.dataIndices.description),
                rankGlobe: getData(columnConfig.dataIndices.rankGlobe)
            };
            if (runData.runUrl || Object.values(runData).some(val => val !== 'N/A' && val !== '')) { // Open if there's a URL or any other meaningful data
                openRunModal(runData);
            } else {
                console.warn("No URL or significant data found for this run, modal not opened.", row);
            }
        });
        tableBody.appendChild(tr);
    } // End of for loop

    if (displayedRowCount === 0 && tableBody.innerHTML === '') {
        // Simplified no data message
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = columnConfig.headers.length > 0 ? columnConfig.headers.length : 1;
        td.textContent = 'No displayable data found for this category.';
        td.style.textAlign = 'center';
        tr.appendChild(td);
        tableBody.appendChild(tr);
    }
}


function extractYouTubeVideoId(url) {
    if (!url) return 'dQw4w9WgXcQ'; // Default video if URL is missing (Rickroll :D)
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : 'dQw4w9WgXcQ'; // Fallback to default if no match
}

function openRunModal(runData) {
    const videoId = extractYouTubeVideoId(runData.runUrl);
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

    document.getElementById('modalIframe').src = embedUrl;
    document.getElementById('modalDate').textContent = runData.date;
    document.getElementById('modalVerified').textContent = runData.verified;
    document.getElementById('modalBastion').textContent = runData.bastion;
    document.getElementById('modalSeed').textContent = runData.seed;
    document.getElementById('modalTime').textContent = runData.time;
    document.getElementById('modalDesc').textContent = runData.desc;
    document.getElementById('modalRankGlobe').textContent = runData.rankGlobe;

    const modalOverlay = document.getElementById('modal-overlay');
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
}

function closeRunModal() {
    const modalOverlay = document.getElementById('modal-overlay');
    modalOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore background scroll

    const modalIframe = document.getElementById('modalIframe');
    modalIframe.src = ''; // Stop video by clearing src
}

async function handleCatChange(categoryValue) {
    let dataToRender = null;
    let config = {};

    // Define configurations for each category
    // These indices are examples and need to match your Google Sheet columns
    // The indices are 0-based for the `row` array after `shift()`
    // `displayIndices` are for table columns (excluding rank)
    // `dataIndices` are for modal data
    const SHEETS_PADDING_116 = 10; // As per original script for 1.16+ data

    switch (categoryValue) {
        case "1.16+":
            if (!data116) data116 = await fetchData(RSG116_SPREADSHEET_ID, '116rsg', data116);
            dataToRender = data116;
            config = {
                headers: ['#', 'Runner', 'Tempo', 'Bastion'],
                displayIndices: [SHEETS_PADDING_116 + 1, SHEETS_PADDING_116 + 2, SHEETS_PADDING_116 + 3],
                dataIndices: {
                    time: SHEETS_PADDING_116 + 2,
                    bastion: SHEETS_PADDING_116 + 3,
                    date: SHEETS_PADDING_116 + 4,
                    verified: SHEETS_PADDING_116 + 5,
                    seed: SHEETS_PADDING_116 + 6,
                    url: SHEETS_PADDING_116 + 7,
                    description: SHEETS_PADDING_116 + 8,
                    rankGlobe: SHEETS_PADDING_116 + 9,
                }
            };
            break;
        case "SSG 1.16+":
            if (!brRankingjsonData) brRankingjsonData = await fetchData(BR_RANKING_SPREADSHEET_ID, 'Principais', brRankingjsonData);
            dataToRender = brRankingjsonData;
            config = {
                headers: ['#', 'Runner', 'Verificada', 'Tempo'],
                displayIndices: [17, 18, 19],
                dataIndices: {
                    time: 17, bastion: 'N/A', date: 19, verified: 'N/A', seed: 'N/A', url: 20, description: 'N/A', rankGlobe: 'N/A'
                }
            };
            break;
        case "1.13-1.15":
             if (!brRankingjsonData) brRankingjsonData = await fetchData(BR_RANKING_SPREADSHEET_ID, 'Principais', brRankingjsonData);
            dataToRender = brRankingjsonData;
            config = {
                headers: ['#', 'Runner', 'Verificada', 'Tempo'],
                displayIndices: [7, 8, 9],
                dataIndices: {
                    time: 9, bastion: 'N/A', date: 'N/A', verified: 8, seed: 'N/A', url: 'N/A', description: 'N/A', rankGlobe: 'N/A'
                }
            };
            break;

        case "1.9-1.12":
            if (!brRankingjsonData) brRankingjsonData = await fetchData(BR_RANKING_SPREADSHEET_ID, 'Principais', brRankingjsonData);
            dataToRender = brRankingjsonData;
            config = {
                headers: ['#', 'Runner', 'Verificada', 'Tempo'],
                displayIndices: [22, 23, 24],
                dataIndices: {
                    time: 23, bastion: 'N/A', date: 24, verified: 'N/A', seed: 'N/A', url: 'N/A', description: 'N/A', rankGlobe: 'N/A'
                }
            };
            break;
        case "Pre 1.9":
            if (!brRankingjsonData) brRankingjsonData = await fetchData(BR_RANKING_SPREADSHEET_ID, 'Principais', brRankingjsonData);
            dataToRender = brRankingjsonData;
            config = {
                headers: ['#', 'Runner', 'Verificada', 'Tempo'],
                displayIndices: [12, 13, 14], 
                dataIndices: { 
                    time: 13, bastion: 'N/A', date: 14, verified: 'N/A', seed: 'N/A', url: 'N/A', description: 'N/A', rankGlobe: 'N/A'
                }
            };
            break;
        default:
            displayError("Selected category is not configured.");
            return;
    }

    if (dataToRender) {
        renderGenericData(dataToRender, config);
    } else if (!loadingIndicator.style.display || loadingIndicator.style.display === 'none') {
        if (!errorMessageContainer.style.display || errorMessageContainer.style.display === 'none') {
             displayError("No data available for this category. It might still be loading or an error occurred.");
        }
    }
}


// Initial load (e.g., for the default selected category)
document.addEventListener('DOMContentLoaded', () => {
    const initialCategory = document.getElementById('cat').value;
    handleCatChange(initialCategory);

    // Close modal on Escape key
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && document.getElementById('modal-overlay').classList.contains('active')) {
            closeRunModal();
        }
    });
    // Close modal if overlay is clicked
     document.getElementById('modal-overlay').addEventListener('click', function(event) {
        if (event.target === this) { // Ensure click is on overlay itself, not children
            closeRunModal();
        }
    });
});

// Prefetching and fast navigation (from original script)
// Consider if this is still needed with modern browser caching and single-page app feel.
document.querySelectorAll('a.back-button').forEach(link => {
    link.addEventListener('mouseenter', () => {
      if (!link.dataset.prefetched) {
        const prefetch = document.createElement('link');
            prefetch.rel = 'prefetch';
            prefetch.href = link.href;
            document.head.appendChild(prefetch);
            link.dataset.prefetched = 'true';
        }
    });
    link.addEventListener('mousedown', e => {
        if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
            // Standard navigation will occur, or use e.preventDefault() and window.location if special handling is needed.
        }
    });
});