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
        
        