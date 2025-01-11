document.addEventListener("DOMContentLoaded", () => {
  const translateBtn = document.getElementById("translate-btn");
  const inputText = document.getElementById("input-text");
  const resultDiv = document.getElementById("result");
  let selectedStyle = "native";

  // 스타일 버튼 클릭 이벤트
  document.querySelectorAll(".icon-buttons button").forEach(button => {
    button.addEventListener("click", () => {
      selectedStyle = button.dataset.style;
      resultDiv.textContent = `Selected style: ${selectedStyle}`;
    });
  });

  // 번역 버튼 클릭 이벤트
  translateBtn.addEventListener("click", async () => {
    const text = inputText.value.trim();

    if (!text) {
      resultDiv.textContent = "Please enter text to translate.";
      return;
    }

    try {
      const response = await fetch("https://wesay.onrender.com/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sentence: text, style: selectedStyle })
      });

      const data = await response.json();
      if (response.ok) {
        resultDiv.textContent = data.translated;
      } else {
        resultDiv.textContent = `Error: ${data.error}`;
      }
    } catch (error) {
      resultDiv.textContent = "Failed to connect to the server.";
      console.error(error);
    }
  });
});
