const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081';

// Manejador de errores mejorado para soportar tanto JSON como respuestas de texto plano
const handleApiError = async (response) => {
  let errorMessage = 'Error en la petición';

  try {
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const errorData = await response.json();

      // 🌟 Buscamos el mensaje en cualquiera de las propiedades comunes de Spring Boot
      let rawError = errorData.message || errorData.error || errorMessage;

      // Si el backend metió el texto adentro de las comillas del status (como tu log de Network)
      if (typeof rawError === 'string' && rawError.includes("Tu cuenta ha sido desactivada")) {
        errorMessage = "Tu cuenta ha sido desactivada. Contacta al administrador.";
      } else {
        errorMessage = rawError;
      }

    } else {
      // Si viene como texto plano
      const textError = await response.text();

      if (textError && textError.includes("Tu cuenta ha sido desactivada")) {
        errorMessage = "Tu cuenta ha sido desactivada. Contacta al administrador.";
      } else {
        errorMessage = textError || errorMessage;
      }
    }
  } catch (e) {
    console.error("Fallo al procesar error de API", e);
  }

  // Lógica existente para tokens expirados
  if (response.status === 401 || errorMessage.includes('JWT expired')) {
    throw new Error('TOKEN_EXPIRED');
  }

  throw new Error(errorMessage);
};

// Función auxiliar para procesar la respuesta de forma segura según su tipo
const parseResponse = async (response) => {
  if (response.status === 204) {
    return {};
  }

  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

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

  // ✨ ¡AQUÍ ESTÁ EL MÉTODO QUE HACÍA FALTA!
  async put(endpoint, data, token) {
    const storedToken = token || localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json' };
    if (storedToken) headers['Authorization'] = `Bearer ${storedToken}`;

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
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