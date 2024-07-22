# Load required libraries
library(ggplot2)
library(plotly)
library(tidyverse)
library(showtext)
library(htmlwidgets)

# Add fonts
font_add_google("Rubik", "title_font")
font_add_google("Roboto Mono", "body_font")
showtext_auto()

# Create a data frame with your publications
# Replace this sample data with your actual publication data
publications <- data.frame(
  Title = c(
    "Machine Learning in Healthcare",
    "Data-Driven Decision Making",
    "Statistical Analysis of Climate Data",
    "Predictive Modeling for Stock Prices",
    "Natural Language Processing Techniques"
  ),
  Citations = c(45, 32, 28, 20, 15),
  Year = c(2021, 2020, 2022, 2019, 2023)
)

# Group by year and sort
publications <- publications %>%
  group_by(Year) %>%
  arrange(desc(Citations)) %>%
  mutate(Order = row_number()) %>%
  ungroup() %>%
  arrange(desc(Year), desc(Citations))

# Create the plot
p <- ggplot(publications, aes(x = Citations, y = reorder(paste(Year, Title), Order))) +
  geom_bar(stat = "identity", fill = "#0015BC", alpha = 0.7) +
  labs(title = "Impact of Research Publications",
       subtitle = "Visualizing citation counts across years",
       x = "Number of Citations",
       y = NULL) +
  theme_minimal() +
  theme(
    text = element_text(family = "body_font"),
    plot.title = element_text(family = "title_font", size = 24, face = "bold"),
    plot.subtitle = element_text(size = 18, color = "grey30"),
    axis.title.x = element_text(size = 12, color = "grey30", margin = margin(t = 10)),
    axis.text.x = element_text(face = "bold", size = 14),
    axis.text.y = element_text(face = "bold", size = 14),
    plot.background = element_rect(fill = "#f8f8f8", color = NA),
    panel.grid.major.x = element_line(color = "grey90"),
    panel.grid.major.y = element_blank(),
    plot.margin = margin(20, 20, 20, 20)
  )

# Convert to plotly for interactivity
p_interactive <- ggplotly(p, tooltip = "text") %>%
  layout(hoverlabel = list(bgcolor = "white", font = list(family = "Roboto Mono"))) %>%
  style(text = paste("Title:", publications$Title, "<br>",
                     "Citations:", publications$Citations, "<br>",
                     "Year:", publications$Year))

# Save the plot as an interactive HTML widget
htmlwidgets::saveWidget(p_interactive, "publications_plot.html", selfcontained = TRUE)
