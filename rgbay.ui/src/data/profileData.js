import axios from 'axios'

const baseUrl = 'https://localhost:44305/api/user'

const getUserInfo = () => new Promise((resolve, reject) => {
    axios.get(baseUrl)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
});

const postNewUser = newUser => axios.post(`${baseUrl}`, newUser);
const removeUser = userId => axios.delete(`${baseUrl}`, {userId});

export default { 
    getUserInfo,
    postNewUser,
    removeUser 
}