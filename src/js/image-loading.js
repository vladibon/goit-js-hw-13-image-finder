import { Notify, Loading } from 'notiflix';
import imagesTemplate from '../templates/image-cards.hbs';
import refs from './refs';
import PixabayApiService from './apiService';

const pixabay = new PixabayApiService();

refs.searchForm.onsubmit = onSearch;
refs.loadMoreBtn.onclick = loadImages;

function onSearch(e) {
  e.preventDefault();

  pixabay.searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  if (!pixabay.searchQuery) {
    Notify.failure('Please enter your search query and try again.');
    return;
  }

  pixabay.resetPage();
  clearGalleryContainer();
  loadImages();
}

async function loadImages() {
  Loading.circle('Loading...');
  refs.loadMoreBtn.classList.add('is-hidden');

  try {
    const { hits, totalHits } = await pixabay.fetchImages();

    if (!totalHits)
      throw 'Sorry, there are no images matching your search query. Please try again.';

    if (!hits.length) throw "We're sorry, but you've reached the end of search results.";

    appendImagesMarkup(hits);
    refs.loadMoreBtn.classList.remove('is-hidden');

    if (pixabay.page === 1) {
      Notify.success(`Hooray! We found ${totalHits} images.`);
    } else {
      scrollToNextImages();
    }

    pixabay.incrementPage();
  } catch (message) {
    Notify.failure(message);
  } finally {
    Loading.remove(100);
  }
}

function appendImagesMarkup(images) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', imagesTemplate(images));
}

function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}

function scrollToNextImages() {
  const { height } = refs.galleryContainer.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
