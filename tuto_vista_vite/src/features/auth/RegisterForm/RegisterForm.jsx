import React, { useState } from 'react';
import { api } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'estudiante'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // SOLUCIÓN AL ERROR: Declaramos el estado para el mensaje de la contraseña
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  /**
   * Generic handler for input synchronization.
   * @param {React.ChangeEvent<HTMLInputElement|HTMLSelectElement>} e
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validación interactiva en tiempo real para el mensaje inferior
    if (name === 'password') {
      if (!value) {
        setPasswordError('');
      } else if (value.length < 8) {
        setPasswordError('La contraseña debe tener al menos 8 caracteres.');
      } else if (!/[A-Z]/.test(value)) {
        setPasswordError('Debe incluir al menos una letra mayúscula.');
      } else if (!/[0-9]/.test(value)) {
        setPasswordError('Debe incluir al menos un número.');
      } else if (!/[^A-Za-z0-9]/.test(value)) {
        setPasswordError('Debe incluir al menos un carácter especial (ej. !, @, #).');
      } else {
        setPasswordError('');
      }
    }
  };

  const registerSchema = z.object({
    name: z.string().min(1, 'El nombre completo es obligatorio.'),
    email: z.string().email('Por favor, ingresa un correo electrónico válido.'),
    password: z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres.')
      .regex(/[A-Z]/, 'La contraseña debe tener al menos una letra mayúscula.')
      .regex(/[0-9]/, 'La contraseña debe tener al menos un número.')
      .regex(/[^A-Za-z0-9]/, 'La contraseña debe tener al menos un carácter especial (ej. !, @, #, $, etc.).'),
    confirmPassword: z.string()
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validamos TODO el objeto formData con el esquema de Zod
    const validation = registerSchema.safeParse(formData);

    if (!validation.success) {
      setError(validation.error.issues[0]?.message);
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/register', {
        nombreCompleto: formData.name,
        correo: formData.email,
        password: formData.password,
        rol: formData.role
      });

      try {
        // Al registrarse ya no iniciamos sesión automáticamente porque la cuenta está INACTIVA
        // Solo mostramos el mensaje de éxito y pedimos revisar el correo
      } catch (loginErr) {
        console.warn('Login post-registro falló silenciosamente:', loginErr);
      }

      setSuccess('¡Registro exitoso! Por favor, revisa tu correo para activar tu cuenta.');
      setFormData({ name: '', email: '', password: '', confirmPassword: '', role: 'estudiante' });
      setPasswordError('');

      setTimeout(() => {
        navigate('/loginform');
      }, 4000);

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
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>
        )}
        {success && (
          <div className="bg-green-50 text-green-600 p-3 rounded-md text-sm">{success}</div>
        )}
        <div className="space-y-1">
          <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant" htmlFor="reg-name">
            Nombre Completo
          </label>
          <input
            className="w-full px-4 py-3 bg-[#f7f9fb] border-none focus:ring-2 focus:ring-[#002045]/20 rounded-md placeholder:text-outline-variant/60 text-sm transition-all"
            id="reg-name" name="name" placeholder="Juan Pérez" required type="text"
            value={formData.name} onChange={handleChange}
          />
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant" htmlFor="reg-email">
            Correo Electrónico
          </label>
          <input
            className="w-full px-4 py-3 bg-[#f7f9fb] border-none focus:ring-2 focus:ring-[#002045]/20 rounded-md placeholder:text-outline-variant/60 text-sm transition-all"
            id="reg-email" name="email" placeholder="juan@academia.com" required type="email"
            value={formData.email} onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* Campo: Contraseña */}
          <div className="space-y-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant" htmlFor="reg-password">
              Contraseña
            </label>
            <div className="relative">
              <input
                className="w-full px-4 py-3 pr-10 bg-[#f7f9fb] border-none focus:ring-2 focus:ring-[#002045]/20 rounded-md placeholder:text-outline-variant/60 text-sm transition-all"
                id="reg-password" name="password" placeholder="••••••••" required
                type={showPassword ? "text" : "password"}
                value={formData.password} onChange={handleChange}
              />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)} tabIndex="-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showPassword ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  )}
                </svg>
              </button>
            </div>
            {passwordError && (
              <p className="text-red-600 text-xs mt-1">
                {passwordError}
              </p>
            )}
          </div>

          {/* Campo: Confirmar Contraseña (CORREGIDO: name y type id correctos) */}
          <div className="space-y-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant" htmlFor="reg-confirm-password">
              Confirmar Contraseña
            </label>
            <div className="relative">
              <input
                className="w-full px-4 py-3 pr-10 bg-[#f7f9fb] border-none focus:ring-2 focus:ring-[#002045]/20 rounded-md placeholder:text-outline-variant/60 text-sm transition-all"
                id="reg-confirm-password" name="confirmPassword" placeholder="••••••••" required
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword} onChange={handleChange}
              />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)} tabIndex="-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            name="role" value={formData.role} onChange={handleChange}
          >
            <option value="estudiante">Estudiante</option>
            <option value="tutor">Tutor Académico</option>
          </select>
        </div>
        <div className="py-2">
          <p className="text-[10px] text-on-surface-variant leading-relaxed text-gray-400">
            Al registrarte, aceptas nuestros{" "}
            <a className="text-[#002045] font-bold hover:underline" href="#">Términos de Servicio</a>{" "}
            y{" "}
            <a className="text-[#002045] font-bold hover:underline" href="#">Política de Privacidad</a>.
          </p>
        </div>
        <button
          className="w-full py-4 signature-gradient text-white font-bold rounded-md active:scale-[0.98] transition-transform shadow-lg shadow-[#002045]/10 disabled:opacity-70 disabled:cursor-not-allowed"
          type="submit"
          disabled={loading || !!passwordError || !formData.password}
        >
          {loading ? 'Procesando...' : 'Crear mi Cuenta'}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;