<>
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>Gestión de Materias | The Academic Editorial</title>
  <link
    href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
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
        "\n      .material-symbols-outlined {\n        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;\n      }\n      .signature-gradient {\n        background: linear-gradient(135deg, #002045 0%, #1a365d 100%);\n      }\n      .custom-scrollbar::-webkit-scrollbar {\n        width: 4px;\n      }\n      .custom-scrollbar::-webkit-scrollbar-track {\n        background: transparent;\n      }\n      .custom-scrollbar::-webkit-scrollbar-thumb {\n        background: #e6e8ea;\n        border-radius: 10px;\n      }\n    "
    }}
  />
  {/* SideNavBar (Authority: JSON) */}
  <nav className="bg-[#f2f4f6] text-[#002045] h-screen w-64 fixed left-0 top-0 flex flex-col h-full py-8 z-50">
    <div className="px-8 mb-10">
      <h1 className="text-lg font-black tracking-widest uppercase font-headline">
        The Academic Editorial
      </h1>
    </div>
    <div className="px-6 mb-8 flex items-center space-x-3">
      <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high">
        <img
          alt="Student Avatar"
          className="w-full h-full object-cover"
          data-alt="Professional headshot of a mature academic male scholar with glasses in a library setting with warm lighting"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB86rTnQaBarrU0ex42U4xnK45S48Pd6QbRnWxwyMm_aoFR0fV0S6Uv898miu4fgq7VZ8c_Q1NVIetck6I9ecASYFPl5Q3FQqBOLJFRMpZMWNM18UlBDdjU4NJI1RdtlcpkaWCbZiO4e9oErBCwKf0HscFZ2pElXNGlKy__lArIR5O_97LXb4CPUFl4tCzJP5QN3WeKYcuxIKO5NO2tGtJufGufNYcoBNQv3O97TnDOMV9KYEGtKYjX8GQCy4LaxrPwOApLhd33x43e"
        />
      </div>
      <div>
        <p className="text-sm font-semibold font-headline">Julian Reed</p>
        <p className="text-[0.65rem] uppercase tracking-wider text-[#191c1e]/60">
          Honors Scholar
        </p>
      </div>
    </div>
    <div className="flex-1 space-y-1">
      <a
        className="flex items-center space-x-3 text-[#191c1e]/70 px-8 py-3 hover:bg-[#e6e8ea] transition-all"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="dashboard">
          dashboard
        </span>
        <span className="font-medium">Dashboard</span>
      </a>
      <a
        className="bg-white text-[#002045] font-semibold rounded-l-full ml-4 pl-4 py-3 flex items-center space-x-3 active:scale-98 transform transition-all"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="menu_book">
          menu_book
        </span>
        <span className="font-medium">Assignments</span>
      </a>
      <a
        className="flex items-center space-x-3 text-[#191c1e]/70 px-8 py-3 hover:bg-[#e6e8ea] transition-all"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="calendar_today">
          calendar_today
        </span>
        <span className="font-medium">My Sessions</span>
      </a>
      <a
        className="flex items-center space-x-3 text-[#191c1e]/70 px-8 py-3 hover:bg-[#e6e8ea] transition-all"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="mail">
          mail
        </span>
        <span className="font-medium">Messages</span>
      </a>
      <a
        className="flex items-center space-x-3 text-[#191c1e]/70 px-8 py-3 hover:bg-[#e6e8ea] transition-all"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="settings">
          settings
        </span>
        <span className="font-medium">Settings</span>
      </a>
    </div>
    <div className="px-6 mt-4">
      <button className="w-full py-3 bg-tertiary-container text-on-tertiary-container rounded-lg font-bold text-sm shadow-sm hover:brightness-110 transition-all flex items-center justify-center space-x-2">
        <span className="material-symbols-outlined text-sm" data-icon="add">
          add
        </span>
        <span>Book New Session</span>
      </button>
    </div>
    <div className="mt-auto pt-8 border-t border-[#e6e8ea]/50 flex flex-col space-y-1">
      <a
        className="flex items-center space-x-3 text-[#191c1e]/70 px-8 py-3 hover:bg-[#e6e8ea] transition-all"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="help">
          help
        </span>
        <span className="font-medium">Support</span>
      </a>
      <a
        className="flex items-center space-x-3 text-[#191c1e]/70 px-8 py-3 hover:bg-[#e6e8ea] transition-all"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="logout">
          logout
        </span>
        <span className="font-medium">Logout</span>
      </a>
    </div>
  </nav>
  {/* Main Content Area */}
  <main className="ml-64 min-h-screen p-12">
    {/* Header Section (Editorial Layout) */}
    <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-6 md:space-y-0">
      <div className="max-w-2xl">
        <p className="text-[0.75rem] uppercase tracking-[0.15em] font-medium text-tertiary mb-3">
          Administración del Sistema
        </p>
        <h2 className="text-5xl font-extrabold font-headline text-primary tracking-tight leading-tight">
          Gestión de <br />
          Materias Académicas
        </h2>
        <p className="mt-4 text-on-surface-variant max-w-lg leading-relaxed">
          Organice el catálogo educativo, gestione códigos curriculares y
          supervise la disponibilidad de las asignaturas por departamento.
        </p>
      </div>
      <div>
        <button className="signature-gradient text-white px-8 py-4 rounded-xl font-bold flex items-center space-x-3 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all">
          <span className="material-symbols-outlined" data-icon="add_circle">
            add_circle
          </span>
          <span>Agregar Nueva Materia</span>
        </button>
      </div>
    </header>
    {/* Search & Filter Bar (Surface Container Low) */}
    <div className="bg-surface-container-low p-2 rounded-2xl mb-8 flex flex-col md:flex-row items-center gap-4">
      <div className="relative flex-1 group">
        <span
          className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors"
          data-icon="search"
        >
          search
        </span>
        <input
          className="w-full bg-surface-container-lowest border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/10 text-sm transition-all placeholder:text-outline-variant"
          placeholder="Buscar por nombre, código o departamento..."
          type="text"
        />
      </div>
      <div className="flex items-center gap-2">
        <button className="bg-surface-container-lowest text-on-surface px-6 py-4 rounded-xl text-sm font-semibold flex items-center space-x-2 border border-outline-variant/10 hover:bg-surface-container-high transition-all">
          <span
            className="material-symbols-outlined text-lg"
            data-icon="filter_list"
          >
            filter_list
          </span>
          <span>Filtros</span>
        </button>
        <button className="bg-surface-container-lowest text-on-surface px-6 py-4 rounded-xl text-sm font-semibold flex items-center space-x-2 border border-outline-variant/10 hover:bg-surface-container-high transition-all">
          <span
            className="material-symbols-outlined text-lg"
            data-icon="download"
          >
            download
          </span>
          <span>Exportar</span>
        </button>
      </div>
    </div>
    {/* Subjects Table (Tonal Layering Principle) */}
    <section className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-high">
              <th className="px-8 py-6 text-[0.7rem] uppercase tracking-widest font-bold text-on-surface-variant">
                Código
              </th>
              <th className="px-8 py-6 text-[0.7rem] uppercase tracking-widest font-bold text-on-surface-variant">
                Nombre de Materia
              </th>
              <th className="px-8 py-6 text-[0.7rem] uppercase tracking-widest font-bold text-on-surface-variant">
                Departamento
              </th>
              <th className="px-8 py-6 text-[0.7rem] uppercase tracking-widest font-bold text-on-surface-variant">
                Estado
              </th>
              <th className="px-8 py-6 text-[0.7rem] uppercase tracking-widest font-bold text-on-surface-variant text-right">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-low">
            {/* Row 1 */}
            <tr className="group hover:bg-secondary-fixed-dim/10 transition-colors">
              <td className="px-8 py-6">
                <span className="font-mono text-xs font-bold bg-surface-container px-2 py-1 rounded">
                  MAT-101
                </span>
              </td>
              <td className="px-8 py-6">
                <div className="font-headline font-bold text-primary">
                  Cálculo Diferencial e Integral I
                </div>
                <div className="text-xs text-on-surface-variant mt-1">
                  Créditos: 4 • Semestre A
                </div>
              </td>
              <td className="px-8 py-6 text-sm text-on-surface-variant">
                Departamento de Matemáticas
              </td>
              <td className="px-8 py-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-tertiary-container/20 text-tertiary text-[0.7rem] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary mr-2" />
                  ACTIVO
                </span>
              </td>
              <td className="px-8 py-6 text-right">
                <div className="flex items-center justify-end space-x-3">
                  <button
                    className="p-2 text-outline hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                    title="Editar"
                  >
                    <span
                      className="material-symbols-outlined text-lg"
                      data-icon="edit"
                    >
                      edit
                    </span>
                  </button>
                  <button
                    className="p-2 text-outline hover:text-error hover:bg-error/5 rounded-lg transition-all"
                    title="Eliminar"
                  >
                    <span
                      className="material-symbols-outlined text-lg"
                      data-icon="delete"
                    >
                      delete
                    </span>
                  </button>
                </div>
              </td>
            </tr>
            {/* Row 2 */}
            <tr className="group hover:bg-secondary-fixed-dim/10 transition-colors">
              <td className="px-8 py-6">
                <span className="font-mono text-xs font-bold bg-surface-container px-2 py-1 rounded">
                  CS-204
                </span>
              </td>
              <td className="px-8 py-6">
                <div className="font-headline font-bold text-primary">
                  Programación Web Avanzada
                </div>
                <div className="text-xs text-on-surface-variant mt-1">
                  Créditos: 3 • Semestre B
                </div>
              </td>
              <td className="px-8 py-6 text-sm text-on-surface-variant">
                Ciencias de la Computación
              </td>
              <td className="px-8 py-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-tertiary-container/20 text-tertiary text-[0.7rem] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary mr-2" />
                  ACTIVO
                </span>
              </td>
              <td className="px-8 py-6 text-right">
                <div className="flex items-center justify-end space-x-3">
                  <button
                    className="p-2 text-outline hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                    title="Editar"
                  >
                    <span
                      className="material-symbols-outlined text-lg"
                      data-icon="edit"
                    >
                      edit
                    </span>
                  </button>
                  <button
                    className="p-2 text-outline hover:text-error hover:bg-error/5 rounded-lg transition-all"
                    title="Eliminar"
                  >
                    <span
                      className="material-symbols-outlined text-lg"
                      data-icon="delete"
                    >
                      delete
                    </span>
                  </button>
                </div>
              </td>
            </tr>
            {/* Row 3 */}
            <tr className="group hover:bg-secondary-fixed-dim/10 transition-colors">
              <td className="px-8 py-6">
                <span className="font-mono text-xs font-bold bg-surface-container px-2 py-1 rounded">
                  FIS-102
                </span>
              </td>
              <td className="px-8 py-6">
                <div className="font-headline font-bold text-primary">
                  Física Mecánica
                </div>
                <div className="text-xs text-on-surface-variant mt-1">
                  Créditos: 4 • Semestre A
                </div>
              </td>
              <td className="px-8 py-6 text-sm text-on-surface-variant">
                Departamento de Física
              </td>
              <td className="px-8 py-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-outline-variant/20 text-outline text-[0.7rem] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-outline mr-2" />
                  INACTIVO
                </span>
              </td>
              <td className="px-8 py-6 text-right">
                <div className="flex items-center justify-end space-x-3">
                  <button
                    className="p-2 text-outline hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                    title="Editar"
                  >
                    <span
                      className="material-symbols-outlined text-lg"
                      data-icon="edit"
                    >
                      edit
                    </span>
                  </button>
                  <button
                    className="p-2 text-outline hover:text-error hover:bg-error/5 rounded-lg transition-all"
                    title="Eliminar"
                  >
                    <span
                      className="material-symbols-outlined text-lg"
                      data-icon="delete"
                    >
                      delete
                    </span>
                  </button>
                </div>
              </td>
            </tr>
            {/* Row 4 */}
            <tr className="group hover:bg-secondary-fixed-dim/10 transition-colors">
              <td className="px-8 py-6">
                <span className="font-mono text-xs font-bold bg-surface-container px-2 py-1 rounded">
                  HUM-110
                </span>
              </td>
              <td className="px-8 py-6">
                <div className="font-headline font-bold text-primary">
                  Ética y Pensamiento Crítico
                </div>
                <div className="text-xs text-on-surface-variant mt-1">
                  Créditos: 2 • Transversal
                </div>
              </td>
              <td className="px-8 py-6 text-sm text-on-surface-variant">
                Humanidades y Artes
              </td>
              <td className="px-8 py-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-tertiary-container/20 text-tertiary text-[0.7rem] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary mr-2" />
                  ACTIVO
                </span>
              </td>
              <td className="px-8 py-6 text-right">
                <div className="flex items-center justify-end space-x-3">
                  <button
                    className="p-2 text-outline hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                    title="Editar"
                  >
                    <span
                      className="material-symbols-outlined text-lg"
                      data-icon="edit"
                    >
                      edit
                    </span>
                  </button>
                  <button
                    className="p-2 text-outline hover:text-error hover:bg-error/5 rounded-lg transition-all"
                    title="Eliminar"
                  >
                    <span
                      className="material-symbols-outlined text-lg"
                      data-icon="delete"
                    >
                      delete
                    </span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Pagination (Subtle Tonal Shift) */}
      <div className="bg-surface-container-low px-8 py-6 flex items-center justify-between">
        <span className="text-xs text-on-surface-variant font-medium">
          Mostrando 4 de 128 materias académicas
        </span>
        <div className="flex items-center space-x-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container-lowest text-outline hover:text-primary transition-all">
            <span
              className="material-symbols-outlined"
              data-icon="chevron_left"
            >
              chevron_left
            </span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-xs">
            1
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container-lowest text-outline hover:text-primary transition-all text-xs font-bold">
            2
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container-lowest text-outline hover:text-primary transition-all text-xs font-bold">
            3
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container-lowest text-outline hover:text-primary transition-all">
            <span
              className="material-symbols-outlined"
              data-icon="chevron_right"
            >
              chevron_right
            </span>
          </button>
        </div>
      </div>
    </section>
    {/* Stats Overview (Asymmetrical Bento Grid Element) */}
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-primary p-8 rounded-2xl text-white flex flex-col justify-between">
        <div>
          <span
            className="material-symbols-outlined text-3xl text-secondary-container"
            data-icon="school"
          >
            school
          </span>
          <h4 className="mt-4 text-sm font-medium text-on-primary-container uppercase tracking-widest">
            Total Materias
          </h4>
        </div>
        <div className="mt-8">
          <div className="text-5xl font-extrabold font-headline">128</div>
          <p className="text-xs text-on-primary-container mt-2">
            ↑ 12% desde el último semestre
          </p>
        </div>
      </div>
      <div className="md:col-span-2 bg-surface-container-lowest p-8 rounded-2xl shadow-sm flex items-center justify-between border border-outline-variant/10">
        <div className="space-y-6">
          <h4 className="text-lg font-bold font-headline text-primary">
            Estado de Departamentos
          </h4>
          <div className="flex space-x-12">
            <div>
              <p className="text-[0.65rem] uppercase tracking-wider text-outline mb-1 font-bold">
                Matemáticas
              </p>
              <p className="text-2xl font-black text-primary">32</p>
            </div>
            <div>
              <p className="text-[0.65rem] uppercase tracking-wider text-outline mb-1 font-bold">
                Tecnología
              </p>
              <p className="text-2xl font-black text-primary">45</p>
            </div>
            <div>
              <p className="text-[0.65rem] uppercase tracking-wider text-outline mb-1 font-bold">
                Idiomas
              </p>
              <p className="text-2xl font-black text-primary">18</p>
            </div>
          </div>
        </div>
        <div className="w-32 h-32 relative">
          {/* Simple Aesthetic Illustration */}
          <div className="absolute inset-0 border-8 border-surface-container-high rounded-full" />
          <div
            className="absolute inset-0 border-8 border-tertiary-container rounded-full"
            style={{
              clipPath:
                "polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 0 100%, 0 50%)"
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center font-bold text-primary font-headline">
            74%
          </div>
        </div>
      </div>
    </div>
  </main>
  {/* Footer (Authority: JSON) */}
  <footer className="bg-[#f7f9fb] text-[#002045] w-full py-12 border-t border-[#e6e8ea]/20">
    <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
      <div className="text-[0.75rem] uppercase tracking-[0.05em] font-medium font-body text-gray-500">
        © 2024 The Academic Editorial. All rights reserved.
      </div>
      <div className="flex space-x-8">
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
      </main >
    </>
  );
}
