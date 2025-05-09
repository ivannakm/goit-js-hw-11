import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryList = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

export const lightbox = new SimpleLightbox(
    '.gallery a'
  );

export function createGallery(images) {
    const markup = images.map(({
    webformatURL, largeImageURL, tags, likes, views, comments, downloads,
}) => `<li class="gallery-item-wrapper">
        <a class="gallery-image-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
        </a>
        <div class="data">
          <p class="data-item">Likes<span class="data-item-numbers">${likes}</span></p>
          <p class="data-item">Views<span class="data-item-numbers">${views}</span></p>
          <p class="data-item">Comments<span class="data-item-numbers">${comments}</span></p>
          <p class="data-item">Downloads<span class="data-item-numbers">${downloads}</span></p>
        </div>
      </li>`)
      .join('');
      
      galleryList.innerHTML = markup;
      lightbox.refresh();
};

export function clearGallery(){
galleryList.innerHTML = '';
}

export function showLoader(){
loader.classList.remove('hidden');
}

export function hideLoader(){
loader.classList.add('hidden');    
}