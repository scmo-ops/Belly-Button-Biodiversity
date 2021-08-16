// Fetching the variable IDS from the big json file


function fetchVariables(id){
    d3.json("samples.json").then((data)=> {
        var metadata = data.metadata;
        console.log(metadata)

        // Filtering the data by ID

        var resultsFilter = metadata.filter(info => info.id.toString() === id)[0];

        // insert in html

        var panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(resultsFilter).forEach((key)=>{
            panel.append("p").text(key[0] + ":" + key[1]);
        });
    });
};



// This section contains the charts

function charts(id) {

    // Connect to the json file.

    d3.json("data/samples.json").then((data)=> {
        
        //filter frecuencies value by id
        var frecuencies = data.metadata.filter(f => f.id.toString() === id)[0];
        frecuencies = frecuencies.frecuencies;
        console.log("Washing Freq: " + frecuencies);
        
        // filter samples+ values by id 
        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        
  
        // Top 10 samples and top 10 with the OTU id's
        var sampleValue = samples.sample_values.slice(0, 10).reverse();
        console.log("Best samples: " + sampleValue);
  
        var OTU = (samples.otu_ids.slice(0, 10)).reverse();
        
        var OTU_id = OTU.map(d => "OTU " + d)
  
        // get the top 10 labels for the charts and reversing it.
        var labels = samples.otu_labels.slice(0, 10).reverse();
        console.log("labels: " + labels);
  
        // Trace variables
        var trace = {
            x: sampleValue,
            y: OTU_id,
            text: labels,
            marker: {
              color: 'Blue'},
            type:"bar",
            orientation: "h",
        };
  
        // Join the data to the trace variables
        var data = [trace];

        ////// Section for the charts //////
  
  
        // Bar chat

        //// I decided to use chartsly since it proves to be very easy to use and very effective ////

        chartsly.newcharts("bar", data);
      
        // The bubble chart
        var New_trace = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels
  
        };
  
        var bubble_layout = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1200
        };
  
        var buble_data = [New_trace];
  
        chartsly.newcharts("bubble", buble_data, bubble_layout); 
  
        // Guage chart
        var Guage_data = [
          {
          domain: { x: [0, 1], y: [0, 1] },
          value: frecuencies,
          title: {text: `Belly Button Washing Frequency`},
          type: "indicator",
          
          mode: "gauge+number",
          gauge: { axis: { range: [null, 9] },
                   steps: [
                    {range: [0, 1], color: "white"},
                    {range: [1, 2], color: "white"},
                    {range: [2, 3], color: "white"},
                    {range: [3, 4], color: "white"},
                    {range: [4, 5], color: "white"},
                    {range: [5, 6], color: "white"},
                    {range: [6, 7], color: "white"},
                    {range: [7, 8], color: "white"},
                    {range: [8, 9], color: "white"}
                  ]}
              
          }
        ];
        var Gauge_layout = { 
            width: 700, 
            height: 600, 
            margin: { t: 20, b: 40, l:100, r:100 } 
          };
        chartsly.newcharts("gauge", Guage_data, Gauge_layout);
      });
  }  

function init() {
    //read the data
    d3.json("samples.json").then((data)=> {

        //get the name id to the dropdown menu
        data.names.forEach((name) => {
            d3.select("#selDataset")
            .append("option")
            .text(name)
            .property("value");
        });
        charts(data.names[0]);
        fetchVariables(data.names[0]);
    });
};
init();

//change event function
function optionChanged(id){
    charts(id);
    fetchVariables(id);
};