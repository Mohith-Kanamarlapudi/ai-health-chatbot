(function checkAuth() {
  const token = localStorage.getItem("token");
  if (!token) window.location.href = "login.html";
})();

const API_URL =
  "https://ai-health-chatbot-production.up.railway.app/api/diseases";

let allData = [];

document.addEventListener("DOMContentLoaded", loadDiseases);

async function loadDiseases() {
  const res = await fetch(API_URL);
  allData = await res.json();

  populateCategories();
  renderCategories(allData);
}

// Fill dropdown
function populateCategories() {
  const select = document.getElementById("categorySelect");

  allData.forEach((cat) => {
    let opt = document.createElement("option");
    opt.value = cat.category;
    opt.textContent = cat.category;
    select.appendChild(opt);
  });

  select.onchange = filterDiseases;
  document.getElementById("searchBar").oninput = filterDiseases;
}

function renderCategories(data) {
  const container = document.getElementById("diseaseCategories");
  container.innerHTML = "";

  data.forEach((cat) => {
    const section = document.createElement("div");
    section.className = "category-section";

    section.innerHTML = `<h2>${cat.category}</h2>`;

    const list = document.createElement("div");
    list.className = "disease-grid";

    cat.items.forEach((d) => {
      const card = document.createElement("div");
      card.className = "disease-card";
      card.innerHTML = `<h3>${d.name}</h3>`;
      card.onclick = () =>
        (window.location.href = `disease_detail.html?id=${d.id}`);
      list.appendChild(card);
    });

    section.appendChild(list);
    container.appendChild(section);
  });
}

function filterDiseases() {
  let term = document.getElementById("searchBar").value.toLowerCase();
  let category = document.getElementById("categorySelect").value;

  let filtered = allData
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (d) =>
          (category === "all" || cat.category === category) &&
          d.name.toLowerCase().includes(term),
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  renderCategories(filtered);
}
