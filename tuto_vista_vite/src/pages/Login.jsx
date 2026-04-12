<>
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>Acceso | The Academic Editorial</title>
  <link
    href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
    rel="stylesheet"
  />
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n        .material-symbols-outlined {\n            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;\n        }\n        .signature-gradient {\n            background: linear-gradient(135deg, #002045 0%, #1a365d 100%);\n        }\n    "
    }}
  />
  <header className="sticky top-0 z-50 bg-[#f7f9fb]/80 backdrop-blur-md shadow-sm">
    <div className="flex justify-between items-center w-full px-8 py-4 max-w-full mx-auto">
      <div className="text-xl font-bold tracking-tight text-[#002045]">
        The Academic Editorial
      </div>
      <nav className="hidden md:flex items-center space-x-8">
        <a
          className="text-[#191c1e]/60 hover:text-[#002045] transition-colors"
          href="#"
        >
          Find Tutors
        </a>
        <a
          className="text-[#191c1e]/60 hover:text-[#002045] transition-colors"
          href="#"
        >
          Library
        </a>
        <a
          className="text-[#191c1e]/60 hover:text-[#002045] transition-colors"
          href="#"
        >
          Resources
        </a>
      </nav>
      <div className="flex items-center gap-4">
        <button className="text-[#002045] font-semibold text-sm hover:opacity-80 active:scale-95 transition-transform">
          Apply to Tutor
        </button>
      </div>
    </div>
  </header>
  <main className="flex-grow flex items-center justify-center px-4 py-12">
    <div className="w-full max-w-[1000px] grid md:grid-cols-2 bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-outline-variant/10">
      <div className="hidden md:block relative p-12 signature-gradient text-white overflow-hidden">
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <span className="label-md uppercase tracking-[0.1em] text-on-primary-container/80 font-bold mb-4 block">
              Bienvenido
            </span>
            <h1 className="font-headline text-4xl font-bold leading-tight mb-6">
              Excelencia Académica a tu alcance.
            </h1>
            <p className="text-on-primary-container leading-relaxed max-w-sm">
              Únete a nuestra comunidad de académicos y profesionales
              comprometidos con el aprendizaje profundo y la redacción editorial
              de alto nivel.
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-fixed/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-tertiary-fixed">
                  school
                </span>
              </div>
              <span className="text-sm font-medium">
                Acceso a tutores certificados
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-fixed/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-tertiary-fixed">
                  library_books
                </span>
              </div>
              <span className="text-sm font-medium">
                Recursos editoriales exclusivos
              </span>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-tertiary-container/10 rounded-full blur-3xl" />
        <img
          alt="Estudiantes en biblioteca"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
          data-alt="Modern academic library interior with soft morning sunlight streaming through tall windows and minimalist study desks"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAa_VRdxbhVbhdP-JQ-r_6vyxxvhVEFB1-OwF4AwqUA82A0HmLDk32062fbMQd9ik0U3w9EriwuCBWhSkLEwEB5ss9nLwrxU-FV81k8_6-5wzsEe-e1TEvN4MmBbffQkEdI6obqQpxiJq6bGLu273jvmm4r_ajllXwRPDQdtYzw34DoV-3Cy0d8M1BEgLDkeiAabXU1xFbjo7FPGf4RiCcS44TV373zgaS9v9RCcka2J4khBtPOfWLC9uZpqn-I6K8jzGqS60QbyKku"
        />
      </div>
      <div className="p-8 md:p-12 bg-white">
        <div className="mb-8">
          <div className="flex gap-1 bg-surface-container-low p-1 rounded-md mb-8">
            <button className="flex-1 py-2 text-sm font-bold bg-white text-primary rounded shadow-sm">
              Iniciar Sesión
            </button>
            <button className="flex-1 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-container transition-colors rounded">
              Registrarse
            </button>
          </div>
        </div>
        <div className="space-y-6" id="login-form">
          <div className="space-y-2">
            <h2 className="font-headline text-2xl font-bold text-primary">
              Inicia Sesión
            </h2>
            <p className="text-on-surface-variant text-sm">
              Ingresa tus credenciales para continuar con tus estudios.
            </p>
          </div>
          <form className="space-y-4">
            <div className="space-y-1">
              <label
                className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant"
                htmlFor="email"
              >
                Correo Electrónico
              </label>
              <input
                className="w-full px-4 py-3 bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 rounded-md placeholder:text-outline-variant/60 text-sm transition-all"
                id="email"
                name="email"
                placeholder="ejemplo@academia.com"
                required=""
                type="email"
              />
              <span className="hidden text-error text-[10px] font-medium mt-1 italic">
                Por favor, ingresa un correo válido.
              </span>
            </div>
            <div className="space-y-1">
              <label
                className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant"
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                className="w-full px-4 py-3 bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 rounded-md placeholder:text-outline-variant/60 text-sm transition-all"
                id="password"
                name="password"
                placeholder="••••••••"
                required=""
                type="password"
              />
            </div>
            <div className="flex items-center justify-between py-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary/20 cursor-pointer"
                  type="checkbox"
                />
                <span className="text-xs text-on-surface-variant group-hover:text-on-surface transition-colors">
                  Recordarme
                </span>
              </label>
              <a
                className="text-xs font-bold text-primary hover:underline decoration-tertiary-container decoration-2 underline-offset-4 transition-all"
                href="#"
              >
                Olvidé mi contraseña
              </a>
            </div>
            <button
              className="w-full py-4 signature-gradient text-white font-bold rounded-md active:scale-[0.98] transition-transform shadow-lg shadow-primary/10"
              type="submit"
            >
              Acceder al Portal
            </button>
          </form>
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/20" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest bg-white px-4 text-outline-variant font-medium">
              O continúa con
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 bg-white border border-outline-variant/30 rounded-md hover:bg-surface-container-low transition-colors active:scale-[0.98]">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="currentColor"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="currentColor"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="currentColor"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="currentColor"
                />
              </svg>
              <span className="text-xs font-semibold">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 bg-white border border-outline-variant/30 rounded-md hover:bg-surface-container-low transition-colors active:scale-[0.98]">
              <svg className="w-5 h-5 text-[#1877F2]" viewBox="0 0 24 24">
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  fill="currentColor"
                />
              </svg>
              <span className="text-xs font-semibold">Facebook</span>
            </button>
          </div>
        </div>
        <div className="hidden space-y-6" id="register-form">
          <div className="space-y-2">
            <h2 className="font-headline text-2xl font-bold text-primary">
              Crea tu Cuenta
            </h2>
            <p className="text-on-surface-variant text-sm">
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
                className="w-full px-4 py-3 bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 rounded-md placeholder:text-outline-variant/60 text-sm transition-all"
                id="reg-name"
                name="name"
                placeholder="Juan Pérez"
                required=""
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
                className="w-full px-4 py-3 bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 rounded-md placeholder:text-outline-variant/60 text-sm transition-all"
                id="reg-email"
                name="email"
                placeholder="juan@academia.com"
                required=""
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
                  className="w-full px-4 py-3 bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 rounded-md placeholder:text-outline-variant/60 text-sm transition-all"
                  id="reg-password"
                  name="password"
                  placeholder="••••••••"
                  required=""
                  type="password"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Rol Académico
                </label>
                <select className="w-full px-4 py-3 bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 rounded-md text-sm transition-all appearance-none cursor-pointer">
                  <option value="student">Estudiante</option>
                  <option value="tutor">Tutor Académico</option>
                </select>
              </div>
            </div>
            <div className="py-2">
              <p className="text-[10px] text-on-surface-variant leading-relaxed">
                Al registrarte, aceptas nuestros{" "}
                <a className="text-primary font-bold hover:underline" href="#">
                  Términos de Servicio
                </a>{" "}
                y{" "}
                <a className="text-primary font-bold hover:underline" href="#">
                  Política de Privacidad
                </a>
                .
              </p>
            </div>
            <button
              className="w-full py-4 signature-gradient text-white font-bold rounded-md active:scale-[0.98] transition-transform shadow-lg shadow-primary/10"
              type="submit"
            >
              Crear mi Cuenta
            </button>
          </form>
        </div>
      </div>
    </div>
  </main>
  <footer className="bg-[#f7f9fb] border-t border-[#e6e8ea]/20">
    <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-[0.75rem] uppercase tracking-[0.05em] font-medium text-gray-500 order-2 md:order-1">
        © 2024 The Academic Editorial. All rights reserved.
      </div>
      <div className="flex gap-8 order-1 md:order-2">
        <a
          className="text-[0.75rem] uppercase tracking-[0.05em] font-medium text-gray-500 hover:text-[#002045] transition-colors"
          href="#"
        >
          Privacy Policy
        </a>
        <a
          className="text-[0.75rem] uppercase tracking-[0.05em] font-medium text-gray-500 hover:text-[#002045] transition-colors"
          href="#"
        >
          Terms of Service
        </a>
        <a
          className="text-[0.75rem] uppercase tracking-[0.05em] font-medium text-gray-500 hover:text-[#002045] transition-colors"
          href="#"
        >
          Accessibility
        </a>
        <a
          className="text-[0.75rem] uppercase tracking-[0.05em] font-medium text-gray-500 hover:text-[#002045] transition-colors"
          href="#"
        >
          Contact
        </a>
      </div>
    </div>
  </footer>
</>
