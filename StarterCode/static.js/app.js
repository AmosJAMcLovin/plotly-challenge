// Create a function for plotting the Data
function getPlot(id) {
    // Retrieve data from the 'samples.json' file
    d3.json("data/samples.json").then((data)=> {
        console.log(data);
        
        // Map data from 'wfreq' section and upload to the console
        var wfreq = data.metadata.map(d => d.wfreq)
        console.log(`Washing Freq: ${wfreq}`)

        // Filter sample values by id
        var samples = data.samples.filter(s => s.id.toString() === id)[];

        console.log(samples);

        // Retrieving the top 10 sample values
        var samplevalues = sample.sample_values.slice(0, 10)).reverse();

        // Retrieve only the top 10 otu ids for the plot OTU
        var OTU_top = (samples.otu_ids.slice(0, 10)).reverse();

        // Move the otu id's to the desired form of the plot


    }
}