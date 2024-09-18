import { baseUrl } from "./apiConfig";
import axios from 'axios';
const apiMethod = {
    checkAuth: async () => {
        try {
            const response = await axios.get(`${baseUrl}/auth/checkAuth`, { withCredentials: true });
            return response;
        } catch (err) {
            console.log(err);
            return false;
        }
    },
    login: async (email, password) => {
        try {
            const data = {
                email,
                password
            };
            const response = await axios.post(`${baseUrl}/auth/login`, data, { withCredentials: true});
            return response.data;
        }
        catch (err) {
            
            return err.response.data;
        }
    },
    logout: async () => {
        try {
            const response = await axios.post(`${baseUrl}/auth/logout`, {},  { withCredentials: true});
            console.log(response);
            return response;
        } catch (err) {
            console.log("lah");
            console.log(err)
        }
    },
    register: async (data) => {
        console.log(data)
        try {
            const response = await axios.post(`${baseUrl}/auth/register`, data, { withCredentials: true });
            return response;
        } catch (err) {
            return err.response;
        }
    },
    updateUser: async (id, data) => {
        try {
            const response = await axios.put(`${baseUrl}/users/${id}`, data, { withCredentials: true });
            console.log("okaa");
            console.log(response);
            return response;
        } catch (err) {
            return err.response;
        }
    }
}

export default apiMethod;