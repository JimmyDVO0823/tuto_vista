const BASE_URL = 'http://localhost:8080';

export const api = {
  async post(endpoint, data, token) {
    const headers = { 'Content-Type': 'application/json' };
    const storedToken = token || localStorage.getItem('token');
    if (storedToken) headers['Authorization'] = `Bearer ${storedToken}`;

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error en la petición');
    }

    return response.json();
  },

  async get(endpoint, token) {
    const storedToken = token || localStorage.getItem('token');
    const headers = {};
    if (storedToken) headers['Authorization'] = `Bearer ${storedToken}`;

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error en la petición');
    }

    return response.json();
  },

  async patch(endpoint, data, token) {
    const storedToken = token || localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json' };
    if (storedToken) headers['Authorization'] = `Bearer ${storedToken}`;

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error en la petición');
    }

    return response.json();
  },
};
