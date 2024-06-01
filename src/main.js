import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery } from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-form');
const input = document.querySelector('.search-data');
const gallery = document.querySelector('.galleriesBox');

let currentPage = 1;
const perPage = 15;
let currentQuery = '';

form.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();

  const query = input.value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please, enter a search query',
    });
    return;
  }
  clearGallery();
  currentPage = 1;
  currentQuery = query;
  showLoader();

  fetchImages(query)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again.',
        });
      } else {
        renderGallery(data.hits);
        if (data.hits.length < perPage) {
          hideLoadMoreButton();
        } else {
          showLoadMoreButton();
        }
        smoothScroll();
      }
    })
    .catch(error => {
      iziToast.error({
        position: 'topRight',
        message: 'Error',
      });
    })
    .finally(() => {
      hideLoader();
    });
}

function showLoader() {
  document.querySelector('.loader').style.display = 'block';
}

function hideLoader() {
  document.querySelector('.loader').style.display = 'none';
}

function smoothScroll() {
  const cardHeight = document
    .querySelector('.gallery-item')
    .getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

document.querySelector('.galleryBtn').addEventListener('click', () => {
  loadImages();
});

function showLoadMoreButton() {
  if (document.querySelector('.galleryBtn').style.display === 'none') {
    document.querySelector('.galleryBtn').style.display = 'block';
  }
}

function hideLoadMoreButton() {
  document.querySelector('.galleryBtn').style.display = 'none';
}

function loadImages() {
  fetchImages(currentQuery, currentPage, perPage)
    .then(data => {
      if (data.hits.length === 0 || currentPage >= data.totalHits / perPage) {
        hideLoadMoreButton();
        iziToast.error({
          position: 'topRight',
          message: "We're sorry, but you've reached the end of search results.",
        });
      } else {
        renderGallery(data.hits);
        currentPage++;
        smoothScroll();
      }
    })
    .catch(error => {
      iziToast.error({
        position: 'topRight',
        message: 'Error',
      });
    })
    .finally(() => {
      hideLoader();
    });
}
