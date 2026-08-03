let recognition;

export function startWakeWord(callback) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Voice recognition support nahi hai");
    return;
  }

  recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const text =
      event.results[event.results.length - 1][0].transcript
        .toLowerCase();

    console.log("Heard:", text);

    if (text.includes("jarvis")) {
      callback();
    }
  };

  recognition.onerror = (error) => {
    console.log("Wake word error:", error);
  };

  recognition.start();
}


export function startVoice(callback) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.continuous = false;

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    callback(text);
  };

  recognition.start();
}


export function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
  speech.rate = 1;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
}