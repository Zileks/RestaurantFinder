import { fetchRestaurants } from './modules/fetchFunctions.js';
import * as filter from './modules/filterRestaurants.js';
import { writeLocation } from './modules/queryURL.js';
import {
  setPriceByQuery,
  setCapacityByQuery,
  setTimeByQuery,
  setCuisinesByQuery,
} from './modules/modal.js';

const params = new URLSearchParams(location.search);
const main = () => {
  fetchRestaurants().then((res) => {
    let data = res.restaurants;
    let restaurants = [];
    setPriceByQuery();
    setCapacityByQuery();
    setTimeByQuery();
    setCuisinesByQuery();
    const createCard = (restaurants) => {
      const cards = restaurants
        .map((x) => {
          return `
          <div class="card_container">
            <img src="${x.image}"/>
            <div class="card_description">
              <h3>${x.name}</h3>
              <h4>${x.categories}</h4>
              <h4>${x.address}</h4>
            </div>
          </div>
        `;
        })
        .join('');
      document.getElementById('rest').insertAdjacentHTML('afterbegin', cards);
    };

    const restaurantFinder = async (restaurant) => {
      if (!location.search) {
        for (let i = 0; i < data.length; i++) {
          restaurant.push(data[i]);
        }
        createCard(restaurant);
      } else {
        let filteredArray = filter.filterByCuisines(
          filter.filterByHours(
            await filter.filterByCapacity(
              await filter.filterByPrice(data, params.get('price')),
              params.get('capacity')
            ),
            params.get('time')
          ),
          params.get('cuisines'),
          params.get('filterBy')
        );
        for (let i = 0; i < filteredArray.length; i++) {
          restaurant.push(filteredArray[i]);
        }

        if (filteredArray.length !== 0) {
          createCard(restaurant);
          document.getElementById('nono').innerText = '';
        } else {
          createCard(restaurant);
          document.getElementById('nono').innerText =
            'There are no restaurants that fits your criteria';
        }
        document.getElementById('filter-modal').style.display = 'none';
      }
    };

    restaurantFinder(restaurants);
    console.log(restaurants);

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

    const onSubmit = async () => {
      writeLocation();
    };

    document.getElementById('submit').addEventListener('click', (e) => {
      e.preventDefault();
      onSubmit(restaurants);
    });

    document.getElementById('clear').addEventListener('click', () => {
      let result = '';
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
      document.getElementById('cuisines-allorany').innerText = result;
      document.getElementById('radio_every').checked = false;
      document.getElementById('radio_some').checked = true;
      document.getElementById('nono').innerText = '';
      let cuisines = document.getElementsByName('cuisines');
      for (let i = 0; i < cuisines.length; i++) {
        if (cuisines[i].checked) cuisines[i].checked = false;
      }
    });

    const filterText = () => {
      let result;

      document.getElementById('price-form').addEventListener('change', (e) => {
        result = e.target.value;
        document.getElementById('price-text').innerText = result;
      });

      document
        .getElementById('capacity-form')
        .addEventListener('change', (e) => {
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

      document
        .getElementById('cuisines-form')
        .addEventListener('change', (e) => {
          let arr = [];
          let cuisines = document.getElementsByName('cuisines');
          let every = document.getElementById('radio_every');
          let some = document.getElementById('radio_some');
          for (let i = 0; i < cuisines.length; i++) {
            if (cuisines[i].checked) arr.push(cuisines[i].value);
          }
          every.checked
            ? (document.getElementById(
                'cuisines-allorany'
              ).innerText = `Filter by All`)
            : (document.getElementById('cuisines-allorany').innerText =
                'Filter by Any');
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
  });
};

main();
