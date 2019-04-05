import { create } from 'axios';
import router from '../router.js'

let client = create({
  baseURL: 'http://localhost:3000'
});

client.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      router.push("/");
    }
    return Promise.reject(error);
  }
);

export default client;