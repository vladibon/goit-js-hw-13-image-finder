import { Notify, Loading } from 'notiflix';
import imagesTemplate from '../templates/image-cards.hbs';
import refs from './refs';
import PixabayApiService from './apiService';
import LoadMoreBtn from './components/load-more-btn';

const pixabay = new PixabayApiService();
const loadMoreBtn = new LoadMoreBtn('.js-load-more__btn');

refs.searchForm.onsubmit = onSearch;
loadMoreBtn.refs.button.onclick = addImages;

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
  loadMoreBtn.hide();

  try {
    const { hits, totalHits } = await pixabay.fetchImages();

    if (!totalHits)
      throw 'Sorry, there are no images matching your search query. Please try again.';

    appendImagesMarkup(hits);
    loadMoreBtn.show();

    if (pixabay.page === 2) {
      Notify.success(`Hooray! We found ${totalHits} images.`);
    } else {
      const { height } = refs.galleryContainer.firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: height * 2,
        behavior: 'smooth',
      });

      if (pixabay.perPage * pixabay.page >= totalHits)
        Notify.info("We're sorry, but you've reached the end of search results.");
    }
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
