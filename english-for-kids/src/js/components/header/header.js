const header = document.createElement('header');
header.classList.add('header__container');

const h1 = document.createElement('h1');
const switcher = document.createElement('div');
const switcherButton = document.createElement('button');
const pointsConteiner = document.createElement('div');
const playText = document.createElement('span');
const trainText = document.createElement('span');

h1.classList.add('header__title');
h1.innerHTML = 'English for Kids';

pointsConteiner.classList.add('header__points-container');

switcher.classList.add('header__swicher');
switcher.id = 'switch';

playText.classList.add('swicher-play');
playText.innerHTML = 'play';

trainText.classList.add('swicher-train');
trainText.innerHTML = 'train';

switcher.append(switcherButton, trainText, playText);
header.append(h1, pointsConteiner, switcher);

export default header;
