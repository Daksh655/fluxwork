import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

api.interceptors.request.use(
    (config) => {
        const storedUser = localStorage.getItem('user');
        console.log("🛠️ [REACT] Checking Local Storage for User:", storedUser);

        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user && user.token) {
                console.log("✅ [REACT] Wristband found! Taping it to the request...");
                config.headers.Authorization = `Bearer ${user.token}`;
            } else {
                console.warn("⚠️ [REACT] User found, but there is NO TOKEN inside it!");
            }
        } else {
            console.error("❌ [REACT] Local storage is completely empty. No user found.");
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;