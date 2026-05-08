/**
 * @fileoverview Infrastructure Layer — Token Verification Endpoint (Client Simulation)
 * @module lib/verifyTokenEndpoint
 * @description Simulates the behavior of a backend REST endpoint:
 *
 *   GET /api/auth/verify-token
 *
 * In a production system backed by Node.js/Express or Spring Boot, this logic
 * would live server-side. In this frontend-only Vite project (Supabase BaaS),
 * this module provides the equivalent verification logic in the browser so that:
 *
 *  - External consumers can call `verifyTokenEndpoint()` to validate a token.
 *  - The response contract mirrors a real HTTP response: { status, body }.
 *  - Integration is straightforward if a real backend is added later.
 *
 * Accepted Token Sources (mirrors real HTTP behavior):
 *  1. `token` param  → equivalent to ?token=<jwt> query param
 *  2. `authHeader`   → equivalent to Authorization: Bearer <jwt> header
 *
 * Response Contract:
 *  - 200 OK       → { valid: true, payload: JwtPayloadDTO }
 *  - 401 Unauthorized → { error: 'TOKEN_ABSENT' | 'TOKEN_EXPIRED' | 'TOKEN_INVALID', message: string }
 */

import { verifyToken } from './jwt';

// ---------------------------------------------------------------------------
// Output DTOs
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} VerifyTokenSuccessDTO
 * @property {true}           valid   - Always true on success
 * @property {Object}         payload - Decoded JWT payload { id, rol, email, iat, exp }
 */

/**
 * @typedef {Object} VerifyTokenErrorDTO
 * @property {string} error   - Machine-readable error code
 * @property {string} message - Human-readable description
 */

/**
 * @typedef {Object} EndpointResponse
 * @property {200|401}                              status - HTTP-equivalent status code
 * @property {VerifyTokenSuccessDTO|VerifyTokenErrorDTO} body
 */

// ---------------------------------------------------------------------------
// Error Message Map
// ---------------------------------------------------------------------------

const ERROR_MESSAGES = {
  TOKEN_ABSENT:  'No se proporcionó un token de autenticación.',
  TOKEN_EXPIRED: 'El token ha expirado. Por favor, inicia sesión nuevamente.',
  TOKEN_INVALID: 'El token no es válido o ha sido manipulado.',
};

// ---------------------------------------------------------------------------
// Endpoint Function
// ---------------------------------------------------------------------------

/**
 * Validates a JWT and returns a structured HTTP-like response.
 *
 * @param {Object}  [params={}]
 * @param {string}  [params.token]      - JWT passed directly (query param equivalent)
 * @param {string}  [params.authHeader] - Full 'Authorization: Bearer <token>' string
 * @returns {Promise<EndpointResponse>}
 *
 * @example
 * // Usage via direct token (query param style)
 * const result = await verifyTokenEndpoint({ token: localStorage.getItem('tuto_jwt') });
 * if (result.status === 200) console.log(result.body.payload);
 *
 * @example
 * // Usage via Authorization header string
 * const result = await verifyTokenEndpoint({
 *   authHeader: 'Bearer eyJhbGciOi...'
 * });
 */
export const verifyTokenEndpoint = async ({ token, authHeader } = {}) => {
  // --- Token Extraction ---
  let resolvedToken = token ?? null;

  // If no direct token, attempt to parse from "Authorization: Bearer <token>" format
  if (!resolvedToken && authHeader) {
    const bearerMatch = authHeader.match(/^Bearer\s+(.+)$/i);
    if (bearerMatch) {
      resolvedToken = bearerMatch[1];
    }
  }

  // --- Verification ---
  try {
    const payload = await verifyToken(resolvedToken); // throws normalized errors

    /** @type {EndpointResponse} */
    return {
      status: 200,
      body: {
        valid: true,
        payload,
      },
    };
  } catch (err) {
    const errorCode = err.message; // 'TOKEN_ABSENT' | 'TOKEN_EXPIRED' | 'TOKEN_INVALID'

    /** @type {EndpointResponse} */
    return {
      status: 401,
      body: {
        error: errorCode,
        message: ERROR_MESSAGES[errorCode] ?? 'Error de autenticación desconocido.',
      },
    };
  }
};
