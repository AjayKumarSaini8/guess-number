let randomNumber = generateRandomNumber();
const submit = document.querySelector('#submit');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');
const p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;
let playGame = true;

function generateRandomNumber() {
  return parseInt(Math.random() * 100 + 1);
}

function startNewGame() {
  randomNumber = generateRandomNumber();
  prevGuess = [];
  numGuess = 1;
  guessSlot.innerHTML = '';
  remaining.innerHTML = `${11 - numGuess}`;
  userInput.removeAttribute('disabled');
  startOver.removeChild(p);
  playGame = true;
}

function validateGuess(guess) {
  if (isNaN(guess) || guess < 1 || guess > 100) {
    alert('Please enter a valid number between 1 and 100');
  } else {
    prevGuess.push(guess);
    if (numGuess === 11) {
      displayGuess(guess);
      dispalyMessage(`Game Over. Random number was ${randomNumber}`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNumber) {
    dispalyMessage('You guessed it right 🔥🔥🔥');
    endGame();
  } else if (guess < randomNumber) {
    dispalyMessage('Your number is too low');
  } else if (guess > randomNumber) {
    dispalyMessage('Your number is too high');
  }
}

function displayGuess(guess) {
  userInput.value = '';
  guessSlot.innerHTML += `${guess}  `;
  numGuess++;
  remaining.innerHTML = `${11 - numGuess}`;
}

function dispalyMessage(message) {
  lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
  userInput.value = '';
  userInput.setAttribute('disabled', '');
  p.classList.add('button');
  p.innerHTML = `<button id="newGame">Start new game</button>`;
  startOver.appendChild(p);
  playGame = false;
}

if (playGame) {
  submit.addEventListener('click', (e) => {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    console.log(guess);
    validateGuess(guess);
  });
}

startOver.addEventListener('click', (e) => {
  if (e.target.id === 'newGame') {
    startNewGame();
  }
});
