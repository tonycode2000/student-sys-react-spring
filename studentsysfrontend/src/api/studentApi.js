import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const studentApi = {
  getAll: () =>
    apiClient.get('/student/getAll'),

  create: (data) =>
    apiClient.post('/student/add', data),

  update: (id, data) =>
    apiClient.put(`/student/${id}`, data),

  delete: (id) =>
    apiClient.delete(`/student/${id}`),
};

export default studentApi;