// --------------------------
// 50-QUESTION BANK
// --------------------------
const questionBank = [
  {
    question: "Which organ controls body temperature?",
    options: ["Heart", "Brain", "Kidneys", "Liver"],
    answer: 1,
  },
  {
    question: "Deficiency of Vitamin D causes:",
    options: ["Scurvy", "Rickets", "Goiter", "Night Blindness"],
    answer: 1,
  },
  {
    question: "Which blood cells fight infections?",
    options: ["RBC", "Platelets", "WBC", "Plasma"],
    answer: 2,
  },
  {
    question: "Normal human body temperature is:",
    options: ["98.6°F", "99.9°F", "96.5°F", "100.2°F"],
    answer: 0,
  },
  {
    question: "Malaria is spread by:",
    options: ["Flies", "Mosquitoes", "Water", "Air"],
    answer: 1,
  },
  {
    question: "Which nutrient builds muscles?",
    options: ["Carbs", "Proteins", "Fats", "Vitamins"],
    answer: 1,
  },
  {
    question: "Which organ purifies blood?",
    options: ["Heart", "Liver", "Kidneys", "Lungs"],
    answer: 2,
  },
  {
    question: "Vitamin C is rich in?",
    options: ["Milk", "Citrus fruits", "Bread", "Meat"],
    answer: 1,
  },
  {
    question: "COVID-19 affects which organ?",
    options: ["Heart", "Lungs", "Liver", "Kidney"],
    answer: 1,
  },
  {
    question: "TB is caused by:",
    options: ["Virus", "Bacteria", "Fungus", "Parasite"],
    answer: 1,
  },
  {
    question: "Which mineral strengthens bones?",
    options: ["Iron", "Calcium", "Zinc", "Iodine"],
    answer: 1,
  },
  {
    question: "Where is bile stored?",
    options: ["Gall bladder", "Pancreas", "Kidneys", "Brain"],
    answer: 0,
  },
  {
    question: "Cholera spreads through:",
    options: ["Air", "Dirty water", "Animals", "Blood"],
    answer: 1,
  },
  {
    question: "RBC stands for:",
    options: [
      "Red Blood Cells",
      "Real Body Cells",
      "Rapid Blood Corpuscles",
      "Red Brain Cells",
    ],
    answer: 0,
  },
  {
    question: "Which vitamin comes from sunlight?",
    options: ["A", "B", "C", "D"],
    answer: 3,
  },
  {
    question: "Which organ produces insulin?",
    options: ["Pancreas", "Liver", "Kidneys", "Brain"],
    answer: 0,
  },
  {
    question: "Quick energy comes from:",
    options: ["Proteins", "Carbs", "Fats", "Minerals"],
    answer: 1,
  },
  {
    question: "Largest organ is:",
    options: ["Brain", "Skin", "Liver", "Heart"],
    answer: 1,
  },
  {
    question: "Which organ detoxifies?",
    options: ["Heart", "Liver", "Stomach", "Lungs"],
    answer: 1,
  },
  {
    question: "Vitamin A improves:",
    options: ["Sight", "Hearing", "Smell", "Taste"],
    answer: 0,
  },
  {
    question: "Arthritis affects:",
    options: ["Bones & joints", "Lungs", "Eyes", "Stomach"],
    answer: 0,
  },
  {
    question: "Breathing organ:",
    options: ["Lungs", "Kidneys", "Heart", "Pancreas"],
    answer: 0,
  },
  {
    question: "Hypertension means:",
    options: ["Low BP", "High BP", "Cold", "Fever"],
    answer: 1,
  },
  {
    question: "Hepatitis affects:",
    options: ["Heart", "Liver", "Kidney", "Brain"],
    answer: 1,
  },
  {
    question: "Vitamin K helps:",
    options: ["Vision", "Clotting", "Growth", "Immunity"],
    answer: 1,
  },
  {
    question: "Iron deficiency causes:",
    options: ["Asthma", "Anaemia", "Cholera", "Cancer"],
    answer: 1,
  },
  {
    question: "Hormone controlling sugar:",
    options: ["Insulin", "Adrenaline", "Thyroxine", "Estrogen"],
    answer: 0,
  },
  {
    question: "Kidneys produce:",
    options: ["Urine", "Sweat", "Bile", "Saliva"],
    answer: 0,
  },
  {
    question: "Scurvy is due to:",
    options: ["Vit B", "Vit C deficiency", "Vit D", "Iron"],
    answer: 1,
  },
  {
    question: "Tobacco contains:",
    options: ["Calcium", "Nicotine", "Iron", "Zinc"],
    answer: 1,
  },
  {
    question: "Asthma affects:",
    options: ["Lungs", "Heart", "Stomach", "Brain"],
    answer: 0,
  },
  {
    question: "Blood circulation organ:",
    options: ["Kidney", "Heart", "Liver", "Lungs"],
    answer: 1,
  },
  {
    question: "Universal donor:",
    options: ["A+", "B+", "O-", "AB+"],
    answer: 2,
  },
  {
    question: "Water helps in:",
    options: ["Digestion", "Temp control", "Blood flow", "All"],
    answer: 3,
  },
  {
    question: "Iodine deficiency:",
    options: ["Rickets", "Night blindness", "Goiter", "Anaemia"],
    answer: 2,
  },
  {
    question: "First vaccine discovered:",
    options: ["Polio", "Smallpox", "Cholera", "TB"],
    answer: 1,
  },
  {
    question: "Blood is pumped by:",
    options: ["Heart", "Lungs", "Brain", "Kidney"],
    answer: 0,
  },
  {
    question: "Pulse felt at:",
    options: ["Wrist", "Chest", "Knee", "Forehead"],
    answer: 0,
  },
  {
    question: "Vitamin for wound healing:",
    options: ["A", "C", "B12", "D"],
    answer: 1,
  },
  {
    question: "Where is oxygen stored?",
    options: ["Liver", "Lungs", "Kidneys", "Heart"],
    answer: 1,
  },
  {
    question: "Typhoid spreads:",
    options: ["Air", "Dirty food/water", "Animals", "Insects"],
    answer: 1,
  },
  {
    question: "Strongest bone?",
    options: ["Jaw", "Femur", "Skull", "Rib"],
    answer: 0,
  },
  {
    question: "Immunity boosters:",
    options: ["Vitamins", "Salt", "Fat", "Sugar"],
    answer: 0,
  },
  {
    question: "Balance is controlled by:",
    options: ["Cerebellum", "Liver", "Kidney", "Heart"],
    answer: 0,
  },
  {
    question: "Blood sugar test:",
    options: ["MRI", "X-ray", "HbA1C", "ECG"],
    answer: 2,
  },
  {
    question: "Metal in blood:",
    options: ["Copper", "Iron", "Zinc", "Lead"],
    answer: 1,
  },
  {
    question: "Calcium absorption vitamin:",
    options: ["A", "C", "D", "K"],
    answer: 2,
  },
  {
    question: "Digestive system disease:",
    options: ["Cholera", "Asthma", "TB", "Arthritis"],
    answer: 0,
  },
  {
    question: "Tear gland:",
    options: ["Lacrimal", "Pancreas", "Liver", "Kidney"],
    answer: 0,
  },
  {
    question: "Lifestyle disease:",
    options: ["Malaria", "Diabetes", "Cholera", "TB"],
    answer: 1,
  },
];
// --------------------------
// Select 10 random questions
// --------------------------
function getRandomQuestions() {
  let selected = [];
  let used = new Set();

  while (selected.length < 10) {
    let i = Math.floor(Math.random() * questionBank.length);
    if (!used.has(i)) {
      used.add(i);
      selected.push(questionBank[i]);
    }
  }
  return selected;
}

