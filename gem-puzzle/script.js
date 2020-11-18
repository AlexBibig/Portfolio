let numbersOfButtons = 16;
let oneButtonSize = 75;
let buttonSizes = 74;
let moveCounter = 0;
let sound = true;
let gamePaused = false;
let gameTime = 0;

let positions = [];

initElements();

const grid = document.querySelector('.grid');
const gridButton = document.querySelector('.grid-button');
const move = document.querySelector('.move');
const restartButton = document.querySelector('.button_restart');
const pauseButton = document.querySelector('.button_pause');
const saveGameButton = document.querySelector('.button_save');
const timeCounter = document.querySelector('.time');

const button3x3 = document.querySelector('.button3x3');
const button4x4 = document.querySelector('.button4x4');
const button5x5 = document.querySelector('.button5x5');
const button6x6 = document.querySelector('.button6x6');
const button7x7 = document.querySelector('.button7x7');
const button8x8 = document.querySelector('.button8x8');

const overlay = document.querySelector('.overlay');
const resumeItems = document.querySelector('.resume-items');
const soundButton = document.querySelector('.sound-button');
const keepPlaying = document.querySelector('.keep-playing');
const loadSavedGame = document.querySelector('.load-game');
const newGame = document.querySelector('.new-game');

function initElements() {
  //init game

  const game = document.createElement('div');
  game.classList.add('game');

  const menu = document.createElement('div');
  menu.classList.add('menu');

  const buttonPause = document.createElement('button');
  buttonPause.classList.add('button_pause');
  buttonPause.innerHTML = 'Pause';
  menu.append(buttonPause);

  const buttonRestart = document.createElement('button');
  buttonRestart.classList.add('button_restart');
  buttonRestart.innerHTML = 'New game';
  menu.append(buttonRestart);

  const buttonSave = document.createElement('button');
  buttonSave.classList.add('button_save');
  buttonSave.innerHTML = 'Save game';
  menu.append(buttonSave);

  const grid = document.createElement('div');
  grid.classList.add('grid');

  const stats = document.createElement('div');
  stats.classList.add('stats');

  const move = document.createElement('span');
  move.classList.add('move');
  stats.append(move);

  const timeCounter = document.createElement('span');
  timeCounter.classList.add('time');
  stats.append(timeCounter);

  // field selector

  const fieldSelector = document.createElement('div');
  fieldSelector.classList.add('menu', 'field-selector');

  const button3x3 = document.createElement('button');
  button3x3.classList.add('button3x3');
  button3x3.innerHTML = '3 x 3';
  fieldSelector.append(button3x3);

  const button4x4 = document.createElement('button');
  button4x4.classList.add('button4x4');
  button4x4.innerHTML = '4 x 4';
  fieldSelector.append(button4x4);

  const button5x5 = document.createElement('button');
  button5x5.classList.add('button5x5');
  button5x5.innerHTML = '5 x 5';
  fieldSelector.append(button5x5);

  const button6x6 = document.createElement('button');
  button6x6.classList.add('button6x6');
  button6x6.innerHTML = '6 x 6';
  fieldSelector.append(button6x6);

  const button7x7 = document.createElement('button');
  button7x7.classList.add('button7x7');
  button7x7.innerHTML = '7 x 7';
  fieldSelector.append(button7x7);

  const button8x8 = document.createElement('button');
  button8x8.classList.add('button8x8');
  button8x8.innerHTML = '8 x 8';
  fieldSelector.append(button8x8);

  game.append(menu);
  game.append(grid);
  game.append(stats);
  game.append(fieldSelector);
  document.body.append(game);

  // init overlay

  const overlay = document.createElement('div');
  overlay.classList.add('overlay');

  const resumeItems = document.createElement('div');
  resumeItems.classList.add('resume-items');

  const keepPlaying = document.createElement('p');
  keepPlaying.classList.add('resume-item', 'keep-playing');
  keepPlaying.innerHTML = `Keep playing`;
  resumeItems.append(keepPlaying);

  const newGame = document.createElement('p');
  newGame.classList.add('resume-item', 'new-game');
  newGame.innerHTML = `New game`;
  resumeItems.append(newGame);

  const loadGame = document.createElement('p');
  loadGame.classList.add('resume-item', 'load-game');
  loadGame.innerHTML = `Load saved game`;
  resumeItems.append(loadGame);

  const soundButton = document.createElement('p');
  soundButton.classList.add('resume-item', 'sound-button');
  soundButton.innerHTML = `<i class="material-icons">volume_up</i>`;
  resumeItems.append(soundButton);

  overlay.append(resumeItems);
  document.body.append(overlay);
}

