import axios from 'axios';
// config

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: 'http://imustafaaaa-001-site1.btempurl.com/api/',
  headers: {
    'Accept-Language': 'ar',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
