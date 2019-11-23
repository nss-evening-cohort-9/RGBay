import axios from 'axios';

const baseUrl = 'https://localhost:44305';

const getAllPaymentTypes = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/PaymentType`)
    .then((result) => {
      resolve(result.data);
    })
    .catch((error) => {
      reject(error);
    });
});

export default {
  getAllPaymentTypes
}