import * as find from './restaurantFunctions.js';
import { chooseCapacityRange, choosePriceRange } from './restaurantRange.js';
import { createRangeElements } from './htmlelements.js';
import { fetchCapacities, fetchPrices } from './fetchFunctions.js';

createRangeElements(fetchPrices, 'price');
createRangeElements(fetchCapacities, 'capacity');

const params = new URLSearchParams(location.search);

const filterByPrice = async (restaurants, price) => {
  let priceRange = await choosePriceRange(price);

  let result = [];
  if (!price) {
    return (result = find.findAllRestaurants(restaurants));
  }
  result = find.findRestaurantsByPrice(restaurants, priceRange);
  return result;
};

const filterByCapacity = async (restaurants, capacity) => {
  let capacityRange = await chooseCapacityRange(capacity);
  let result = [];
  if (!capacity) {
    return (result = find.findAllRestaurants(restaurants));
  }
  result = find.findRestaurantsByCapacity(restaurants, capacityRange);
  return result;
};

const filterByHours = (i, time) => {
  let result = [];
  if (!time) {
    return (result = find.findAllRestaurants(i));
  } else if (time === 'OpenNow') {
    return (result = find.findOpenRestaurants(i));
  } else result = find.findOpenRestaurantsAt(i, time);
  return result;
};

const filterByCuisines = (i, cuisines, filterBy) => {
  // let filter = [];
  let result = [];
  let allCuisines = ['Serbian', 'Vege', 'Italian', 'Mexican', 'Chinese'];
  console.log([cuisines]);
  if (!cuisines && !filterBy) {
    result = find.findRestaurantsByFood(i, ...allCuisines);
    console.log(result);
  } else {
    if (filterBy === 'any') {
      result = find.findRestaurantsByFood(i, ...cuisines.split(','));
    }
    if (filterBy === 'all') {
      result = find.findRestaurantsByFoodEvery(i, ...cuisines.split(','));
    }
  }
  return result;
};

const modalCheck = () => {
  if (params.get('capacity')) {
    const capacity = document.getElementsByName('capacity');
    for (let i = 0; i < capacity.length; i++) {
      if (capacity[i].value === params.get('capacity')) {
        capacity[i].checked = true;
      }
    }
  }
};

export { filterByPrice, filterByCapacity, filterByCuisines, filterByHours };
