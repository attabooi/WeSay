const resizeHandle = document.getElementById("resize-handle");
const body = document.body;

let isResizing = false;
let startWidth, startHeight, startX, startY;

resizeHandle.addEventListener("mousedown", (e) => {
  e.preventDefault();
  isResizing = true;
  startWidth = body.offsetWidth;
  startHeight = body.offsetHeight;
  startX = e.clientX;
  startY = e.clientY;

  document.addEventListener("mousemove", resize);
  document.addEventListener("mouseup", stopResize);
});

function resize(e) {
  if (!isResizing) return;

  // 창 크기 조절 방향 수정
  const newWidth = Math.max(300, Math.min(800, startWidth - (e.clientX - startX))); // 왼쪽으로 이동 시 확장
  const newHeight = Math.max(400, Math.min(1000, startHeight + (e.clientY - startY))); // 아래로 이동 시 확장

  body.style.width = `${newWidth}px`;
  body.style.height = `${newHeight}px`;
}

function stopResize() {
  isResizing = false;
  document.removeEventListener("mousemove", resize);
  document.removeEventListener("mouseup", stopResize);
}
