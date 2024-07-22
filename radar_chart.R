# Radar Plot
# Install and load required packages
install.packages(c("fmsb", "htmlwidgets"))
library(fmsb)
library(htmlwidgets)

# Create a data frame with your skills
# The first two rows should be the max and min values
skills <- data.frame(
  "R" = c(10, 0, 9),
  "Python" = c(10, 0, 8),
  "SQL" = c(10, 0, 7),
  "Machine Learning" = c(10, 0, 8),
  "Data Visualization" = c(10, 0, 9),
  "Statistical Analysis" = c(10, 0, 8.5)
)

# Set row names
row.names(skills) <- c("max", "min", "Your Skills")

# Create the radar chart
radar_chart <- radarchart(
  skills,
  axistype = 1,
  pcol = rgb(0.2, 0.5, 0.5, 0.9),
  pfcol = rgb(0.2, 0.5, 0.5, 0.5),
  plwd = 2,
  cglcol = "grey",
  cglty = 1,
  axislabcol = "grey",
  caxislabels = seq(0, 10, 2),
  cglwd = 0.8,
  vlcex = 0.8,
  title = "Your Skills"
)

# Save the plot as an interactive HTML widget
htmlwidgets::saveWidget(radar_chart, "widgets/skills_radar.html", selfcontained = TRUE)
