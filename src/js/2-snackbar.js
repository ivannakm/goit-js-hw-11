import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const delay = Number(form.elements.delay.value);
    const state = form.elements.state.value;    // 'fulfilled' or 'rejected'
    const shouldResolve = state === 'fulfilled';
  
    createPromise(delay, shouldResolve)
      .then((delay) => {
        iziToast.success({
          title: 'OK',
          message: `✅ Fulfilled promise in ${delay}ms`,
          position: 'topRight',
        });
      })
      .catch((delay) => {
        iziToast.error({
          title: 'Error',
          message: `❌ Rejected promise in ${delay}ms`,
          position: 'topRight',
        });
      });
      form.reset();
  });

  function createPromise (delay, shouldResolve){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                resolve(delay);
                
            } else {
                reject(delay);
            }
        }, delay);
    });
};