import Axios from 'axios';

const baseUrl = 'https://localhost:44305/api/OrderProduct';

const getCart = () => new Promise((resolve, reject) => {
    Axios.get(`${baseUrl}/cart`)
        .then((resp) => {
            const orderProductData = resp.data;
            resolve(orderProductData);
        })
        .catch(err => reject(err))
})

const addProductToCart = (orderProduct) => Axios.post(`${baseUrl}`, orderProduct);

const deleteProductFromCart = (orderProductId) => Axios.delete(`${baseUrl}/${orderProductId}`);

export default { addProductToCart, getCart, deleteProductFromCart }