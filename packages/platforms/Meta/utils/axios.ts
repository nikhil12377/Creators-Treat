import axios from 'axios';
import { FACEBOOK_BASE_URL } from './constants';

export default axios.create({
  baseURL: FACEBOOK_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
