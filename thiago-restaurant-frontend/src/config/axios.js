import axios from 'axios';

//Create instance axios
const http = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default http;
