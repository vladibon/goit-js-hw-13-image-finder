import debounce from 'lodash.debounce';
import { Notify, Loading } from 'notiflix';
import InfiniteScroll from 'infinite-scroll';

import refs from './refs';
import pixabay from './components/pixabay-api';
import imagesTemplate from '../templates/image-cards.hbs';

const infScroll = new InfiniteScroll(refs.galleryContainer, {
  path: pixabay.getURL.bind(pixabay),
  responseBody: 'json',
  history: false,
  scrollThreshold: 200,
});

refs.searchForm.addEventListener('submit', onSearch);
// refs.searchForm.onsubmit = onSearch;

infScroll.on('load', debounce(loadImages, 200));

// infScroll.loadNextPage();

function onSearch(e) {
  e.preventDefault();

  pixabay.searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  if (!pixabay.searchQuery) {
    Notify.failure('Please enter your search query and try again.');
    return;
  }

  pixabay.resetPage();
  clearGalleryContainer();
  infScroll.loadNextPage();
}

async function loadImages({ hits, total }) {
  Loading.circle('Loading...');

  try {
    if (!total)
      throw 'Sorry, there are no images matching your search query. Please try again.';

    if (!hits.length) throw "We're sorry, but you've reached the end of search results.";

    if (pixabay.params.page === 1) {
      Notify.success(`Hooray! We found ${total} images.`);
    }

    appendImagesMarkup(hits);
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
