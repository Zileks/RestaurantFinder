function findAllRestaurants(restaurants) {
  return restaurants;
}

function findRestaurantsByFood(restaurants, ...food) {
  let arr = [];
  for (let i = 0; i < restaurants.length; i++) {
    if (food.some((x) => restaurants[i].categories.includes(x)))
      arr.push(restaurants[i]);
  }
  return arr;
}

function findRestaurantsByFoodEvery(restaurants, ...food) {
  let arr = [];
  for (let i = 0; i < restaurants.length; i++) {
    if (food.every((x) => restaurants[i].categories.includes(x)))
      arr.push(restaurants[i]);
  }
  return arr;
}

function findRestaurantsByCapacity(restaurants, size) {
  let arr = [];
  for (let i = 0; i < restaurants.length; i++) {
    if (
      restaurants[i].capacity <= size.maxCapacity &&
      restaurants[i].capacity >= size.minCapacity
    )
      arr.push(restaurants[i]);
  }
  return arr;
}

function findRestaurantsByPrice(restaurants, price) {
  let arr = [];
  for (let i = 0; i < restaurants.length; i++) {
    if (
      restaurants[i].avgPrice <= price.maxPrice &&
      restaurants[i].avgPrice >= price.minPrice
    )
      arr.push(restaurants[i]);
  }
  return arr;
}

function findOpenRestaurants(restaurants) {
  let hours = new Date().getHours();
  return findOpenRestaurantsAt(restaurants, hours);
}

function findOpenRestaurantsAt(restaurants, time) {
  let arr = [];
  for (let i = 0; i < restaurants.length; i++) {
    if (time < restaurants[i].closeTime && time >= restaurants[i].openTime)
      arr.push(restaurants[i]);
  }
  return arr;
}

function hideRestaurants() {
  const elements = document.getElementsByClassName('card_container');
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

export {
  findAllRestaurants,
  findOpenRestaurants,
  findOpenRestaurantsAt,
  findRestaurantsByPrice,
  findRestaurantsByFood,
  findRestaurantsByCapacity,
  findRestaurantsByFoodEvery,
  hideRestaurants,
};
