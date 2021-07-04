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
function charts(sample) {
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var resultsarray = samples.filter(sampleobject => 
            sampleobject.id == sample);
        var result = resultsarray[0]
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

        // Bubble chart

        var data_BBchart = [
            {
                x:ids,
                y: values,
                text: labels,
                mode: 'markers',
                marker: {
                    color: ids,
                    size: values
                }
            }
        ];

        var layout_bubble = {
            //margin: { t:0},
            xaxis: {title: 'OTU ID'},
            hovermode: 'closest',
            title: 'Bubble chart of OTUs'
        };

        Plotly.newPlot('bubble', data_BBchart, layout_bubble);
    });
}

// section for the dropdown that's going to be added
function init() {
    var section = d3.select('#selDataset');
// adds the info to the table
d3.json("samples.json").then((data) => {
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector.append("option").text(sample).property("value", sample);
    });
    // this add the top 10 results to the charts
    const firstSample = sampleNames[0];
    charts(firstSample);
    fectchvariables(firstSample);
  });
  }
  
function optionChanged(newSample) {
    charts(newSample);
    fectchvariables(newSample);
}

init();
  