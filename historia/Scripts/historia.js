let pastVersion = "";
let RBSjsonDataCache = {}; // Cache for storing data per version

async function fetchRBSData(variableName) {
    if (RBSjsonDataCache[variableName]) {
        // Use cached data
        console.log(`Using cached data for ${variableName}`);
        parseAndCreateRBS(0, 10, RBSjsonDataCache[variableName]);
        return;
    }

    const apiKey = 'AIzaSyAgRJh3hMNn84hWJYnwoXhq3Pw_Ew1yyrw';
    const spreadsheetId = '1wHgbckH2QZwaD_yxUynviNxNGsN0o7H97aN8BKOkIBM';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${variableName}?alt=json&key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        data.values.shift(); // Remove headers
        RBSjsonDataCache[variableName] = data; // Cache the result

        console.log(`Fetched and cached data for ${variableName}`);
        parseAndCreateRBS(0, 10, data);
    } catch (error) {
        console.error("Failed to fetch RBS data:", error);
    }
}

function changeRBSversion(version) {
    document.getElementById("run-container").innerHTML = "";
    fetchRBSData(version);

    document.getElementById("title").textContent = version === "historicossg" ? "RECORDES PASSADOS SSG" : "RECORDES PASSADOS RSG";
    document.getElementById("descriptionSSG").style.display = version === "historicossg" ? "block" : "none";
    document.getElementById("descriptionRSG").style.display = version === "historicossg" ? "none" : "block";

    const SSGbtn = document.getElementById("version-selector-SSG");
    const RSGbtn = document.getElementById("version-selector-RSG");

    if (version === "historicossg") {
        SSGbtn.classList.add("version-selector-active");
        SSGbtn.classList.remove("version-selector-text");
        RSGbtn.classList.remove("version-selector-active");
        RSGbtn.classList.add("version-selector-text");
    } else {
        RSGbtn.classList.add("version-selector-active");
        RSGbtn.classList.remove("version-selector-text");
        SSGbtn.classList.remove("version-selector-active");
        SSGbtn.classList.add("version-selector-text");
    }
}

function toggleSeeMore(button) {
    const container = button.closest('.run-desc-container');
    const seeMoreText = container?.querySelector('.see-more-text');

    if (seeMoreText) {
        const isHidden = window.getComputedStyle(seeMoreText).display === 'none';
        seeMoreText.style.display = isHidden ? 'initial' : 'none';
        button.innerText = isHidden ? "Ver Menos" : "Ver Mais";
    }
}

function parseAndCreateRBS(slice1, slice2, data) {
    const divContainer = document.getElementById('run-container');
    data.values.forEach(row => {
        const rowData = row.slice(slice1, slice2);
        if (!rowData[0]) return;
        createRunsDiv(divContainer, rowData);
    });
}

function createRunsDiv(container, values) {
    const div = document.createElement('div');
    div.id = "rbs-container";

    if (values[2] !== pastVersion) {
        const versionDiv = document.createElement('div');
        versionDiv.id = "version-division-container";
        versionDiv.innerHTML = `
            <div class="version-division">
                <h1>${values[2]}</h1>
            </div>`;
        container.appendChild(versionDiv);
    }

    div.innerHTML = `
        <div class="run-container d-flex justify-content-around">
            <div class="run-circle-indicator">
                <div class="d-flex justify-content-center">
                    <p class="test">${values[4]}</p>
                    <i class="fa-solid fa-circle circle-icon" aria-hidden="true"></i>
                </div>
                <div class="vertical-line"></div>
            </div>
            <div class="run">
                <div class="runinfo-container background-transparent-bright">
                    <h2 class="run-date"></h2>
                    <div class="run-info text-1">
                        <p><span style="color: ${values[7]};"><b>${values[1]}</b></span> conseguiu um novo recorde de <b>${values[3]}</b>!</p>
                        <div class="run-desc-container">
                            <p class="text-3 run-desc">O recorde durou <b>${values[5]}</b> dias e melhorou ele em <b>${values[9]}</b> 
                            <button class="btn see-more" onmousedown="toggleSeeMore(this)">Ver mais</button></p>
                            <p class="see-more-text text-3" style="display: none;">${values[6]}</p>
                        </div>         
                    </div>
                </div>   
            </div>
            <div class="run-outside-link"><a href="${values[8]}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a></div>
        </div>`;

    pastVersion = values[2];
    container.appendChild(div);
}

document.querySelectorAll('a').forEach(link => {
    // Prefetch on hover
    link.addEventListener('mouseenter', () => {
      if (!link.dataset.prefetched) {
        const prefetch = document.createElement('link');
        prefetch.rel = 'prefetch';
        prefetch.href = link.href;
        document.head.appendChild(prefetch);
        link.dataset.prefetched = 'true';
      }
    });
  
    // Navigate quickly on mousedown
    link.addEventListener('mousedown', e => {
      if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        window.location.href = link.href;
      }
    });
  });

// Initial fetch
fetchRBSData("historico");
