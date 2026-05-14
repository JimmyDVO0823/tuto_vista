import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../../../lib/api';
import { useAuth } from '../../../../context/AuthContext';

const RegisterForm = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rol: 'estudiante' // Por defecto
  });
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
      const response = await api.post('/auth/register', {
        nombreCompleto: formData.name,
        correo: formData.email,
        password: formData.password,
        rol: formData.rol
      });

      // Guardar sesión en el contexto
      login(response, response.token);

      navigate('/'); // Redirigir a la home tras registrarse
    } catch (err) {
      setError(err.message || 'Error al crear la cuenta');
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

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-xs font-bold border border-red-100">
          {error}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant" htmlFor="reg-name">
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
          <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant" htmlFor="reg-email">
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
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant" htmlFor="reg-password">
              Contraseña
            </label>
            <input
              className="w-full px-4 py-3 bg-[#f7f9fb] border-none focus:ring-2 focus:ring-[#002045]/20 rounded-md placeholder:text-outline-variant/60 text-sm transition-all"
              id="reg-password"
              name="password"
              placeholder="••••••••"
              required
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Rol Académico
            </label>
            <select 
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#f7f9fb] border-none focus:ring-2 focus:ring-[#002045]/20 rounded-md text-sm transition-all appearance-none cursor-pointer"
            >
              <option value="estudiante">Estudiante</option>
              <option value="tutor">Tutor Académico</option>
            </select>
          </div>
        </div>
        <button
          className={`w-full py-4 signature-gradient text-white font-bold rounded-md active:scale-[0.98] transition-transform shadow-lg shadow-[#002045]/10 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          type="submit"
          disabled={loading}
        >
          {loading ? 'Creando cuenta...' : 'Crear mi Cuenta'}
        </button>
      </form>
      {/* ... footer ... */}
      <div className="text-center pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-500">
          ¿No tienes una cuenta?{" "}
          <Link to="/loginform" className="text-[#002045] font-bold hover:underline">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
