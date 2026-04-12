<>
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>Tutor Dashboard | The Academic Editorial</title>
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
        "\n        .material-symbols-outlined {\n            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;\n        }\n        .signature-gradient {\n            background: linear-gradient(135deg, #002045 0%, #1a365d 100%);\n        }\n    "
    }}
  />
  {/* SideNavBar Anchor */}
  <aside className="bg-[#f2f4f6] dark:bg-[#1c1c1c] text-[#002045] dark:text-[#f2f4f6] h-screen w-64 fixed left-0 top-0 flex flex-col h-full py-8 z-40">
    <div className="px-8 mb-10">
      <span className="text-lg font-black tracking-widest uppercase font-headline">
        ACADEMIC
      </span>
    </div>
    <div className="flex flex-col items-center mb-10 px-8">
      <div className="relative w-20 h-20 mb-4">
        <img
          className="w-20 h-20 rounded-full object-cover shadow-sm"
          data-alt="Professional headshot of a smiling male professor in his 40s wearing a navy blazer in a library setting with soft focus books"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJAQYEI1ONEC-mzpKSEt9vnJG9CJyzsuMfDyrNhWVCNlyTm2jAPaQt0E3w4L7ZH4HaeJDR45WGkge4WuQn6OkpEhNU97aewYgbQMlVi4gnjZX9Mo0bUZV_46C1h3BIhMHEqq-x0_6yg5_MINRVSRPq6my8MVV5pLnxvDaxpMRtE24M4TO01UN0AFHNiTqnPkkfBeguutbMFEqRahg9SD43YXM_IDyJQDjyU3WG29_QvykFCKDJddq9Bpg0h75hxKUyTJKbRvfvd-hI"
        />
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-tertiary-container rounded-full border-2 border-[#f2f4f6]" />
      </div>
      <h2 className="font-headline font-bold text-lg leading-tight">
        Julian Reed
      </h2>
      <p className="text-xs font-medium uppercase tracking-[0.05em] text-[#191c1e]/60">
        Honors Scholar
      </p>
    </div>
    <nav className="flex-1 space-y-1">
      <a
        className="bg-white dark:bg-[#2c2c2c] text-[#002045] dark:text-[#cba72f] font-semibold rounded-l-full ml-4 pl-4 py-3 flex items-center gap-3 scale-0.98 transform"
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
    </nav>
    <div className="px-8 mt-auto flex flex-col gap-4">
      <button className="signature-gradient text-white font-bold py-3 px-4 rounded-xl text-sm shadow-md transition-transform active:scale-95">
        Book New Session
      </button>
      <div className="space-y-1 border-t border-[#e6e8ea] pt-6">
        <a
          className="text-[#191c1e]/70 dark:text-gray-400 py-2 flex items-center gap-3 hover:text-[#002045] transition-colors"
          href="#"
        >
          <span className="material-symbols-outlined" data-icon="help">
            help
          </span>
          <span className="text-xs uppercase tracking-wider font-medium">
            Support
          </span>
        </a>
        <a
          className="text-[#191c1e]/70 dark:text-gray-400 py-2 flex items-center gap-3 hover:text-[#002045] transition-colors"
          href="#"
        >
          <span className="material-symbols-outlined" data-icon="logout">
            logout
          </span>
          <span className="text-xs uppercase tracking-wider font-medium">
            Logout
          </span>
        </a>
      </div>
    </div>
  </aside>
  {/* Main Content Area */}
  <main className="ml-64 p-10 min-h-screen">
    <header className="flex justify-between items-end mb-12">
      <div className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.1em] text-tertiary mb-2">
          Panel del Instructor
        </p>
        <h1 className="text-5xl font-extrabold font-headline text-primary tracking-tight">
          Bienvenido, Julian.
        </h1>
      </div>
      {/* Availability Toggle Widget */}
      <div className="bg-surface-container-lowest p-4 rounded-xl flex items-center gap-6 shadow-[0_8px_40px_rgba(25,28,30,0.04)]">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">
            Estado
          </p>
          <p className="text-sm font-semibold text-primary">
            Disponible para clases
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input defaultChecked="" className="sr-only peer" type="checkbox" />
          <div className="w-14 h-7 bg-surface-container-high rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-tertiary-container" />
        </label>
      </div>
    </header>
    {/* Stats Grid (Bento Style) */}
    <div className="grid grid-cols-12 gap-6 mb-12">
      {/* Stat 1 */}
      <div className="col-span-4 bg-surface-container-lowest p-8 rounded-lg shadow-[0_8px_40px_rgba(25,28,30,0.04)] flex flex-col justify-between h-48 border-l-4 border-primary">
        <span
          className="material-symbols-outlined text-primary-container opacity-30 text-4xl self-end"
          data-icon="history_edu"
        >
          history_edu
        </span>
        <div>
          <h3 className="text-xs font-medium uppercase tracking-widest text-on-surface-variant mb-1">
            Horas dictadas este mes
          </h3>
          <p className="text-4xl font-bold font-headline text-primary">128.5</p>
        </div>
      </div>
      {/* Stat 2 */}
      <div className="col-span-4 bg-surface-container-lowest p-8 rounded-lg shadow-[0_8px_40px_rgba(25,28,30,0.04)] flex flex-col justify-between h-48 border-l-4 border-tertiary-container">
        <span
          className="material-symbols-outlined text-tertiary-container opacity-40 text-4xl self-end"
          data-icon="star"
          style={{ fontVariationSettings: '"FILL" 1' }}
        >
          star
        </span>
        <div>
          <h3 className="text-xs font-medium uppercase tracking-widest text-on-surface-variant mb-1">
            Calificación promedio
          </h3>
          <div className="flex items-center gap-2">
            <p className="text-4xl font-bold font-headline text-primary">
              4.92
            </p>
            <span className="text-tertiary font-bold text-sm bg-tertiary-fixed/30 px-2 py-0.5 rounded">
              TOP
            </span>
          </div>
        </div>
      </div>
      {/* Stat 3 */}
      <div className="col-span-4 bg-primary text-white p-8 rounded-lg shadow-xl flex flex-col justify-between h-48 signature-gradient">
        <span
          className="material-symbols-outlined text-white/30 text-4xl self-end"
          data-icon="payments"
        >
          payments
        </span>
        <div>
          <h3 className="text-xs font-medium uppercase tracking-widest text-white/60 mb-1">
            Ingresos totales
          </h3>
          <p className="text-4xl font-bold font-headline">$4,850.00</p>
        </div>
      </div>
    </div>
    {/* Main Content Split */}
    <div className="grid grid-cols-12 gap-8">
      {/* Left: Today's Classes */}
      <div className="col-span-8 space-y-6">
        <div className="flex justify-between items-center px-2">
          <h2 className="text-2xl font-bold font-headline text-primary tracking-tight">
            Clases de Hoy
          </h2>
          <button className="text-sm font-semibold text-secondary flex items-center gap-1 hover:underline">
            Ver calendario completo
            <span
              className="material-symbols-outlined text-sm"
              data-icon="arrow_forward"
            >
              arrow_forward
            </span>
          </button>
        </div>
        {/* Session List */}
        <div className="space-y-4">
          {/* Session Card 1 */}
          <div className="bg-surface-container-lowest p-6 rounded-lg flex items-center justify-between group hover:translate-x-2 transition-transform duration-300">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center overflow-hidden border-2 border-white">
                <img
                  className="w-full h-full object-cover"
                  data-alt="Close up portrait of a young female student with glasses and a friendly smile in a bright studio lighting"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKtVmNGiA_CU2dPLAwyJ8VUzTrPk9j-5XNiGYF3cbnsGJou-NV8n1VN80m8Whk0avwxi0lyzr9jyYQMUAwPRsvr1i6yJGGWL2EySMF-8vaqEu3RbgL6MMfYx8aYxx1K92Xu-RFISu196h3iBFq-pvM-GAvs7lnrcZyU_a3MfHDXo3Q8v3FphddhgCZnqrxA1uPtjP_Qegpzn92DmVvJ-Ch8PqWz5Hgb26FnTgp5PS4kRGj_oUDBCkf-s1luDrdtfXEVlsAOVutPIoK"
                />
              </div>
              <div>
                <h4 className="font-bold text-lg text-primary">
                  Elena Martínez
                </h4>
                <p className="text-sm text-on-surface-variant">
                  Literatura Comparada • Nivel Avanzado
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-primary font-bold mb-1">
                <span
                  className="material-symbols-outlined text-sm"
                  data-icon="schedule"
                >
                  schedule
                </span>
                <span>09:00 - 10:30 AM</span>
              </div>
              <span className="text-[0.65rem] uppercase tracking-widest font-bold text-tertiary px-2 py-1 bg-tertiary-fixed/20 rounded">
                En curso
              </span>
            </div>
          </div>
          {/* Session Card 2 */}
          <div className="bg-surface-container-lowest p-6 rounded-lg flex items-center justify-between group hover:translate-x-2 transition-transform duration-300">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center overflow-hidden border-2 border-white">
                <img
                  className="w-full h-full object-cover"
                  data-alt="Young man with curly hair and casual academic attire looking thoughtfully at the camera, warm lighting"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2TSiq7lu88SCAdzDQSCGIvFADh750jgSxH4YY1WVEHr0cgxJR801lPP1Qmd9N31XuhseX9gtzka_UAcAUpbA6W0sOpDFovRuTpji6NWhdNhxb4B1dv53lYxK4D4wjZpsTAD-tJvP_KTvFiZ4YRK_cFLBtQAuwcPs_5gtn4ChZNbgC4q3Zo3A2VZUebnaVAvvViptHul7x8lU6TlLJWbfDMegC0pFiCmaERAVEWiwsNhM8KbO6UbEQlnwtdeSezr7fmCTndwSO0fPU"
                />
              </div>
              <div>
                <h4 className="font-bold text-lg text-primary">Mateo Ricci</h4>
                <p className="text-sm text-on-surface-variant">
                  Crítica Literaria • Preparación de Tesis
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-on-surface-variant font-medium mb-1">
                <span
                  className="material-symbols-outlined text-sm"
                  data-icon="schedule"
                >
                  schedule
                </span>
                <span>14:00 - 15:30 PM</span>
              </div>
              <span className="text-[0.65rem] uppercase tracking-widest font-bold text-on-surface-variant px-2 py-1 bg-surface-container-high rounded">
                Programada
              </span>
            </div>
          </div>
          {/* Session Card 3 */}
          <div className="bg-surface-container-lowest p-6 rounded-lg flex items-center justify-between group hover:translate-x-2 transition-transform duration-300 opacity-80">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center overflow-hidden border-2 border-white">
                <img
                  className="w-full h-full object-cover"
                  data-alt="Headshot of a focused female student with minimalist aesthetic background, soft daylight"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTn4nfbfao2AqEoGdj2L6IaZSEJaiMcqwlEC1ulHkSP77f-RWtmn7O8jGUjUaV3VOs2eb1-JYRnydYxY5ssGZW7C_qMxZRC3M6MbNKHp1BjNeNLMDEJL5Wa6mF_IoHRx_RI5Dxs5ka4pLTGGFdr8aWTpf4kPi8P46YHz5CCgkE-QM6khYZOW2PQ1BDvQEofpijnWmpqrvUev8M9n0oQ3QYMnmMcOzfu-oaDbdP4q8gdXQiXrU1DV4xYICV9krYmHDqPR84AkcToE89"
                />
              </div>
              <div>
                <h4 className="font-bold text-lg text-primary">Sofia Chen</h4>
                <p className="text-sm text-on-surface-variant">
                  Redacción Académica • Ensayo de Admisión
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-on-surface-variant font-medium mb-1">
                <span
                  className="material-symbols-outlined text-sm"
                  data-icon="schedule"
                >
                  schedule
                </span>
                <span>17:00 - 18:00 PM</span>
              </div>
              <span className="text-[0.65rem] uppercase tracking-widest font-bold text-on-surface-variant px-2 py-1 bg-surface-container-high rounded">
                Programada
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Right: Academic Performance / Sidebar Details */}
      <div className="col-span-4 space-y-8">
        {/* Academic Tip / Resource */}
        <div className="bg-tertiary-container text-on-tertiary-container p-8 rounded-lg relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="font-headline font-bold text-xl mb-3">
              Sugerencia Editorial
            </h3>
            <p className="text-sm leading-relaxed mb-6 opacity-90">
              Has completado 20 horas de tutoría en Crítica Literaria. ¿Te
              gustaría actualizar tus materiales de referencia para el próximo
              trimestre?
            </p>
            <button className="bg-primary text-white py-2 px-6 rounded-md text-xs font-bold uppercase tracking-wider group-hover:scale-105 transition-transform">
              Revisar Biblioteca
            </button>
          </div>
          <span
            className="material-symbols-outlined absolute -bottom-4 -right-4 text-9xl opacity-10 rotate-12"
            data-icon="auto_stories"
          >
            auto_stories
          </span>
        </div>
        {/* Recent Feedback */}
        <div className="bg-surface-container-low p-8 rounded-lg">
          <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-on-surface-variant mb-6">
            Comentarios Recientes
          </h3>
          <div className="space-y-6">
            <div className="border-b border-outline-variant/20 pb-4">
              <div className="flex gap-1 mb-2">
                <span
                  className="material-symbols-outlined text-xs text-tertiary"
                  data-icon="star"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-xs text-tertiary"
                  data-icon="star"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-xs text-tertiary"
                  data-icon="star"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-xs text-tertiary"
                  data-icon="star"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-xs text-tertiary"
                  data-icon="star"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  star
                </span>
              </div>
              <p className="text-sm italic text-primary mb-1">
                "Las correcciones de Julian en mi ensayo fueron fundamentales
                para mi aceptación..."
              </p>
              <p className="text-[0.65rem] font-bold uppercase text-on-surface-variant">
                — Ana G., Hace 2 horas
              </p>
            </div>
            <div>
              <div className="flex gap-1 mb-2">
                <span
                  className="material-symbols-outlined text-xs text-tertiary"
                  data-icon="star"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-xs text-tertiary"
                  data-icon="star"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-xs text-tertiary"
                  data-icon="star"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-xs text-tertiary"
                  data-icon="star"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-xs text-tertiary"
                  data-icon="star"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  star
                </span>
              </div>
              <p className="text-sm italic text-primary mb-1">
                "Gran dominio del tema y paciencia infinita. Recomendado 100%."
              </p>
              <p className="text-[0.65rem] font-bold uppercase text-on-surface-variant">
                — Carlos P., Ayer
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  {/* Footer Anchor */}
  <footer className="bg-[#f7f9fb] dark:bg-[#191c1e] text-[#002045] dark:text-[#f2f4f6] w-full py-12 border-t border-[#e6e8ea]/20 ml-64 max-w-[calc(100%-16rem)]">
    <div className="max-w-7xl mx-auto px-8 flex justify-between items-center text-[0.75rem] uppercase tracking-[0.05em] font-medium font-body">
      <p className="text-gray-500">
        © 2024 The Academic Editorial. All rights reserved.
      </p>
      <div className="flex gap-8">
        <a
          className="text-gray-500 hover:text-[#002045] transition-colors"
          href="#"
        >
          Privacy Policy
        </a>
        <a
          className="text-gray-500 hover:text-[#002045] transition-colors"
          href="#"
        >
          Terms of Service
        </a>
        <a
          className="text-gray-500 hover:text-[#002045] transition-colors"
          href="#"
        >
          Accessibility
        </a>
        <a
          className="text-gray-500 hover:text-[#002045] transition-colors"
          href="#"
        >
          Contact
        </a>
      </div>
    </div>
  </footer>
</>
