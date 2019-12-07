import axios from 'axios'

const baseUrl = 'https://localhost:44305/api/user'

const getUserInfo = () => new Promise((resolve, reject) => {
    axios.get(baseUrl)
        .then((res) => {
            const info = [];
            if (res.data !== null) {
                Object.keys(res.data).forEach((infoKey) => {
                    res.data[infoKey].id = infoKey;
                    info.push(res.data[infoKey]);
                });
            }
            resolve(info)
        })
        .catch(err => reject(err));
});

const postNewUser = newUser => axios.post(`${baseUrl}`, newUser);

const getSingleUser = userId => axios.get(`${baseUrl}/${userId}`);

const removeUser = userId => axios.delete(`${baseUrl}/${userId}`);

const updateUser = (updatedUser, userId) => axios.put(`${baseUrl}/${userId}`, updatedUser);



export default { 
    getUserInfo,
    postNewUser,
    removeUser,
    updateUser,
    getSingleUser 
}
