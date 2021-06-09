const listingsSection = document.querySelector('.listings-section');

//add to DOM function
function displayListings(arr) {
  listingsSection.innerHTML = arr
    .map((item) => {
      const {
        company,
        logo,
        new: newListing,
        featured,
        position,
        level,
        role,
        postedAt: time,
        contract: hours,
        languages,
        tools,
        location,
      } = item;
      const filters = [role, level, ...tools, ...languages];

      return `
      <article class="single-listing  ${newListing ? 'new' : 'null'} ${
        featured ? 'featured' : 'null'
      }" data-reqs="${filters.join(',')}">
        
          <div class="listing-info-container">
            <div class="logo-container">
              <img
                src="${logo}"
                alt="${company} image"
                class="company-img"
              />
            </div>
            <div class="listing-text-container">
              <p class="company-name">${company}</p>
              <span class="new-tag ">NEW!</span>
              <span class="featured-tag ">FEATURED</span>
              <a href="#" class="listing-title">${position}</a>
              <p class="listing-details">
                <span class="time">${time}</span>
                <span class="hours">${hours}</span>
                <span class="location">${location}</span>
              </p>
            </div>
          </div>         
          <div class="listing-tools-container">
            ${filters
              .map((filter) => {
                return ` <button class="btn filter-btn" data-id="${filter}">${filter}</button>`;
              })
              .join('')}
          </div>
        </article>

    
    `;
    })
    .join('');
}

export default displayListings;
