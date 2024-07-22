library(rcrossref)
library(dplyr)
library(r2d3)
library(jsonlite)

# Function to fetch publications by DOIs
fetch_publications_by_doi <- function(doi_list) {
  publications <- data.frame()

  for (doi in doi_list) {
    tryCatch({
      work <- cr_works(doi = doi)$data

      if (!is.null(work)) {
        pub <- work %>%
          select(title, issued, is.referenced.by.count, doi, url) %>%
          mutate(
            Year = as.numeric(substr(issued, 1, 4)),
            Citations = is.referenced.by.count,
            Title = title,
            DOI = doi
          ) %>%
          select(Title, Year, Citations, DOI, url)

        publications <- bind_rows(publications, pub)
      }
    }, error = function(e) {
      warning(paste("Error fetching DOI:", doi, "-", e$message))
    })
  }

  publications %>%
    arrange(desc(Year), desc(Citations))
}

# List of your publication DOIs
my_dois <- c("10.1038/s41467-020-20836-3",
             "10.1073/pnas.2106130118",
             "10.1073/pnas.2116691118",
             "10.1038/s41467-022-30037-9",
             "10.1111/gcb.17203",
             "10.1111/2041-210X.14368")

# Fetch publications
publications <- fetch_publications_by_doi(my_dois)
write_json(publications, file = "publications.json")

# Create the visualization
viz <- r2d3(data = publications, script = "publication_viz.js", d3_version = 5,
            css = "
     body { font-family: 'Arial', monospace; background-color: #fff9fb; }
     .tooltip { font-size: 12px; }
     ")

# Save as HTML file
r2d3::save_d3_html(viz, file = "publications_viz.html")

print("Visualization created and saved as publications_viz.html")
