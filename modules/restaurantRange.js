import { fetchCapacities, fetchPrices } from './fetchFunctions.js';

function getPriceRange(price) {
  return fetchPrices().then((result) => {
    return result.find((x) => x.tooltip === price);
    // switch (price) {
    //   case 'Cheap':
    //     return result[0];

    //   case 'Moderate': {
    //     return result[1];
    //   }
    //   case 'Expensive': {
    //     return result[2];
    //   }
    // }
  });
}

function getCapacityRange(capacity) {
  return fetchCapacities().then((result) => {
    return result.find((x) => x.tooltip === capacity);
    // switch (capacity) {
    //   case 'Small':
    //     return result[0];

    //   case 'Medium': {
    //     return result[1];
    //   }
    //   case 'Large': {
    //     return result[2];
    //   }
    // }
  });
}

export { getCapacityRange, getPriceRange };
