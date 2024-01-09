const progressBar = document.querySelector(".progress"),
  progressText = document.querySelector(".progress-bar");
console.log(progressBar);
const progress = (value) => {
  const percentage = (value / time) * time;
  progressText.style.width = `${percentage}%`;
  progressText.innerHTML = `${value}`;
};

let quetions = [],
  time = 30,
  score = 0,
  currentQuetion,
  timer;

const startBtn = document.querySelector(".start"),
  numQuestions = document.querySelector("#numQuestions"),
  category = document.querySelector("#category"),
  difficulty = document.querySelector("#difficulty"),
  timePerQuestions = document.querySelector("#time"),
  quiz = document.querySelector(".quiz"),
  startScreen = document.querySelector(".start-screen");

const startQuiz = () => {
  const num = numQuestions.value;
  cat = category.value;
  diff = difficulty.value;
  //   Api url
  const url = `https://opentdb.com/api.php?amount=${num}&category=${cat}&difficulty=${diff}&type=multiple`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      quetions = data.results;
      console.log(quetions);
    });
};

startBtn.addEventListener("click", startQuiz);
//20:07
