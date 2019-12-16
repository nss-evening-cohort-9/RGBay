import axios from 'axios';

const baseUrl = 'https://localhost:44305/api/product';

const getProducts = () => new Promise((resolve, reject) => {
  axios.get(baseUrl)
    .then(response => resolve(response.data))
    .catch(error => reject(error));
});

const getRecentProductsByCategory = (categoryId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/category/${categoryId}`)
    .then(response => resolve(response.data))
    .catch(error => reject(error));
});

const getProductById = (productId) => axios.get(`${baseUrl}/${productId}`);

const deleteProduct = (productId) => axios.delete(`${baseUrl}/${productId}`);
const updateProduct = (productId, updatedProduct) => axios.put(`${baseUrl}/${productId}`, updatedProduct);
const addProduct = (product) => axios.post(`${baseUrl}`, product);

export default {
  getProducts,
  getRecentProductsByCategory,
  getProductById,
  deleteProduct,
  updateProduct,
  addProduct,
};
