import { Notify, Loading } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import simpleLightboxOptions from './components/lightbox-options';
import PixabayApiService from './api/apiService';
import refs from './refs';
import imagesTemplate from '../templates/image-cards.hbs';

const lightbox = new SimpleLightbox('.photo-card', simpleLightboxOptions);
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
  hideLoadMoreBtn();

  try {
    const { hits, totalHits } = await pixabay.fetchImages();

    if (!totalHits)
      throw 'Sorry, there are no images matching your search query. Please try again.';

    if (!hits.length) throw "We're sorry, but you've reached the end of search results.";

    appendImagesMarkup(hits);
    lightbox.refresh();
    showLoadMoreBtn();

    if (pixabay.page === 1) {
      Notify.success(`Hooray! We found ${totalHits} images.`);
    } else {
      scrollToLoadedImages(hits);
    }

    pixabay.incrementPage();
  } catch (message) {
    Notify.failure(message);
    console.log(message);
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

function hideLoadMoreBtn() {
  refs.loadMoreBtn.classList.add('is-hidden');
}

function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}

function scrollToLoadedImages(hits) {
  const { height } = refs.galleryContainer.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: height * 2.42,
    behavior: 'smooth',
  });

  // const image = document.getElementById(hits[0].id);
  // image.onload = () => {
  //   image.scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'end',
  //   });
  // };
}
