import axios from 'axios';

// 1. Create a dedicated Axios instance pointing to Spring Boot
const api = axios.create({
    baseURL: 'http://localhost:8080',
});

// 2. The Interceptor (The Toll Booth)
api.interceptors.request.use(
    (config) => {
        // Look inside localStorage for the user data we saved during login
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
            const user = JSON.parse(storedUser);

            // If we find a token, attach it to the headers exactly how Spring Security expects it!
            if (user && user.token) {
                config.headers.Authorization = `Bearer ${user.token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;