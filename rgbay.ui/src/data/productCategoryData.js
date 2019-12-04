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

const postProductCategory = newProductCategory => axios.post(`${baseUrl}/api/productCategory`, newProductCategory);
const deleteProductCategory = productCategoryToDelete => axios.delete(`${baseUrl}/api/productCategory/${productCategoryToDelete.id}`,productCategoryToDelete);

export default {
  getAllProductCategories,
  postProductCategory,
  deleteProductCategory,
}