import Axios from 'axios';

const baseUrl = 'https://localhost:44305/api/OrderProduct';

const getCartOrderProducts = () => new Promise((resolve, reject) => {
    Axios.get(`${baseUrl}/cart`)
        .then((resp) => {
            const orderProductData = resp.data;
            resolve(orderProductData);
        })
        .catch(err => reject(err))
})

const addProductToCart = (orderProduct) => Axios.post(`${baseUrl}`, orderProduct);

export default { addProductToCart, getCartOrderProducts }