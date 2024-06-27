setCatButton("rsgBtn");
parseAndCreateElements(0,3);

// 1.16 is default
button116.style = "background-color: #666494"


buttonBrasil.addEventListener("click", function(){
  document.getElementById(STATE_DISPLAY_ID).innerHTML = "Brasil";
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

function parseAndCreateElements(slice1, slice2) {
  Papa.parse("./Scripts/tabela.csv", {
    download: true,
    header: false,
    complete: function(results) {

      let data = results.data.slice(0, 100); //primeiras 100 linhas

      let divContainer = document.getElementById('tbl-data');
      clearContainer(divContainer); // limpa a div

      createCatDiv(divContainer, data[0].slice(slice1, slice2)); //corta as colunas que quer

      for (let i = 1; i < data.length; i++) {
        let rowData = data[i].slice(slice1, slice2);
        createRunsDiv(divContainer, rowData);
        if (rowData[0] == false){
          return
        }
      }
    }
  });
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
  }
  else if (selectedButtonId === "ssgBtn"){
    buttonRSG.style.backgroundColor = "";
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
      parseAndCreateElements(parseStart, parseEnd);
      divVer.style.visibility = visibility;
    }
  }
  
  buttonSSG.addEventListener("click", function() {
    handleButtonClick("ssgBtn", "1.16ssg", 13, 17, "hidden");

  });
  
  buttonRSG.addEventListener("click", function() {
    handleButtonClick("rsgBtn", "1.16rsg", 0, 4, "visible");
    document.getElementById("1.16Btn").style.backgroundColor = "#666494";

  });
  
  button17.addEventListener("click", function() {
    handleButtonClick("1.7Btn", "1.7rsg", 9, 12, "visible");

  });
  
  button114.addEventListener("click", function() {
    handleButtonClick("1.14Btn", "1.14rsg", 5, 8, "visible");

  });
  
  button116.addEventListener("click", function() {
    handleButtonClick("1.16Btn", "1.16rsg", 0, 3, "visible");

  });

function unselectButtons(selectedButtonId) {
  const buttonIds = ["1.16Btn", "1.14Btn", "1.7Btn"];
  for(let i = 0; i < buttonIds.length; i++) {
    if (buttonIds[i] !== selectedButtonId) {
      document.getElementById(buttonIds[i]).style.backgroundColor = "#3d3b5a";
    }
  
}
}