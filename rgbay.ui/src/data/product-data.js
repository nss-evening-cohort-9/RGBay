import axios from 'axios';

const baseUrl = 'https://localhost:44305/api/product';

const getProducts = () => new Promise((resolve, reject) => {
  axios.get(baseUrl)
    .then(response => resolve(response.data))
    .catch(error => reject(error));
});

const deleteProduct = (productId) => axios.delete(`${baseUrl}/${productId}`);

export default { getProducts, deleteProduct };
