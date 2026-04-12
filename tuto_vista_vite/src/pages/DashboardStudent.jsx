<>
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
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
        "\n        .material-symbols-outlined {\n            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;\n        }\n        body {\n            font-family: 'Inter', sans-serif;\n            background-color: #f7f9fb;\n        }\n        h1, h2, h3, h4 {\n            font-family: 'Manrope', sans-serif;\n        }\n        .signature-gradient {\n            background: linear-gradient(135deg, #002045 0%, #1a365d 100%);\n        }\n    "
    }}
  />
  {/* SideNavBar (Authority: JSON & Design System) */}
  <nav className="h-screen w-64 fixed left-0 top-0 bg-[#f2f4f6] dark:bg-[#1c1c1c] flex flex-col py-8 z-40">
    <div className="px-8 mb-10">
      <span className="text-lg font-black tracking-widest uppercase text-[#002045] dark:text-[#f2f4f6]">
        THE ACADEMIC
      </span>
    </div>
    <div className="px-8 mb-8 flex items-center gap-3">
      <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high">
        <img
          alt="Julian Reed"
          data-alt="Candid portrait of a young male student in a library with glasses and a soft smile, natural warm lighting"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZOpt5w551XHfqYULnJTuGEpt5A5sQfS-rGYKJ8RDVypF4--j8zvRx_kCajeOtRLIRKsdAbkuPrKdk5ydD3xJddzS9imHE2c3kiFVHhtq30GBs7Uls7KcLTJIlMYLsJSNMlU3NIFdEPo4kbdl4YNcs6bTNdMjsPbKSZmBh_hfqoW21-1cy7-5EDrugAATFLZUnVBX_3-8198vMuOkVcHWkXn9UnbH80JaimlyeFq9dHs-XkAl9UuidVl9bOgJyvB6hsxkovmP3Zx-s"
        />
      </div>
      <div>
        <p className="text-sm font-bold text-[#002045] dark:text-[#f2f4f6]">
          Julian Reed
        </p>
        <p className="text-[10px] uppercase tracking-wider text-[#191c1e]/60">
          Honors Scholar
        </p>
      </div>
    </div>
    <div className="flex-1 flex flex-col gap-1">
      {/* Active: Dashboard */}
      <a
        className="bg-white dark:bg-[#2c2c2c] text-[#002045] dark:text-[#cba72f] font-semibold rounded-l-full ml-4 pl-4 py-3 flex items-center gap-3 scale 0.98 transform transition-all"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="dashboard">
          dashboard
        </span>
        <span>Dashboard</span>
      </a>
      <a
        className="text-[#191c1e]/70 dark:text-gray-400 px-8 py-3 flex items-center gap-3 hover:bg-[#e6e8ea] dark:hover:bg-[#333] transition-all"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="calendar_today">
          calendar_today
        </span>
        <span>My Sessions</span>
      </a>
      <a
        className="text-[#191c1e]/70 dark:text-gray-400 px-8 py-3 flex items-center gap-3 hover:bg-[#e6e8ea] dark:hover:bg-[#333] transition-all"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="menu_book">
          menu_book
        </span>
        <span>Assignments</span>
      </a>
      <a
        className="text-[#191c1e]/70 dark:text-gray-400 px-8 py-3 flex items-center gap-3 hover:bg-[#e6e8ea] dark:hover:bg-[#333] transition-all"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="mail">
          mail
        </span>
        <span>Messages</span>
      </a>
      <a
        className="text-[#191c1e]/70 dark:text-gray-400 px-8 py-3 flex items-center gap-3 hover:bg-[#e6e8ea] dark:hover:bg-[#333] transition-all"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="settings">
          settings
        </span>
        <span>Settings</span>
      </a>
    </div>
    <div className="px-8 mt-auto flex flex-col gap-4">
      <button className="bg-[#cba72f] text-[#002045] font-bold py-3 px-4 rounded-md text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
        <span
          className="material-symbols-outlined"
          style={{ fontVariationSettings: '"FILL" 1' }}
        >
          add_circle
        </span>
        Book New Session
      </button>
      <div className="flex flex-col gap-1 border-t border-black/5 pt-4">
        <a
          className="text-xs text-gray-500 hover:text-primary flex items-center gap-2 px-2 py-1 transition-colors"
          href="#"
        >
          <span className="material-symbols-outlined text-sm" data-icon="help">
            help
          </span>
          Support
        </a>
        <a
          className="text-xs text-gray-500 hover:text-error flex items-center gap-2 px-2 py-1 transition-colors"
          href="#"
        >
          <span
            className="material-symbols-outlined text-sm"
            data-icon="logout"
          >
            logout
          </span>
          Logout
        </a>
      </div>
    </div>
  </nav>
  {/* Main Content Area */}
  <main className="ml-64 min-h-screen">
    {/* TopNavBar (Authority: JSON & Design System) */}
    <header className="bg-[#f7f9fb]/80 dark:bg-[#191c1e]/80 backdrop-blur-md sticky top-0 z-50 shadow-sm dark:shadow-none">
      <div className="flex justify-between items-center w-full px-8 py-4 max-w-full mx-auto">
        <div className="flex items-center gap-8 flex-1">
          <div className="relative w-full max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50">
              search
            </span>
            <input
              className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="Buscar tutorías, recursos o tareas..."
              type="text"
            />
          </div>
          <nav className="hidden md:flex gap-6 items-center">
            <a
              className="text-[#002045] dark:text-white font-bold border-b-2 border-[#002045] dark:border-[#f2f4f6] pb-1 transition-colors"
              href="#"
            >
              Find Tutors
            </a>
            <a
              className="text-[#191c1e]/60 dark:text-[#f7f9fb]/60 hover:text-[#002045] dark:hover:text-white transition-colors"
              href="#"
            >
              Library
            </a>
            <a
              className="text-[#191c1e]/60 dark:text-[#f7f9fb]/60 hover:text-[#002045] dark:hover:text-white transition-colors"
              href="#"
            >
              Resources
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors">
            notifications
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/20">
            <img
              alt="User profile"
              data-alt="User profile avatar of Julian Reed, sharp focus, professional lighting"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrX3MgmjX7nnU8SlNIBtb9ZbSbbTxbHxvmJJYG2WO12XYw9itxmqCFFjIQFVSSzFgdAWJf_B603GZo4N22Gd5wph5dzYuI3NNB6c1OO1H-xD4Hs9GvhMysFCtLxu6yc6ycWSNxgiHf35P8Uojcx_rJLeKsmuS7AkUEj_VrvzUkqxdG28G1EP4Ceu4PDdS6IElKBpvaC-58mLioExT7LfxrEW2sRjL-Uo6CIQXS7nMlhkBpQxBA-kFh9PeJUVv-esroLOUkBz8PeFyo"
            />
          </div>
        </div>
      </div>
    </header>
    {/* Dashboard Canvas */}
    <div className="p-10 max-w-7xl mx-auto">
      {/* Hero Heading with Intentional Asymmetry */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.1em] text-tertiary mb-2">
            Resumen Académico
          </p>
          <h1 className="text-5xl font-extrabold tracking-tight text-primary leading-tight">
            Bienvenido de nuevo,{" "}
            <span className="text-primary-container/60">Julian.</span>
          </h1>
          <p className="mt-4 text-on-surface-variant max-w-lg">
            Has completado el 85% de tus objetivos semanales. Tus próximas 48
            horas están dedicadas a la investigación avanzada.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-3xl font-bold text-primary">12</p>
            <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">
              Horas este mes
            </p>
          </div>
          <div className="w-px h-10 bg-outline-variant/30 self-center" />
          <div className="text-right">
            <p className="text-3xl font-bold text-primary">4.9</p>
            <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">
              Promedio GPA
            </p>
          </div>
        </div>
      </div>
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Main Content: Próximas Tutorías (Span 8) */}
        <section className="md:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-primary">
              Próximas Tutorías
            </h2>
            <a
              className="text-sm font-bold text-primary flex items-center gap-1 hover:underline"
              href="#"
            >
              Ver todo el calendario
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </a>
          </div>
          <div className="space-y-4">
            {/* Tutorial Card 1 */}
            <div className="bg-surface-container-lowest p-8 rounded-lg flex items-center gap-6 group transition-all hover:translate-x-2">
              <div className="w-16 h-16 rounded-xl bg-surface-container-low flex flex-col items-center justify-center text-primary border border-outline-variant/10">
                <span className="text-xs font-bold uppercase">Oct</span>
                <span className="text-2xl font-extrabold">24</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-tertiary" />
                  <h3 className="text-lg font-bold text-primary">
                    Econometría Avanzada
                  </h3>
                </div>
                <div className="flex items-center gap-4 text-sm text-on-surface-variant">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">
                      person
                    </span>
                    Dr. Elena Martínez
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">
                      schedule
                    </span>
                    14:00 - 15:30
                  </span>
                </div>
              </div>
              <a
                className="signature-gradient text-white px-6 py-3 rounded-md font-bold text-sm flex items-center gap-2 transition-transform active:scale-95"
                href="#"
              >
                Unirse a sesión
                <span className="material-symbols-outlined text-sm">
                  video_chat
                </span>
              </a>
            </div>
            {/* Tutorial Card 2 */}
            <div className="bg-surface-container-lowest p-8 rounded-lg flex items-center gap-6 group transition-all hover:translate-x-2">
              <div className="w-16 h-16 rounded-xl bg-surface-container-low flex flex-col items-center justify-center text-primary border border-outline-variant/10">
                <span className="text-xs font-bold uppercase">Oct</span>
                <span className="text-2xl font-extrabold">26</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  <h3 className="text-lg font-bold text-primary">
                    Escritura Académica II
                  </h3>
                </div>
                <div className="flex items-center gap-4 text-sm text-on-surface-variant">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">
                      person
                    </span>
                    Prof. Marcus Thorne
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">
                      schedule
                    </span>
                    10:00 - 11:00
                  </span>
                </div>
              </div>
              <a
                className="bg-surface-container-high text-primary px-6 py-3 rounded-md font-bold text-sm flex items-center gap-2 hover:bg-surface-variant transition-colors"
                href="#"
              >
                Detalles
                <span className="material-symbols-outlined text-sm">info</span>
              </a>
            </div>
          </div>
          {/* Resumen de Progreso (Cards) */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-surface-container-low p-8 rounded-lg overflow-hidden relative group">
              <div className="relative z-10">
                <h3 className="text-sm font-bold text-primary mb-4 uppercase tracking-widest">
                  Progreso del Semestre
                </h3>
                <div className="flex items-end justify-between">
                  <span className="text-4xl font-extrabold text-primary">
                    78%
                  </span>
                  <span className="text-xs font-bold text-tertiary flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">
                      trending_up
                    </span>
                    +5% vs mes anterior
                  </span>
                </div>
                <div className="mt-4 w-full h-1 bg-outline-variant/20 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[78%]" />
                </div>
              </div>
            </div>
            <div className="bg-primary-container p-8 rounded-lg relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">
                  Próxima Entrega
                </h3>
                <p className="text-white/80 text-sm mb-2">
                  Tesis: Capítulo 3 - Metodología
                </p>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary-container">
                    timer
                  </span>
                  <span className="text-xl font-bold text-white">
                    4 Días restantes
                  </span>
                </div>
              </div>
              {/* Decorative background shape */}
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
            </div>
          </div>
        </section>
        {/* Sidebar Content: Notificaciones Recientes (Span 4) */}
        <aside className="md:col-span-4 space-y-8">
          <div className="bg-white p-8 rounded-lg shadow-sm dark:shadow-none">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-primary">Notificaciones</h2>
              <span className="bg-error-container text-on-error-container text-[10px] font-black px-2 py-0.5 rounded-full">
                3 NUEVAS
              </span>
            </div>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="mt-1 w-8 h-8 rounded-full bg-secondary-container/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-secondary text-lg">
                    chat_bubble
                  </span>
                </div>
                <div>
                  <p className="text-sm text-on-surface leading-snug">
                    <strong>Elena Martínez</strong> ha respondido a tu pregunta
                    sobre Series de Tiempo.
                  </p>
                  <span className="text-[10px] font-medium text-on-surface-variant/60 uppercase">
                    Hace 15 min
                  </span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 w-8 h-8 rounded-full bg-tertiary-container/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-tertiary text-lg">
                    check_circle
                  </span>
                </div>
                <div>
                  <p className="text-sm text-on-surface leading-snug">
                    Tu ensayo de <strong>Microeconomía</strong> ha sido
                    calificado: <strong>A+</strong>
                  </p>
                  <span className="text-[10px] font-medium text-on-surface-variant/60 uppercase">
                    Hace 2 horas
                  </span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 w-8 h-8 rounded-full bg-error-container/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-error text-lg">
                    event_busy
                  </span>
                </div>
                <div>
                  <p className="text-sm text-on-surface leading-snug">
                    Recordatorio: La sesión de hoy con{" "}
                    <strong>Dr. Smith</strong> ha sido reprogramada.
                  </p>
                  <span className="text-[10px] font-medium text-on-surface-variant/60 uppercase">
                    Hace 5 horas
                  </span>
                </div>
              </div>
            </div>
            <button className="w-full mt-10 py-3 border border-outline-variant/30 rounded-md text-xs font-bold text-primary uppercase tracking-widest hover:bg-surface-container-low transition-colors">
              Marcar todas como leídas
            </button>
          </div>
          {/* Quick Resources Widget */}
          <div className="bg-surface-container-low p-8 rounded-lg">
            <h3 className="text-sm font-bold text-primary mb-6 uppercase tracking-widest">
              Recursos Sugeridos
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg flex items-center gap-3 hover:shadow-sm transition-all cursor-pointer">
                <span className="material-symbols-outlined text-primary">
                  description
                </span>
                <span className="text-sm font-medium">
                  Guía APA 7ma Edición
                </span>
              </div>
              <div className="p-4 bg-white rounded-lg flex items-center gap-3 hover:shadow-sm transition-all cursor-pointer">
                <span className="material-symbols-outlined text-primary">
                  calculate
                </span>
                <span className="text-sm font-medium">
                  Calculadora Stata Online
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
    {/* Footer (Authority: JSON) */}
    <footer className="bg-[#f7f9fb] dark:bg-[#191c1e] w-full py-12 border-t border-[#e6e8ea]/20 mt-12">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-[0.75rem] uppercase tracking-[0.05em] font-medium text-gray-500">
          © 2024 The Academic Editorial. All rights reserved.
        </p>
        <div className="flex gap-8">
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
  </main>
</>
