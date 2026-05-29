const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081';
// ── In-memory cache for reference data (departments, subjects, etc.) ──
const _cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes


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

  async get(endpoint, params = {}, token) {
    const storedToken = token || localStorage.getItem('token');
    const headers = {};
    if (storedToken) headers['Authorization'] = `Bearer ${storedToken}`;

    let url = `${BASE_URL}${endpoint}`;
    if (params && Object.keys(params).length > 0) {
      const queryString = new URLSearchParams(params).toString();
      url += `?${queryString}`;
    }

    const response = await fetch(url, {
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
/**
 * Cached GET — returns data from in-memory cache if it's fresh (< CACHE_TTL),
 * otherwise fetches from the server and stores the result.
 * Ideal for reference data that rarely changes (departments, subjects).
 */
export function getCached(endpoint, token) {
  const cached = _cache.get(endpoint);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return Promise.resolve(cached.data);
  }
  return api.get(endpoint, token).then(data => {
    _cache.set(endpoint, { data, ts: Date.now() });
    return data;
  });
}