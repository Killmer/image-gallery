const renderImages = (data) => {
  let photosContainer = document.querySelector('.js-wrapper');

  if (!photosContainer) {
    photosContainer = document.createElement('div');
    photosContainer.classList.add('js-wrapper');
		document.body.appendChild(photosContainer);
  }

  const images = data.hits
    .map((img) => {
      return `<img src="${img.previewURL}"/>`;
    })
    .join('');
  photosContainer.innerHTML = images;
};

const fetchImages = (query, params = {}) => {
  const apiKey = '9985612-508c6cca3df5c5e2b6bd16ca8';
  const applyParams = (obj) => {
    const paramsString = Object.entries(obj)
      .map(([key, value]) => {
        return `&${key}=${value}`;
      })
      .join('');
    return paramsString;
  };

  const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}${params && applyParams(params)}`;

  return fetch(url, {
    method: 'GET',
  }).then((data) => {
    return data.json();
  });
};

// ___________ client code _________________

const input = document.getElementsByName('query')[0];

input.addEventListener('change', (e) => {
  const {value} = e.target;

  fetchImages(value, {per_page: 200}) 
    .then((data) => {
      renderImages(data);
    })
    .catch((err) => {
      console.error(err);
    });
});
