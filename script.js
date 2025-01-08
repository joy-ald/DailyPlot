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

    // Load the CSV data from GitHub (replace with your CSV URL)
    d3.csv("https://raw.githubusercontent.com/joy-ald/DailyPlot/refs/heads/main/DailyValue.csv").then(function(data) {
        // Convert x, y1, and y2 values to numbers
        data.forEach(d => {
            d.x = +d.x;
            d.y1 = +d.y1;
            d.y2 = +d.y2;
        });

        // Set up the x scale (same for both y1 and y2)
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.x)])
            .range([0, plotWidth]);

        // Set up the y scale for both y1 and y2
        const yScale = d3.scaleLinear()
            .domain([0, Math.max(d3.max(data, d => d.y1), d3.max(data, d => d.y2))])
            .range([plotHeight, 0]);

        // Create the x and y axes
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        // Append the axes to the chart
        chartGroup.append("g")
            .attr("transform", `translate(0,${plotHeight})`)
            .call(xAxis);

        chartGroup.append("g")
            .call(yAxis);

        // Add data points for y1 as circles
        chartGroup.selectAll(".circle-y1")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d.x))
            .attr("cy", d => yScale(d.y1))
            .attr("r", 5)
            .attr("fill", "steelblue")
            .attr("class", "circle-y1");

        // Add data points for y2 as squares
        chartGroup.selectAll(".square-y2")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", d => xScale(d.x) - 3)
            .attr("y", d => yScale(d.y2) - 3)
            .attr("width", 6)
            .attr("height", 6)
            .attr("fill", "orange")
            .attr("class", "square-y2");

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
