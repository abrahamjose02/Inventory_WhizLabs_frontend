import axios from 'axios'

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api'
})

export default axiosInstance