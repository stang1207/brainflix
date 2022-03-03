import axios from 'axios';
const API_KEY = 'd39bfa83-32e7-4431-bba5-5857bcc75211';

export default axios.create({
  baseURL: 'https://project-2-api.herokuapp.com',
  params: {
    api_key: API_KEY,
  },
});
