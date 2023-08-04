// Use the D3 library to read samples.json from the url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//retrieve the data
d3.json(url).then(function ({ names }) {

    names.forEach(name => {
        d3.select('select').append('option').text(name);
    });
    optionChanged();
});

const optionChanged = () => {

    let choice = d3.select('select').node().value;
    //console.log(choice);

    d3.json(url).then(({ metadata, samples }) => {

        let sample = samples.filter(obj => obj.id == choice)[0];
        let meta = metadata.filter(obj => obj.id == choice)[0];
        console.log(sample, meta);

        d3.select(".panel-body").html("")
        Object.entries(meta).forEach(([key, val]) => {
            console.log(`${key.toUpperCase()}: ${val}`)
            d3.select(".panel-body").append("h5").text(`${key.toUpperCase()}: ${val}`)
        });

        let {sample_values , otu_ids , otu_labels} = sample;
        let wash_frequency = meta.wash_frequency;

        var data = [
            {
              x: sample_values.slice(0,10).reverse() ,
              y: otu_ids.slice(0,10).reverse().map(x => `OTU ${x}` ),
              text: otu_labels.slice(0,10).reverse(),
              type: 'bar',
              orientation : "h"
            }
          ];
          
          Plotly.newPlot('bar', data);

        
          var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: wash_frequency, 
                title: { text: "Belly Button Washing Frequency" },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    axis: { range: [null, 9] }, 
                    steps: [
                        { range: [0, 1], color: "rgb(232, 243, 216)" },
                        { range: [1, 2], color: "rgb(207, 233, 185)" },
                        { range: [2, 3], color: "rgb(182, 222, 154)" },
                        { range: [3, 4], color: "rgb(157, 211, 123)" },
                        { range: [4, 5], color: "rgb(132, 200, 92)" },
                        { range: [5, 6], color: "rgb(107, 190, 61)" },
                        { range: [6, 7], color: "rgb(82, 179, 30)" },
                        { range: [7, 8], color: "rgb(57, 169, 0)" },
                        { range: [8, 9], color: "rgb(32, 158, 0)" }
                    ],
                    threshold: {
                        line: { color: "red", width: 4 }, 
                        thickness: 0.75,
                        value: wash_frequency 
                    }
                }
            }
        ];
    
        Plotly.newPlot('gauge', data);

          var trace1 = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: 'Earth'
            },
            text: otu_labels
        };
        
        var data = [trace1];
        
        var layout = {
            title: 'OTU ID',
            showlegend: false,
            height: 900,
            width: 700,
            hovermode: "closest"
        };
        
        Plotly.newPlot('bubble', data, layout);
        
          // var trace1 = {
          //   x: otu_ids.map(x => `OTU ${x}` ),
          //   y: sample_values,
          //   mode: 'markers',
          //   marker: {size: `${key.toUpperCase()}: ${val}`, color: , colorscale: 'Earth'
          //   }
          // };
          
          // var data = [trace1];
          
          // var layout = {
          //   title: 'OTU ID',
          //   showlegend: false,
          //   height: 900,
          //   width: 700,
          //   hovermode: "closest"
            
          // };
          
          // Plotly.newPlot('bubble', data, layout);
        
          


    })
}


