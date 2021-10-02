import * as basicLightbox from 'basiclightbox';
import refs from '../refs';
import imageTemplate from '../../templates/image.hbs';

refs.galleryContainer.addEventListener('click', openLightbox);
// refs.galleryContainer.onclick = openLightbox;

function openLightbox(e) {
  e.preventDefault();

  if (!e.target.dataset.src) return;

  const options = {
    src: e.target.dataset.src,
    alt: e.target.alt,
  };

  const lightbox = basicLightbox.create(imageTemplate(options));

  lightbox.show();
}
