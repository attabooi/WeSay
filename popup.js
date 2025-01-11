document.getElementById("translate-btn").addEventListener("click", async () => {
  const inputText = document.getElementById("input-text").value;
  const resultDiv = document.getElementById("result");

  if (!inputText.trim()) {
    resultDiv.textContent = "Please enter text to translate.";
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:5000/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sentence: inputText.trim(), // 'sentence' 키에 사용자 입력값 전송
        style: "native"             // 'style' 키에 번역 스타일 전송
      })
    });

    const data = await response.json();

    if (response.ok) {
      resultDiv.textContent = data.translated;
    } else {
      resultDiv.textContent = data.error || "An error occurred during translation.";
    }
  } catch (error) {
    console.error("Error:", error);
    resultDiv.textContent = "Failed to connect to the server.";
  }
});
