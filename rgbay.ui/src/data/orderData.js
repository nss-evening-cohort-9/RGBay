import Axios from 'axios';

const baseUrl = 'https://localhost:44305/api/order';

const getOrderData = () => new Promise((resolve, reject) => {
    Axios.get(`${baseUrl}`)
    .then((resp)=> {
        const orderData = resp.data;
        resolve(orderData);
    })
    .catch(err => reject(err));
})

const getOrdersByUid = () => new Promise ((resolve, reject) => {
    Axios.get(`${baseUrl}/uid/`)
    .then((resp) => {
        const orderData = resp.data;
        resolve(orderData);
    })
    .catch(err => reject(err))
})

const getOrderByOrderId = (id) => new Promise ((resolve, reject) => {
    Axios.get(`${baseUrl}/${id}`)
    .then((resp) => {
        const orderData = resp.data;
        resolve(orderData);
    })
    .catch(err => reject(err))
})

const addNewOrder = order => Axios.post(`${baseUrl}`, order);

const deleteOrder = orderId => Axios.delete(`${baseUrl}/${orderId}`);

const updateOrder = (orderId, updatedOrder) => Axios.put(`${baseUrl}/${orderId}`, updatedOrder);

export default 
{ 
    getOrderData,
    getOrdersByUid,
    getOrderByOrderId,
    addNewOrder,
    deleteOrder,
    updateOrder,
}
