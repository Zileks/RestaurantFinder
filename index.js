// 1. Kod filtriranja restorana po kategoriji hrane koju služi treba omogućiti da se zada više kriterijuma
// (više tipova hrane) i da svi kriterijumi moraju da budu zadovoljeni za izbor restorana....

// npr. ako zadam da hoću da dobijem sve restorane koji služe italijansku i vegetarijansku kuhinju treba da
//  dobijem samo one restorane koji služe OBA tipa

// 2. Napraviti da program, putem menija, omogući korisniku izbor funkcionalnosti koju želi da pokrene
// (prikaz svih restorana, prikaz restorana u određenom opsegu cena, veličina, kategorija, radnog vremena,
//    i prikaza trenutno otvorenih restorana)

// Implementacija treba da bude po ugledu na kalkulator kod koga smo već koristili meni

// Kada korisnik unosi vrednosti treba obezbediti da je moguć unos samo ispravnih vrednosti
// (i to smo već radili kod kalkulatora)
const restaurant1 = createRestaurant(
  'Bon apetit',
  'Rome street 24',
  68,
  10,
  ['Italian', 'Mexican'],
  8,
  22,
  '/assets/italian.jpg'
);
const restaurant2 = createRestaurant(
  'El Ranchito',
  'Mexico street 89',
  202,
  20,
  ['Mexican', 'Vege'],
  12,
  19,
  '/assets/spanish.jpg'
);
const restaurant3 = createRestaurant(
  'Petrus',
  'Novi Sad Miletic 95',
  500,
  22,
  ['Italian', 'Serbian', 'Mexican'],
  11,
  22,
  '/assets/petrus.jpg'
);
const restaurant4 = createRestaurant(
  'Panda',
  'Hoan Ho number 56',
  159,
  11,
  ['Chinese', 'Serbian'],
  6,
  18,
  '/assets/panda.jpg'
);
const restaurant5 = createRestaurant(
  'Trojka NS',
  'Detelinara number 99',
  89,
  40,
  ['Serbian', 'Vege'],
  6,
  24,
  '/assets/trojka.jpg'
);
const restaurant6 = createRestaurant(
  'Orient Express',
  'BB',
  456,
  40,
  ['Serbian', 'Vege'],
  6,
  24,
  '/assets/dragon.jpg'
);

const restaurant7 = createRestaurant(
  'Titanic',
  'Atlantic Ocean 56',
  600,
  50,
  ['Vege', 'Chinese', 'Italian'],
  6,
  24,
  '/assets/ship.jpg'
);

function createRestaurant(
  name,
  adress,
  avgPrice,
  capacity,
  categories,
  openTime,
  closeTime,
  image
) {
  return {
    name,
    adress,
    avgPrice,
    capacity,
    categories,
    openTime,
    closeTime,
    image,
  };
}

let restaurants = [
  restaurant1,
  restaurant2,
  restaurant3,
  restaurant4,
  restaurant5,
  restaurant6,
  restaurant7,
];

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

function findAllRestaurants(restaurants) {
  return restaurants;
}

