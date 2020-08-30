// Create a function for plotting the Data
function getPlot(id) {
    // Retrieve data from the 'samples.json' file
    d3.json("Data/samples.json").then((data)=> {
        console.log(data);
        
        // Map data from 'wfreq' section and upload to the console
        var wfreq = data.metadata.map(d => d.wfreq)
        console.log(`Washing Freq: ${wfreq}`)

        // Filter sample values by id
        var samples = data.samples.filter(s => s.id.toString() === id)[0];

        console.log(samples);

        // Retrieving the top 10 sample values
        var samplevalues = sample.sample_values.slice(0, 10).reverse();

        // Retrieve only the top 10 otu ids for the plot OTU
        var OTU_top = (samples.otu_ids.slice(0, 10)).reverse();

        // Move the otu id's to the desired form of the plot
        var OTU_id = OTU_top.map(d => "OTU " + d);

        // console.log(`OTU IDs: ${OTU_id}`);

        // Retrieve the top 10 labels for the plot
        var labels = samples.otu_labels.slice(0, 10);

        // console.log(`Sample Values: ${samplevalues}`);
        // console.log(`ID Values: ${OTU_top}`);

        // Create a trace object for the plot
        var trace = {
            x: samplevalues,
            y: OTU_id,
            text: labels,
            marker: {
                color: '#2F4F4F'
            },
            type: "bar",
            orientation: "h",
        };

        // Create data variable for trace object
        var data = [trace];

        // Use layout to display titles and set margins
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode: "linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };

        // Create the bar plot
        Plotly.newPlot("bar", data, layout);

        // console.log(`ID: ${samples.otu_ids}`);

        // Create a trace object for the bubble chart
        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels
        };

        // Use the layout to display titles and dimensions for the bubble plot
        var layout1 = {
            xaxis: {title: "OTU_ID"},
            height: 600,
            width: 1000
        };

        // Create data variable for other trace object
        var data1 = [trace1];

        // Create the bubble plot
        Plotly.newPlot("bubble", data1, layout1);

        // Create the guage chart

    var data_g = [
        {
        domain: { x: [0, 1], y: [0, 1] },
        value: parseFloat(wfreq),
        title: { text: `Weekly Washing Frequency ` },
        type: "indicator",

        mode: "gauge+number",
        gauge: { axis: { range: [null, 9] },
                 steps: [
                     { range: [0, 2], color: "yellow" },
                     { range: [2, 4], color: "aqua" },
                     { range: [4, 6], color: "blue-green" },
                     { range: [6, 8], color: "yellow-green" },
                     { range: [8, 9], color: "green" },
                 ]}
        }
    ];
    var layout_g = {
        width: 700,
        height: 600,
        margin: { t: 20, b: 40, l: 100, r: 100 }
    }
    Plotly.newPlot("gauge", data_g, layout_g);
    });
}
//  Create the function to retrieve the data
function getInfo(id) {
    // read the json file
    d3.json("Data/samples.json").then((data) => {

       // Retrieve the metadata info showing the demographics
       var metadata = data.metadata; 
       console.log(metadata);

       // Filter meta data info by id
       var result = metadata.filter(meta => meta.id.toString() === id)[0];

       // Select demographic panel for inserting data
       var demographicInfo = d3.select("#sample-metadata");

       // Clear demographic info before getting new id info on each run
       demographicInfo.html("");

       // Retrieve the data for the id and add info to the panel
       Object.entries(result).forEach((key) => {
           demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
       });
    });
}

// Create the function for the change event
function optionChanged(id) {
    getPlot(id);
    getInfo(id);
}

// Create the function for initial data rendering
function init() {
    // Select dropdown menu
    var dropdown = d3.select("#selDataset");

    // Read the data
    d3.json("Data/samples.json").then((data) => {
        console.log(data)
    

    // Transfer the id data to the dropdown menu
    data.names.forEach(function(name) {
        dropdown.append("option").text(name).property("value");
    });

    // Display the data and plots to the page
    getPlot(data.names[0]);
    getInfo(data.names[0]);
    });
}

init();