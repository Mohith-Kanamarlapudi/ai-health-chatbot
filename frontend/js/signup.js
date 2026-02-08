const BASE_URL = "https://ai-health-chatbot-production.up.railway.app";

async function signup() {
  const full_name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("error-msg");

  if (!full_name || !email || !password) {
    errorMsg.textContent = "All fields required!";
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ full_name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      errorMsg.textContent = data.detail || "Signup failed!";
      return;
    }

    alert("Account created! Please login.");
    window.location.href = "login.html";
  } catch (err) {
    errorMsg.textContent = "Server error. Try again.";
  }
}
