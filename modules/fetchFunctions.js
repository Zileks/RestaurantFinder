const fetchRestaurants = () => {
  return fetch('restaurants.json').then((res) => res.json());
};

const fetchCapacities = () => {
  return fetch('capacities.json').then((res) => res.json());
};

const fetchPrices = () => {
  return fetch('prices.json').then((res) => res.json());
};

export { fetchRestaurants, fetchCapacities, fetchPrices };
