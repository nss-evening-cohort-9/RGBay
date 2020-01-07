import axios from 'axios'

const baseUrl = 'https://localhost:44305/api/user'
const reviewUrl = 'https://localhost:44305/api/reviews'

const getAllUsers = () => new Promise((resolve, reject) => {
    axios.get(baseUrl)
        .then((res) => {
            resolve(res.data)
        })
        .catch(err => reject(err));
});

const getAllReviews = () => new Promise((resolve, reject) => {
    axios.get(reviewUrl)
    .then((res) => {
        resolve(res.data)
    })
    .catch(err => reject(err))
})

// const getUserReviews = () => new Promise((resolve, reject) => {
//     axios.get(reviewUrl)
//     .then((res) => {
//         resolve(res.data)
//     })
//     .catch(err => reject(err))
// })



const addUser = (user) => axios.post(baseUrl, user);
const getUserById = (userId) => axios.get(`${baseUrl}/${userId}`);
const getUserByUid = (firbaseUid) => axios.get(`${baseUrl}/uid/${firbaseUid}`);


const getSingleUser = userId => axios.get(`${baseUrl}/${userId}`);
const postNewUser = newUser => axios.post(`${baseUrl}`, newUser);
const removeUser = userId => axios.delete(`${baseUrl}/${userId}`);
const updateUser = (updatedUser, userId) => axios.put(`${baseUrl}/${userId}`, updatedUser);

const getUserReviews = (userId) => axios.get(`${reviewUrl}/${userId}`);

const geographicalStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT',
    'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 
    'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 
    'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 
    'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 
    'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN',
    'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 
    'WY'];

export default {
    getUserById,
    getUserByUid,
    addUser,
    geographicalStates,
    getAllUsers,
    postNewUser,
    removeUser,
    updateUser,
    getSingleUser,
    getAllReviews,
    getUserReviews
};
