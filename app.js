let drawnNumbersList = [];
let sizeLimit = 10;
let secretNumber = generateRandomNumber();
let attempts = 1;

function showTextInTheScreen(tag, text) {
  let field = document.querySelector(tag);
  field.innerHTML = text;
  responsiveVoice.speak(text, 'US English Male');
}

function showInitialMessage() {
  showTextInTheScreen('h1', 'The Secret Number Game');
  showTextInTheScreen('p', 'Guess the secret number between 1 and 10');
}

showInitialMessage();

function validateShot() {
  let shot = document.querySelector('input').value;

  if (shot == secretNumber) {
    showTextInTheScreen('h1', 'Congratulations! You got it right!');
    let attemptWord = attempts > 1 ? 'attempts' : 'attempt';
    let attemptsMessage = `You got it right in ${attempts} ${attemptWord}`;
    showTextInTheScreen('p', attemptsMessage);
    document.getElementById('restart').removeAttribute('disabled');
  } else {
    if (shot > secretNumber) {
      showTextInTheScreen('p', 'Wrong! The secret number is less than that');
    } else {
      showTextInTheScreen('p', 'Wrong! The secret number is greater than that');
    }
    attempts++;
    clearInput();
  }
}

function generateRandomNumber() {
  let numberSelected = parseInt(Math.random() * sizeLimit + 1);
  let numbersQuantity = drawnNumbersList.length;

  if (numbersQuantity == sizeLimit) {
    drawnNumbersList = [];
  }

  if (drawnNumbersList.includes(numberSelected)) {
    return generateRandomNumber();
  }
  else {
    drawnNumbersList.push(numberSelected);
    return numberSelected;
  }
}

function clearInput() {
  shot = document.querySelector('input');
  shot.value = '';
}

function restartGame() {
  secretNumber = generateRandomNumber();
  attempts = 1;
  clearInput();
  showInitialMessage();
  document.getElementById('restart').setAttribute('disabled', true);
}

