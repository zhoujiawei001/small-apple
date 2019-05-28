import axios from 'axios'

let instance = axios.create({
  baseURL: '/api',
  timeout: 1000,
  headers: {'Content-Type': 'application/json'}
});

export default instance
