import { Notify, Report, Confirm, Loading, Block } from 'notiflix';
import imagesTemplate from '../templates/image-cards.hbs';
import refs from './refs';
import PixabayApiService from './apiService';

const pixabay = new PixabayApiService();

refs.searchForm.onsubmit = onSearch;
refs.loadMoreBtn.onclick = addImages;

function onSearch(e) {
  e.preventDefault();

  pixabay.searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  if (!pixabay.searchQuery) {
    Notify.failure('Please enter your search query and try again.');
    return;
  }

  pixabay.resetPage();
  clearGalleryContainer();
  addImages();
}

async function addImages() {
  Loading.circle();

  try {
    const { hits, totalHits } = await pixabay.fetchImages();

    if (!totalHits)
      throw 'Sorry, there are no images matching your search query. Please try again.';

    if (pixabay.page === 2) Notify.success(`Hooray! We found ${totalHits} images.`);

    if (pixabay.perPage * pixabay.page >= totalHits)
      Notify.info("We're sorry, but you've reached the end of search results.");

    appendImagesMarkup(hits);
  } catch (error) {
    Notify.failure(`${error}`);
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
