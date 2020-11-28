const time = document.querySelector('.time');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const focus = document.querySelector('.focus');

// update background

let today = new Date();
let buttonCounter = today.getHours();
let randomBackgrounds = getRandomBackgrounds();
let currentBackground;
const upgradeBackgroundBtn = document.querySelector('.background-btn');

// update quote

const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const upgradeQuotationBtn = document.querySelector('.quotation-btn');

// weather

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-discription');
const city = document.querySelector('.city');
const windSpeed = document.querySelector('.windSpeed');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');

// show time

function showTime() {
  const daysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthsArr = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let today = new Date();
  let hour = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
  let day = daysArr[today.getDay()];
  let date = today.getDate();
  let month = monthsArr[today.getMonth()];

  time.innerHTML = `<p class='dateDescription'>${day}, ${month} ${date}</p> ${addZero(
    hour,
  )}<span>:</span>${addZero(minutes)}<span>:</span>${addZero(seconds)}`;
  setTimeout(showTime, 1000);
}
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// backgrounds

function getRandomBackgrounds(min = 1, max = 20, n = 6) {
  function randomize() {
    const result = new Set();
    while (result.size < n) result.add(addZero(Math.floor(Math.random() * (max - min + 1)) + min));
    return Array.from(result);
  }

  let result = [];

  for (let i = 0; i < 4; i++) {
    if (i === 0) {
      randomize().forEach(el => result.push(`./assets/images/night/${el}.jpg`));
    }
    if (i === 1) {
      randomize().forEach(el => result.push(`./assets/images/morning/${el}.jpg`));
    }
    if (i === 2) {
      randomize().forEach(el => result.push(`./assets/images/day/${el}.jpg`));
    }
    if (i === 3) {
      randomize().forEach(el => result.push(`./assets/images/evening/${el}.jpg`));
    }
  }

  return result;
}
function setBackgroundAndGreet(buttonCounter) {
  let date = new Date();
  let hour = date.getHours();
  currentBackground = hour;
  let hourMarker = buttonCounter === undefined ? hour : buttonCounter;

  if (hour >= 0 && hour < 6) {
    greeting.textContent = 'Good night, ';
  } else if (hour < 12) {
    greeting.textContent = 'Good morning, ';
  } else if (hour < 18) {
    greeting.textContent = 'Good afternoon, ';
  } else if (hour <= 23) {
    greeting.textContent = 'Good evening, ';
  }

  const img = document.createElement('img');
  img.src = randomBackgrounds[hourMarker];
  img.onload = () => {
    document.body.style.background = `url(${img.src})`;
  };
}
function setNewBackground() {
  buttonCounter >= 23 ? (buttonCounter = 0) : buttonCounter++;
  setBackgroundAndGreet(buttonCounter);

  upgradeBackgroundBtn.disabled = true;
  setTimeout(function () {
    upgradeBackgroundBtn.disabled = false;
  }, 1200);
}

// getQuote

async function getQuote() {
  const url = `https://quote-garden.herokuapp.com/api/v2/quotes/random`;
  const res = await fetch(url);
  const data = await res.json();
  blockquote.innerText = `" ${data.quote.quoteText} "`;
  figcaption.textContent = data.quote.quoteAuthor;
}

// Name and Focus to LocalStorage

function getName() {
  if (localStorage.getItem('name') === null) {
    name.innerText = '[Enter Name]';
  } else {
    name.innerText = localStorage.getItem('name');
  }
}

function clickName() {
  name.innerText = '';
}

function setName(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      if (name.innerText === '') {
        name.innerText = localStorage.getItem('name');
        e.preventDefault();
        name.blur();
      } else if (name.innerText === '' && localStorage.getItem('name') === null) {
        name.innerText = '[Enter Name]';
      } else {
        localStorage.setItem('name', e.target.innerText);
        name.blur();
      }
    }
  } else {
    if (localStorage.getItem('name') === null) {
      name.textContent = '[Enter Name]';
    } else {
      name.textContent = localStorage.getItem('name');
    }
  }
}

function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

function clickFocus() {
  focus.textContent = '';
}

function setFocus(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      if (focus.textContent === '') {
        focus.textContent = localStorage.getItem('focus');
        e.preventDefault();
        focus.blur();
      } else if (focus.textContent === '' && localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter focus]';
      } else {
        localStorage.setItem('focus', e.target.innerText);
        focus.blur();
      }
    }
  } else {
    if (localStorage.getItem('focus') === null) {
      focus.textContent = '[Enter focus]';
    } else {
      focus.textContent = localStorage.getItem('focus');
    }
  }
}

// Get weather

function clickCity(e) {
  city.textContent = '';
}

function getCity() {
  if (localStorage.getItem('city') === null) {
    city.textContent = '[Enter city]';
  } else {
    city.textContent = localStorage.getItem('city');
  }
}

function setCity(e) {
  if (!e.target.classList.contains('city')) {
    if (localStorage.getItem('city') === null) {
      city.textContent = '[Enter city]';
    } else {
      city.textContent = localStorage.getItem('city');
    }
  }
  if (e.type === 'keypress') {
    if (e.which == 13) {
      if (city.textContent && city.textContent.trim()) {
        city.blur();
        getWeather();
        localStorage.setItem('city', city.textContent);
      } else {
        city.textContent = localStorage.getItem('city');
        city.blur();
        getWeather();
      }
    }
  }
}

function getWeather() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=3583f7e69f897e38fbc432d85685e172&units=metric`,
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      if (city.textContent == '') {
        localStorage.setItem('city', cityStorage);
        city.textContent = localStorage.getItem('city');
      } else if (res.cod !== 200) {
        weatherError.textContent = res.message;
        weatherDescription.textContent = '';
        humidity.textContent = '';
        windSpeed.textContent = '';
        temperature.textContent = '';
        weatherIcon.className = '';
      } else {
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${res.weather[0].id}`);
        temperature.textContent = `${Math.trunc(res.main.temp)}°C`;
        city.textContent = res.name;
        localStorage.setItem('city', res.name);
        weatherDescription.textContent = res.weather[0].description;
        humidity.textContent = `Humidity: ${res.main.humidity}%`;
        windSpeed.textContent = `Wind speed: ${res.wind.speed}m/s`;
        weatherError.textContent = '';
      }
    })
    .catch(function (error) {
      console.log(error);
      city.textContent = '[Enter city]';
      weatherIcon.className = 'weather-icon owf';
      temperature.textContent = ``;
      weatherDescription.textContent = '';
      humidity.textContent = ``;
      windSpeed.textContent = ``;
    });
}

document.addEventListener('DOMContentLoaded', getWeather);
document.addEventListener('click', setCity);
city.addEventListener('click', clickCity);
city.addEventListener('keypress', setCity);

name.addEventListener('click', clickName);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('click', clickFocus);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

upgradeBackgroundBtn.addEventListener('click', setNewBackground);
upgradeQuotationBtn.addEventListener('click', getQuote);

// Run
showTime();
setBackgroundAndGreet();
getQuote();
getName();
getFocus();
getCity();

setInterval(() => {
  let currentDate = new Date();
  let currentHour = currentDate.getHours();

  if (currentBackground !== currentHour) {
    setBackgroundAndGreet();
  }
}, 300000);
