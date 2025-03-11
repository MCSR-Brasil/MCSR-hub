const StateDisplayText = document.getElementById("estado");
const button116 = document.getElementById("1.16Btn");
const button17 = document.getElementById("1.7Btn");
const button114 = document.getElementById("1.14Btn");
const buttonBrasil = document.getElementById("brBtn");  
const buttonRSG = document.getElementById("rsgBtn");
const buttonSSG = document.getElementById("ssgBtn");
const buttonRanked = document.getElementById("rankedBtn");

const PCwarningBTN = document.getElementById("PC-warning");

PCwarningBTN.addEventListener("click", function() {
  document.getElementsByClassName("PC-warning")[0].style.display = "none";
});


const divVer = document.getElementById("verDiv");

const runsClasses = ["d-flex","justify-content-between", "runner"]

let selectedCat = "1.16rsg"

const stateColors = ["#038ba6", "#02b087", "#4da302", "#99b002", "#b07602", "#ad5a02", "#b02c00", "#b00202", "#6e011a"]
const stateColorMapping = {
  "BR-AC": stateColors[0],
  "BR-RS": stateColors[7],
  "BR-RJ": stateColors[6],
  "BR-SP": stateColors[8],
  "BR-DF": stateColors[2],
  "BR-GO": stateColors[2],
  "BR-MG": stateColors[4],
  "BR-SC": stateColors[4],
  "BR-PR": stateColors[3],
  "BR-BA": stateColors[2],
  "BR-AM": stateColors[0],
  "BR-PA": stateColors[1],
  "BR-RO": stateColors[0],
  "BR-RR": stateColors[0],
  "BR-AP": stateColors[0],
  "BR-CE": stateColors[0],
  "BR-RN": stateColors[1],
  "BR-TO": stateColors[0],
  "BR-MT": stateColors[0],
  "BR-MS": stateColors[0],
  "BR-ES": stateColors[1],
  "BR-PE": stateColors[2],
  "BR-MA": stateColors[0],
  "BR-PI": stateColors[0],
  "BR-PB": stateColors[1],
  "BR-AL": stateColors[1],
  "BR-SE": stateColors[0]
};
let selectedState = "none"

am4core.ready(function () {
    const chart = am4core.create("chartdiv", am4maps.MapChart);
    chart.geodata = am4geodata_brazilLow;
    chart.projection = new am4maps.projections.Miller();

    const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;

    const polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.stroke = am4core.color("#ffffff");
    polygonTemplate.strokeWidth = 2;

    //Get Name On Click
    polygonTemplate.events.on("hit", function (event) {
      let clickedPolygonData = event.target.dataItem.dataContext;
      let stateName = clickedPolygonData.name;
      StateDisplayText.innerHTML = stateName;
      
      selectedState = stateName;
      
      getState();
    })


    polygonSeries.events.on("inited", function () {
      polygonSeries.mapPolygons.each(function (polygon) {
        var stateId = polygon.dataItem.dataContext.id;
        if (stateColorMapping.hasOwnProperty(stateId)) {
          polygon.fill = stateColorMapping[stateId];
        }
      });
    });


    const hoverState = polygonTemplate.states.create("hover");
    hoverState.properties.fill = "#bed2e8";


    const zoomControl = new am4maps.ZoomControl();
    chart.zoomControl = zoomControl;
    zoomControl.slider.height = 150;
  });