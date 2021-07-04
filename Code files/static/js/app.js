// Fetching the variables from the big json file

function fectchvariables(vnum) {
    d3.json("samples.json").then((data) => {
      var metadata= data.metadata;
      var numarray= metadata.filter(sampleobject => 
        sampleobject.id == vnum);
      var result= numarray[0];

      // insert in html
      
      var panel = d3.select("#sample-metadata");
      panel.html("");
      Object.entries(result).forEach(([key, value]) => {
        panel.append("h6").text(`${key}: ${value}`);
      });
  
    //buildGauge(result.wfreq)
  
  
  
    });
  }


// this section reads the data from the json file

d3.json("data/data.json").then((importedata) => {
    // console.log(importedData);
    var data = importedata;
  
    data.sort(function(a, b) {
      return parseFloat(b.greekSearchResults) - parseFloat(a.greekSearchResults);
    });
  
    // Slice the first 10 objects for plotting
    data = data.slice(0, 10);
  
    // Reverse the array due to Plotly's defaults
    data = data.reverse();
  
    // Trace1 for the Greek Data
    var trace1 = {
      x: data.map(row => row.greekSearchResults),
      y: data.map(row => row.greekName),
      text: data.map(row => row.greekName),
      name: "Greek",
      type: "bar",
      orientation: "h"
    };
  
    // data
    var chartData = [trace1];
  
    // Apply the group bar mode to the layout
    var layout = {
      title: "Greek gods search results",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };
  
    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("plot", chartData, layout);
  });
  