import axios from 'axios';
import { getHeaders } from '../utils';

export default class ProductService {
  getProductList() {
    return axios
      .get('http://localhost:5000/products', {
        headers: getHeaders(),
      })
      .then((res) => res.data);
  }
  getProductDetail(id) {
    return axios
      .get('http://localhost:5000/products/' + id, {
        headers: getHeaders(),
      })
      .then((res) => res.data);
  }
  getCategoryList() {
    return axios
      .get('http://localhost:5000/api/category', {
        headers: getHeaders(),
      })
      .then((res) => res.data);
  }
}
