// script.js
document.addEventListener("DOMContentLoaded", function() {
    // Set the dimensions of the graph
    const width = 800;
    const height = 500;

    // Create the SVG container for the chart
    const svg = d3.select("#chart")
        .attr("width", width)
        .attr("height", height);

    // Define margins for the plot area
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;

    // Create a group for the chart area
    const chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Load the CSV data
    d3.csv("DailyValue.csv").then(function(data) {
        // Convert x and y values to numbers
        data.forEach(d => {
            d.x = +d.x;
            d.y = +d.y;
        });

        // Set up the x and y scales
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.x)])
            .range([0, plotWidth]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.y)])
            .range([plotHeight, 0]);

        // Create x and y axes
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        // Append the axes to the chart
        chartGroup.append("g")
            .attr("transform", `translate(0,${plotHeight})`)
            .call(xAxis);

        chartGroup.append("g")
            .call(yAxis);

        // Add data points as circles (scatter plot)
        chartGroup.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d.x))
            .attr("cy", d => yScale(d.y))
            .attr("r", 5)
            .attr("fill", "steelblue");

        // Add labels to the axes
        chartGroup.append("text")
            .attr("x", plotWidth / 2)
            .attr("y", plotHeight + margin.bottom - 5)
            .style("text-anchor", "middle")
            .text("X Value");

        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -plotHeight / 2)
            .attr("y", -margin.left + 10)
            .style("text-anchor", "middle")
            .text("Y Value");
    }).catch(function(error) {
        console.log("Error loading the CSV file: " + error);
    });
});
