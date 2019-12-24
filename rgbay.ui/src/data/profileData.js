import axios from 'axios'

const baseUrl = 'https://localhost:44305/api/user'

const getAllUsers = () => new Promise((resolve, reject) => {
    axios.get(baseUrl)
        .then((res) => {
            resolve(res.data)
        })
        .catch(err => reject(err));
});

const addUser = (user) => axios.post(baseUrl, user);
const getUserById = (userId) => axios.get(`${baseUrl}/${userId}`);
const getUserByUid = (firbaseUid) => axios.get(`${baseUrl}/uid/${firbaseUid}`);


const getSingleUser = userId => axios.get(`${baseUrl}/${userId}`);
const postNewUser = newUser => axios.post(`${baseUrl}`, newUser);
const removeUser = userId => axios.delete(`${baseUrl}/${userId}`);
const updateUser = (updatedUser, userId) => axios.put(`${baseUrl}/${userId}`, updatedUser);
// const getSingleUserProducts = userId => axios.get(`${baseUrl}/${userId}`)

const geographicalStates = [
    'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT',
    'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID',
    'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH',
    'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE',
    'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP',
    'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA',
    'WV', 'WI', 'WY'];

export default {
    getUserById,
    getUserByUid,
    addUser,
    geographicalStates,
    getAllUsers,
    postNewUser,
    removeUser,
    updateUser,
    getSingleUser 
};
