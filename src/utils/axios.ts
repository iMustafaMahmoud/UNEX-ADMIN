import axios from 'axios';
import useAuth from 'src/hooks/useAuth';
// config

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: 'http://hagarfreetr-001-site1.atempurl.com/api',
  headers: {
    'Accept-Language': 'en',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
