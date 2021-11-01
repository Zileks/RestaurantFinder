import * as find from './restaurantFunctions.js';

const getPrice = () => {
  let filter;
  let result = [];
  let priceRange;
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
  let result = [];
  let priceRange;
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
  let result = [];
  let hoursWithoutZero = 2;
  let hoursWithZero = 1;
  const hours = document.getElementById('hours-text');

  if (hours.textContent === 'Open Now') {
    return (filter = 'OpenNow');
  } else
    filter =
      hours.textContent.length === 4
        ? hours.textContent.slice(0, hoursWithZero)
        : hours.textContent.slice(0, hoursWithoutZero);

  return filter;
};

const getCuisnes = () => {
  let filter = [];
  let allCuisnes = ['Serbian', 'Vege', 'Italian', 'Mexican', 'Chinese'];
  let every = document.getElementById('radio_every');
  let some = document.getElementById('radio_some');
  const cuisines = document.getElementsByName('cuisines');

  for (let i = 0; i < cuisines.length; i++) {
    if (cuisines[i].checked) {
      filter.push(cuisines[i].value);
    }
  }
  // if (filter.length === 0) {
  //   filter = allCuisnes;
  // }
  console.log(filter);
  return filter;
};

const getAllorAny = () => {
  // let every = document.getElementById('radio_every');
  let some = document.getElementById('radio_some');
  return some.checked ? 'any' : 'all';
};

const setLocation = () => {
  let params = new URLSearchParams();
  params.set('price', getPrice());
  params.set('capacity', getCapacity());
  params.set('time', getHours());
  params.set('cuisines', getCuisnes());
  params.set('filterBy', getAllorAny());
};

const kita = () => {
  setLocation();
  location = `index.html?${writePrice()}${writeCapacity()}${writeHours()}${writeCuisines()}${writeAllorAny()}`;
};

const writePrice = () => {
  return getPrice() ? `price=${getPrice()}&` : '';
};

const writeCapacity = () => {
  return getCapacity() ? `capacity=${getCapacity()}&` : '';
};

const writeHours = () => {
  return getHours() ? `time=${getHours()}&` : '';
};

const writeCuisines = () => {
  return getCuisnes().length > 0 ? `cuisines=${getCuisnes()}&` : '';
};

const writeAllorAny = () => {
  return getCuisnes().length > 0 ? `filterBy=${getAllorAny()}` : '';
};

export { kita };
