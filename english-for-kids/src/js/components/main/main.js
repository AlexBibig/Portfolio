const main = document.createElement('main');
const aside = document.createElement('aside');
const burgerMenu = document.createElement('div');
const asideNav = document.createElement('ul');
const mainContainer = document.createElement('section');
const overlay = document.createElement('div');
const burgerMenuLines = 3;

aside.classList.add('aside');
burgerMenu.classList.add('aside__burger-menu');
asideNav.classList.add('aside__nav');
mainContainer.classList.add('main__container');
overlay.classList.add('overlay');

for (let i = 0; i < burgerMenuLines; i += 1) {
  const burgerMenuLine = document.createElement('div');
  burgerMenuLine.classList.add(
    'aside__burger-menu-line',
    `aside__burger-menu-line_line-${i + 1}`,
  );
  burgerMenu.append(burgerMenuLine);
}

aside.append(burgerMenu, asideNav);
main.append(aside, mainContainer, overlay);

function openBurgerMenu() {
  burgerMenu.classList.toggle('aside__burger-menu_open');
  asideNav.classList.toggle('aside__nav_open');
  overlay.classList.toggle('overlay_show');
  document.body.classList.toggle('body_no-scroll');
}

function closeOverlay() {
  burgerMenu.classList.remove('aside__burger-menu_open');
  asideNav.classList.remove('aside__nav_open');
  overlay.classList.remove('overlay_show');
  document.body.classList.remove('body_no-scroll');
}

burgerMenu.addEventListener('click', openBurgerMenu);
overlay.addEventListener('click', closeOverlay);

export { closeOverlay, main };
