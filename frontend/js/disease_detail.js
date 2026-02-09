(function checkAuth() {
  const token = localStorage.getItem("token");
  if (!token) window.location.href = "login.html";
})();

const API_URL =
  "https://ai-chat-app-production-b7f4.up.railway.app/api/diseases";
const params = new URLSearchParams(window.location.search);
const diseaseId = params.get("id");

document.addEventListener("DOMContentLoaded", async () => {
  if (!diseaseId) return alert("Invalid disease");

  const res = await fetch(`${API_URL}/${diseaseId}`);
  const data = await res.json();

  document.getElementById("diseaseName").textContent = data.name;
  document.getElementById("diseaseInfo").textContent = data.information;

  data.symptoms.forEach((i) => {
    let li = document.createElement("li");
    li.textContent = i;
    document.getElementById("symptomsList").appendChild(li);
  });

  data.precautions.forEach((i) => {
    let li = document.createElement("li");
    li.textContent = i;
    document.getElementById("precautionsList").appendChild(li);
  });

  data.prevention.forEach((i) => {
    let li = document.createElement("li");
    li.textContent = i;
    document.getElementById("preventionList").appendChild(li);
  });

  data.medicines.forEach((m) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${m.name}</td>
      <td>${m.purpose}</td>
      <td>${m.dosage}</td>`;
    document.getElementById("medicineTable").appendChild(row);
  });
});

function goBack() {
  window.location.href = "disease.html";
}
