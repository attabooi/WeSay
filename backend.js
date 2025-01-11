chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "translate") {
      fetch("http://localhost:5000/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: message.text })
      })
        .then(response => response.json())
        .then(data => {
          sendResponse({ translated: data.translated });
        })
        .catch(error => {
          console.error("Translation failed:", error);
          sendResponse({ translated: "Error in translation." });
        });
  
      return true; // Keep the message channel open for async response
    }
  });
  