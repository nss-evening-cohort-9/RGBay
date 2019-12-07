import axios from 'axios'

const baseUrl = 'https://localhost:44305/api/user'

const getUserInfo = () => new Promise((resolve, reject) => {
    axios.get(baseUrl)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
});

const getUserById = (userId) => axios.get(`${baseUrl}/${userId}`);

export default { getUserInfo, getUserById }