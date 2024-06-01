import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderGallery(images) {
  const galleryContainer = document.querySelector('.galleriesBox');
  const markup = images
    .map(image => {
      return `
      <a class="gallery-item" href="${image.largeImageURL}">
        <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" />
        <div class="info">
          <p class="info-item"><span>Likes:</span> ${image.likes}</p>
          <p class="info-item"><span>Views:</span> ${image.views}</p>
          <p class="info-item"><span>Comments:</span> ${image.comments}</p>
          <p class="info-item"><span>Downloads:</span> ${image.downloads}</p>
        </div>
      </a>`;
    })
    .join('');

  galleryContainer.innerHTML = markup;
  const lightbox = new SimpleLightbox('.gallery-item');
  lightbox.refresh();
}

export function clearGallery() {
  const galleryContainer = document.querySelector('.galleriesBox');
  galleryContainer.innerHTML = '';
}