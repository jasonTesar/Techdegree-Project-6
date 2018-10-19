// Variables
const keyboard = document.getElementById('qwerty');
const overlay = document.getElementById('overlay');
const button = document.querySelector('.btn__reset');
const scoreboard = document.querySelector('ol');
const lives = scoreboard.children;
const keys = document.querySelectorAll('.keyrow button');
let phrase = document.getElementById('phrase');
let ul = phrase.firstElementChild;
let missed = 0;
const phrases = [
  'a bright future',
  'as a last resort',
  'all hands on deck',
  'back to the basics',
  'below the surface',
  'filled with joy',
  'killing time',
  'one for the money',
  'par for the course',
  'run a tight ship'
];

// Resets lives
function resetLives() {
  let numLives = lives.length;
  let newLives = (5 - numLives);
  for (let i = 1; i <= newLives; i += 1) {
    let li = document.createElement('li');
    li.className = 'tries';
    let img = document.createElement('img');
    img.src = 'images/liveHeart.png';
    img.height = '35';
    img.width = '30';
    img.style.margin = '1.75px';
    li.appendChild(img);
    scoreboard.appendChild(li);
  };
}

// Resets keyboard
function resetKeyboard() {
  for (let i = 0; i < keys.length; i += 1) {
    keys[i].className = '';
    keys[i].disabled = false;
  };
}

// Resets phrase
function resetPhrase() {
  if (ul.children.length > 0) {
    ul.innerHTML = '';
  };
  setPhrase();
}

// Hides overlay
function hideOverlay() {
  overlay.style.display = 'none';
}

// Listens for button click on overlay screen
overlay.addEventListener('click', (e) => {
  if (e.target.tagName == 'BUTTON') {
    if (button.textContent == 'Start Game') {
      hideOverlay();
    } else if (button.textContent == 'Play Again') {
      missed = 0;
      resetLives();
      resetKeyboard();
      resetPhrase();
      hideOverlay();
    };
  };
});

// Accepts array of phrases, randomly selects one, parses into array of characters (including whitespace)
function getRandomPhraseAsArray(array) {
  let number = Math.floor(Math.random() * array.length);
  let randomPhrase = array[number].split("");
  return randomPhrase;
}

// Accepts array of characters from addPhraseToDisplay(), creates an li for each, sets its class name, appends it to "phrase" ul
function addPhraseToDisplay(array) {
  for (let i = 0; i < array.length; i += 1) {
    let li = document.createElement('li');
    li.textContent = array[i];
    if (array[i] === ' ') {
      li.className = 'space';
    } else {
      li.className = 'letter';
    };
    ul.appendChild(li);
  };
}

// Sets phrase
function setPhrase() {
  let phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);
}

// Sets phrase on first page load
setPhrase();

// Compares button click letter to letters in phrase
function checkLetter(letter) {
  let match = false;
  const letters = ul.getElementsByClassName('letter');
  for (let i = 0; i < letters.length; i += 1) {
    if (letters[i].textContent == letter) {
      letters[i].classList.add('show', 'fade');
      match = true;
    };
  };
  if (match) {
    return letter;
  } else {
    return null;
  };
}

// Checks if user has won or lost, modifies the overlay screen accordingly
function checkWin(missed) {
  let guessed = document.getElementsByClassName('show');
  let all = document.getElementsByClassName('letter');
  let title = overlay.firstElementChild;
  if (guessed.length >= all.length || missed >= 5) {
    overlay.style.display = 'flex';
    button.textContent = 'Play Again';
    if (guessed.length >= all.length) {
      overlay.className = 'win';
      title.textContent = 'Congratulations. You Won!';
    } else if (missed >= 5) {
      overlay.className = 'lose';
      title.textContent = 'Sorry. You Lost!';
    };
  };
}

// Removes one life
function removeLife() {
  let life = lives[0];
  scoreboard.removeChild(life);
}

// Listens for keyboard button click, adds "chosen" class to that letter & disables it, removes 1 life if letter was incorrect, checks win status
keyboard.addEventListener('click', (e) => {
  if (e.target.tagName == 'BUTTON') {
    let letter = e.target.textContent;
    e.target.classList.add('chosen');
    e.target.disabled = true;
    let letterFound = checkLetter(letter);
    if (letterFound == null) {
      missed += 1;
      removeLife();
    };
    checkWin(missed);
  };
});
