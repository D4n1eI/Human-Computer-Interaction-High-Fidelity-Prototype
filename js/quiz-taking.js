document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".option");
    const speech = document.getElementById("feedback-text");
    const image = document.getElementById("feedback-img");
    const feedbacks = {
      correct: {
        text: "YES! You got it! You're on fire! 🔥",
        img: "../assets/pixel/var6_happy.png"
      },
      wrong: {
        text: "Oops... Not quite. Try again, you'll get it next time!",
        img: "../assets/pixel/var6_sad.png"
      }
    };

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        // Reset all buttons
        buttons.forEach(b => {
          b.style.backgroundColor = ""; // reset
        });

        const rolled = Math.floor(Math.random() * 4) + 1;
        const userChoice = parseInt(btn.getAttribute("data-option"));

        if (userChoice === rolled) {
          btn.style.backgroundColor = "#28a745"; // green
          speech.textContent = feedbacks.correct.text;
          image.src = feedbacks.correct.img;
        } else {
          btn.style.backgroundColor = "#dc3545"; // red
          speech.textContent = feedbacks.wrong.text;
          image.src = feedbacks.wrong.img;
        }
      });
    });
  });