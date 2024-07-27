

let jsonData = null; // Global variable to store JSON data

fetchData("estados", 0, 3);

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
            
            console.log(jsonData.values);
            
            parseAndCreateElements(catStart, catEnd, jsonData.values);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    






setCatButton("rsgBtn");

// 1.16 is default
button116.style = "background-color: #666494"


buttonBrasil.addEventListener("click", function(){
  StateDisplayText.innerHTML = "Brasil";
  selectedState = "none"
  getState();
});

// Function to parse and create elements
function createCatDiv(container, classes) {
  let div = document.createElement('div');
  div.classList.add(...runsClasses);
  let p1 = document.createElement('p');
  p1.textContent = classes[0];

  div.appendChild(p1);
  container.appendChild(div);
  
}

function createRunsDiv(container, values) {
  let div = document.createElement('div');
  div.classList.add(...runsClasses);

  let pIndex = document.createElement('p');
  pIndex.textContent = values[0]; // Display the row index

  let p1 = document.createElement('p');
  p1.textContent = values[1]; // Use the first value from the array
  
  let p2 = document.createElement('p');
  p2.textContent = values[2];

  let iconElement = document.createElement('i');
  iconElement.classList.add('fa-solid', 'fa-arrow-up-right-from-square');

  document.body.appendChild(p2);
  
  div.appendChild(pIndex);
  div.appendChild(p1);
  div.appendChild(p2);
  
  
  container.appendChild(div);
}


function parseAndCreateElements(slice1, slice2, jsonData) {
  const divContainer = document.getElementById('tbl-data');
  clearContainer(divContainer); // Clear container before creating elements

  // Extract category names
  const categoryNames = jsonData[0].slice(slice1, slice2);

  // Create container for category headers
  const categoryHeaderDiv = document.createElement('div');
  categoryHeaderDiv.classList.add('category-headers'); // Add CSS class

  divContainer.appendChild(categoryHeaderDiv); // Add headers to container

  createCatDiv(divContainer, jsonData[0].slice(slice1, slice2));  

  // Create rows
  for (let i = 1; i < jsonData.length; i++) {
    const rowData = jsonData[i].slice(slice1, slice2);
    if (rowData[0] == ".") { // Check for stop condition, adjust if needed
      break;
    }

    createRunsDiv(divContainer, rowData); // Create row elements for data
  }
}

function clearContainer(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function setCatButton(selectedButtonId) {
  buttonRSG.style.backgroundColor = "#666494";
  if (selectedButtonId === "rsgBtn"){
    buttonSSG.style.backgroundColor = "";
    button116.style.backgroundColor = "#666494";
  }
  else if (selectedButtonId === "ssgBtn"){
    buttonRSG.style.backgroundColor = "#3d3b5a";
  }
  }



  function handleButtonClick(buttonId, cat, parseStart, parseEnd, visibility) {
    unselectButtons(buttonId);
    setCatButton(buttonId);
    document.getElementById(buttonId).style.backgroundColor = "#666494";
    selectedCat = cat;
    if (selectedState != "none") {
      getState();
      if (cat === "1.16ssg"){
        divVer.style.visibility = "hidden";
      }
       else divVer.style.visibility = "visible";
      
    } else {
      fetchData("estados", parseStart, parseEnd);
      divVer.style.visibility = visibility;
    }
  }

function unselectButtons(selectedButtonId) {
  const buttonIds = ["1.16Btn", "1.14Btn", "1.7Btn"];
  for(let i = 0; i < buttonIds.length; i++) {
    if (buttonIds[i] !== selectedButtonId) {
      console.log(buttonIds[i]);
      document.getElementById(buttonIds[i]).style.backgroundColor = "#3d3b5a";
    }
  
}
}