import Axios from 'axios'
const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2MTI1MTgzNjgwOTkiLCJpYXQiOjE3MTM1MzczNTgsImV4cCI6MTcxNDE0MzE1OH0.ZHbfKDZ_sZOrwQUTFD9CSYrT5VqFuupsYp4XCwSfyo8"
};
const baseURL = "http://192.168.1.5:6000/api/v1/";

export const AXIOS_BASE_URL_2 = Axios.create({
    baseURL,
    headers
})