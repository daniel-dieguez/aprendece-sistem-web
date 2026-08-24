"use client";

import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState, useCallback } from 'react';

const API_BASE_URL = 'http://localhost:9000/api';
const REDIRECT_LOGIN = '/login';

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

// Funciones genéricas

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

/**
 * Hook reutilizable para consumir la API con useEffect automático.
 * @param {string|null} url - endpoint relativo, ej: 'citas/allCitasDiarias/2025/2/10'
 * @param {string} method - 'GET' | 'POST' | 'PUT' | 'DELETE'
 * @param {object|null} body - body para POST/PUT
 */
export const useFetch = (url, method = 'GET', body = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

console.log('URL final:', url);

  const fetchData = useCallback(async () => {
    if (!url) return;
    setLoading(true);
    setError(null);
    try {
      let result;
      switch (method.toUpperCase()) {
        case 'POST':
          result = await post(url, body);
          break;
        case 'PUT':
          result = await put(url, body);
          break;
        case 'DELETE':
          result = await del(url);
          break;
        case 'GET':
        default:
          result = await get(url);
          break;
      }
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url, method, JSON.stringify(body)]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default api;