
"use client";

import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = 'http://localhost:9000'; // Cambia según tu backend
const REDIRECT_LOGIN = '/login'; // Ruta para redirigir si token inválido

// Crear instancia Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores globales, especialmente 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error('Sesión expirada. Por favor inicia sesión nuevamente.');

      localStorage.clear();
      sessionStorage.clear();

      window.location.href = REDIRECT_LOGIN;
    }
    return Promise.reject(error);
  }
);

// Funciones genéricas para peticiones

export const get = async (url, config = {}) => {
  try {
    const response = await api.get(url, config);
    return response.data;
  } catch (error) {
    console.error('GET error:', error);
    throw error;
  }
};

export const post = async (url, data, config = {}) => {
  try {
    const response = await api.post(url, data, config);
    return response.data;
  } catch (error) {
    console.error('POST error:', error);
    throw error;
  }
};

export const put = async (url, data, config = {}) => {
  try {
    const response = await api.put(url, data, config);
    return response.data;
  } catch (error) {
    console.error('PUT error:', error);
    throw error;
  }
};

export const del = async (url, config = {}) => {
  try {
    const response = await api.delete(url, config);
    return response.data;
  } catch (error) {
    console.error('DELETE error:', error);
    throw error;
  }
};

export default api;