function initGame(savedGameValues) {
  move.innerHTML = `Moves: ${moveCounter}`;
  showTime();

  let numbers = savedGameValues ? savedGameValues : randomize();

  for (let i = 0; i < numbers.length; i++) {
    const value = savedGameValues ? savedGameValues[i].value : numbers[i];
    const left = savedGameValues ? savedGameValues[i].left : i % Math.sqrt(numbersOfButtons);
    const top = savedGameValues ? savedGameValues[i].top : (i - left) / Math.sqrt(numbersOfButtons);

    if (value) {
      const button = document.createElement('button');
      button.style.width = `${buttonSizes}px`;
      button.style.height = `${buttonSizes}px`;
      button.innerHTML = value;

      positions.push({
        value: value,
        left: left,
        top: top,
        element: button,
      });

      button.style.left = `${left * oneButtonSize}px`;
      button.style.top = `${top * oneButtonSize}px`;
      grid.append(button);

      button.addEventListener('click', () => {
        moveButton(i);
      });
    } else {
      positions.push({
        value: value,
        left: left,
        top: top,
      });
    }
  }
}

function loadGame(savedGameValues, savedGameMoves, savedGameTime) {
  moveCounter = savedGameMoves;
  gameTime = savedGameTime;

  grid.innerHTML = '';
  positions = [];

  initGame(savedGameValues);
}

function randomize() {
  let rnd = new Array(),
    rsh = 1,
    s,
    k;

  while (rsh % 2) {
    for (let j = 0; j < numbersOfButtons; j++) rnd[j] = j;
    rnd.sort(() => Math.random() - 0.5);

    for (rsh = j = 0; j < 14; rsh += s, j++)
      for (s = 0, k = j + 1; k < 15; k++) if (rnd[k] < rnd[j]) s++;
  }

  // rnd = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 0];

  return rnd;
}

function restart() {
  moveCounter = 0;
  gameTime = 0;

  grid.innerHTML = '';
  positions = [];

  initGame();
}

function moveButton(index) {
  const buttonPosition = positions[index];
  const emptyField = positions.filter(el => el.value === 0);

  const leftDiff = Math.abs(emptyField[0].left - buttonPosition.left);
  const topDiff = Math.abs(emptyField[0].top - buttonPosition.top);

  if (leftDiff + topDiff > 1) {
    return;
  }

  buttonPosition.element.style.left = `${emptyField[0].left * oneButtonSize}px`;
  buttonPosition.element.style.top = `${emptyField[0].top * oneButtonSize}px`;

  const emptyLeft = emptyField[0].left;
  const emptyTop = emptyField[0].top;

  emptyField[0].left = buttonPosition.left;
  emptyField[0].top = buttonPosition.top;

  buttonPosition.left = emptyLeft;
  buttonPosition.top = emptyTop;

  playAudio();

  move.innerHTML = `Moves: ${++moveCounter}`;

  let finalPositions = positions.filter(el => el.value !== 0);
  let zeroPosition = positions.find(el => el.value === 0);

  const isFinished =
    finalPositions.every(position => {
      return position.value === position.top * Math.sqrt(numbersOfButtons) + position.left;
    }) ||
    finalPositions.every(position => {
      return (
        position.value === position.top * Math.sqrt(numbersOfButtons) + position.left + 1 &&
        zeroPosition.value === zeroPosition.left - zeroPosition.top
      );
    });

  if (isFinished) {
    overlay.classList.add('overlay_show');

    let minutes = parseInt(gameTime / 60);
    if (minutes < 1) minutes = 0;
    gameTime = parseInt(gameTime - minutes * 60);
    if (minutes < 10) minutes = '0' + minutes;

    let seconds = gameTime;
    if (seconds < 10) seconds = '0' + seconds;

    const congrads = document.createElement('h1');
    congrads.innerHTML = `Congratulations! You solved the puzzle in ${minutes}:${seconds} and ${moveCounter} moves`;
    resumeItems.prepend(congrads);

    keepPlaying.setAttribute('disabled', 'true');
    gamePaused = !gamePaused;
  }
}

