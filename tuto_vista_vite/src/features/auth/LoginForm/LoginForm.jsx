/**
 * @fileoverview Feature Component - Authentication Login Form
 * @module components/features/auth/LoginForm
 * @description Provides the primary interface for user ingress. 
 * Designed with the 'Academic Editorial' philosophy, it balances security 
 * requirements with a low-friction user experience.
 */
import Swal from 'sweetalert2';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import ReCAPTCHA from 'react-google-recaptcha';

/**
 * LoginForm Component.
 * Encapsulates the state and logic for session initiation via backend JWT.
 * 
 * @component
 */
const LoginForm = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, email: value }));
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError('');
    } else if (!emailRegex.test(value)) {
      setEmailError('El formato del correo electrónico no es válido.');
    } else {
      setEmailError('');
    }
  };
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, password: value }));
    if (!value) {
      setPasswordError('');
    } else if (value.length < 8) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres.');
    } else {
      setPasswordError('');
    }
  };

  /**Toggle for password field visibility. 
   * Enhances UX by allowing users to verify their input in sensitive contexts.
   * @state {boolean} showPassword
   */
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Captures and displays authentication exceptions.
   * Logic Rationale: Errors are rendered in a distinct red-tinted micro-sheet 
   * to provide immediate corrective feedback.
   * @state {string|null} error
   */
  const [error, setError] = useState(null);

  /**
   * Prevents duplicate form submissions during the asynchronous Auth handshake.
   * @state {boolean} loading
   */
  const [loading, setLoading] = useState(false);

  /**
   * Stores the reCAPTCHA token upon successful verification.
   * @state {string|null} recaptchaToken
   */
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  /**
   * Router navigation hook for post-authentication redirection.
   * @type {function}
   */
  const navigate = useNavigate();

  /**
   * Handlers for the form submission event.
   * 
   * @param {React.FormEvent} e - The form submission event.
   * @async
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!recaptchaToken) {
      Swal.fire({
        title: 'Verificación requerida',
        text: 'Por favor, completa el reCAPTCHA para continuar.',
        icon: 'warning',
        confirmButtonColor: '#002045'
      });
      return;
    }

    setLoading(true);
    try {
      // Enviamos el correo, password Y el token del recaptcha por si el back lo pide
      const response = await api.post('/auth/login', {
        correo: formData.email,
        password: formData.password,
        recaptchaToken: recaptchaToken // 👈 Añadido por seguridad ante el Error 400
      });

      // Guardar sesión en el contexto
      login(response, response.token);

      // Alerta de éxito opcional antes de pasar
      Swal.fire({
        title: '¡Bienvenido!',
        text: 'Sesión iniciada correctamente.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });

      // Redirigir según el rol
      const roleRedirects = {
        'estudiante': '/dashboard',
        'tutor': '/dashboard',
        'administrador': '/dashboard'
      };

      navigate(roleRedirects[response.rol] || '/');
    } catch (err) {
      console.error("Error capturado en el formulario:", err.message);

      // ✨ ¡AQUÍ DISPARAMOS SWEETALERT2 PARA LA CUENTA DESACTIVADA!
      Swal.fire({
        title: '¡Acceso Denegado!',
        text: err.message || 'Error al iniciar sesión. Comprueba tus credenciales.',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#002045',
        customClass: {
          popup: 'rounded-2xl'
        }
      });

      // También lo dejamos en el estado por si usas el micro-sheet rojo
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6" id="login-form">
      <div className="space-y-2">
        <h2 className="font-headline text-2xl font-bold text-primary text-[#002045]">
          Inicia Sesión
        </h2>
        <p className="text-on-surface-variant text-sm text-gray-600">
          Ingresa tus credenciales para continuar con tus estudios.
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
            {error}
          </div>
        )}
        <div className="space-y-1">
          <label
            className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant"
            htmlFor="email"
          >
            Correo Electrónico
          </label>
          <input
            className="w-full px-4 py-3 bg-[#f7f9fb] border-none focus:ring-2 focus:ring-[#002045]/20 rounded-md placeholder:text-outline-variant/60 text-sm transition-all"
            id="email"
            name="email"
            placeholder="ejemplo@academia.com"
            required
            type="email"
            value={formData.email}
            onChange={handleEmailChange}
            aria-describedby={emailError ? "email-error" : undefined}
            aria-invalid={emailError ? "true" : "false"}
          />
          {emailError && (
            <p className="text-red-600 text-xs mt-1" id="email-error">
              {emailError}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <label
            className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant"
            htmlFor="password"
          >
            Contraseña
          </label>
          <div className="relative">
            <input
              className="w-full px-4 py-3 pr-10 bg-[#f7f9fb] border-none focus:ring-2 focus:ring-[#002045]/20 rounded-md placeholder:text-outline-variant/60 text-sm transition-all"
              id="password"
              name="password"
              placeholder="••••••••"
              required
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handlePasswordChange}
              aria-describedby={passwordError ? "password-error" : undefined}
              aria-invalid={passwordError ? "true" : "false"}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex="-1"
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {showPassword ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                )}
              </svg>
            </button>
          </div>
          {passwordError && (
            <p className="text-red-600 text-xs mt-1" id="password-error">
              {passwordError}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between py-2">
          <label className="flex items-center gap-2 cursor-pointer group" htmlFor="remember-me">
            <input
              id="remember-me"
              className="w-4 h-4 rounded border-outline-variant text-[#002045] focus:ring-[#002045]/20 cursor-pointer"
              type="checkbox"
            />
            <span className="text-xs text-on-surface-variant group-hover:text-on-surface transition-colors">
              Recordarme
            </span>
          </label>
          <a
            className="text-xs font-bold text-[#002045] hover:underline decoration-tertiary-container decoration-2 underline-offset-4 transition-all"
            href="#"
          >
            Olvidé mi contraseña
          </a>
        </div>

        <div className="flex justify-center my-4">
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || ""}
            onChange={(token) => setRecaptchaToken(token)}
            onExpired={() => setRecaptchaToken(null)}
          />
        </div>

        <button
          className="w-full py-4 signature-gradient text-white font-bold rounded-md active:scale-[0.98] transition-transform shadow-lg shadow-[#002045]/10 disabled:opacity-70 disabled:cursor-not-allowed"
          type="submit"
          disabled={loading || !recaptchaToken || !formData.email || !formData.password || !!emailError || !!passwordError}
        >
          {loading ? 'Ingresando...' : 'Acceder al Portal'}
        </button>
      </form>

      <div className="text-center pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-500">
          ¿No tienes una cuenta?{" "}
          <Link
            to="/registerform"
            className="text-[#002045] font-bold hover:underline"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
