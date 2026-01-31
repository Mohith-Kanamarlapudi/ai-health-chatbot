// Protect Home Page
(function checkAuth() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
  }
})();

function goTo(page) {
  window.location.href = page;
}

// GLOBAL LOGOUT FUNCTION (works everywhere)
function logoutUser() {
  localStorage.removeItem("token");
  alert("Logged out successfully!");
  window.location.href = "login.html";
}

// If a page has a logout button with id="logoutBtn", attach event automatically
const btn = document.getElementById("logoutBtn");
if (btn) {
  btn.addEventListener("click", logoutUser);
}
