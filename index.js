stateColors = ["#038ba6", "#02b056", "#4da302", "#99b002", "#b07602", "#ad5a02", "#b02c00", "#b00202", "#6e011a"]
selectedState = "none"

am4core.ready(function () {
    var chart = am4core.create("chartdiv", am4maps.MapChart);
    chart.hiddenState.properties.opacity = 0;
    chart.geodata = am4geodata_brazilLow;
    chart.projection = new am4maps.projections.Miller();

    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    polygonSeries.tooltip.fill = am4core.color("#000000");

    var colorSet = new am4core.ColorSet();

    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.togglable = true;
    polygonTemplate.stroke = am4core.color("#000000");
    polygonTemplate.strokeWidth = 2;




    //Get Name On Click
    var currentActive;
    polygonTemplate.events.on("hit", function (event) {
    var clickedPolygonData = event.target.dataItem.dataContext;
    
    var stateName = clickedPolygonData.name;

    document.getElementById("estado").innerHTML = stateName;
    selectedState = stateName;
    getState();

    if (currentActive) {
        currentActive.setState("default");
        }
        currentActive = event.target;
        })


    polygonSeries.events.on("inited", function () {
      polygonSeries.mapPolygons.each(function (polygon) {
        var stateId = polygon.dataItem.dataContext.id;
        if (stateId === "BR-AC") {
          polygon.fill = stateColors[0];;
        }
        else if (stateId === "BR-RS") {
            polygon.fill = stateColors[6];;
          }         
        else if (stateId === "BR-RJ") {
            polygon.fill = stateColors[3];
          }
        else if (stateId === "BR-SP") {
            polygon.fill = stateColors[8];
          }  
        else if (stateId === "BR-DF") {
            polygon.fill = stateColors[1];
          } 
        else if (stateId === "BR-GO") {
            polygon.fill = stateColors[1];
          }  
        else if (stateId === "BR-MG") {
            polygon.fill = stateColors[3];
          }
        else if (stateId === "BR-SC") {
            polygon.fill = stateColors[4];
          }
        else if (stateId === "BR-PR") {
            polygon.fill = stateColors[3];
          }
        else if (stateId === "BR-BA") {
            polygon.fill = stateColors[2];
          }    
        else if (stateId === "BR-AM") {
            polygon.fill = stateColors[0];
          }
        else if (stateId === "BR-PA") {
            polygon.fill = stateColors[1];
          }
        else if (stateId === "BR-RO") {
            polygon.fill = stateColors[0];
          }
        else if (stateId === "BR-RR") {
            polygon.fill = stateColors[0];
          }
        else if (stateId === "BR-AP") {
            polygon.fill = stateColors[0];
          }
        else if (stateId === "BR-CE") {
            polygon.fill = stateColors[0];
          }
        else if (stateId === "BR-RN") {
            polygon.fill = stateColors[1];
          }
        else if (stateId === "BR-TO") {
            polygon.fill = stateColors[0];
          }
        else if (stateId === "BR-MT") {
            polygon.fill = stateColors[0];
          }
        else if (stateId === "BR-MS") {
            polygon.fill = stateColors[0];
          }
        else if (stateId === "BR-ES") {
            polygon.fill = stateColors[0];
          }
        else if (stateId === "BR-PE") {
            polygon.fill = stateColors[1];
          }
        else if (stateId === "BR-MA") {
            polygon.fill = stateColors[0];
          }
        else if (stateId === "BR-PI") {
            polygon.fill = stateColors[0];
          }
        else if (stateId === "BR-PB") {
            polygon.fill = stateColors[1];
          }
        else if (stateId === "BR-AL") {
            polygon.fill = stateColors[1];
          }
        else if (stateId === "BR-SE") {
            polygon.fill = stateColors[0];
          }
      });
    });


    var hoverState = polygonTemplate.states.create("hover");
    hoverState.properties.fill = "#bed2e8";


    var activeState = polygonTemplate.states.create("active");

    var zoomControl = new am4maps.ZoomControl();
    chart.zoomControl = zoomControl;
    zoomControl.slider.height = 10;
  });