function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("static/js/samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("static/js/samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("static/js/samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var samplesArray = samples.filter(x => x.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var firstSample = samplesArray[0];
    console.log(firstSample);

    // D3.1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    var metadataArray = metadata.filter(x => x.id == sample)
    // D3.2. Create a variable that holds the first sample in the metadata array.
    var firstMetaSample = metadataArray[0];
    // D3.3. Create a variable that holds the washing frequency.
    var wfreqs = firstMetaSample.wfreq;
    console.log(wfreqs);


    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds = firstSample.otu_ids;
    var otuLabels = firstSample.otu_labels;
    var sampleValues = firstSample.sample_values;


    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    
    var sortedValues = sampleValues.sort((a, b) => b - a);
    var slicedValues = sortedValues.slice(0,10);
    var reverseValues = slicedValues.reverse();
    // var sortedValues = (otuIds.slice(0,10).reverse().map(x => (`OTU ${x}`)));
    var yticks = (otuIds.slice(0,10).reverse().map(x => (`OTU ${x}`)));
    // console.log(yticks);
    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: reverseValues,
      y: yticks,
      orientation: 'h',
      type: "bar",
      text: otuLabels
      }
      
    ];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Tornado Magnitude Chart",
      height: 450,
      width: 450    
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);
  
    // // DELIVERABLE 2 //
    // // 1. Create the trace for the bubble chart.
    // var bubbleData = [{
    //   x: otuIds,
    //   y: sampleValues,
    //   text: otuLabels,
    //   mode: "markers",
    //   marker: {
    //     opacity: [0.8],
    //     size: sampleValues,
    //     color: otuIds,
    //     colorscale: "Earth",
    //     type: "heatmap"
    //   }
    // }];
  
    // // 2. Create the layout for the bubble chart.
    // var bubbleLayout = {
    //   title: "Bacteria Cultures per Sample",
    //   // width: 1134,
    //   // height: 450,
    //   xaxis: {title:"OTU ID",
    //     linecolor: "black",
    //     linewidth: 2,
    //     mirror: true},
    //   yaxis: {
    //     linecolor: "black",
    //     linewidth: 2,
    //     mirror: true
    //   },
    //   showlegend: false,
    //   hovermode: "closest",
    //   hoverdistance: 10
    // };

    // // 3. Use Plotly to plot the data with the layout.
    // Plotly.newPlot("bubble", bubbleData, bubbleLayout); 

    // DELIVERABLE 3 //
    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      domain: { x: [0, 1], y: [0, 1] },
      value: wfreqs,
      title: { text: "<b>Tornado Frequency</b>"},
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: {range: [null, 10], tickwidth: 1, tickcolor: "darkblue", nticks: 10},
        bar: {color: "darkblue"},
        steps: [
          {range: [0, 2], color: "#a12807"},
          {range: [2, 4], color: "#ec8d06"},
          {range: [4, 6], color: "#fbff53"},
          {range: [6, 8], color: "#6ef44a"},
          {range: [8, 10], color: "#84d4ff"}
        ],
        
      }

    }];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 450,
      height: 450,    
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
};
