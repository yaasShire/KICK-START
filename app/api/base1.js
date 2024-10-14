import Axios from 'axios'
const headers = {
    "Content-Type": "application/json",
    // Authorization: apiKey,
};
const baseURL = "http://192.168.1.5/api/v1/";

export const AXIOS_BASE_URL_1 = Axios.create({
    baseURL,
    headers
})