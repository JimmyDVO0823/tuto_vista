<>
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <link href="https://fonts.googleapis.com" rel="preconnect" />
  <link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@400;500;700;800&display=swap"
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
        "\n        .material-symbols-outlined {\n            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;\n        }\n        body { font-family: 'Inter', sans-serif; }\n        h1, h2, h3 { font-family: 'Manrope', sans-serif; }\n    "
    }}
  />
  {/* SideNavBar (Authority: JSON Mapping) */}
  <aside className="bg-[#f2f4f6] dark:bg-[#1c1c1c] text-[#002045] dark:text-[#f2f4f6] h-screen w-64 fixed left-0 top-0 flex flex-col py-8 z-40">
    <div className="px-8 mb-12">
      <h1 className="text-lg font-black tracking-widest uppercase">
        THE ACADEMIC EDITORIAL
      </h1>
    </div>
    <div className="px-6 mb-8 flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden">
        <img
          className="w-full h-full object-cover"
          data-alt="Close up portrait of a professional academic administrator in a modern office setting, soft cinematic lighting"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrSP4LGMJdHLIyWQ4pPZ1nVGJz7eLVKZNqyjGS1aDSOAMxgyb3fhylS5g9tS7MtJoY2_5fIKd3RLd2f8TWyXX4SPsMFdYwSxupFvrMvNdsqDy2CkJlMAP5kgvGVI6oxKCFdTP3rm2L9CvhF2sOiUccjpindQmK32vAx-eaWlG7Q2vrsgTpXSrgPskPiSXMyZ9uwxxVh5QiIOFMEoBwrI05Sanx9cNlfWTH-Jw1m4JyvHTdHovswQBb5envoc_bsvKcto9xbHdDmmP5"
        />
      </div>
      <div>
        <p className="text-sm font-bold">Julian Reed</p>
        <p className="text-[0.65rem] uppercase tracking-wider opacity-60">
          Honors Scholar
        </p>
      </div>
    </div>
    <nav className="flex-1 space-y-1">
      <a
        className="flex items-center gap-3 text-[#191c1e]/70 dark:text-gray-400 px-8 py-3 hover:bg-[#e6e8ea] dark:hover:bg-[#333] transition-all"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="dashboard">
          dashboard
        </span>
        <span className="font-medium">Dashboard</span>
      </a>
      <a
        className="flex items-center gap-3 text-[#191c1e]/70 dark:text-gray-400 px-8 py-3 hover:bg-[#e6e8ea] dark:hover:bg-[#333] transition-all"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="calendar_today">
          calendar_today
        </span>
        <span className="font-medium">My Sessions</span>
      </a>
      <a
        className="flex items-center gap-3 text-[#191c1e]/70 dark:text-gray-400 px-8 py-3 hover:bg-[#e6e8ea] dark:hover:bg-[#333] transition-all"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="menu_book">
          menu_book
        </span>
        <span className="font-medium">Assignments</span>
      </a>
      <a
        className="flex items-center gap-3 text-[#191c1e]/70 dark:text-gray-400 px-8 py-3 hover:bg-[#e6e8ea] dark:hover:bg-[#333] transition-all"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="mail">
          mail
        </span>
        <span className="font-medium">Messages</span>
      </a>
      <a
        className="flex items-center gap-3 bg-white dark:bg-[#2c2c2c] text-[#002045] dark:text-[#cba72f] font-semibold rounded-l-full ml-4 pl-4 py-3 scale 0.98 transform"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="settings">
          settings
        </span>
        <span className="font-medium">Settings</span>
      </a>
    </nav>
    <div className="px-6 mt-6">
      <button className="w-full bg-primary-container text-on-primary-container py-3 rounded-md text-sm font-bold shadow-sm hover:scale-[0.98] transition-transform flex items-center justify-center gap-2">
        <span className="material-symbols-outlined text-sm">add_circle</span>
        Book New Session
      </button>
    </div>
    <div className="mt-auto border-t border-outline-variant/10 pt-4">
      <a
        className="flex items-center gap-3 text-[#191c1e]/70 dark:text-gray-400 px-8 py-3 hover:bg-[#e6e8ea] transition-all"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="help">
          help
        </span>
        <span className="font-medium">Support</span>
      </a>
      <a
        className="flex items-center gap-3 text-[#191c1e]/70 dark:text-gray-400 px-8 py-3 hover:bg-[#e6e8ea] transition-all"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="logout">
          logout
        </span>
        <span className="font-medium">Logout</span>
      </a>
    </div>
  </aside>
  {/* Main Content Canvas */}
  <main className="ml-64 flex-1 flex flex-col min-h-screen">
    {/* TopAppBar (Authority: JSON Mapping) */}
    <header className="bg-[#f7f9fb]/80 dark:bg-[#191c1e]/80 backdrop-blur-md text-[#002045] dark:text-[#f2f4f6] docked full-width top-0 sticky z-50 shadow-sm dark:shadow-none flex justify-between items-center w-full px-8 py-4 max-w-full mx-auto">
      <div className="flex items-center gap-8">
        <span className="text-xl font-bold tracking-tight text-[#002045] dark:text-[#f7f9fb]">
          Administración de Usuarios
        </span>
        <div className="hidden md:flex gap-6">
          <a
            className="text-[#191c1e]/60 dark:text-[#f7f9fb]/60 hover:text-[#002045] transition-colors text-sm font-medium"
            href="#"
          >
            Find Tutors
          </a>
          <a
            className="text-[#191c1e]/60 dark:text-[#f7f9fb]/60 hover:text-[#002045] transition-colors text-sm font-medium"
            href="#"
          >
            Library
          </a>
          <a
            className="text-[#191c1e]/60 dark:text-[#f7f9fb]/60 hover:text-[#002045] transition-colors text-sm font-medium"
            href="#"
          >
            Resources
          </a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
            search
          </span>
          <input
            className="pl-10 pr-4 py-2 bg-surface-container-low rounded-md border-none focus:ring-2 focus:ring-primary text-sm w-64 transition-all focus:w-80"
            placeholder="Buscar por nombre o correo..."
            type="text"
          />
        </div>
        <button className="text-sm font-bold bg-primary text-white px-6 py-2 rounded-md hover:scale-[0.98] transition-transform">
          Apply to Tutor
        </button>
      </div>
    </header>
    <section className="p-8 space-y-8 flex-1">
      {/* Header Editorial Style */}
      <div className="flex justify-between items-end">
        <div className="max-w-2xl">
          <p className="text-[0.75rem] uppercase tracking-[0.05em] font-medium text-tertiary mb-2">
            Panel de Control
          </p>
          <h2 className="text-4xl font-extrabold text-primary leading-tight">
            Gestión del <br />
            Ecosistema Educativo
          </h2>
        </div>
        <div className="flex gap-3">
          <div className="bg-surface-container-low p-1 rounded-md flex">
            <button className="px-4 py-1.5 bg-white shadow-sm rounded text-xs font-bold text-primary">
              Todos
            </button>
            <button className="px-4 py-1.5 hover:bg-surface-container-high rounded text-xs font-medium text-on-surface-variant">
              Estudiantes
            </button>
            <button className="px-4 py-1.5 hover:bg-surface-container-high rounded text-xs font-medium text-on-surface-variant">
              Tutores
            </button>
          </div>
        </div>
      </div>
      {/* Bento Stats Grid (Custom Academic Component) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-lg shadow-[8px_8px_40px_rgba(25,28,30,0.04)] border border-outline-variant/10">
          <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant opacity-60 mb-2">
            Total Usuarios
          </p>
          <p className="text-3xl font-black text-primary">2,842</p>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-lg shadow-[8px_8px_40px_rgba(25,28,30,0.04)] border border-outline-variant/10">
          <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant opacity-60 mb-2">
            Tutores Activos
          </p>
          <p className="text-3xl font-black text-primary">158</p>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-lg shadow-[8px_8px_40px_rgba(25,28,30,0.04)] border border-outline-variant/10">
          <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant opacity-60 mb-2">
            Nuevas Solicitudes
          </p>
          <p className="text-3xl font-black text-tertiary">12</p>
        </div>
        <div className="bg-primary p-6 rounded-lg shadow-lg relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2">
              Tasa de Retención
            </p>
            <p className="text-3xl font-black text-white">94.2%</p>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
            <span
              className="material-symbols-outlined text-8xl"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              insights
            </span>
          </div>
        </div>
      </div>
      {/* Main Data Table Container */}
      <div className="bg-surface-container-lowest rounded-lg shadow-[8px_8px_40px_rgba(25,28,30,0.04)] overflow-hidden">
        <div className="p-6 flex items-center justify-between border-b border-outline-variant/10">
          <h3 className="text-lg font-bold text-primary">
            Directorio Académico
          </h3>
          <div className="flex items-center gap-4">
            <select className="bg-surface-container-low border-none text-xs font-semibold rounded-md py-2 px-4 focus:ring-primary cursor-pointer">
              <option>Estado: Todos</option>
              <option>Activos</option>
              <option>Bloqueados</option>
            </select>
            <button className="flex items-center gap-2 bg-tertiary-container text-on-tertiary-container px-4 py-2 rounded-md text-xs font-bold hover:scale-[0.98] transition-transform">
              <span className="material-symbols-outlined text-sm">
                download
              </span>
              Exportar CSV
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-high">
              <tr>
                <th className="px-6 py-4 text-[0.65rem] uppercase tracking-widest font-bold text-on-surface-variant">
                  ID
                </th>
                <th className="px-6 py-4 text-[0.65rem] uppercase tracking-widest font-bold text-on-surface-variant">
                  Usuario
                </th>
                <th className="px-6 py-4 text-[0.65rem] uppercase tracking-widest font-bold text-on-surface-variant">
                  Rol
                </th>
                <th className="px-6 py-4 text-[0.65rem] uppercase tracking-widest font-bold text-on-surface-variant">
                  Estado
                </th>
                <th className="px-6 py-4 text-[0.65rem] uppercase tracking-widest font-bold text-on-surface-variant text-right">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {/* Row 1 */}
              <tr className="hover:bg-secondary-fixed-dim/20 transition-colors group">
                <td className="px-6 py-4 text-sm font-mono text-on-surface-variant">
                  #AE-2091
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold">
                      EM
                    </div>
                    <div>
                      <p className="text-sm font-bold text-primary">
                        Elena Martínez
                      </p>
                      <p className="text-xs text-on-surface-variant opacity-60">
                        elena.mtz@editorial.edu
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-surface-container-low rounded-full text-[10px] font-bold uppercase text-primary">
                    Tutor
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-xs font-medium text-on-surface-variant">
                      Activo
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="p-2 hover:bg-surface-container-high rounded-full text-on-surface-variant"
                      title="Cambiar Contraseña"
                    >
                      <span className="material-symbols-outlined text-lg">
                        lock_reset
                      </span>
                    </button>
                    <button
                      className="p-2 hover:bg-error-container hover:text-error rounded-full text-on-surface-variant"
                      title="Bloquear Usuario"
                    >
                      <span className="material-symbols-outlined text-lg">
                        block
                      </span>
                    </button>
                    <button
                      className="p-2 hover:bg-error-container hover:text-error rounded-full text-on-surface-variant"
                      title="Eliminar"
                    >
                      <span className="material-symbols-outlined text-lg">
                        delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="bg-surface-container-low/30 hover:bg-secondary-fixed-dim/20 transition-colors group">
                <td className="px-6 py-4 text-sm font-mono text-on-surface-variant">
                  #AE-2092
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary font-bold">
                      CR
                    </div>
                    <div>
                      <p className="text-sm font-bold text-primary">
                        Carlos Ruiz
                      </p>
                      <p className="text-xs text-on-surface-variant opacity-60">
                        c.ruiz98@campus.com
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-surface-container-low rounded-full text-[10px] font-bold uppercase text-on-surface-variant">
                    Estudiante
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-error" />
                    <span className="text-xs font-medium text-on-surface-variant">
                      Bloqueado
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="p-2 hover:bg-surface-container-high rounded-full text-on-surface-variant"
                      title="Cambiar Contraseña"
                    >
                      <span className="material-symbols-outlined text-lg">
                        lock_reset
                      </span>
                    </button>
                    <button
                      className="p-2 hover:bg-primary-container hover:text-primary-fixed rounded-full text-on-surface-variant"
                      title="Desbloquear"
                    >
                      <span
                        className="material-symbols-outlined text-lg"
                        style={{ fontVariationSettings: '"FILL" 1' }}
                      >
                        check_circle
                      </span>
                    </button>
                    <button
                      className="p-2 hover:bg-error-container hover:text-error rounded-full text-on-surface-variant"
                      title="Eliminar"
                    >
                      <span className="material-symbols-outlined text-lg">
                        delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="hover:bg-secondary-fixed-dim/20 transition-colors group">
                <td className="px-6 py-4 text-sm font-mono text-on-surface-variant">
                  #AE-2095
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary font-bold">
                      SA
                    </div>
                    <div>
                      <p className="text-sm font-bold text-primary">
                        Sofía Alarcón
                      </p>
                      <p className="text-xs text-on-surface-variant opacity-60">
                        sofia.tutora@editorial.edu
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-surface-container-low rounded-full text-[10px] font-bold uppercase text-primary">
                    Tutor
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-xs font-medium text-on-surface-variant">
                      Activo
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="p-2 hover:bg-surface-container-high rounded-full text-on-surface-variant"
                      title="Cambiar Contraseña"
                    >
                      <span className="material-symbols-outlined text-lg">
                        lock_reset
                      </span>
                    </button>
                    <button
                      className="p-2 hover:bg-error-container hover:text-error rounded-full text-on-surface-variant"
                      title="Bloquear Usuario"
                    >
                      <span className="material-symbols-outlined text-lg">
                        block
                      </span>
                    </button>
                    <button
                      className="p-2 hover:bg-error-container hover:text-error rounded-full text-on-surface-variant"
                      title="Eliminar"
                    >
                      <span className="material-symbols-outlined text-lg">
                        delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
              {/* Row 4 */}
              <tr className="bg-surface-container-low/30 hover:bg-secondary-fixed-dim/20 transition-colors group">
                <td className="px-6 py-4 text-sm font-mono text-on-surface-variant">
                  #AE-2101
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-outline-variant flex items-center justify-center text-on-surface font-bold">
                      JP
                    </div>
                    <div>
                      <p className="text-sm font-bold text-primary">
                        Juan Pérez
                      </p>
                      <p className="text-xs text-on-surface-variant opacity-60">
                        j.perez@estudiante.es
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-surface-container-low rounded-full text-[10px] font-bold uppercase text-on-surface-variant">
                    Estudiante
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-xs font-medium text-on-surface-variant">
                      Activo
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="p-2 hover:bg-surface-container-high rounded-full text-on-surface-variant"
                      title="Cambiar Contraseña"
                    >
                      <span className="material-symbols-outlined text-lg">
                        lock_reset
                      </span>
                    </button>
                    <button
                      className="p-2 hover:bg-error-container hover:text-error rounded-full text-on-surface-variant"
                      title="Bloquear Usuario"
                    >
                      <span className="material-symbols-outlined text-lg">
                        block
                      </span>
                    </button>
                    <button
                      className="p-2 hover:bg-error-container hover:text-error rounded-full text-on-surface-variant"
                      title="Eliminar"
                    >
                      <span className="material-symbols-outlined text-lg">
                        delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Table Pagination */}
        <div className="p-6 bg-surface-container-low border-t border-outline-variant/10 flex items-center justify-between">
          <p className="text-xs font-medium text-on-surface-variant opacity-60">
            Mostrando 1 a 10 de 2,842 usuarios
          </p>
          <div className="flex items-center gap-2">
            <button
              className="p-2 hover:bg-surface-container-high rounded-md disabled:opacity-30"
              disabled=""
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded text-xs font-bold">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-surface-container-high rounded text-xs font-medium">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-surface-container-high rounded text-xs font-medium">
              3
            </button>
            <span className="px-2 opacity-40">...</span>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-surface-container-high rounded text-xs font-medium">
              285
            </button>
            <button className="p-2 hover:bg-surface-container-high rounded-md">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </section>
    {/* Footer (Authority: JSON Mapping) */}
    <footer className="bg-[#f7f9fb] dark:bg-[#191c1e] w-full py-12 border-t border-[#e6e8ea]/20">
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <p className="text-[0.75rem] uppercase tracking-[0.05em] font-medium Inter text-gray-500">
          © 2024 The Academic Editorial. All rights reserved.
        </p>
        <div className="flex gap-8">
          <a
            className="text-[0.75rem] uppercase tracking-[0.05em] font-medium Inter text-gray-500 hover:text-[#002045] transition-colors"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="text-[0.75rem] uppercase tracking-[0.05em] font-medium Inter text-gray-500 hover:text-[#002045] transition-colors"
            href="#"
          >
            Terms of Service
          </a>
          <a
            className="text-[0.75rem] uppercase tracking-[0.05em] font-medium Inter text-gray-500 hover:text-[#002045] transition-colors"
            href="#"
          >
            Accessibility
          </a>
          <a
            className="text-[0.75rem] uppercase tracking-[0.05em] font-medium Inter text-gray-500 hover:text-[#002045] transition-colors"
            href="#"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  </main>
</>
