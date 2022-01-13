import displayListings from './addToDOM.js';

const activeFiltersContainer = document.querySelector('.active-filter-btns');
const filterContainer = document.querySelector('.filters-container');
const clearBtn = document.querySelector('#clear-btn');
let activeFilters = [];

//create btn func
function createBtn(filter) {
  const check = activeFiltersContainer.querySelector(`[data-id="${filter}"]`);
  if (!check) {
    const btn = document.createElement('button');
    btn.textContent = filter;
    btn.classList.add('btn');
    btn.classList.add('active-filter-btn');
    btn.setAttribute('data-id', filter);
    activeFiltersContainer.append(btn);
    activeFilters.push(filter);
    filterContainer.classList.remove('hide');
  }
}

//delete filter-btn
function deleteFilter(e) {
  if (e.target.tagName === 'BUTTON') {
    const id = e.target.dataset.id;
    activeFilters = activeFilters.filter((filter) => filter !== id);
    e.target.remove();
    updateFilteredDOM();
  }
}

//show all items and reset filters
function showAll() {
  document
    .querySelectorAll('.single-listing')
    .forEach((listing) => listing.classList.remove('hide'));
  filterContainer.classList.add('hide');
  [...activeFiltersContainer.children].forEach((btn) => btn.remove());
}

//filter and show only selected items
function updateFilteredDOM() {
  const listings = document.querySelectorAll('.single-listing');
  if (activeFilters.length) {
    listings.forEach((listing) => {
      const listingFilters = listing.dataset.reqs.split(',');
      if (!activeFilters.every((filter) => listingFilters.includes(filter))) {
        listing.classList.add('hide');
      } else {
        listing.classList.remove('hide');
      }
    });
  } else {
    showAll();
  }
}

//set DOM and functionality
async function setUI() {
  const response = await fetch('./data.json');
  const listings = await response.json();

  displayListings(listings);

  const allListings = document.querySelectorAll('.single-listing');
  allListings.forEach((singleListing) => {
    singleListing.addEventListener('click', (e) => {
      if (e.target.tagName !== 'BUTTON') return;
      const filter = e.target.dataset.id;
      createBtn(filter);
      updateFilteredDOM();
    });
  });
  clearBtn.addEventListener('click', () => {
    activeFilters = [];
    showAll();
  });
}

// delete Filters
activeFiltersContainer.addEventListener('click', deleteFilter);

window.addEventListener('DOMContentLoaded', () => {
  setUI();
});
