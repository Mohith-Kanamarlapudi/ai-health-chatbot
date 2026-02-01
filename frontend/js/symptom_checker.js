const symptomsList = [
  "fever",
  "cough",
  "cold",
  "headache",
  "fatigue",
  "nausea",
  "body pain",
  "vomiting",
  "dizziness",
];

// Generate Tag Buttons
const tagsArea = document.getElementById("tagsArea");
let selectedSymptoms = [];

symptomsList.forEach((sym) => {
  const tag = document.createElement("div");
  tag.className = "tag";
  tag.innerText = sym;

  tag.addEventListener("click", () => {
    tag.classList.toggle("selected");

    if (selectedSymptoms.includes(sym)) {
      selectedSymptoms = selectedSymptoms.filter((s) => s !== sym);
    } else {
      selectedSymptoms.push(sym);
    }
  });

  tagsArea.appendChild(tag);
});

// Handle Analyze Button
document.getElementById("analyzeBtn").addEventListener("click", async () => {
  if (selectedSymptoms.length === 0) {
    alert("Please select at least one symptom.");
    return;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  // -------------------------------
  // SHOW LOADING UI Immediately
  // -------------------------------
  const container = document.getElementById("resultsArea");
  container.innerHTML = `
        <div class="result-card" style="text-align:center;">
            <div class="loader"></div>
            <p style="margin-top:10px; font-weight:600; color:#1565C0;">
                Analyzing your symptoms… please wait
            </p>
        </div>
    `;

  // Call API
  const response = await fetch("http://127.0.0.1:8000/api/symptom-checker", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ symptoms: selectedSymptoms }),
  });

  const result = await response.json();

  let analysis = result.analysis;
  try {
    analysis = JSON.parse(analysis);
  } catch (e) {
    alert("AI returned unexpected data.");
    return;
  }

  renderResults(analysis);
});

// Render Results
function renderResults(analysis) {
  const container = document.getElementById("resultsArea");
  container.innerHTML = "";

  // Title
  const title = document.createElement("h2");
  title.innerHTML = "Health Analysis";
  container.appendChild(title);

  // Possible Diseases
  analysis.possible_diseases.forEach((d) => {
    const card = document.createElement("div");
    card.className = "result-card";

    const badgeClass = d.probability.toLowerCase();

    card.innerHTML = `
            <h3>${d.name}</h3>
            <div class="badge ${badgeClass}">${d.probability}</div>
            <div class="section-title">Reason</div>
            <p>${d.reason}</p>
        `;

    container.appendChild(card);
  });

  // Home Remedies
  const rem = document.createElement("div");
  rem.className = "result-card";
  rem.innerHTML = `
        <div class="section-title">Home Remedies</div>
        <ul>${analysis.home_remedies.map((r) => `<li>${r}</li>`).join("")}</ul>
    `;
  container.appendChild(rem);

  // Doctor Advice
  const doc = document.createElement("div");
  doc.className = "result-card";
  doc.innerHTML = `
        <div class="section-title">When to Visit a Doctor</div>
        <ul>${analysis.when_to_visit_doctor.map((r) => `<li>${r}</li>`).join("")}</ul>
    `;
  container.appendChild(doc);
}
