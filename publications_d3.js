const margin = {top: 20, right: 30, bottom: 40, left: 90},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

const svg = d3.select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

d3.json("publications.json").then(data => {
  const x = d3.scaleLinear()
    .domain([0, d3.max(data, d => +d.Citations)])
    .range([0, width]);

  const y = d3.scaleBand()
    .domain(data.map(d => d.Title))
    .range([0, height])
    .padding(0.1);

  svg.append("g")
    .call(d3.axisLeft(y).tickSize(0).tickPadding(10))
    .style("font-family", "Roboto Mono");

  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", x(0))
    .attr("y", d => y(d.Title))
    .attr("width", d => x(+d.Citations))
    .attr("height", y.bandwidth())
    .attr("fill", "#69b3a2")
    .on("mouseover", function(event, d) {
      const [x, y] = d3.pointer(event);
      d3.select("#tooltip")
        .style("left", `${x}px`)
        .style("top", `${y}px`)
        .select("#value")
        .text(`${d.Title}\nCitations: ${d.Citations}\nDOI: ${d.DOI}`);

      d3.select("#tooltip").classed("hidden", false);
    })
    .on("mouseout", function() {
      d3.select("#tooltip").classed("hidden", true);
    });

  d3.select("body").append("div")
    .attr("id", "tooltip")
    .attr("class", "hidden")
    .append("p")
    .append("span")
    .attr("id", "value");
});
