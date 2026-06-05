import axios from 'axios';

const api = axios.create({
    baseURL: 'https://d8pokjfm88zqq.cloudfront.net'
});

api.interceptors.request.use(
    (config) => {
        const storedUser = localStorage.getItem('user');
        console.log("in React: Checking Local Storage for User:", storedUser);

        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user && user.token) {
                console.log("in React: Wristband found! Taping it to the request...");
                config.headers.Authorization = `Bearer ${user.token}`;
            } else {
                console.warn("in React: User found, but there is NO TOKEN inside it!");
            }
        } else {
            console.error("in React: Local storage is completely empty. No user found.");
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {

        if (error.response?.status === 401) {
            localStorage.removeItem("user");
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default api;