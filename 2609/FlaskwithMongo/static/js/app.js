function optionChanged_map(value){
    //gettting selected_options
    let dropdownMenu_delitos = d3.select("#selDataset2");
    let dropdownMenu_anos = d3.select("#selDataset3");
    let delito_option=dropdownMenu_delitos.property("value");
    let ano_option=dropdownMenu_anos.property("value");
    //Setting botton value
    map_url="http://127.0.0.1:5001/"
    map_url+=delito_option
    map_url+="/"
    map_url+=ano_option
    console.log(map_url)
    d3.json(map_url).then(function(location)
    {
       console.log(location[0])
       location={}
       _id=[]
       latitud=[]
        longitud=[]
        for (let i=0;i<location.length;i++){
            latitud[i]=JSON.stringify(location[i])

    }
    console.log(typeof(location))

    })

    
    
    

    }


function optionChanged(value){
    let dropdownMenu = d3.select("#selDataset1");
    let seleted_option=dropdownMenu.property("value");
    ////////////////////////////////////////////////////////////////////////////7
    /////////////////////////////////////retrieving data
    if (value == undefined) {
        console.log("EN ESPERA");
      }
       else {
        url_data="http://127.0.0.1:5001/LPERDIDA%20DE%20LA%20VIDA%20POR%20SUICIDIO/"
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
    years_to_show=[2016,2017,2018,2019,2020,2021,2022,2023]
    //show years
    for (let i=0;i<years_to_show.length;i++){
        d3.selectAll("#selDataset1").append("option").text(years_to_show[i])
    }
    //show delitos
    d3.json("http://127.0.0.1:5001/delitos_keys").then(function(delitos)
    {
        for (let i=0;i<delitos.length;i++){
            d3.selectAll("#selDataset2").append("option").text(delitos[i])
        }

    })
    //show year
    for (let i=0;i<years_to_show.length;i++){
        d3.selectAll("#selDataset3").append("option").text(years_to_show[i])
    }


    //starts bar chart in 2017
    d3.json("http://127.0.0.1:5001/LPERDIDA%20DE%20LA%20VIDA%20POR%20SUICIDIO/2017").then(function(suicidios){
    year=2017
    _idlist=[]
    count_s=[]
    for (let i=0;i<suicidios.length;i++){
        //getting the samples
        _idlist.push(suicidios[i]._id);
        //getting de metadata
        count_s.push(suicidios[i].count);
    }
    console.log(_idlist)
    barchart(_idlist,count_s,year);
    d3.selectAll("#selDataset").on("change", a=optionChanged());
    return suicidios

    })
})


//Start map with a given URL

d3.json("http://127.0.0.1:5001/anos_keys").then(function(anos){
     //Setting start map on suicidues 2017
     map_url="http://127.0.0.1:5001/"
     map_url+='ABANDONO DE PERSONA'
     map_url+="/"
     map_url+=2016
     console.log(map_url)
    //starts bar chart in 2017
    d3.json(map_url).then(function(location){
    var coordinates=location
        _idlist=[]
    count_s=[]
    for (let i=0;i<location.length;i++){
        //getting the samples
        location[i]=location[i].tostr
    }
    A=d3.keys(coordinates)
    console.log(A)
    //createFeatures(location);
    //On change for map
    //d3.selectAll("#selDataset3").on("change", a=optionChanged_map());

    })
    //Setting info for map

})





