import * as basicLightbox from 'basiclightbox';
import refs from '../refs';
import imageTemplate from '../../templates/image.hbs';

refs.galleryContainer.addEventListener('click', openLightbox);
// refs.galleryContainer.onclick = openLightbox;

function openLightbox(e) {
  e.preventDefault();

  if (!e.target.classList.contains('photo-card')) return;

  const img = e.target.firstElementChild.firstElementChild;

  const options = {
    src: img.dataset.src,
    alt: img.alt,
  };

  const lightbox = basicLightbox.create(imageTemplate(options));

  lightbox.show();
}
