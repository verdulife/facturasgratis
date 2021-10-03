function Toast(message) {
  const el = document.createElement("div");

  el.textContent = message;

  el.style.cssText = `
    cursor: pointer;
    margin: 10px auto 0 auto;
    width: 90%;
    max-width: 700px;
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(10px);
    color: #fff;
    font-size: 16px;
    text-align: center;
    border-radius: 5px;
    padding: 15px;
    transition: 200ms;
    animation: fadeIn 200ms;
  `;

  document.body.appendChild(el);

  function softDelete() {
    if (document.body.contains(el)) {
      el.style.cssText += "animation: fadeOut 200ms; animation-fill-mode: forwards;";

      setTimeout(() => {
        document.body.removeChild(el);
      }, 500);
    }
  }

  el.addEventListener("click", () => {
    softDelete();
  });

  setTimeout(() => {
    softDelete();
  }, 2000);
}

export const toast = (message) => new Toast(message);
