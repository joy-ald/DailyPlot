// URL to the raw CSV file hosted on GitHub
const csvUrl = 'https://raw.githubusercontent.com/yourusername/your-repository/main/data.csv';

// Fetch the CSV file from GitHub
fetch(csvUrl)
  .then(response => response.text())
  .then(data => {
    // Use PapaParse to parse the CSV data
    Papa.parse(data, {
      header: true,  // treat the first row as header
      dynamicTyping: true,
      complete: function(results) {
        // Prepare the data for Chart.js
        const labels = [];
        const values = [];

        // Loop through the parsed CSV and extract values
        results.data.forEach(row => {
          labels.push(row.Date);  // Assuming the CSV has a "Date" column
          values.push(row.Value); // Assuming the CSV has a "Value" column
        });

        // Create the chart
        const ctx = document.getElementById('chart').getContext('2d');
        const chart = new Chart(ctx, {
          type: 'line',  // Line chart
          data: {
            labels: labels,
            datasets: [{
              label: 'Values',
              data: values,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: false
            }]
          },
          options: {
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Date'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Value'
                }
              }
            }
          }
        });
      }
    });
  })
  .catch(error => console.error('Error fetching CSV:', error));
