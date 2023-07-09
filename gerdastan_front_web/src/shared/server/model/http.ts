import axios from 'axios';
import { BASE_URL } from '../consts/baseUrl.ts';

export const http = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
});
