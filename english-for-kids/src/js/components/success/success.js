const IMG = require.context(
  '../../../images/',
  true,
  /\.png|jpg|jpeg$/,
);
const AUDIO = require.context('../../../', true, /\.mp3$/);

function showSucces() {
  const mainContainer = document.querySelector('.main__container');
  mainContainer.innerHTML = '';
  const resultContainer = document.createElement('div');
  resultContainer.classList.add('main__result-container');

  const img = document.createElement('img');
  img.src = IMG('./img/success.jpg');

  const h2 = document.createElement('h2');
  h2.style.width = '100%';
  h2.innerHTML = 'You win!';

  mainContainer.append(h2, img);

  const sound = new Audio();
  sound.src = AUDIO('./audio/success.mp3');
  sound.play();
}

export { showSucces };
