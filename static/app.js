// Fetching the variable IDS from the big json file


function fetchVariables(id){
    d3.json("samples.json").then((data)=> {
        var metadata = data.metadata;

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

    d3.json("samples.json").then((data)=> {
        
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
  
        