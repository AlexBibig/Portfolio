import cards from '../../cards';

function showStats() {
  const mainContainer = document.querySelector('.main__container');
  const table = document.createElement('table');
  const title = document.createElement('h2');
  const tableRus = document.createElement('table');
  const titleRus = document.createElement('h2');

  [...cards[0]].forEach((el, index) => {
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    [...cards[index + 1]].forEach((element) => {
      const td = document.createElement('td');
      td.innerHTML = element.word;
      tr.append(td);
    });
    th.innerHTML = el;
    tr.prepend(th);
    table.append(tr);
  });

  title.innerHTML = 'English words';
  mainContainer.append(title, table);

  [...cards[0]].forEach((el, index) => {
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    [...cards[index + 1]].forEach((element) => {
      const td = document.createElement('td');
      td.innerHTML = element.translation;
      tr.append(td);
    });
    th.innerHTML = el;
    tr.prepend(th);
    tableRus.append(tr);
  });

  titleRus.innerHTML = 'Translation';
  mainContainer.append(titleRus, tableRus);
}

export { showStats };
