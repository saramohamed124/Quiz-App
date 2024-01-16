const progressBar = document.querySelector(".progress"),
  progressText = document.querySelector(".progress-bar");
console.log(progressBar);
const progress = (value) => {
  const percentage = (value / time) * time;
  progressText.style.width = `${percentage}%`;
  progressText.innerHTML = `${value}`;
};

let questions = [],
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
      questions = data.results;
      console.log(questions);
      console.log(data);
      setTimeout(() => {
        startScreen.classList.add("hide");
        quiz.classList.remove("hide");
        currentQuetion = 1;
        showQuestion(questions[0]);
      }, 1000);
    });
};
startBtn.addEventListener("click", startQuiz);
//20:07
console.log(questions);

const showQuestion = (question) => {
  const questionText = document.querySelector(".question"),
    answerWrapper = document.querySelector(".question-wrapper"),
    questionNumber = document.querySelector(".number");

  questionText.innerHTML = question.question;
  // correct or wrong answers
  const answers = [
    ...questions.incorrect_answers,
    question.correct_answer.toString(),
  ];
  // Correct answer will be always at last
  answers.sort(() => Math.random() - 0.5);
  answerWrapper.innerHTML = "";
  answers.forEach((answer) => {
    answerWrapper.innerHTML += `<div class="answer border p-3 rounded-1 d-flex justify-content-between" style="cursor: pointer;">
    <span class="text">${answer}</span>
    <span
        class="checkbox text-center rounded-circle border d-flex justify-content-center align-items-center p-1"
        style="width: 20px; height: 20px;">
        <div class="icon">🗸</div>
    </span>
</div>`;
  });
  questionNumber.innerHTML = `Question <span class="current">${
    questions.indexOf(question) + 1
  }</span>
  <span classs="total">/${questions.length}</span>`;
};
console.log(questions);
// There are Error in questions which can't read them
