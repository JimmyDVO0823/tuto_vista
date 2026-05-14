import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../../../lib/api';
import { useAuth } from '../../../../context/AuthContext';

const LoginForm = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', {
        correo: formData.email,
        password: formData.password,
      });

      // Guardar en el contexto
      login(response, response.token);

      // Redirigir según el rol
      const roleRedirects = {
        'estudiante': '/dashboard/student',
        'tutor': '/dashboard/tutor',
        'administrador': '/dashboard/admin'
      };

      navigate(roleRedirects[response.rol] || '/');
      
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
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

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-xs font-bold border border-red-100">
          {error}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
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
            onChange={handleChange}
          />
        </div>
        <div className="space-y-1">
          <label
            className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            className="w-full px-4 py-3 bg-[#f7f9fb] border-none focus:ring-2 focus:ring-[#002045]/20 rounded-md placeholder:text-outline-variant/60 text-sm transition-all"
            id="password"
            name="password"
            placeholder="••••••••"
            required
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between py-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
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
        <button
          className={`w-full py-4 signature-gradient text-white font-bold rounded-md active:scale-[0.98] transition-transform shadow-lg shadow-[#002045]/10 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          type="submit"
          disabled={loading}
        >
          {loading ? 'Validando...' : 'Acceder al Portal'}
        </button>
      </form>
      {/* ... resto del código (Google/Facebook/Register) ... */}
      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-widest bg-white px-4 text-gray-400 font-medium">
          O continúa con
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors active:scale-[0.98]">
           {/* Google SVG */}
           <span className="text-xs font-semibold">Google</span>
        </button>
        <button className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors active:scale-[0.98]">
           {/* Facebook SVG */}
           <span className="text-xs font-semibold">Facebook</span>
        </button>
      </div>
      
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
