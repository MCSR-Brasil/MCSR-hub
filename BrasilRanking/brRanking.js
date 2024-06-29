let jsonData = null; // Global variable to store JSON data

async function fetchData(variableName, catStart, catEnd) {
    const apiKey = 'AIzaSyAgRJh3hMNn84hWJYnwoXhq3Pw_Ew1yyrw';
    const spreadsheetId = '1wHgbckH2QZwaD_yxUynviNxNGsN0o7H97aN8BKOkIBM';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${variableName}?alt=json&key=${apiKey}`;
    
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            jsonData = await response.json();
            jsonData.values.shift();
            console.log(jsonData.values); // Log the entire data array
            // Call a function to render data in HTML
            renderData(jsonData.values, catStart, catEnd);
        } catch (error) {
            console.error('Error fetching data:', error);
            const tbody = document.querySelector('#data-table tbody');
            tbody.innerHTML = `<tr><td colspan="5">Error loading data: ${error.message}</td></tr>`;
        }
    }
    
    function renderData(values, catStart, catEnd) {
        const tbody = document.querySelector('#data-table tbody');
        tbody.innerHTML = ''; // Clear existing content
        
        if (values && values.length > 0) {
            values.forEach((row, rowIndex) => {
                const tr = document.createElement('tr');
                for (let cellIndex = catStart; cellIndex <= catEnd; cellIndex++) {
                    const td = document.createElement('td');
                    td.textContent = row[cellIndex] || ''; // Display cell content, or empty string if undefined
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
            });
        } else {
            tbody.innerHTML = '<tr><td colspan="5">No data found</td></tr>';
        }
    }
    
    // Example usage:
    fetchData('Principais', 0, 3); // Replace 'Sheet1', 0, and 4 with your variable name and start/end indices