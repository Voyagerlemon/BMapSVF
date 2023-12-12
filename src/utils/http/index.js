import axios from "axios";
axios.defaults.baseURL = `http://127.0.0.1:8088/`;
// Request interceptor
axios.interceptors.request.use(config => config);
// Response interceptor
axios.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    return Promise.reject(err);
  }
);
export default axios;
