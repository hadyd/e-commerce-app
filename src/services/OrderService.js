import axios from 'axios';
import { getHeaders } from '../utils';

export default class OrderService {
  order(data) {
    return axios('http://localhost:5000/order', {
      method: 'POST',
      headers: getHeaders(),
      data: data,
    }).then((res) => res.data);
  }
}
