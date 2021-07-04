// Fetching the variable IDS from the big json file

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
    });
  }

// In this section is the table

funtion charts(sample) {
    d3.json("samples.json").then((data) => {
        var samples= data.samples;
        var resultsarray= samples.filter(sampleobject => 
            sampleobject.id == sample);
        var result= resultsarray[0]
        var ids = result.otu_ids;
        var labels = result.otu_labels;
        var values = result.sample_values;

        // now we build a bar chart and a bubble chart using the data

        // Bar chart

        var data_Bchart = [
            {
                y:ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
                x:values.slice(0,10).reverse(),
                text:labels.slice(0,10).reverse(),
                type:"bar",
                orientation:"h"
            }
        ];

        var layout_bar = {
            title: 'Top ten bacteria found in pacient'
            //margin: { t:30, l:150}
        };

        Plotly.newPlot('bar', data_Bchart, layout_bar);
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
  