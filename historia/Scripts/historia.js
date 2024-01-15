document.getElementById('back-button').addEventListener('click', () => {
  location.href = "../../index.html";
});



let pastVersion = ""



function toggleSeeMore(button) {
    var container = button.closest('.run-desc-container');
    
    if (container) {
        // Find the .see-more-text element within the same container
        var seeMoreText = container.querySelector('.see-more-text');
        
        if (seeMoreText) {
            // Toggle the display style of the .see-more-text element
            var currentDisplay = window.getComputedStyle(seeMoreText).display;
            seeMoreText.style.display = currentDisplay === 'none' ? 'initial' : 'none';
        }
    }
}

function parseAndCreateElements(slice1, slice2) {
    Papa.parse("./Scripts/mcsr.csv", {
      download: true,
      header: false,
      complete: function(results) {
  
        let data = results.data.slice(0, 100); //primeiras 100 linhas
  
        let divContainer = document.getElementById('main-container');
        //clearContainer(divContainer); // limpa a div
  
       // generateDivWithClasses(divContainer, data[0].slice(slice1, slice2)); //corta as colunas que quer
  
        for (let i = 1; i < data.length; i++) {
          let rowData = data[i].slice(slice1, slice2);
          if (rowData[0] == false){
            return
          }
          generateDivWithValues(divContainer, rowData);

        }
      }
    });
  }


  

  function generateDivWithValues(container, values) {
    let div = document.createElement('div');
    if (values[2] != pastVersion ) {
      console.log(values[2])
      let versionDiv = document.createElement('div')
      versionDiv.innerHTML = 
                    `<div class="version-division">
                        <h1>${values[2]}</h1>
                     </div>`
      container.appendChild(versionDiv);
    }
    div.innerHTML = `<div class="run-container d-flex justify-content-around" id="run-container">
                        <div class="run-circle-indicator">
                                <div class="d-flex justify-content-center">
                                    <p class="test">${values[4]}</p>
                                    <i class="fa-solid fa-circle circle-icon" aria-hidden="true"></i>
                                </div>
                                <div class="vertical-line"></div> 
                            </div>
                            <div class="run">
                                <div class="runinfo-container">
                                    <h2 class="run-date"></h2>
                                    <div class="run-info text-1">
                                        <p><span style="color: ${values[7]};"><b>${values[1]}</b></span> conseguiu um novo recorde de <b>${values[3]}</b>!</p>
                                        <div class="run-desc-container">
                                            <p class="text-3 run-desc">O recorde durou <b>${values[5]}</b> dias e melhorou ele em <b>${values[9]}</b> <button class="btn see-more" id="seeMoreBtn" onclick="toggleSeeMore(this)">Ver mais</button></p>
                                            <p class="see-more-text text-3" style="display: none;">${values[6]}</p>
                                        </div>         
                                    </div>
                                </div>   
                            </div>
                            <div class="run-outside-link"><a href="${values[8]}"><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a></div>
                      </div>`
    pastVersion = values[2]
    
    container.appendChild(div);
    
  }

  parseAndCreateElements(0, 10)