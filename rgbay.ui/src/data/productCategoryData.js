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

const getProductCategoryById = (productCategoryId) => axios.get(`${baseUrl}/api/productCategory/${productCategoryId}`);
const postProductCategory = newProductCategory => axios.post(`${baseUrl}/api/productCategory`, newProductCategory);
const updateProductCategory = (productCategoryId, updatedProductCategory) => axios.put(`${baseUrl}/api/productCategory/${productCategoryId}`, updatedProductCategory);
const deleteProductCategory = productCategoryIdToDelete => axios.delete(`${baseUrl}/api/productCategory/${productCategoryIdToDelete}`,productCategoryIdToDelete);

export default {
  getAllProductCategories,
  getProductCategoryById,
  updateProductCategory,
  postProductCategory,
  deleteProductCategory,
}