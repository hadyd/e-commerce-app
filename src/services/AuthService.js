import axios from 'axios';
import { getHeaders } from '../utils';

export default class AuthService {
  login(data) {
    return axios('http://localhost:5000/login', {
      method: 'POST',
      headers: getHeaders(),
      data: data,
    }).then((res) => res.data);
  }

  register(data) {
    return axios('http://localhost:5000/register', {
      method: 'POST',
      headers: getHeaders(),
      data: data,
    }).then((res) => res.data);
  }

  logout() {
    return axios('http://localhost:5000/logout', {
      method: 'DELETE',
      headers: getHeaders(),
    }).then((res) => res.data);
  }
}
