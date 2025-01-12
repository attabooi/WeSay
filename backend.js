// 메시지를 처리해 번역 요청을 실행
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "translate") {
    fetch("https://wesay.onrender.com/translate", {
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

chrome.action.onClicked.addListener(() => {
  chrome.windows.create({
    url: "popup.html",
    type: "popup",
    width: 400,
    height: 600,
    left: 200, // 초기 창 위치 (왼쪽)
    top: 200   // 초기 창 위치 (위쪽)
  });
});
