// Set the dimensions and margins of the graph
const margin = {top: 60, right: 30, bottom: 70, left: 200},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Append the svg object to the body of the page
const svg = d3.select(svg)
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// X axis
const x = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.Citations)])
  .range([0, width]);
svg.append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Y axis
const y = d3.scaleBand()
  .range([0, height])
  .domain(data.map(d => d.Title))
  .padding(.1);
svg.append("g")
  .call(d3.axisLeft(y));

// Bars
svg.selectAll("myRect")
  .data(data)
  .join("rect")
  .attr("x", x(0) )
  .attr("y", d => y(d.Title))
  .attr("width", d => x(d.Citations))
  .attr("height", y.bandwidth())
  .attr("fill", "#4b88a2")
  .on("mouseover", function(event, d) {
    tooltip.transition()
      .duration(200)
      .style("opacity", .9);
    tooltip.html(`Title: ${d.Title}<br>Citations: ${d.Citations}<br>Year: ${d.Year}`)
      .style("left", (event.pageX) + "px")
      .style("top", (event.pageY - 28) + "px");
  })
  .on("mouseout", function(d) {
    tooltip.transition()
      .duration(500)
      .style("opacity", 0);
  });

// Title
svg.append("text")
  .attr("x", width / 2)
  .attr("y", 0 - (margin.top / 2))
  .attr("text-anchor", "middle")
  .style("font-size", "16px")
  .text("Impact of Research Publications");

// X axis label
svg.append("text")
  .attr("text-anchor", "middle")
  .attr("x", width/2)
  .attr("y", height + margin.top + 20)
  .text("Number of Citations");

// Tooltip
const tooltip = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0)
  .style("position", "absolute")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "1px")
  .style("border-radius", "5px")
  .style("padding", "10px");
