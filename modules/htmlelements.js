// import { fetchPrices, fetchCapacities } from './fetchFunctions.js';

// const createInputElement = (list, type, ranges) => {
//   const input = document.createElement('input');
//   list.appendChild(input);
//   input.type = 'radio';
//   input.name = type;
//   input.value = `${ranges.tooltip}`;
// };

// const createSpanElement = (list, range) => {
//   const span = document.createElement('span');
//   list.appendChild(span);
//   span.innerText = `${range.tooltip}`;
// };

// const createLiElement = (ranges, type) => {
//   for (let i = 0; i < ranges.length; i++) {
//     const li = document.createElement('li');
//     const ul = document.getElementById(`${type}-ul`);
//     ul.appendChild(li);
//     createInputElement(li, `${type}`, ranges[i]);
//     createSpanElement(li, ranges[i]);
//   }
// };

// const createPriceRangeElements = async () => {
//   const priceRanges = await fetchPrices();
//   console.log(priceRanges);
//   createLiElement(priceRanges, 'price');
// };

// const createCapacityRangeElements = async () => {
//   const capacityRanges = await fetchCapacities();
//   createLiElement(capacityRanges, 'capacity');
// };

// const createRangeElements = async (type, lowercaseType) => {
//   const range = await type();

//   createLiElement(range, lowercaseType);
// };

// export {
//   createPriceRangeElements,
//   createCapacityRangeElements,
//   createRangeElements,
// };

import { fetchPrices, fetchCapacities } from './fetchFunctions.js';

const createInputElement = (list, type, ranges) => {
  const input = document.createElement('input');
  list.appendChild(input);
  input.type = 'radio';
  input.name = type;
  input.value = `${ranges.tooltip}`;
};

const createSpanElement = (list, range) => {
  const span = document.createElement('span');
  list.appendChild(span);
  span.innerText = `${range.tooltip}`;
};

const createLiElement = (ranges, type) => {
  const li = document.createElement('li');
  const ul = document.getElementById(`${type}-ul`);
  ul.appendChild(li);
  createInputElement(li, `${type}`, ranges);
  createSpanElement(li, ranges);
};

//Map umesto for

// const createPriceRangeElements = async () => {
//   //ovde Map
//   const priceRanges = await fetchPrices();
//   console.log(priceRanges);
//   createLiElement(priceRanges, 'price');
// };

// const createCapacityRangeElements = async () => {
//   //ovde Map
//   const capacityRanges = await fetchCapacities();
//   createLiElement(capacityRanges, 'capacity');
// };

const createRangeElements = async (type, lowercaseType) => {
  //ovde Map
  const range = await type();
  console.log(range);
  range.forEach((x) => createLiElement(x, lowercaseType));

  // createLiElement(range, lowercaseType);
};

export { createRangeElements };
