import axios from 'axios'

const baseUrl = 'https://localhost:44305/api/user'

const getUserInfo = () => new Promise((resolve, reject) => {
    axios.get(baseUrl)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
});

const addUser = (user) => axios.post(baseUrl, user);
const getUserById = (userId) => axios.get(`${baseUrl}/${userId}`);
const getUserByUid = (firbaseUid) => axios.get(`${baseUrl}/uid/${firbaseUid}`);

export default {
    getUserInfo,
    getUserById,
    getUserByUid,
    addUser,
};