const BASE_URL = "http://127.0.0.1:8000";

// --------------------------
// Auth Check
// --------------------------
(function checkAuth() {
  if (!localStorage.getItem("token")) {
    window.location.href = "login.html";
  }
})();

const chatArea = document.getElementById("chat-area");
const inputField = document.getElementById("user-input");
const typingIndicator = document.getElementById("typing-indicator");
const langSelector = document.getElementById("lang");

function scrollChat() {
  chatArea.scrollTop = chatArea.scrollHeight;
}

function addUserMessage(text) {
  const msg = document.createElement("div");
  msg.classList.add("message", "user-msg", "fade-in");
  msg.innerText = text;
  chatArea.appendChild(msg);
  scrollChat();
}

// Typewriter effect for bot message
function typeText(text) {
  const msg = document.createElement("div");
  msg.classList.add("message", "bot-msg", "fade-in");
  chatArea.appendChild(msg);

  let index = 0;

  function type() {
    if (index < text.length) {
      msg.innerHTML += text[index] === " " ? "&nbsp;" : text[index];
      index++;
      scrollChat();
      setTimeout(type, 5);
    }
  }

  type();
}

function handleKeyPress(event) {
  if (event.key === "Enter") sendMessage();
}

async function sendMessage() {
  const userText = inputField.value.trim();
  if (userText === "") return;

  addUserMessage(userText);
  inputField.value = "";

  const token = localStorage.getItem("token");
  typingIndicator.classList.remove("hidden");

  try {
    const response = await fetch(`${BASE_URL}/chatbot/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_query: userText,
        language: langSelector.value,
      }),
    });

    const data = await response.json();
    typingIndicator.classList.add("hidden");

    typeText(data.response || "Error: No response.");
  } catch (err) {
    typingIndicator.classList.add("hidden");
    typeText("Server error. Try again.");
  }
}
// --------------------------
// 🎤 Voice Input (Speech → Text)
// --------------------------
const micBtn = document.getElementById("mic-btn");

let recognition;
if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-IN"; // English India
} else {
  alert("Your browser does not support voice input");
}

micBtn.addEventListener("click", () => {
  if (!recognition) return;

  micBtn.innerText = "🎙️"; // mic listening icon
  recognition.start();
});

recognition.onresult = function (event) {
  const spokenText = event.results[0][0].transcript;
  inputField.value = spokenText; // Insert into textbox
};

recognition.onerror = function () {
  micBtn.innerText = "🎤"; // reset icon
};

recognition.onend = function () {
  micBtn.innerText = "🎤"; // reset icon
};
