const BASE_URL = 'http://localhost:8080';

export const api = {
  async post(endpoint, data) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error en la petición');
    }

    return response.json();
  },

  async get(endpoint) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });

    if (!response.ok) {
      throw new Error('Error en la petición');
    }

    return response.json();
  }
};