function findRestaurantsByFood(restaurants, ...food) {
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

const modal = () => {
  const modal = document.getElementById('filter-modal');

  const filterBtn = document.getElementById('filterBtn');

  const closeBtn = document.getElementById('closeBtn');

  filterBtn.onclick = () => {
    modal.style.display = 'block';
  };

  closeBtn.onclick = () => {
    modal.style.display = 'none';
  };

  window.onclick = (e) => {
    if (e.target == modal) {
      modal.style.display = 'none';
    }
  };
};

const stylingFunction = () => {
  const priceFilter = document.getElementById('price');
  const priceInput = document.getElementById('price-input');
  const capacityFilter = document.getElementById('capacity');
  const capacityInput = document.getElementById('capacity-input');
  const hoursFilter = document.getElementById('hours');
  const hoursInput = document.getElementById('hours-input');
  const cuisinesFilter = document.getElementById('cuisines');
  const cuisinesInput = document.getElementById('cuisines-input');

  capacityFilter.addEventListener('click', () => {
    capacityInput.classList.remove('hide');
    priceInput.classList.add('hide');
    hoursInput.classList.add('hide');
    cuisinesInput.classList.add('hide');
    capacityFilter.classList.remove('inactive');
    capacityFilter.classList.add('active');
    priceFilter.classList.add('inactive');
    hoursFilter.classList.add('inactive');
    cuisinesFilter.classList.add('inactive');
  });

  priceFilter.addEventListener('click', () => {
    priceInput.classList.remove('hide');
    capacityInput.classList.add('hide');
    hoursInput.classList.add('hide');
    cuisinesInput.classList.add('hide');
    priceFilter.classList.remove('inactive');
    priceFilter.classList.add('active');
    capacityFilter.classList.add('inactive');
    hoursFilter.classList.add('inactive');
    cuisinesFilter.classList.add('inactive');
  });

  hoursFilter.addEventListener('click', () => {
    hoursInput.classList.remove('hide');
    capacityInput.classList.add('hide');
    priceInput.classList.add('hide');
    cuisinesInput.classList.add('hide');
    hoursFilter.classList.remove('inactive');
    hoursFilter.classList.add('active');
    capacityFilter.classList.add('inactive');
    priceFilter.classList.add('inactive');
    cuisinesFilter.classList.add('inactive');
  });

  cuisinesFilter.addEventListener('click', () => {
    cuisinesInput.classList.remove('hide');
    capacityInput.classList.add('hide');
    priceInput.classList.add('hide');
    hoursInput.classList.add('hide');
    cuisinesFilter.classList.remove('inactive');
    cuisinesFilter.classList.add('active');
    capacityFilter.classList.add('inactive');
    priceFilter.classList.add('inactive');
    hoursFilter.classList.add('inactive');
  });
};

const filterByPrice = () => {
  let filter;
  let result = [];
  let priceRange;
  const price = document.getElementsByName('price');
  for (let i = 0; i < price.length; i++) {
    if (price[i].checked) {
      filter = price[i].value;
    }
  }
  if (!filter) {
    return (result = findAllRestaurants(restaurants));
  }
  priceRange = choosePriceRange(filter);
  result = findRestaurantsByPrice(restaurants, priceRange);

  return result;
};

const filterByCapacity = () => {
  let filter;
  let result = [];
  let capacityRange;
  const capacity = document.getElementsByName('capacity');
  for (let i = 0; i < capacity.length; i++) {
    if (capacity[i].checked) {
      filter = capacity[i].value;
    }
  }
  if (!filter) {
    return (result = findAllRestaurants(restaurants));
  }
  capacityRange = chooseCapacityRange(filter);
  result = findRestaurantsByCapacity(restaurants, capacityRange);

  return result;
};

const filterByHours = () => {
  let filter;
  let result = [];
  const hours = document.getElementById('hours-text');

  if (!hours.textContent) {
    return (result = findAllRestaurants(restaurants));
  } else if (hours.textContent === 'Open Now') {
    return (result = findOpenRestaurants(restaurants));
  } else
    filter =
      hours.textContent.length === 4
        ? hours.textContent.slice(0, 1)
        : hours.textContent.slice(0, 2);
  result = findOpenRestaurantsAt(restaurants, filter);

  return result;
};

const filterByCuisines = () => {
  let filter = [];
  let result = [];
  const cuisines = document.getElementsByName('cuisines');
  for (let i = 0; i < cuisines.length; i++) {
    if (cuisines[i].checked) {
      filter.push(cuisines[i].value);
    }
  }
  if (!filter) return result;
  result = findRestaurantsByFood(restaurants, ...filter);

  return result;
};

const showRestaurants = (restaurants) => {
  const cards = restaurants
    .map((x) => {
      return `
      <div class="card_container">
        <img src="${x.image}"/>
        <div class="card_description">
          <h3>${x.name}</h3>
          <h4>${x.categories}</h4>
          <h4>${x.adress}</h4>
        </div>
      </div>
    `;
    })
    .join('');
  document.getElementById('rest').insertAdjacentHTML('afterbegin', cards);
};

showRestaurants(restaurants);

function hideRestaurants() {
  const elements = document.getElementsByClassName('card_container');
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

const onSubmit = (restaurants) => {
  filterByCapacity();
  filterByCuisines();
  filterByHours();
  filterByPrice();
  let filteredArray = restaurants.filter(
    (x) =>
      filterByCapacity().includes(x) &&
      filterByCuisines().includes(x) &&
      filterByHours().includes(x) &&
      filterByPrice().includes(x)
  );
  console.log(filteredArray);
  hideRestaurants();
  showRestaurants(filteredArray);
  document.getElementById('filter-modal').style.display = 'none';
};

document.getElementById('submit').addEventListener('click', () => {
  onSubmit(restaurants);
});

const clearAll = () => {
  document.getElementById('clear').addEventListener('click', () => {
    result = '';
    document.getElementById('price-text').innerText = result;
    const price = document.getElementsByName('price');
    for (let i = 0; i < price.length; i++) {
      if (price[i].checked) {
        price[i].checked = false;
      }
    }
    document.getElementById('capacity-text').innerText = result;
    const capacity = document.getElementsByName('capacity');
    for (let i = 0; i < capacity.length; i++) {
      if (capacity[i].checked) {
        capacity[i].checked = false;
      }
    }
    document.getElementById('hours-text').innerText = result;
    document.getElementById('cuisines-text').innerText = result;
    let cuisines = document.getElementsByName('cuisines');
    for (let i = 0; i < cuisines.length; i++) {
      if (cuisines[i].checked) cuisines[i].checked = false;
    }
  });
};

const filterText = () => {
  let result;
  clearAll();
  document.getElementById('price-form').addEventListener('change', (e) => {
    result = e.target.value;
    document.getElementById('price-text').innerText = result;
  });

  document.getElementById('capacity-form').addEventListener('change', (e) => {
    result = e.target.value;
    document.getElementById('capacity-text').innerText = result;
  });

  document.getElementById('hours-form').addEventListener('click', (e) => {
    result = e.target.value;
    if (result === 'Open Now') {
      document.getElementById('hours-text').innerText = result;
    } else {
      result
        ? (document.getElementById('hours-text').innerText = `${result}:00`)
        : (document.getElementById('hours-text').innerText = '');
    }
  });

  document.getElementById('cuisines-form').addEventListener('change', (e) => {
    let arr = [];
    let cuisines = document.getElementsByName('cuisines');
    for (let i = 0; i < cuisines.length; i++) {
      if (cuisines[i].checked) arr.push(cuisines[i].value);
    }
    result = arr.length;
    result
      ? (document.getElementById(
          'cuisines-text'
        ).innerText = `${result} Selected`)
      : (document.getElementById('cuisines-text').innerText = '');
  });
};

filterText();
stylingFunction();
modal();
