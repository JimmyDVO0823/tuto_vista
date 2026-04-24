/**
 * @fileoverview Feature Component - User Enrollment Form
 * @module components/features/auth/RegisterForm
 * @description Orchestrates the creation of new academic profiles. 
 * It enforces structural integrity through Zod validation and 
 * manages the propagation of user metadata (FullName, Role) 
 * to the Supabase Auth system.
 */

import React, { useState } from 'react';
import { supabase } from '../../../../lib/supabase';
import { z } from 'zod';

/**
 * RegisterForm Component.
 * 
 * @component
 */
const RegisterForm = () => {
  /**
   * Encapsulates all enrollment inputs as a single state atomic unit.
   * Logic Rationale: Grouped state simplifies change handling and 
   * ensures data consistency before submission.
   * @state {Object} formData
   */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });

  /** @state {boolean} loading - Submission lock */
  const [loading, setLoading] = useState(false);
  /** @state {string|null} error - Validation or network error persistence */
  const [error, setError] = useState(null);
  /** @state {boolean|string} success - Finalization state indicator */
  const [success, setSuccess] = useState(false);
  
  /** @state {boolean} showPassword - Visibility toggle for primary password */
  const [showPassword, setShowPassword] = useState(false);
  /** @state {boolean} showConfirmPassword - Visibility toggle for confirmation */
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /**
   * Generic handler for input synchronization.
   * @param {React.ChangeEvent<HTMLInputElement|HTMLSelectElement>} e
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /**
   * Zod-based Email Schema.
   * Logic Rationale: Enforces RFC compliance at the client-side to 
   * minimize unnecessary server-side validation hits.
   */
  const emailSchema = z.string().email('Por favor, ingresa un correo electrónico válido.');

  /**
   * Submission Sequence.
   * Logic Rationale: 
   * 1. Performs structural validation (Zod).
   * 2. Validates password parity (Manual).
   * 3. Invokes Supabase Auth with metadata payload, ensuring the 
   *    'nombre_completo' and 'rol' are injected into the Auth JWT.
   * 
   * @param {React.FormEvent} e
   * @async
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      emailSchema.parse(formData.email);
    } catch (validationError) {
      setError(validationError.errors[0].message);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);

    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            nombre_completo: formData.name,
            rol: formData.role,
          }
        }
      });

      if (signUpError) throw signUpError;

      setSuccess('¡Registro exitoso! Ya puedes iniciar sesión.');
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'student'
      });
    } catch (err) {
      setError(err.message || 'Error al registrar usuario.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-6" id="register-form">
      <div className="space-y-2">
        <h2 className="font-headline text-2xl font-bold text-[#002045]">
          Crea tu Cuenta
        </h2>
        <p className="text-on-surface-variant text-sm text-gray-600">
          Únete a nuestra red de excelencia académica.
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 text-green-600 p-3 rounded-md text-sm">
            {success}
          </div>
        )}
        <div className="space-y-1">
          <label
            className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant"
            htmlFor="reg-name"
          >
            Nombre Completo
          </label>
          <input
            className="w-full px-4 py-3 bg-[#f7f9fb] border-none focus:ring-2 focus:ring-[#002045]/20 rounded-md placeholder:text-outline-variant/60 text-sm transition-all"
            id="reg-name"
            name="name"
            placeholder="Juan Pérez"
            required
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-1">
          <label
            className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant"
            htmlFor="reg-email"
          >
            Correo Electrónico
          </label>
          <input
            className="w-full px-4 py-3 bg-[#f7f9fb] border-none focus:ring-2 focus:ring-[#002045]/20 rounded-md placeholder:text-outline-variant/60 text-sm transition-all"
            id="reg-email"
            name="email"
            placeholder="juan@academia.com"
            required
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label
              className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant"
              htmlFor="reg-password"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                className="w-full px-4 py-3 pr-10 bg-[#f7f9fb] border-none focus:ring-2 focus:ring-[#002045]/20 rounded-md placeholder:text-outline-variant/60 text-sm transition-all"
                id="reg-password"
                name="password"
                placeholder="••••••••"
                required
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
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
          </div>
          <div className="space-y-1">
            <label
              className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant"
              htmlFor="reg-confirm-password"
            >
              Confirmar Contraseña
            </label>
            <div className="relative">
              <input
                className="w-full px-4 py-3 pr-10 bg-[#f7f9fb] border-none focus:ring-2 focus:ring-[#002045]/20 rounded-md placeholder:text-outline-variant/60 text-sm transition-all"
                id="reg-confirm-password"
                name="confirmPassword"
                placeholder="••••••••"
                required
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex="-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  {showConfirmPassword ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
            Rol Académico
          </label>
          <select
            className="w-full px-4 py-3 bg-[#f7f9fb] border-none focus:ring-2 focus:ring-[#002045]/20 rounded-md text-sm transition-all appearance-none cursor-pointer"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="student">Estudiante</option>
            <option value="tutor">Tutor Académico</option>
          </select>
        </div>
        <div className="py-2">
          <p className="text-[10px] text-on-surface-variant leading-relaxed text-gray-400">
            Al registrarte, aceptas nuestros{" "}
            <a className="text-[#002045] font-bold hover:underline" href="#">
              Términos de Servicio
            </a>{" "}
            y{" "}
            <a className="text-[#002045] font-bold hover:underline" href="#">
              Política de Privacidad
            </a>
            .
          </p>
        </div>
        <button
          className="w-full py-4 signature-gradient text-white font-bold rounded-md active:scale-[0.98] transition-transform shadow-lg shadow-[#002045]/10 disabled:opacity-70 disabled:cursor-not-allowed"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Procesando...' : 'Crear mi Cuenta'}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
