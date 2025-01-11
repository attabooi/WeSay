document.getElementById("translate-btn").addEventListener("click", async () => {
    const text = document.getElementById("input-text").value;
  
    if (!text.trim()) {
      alert("Please enter text to translate.");
      return;
    }
  
    const response = await fetch("http://localhost:5000/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
  
    const result = await response.json();
    document.getElementById("result").innerText = result.translated || "Translation failed.";
  });
  