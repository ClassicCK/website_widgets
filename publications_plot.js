// publications_plot.js
function createVisualization(data, width, height) {
  // Set the dimensions and margins of the graph
  var margin = {top: 30, right: 30, bottom: 70, left: 60},
      width = width - margin.left - margin.right,
      height = height - margin.top - margin.bottom;

  // Append the svg object to the body of the page
  var svg = d3.select("#visualization")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // X axis
  var x = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return d.Citations; })])
    .range([0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Y axis
  var y = d3.scaleBand()
    .range([height, 0])
    .domain(data.map(function(d) { return d.Year; }))
    .padding(.1);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Bars
  svg.selectAll("myRect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", x(0))
    .attr("y", function(d) { return y(d.Year); })
    .attr("width", function(d) { return x(d.Citations); })
    .attr("height", y.bandwidth())
    .attr("fill", "#4b88a2");
}
