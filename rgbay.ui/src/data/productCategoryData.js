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

export default {
  getAllProductCategories
}