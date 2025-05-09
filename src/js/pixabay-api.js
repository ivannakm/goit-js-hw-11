import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '50172771-05af20c50899f4393bfb7f5e3';

export function getImagesByQuery(query) {
  return axios.get(BASE_URL, { params:   
    {key: API_KEY ,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,} 
  }).then(res => res.data)
  .catch(error => {
    console.log(error);
  });
}
  
