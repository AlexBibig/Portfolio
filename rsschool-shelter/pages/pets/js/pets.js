// burger menu

const headerMenu = document.querySelector('.header__menu');
const burgerMenuIcon = document.querySelector('.header__burger-menu');
const menuNav = document.querySelector('.header__nav');
const menuLogo = document.querySelector('.header__logo');
const overlay = document.querySelector('.overlay');
const header = document.querySelector('.header');

burgerMenuIcon.addEventListener('click', openBurgerMenu);
overlay.addEventListener('click', closeBurgerMenu);

// BurgerMenu
function openBurgerMenu() {
  burgerMenuIcon.classList.toggle('header__burger-menu_change');
  menuNav.classList.toggle('header__nav_change');
  menuLogo.classList.toggle('header__logo_change');
  overlay.classList.toggle('overlay_show');
  document.body.classList.toggle('body_no-scroll');
}

function closeBurgerMenu() {
  burgerMenuIcon.classList.remove('header__burger-menu_change');
  menuNav.classList.remove('header__nav_change');
  menuLogo.classList.remove('header__logo_change');
  overlay.classList.remove('overlay_show');
  document.body.classList.remove('body_no-scroll');
}

burgerMenuIcon.addEventListener('click', openBurgerMenu);
