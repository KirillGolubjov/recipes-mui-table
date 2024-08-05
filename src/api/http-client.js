import axios from 'axios';
import { BAD_REQUEST, EX_SYSTEM } from '../common/error-messages';

export const httpCommon = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
});

httpCommon.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.message;

    if (!error.response || !error.response.status) {
      return Promise.reject({ message, code: '400' });
    }
    switch (error.response.status) {
      case 400:
        return Promise.reject({ message: BAD_REQUEST, code: '400' });
      case 404:
        return Promise.reject({ message: BAD_REQUEST, code: '404' });
      case 500:
        return Promise.reject({ message: EX_SYSTEM, code: '500' });
      default:
        return Promise.reject({ message, code: '400' });
    }
  }
);
