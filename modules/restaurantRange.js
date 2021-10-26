function choosePriceRange(price) {
  let priceRanges = [
    { tooltip: 'Cheap', minPrice: 0, maxPrice: 100 },
    { tooltip: 'Moderate', minPrice: 101, maxPrice: 200 },
    { tooltip: 'Expensive', minPrice: 201, maxPrice: Infinity },
  ];

  switch (price) {
    case 'Cheap':
      return priceRanges[0];

    case 'Moderate': {
      return priceRanges[1];
    }
    case 'Expensive': {
      return priceRanges[2];
    }
  }
}
function chooseCapacityRange(capacity) {
  let restaurantRanges = [
    {
      tooltip: 'Small',
      minCapacity: 0,
      maxCapacity: 10,
    },
    {
      tooltip: 'Medium',
      minCapacity: 11,
      maxCapacity: 20,
    },
    {
      tooltip: 'Large',
      minCapacity: 21,
      maxCapacity: Infinity,
    },
  ];

  switch (capacity) {
    case 'Small':
      return restaurantRanges[0];

    case 'Medium': {
      return restaurantRanges[1];
    }
    case 'Large': {
      return restaurantRanges[2];
    }
  }
}
export { chooseCapacityRange, choosePriceRange };
