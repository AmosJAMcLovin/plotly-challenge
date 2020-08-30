// Create a function for plotting the Data
function buildMetadata(sample) {
    // Complete the following function that builds the Metadata panel

    // Use `d3.json` to fetch the Metadata for a sample
    d3.json(`/metadata/${sample}`).then((data) => {
        // Use d3 to select panel with id of `#sample-metadata`
        var panel = d3.select("#sample-metadata");
        // Use `.html("") to empty any existing metadata
        panel.html("");
        // Use `Object.entries` to add each key and value to the panel
        Object.entries(data).forEach(([key, value]) => {
            panel.append("h6").text(`${key}:${value}`);
        })
        // OPTIONAL: Build Gauge chart
        buildGauge(data.WFREQ);
    })
}

function buildCharts(sample) {

    // Use `d3.json` to fetch the sample data for the plots
    d3.json(`/samples/${sample}`).then((data) => {
        // Build a bubble chart using the sample data
        const otu_ids = data.otu_ids;
        const otu_labels = data.otu_labels;
        const sample_values = data.sample_values;
        // Build a bar chart
        let bubbleLayout = {
            margin { t: 0},
            hovermode: "closests",
            xaxis: {title: "OTU ID"}
        }

        let bubbleData = [
            {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: "markers",
                marker: {
                    size: sample_values,
                    color: otu_ids,
                    colorscale: "Earth"
                }
            }
        ]

        Plotly.plot("bubble", bubbleData, bubbleLayout);

        // Top 10 otu_ids and otu_labels 
        let barData = [
            {
                values: sample_values.slice(0, 10),
                labels: otu_ids.slice(0, 10),
                hovertext: otu_labels.slice(0, 10),
                hoverinfo: "hovertext",
                type: "bar"
            }
        ];

        let barLayout = {
            barmode: 'stack'
        };

        Plotly.plot("bar", barData, barLayout)
    })
}

function init() {
    // Select a reference to the dropdown select element
    var selector = d3.select("#selDataset");

    // Use the list of sample names to display multiple options
    d3.json("/names").then((sampleNames) => {
        sampleNames.forEach((sample) => {
            selector
              .append("option")
              .text(sample)
              .property("value", sample);
        });

        // Use the first sample from the list to build plots
        const firstSample = sampleNames[0];
        buildCharts(firstSample);
        buildMetadata(firstSample);
    });
}

function optionChanged(newSample) {
    // Fetches new data every time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
}

// Initialize the Dashboard
init();
        