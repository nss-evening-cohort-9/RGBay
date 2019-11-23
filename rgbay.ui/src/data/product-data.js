import axios from 'axios';

const baseUrl = 'https://localhost:44305/api/product/';

const getProducts = () => new Promise((resolve, reject) => {
  axios.get(baseUrl)
    .then(response => resolve(response.data))
    .catch(error => reject(error));
});

export default { getProducts };
