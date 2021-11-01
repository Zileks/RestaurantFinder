import * as find from './restaurantFunctions.js';
import { chooseCapacityRange, choosePriceRange } from './restaurantRange.js';
import { createRangeElements } from './htmlelements.js';
import { fetchCapacities, fetchPrices } from './fetchFunctions.js';

createRangeElements(fetchPrices, 'price');
createRangeElements(fetchCapacities, 'capacity');

const params = new URLSearchParams(location.search);

const filterByPrice = async (restaurants) => {
  let filter;
  let result = [];
  let priceRange;
  const price = document.getElementsByName('price');
  for (let i = 0; i < price.length; i++) {
    if (price[i].checked) {
      filter = price[i].value;
    }
  }

  if (!params.get('price')) {
    return (result = find.findAllRestaurants(restaurants));
  }
  priceRange = await choosePriceRange(params.get('price'));
  console.log(priceRange);
  result = find.findRestaurantsByPrice(restaurants, priceRange);
  console.log(result);
  return result;
};

const filterByCapacity = async (i) => {
  let filter;
  let result = [];
  let capacityRange;
  const capacity = document.getElementsByName('capacity');
  for (let i = 0; i < capacity.length; i++) {
    if (capacity[i].checked) {
      filter = capacity[i].value;
    }
  }
  if (!params.get('capacity')) {
    return (result = find.findAllRestaurants(i));
  }
  capacityRange = await chooseCapacityRange(params.get('capacity'));

  result = find.findRestaurantsByCapacity(i, capacityRange);
  return result;
};

const filterByHours = (i) => {
  let filter;
  let result = [];
  let hoursWithoutZero = 2;
  let hoursWithZero = 1;
  const hours = document.getElementById('hours-text');

  if (!params.get('time')) {
    return (result = find.findAllRestaurants(i));
  } else if (params.get('time') === 'OpenNow') {
    return (result = find.findOpenRestaurants(i));
  } else
    filter =
      hours.textContent.length === 4
        ? hours.textContent.slice(0, hoursWithZero)
        : hours.textContent.slice(0, hoursWithoutZero);
  result = find.findOpenRestaurantsAt(i, params.get('time'));
  return result;
};

const filterByCuisines = (i) => {
  let filter = [];
  let result = [];
  let allCuisnes = ['Serbian', 'Vege', 'Italian', 'Mexican', 'Chinese'];
  let separatedParams = params.get('cuisines')
    ? params.get('cuisines').split(',')
    : allCuisnes;
  let every = document.getElementById('radio_every');
  let some = document.getElementById('radio_some');
  const cuisines = document.getElementsByName('cuisines');

  for (let i = 0; i < cuisines.length; i++) {
    if (cuisines[i].checked) {
      filter.push(cuisines[i].value);
    }
  }

  // if (some.checked) {
  //   result = find.findRestaurantsByFood(i, ...separatedParams);
  // }
  // if (every.checked) {
  //   result = find.findRestaurantsByFoodEvery(i, ...separatedParams);
  // }
  result = find.findRestaurantsByFood(i, ...separatedParams);

  if (params.get('filterBy') === 'any') {
    result = find.findRestaurantsByFood(i, ...separatedParams);
  }
  if (params.get('filterBy') === 'all') {
    result = find.findRestaurantsByFoodEvery(i, ...separatedParams);
  }

  // opaopa('cuisines', [...filter]);
  console.log(result);
  return result;
};

export { filterByPrice, filterByCapacity, filterByCuisines, filterByHours };
