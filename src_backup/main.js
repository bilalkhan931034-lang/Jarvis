import "./style.css";

import { sendMessage } from "./js/chat.js";
import { startVoice, speak } from "./js/voice.js";
import { addMessage, getInput, clearInput } from "./js/ui.js";


document.querySelector("#app").innerHTML = `
<div class="jarvis">
  <h1>🤖 JARVIS</h1>

  <div id="chat"></div>

  <input id="input" placeholder="Ask Jarvis..." />

  <button id="send">Send</button>
  <button id="mic">🎤</button>
</div>
`;


const sendBtn = document.querySelector("#send");
const micBtn = document.querySelector("#mic");


async function send() {
  const text = getInput();

  if (!text) return;

  addMessage("You: " + text, "user");

  clearInput();

  const reply = await sendMessage(text);

  addMessage("Jarvis: " + reply.message, "jarvis");

  speak(reply.message);
}


sendBtn.onclick = send;


micBtn.onclick = () => {
  startVoice((text) => {
    addMessage("You: " + text, "user");

    sendMessage(text).then((reply) => {
      addMessage("Jarvis: " + reply.message, "jarvis");
      speak(reply.message);
    });
  });
};