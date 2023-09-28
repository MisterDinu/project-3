let counter=1;
let myMap=null

function optionChanged(value){
    let dropdownMenu = d3.select("#selDataset1");
    let seleted_option=dropdownMenu.property("value");
    ////////////////////////////////////////////////////////////////////////////7
    /////////////////////////////////////retrieving data
    if (value == undefined) {
        console.log("EN ESPERA");
      }
       else {
        url_data="http://127.0.0.1:5001/COUNT/suicidio/"
        year=value
        url_data+=year

        d3.json(url_data).then(function(suicidios){
        _idlist=[]
        count_s=[]
        for (let i=0;i<suicidios.length;i++){
            //getting the samples
            _idlist.push(suicidios[i]._id);
            //getting de metadata
            count_s.push(suicidios[i].count);
        }
        barchart(_idlist,count_s,year);
})
    
      }
    
    
    

    }

function barchart(id,count,year){
    //settin the data to plot
    let trace1 = {
      x: count,
      y: id,
      text: year,
      type: "bar",
      orientation: "h"
    };
  
    let traceData = [trace1];
    
    // Apply a title to the layout
    let layout = {
      height: 500,
      width: 800
    };
    Plotly.newPlot("bar", traceData, layout);
  
  };

function suicide_info(anos){
    d3.json("http://127.0.0.1:5001/alcaldias_keys").then(function(alcaldias){
    alca_keys=[]
    alca_keys.push(Object.values(alcaldias))
 
    delitos_keys(anos,alcaldias)
    return alcaldias
    
})

}

d3.json("http://127.0.0.1:5001/anos_keys").then(function(anos){
    //setting show boxez
    years_to_show=[2018,2019,2020,2021,2022,2023]
    //show years
    for (let i=0;i<years_to_show.length;i++){
        d3.selectAll("#selDataset1").append("option").text(years_to_show[i])
    }
    
    //starts bar chart in 2018
    d3.json("http://127.0.0.1:5001/COUNT/suicidio/2018").then(function(suicidios){
    year=2016
    _idlist=[]
    count_s=[]
    for (let i=0;i<suicidios.length;i++){
        //getting the samples
        _idlist.push(suicidios[i]._id);
        //getting de metadata
        count_s.push(suicidios[i].count);
    }

    barchart(_idlist,count_s,year);
    d3.selectAll("#selDataset").on("change", a=optionChanged());

    })
})


//Start map with a given URL

d3.json("http://127.0.0.1:5001/anos_keys").then(function(anos){
     //Setting start map on suicidues 2017
     map_url="http://127.0.0.1:5001/MAPAS/INFO"

    d3.json(map_url).then(function(location){
        _idlist=[]
        count_s=[]
        createFeatures(location);
        
    })
    
    //Setting info for map
    
})

function createFeatures(location) {
    console.log("creating features")
    //Setting up list for easier acces to the info
    delitos_markers=[]
    for (let i = 0; i < location.length; i++) {
      // Setting the circle marker
      delitos_markers.push(L.circle([location[i].latitud,location[i].longitud],{
        stroke: false,
        fillOpacity: 10,
        color: 'red',
        fillColor: 'red',
        fillOpacity:"0.5",
        radius: 50
        
      }).bindPopup(`<h3>${"Delito: "+location[i].Delito}</h3><hr><h5>${"Categoria: "+location[i].Categoria }</h5><hr><h5>${"Alcaldia: "+location[i].Alcaldia}</h5>`));





        };
    // Send our earthquakes layer to the createMap function/

    let circle_layer = L.layerGroup(delitos_markers);
    createMap(circle_layer);
    //console.log(earthquakeData)
  }
  
function createMap(circle_layer) {
    console.log("Creating maps")
// Define variables for our tile layers.
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Only one base layer can be shown at a time.
let baseMaps = {
  Street: street,
  Topography: topo
};

// Overlays that can be toggled on or off
let overlayMaps = {
  Cities: circle_layer
};

// Create a map object, and set the default layers.
let myMap = L.map("map", {
  center: [19.4326018,  -99.1332049],
  zoom: 10,
  layers: [street, circle_layer]
});

// Pass our map layers into our layer control.
// Add the layer control to the map.
L.control.layers(baseMaps, overlayMaps).addTo(myMap);

  }


  


  
