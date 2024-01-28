import { user } from '../shared/types';
import { encryptTokenAndStoreToLocalStorage, serverUrl, testingUrl } from './../shared/constants';
import axios from 'axios'

const instance = axios.create({
    baseURL: serverUrl
})


instance.interceptors.response.use(function (response) {
    if (response.data && response.data.data && response.data.data.user) {
        encryptTokenAndStoreToLocalStorage(response.data.data.token)
        //const realToken: string = decryptAndRetrieveToken()
        const user: user = {
            fullname: response.data.data.user.fullName,
            email: response.data.data.user.email,
            telphone: response.data.data.user.telphone,
            id: response.data.data.user.id,
            token: response.data.data.token
        }
        response.data.data.user = user

    }
    return response
})


// instance.interceptors.request.use(function (request) {
//     const token = localStorage.getItem('token');
//     if (token) {
//         const decryptedToken = decryptAndRetrieveToken();
//         request.userToken = decryptedToken
//     }
//     return request
// })


export default instance;