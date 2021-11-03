const params = new URLSearchParams(location.search);

const setPriceByQuery = () => {
  const queryPrice = params.get('price');
  const priceInput = document.getElementsByName('price');
  const priceText = document.getElementById('price-text');
  for (let i = 0; i < priceInput.length; i++) {
    if (priceInput[i].value === queryPrice) priceInput[i].checked = true;
  }
  priceText.innerText = queryPrice;
  console.log(priceInput);
};

const setCapacityByQuery = () => {
  const queryCapacity = params.get('capacity');
  const capacityInput = document.getElementsByName('capacity');
  const capacityText = document.getElementById('capacity-text');
  for (let i = 0; i < capacityInput.length; i++) {
    if (capacityInput[i].value === queryCapacity)
      capacityInput[i].checked = true;
  }
  capacityText.innerText = queryCapacity;
  console.log(capacityInput);
};

const setTimeByQuery = () => {
  const time = params.get('time');
  const timeInput = document.getElementById('hours');
  const timeText = document.getElementById('hours-text');
  timeInput.value = time;
  timeText.innerText =
    time === 'OpenNow' ? 'Open Now' : time ? `${time}:00` : '';
};

const setCuisinesByQuery = () => {
  const cuisines = params.get('cuisines')
    ? params.get('cuisines').split(',')
    : '';
  const cuisinesInput = document.getElementsByClassName('cuisines');
  const cuisinesText = document.getElementById('cuisines-text');
  console.log(cuisinesInput);
  for (let i = 0; i < cuisinesInput.length; i++) {
    if (cuisines.find(cuisinesInput[i].value)) {
      console.log(cuisines.find(cuisinesInput[i].value));
      cuisinesInput[i].checked = true;
    }
  }
};

setCuisinesByQuery();

// const setInputsByQuery = (input) => {
//   const query = param.get(input);
//   const priceInput = document.getElementsByName(input);
//   for (let i = 0; i < priceInput.length; i++) {
//     if (priceInput[i].value === query) priceInput[i].checked = true;
//   }
//   console.log(priceInput);
// };

setPriceByQuery();

const showModalInputs = () => {};

export {
  showModalInputs,
  setPriceByQuery,
  setCapacityByQuery,
  setTimeByQuery,
  setCuisinesByQuery,
};
