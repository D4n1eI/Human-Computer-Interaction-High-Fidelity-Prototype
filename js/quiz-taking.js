document.addEventListener("DOMContentLoaded", () => {
  const speech = document.getElementById("feedback-text");
  const image = document.getElementById("feedback-img");
  const nextQuestionContainer = document.getElementById("next-question-container");
  const questionCounter = document.getElementById("question-counter");

  const buttons = {
    A: document.getElementById("A"),
    B: document.getElementById("B"),
    C: document.getElementById("C"),
    D: document.getElementById("D")
  };

  const feedbacks = {
    correct: {
      text: "YES! Well done, you're crushing it! 💪",
      img: "../assets/pixel/var6_happy.png"
    },
    wrong: {
      text: "NOPE! Don't worry, even geniuses fail. 🧠",
      img: "../assets/pixel/var6_sad.png"
    },
    default: {
      text: "What could the right answer be? It could be A, it could be B, maybe C, or who knows, D just to throw you off. This even seems easy, but don't be fooled — it's kind of tricky, kind of confusing, but all part of the mental training! Come on, focus. You got this. Or not. Who knows? Just go for it!",
      img: "../assets/pixel/var6_normal.png"
    }
  };

  image.src = feedbacks.correct.img;
  image.style.width = "150px";
  image.style.height = "150px";
  image.style.objectFit = "contain";

  let currentQuestion = 1;
  let totalQuestions = 5;
  let score = 0;

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next Question";
  nextBtn.classList.add("option", "mt-3");
  nextBtn.style.display = "none";
  nextQuestionContainer.appendChild(nextBtn);

  function assignAnswers() {
    const buttonKeys = Object.keys(buttons);
    const correctIndex = Math.floor(Math.random() * buttonKeys.length);
    buttonKeys.forEach((key, index) => {
      buttons[key].dataset.answer = (index === correctIndex) ? "Y" : "N";
    });
  }

  function resetUI() {
    if (currentQuestion > totalQuestions) {
      questionCounter.style.display = "none"
      nextQuestionContainer.innerHTML = `
        <div class="mt-4">
          <h3>Your score: ${score} / ${totalQuestions}</h3>
          <a href="quiz-hardcoded.html">
            <button class="option mt-2">Restart Quiz</button>
          </a>
        </div>
      `;
      return;
    }

    questionCounter.textContent = `Question ${currentQuestion} of ${totalQuestions}`;

    for (let key in buttons) {
      buttons[key].disabled = false;
      buttons[key].style.backgroundColor = "";
    }

    speech.textContent = feedbacks.default.text;
    image.src = feedbacks.default.img;
    nextBtn.style.display = "none";

    assignAnswers();
  }


  for (let key in buttons) {
    buttons[key].addEventListener("click", () => {
      if (buttons[key].disabled) return;

      for (let k in buttons) {
        buttons[k].disabled = true;
      }

      const isCorrect = buttons[key].dataset.answer === "Y";

      if (isCorrect) {
        buttons[key].style.backgroundColor = "#28a745";
        speech.textContent = feedbacks.correct.text;
        image.src = feedbacks.correct.img;
        score++;
        console.log("Correct answer selected");
      } else {
        buttons[key].style.backgroundColor = "#dc3545";
        for (let k in buttons) {
          if (buttons[k].dataset.answer === "Y") {
            buttons[k].style.backgroundColor = "#28a745";
          }
        }
        speech.textContent = feedbacks.wrong.text;
        image.src = feedbacks.wrong.img;
        console.log("Wrong answer selected");
      }

      if (currentQuestion === totalQuestions) {
        nextBtn.textContent = "See Score";
      }
      nextBtn.style.display = "inline-block";
    });
  }

  nextBtn.addEventListener("click", () => {
    console.log(currentQuestion);
    currentQuestion++;
    resetUI();
  });


  resetUI();
});
