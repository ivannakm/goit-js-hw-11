import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import {getImagesByQuery} from './js/pixabay-api';
import {createGallery, clearGallery, showLoader, hideLoader} from './js/render-functions';

const form = document.querySelector('.form');
const input = document.querySelector('.form-input');


form.addEventListener('submit', event => {
    event.preventDefault();
  
    const query = input.value.trim();
  
    if (query === '') {
      iziToast.warning({
        title: 'Warning',
        message: 'Please enter a search field!',
        position: 'topLeft',
      });
      return;
    }
  
  clearGallery();
  showLoader();

    getImagesByQuery(query)
      .then(data => {
        console.log(data);

        if (!data.hits.length) {
          iziToast.error({
            title: 'Error',
            message: 'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight',
          });

          return;
        }
    createGallery(data.hits);
    // Clear the input after successful result
    input.value = '';
      })
      .catch(error => {
        iziToast.error({
          title: 'Error',
          message: 'Something went wrong.',
          position: 'topRight',
        });
      })
      .finally(() => {
      hideLoader();
      });
  });