// Guess I'll start by fetching the variables

function fetchVariables(id){

    d3.json("samples.json").then((data)=> {
        var metadata = data.metadata;
        console.log(metadata);

        //filter demo info data by id
        var filterResult = metadata.filter(info => info.id.toString() === id)[0];

        var panelBody = d3.select("#sample-metadata");

        //empty the demo info panel each time before getting new data
        panelBody.html("");

        Object.entries(filterResult).forEach((key)=>{
            panelBody.append("p").text(key[0] + ":" + key[1]);
        });
    });
};

/////// This section contains the funtions for the charts ///////

function charts(id) {
    d3.json("samples.json").then((data)=> {
        
        var freqw_value = data.metadata.filter(f => f.id.toString() === id)[0];
        freqw_value = freqw_value.wfreq;
        console.log("Freq washing: " + freqw_value); 
        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        
  
        // Extracting the top 10 sample values

        var S_values = samples.sample_values.slice(0, 10).reverse();
        console.log("Top 10 samples: " + S_values);
        var OTU = (samples.otu_ids.slice(0, 10)).reverse();
        var OTU_id = OTU.map(d => "OTU " + d)
  
        // Top 10 samples for the plot.

        var labels = samples.otu_labels.slice(0, 10).reverse();
        console.log("labels: " + labels);
  
        // create trace variable for the plot
        var trace = {
            x: S_values,
            y: OTU_id,
            text: labels,
            marker: {
                color: 'rgb(55, 128, 191)'},
            type:"bar",
            orientation: "h",
        };
  
        // create data variable
        var data = [trace];
  
  
        // Barchart
        
        Plotly.newPlot("bar", data);
      
        // The bubble chart
        var bubble_trace = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels
  
        };
  
        // set the layout for the bubble plot
        var bubble_form = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1200
        };
  
        // creating data variable 
        var data_bubble = [bubble_trace];
  
        // create the bubble plot
        Plotly.newPlot("bubble", data_bubble, bubble_form); 
  
        // Gauge chart
        var gauge_data = [
          {
          domain: { x: [0, 1], y: [0, 1] },
          value: freqw_value,
          title: {text: `Belly Button Washing Frequency`},
          type: "indicator",
          
          mode: "gauge+number",
          gauge: { axis: { range: [null, 9] },
                   steps: [
                    {range: [0, 1], color: "white"},
                    {range: [1, 2], color: "white"},
                    {range: [2, 3], color: "yellow"},
                    {range: [3, 4], color: "yellow"},
                    {range: [4, 5], color: "orange"},
                    {range: [5, 6], color: "orange"},
                    {range: [6, 7], color: "red"},
                    {range: [7, 8], color: "red"},
                    {range: [8, 9], color: "black"}
                  ]}
              
          }
        ];
        var gauge_form = { 
            width: 700, 
            height: 600, 
            margin: { t: 20, b: 40, l:100, r:100 } 
          };
        Plotly.newPlot("gauge", gauge_data, gauge_form);
      });
  }  

  // funtion to get dataset for the drowdown

function init() {
    d3.json("samples.json").then((data)=> {

        //dropdown menu
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

//Event funtion
function optionChanged(id){
    charts(id);
    fetchVariables(id);
};