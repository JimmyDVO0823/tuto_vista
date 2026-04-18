const RegisterForm = () => {
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
      <form className="space-y-4">
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
            />
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Rol Académico
            </label>
            <select className="w-full px-4 py-3 bg-[#f7f9fb] border-none focus:ring-2 focus:ring-[#002045]/20 rounded-md text-sm transition-all appearance-none cursor-pointer">
              <option value="student">Estudiante</option>
              <option value="tutor">Tutor Académico</option>
            </select>
          </div>
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
          className="w-full py-4 signature-gradient text-white font-bold rounded-md active:scale-[0.98] transition-transform shadow-lg shadow-[#002045]/10"
          type="submit"
        >
          Crear mi Cuenta
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
