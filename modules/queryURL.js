const getPrice = () => {
  let filter;

  const price = document.getElementsByName('price');
  for (let i = 0; i < price.length; i++) {
    if (price[i].checked) {
      filter = price[i].value;
    }
  }
  return filter;
};

const getCapacity = () => {
  let filter;
  const capacity = document.getElementsByName('capacity');
  for (let i = 0; i < capacity.length; i++) {
    if (capacity[i].checked) {
      filter = capacity[i].value;
    }
  }
  return filter;
};

const getHours = () => {
  let filter;
  let hoursWithoutZero = 2;
  let hoursWithZero = 1;
  const hours = document.getElementById('hours-text');
  if (hours.textContent === 'Open Now') {
    filter = 'OpenNow';
    return filter;
  } else
    filter =
      hours.textContent.length === 4
        ? hours.textContent.slice(0, hoursWithZero)
        : hours.textContent.slice(0, hoursWithoutZero);
  console.log(filter);
  return filter;
};

const getCuisnes = () => {
  let filter = [];

  const cuisines = document.getElementsByName('cuisines');

  for (let i = 0; i < cuisines.length; i++) {
    if (cuisines[i].checked) {
      filter.push(cuisines[i].value);
    }
  }
  console.log(filter);
  return filter;
};

const getAllorAny = () => {
  // let every = document.getElementById('radio_every');
  let some = document.getElementById('radio_some');
  return some.checked ? 'any' : 'all';
};

const setLocation = (price, capacity, time, cuisines, filterBy) => {
  let params = new URLSearchParams(location.search);
  if (getPrice()) params.set('price', price);
  else params.delete('price');
  if (getCapacity()) params.set('capacity', capacity);
  else params.delete('capacity');
  if (getHours()) params.set('time', time);
  else params.delete('time');
  if (getCuisnes().length > 0) params.set('cuisines', cuisines);
  else params.delete('cuisines');
  if (getCuisnes().length > 0) params.set('filterBy', filterBy);
  else params.delete('filterBy');
  return params;
};

const writeLocation = () => {
  const price = getPrice();
  const capacity = getCapacity();
  const time = getHours();
  const cuisines = getCuisnes();
  const filterBy = getAllorAny();
  let query = setLocation(price, capacity, time, cuisines, filterBy);
  console.log(cuisines);

  location = `index.html?${query}`;
};

export { writeLocation };
