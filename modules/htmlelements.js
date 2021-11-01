{
  /* <li>
<input type="radio" name="price" value="Expensive" />
<span>Expensive</span>
</li>
<li>
<input type="radio" name="price" value="Moderate" />
<span>Moderate</span>
</li>
<li>
<input type="radio" name="price" value="Cheap" />
<span>Cheap</span>
</li> */
}

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
  for (let i = 0; i < ranges.length; i++) {
    const li = document.createElement('li');
    const ul = document.getElementById(`${type}-ul`);
    ul.appendChild(li);
    createInputElement(li, `${type}`, ranges[i]);
    createSpanElement(li, ranges[i]);
  }
};

const createPriceRangeElements = async () => {
  const priceRanges = await fetchPrices();
  console.log(priceRanges);
  createLiElement(priceRanges, 'price');
};

const createCapacityRangeElements = async () => {
  const capacityRanges = await fetchCapacities();
  createLiElement(capacityRanges, 'capacity');
};

const createRangeElements = async (type, lowercaseType) => {
  const range = await type();

  createLiElement(range, lowercaseType);
};

export {
  createPriceRangeElements,
  createCapacityRangeElements,
  createRangeElements,
};
