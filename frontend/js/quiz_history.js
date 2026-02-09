(function loadHistory() {
  const token = localStorage.getItem("token");

  fetch(
    "https://ai-chat-app-production-b7f4.up.railway.app/api/quiz/my-scores",
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )
    .then((res) => res.json())
    .then((scores) => {
      const table = document.getElementById("historyTable");
      table.innerHTML = "";

      scores.forEach((s) => {
        const row = `
          <tr>
            <td>${s.score}</td>
            <td>${s.total_questions}</td>
            <td>${new Date(s.created_at).toLocaleString()}</td>
          </tr>
        `;
        table.innerHTML += row;
      });
    });
})();
