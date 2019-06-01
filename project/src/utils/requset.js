import axios from 'axios'

let instance = axios.create({
  baseURL: '/api',
  timeout: 15000,
  headers: {'Content-Type': 'application/json'}
});

export default instance
