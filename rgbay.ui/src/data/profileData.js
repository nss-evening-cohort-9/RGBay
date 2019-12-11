import axios from 'axios'

const baseUrl = 'https://localhost:44305/api/user'

const getAllUsers = () => new Promise((resolve, reject) => {
    axios.get(baseUrl)
        .then((res) => {
            resolve(res.data)
        })
        .catch(err => reject(err));
});

const getSingleUser = userId => axios.get(`${baseUrl}/${userId}`);

const postNewUser = newUser => axios.post(`${baseUrl}`, newUser);

const removeUser = userId => axios.delete(`${baseUrl}/${userId}`);

const updateUser = (updatedUser, userId) => axios.put(`${baseUrl}/${userId}`, updatedUser);



export default { 
    getAllUsers,
    postNewUser,
    removeUser,
    updateUser,
    getSingleUser 
}
