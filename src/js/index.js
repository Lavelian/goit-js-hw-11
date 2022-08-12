import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import SerchImage from './fetchImage';
import createMarcupGallery from './createMarcupGallery';
const serchImage = new SerchImage();

const refs = {
  formEl: document.querySelector('#search-form'),
  galleryEl: document.querySelector('.gallery'),
  moreBtnEl: document.querySelector('.more-btn'),
};
const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.moreBtnEl.disabled = true;

function onSubmitForm(e) {
  e.preventDefault();
  refs.galleryEl.innerHTML = '';

  if (e.currentTarget.elements.searchQuery.value === '') {
    return;
  }
  serchImage.query = e.currentTarget.elements.searchQuery.value;
  serchImage.resetPage();

  serchImage.fetchImage().then(data => {
    if (data.hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    Notify.info(`Hooray! We found ${data.totalHits} images.`);
    refs.galleryEl.insertAdjacentHTML(
      'beforeend',
      createMarcupGallery(data.hits)
    );
    gallery.refresh();
    refs.moreBtnEl.disabled = false;
  });

  e.target.reset();
}

function onClickMoreBtn(e) {
  serchImage.fetchImage().then(data => {
    refs.galleryEl.insertAdjacentHTML(
      'beforeend',
      createMarcupGallery(data.hits)
    );
    gallery.refresh();
  });
}

refs.formEl.addEventListener('submit', onSubmitForm);
refs.moreBtnEl.addEventListener('click', onClickMoreBtn);
