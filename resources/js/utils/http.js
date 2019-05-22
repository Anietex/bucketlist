import AuthManager from './Auth'
import axios from 'axios'

const http = axios.create({
    baseURL: document.querySelector('meta[name="app-url"]').content+"/api/v1",
    headers:{
        "X-CSRF-TOKEN":"Bearer "+ document.querySelector('meta[name="csrf-token"]').content,
    }
});

http.interceptors.request.use((config)=>{
    config.headers["Authorization"] = 'Bearer '+ AuthManager.getToken();
    return config;
});

export default http;
