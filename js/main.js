const progressBar = document.querySelector(".progress"),
  progressText = document.querySelector(".progress-bar");
console.log(progressBar);
const progress = (value) => {
  const percentage = (value / timePerQuestion.value) * 100;
  progressText.style.width = `${percentage}%`;
  progressText.innerHTML = `${value}`;
};

const startBtn = document.querySelector(".start"),
  numQuestions = document.querySelector("#numQuestions"),
  category = document.querySelector("#category"),
  difficulty = document.querySelector("#difficulty"),
  timePerQuestion = document.querySelector("#time"),
  quiz = document.querySelector(".quiz"),
  startScreen = document.querySelector(".start-screen");
let questions = [],
  time = 30,
  score = 0,
  currentQuetion,
  timer;
const startQuiz = () => {
  const num = numQuestions.value,
    cat = category.value,
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
let submitBtn = document.querySelector(".submit"),
  nextBtn = document.querySelector(".next");
console.log(questions);

const showQuestion = (question) => {
  const questionText = document.querySelector(".question"),
    answerWrapper = document.querySelector(".answer-wrapper"),
    questionNumber = document.querySelector(".number");

  questionText.innerHTML = question.question;
  // correct or wrong answers
  const answers = [
    ...question.incorrect_answers,
    question.correct_answer.toString(),
  ];
  // Correct answer will be always at last
  answerWrapper.innerHTML = "";
  answers.sort(() => Math.random() - 0.5);
  answers.forEach((answer) => {
    answerWrapper.innerHTML += `
    <div class="answer border p-3 m-3 rounded-1 d-flex justify-content-between" style="cursor: pointer;">
      <span class="text">${answer}</span>
      <span class="checkbox text-center rounded-circle border d-flex justify-content-center align-items-center p-1" style="width: 20px; height: 20px;">
          <div class="icon">🗸</div>
      </span>
  </div>`;
  });
  console.log(questionNumber);

  questionNumber.innerHTML = `Question <span class="current">${
    questions.indexOf(question) + 1
  }</span>
  <span class="total">/${questions.length}</span>`;
  // Add event Listener
  const answerDiv = document.querySelectorAll(".answer");
  answerDiv.forEach((answer) => {
    answer.addEventListener("click", () => {
      // If answer not already submitted
      if (!answer.classList.contains("checked")) {
        // remove checked from other answers
        answerDiv.forEach((answer) => {
          answer.classList.remove("selected");
        });
        // add seelected on currently clicked
        answer.classList.add("selected");
        submitBtn.disabled = false;
      }
    });
  });
  // After updatring question start timer
  time = timePerQuestion.value;
  startTimer(time);
};
const startTimer = (time) => {
  timer = setInterval(() => {
    if (time > 0) {
      // If timer more than 0 means time remaining
      // move progress
      progress(time);
      time--;
    } else {
      // if time finishes means less than 0
      checkAnswer();
    }
  }, 1000);
};
submitBtn.addEventListener("click", () => {
  checkAnswer();
});
const checkAnswer = () => {
  clearInterval(timer);
  const selectedAnswer = document.querySelector(".answer.selected");
  // any anser is selected
  if (selectedAnswer) {
    const answer = selectedAnswer.querySelector(".text");
    if (answer === questions[currentQuetion - 1].correct_answer) {
      // if anser matched with current question correct answer
      score++;
      console.log(score);
      selectedAnswer.classList.add("correct");
    } else {
      // correct added lets add wrong on selected
      selectedAnswer.classList.add("wrong");

      const correctAnswer = document
        .querySelectorAll(".answer")
        .forEach((answer) => {
          if (
            answer.querySelector(".text").innerHTML ===
            questions[currentQuetion - 1].correct_answer
          ) {
            // only add correct class to correct answer
            answer.classList.add("correct");
          }
        });
    }
  }
  // answer check
  // what if nothing selected and time finishes
  // lets just add correct class on correct answer
  else {
    const correctAnswer = document
      .querySelectorAll(".answer")
      .forEach((answer) => {
        if (
          answer.querySelector(".text").innerHTML ===
          questions[currentQuetion - 1].correct_answer
        ) {
          answer.classList.add("correct");
        }
      });
  }
  const answersDiv = document.querySelectorAll(".answer");
  answersDiv.forEach((answer) => {
    answer.classList.add("checked");
  });

  submitBtn.style.display = "none";
  nextBtn.style.display = "block";
};
// on next btn click show next question
nextBtn.addEventListener("click", () => {
  nextQuestion();
  nextBtn.style.display = "none";
  submitBtn.style.display = "block";
});
const nextQuestion = () => {
  if (currentQuetion < questions.length) {
    currentQuetion++;
    // show question
    showQuestion(questions[currentQuetion - 1]);
  } else {
    // if no question remaining
    showScore();
  }
};
const endScreen = document.querySelector(".end-screen"),
  finalScore = document.querySelector(".final_score"),
  totalScore = document.querySelector(".total_score");
const showScore = () => {
  endScreen.classList.remove("hide");
  quiz.classList.add("hide");
  console.log(score);
  finalScore.innerHTML = score;
  totalScore.innerHTML = `/${questions.length}`;
};
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", () => {
  // reload page on click
  window.location.reload();
});
