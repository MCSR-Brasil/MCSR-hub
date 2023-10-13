
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
    console.log("Clicked State: " + stateName);

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
          polygon.fill = am4core.color("#3d8da8");
        }
        else if (stateId === "BR-RS") {
            polygon.fill = am4core.color("#bd751c");
          }         
        else if (stateId === "BR-RJ") {
            polygon.fill = am4core.color("#a83d81");
          }
        else if (stateId === "BR-SP") {
            polygon.fill = am4core.color("#8a202a");
          }  
        else if (stateId === "BR-DF") {
            polygon.fill = am4core.color("#3da891");
          } 
        else if (stateId === "BR-GO") {
            polygon.fill = am4core.color("#3d8da8");
          }  
        else if (stateId === "BR-MG") {
            polygon.fill = am4core.color("#bd751c");
          }
        else if (stateId === "BR-SC") {
            polygon.fill = am4core.color("#bd971c");
          }
        else if (stateId === "BR-PR") {
            polygon.fill = am4core.color("#bd8f1c");
          }
        else if (stateId === "BR-BA") {
            polygon.fill = am4core.color("#5ba83d");
          }    
        else if (stateId === "BR-AM") {
            polygon.fill = am4core.color("#3d8da8");
          }
        else if (stateId === "BR-PA") {
            polygon.fill = am4core.color("#3d8da8");
          }
        else if (stateId === "BR-RO") {
            polygon.fill = am4core.color("#3d8da8");
          }
        else if (stateId === "BR-RR") {
            polygon.fill = am4core.color("#3d8da8");
          }
        else if (stateId === "BR-AP") {
            polygon.fill = am4core.color("#3d8da8");
          }
        else if (stateId === "BR-CE") {
            polygon.fill = am4core.color("#3d8da8");
          }
        else if (stateId === "BR-RN") {
            polygon.fill = am4core.color("#3da891");
          }
        else if (stateId === "BR-TO") {
            polygon.fill = am4core.color("#3d8da8");
          }
        else if (stateId === "BR-MT") {
            polygon.fill = am4core.color("#3d8da8");
          }
        else if (stateId === "BR-MS") {
            polygon.fill = am4core.color("#3d8da8");
          }
        else if (stateId === "BR-ES") {
            polygon.fill = am4core.color("#3d8da8");
          }
        else if (stateId === "BR-PE") {
            polygon.fill = am4core.color("#3d8da8");
          }
        else if (stateId === "BR-MA") {
            polygon.fill = am4core.color("#3d8da8");
          }
        else if (stateId === "BR-PI") {
            polygon.fill = am4core.color("#3d8da8");
          }
        else if (stateId === "BR-PB") {
            polygon.fill = am4core.color("#3d8da8");
          }
        else if (stateId === "BR-AL") {
            polygon.fill = am4core.color("#3d8da8");
          }
        else if (stateId === "BR-SE") {
            polygon.fill = am4core.color("#3d8da8");
          }
      });
    });


    var hoverState = polygonTemplate.states.create("hover");
    hoverState.properties.fill = "#bed2e8";


    var activeState = polygonTemplate.states.create("active");
    console.log(activeState);

    var zoomControl = new am4maps.ZoomControl();
    chart.zoomControl = zoomControl;
    zoomControl.slider.height = 10;
  });