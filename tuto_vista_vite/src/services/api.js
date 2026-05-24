const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081';

const handleApiError = async (response) => {
  const errorData = await response.json().catch(() => ({}));
  const errorMessage = errorData.message || 'Error en la petición';
  
  if (response.status === 401 || errorMessage.includes('JWT expired')) {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/loginform';
    throw new Error('Tu sesión ha expirado por inactividad. Por favor, inicia sesión nuevamente.');
  }
  
  throw new Error(errorMessage);
};

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
      await handleApiError(response);
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
      await handleApiError(response);
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
      await handleApiError(response);
    }

    return response.json();
  },

  async delete(endpoint, token) {
    const storedToken = token || localStorage.getItem('token');
    const headers = {};
    if (storedToken) headers['Authorization'] = `Bearer ${storedToken}`;

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      await handleApiError(response);
    }

    // Return empty object for 204 No Content
    if (response.status === 204) {
      return {};
    }

    return response.json().catch(() => ({}));
  },
};
