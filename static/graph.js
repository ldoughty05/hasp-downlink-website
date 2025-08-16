// Load and update a Plotly graph
function loadGraph(elementId, dataUrl) {
  fetch(dataUrl)
    .then(res => res.json())
    .then(data => {
      Plotly.newPlot(elementId, data.traces, data.layout);

      // Periodic updates
      setInterval(() => {
        fetch(dataUrl)
          .then(res => res.json())
          .then(update => {
            Plotly.react(elementId, update.traces, update.layout);
          });
      }, 3000); // update every 3s
    });
}