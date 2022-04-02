import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: process.env.VUE_APP_URL_BACKEND,
    headers: {
        'Content-Type':'application/json',
    },
    withCredentials: true
});

axiosConfig.interceptors.response.use(
    (response) => {
        return response.data;
    },
    async (error) => {
        if(error.response.status===401) {
            let newAccessToken = await axiosConfig.post("/api/refresh-token");
    
            const config = error.config;
            config.headers['x-access-token'] = newAccessToken.accessToken;

            return new Promise((resolve, reject) => {
                axiosConfig.request(config)
                    .then(res => resolve(res))
                    .catch(e => reject(e))
            })
        }
    }
)

export default axiosConfig;
