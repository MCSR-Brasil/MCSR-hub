let sliceValue1 = 0;
let sliceValue2 = 3;

// Function to parse and create elements
function generateDivWithClasses(container, classes) {
  let div = document.createElement('div');
  div.classList.add('d-flex', 'justify-content-between', 'runner');
  
  let p1 = document.createElement('p');
  p1.textContent = classes[0]; // Use the first value from the array
  
  let p2 = document.createElement('p');
  p2.textContent = classes[1]; // Use the second value from the array
  
  div.appendChild(p1);
  div.appendChild(p2);
  
  container.appendChild(div);
}

function generateDivWithValues(container, values, rowIndex) {
  let div = document.createElement('div');
  div.classList.add('d-flex', 'justify-content-between', 'runner');
  
  let pIndex = document.createElement('p');
  pIndex.textContent = values[0]; // Display the row index

  let p1 = document.createElement('p');
  p1.textContent = values[1]; // Use the first value from the array
  
  let p2 = document.createElement('p');
  p2.textContent = values[2]; // Use the second value from the array
  
  div.appendChild(pIndex);
  div.appendChild(p1);
  div.appendChild(p2);
  
  
  container.appendChild(div);
}







function parseAndCreateElements() {
  Papa.parse("tabela.csv", {
    download: true,
    header: false,
    complete: function(results) {
      console.log(results);

      let data = results.data.slice(0, 100); // Get data from A1 to C100

      let divContainer = document.getElementById('tbl-data');
      clearContainer(divContainer); // Clear existing elements

      generateDivWithClasses(divContainer, data[0].slice(sliceValue1, sliceValue2));

      for (let i = 1; i < data.length; i++) {
        let rowData = data[i].slice(sliceValue1, sliceValue2);
        generateDivWithValues(divContainer, rowData, i);
        if (rowData[0]){
          console.log(i)
        }
        else {
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

// Add event listeners for different buttons to change slice values
document.getElementById("ssgBtn").addEventListener("click", function() {
  sliceValue1 = 12;
  sliceValue2 = 15;
  document.getElementById("verDiv").style = "visibility: hidden;"
  parseAndCreateElements();
});

document.getElementById("rsgBtn").addEventListener("click", function() {
  sliceValue1 = 0;
  sliceValue2 = 3;
  document.getElementById("verDiv").style = "visibility: visible;"
  parseAndCreateElements();
  
});

document.getElementById("outrasBtn").addEventListener("click", function() {

});

document.getElementById("1.7Btn").addEventListener("click", function() {
  sliceValue1 = 8;
  sliceValue2 = 11;

  parseAndCreateElements();
  
});

document.getElementById("1.14Btn").addEventListener("click", function() {
  sliceValue1 = 4;
  sliceValue2 = 8;

  parseAndCreateElements();
  
});

document.getElementById("1.16Btn").addEventListener("click", function() {
  sliceValue1 = 0;
  sliceValue2 = 3;

  parseAndCreateElements();
  
});

// Initial data load
parseAndCreateElements();
