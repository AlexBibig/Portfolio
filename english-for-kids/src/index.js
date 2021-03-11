import './styles/bootstrap/bootstrap.min.css';
import './styles/main.css';
import cards from './js/cards';
import header from './js/components/header/header';
import { main, closeOverlay } from './js/components/main/main';
import { createCard } from './js/components/card/card';
import { showSucces } from './js/components/success/success';
import { showFailure } from './js/components/failure/failure';
import { showStats } from './js/components/statistics/statistics';

const IMG = require.context('./images/', true, /\.png|jpg|jpeg$/);
const AUDIO = require.context('./', true, /\.mp3$/);
const wrapper = document.createElement('div');
const root = document.querySelector('#root');

wrapper.classList.add('wrapper');
wrapper.append(header, main);
root.append(wrapper);

let play = false;
let startGame = false;
let currentPage;
let currentPageId;
let currentGameArray = [];
let pointsCounter = [];
let mistakesCounter = 0;

const mainContainer = document.querySelector('.main__container');
const pointsConteiner = document.querySelector(
  '.header__points-container',
);
const asideNav = document.querySelector('.aside__nav');

function createFolders(el, index) {
  const folder = document.createElement('div');
  const h2 = document.createElement('h2');
  const img = document.createElement('img');

  folder.classList.add('main__folder');
  if (play) folder.classList.add('main__folder_game-mode');
  h2.innerHTML = el;
  img.src = IMG(`./${cards[index + 1][1].image}`);

  folder.append(img, h2);
  mainContainer.append(folder);

  folder.addEventListener('click', () => {
    const linksList = document.querySelectorAll('a.aside__nav-link');
    for (let i = 0; i < linksList.length; i += 1) {
      linksList[i].classList.remove('aside__nav-link_active');
    }
    linksList[index + 1].classList.add('aside__nav-link_active');

    renderNewElements(el, index);
  });
}

function openFolder(index) {
  const startGameBtn = document.createElement('button');
  startGameBtn.classList.add('main__start-game-button');
  startGameBtn.innerHTML = 'Start game';
  if (play) mainContainer.append(startGameBtn);

  cards[index + 1].forEach((el) => {
    createCard(el, index, play);
  });

  if (play) {
    startGameBtn.addEventListener('click', () => {
      startGameBtn.innerHTML = 'Repeat';
      startGameBtn.style.background = 'skyblue';
      const cardSound = new Audio();
      cardSound.src = AUDIO(`./${currentGameArray[0].audioSrc}`);
      cardSound.play();
      if (!startGame) initGame();
      startGame = true;
    });
  }
}

function renderNewElements(el, index) {
  mainContainer.innerHTML = '';
  pointsConteiner.innerHTML = '';

  currentPage = el;
  currentPageId = index;

  switch (el) {
    case 'Main page':
      cards[0].forEach((element, i) => {
        createFolders(element, i);
      });
      break;
    case 'Statistics':
      showStats();
      break;
    default:
      openFolder(index, play);
      break;
  }

  closeOverlay();
  startGame = false;

  if (play && el !== 'Main page' && el !== 'Statistics') {
    currentGameArray = cards[currentPageId + 1]
      .slice()
      .sort(() => Math.random() - 0.5);

    pointsCounter = [];
    mistakesCounter = 0;
  }
}

function createNavs(el, index) {
  const li = document.createElement('li');
  const a = document.createElement('a');

  a.classList.add('aside__nav-link');
  a.innerHTML = el;
  li.append(a);
  asideNav.append(li);

  li.addEventListener('click', () => {
    const linksList = document.querySelectorAll('a.aside__nav-link');

    for (let i = 0; i < linksList.length; i += 1) {
      linksList[i].classList.remove('aside__nav-link_active');
    }
    a.classList.add('aside__nav-link_active');

    renderNewElements(el, index, play);
  });
}

function initGame() {
  const cardsArr = document.querySelectorAll('.main__card_game-mode');
  const imagesArr = document.querySelectorAll('.main__card-image');

  const cardSound = new Audio();
  const winSound = new Audio();
  const errorSound = new Audio();

  winSound.src = AUDIO('./audio/win_sound.mp3');
  errorSound.src = AUDIO('./audio/error_sound.mp3');
  cardSound.src = AUDIO(`./${currentGameArray[0].audioSrc}`);

  function continueGame(index) {
    winSound.play();
    imagesArr[index].style.filter = 'opacity(30%)';
    imagesArr[index].style.cursor = 'default';
    cardsArr[index].id = 'unactive';
    currentGameArray.shift();

    if (
      pointsCounter.length === imagesArr.length &&
      !currentGameArray.length
    ) {
      pointsConteiner.innerHTML = '';

      showSucces();

      setTimeout(() => {
        initElements();
      }, 5000);
    } else if (!currentGameArray.length) {
      pointsConteiner.innerHTML = '';
      mistakesCounter = pointsCounter.length - imagesArr.length;

      showFailure(mistakesCounter);

      setTimeout(() => {
        initElements();
      }, 5000);
    } else {
      cardSound.src = AUDIO(`./${currentGameArray[0].audioSrc}`);
      setTimeout(() => {
        cardSound.play();
      }, 1000);
    }
  }

  cardsArr.forEach((el, index) => {
    el.addEventListener('click', () => {
      pointsCounter.push(el.id);
      if (
        el.id === currentGameArray[0].word &&
        currentGameArray.length
      ) {
        const success = document.createElement('span');
        success.innerHTML = '&#10003;';
        success.style.color = 'green';
        pointsConteiner.append(success);
        continueGame(index);
      } else if (el.id !== 'unactive') {
        const failure = document.createElement('span');
        failure.innerHTML = '&#65794;';
        failure.style.color = 'red';
        pointsConteiner.append(failure);
        errorSound.play();
      }
    });
  });
}

function initElements() {
  startGame = false;
  mistakesCounter = 0;
  mainContainer.innerHTML = '';
  asideNav.innerHTML = '';

  createNavs('Main page', undefined, play);
  cards[0].forEach((el, index) => {
    createNavs(el, index, play);
    createFolders(el, index, play);
  });
  createNavs('Statistics', undefined, play);

  currentPage = 'Main page';
  currentPageId = undefined;

  const linksList = document.querySelectorAll('.aside__nav-link');
  linksList[0].classList.add('aside__nav-link_active');
}

initElements();

const switcher = document.getElementById('switch');
switcher.addEventListener('click', () => {
  switcher.classList.toggle('header__swicher-active');
  play = !play;
  renderNewElements(currentPage, currentPageId);
});
