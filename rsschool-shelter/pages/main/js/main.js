const mainContainer = document.querySelector('.container');
const headerMenu = document.querySelector('.header__menu');
const burgerMenuIcon = document.querySelector('.header__burger-menu');
const menuNav = document.querySelector('.header__nav');
const menuLogo = document.querySelector('.header__logo');
const overlay = document.querySelector('.overlay');

burgerMenuIcon.addEventListener('click', openBurgerMenu);
overlay.addEventListener('click', closeOverlay);

function openBurgerMenu() {
  burgerMenuIcon.classList.toggle('header__burger-menu_change');
  menuNav.classList.toggle('header__nav_change');
  menuLogo.classList.toggle('header__logo_change');
  overlay.classList.toggle('overlay_show');
  document.body.classList.toggle('body_no-scroll');
}

function closeOverlay() {
  burgerMenuIcon.classList.remove('header__burger-menu_change');
  menuNav.classList.remove('header__nav_change');
  menuLogo.classList.remove('header__logo_change');
  overlay.classList.remove('overlay_show');
  document.body.classList.remove('body_no-scroll');
  document.querySelector('.popup').remove();
}

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

function openPopup(element) {
  const popup = document.createElement('section');
  popup.classList.add('popup');
  const popupWrapper = document.createElement('div');
  popupWrapper.classList.add('popup__wrapper');

  const popupImgBlock = document.createElement('div');
  popupImgBlock.classList.add('popup__img-block');
  const popupImg = document.createElement('img');
  popupImg.classList.add('popup__img');
  popupImg.src = element.img;

  const popupContent = document.createElement('div');
  popupContent.classList.add('popup__content-block');

  const name = document.createElement('h3');
  name.classList.add('popup__name', 'title');
  name.innerHTML = element.name;

  const breed = document.createElement('h4');
  breed.classList.add('popup__breed', 'title');
  breed.innerHTML = `${element.type} - ${element.breed}`;

  const description = document.createElement('h5');
  description.classList.add('popup__description', 'title');
  description.innerHTML = element.description;

  const popupDataBlock = document.createElement('ul');
  popupDataBlock.classList.add('popup__data-list');

  Object.entries(element)
    .filter(
      (el) =>
        el[0] === 'age' ||
        el[0] === 'inoculations' ||
        el[0] === 'diseases' ||
        el[0] === 'parasites',
    )
    .forEach((item) => {
      const dataItem = document.createElement('li');
      dataItem.classList.add('popup__data-item', 'title');

      dataItem.innerHTML = Array.isArray(item[1])
        ? `${item[0]}: <span>${item[1].join(', ')}</span>`
        : `${item[0]}: <span>${item[1]}</span>`;

      popupDataBlock.append(dataItem);
    });

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('popup__close-button');
  closeBtn.innerHTML = '&#65794;';

  closeBtn.addEventListener('click', () => {
    closeOverlay();
  });

  overlay.addEventListener('mouseover', () => {
    closeBtn.classList.add('popup__close-button_active');
  });

  overlay.addEventListener('mouseout', () => {
    closeBtn.classList.remove('popup__close-button_active');
  });

  popupContent.append(name, breed, description, popupDataBlock);
  popupImgBlock.append(popupImg);
  popupWrapper.append(popupImgBlock, popupContent);
  popup.append(popupWrapper, closeBtn);
  mainContainer.append(popup);
}

async function getPets() {
  const response = await fetch(
    'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/markups/level-2/shelter/pets.json',
  );
  pets = await response.json();

  const randomly = () => Math.random() - 0.5;
  const result = [...pets].sort(randomly);
  console.log(result);

  const sliderConainer = document.querySelector('.pets__slider');

  result.forEach((element) => {
    const card = document.createElement('div');
    card.className = 'pets__cart';

    card.addEventListener('click', () => {
      openPopup(element);

      overlay.classList.add('overlay_show');
      document.body.classList.toggle('body_no-scroll');
    });

    const img = document.createElement('img');
    img.src = element.img;
    img.alt = 'solo-pets-image';
    img.className = 'pets__image';

    const name = document.createElement('h3');
    name.className = 'pets__name title';
    name.textContent = element.name;

    const button = document.createElement('button');
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
