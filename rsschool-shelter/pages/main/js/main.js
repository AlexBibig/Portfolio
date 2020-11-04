// burger menu

const headerMenu = document.querySelector('.header__menu');
const burgerMenuIcon = document.querySelector('.header__burger-menu');
const menuNav = document.querySelector('.header__nav');
const menuLogo = document.querySelector('.header__logo');
const overlay = document.querySelector('.overlay');

// other variables

burgerMenuIcon.addEventListener('click', openBurgerMenu);

// openBurgerMenu
function openBurgerMenu() {
  burgerMenuIcon.classList.toggle('header__burger-menu_change');
  menuNav.classList.toggle('header__nav_change');
  menuLogo.classList.toggle('header__logo_change');
  overlay.classList.toggle('overlay_show');
  document.body.classList.toggle('body_no-scroll');
}
// slider
function setSlider() {
  const slider = new Siema({
    perPage: {
      320: 1,
      768: 2,
      1280: 3,
    },
    loop: true,
  });

  const screenWidth = window.screen.width;
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  if (screenWidth < 768) {
    prevBtn.addEventListener('click', () => slider.prev(1));
    nextBtn.addEventListener('click', () => slider.next(1));
  } else if (screenWidth < 1280) {
    prevBtn.addEventListener('click', () => slider.prev(2));
    nextBtn.addEventListener('click', () => slider.next(2));
  } else {
    prevBtn.addEventListener('click', () => slider.prev(3));
    nextBtn.addEventListener('click', () => slider.next(3));
  }
}

async function getPets() {
  const response = await fetch(
    'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/markups/level-2/shelter/pets.json',
  );
  pets = await response.json();

  const randomly = () => Math.random() - 0.5;
  let result = [...pets].sort(randomly);

  const sliderConainer = document.querySelector('.pets__slider');

  result.forEach(element => {
    let card = document.createElement('div');
    card.className = 'pets__cart';

    let img = document.createElement('img');
    img.src = element.img;
    img.alt = 'solo-pets-image';
    img.className = 'pets__image';

    let name = document.createElement('h3');
    name.className = 'pets__name title';
    name.textContent = element.name;

    let button = document.createElement('button');
    button.className = 'pets__button secondary-button';
    button.textContent = 'Learn more';

    card.append(img);
    card.append(name);
    card.append(button);

    sliderConainer.append(card);
  });

  setSlider();
}

getPets();
