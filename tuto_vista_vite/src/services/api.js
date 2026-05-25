const BASE_URL = 'http://localhost:8081';

// Manejador de errores mejorado para soportar tanto JSON como respuestas de texto plano
const handleApiError = async (response) => {
  let errorMessage = 'Error en la petición';

  try {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } else {
      const textError = await response.text();
      errorMessage = textError || errorMessage;
    }
  } catch (e) {
    // Si falla el parseo del error, se queda con el mensaje por defecto
  }

  if (response.status === 401 || errorMessage.includes('JWT expired')) {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/loginform';
    throw new Error('Tu sesión ha expirado por inactividad. Por favor, inicia sesión nuevamente.');
  }

  throw new Error(errorMessage);
};

// Función auxiliar para procesar la respuesta de forma segura según su tipo
const parseResponse = async (response) => {
  // 1. Si es 204 No Content, retornamos objeto vacío de inmediato
  if (response.status === 204) {
    return {};
  }

  const contentType = response.headers.get("content-type");

  // 2. Si es un JSON válido, lo parseamos normalmente
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  // 3. Si es texto plano (como "Materia asignada..."), lo devolvemos estructurado como objeto
  const textData = await response.text();
  return textData ? { message: textData } : {};
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

    return parseResponse(response);
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

    return parseResponse(response);
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

    return parseResponse(response);
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

    return parseResponse(response);
  },
};