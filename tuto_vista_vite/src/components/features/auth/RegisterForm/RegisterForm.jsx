import React, { useState } from 'react';
import { supabase } from '../../../../lib/supabase';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
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
      
      setSuccess('¡Registro exitoso! Revisa tu correo electrónico para confirmar tu cuenta.');
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
            <label
              className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant"
              htmlFor="reg-confirm-password"
            >
              Confirmar Contraseña
            </label>
            <input
              className="w-full px-4 py-3 bg-[#f7f9fb] border-none focus:ring-2 focus:ring-[#002045]/20 rounded-md placeholder:text-outline-variant/60 text-sm transition-all"
              id="reg-confirm-password"
              name="confirmPassword"
              placeholder="••••••••"
              required
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
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
