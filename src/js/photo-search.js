import photoTemplate from '../templates/photo-cards.hbs';
import PixabayApiService from './apiService';
import refs from './refs';

const pixabayApiService = new PixabayApiService();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  pixabayApiService.searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  pixabayApiService
    .fetchPhotos()
    .then(photos => {
      appendPhotosMarkup(photos);
    })
    .catch(console.log);
}

function appendPhotosMarkup(photos) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', photoTemplate(photos));
}

function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}
