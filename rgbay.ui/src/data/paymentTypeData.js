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

const getPaymentTypeById = (paymentTypeId) => axios.get(`${baseUrl}/api/paymentType/${paymentTypeId}`);
const postPaymentType = newPaymentType => axios.post(`${baseUrl}/api/paymentType`, newPaymentType);
const updatePaymentType = (paymentTypeId, updatedPaymentType) => axios.put(`${baseUrl}/api/paymentType/${paymentTypeId}`, updatedPaymentType);
const deletePaymentType = paymentTypeIdToDelete => axios.delete(`${baseUrl}/api/paymentType/${paymentTypeIdToDelete}`,paymentTypeIdToDelete);

export default {
  getAllPaymentTypes,
  getPaymentTypeById,
  postPaymentType,
  updatePaymentType,
  deletePaymentType
}