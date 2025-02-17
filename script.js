let secretNumber;
let score = 0;
let gamesPlayed = 0;
let highScore = 0;
let tries = 0;

function startGame() {
  const difficulty = document.getElementById("difficulty").value;
  secretNumber = Math.floor(Math.random() * difficulty) + 1;
  tries = 0;
  document.getElementById(
    "guessLabel"
  ).innerText = `Guess the Number between 1 and ${difficulty}`;
  document.getElementById("resultLabel").innerText = "";
  animateNumber("gamesPlayed", ++gamesPlayed);
  animateNumber("tries", tries);
}

function checkGuess() {
  const guess = parseInt(document.getElementById("guessInput").value);
  tries++;
  animateNumber("tries", tries);

  if (guess === secretNumber) {
    document.getElementById("resultLabel").innerText =
      "Correct! You guessed it!";
    document.getElementById("resultLabel").classList.add("correct");
    setTimeout(
      () => document.getElementById("resultLabel").classList.remove("correct"),
      500
    );
  } else {
    document.getElementById("resultLabel").classList.add("wrong");
    setTimeout(
      () => document.getElementById("resultLabel").classList.remove("wrong"),
      500
    );
  }

  if (isNaN(guess)) {
    document.getElementById("resultLabel").innerText =
      "Please enter a valid number.";
    return;
  }

  if (guess === secretNumber) {
    document.getElementById("resultLabel").innerText =
      "Correct! You guessed it!";
    score++;
    animateNumber("correctGuesses", score);
    if (score > highScore) {
      highScore = score;
      animateNumber("highScore", highScore);
    }
    document.getElementById("guessInput").value = "";
  } else if (guess < secretNumber) {
    document.getElementById("resultLabel").innerText = "Too low!";
  } else {
    document.getElementById("resultLabel").innerText = "Too high!";
  }
}

// Animation function to incrementally update numbers
function animateNumber(id, endValue) {
  const element = document.getElementById(id);
  let startValue = parseInt(element.innerText);
  const duration = 500; // Animation duration in milliseconds
  const increment = Math.ceil((endValue - startValue) / (duration / 50));

  const update = () => {
    startValue += increment;
    if (
      (increment > 0 && startValue >= endValue) ||
      (increment < 0 && startValue <= endValue)
    ) {
      element.innerText = endValue;
    } else {
      element.innerText = startValue;
      requestAnimationFrame(update);
    }
  };
  update();
}

function updateScore() {
  animateNumber("correctGuesses", score);
}

function updateGamesPlayed() {
  animateNumber("gamesPlayed", gamesPlayed);
}

function updateHighScore() {
  animateNumber("highScore", highScore);
}

function updateTries() {
  animateNumber("tries", tries);
}
