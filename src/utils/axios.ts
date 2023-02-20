import axios from 'axios';
import useAuth from 'src/hooks/useAuth';
// config

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: 'https://unexcityactive-001-site1.etempurl.com/',
  headers: {
    'Accept-Language': 'ar',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
