import axios from 'axios';

const baseUrl = 'https://localhost:44305';

const getAllProductCategories = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/ProductCategory`)
    .then((result) => {
      resolve(result.data);
    })
    .catch((error) => {
      reject(error);
    });
});

<<<<<<< HEAD
const postProductCategory = newProductCategory => axios.post(`${baseUrl}/api/productCategory`, newProductCategory);
const deleteProductCategory = productCategoryToDelete => axios.delete(`${baseUrl}/api/productCategory/${productCategoryToDelete.id}`,productCategoryToDelete);

export default {
  getAllProductCategories,
  postProductCategory,
  deleteProductCategory,
=======
const getProductCategoryById = (productCategoryId) => axios.get(`${baseUrl}/api/ProductCategory/${productCategoryId}`);

export default {
  getAllProductCategories,
  getProductCategoryById,
>>>>>>> master
}