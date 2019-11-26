import Axios from 'axios';

const baseUrl = 'https://localhost:44305';

const getOrderData = () => new Promise((resolve, reject) => {
    Axios.get(`${baseUrl}/api/order`)
    .then((resp)=> {
        const orderData = resp.data;
        resolve(orderData);
    })
    .catch(err => reject(err));
})

export default { getOrderData }
