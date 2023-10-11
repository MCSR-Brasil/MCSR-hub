let sliceValue1 = 1;
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
  pIndex.textContent = '#' + rowIndex; // Display the row index

  let p1 = document.createElement('p');
  p1.textContent = values[0]; // Use the first value from the array
  
  let p2 = document.createElement('p');
  p2.textContent = values[1]; // Use the second value from the array
  
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
  sliceValue1 = 13;
  sliceValue2 = 15;
  parseAndCreateElements();
});

document.getElementById("rsgBtn").addEventListener("click", function() {
  sliceValue1 = 1;
  sliceValue2 = 3;
  parseAndCreateElements();
  console.log(test);
});

document.getElementById("outrasBtn").addEventListener("click", function() {

});

// Initial data load
parseAndCreateElements();
