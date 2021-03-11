const IMG = require.context(
  '../../../images/',
  true,
  /\.png|jpg|jpeg$/,
);
const AUDIO = require.context('../../../', true, /\.mp3$/);

function createCard(el, index, play) {
  const card = document.createElement('div');
  const cardFront = document.createElement('div');
  const cardBack = document.createElement('div');
  const cardContent = document.createElement('div');
  const h3 = document.createElement('h3');
  const h3translation = document.createElement('h3');
  const img = document.createElement('img');
  const imgBack = document.createElement('img');
  const tarnslateBtn = document.createElement('a');
  const translateBtnImg = document.createElement('img');
  const mainContainer = document.querySelector('.main__container');

  card.classList.add('main__card');
  if (play) card.classList.add('main__card_game-mode');
  cardFront.classList.add('main__card-front');
  cardBack.classList.add('main__card-back');
  cardContent.classList.add('main__card-content');
  tarnslateBtn.classList.add('translate-button');

  h3.innerHTML = el.word;
  h3translation.innerHTML = el.translation;
  img.src = IMG(`./${el.image}`);
  img.classList.add('main__card-image');
  imgBack.src = IMG(`./${el.image}`);
  card.id = el.word;
  translateBtnImg.src = IMG('./icons/translate-button.png');

  tarnslateBtn.append(translateBtnImg);
  cardContent.append(img, h3);
  cardFront.append(cardContent, tarnslateBtn);
  cardBack.append(imgBack, h3translation);
  card.append(cardFront, cardBack);
  mainContainer.append(card);

  if (!play) {
    tarnslateBtn.addEventListener('click', () => {
      cardFront.classList.add('main__card-front_reverse');
      cardBack.classList.add('main__card-back_reverse');
    });

    card.addEventListener('mouseleave', () => {
      cardFront.classList.remove('main__card-front_reverse');
      cardBack.classList.remove('main__card-back_reverse');
    });

    cardContent.addEventListener('click', () => {
      const sound = new Audio();
      sound.src = AUDIO(`./${el.audioSrc}`);
      sound.play();
    });
  }
}

export { createCard };
