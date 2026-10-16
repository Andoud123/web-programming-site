// ======================================================
// QUESTIONS
// ======================================================
const questions = [
  {
    question: "What is the smallest country in the world?",
    choices: ["Vatican City", "Lebanon", "Cyprus", "Monaco"],
    answer: 0,
    explanation: "Vatican City is the smallest country in the world, both in terms of area and population."
  },
  {
    question: "What is the largest country in the world?",
    choices: ["Canada", "United States", "Russia", "China"],
    answer: 2,
    explanation: "Russia is the largest country in the world by land area."
  },
  {
    question: "What is the most difficult Engineering Major?",
    choices: ["Computer Engineering", "Mechanical Engineering", "Aerospace Engineering", "Chemical Engineering"],
    answer: 3,
    explanation: "Chemical Engineering is often considered the most difficult engineering major due to its complex subject matter and rigorous coursework."
  },
  {
    question: "What does CSS stand for?",
    choices: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
    answer: 0,
    explanation: "CSS stands for Cascading Style Sheets. The word CASCADING refers to the specific rules browsers use to determine which style takes precedence when multiple conflicting rules apply to the same element, and STYLE SHEETS refers to the fact that CSS is a separate file that contains style rules for HTML elements."
  },
  {
    question: "What is the default rendering behavior of elements marked with the hidden attribute if a custom CSS stylesheet applies display: block; to that same element?",
    choices: ["It remains hidden", "It becomes visible", "It inherits the display property", "It is removed from the DOM"],
    answer: 1,
    explanation: "Elements marked with the hidden attribute are hidden by default. However, if a custom CSS stylesheet applies display: block; to that same element, it will become visible."
  },
  {
    question: "Which CSS property is best suited to blur the area behind an element (such as a glassmorphism overlay) without affecting the content inside the element itself?",
    choices: ["filter: blur()", "backdrop-filter: blur()", "background-blur()", "opacity()"],
    answer: 1,
    explanation: "The backdrop-filter property is best suited to blur the area behind an element without affecting the content inside the element itself."
  },
  {
    question: "Which character or symbol is used to select an element with a specific class name in CSS?",
    choices: ["#", "+", ">", "."],
    answer: 3,
    explanation: "The dot (.) character is used to select an element with a specific class name in CSS."
  },
  {
    question: "What does 'let' refer to in JavaScript?",
    choices: ["A keyword for declaring global variables", "A keyword for declaring block-scoped variables", "A keyword for declaring constants", "A keyword for declaring functions"],
    answer: 1,
    explanation: "The 'let' keyword is used to declare block-scoped variables in JavaScript."
  },
  {
    question: "What is the default return value of a function if no explicit return statement is specified?",
    choices: ["undefined", "null", "0", "false"],
    answer: 0,
    explanation: "If no explicit return statement is specified, a function will return undefined by default."
  },
  {
    question: "Which of the following best describes the integer 0?",
    choices: ["A positive number", "A negative number", "Neither positive nor negative", "A prime number"],
    answer: 2,
    explanation: "The integer 0 is neither positive nor negative."
  }
];

// ======================================================
// APPLICATION STATE
// ======================================================
let currentQuestion = 0;
const userAnswers = new Array(questions.length);

// ======================================================
// SAVE AN ANSWER
// ======================================================
function saveAnswer(choiceIndex) {
  userAnswers[currentQuestion] = choiceIndex;
}

// ======================================================
// NAVIGATION
// ======================================================
function goNext() {
  nextQuestion = currentQuestion + 1;
  if (nextQuestion < questions.length) {
    currentQuestion = nextQuestion;
    renderQuestion();
  }
}

function goPrevious() {
  previousQuestion = currentQuestion - 1;
  if (previousQuestion >= 0) {
    currentQuestion = previousQuestion;
    renderQuestion();
  }
}

function goFirst() {
  if (currentQuestion > 0) {
    currentQuestion = 0;
    renderQuestion();
  }
}
function goLast() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion = questions.length - 1;
    renderQuestion();
  }
}

// ======================================================
// CALCULATE SCORE
// ======================================================
function calculateScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  return score;
}

