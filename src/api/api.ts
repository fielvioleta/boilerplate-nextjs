import { store } from '@/store/store';
import axios from 'axios'


const API = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
    headers: {
        'Content-Type': 'application/json',
    },
})

API.interceptors.request.use((config) => {
    const state = store.getState()
    const environment = state.environment.environment;

    if (environment === 'devap') {
        config.baseURL = 'http://localhost:4000';
    } else if (environment === 'deveu') {
        config.baseURL = 'http://localhost:4001';
    }

    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor to handle errors
// API.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//             // If unauthorized, clear Redux state and redirect
//             store.dispatch({ type: 'auth/logout' }); // Example: Dispatch a logout action
//             Router.push('/login'); // Redirect to login page
//         }
//         return Promise.reject(error);
//     }
// );

export default API
