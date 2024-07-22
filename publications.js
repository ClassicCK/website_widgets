library(r2d3)

# Your publication data
publications <- data.frame(
  Title = c(
    "Continent-wide tree fecundity driven by indirect climate effects",
    "Is there tree senescence? The fecundity evidence",
    "North American tree migration paced by climate in the West, lagging in the East",
    "Limits to reproduction and seed size-number trade-offs that shape forest dominance and future recovery",
    "Temperature and CO2 interactively drive shifts in the compositional and functional structure of peatland protist communities"
  ),
  Citations = c(75, 54, 41, 27, 2),
  Year = c(2021, 2021, 2022, 2022, 2024)
)

# D3 script
d3_script <- "
// Set the dimensions and margins of the graph
var margin = {top: 60, right: 30, bottom: 50, left: 60},
    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

// Append the svg object to the body of the page
var svg = d3.select(svg)
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// X axis
var x = d3.scaleLinear()
  .domain([0, d3.max(data, function(d) { return d.Citations; })])
  .range([ 0, width]);
svg.append('g')
  .attr('transform', 'translate(0,' + height + ')')
  .call(d3.axisBottom(x))
  .selectAll('text')
    .attr('transform', 'translate(-10,0)rotate(-45)')
    .style('text-anchor', 'end');

// Y axis
var y = d3.scaleBand()
  .range([ height, 0 ])
  .domain(data.map(function(d) { return d.Year; }))
  .padding(.1);
svg.append('g')
  .call(d3.axisLeft(y))

// Bars
svg.selectAll('myRect')
  .data(data)
  .enter()
  .append('rect')
  .attr('x', x(0) )
  .attr('y', function(d) { return y(d.Year); })
  .attr('width', function(d) { return x(d.Citations); })
  .attr('height', y.bandwidth() )
  .attr('fill', '#4b88a2')

// Add subtitle
svg.append('text')
  .attr('x', (width / 2))
  .attr('y', 0 - (margin.top / 2))
  .attr('text-anchor', 'middle')
  .style('font-size', '16px')
  .style('fill', '#6d6f71')
  .text('Visualizing citation counts across years');

// X axis label
svg.append('text')
  .attr('text-anchor', 'middle')
  .attr('x', width/2)
  .attr('y', height + margin.top)
  .style('fill', '#6d6f71')
  .text('Number of Citations');

// Tooltip
var tooltip = d3.select('body').append('div')
  .style('position', 'absolute')
  .style('z-index', '10')
  .style('visibility', 'hidden')
  .style('background', '#fff9fb')
  .style('padding', '10px')
  .style('border', '1px solid #6d6f71')
  .style('border-radius', '5px')
  .style('font-size', '12px');

svg.selectAll('rect')
  .on('mouseover', function(d) {
    tooltip.html('Title: ' + d.Title + '<br>Citations: ' + d.Citations + '<br>Year: ' + d.Year)
      .style('visibility', 'visible');
  })
  .on('mousemove', function() {
    tooltip.style('top', (d3.event.pageY-10)+'px').style('left',(d3.event.pageX+10)+'px');
  })
  .on('mouseout', function(){
    tooltip.style('visibility', 'hidden');
  });
"

# Create the D3 visualization
r2d3(data = publications, script = d3_script, d3_version = 6, width = 800, height = 400)

# Save as HTML file
r2d3::save_d3_html(r2d3(data = publications, script = d3_script, d3_version = 6, width = 800, height = 400),
                   file = "publications_plot.html")
