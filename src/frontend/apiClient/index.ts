import axios, { AxiosInstance } from 'axios';

const client: AxiosInstance = axios.create();

const requestInterceptor = (req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
};

client.interceptors.request.use(requestInterceptor, (err) =>
  Promise.reject(err),
);

const responseErrorHandler = (err) => {
  if (axios.isCancel(err)) {
    return Promise.reject({ status: 999, statusText: 'Canceled' });
  }
  const response = err.response || {};
  const status = response.status || 400;
  const statusText = response.statusText || 'Error';
  let data = response.data || {};
  if (typeof data === 'string') {
    data = { statusText: data };
  }
  return Promise.reject({ status, statusText, ...data });
};

client.interceptors.response.use((res) => res, responseErrorHandler);

export default client;
