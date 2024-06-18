import axios from 'axios';
import { INSTAGRAM_BASE_URL } from './constants';

export default axios.create({
  baseURL: INSTAGRAM_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
