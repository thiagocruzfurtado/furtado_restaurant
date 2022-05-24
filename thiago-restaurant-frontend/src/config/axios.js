import axios from 'axios';

//Create instance axios
const http = axios.create({
    baseURL: 'http://localhost:3333',
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default http;
