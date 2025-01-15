const inputTextElement = document.getElementById("input-text");
const resultDiv = document.getElementById("result");

// 타이머 변수
let debounceTimeout;

// 번역 함수
async function translateText() {
  const inputText = inputTextElement.value;

  if (!inputText.trim()) {
    resultDiv.textContent = "Please enter text to translate.";
    return;
  }

  try {
    const response = await fetch("https://wesay.onrender.com/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sentence: inputText.trim(), // 'sentence' 키에 사용자 입력값 전송
        style: "playful and casual"             // 'style' 키에 번역 스타일 전송
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
}

// 입력 이벤트로 자동 번역 실행
inputTextElement.addEventListener("input", () => {
  clearTimeout(debounceTimeout); // 타이머 초기화
  debounceTimeout = setTimeout(translateText, 1000); // 입력 후 1초 대기 후 번역 실행
});
