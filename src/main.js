// У файлі main.js напиши всю логіку роботи додатка. 
// Виклики нотифікацій iziToast, 
// усі перевірки на довжину масиву в отриманій відповіді робимо саме в цьому файлі. 
// Імпортуй в нього функції із файлів pixabay-api.js та render-functions.js та викликай їх у відповідний момент.
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import {getImagesByQuery} from './js/pixabay-api';
import {createGallery, clearGallery, showLoader, hideLoader} from './js/render-functions';

const form = document.querySelector('.form');


form.addEventListener('submit', event => {
    event.preventDefault();
  
    const query = event.currentTarget.elements['search-text'].value.trim();
  
    if (!query) {
      iziToast.warning({
        title: 'Warning',
        message: 'Please enter a search field.',
        position: 'topLeft',
      });
      return;
    }
  
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
  
      // Later  render data.hits here
    //   console.log('Images found:', data.hits.length);
    // createGallery(data.hits.length);
      })
      .catch(() => {
        iziToast.error({
          title: 'Error',
          message: 'Something went wrong.',
          position: 'topRight',
        });
      });
  });
  

