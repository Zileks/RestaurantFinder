const fetchRestaurants = () => {
  return fetch('restaurants.json').then((res) => res.json());
};

const getRestaurants = () => {
  fetchRestaurants().then((res) => {
    let restaurants = [];
    let data = res.restaurants;
    for (let i = 0; i < data.length; i++) {
      restaurants.push(data[i]);
    }
    return restaurants;
  });
};

export default getRestaurants;
