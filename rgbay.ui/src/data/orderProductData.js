import Axios from 'axios';

const baseUrl = 'https://localhost:44305/api/OrderProduct';

const getCart = () => new Promise((resolve, reject) => {
    Axios.get(`${baseUrl}/cart`)
        .then((resp) => {
            const orderProductData = resp.data;
            resolve(orderProductData);
        })
        .catch(err => reject(err));
})

const getOrderDetails = (orderId) => new Promise((resolve, reject) => {
    Axios.get(`${baseUrl}/details/${orderId}`)
        .then((resp) => {
            const orderDetails = resp.data;
            resolve(orderDetails);
        })
        .catch(err => reject(err));
})

const addOrderProduct = (orderProduct) => Axios.post(`${baseUrl}/add`, orderProduct);

const deleteProductFromCart = (orderProductId) => Axios.delete(`${baseUrl}/${orderProductId}`);

export default { 
    addOrderProduct,
    getCart,
    getOrderDetails,
    deleteProductFromCart
}