// --------------------------
// GLOBAL STATE
// --------------------------
let quizData = [];
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;
let answered = false;

// --------------------------
// NAVIGATION
// --------------------------
function goHome() {
  window.location.href = "index.html";
}

function showInstructions() {
  document.getElementById("welcomeScreen").classList.add("hide");
  document.getElementById("instructionScreen").classList.remove("hide");
}

function startQuiz() {
  quizData = getRandomQuestions();
  currentIndex = 0;
  score = 0;

  document.getElementById("instructionScreen").classList.add("hide");
  document.getElementById("quizScreen").classList.remove("hide");

  loadQuestion();
}

// --------------------------
// Load Question
// --------------------------
function loadQuestion() {
  answered = false;
  timeLeft = 15;

  document.getElementById("timer").textContent = timeLeft;
  document.getElementById("nextBtn").style.display = "none";

  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);

  const q = quizData[currentIndex];
  document.getElementById("questionText").textContent = q.question;

  const container = document.getElementById("optionsContainer");
  container.innerHTML = "";

  q.options.forEach((opt, i) => {
    const div = document.createElement("div");
    div.className = "option";
    div.textContent = opt;
    div.onclick = () => selectOption(i);
    container.appendChild(div);
  });
}

// --------------------------
// Timer
// --------------------------
function updateTimer() {
  if (answered) return;

  timeLeft--;
  document.getElementById("timer").textContent = timeLeft;

  if (timeLeft <= 0) {
    answered = true;
    highlightCorrect();
    clearInterval(timer);
    document.getElementById("nextBtn").style.display = "block";
  }
}

// --------------------------
// Select Option
// --------------------------
function selectOption(i) {
  if (answered) return;
  answered = true;

  clearInterval(timer);

  const correct = quizData[currentIndex].answer;
  const options = document.querySelectorAll(".option");

  options.forEach((opt, idx) => {
    opt.style.pointerEvents = "none";
    if (idx === correct) opt.style.background = "#a5d6a7";
    else if (idx === i) opt.style.background = "#ef9a9a";
  });

  if (i === correct) score++;

  document.getElementById("nextBtn").style.display = "block";
}

// --------------------------
// Highlight correct on timeout
// --------------------------
function highlightCorrect() {
  const correct = quizData[currentIndex].answer;
  const options = document.querySelectorAll(".option");

  options.forEach((opt, i) => {
    opt.style.pointerEvents = "none";
    if (i === correct) opt.style.background = "#a5d6a7";
  });
}

// --------------------------
// Next Question
// --------------------------
function nextQuestion() {
  currentIndex++;

  if (currentIndex >= quizData.length) {
    showResult();
    return;
  }

  loadQuestion();
}

// --------------------------
// Show Result
// --------------------------
function showResult() {
  clearInterval(timer);

  document.getElementById("quizScreen").classList.add("hide");
  document.getElementById("resultScreen").classList.remove("hide");

  document.getElementById("scoreText").textContent =
    `You scored ${score} / ${quizData.length}`;

  saveScoreToBackend(score, quizData.length);
}

// --------------------------
// Save Quiz Score (Backend)
// --------------------------
function saveScoreToBackend(score, total) {
  const token = localStorage.getItem("token");

  fetch("https://ai-health-chatbot-production.up.railway.app/api/quiz/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ score, total_questions: total }),
  });
}

// --------------------------
// Restart Quiz
// --------------------------
function restartQuiz() {
  document.getElementById("resultScreen").classList.add("hide");
  showInstructions();
}
