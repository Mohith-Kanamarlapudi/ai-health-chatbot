const BASE_URL = "https://ai-health-chatbot-production.up.railway.app";

// If token already exists, redirect to home
(function checkAlreadyLoggedIn() {
  const token = localStorage.getItem("token");
  if (token) {
    window.location.href = "index.html";
  }
})();

async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("error-msg");

  if (!email || !password) {
    errorMsg.textContent = "All fields required!";
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      errorMsg.textContent = data.detail || "Login failed!";
      return;
    }

    // Save token
    localStorage.setItem("token", data.access_token);

    window.location.href = "index.html";
  } catch (err) {
    errorMsg.textContent = "Server error. Try again.";
  }
}
