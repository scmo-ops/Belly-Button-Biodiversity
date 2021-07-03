
// this section reads the data from the json file

function init(){
    d3.json("data/samples.json").then((data) => {

        //  Create the Traces

        var trace1 = {
            // Values for the bar chart
            x: samples.otu_ids,
            y: samples.sample_values,
            text: samples.otu_labels,
            type: 'bar',
            name: 'top 10 OTUs',
            orientation: 'h'
        };
}