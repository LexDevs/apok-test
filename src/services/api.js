import axios from 'axios';

const apiUrl = 'https://api-graph.tests.grupoapok.com';

const api = axios.create({
    baseURL: apiUrl,
});

export default api;
