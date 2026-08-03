export function addMessage(text, sender) {
  const chatBox = document.querySelector("#chat");

  if (!chatBox) return;

  const message = document.createElement("div");

  message.className = sender;
  message.innerText = text;

  chatBox.appendChild(message);

  chatBox.scrollTop = chatBox.scrollHeight;
}


export function getInput() {
  const input = document.querySelector("#input");

  if (!input) return "";

  return input.value.trim();
}


export function clearInput() {
  const input = document.querySelector("#input");

  if (input) {
    input.value = "";
  }
}