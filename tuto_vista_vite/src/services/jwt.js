/**
 * @fileoverview Infrastructure Layer — JWT Service
 * @module lib/jwt
 * @description Provides a centralized, browser-compatible JWT utility layer
 * built on the `jose` library (Web Crypto API). Replaces the Node.js-only
 * `jsonwebtoken` package, which cannot run in a Vite/browser environment.
 *
 * Key Operations:
 *  - signToken(payload)  → Generates a signed HS256 JWT (24h expiry)
 *  - verifyToken(token)  → Validates signature & expiry; returns payload
 *  - decodeToken(token)  → Decodes without verification (read-only)
 *
 * Secret Source: VITE_JWT_SECRET environment variable.
 * Token Storage Key: 'tuto_jwt' in localStorage.
 */

import { SignJWT, jwtVerify, decodeJwt } from 'jose';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Duration string understood by `jose` */
const TOKEN_EXPIRATION = '24h';

/** localStorage key used throughout the app */
export const JWT_STORAGE_KEY = 'tuto_jwt';

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Encodes the JWT_SECRET string into a Uint8Array for use with Web Crypto.
 * Logic Rationale: `jose` requires a BufferSource for HMAC operations,
 * unlike `jsonwebtoken` which accepts plain strings.
 *
 * @returns {Uint8Array}
 */
const getSecretKey = () => {
  const secret = import.meta.env.VITE_JWT_SECRET;
  if (!secret) {
    console.error(
      '[JWT] VITE_JWT_SECRET is not defined. ' +
      'Add it to your .env file before using JWT features.'
    );
  }
  return new TextEncoder().encode(secret);
};

// ---------------------------------------------------------------------------
// DTO Shape (for documentation only — no runtime enforcement)
// ---------------------------------------------------------------------------
/**
 * @typedef {Object} JwtPayloadDTO
 * @property {string} id      - Supabase user UUID
 * @property {string} rol     - 'estudiante' | 'tutor' | 'admin'
 * @property {string} email   - User's email address
 * @property {number} [iat]   - Issued-at (set automatically)
 * @property {number} [exp]   - Expiration (set automatically, 24h)
 */

// ---------------------------------------------------------------------------
// Service Functions
// ---------------------------------------------------------------------------

/**
 * Signs and returns a new JWT containing the user's identity payload.
 * The token is valid for 24 hours from the time of issuance.
 *
 * @param {Pick<JwtPayloadDTO, 'id' | 'rol' | 'email'>} payload
 * @returns {Promise<string>} Signed JWT string
 */
export const signToken = async (payload) => {
  const secretKey = getSecretKey();

  return await new SignJWT({ id: payload.id, rol: payload.rol, email: payload.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRATION)
    .sign(secretKey);
};

/**
 * Verifies a JWT's signature and expiration.
 * Throws a normalized error so callers can handle specific cases.
 *
 * Error codes:
 *  - 'TOKEN_ABSENT'  → token is null/undefined/empty
 *  - 'TOKEN_EXPIRED' → token has passed its `exp` timestamp
 *  - 'TOKEN_INVALID' → signature mismatch or malformed token
 *
 * @param {string} token
 * @returns {Promise<JwtPayloadDTO>} Decoded and verified payload
 * @throws {Error} with message set to one of the error codes above
 */
export const verifyToken = async (token) => {
  if (!token) {
    const err = new Error('TOKEN_ABSENT');
    err.status = 401;
    throw err;
  }

  const secretKey = getSecretKey();

  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (joseError) {
    const isExpired = joseError?.code === 'ERR_JWT_EXPIRED';
    const msg = isExpired ? 'TOKEN_EXPIRED' : 'TOKEN_INVALID';
    const err = new Error(msg);
    err.status = 401;
    throw err;
  }
};

/**
 * Decodes a JWT payload WITHOUT verifying the signature.
 * Use only for reading non-sensitive, non-authoritative data
 * (e.g., to show a username before full verification).
 *
 * @param {string} token
 * @returns {JwtPayloadDTO | null}
 */
export const decodeToken = (token) => {
  if (!token) return null;
  try {
    return decodeJwt(token);
  } catch {
    return null;
  }
};