function playAudio() {
  if (!sound) return;
  let audio = new Audio();
  audio.src = './assets/audio/moving_sound.mp3';
  audio.play();
}

function showTime() {
  let time = gameTime;

  let minutes = parseInt(time / 60);
  if (minutes < 1) minutes = 0;
  time = parseInt(time - minutes * 60);
  if (minutes < 10) minutes = '0' + minutes;

  let seconds = time;
  if (seconds < 10) seconds = '0' + seconds;

  timeCounter.innerHTML = `Game time: ${minutes}:${seconds}`;
}

restartButton.addEventListener('click', () => {
  restart();
});

pauseButton.addEventListener('click', () => {
  overlay.classList.add('overlay_show');
  gamePaused = !gamePaused;
});

saveGameButton.addEventListener('click', () => {
  localStorage.clear();
  localStorage.setItem('positions', JSON.stringify(positions));
  localStorage.setItem('moves', moveCounter);
  localStorage.setItem('time', gameTime);
});

keepPlaying.addEventListener('click', () => {
  if (keepPlaying.attributes.disabled) {
    return;
  } else {
    overlay.classList.remove('overlay_show');
    gamePaused = !gamePaused;
  }
});

loadSavedGame.addEventListener('click', () => {
  const savedGameValues = JSON.parse(localStorage.getItem('positions'));
  const savedGameMoves = localStorage.getItem('moves');
  const savedGameTime = localStorage.getItem('time');

  loadGame(savedGameValues, savedGameMoves, savedGameTime);
  overlay.classList.remove('overlay_show');

  gamePaused = !gamePaused;

  if (keepPlaying.attributes.disabled) {
    keepPlaying.removeAttribute('disabled');
    resumeItems.removeChild(resumeItems.firstChild);
  }
});

newGame.addEventListener('click', () => {
  overlay.classList.remove('overlay_show');
  restart();
  gamePaused = !gamePaused;

  if (keepPlaying.attributes.disabled) {
    keepPlaying.removeAttribute('disabled');
    resumeItems.removeChild(resumeItems.firstChild);
  }
});

soundButton.addEventListener('click', () => {
  sound = !sound;
  !sound
    ? (soundButton.innerHTML = `<i class="material-icons">volume_off</i>`)
    : (soundButton.innerHTML = `<i class="material-icons">volume_up</i>`);
});

button3x3.addEventListener('click', () => {
  numbersOfButtons = 9;
  oneButtonSize = 100;
  buttonSizes = 99;

  restart();
});

button4x4.addEventListener('click', () => {
  numbersOfButtons = 16;
  oneButtonSize = 75;
  buttonSizes = 74;

  restart();
});

button5x5.addEventListener('click', () => {
  numbersOfButtons = 25;
  oneButtonSize = 60;
  buttonSizes = 59;

  restart();
});

button6x6.addEventListener('click', () => {
  numbersOfButtons = 36;
  oneButtonSize = 50;
  buttonSizes = 49;

  restart();
});

button7x7.addEventListener('click', () => {
  numbersOfButtons = 49;
  oneButtonSize = 43;
  buttonSizes = 42;

  restart();
});

button8x8.addEventListener('click', () => {
  numbersOfButtons = 64;
  oneButtonSize = 38;
  buttonSizes = 36;

  restart();
});

initGame();
setInterval(() => {
  if (!gamePaused) {
    gameTime++;
    showTime();
  }
}, 1000);