// ======================================================
// CALCULATE PERCENTAGE
// ======================================================
function calculatePercentage(score) {
  return (score / questions.length) * 100;
}

// ======================================================
// PERFORMANCE MESSAGE
// ======================================================
function getPerformanceMessage(percentage) {
  if (percentage >= 80) {
    return "Excellent";
  } else if (percentage >= 60 && percentage <= 79) {
    return "Good";
  } else if (percentage >= 50 && percentage <= 59) {
    return "Pass";
  } else {
    return "Needs Improvement";
  }
}

// ======================================================
// BUILD CORRECTION
// ======================================================

function buildCorrection() {

    let correction = "";

    for (let i = 0; i < questions.length; i++) {

        let question = questions[i];

        let userAnswer = userAnswers[i];

        if (userAnswer === undefined) {
            userAnswer = "Not Answered";
        } else {
            userAnswer = question.choices[userAnswer];
        }

        let correctAnswer = question.choices[question.answer];

        let result;

        if (userAnswers[i] === question.answer) {
            result = "Correct";
        } else {
            result = "Incorrect";
        }

        correction += `
            <div class="correction-question">

                <h2>Question ${i + 1}</h2>

                <p><strong>Question:</strong> ${question.question}</p>

                <p><strong>Your Answer:</strong> ${userAnswer}</p>

                <p><strong>Correct Answer:</strong> ${correctAnswer}</p>

                <p><strong>Result:</strong> ${result}</p>

                <p><strong>Explanation:</strong> ${question.explanation}</p>

            </div>
        `;
    }

    return correction;
}

// ======================================================
// PROVIDED INTERFACE CODE
//
// DOM manipulation and events will be studied later.
// ======================================================

// ======================================================
// SUBMIT QUIZ
// ======================================================
function submitQuiz() {
  const score = calculateScore();
  const percentage = calculatePercentage(score);
  const message = getPerformanceMessage(percentage);
  const correction = buildCorrection();
  showResults(score, percentage, message, correction);
}

function renderQuestion() {
  const q = questions[currentQuestion];

  // --------------------------------------------------
  // QUESTION NUMBER
  // --------------------------------------------------
  document.getElementById("progress").textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  // --------------------------------------------------
  // QUESTION
  // --------------------------------------------------
  document.getElementById("questionText").textContent = q.question;

  // --------------------------------------------------
  // CHOICES
  // --------------------------------------------------
  const choicesContainer = document.getElementById("choices");
  choicesContainer.innerHTML = "";
  for (let i = 0; i < q.choices.length; i++) {
    const label = document.createElement("label");
    label.className = "choice";
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "answer";
    radio.value = i;
    // Restore an answer previously selected
    // by the user.
    if (userAnswers[currentQuestion] === i) {
      radio.checked = true;
    }
    // When the user selects this answer,
    // save its index.
    radio.onclick = function () {
      saveAnswer(i);
    };
    label.appendChild(radio);
    label.appendChild(document.createTextNode(" " + q.choices[i]));
    choicesContainer.appendChild(label);
  }

  // --------------------------------------------------
  // NAVIGATION BUTTONS
  // --------------------------------------------------
  document.getElementById("firstBtn").disabled = currentQuestion === 0;
  document.getElementById("previousBtn").disabled = currentQuestion === 0;
  document.getElementById("nextBtn").disabled =
    currentQuestion === questions.length - 1;
  document.getElementById("lastBtn").disabled =
    currentQuestion === questions.length - 1;
}

// ======================================================
// DISPLAY RESULTS
// ======================================================
function showResults(score, percentage, message, correction) {
  document.getElementById("quizPanel").style.display = "none";
  document.getElementById("resultsPanel").style.display = "block";
  document.getElementById("scoreText").textContent =
    `Score: ${score} / ${questions.length}`;
  document.getElementById("percentageText").textContent =
    `Percentage: ${percentage}%`;
  document.getElementById("performanceText").textContent = message;
  document.getElementById("correction").innerHTML = correction;
}

// ======================================================
// START APPLICATION
// ======================================================
renderQuestion();

