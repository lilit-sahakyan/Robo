// Function to check if the page is fully loaded
function checkPageLoadStatus() {
  if (document.readyState === 'complete') {}  
}

// Check the page load status every 200ms
const loadCheckInterval = setInterval(checkPageLoadStatus, 200);
