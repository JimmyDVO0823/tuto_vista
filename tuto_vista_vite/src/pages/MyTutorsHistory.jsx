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
        "\n        .material-symbols-outlined {\n            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;\n        }\n        body { font-family: 'Inter', sans-serif; }\n        h1, h2, h3 { font-family: 'Manrope', sans-serif; }\n    "
    }}
  />
  {/* SideNavBar Anchor */}
  <aside className="h-screen w-64 fixed left-0 top-0 bg-[#f2f4f6] dark:bg-[#1c1c1c] flex flex-col py-8 z-40">
    <div className="px-8 mb-10">
      <span className="text-lg font-black tracking-widest uppercase text-primary dark:text-[#f2f4f6]">
        Academic
      </span>
    </div>
    <div className="px-8 mb-8 flex items-center gap-3">
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <img
          alt="Student Avatar"
          data-alt="Close-up portrait of a young male student with a thoughtful expression in a library setting with soft bookshelf background"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoEgIG5nWQxKegufpw44OfZBH3tbM8Unr-j7wCp2Xli5Vyvlsttyk4ou6bXwUYvKgn4W6pL9_bnGIaXMwapA6PP2tfX4nxYjG_hiCehD1-60nvMNm5Y2JE-h4gI7x5IksDkWAjBxeaf3rlFfgonBNOWcn9y8RtVV9ydHLnG_Y-ZF2o93mpSrHEET8dpwKoyETnKJj2qEBPvq5AaK1wpblb1dIGnn23yhBHx9IPiU-DVQFCC_W6G3ZKsrYS0DzbRPwGxEUxDw-Si356"
        />
      </div>
      <div>
        <p className="text-sm font-semibold text-primary dark:text-[#f2f4f6]">
          Julian Reed
        </p>
        <p className="text-[10px] uppercase tracking-wider text-gray-500">
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
        <span className="text-sm font-medium">Dashboard</span>
      </a>
      <a
        className="flex items-center gap-3 bg-white dark:bg-[#2c2c2c] text-[#002045] dark:text-[#cba72f] font-semibold rounded-l-full ml-4 pl-4 py-3 active:scale-98 transform"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="calendar_today">
          calendar_today
        </span>
        <span className="text-sm font-medium">My Sessions</span>
      </a>
      <a
        className="flex items-center gap-3 text-[#191c1e]/70 dark:text-gray-400 px-8 py-3 hover:bg-[#e6e8ea] dark:hover:bg-[#333] transition-all"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="menu_book">
          menu_book
        </span>
        <span className="text-sm font-medium">Assignments</span>
      </a>
      <a
        className="flex items-center gap-3 text-[#191c1e]/70 dark:text-gray-400 px-8 py-3 hover:bg-[#e6e8ea] dark:hover:bg-[#333] transition-all"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="mail">
          mail
        </span>
        <span className="text-sm font-medium">Messages</span>
      </a>
      <a
        className="flex items-center gap-3 text-[#191c1e]/70 dark:text-gray-400 px-8 py-3 hover:bg-[#e6e8ea] dark:hover:bg-[#333] transition-all"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="settings">
          settings
        </span>
        <span className="text-sm font-medium">Settings</span>
      </a>
    </nav>
    <div className="px-6 mt-6">
      <button className="w-full py-3 bg-gradient-to-br from-primary to-[#1a365d] text-white rounded-md text-sm font-bold shadow-sm hover:opacity-90 transition-opacity">
        Book New Session
      </button>
    </div>
    <div className="mt-auto border-t border-gray-200 dark:border-gray-800 pt-6">
      <a
        className="flex items-center gap-3 text-[#191c1e]/70 dark:text-gray-400 px-8 py-3 hover:bg-[#e6e8ea] dark:hover:bg-[#333] transition-all"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="help">
          help
        </span>
        <span className="text-sm font-medium">Support</span>
      </a>
      <a
        className="flex items-center gap-3 text-[#191c1e]/70 dark:text-gray-400 px-8 py-3 hover:bg-[#e6e8ea] dark:hover:bg-[#333] transition-all"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="logout">
          logout
        </span>
        <span className="text-sm font-medium">Logout</span>
      </a>
    </div>
  </aside>
  {/* Main Content */}
  <main className="ml-64 flex-1 p-10 min-h-screen">
    {/* Header Section */}
    <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <span className="label-md uppercase tracking-[0.05em] font-medium text-tertiary-container mb-2 block">
          Académico
        </span>
        <h1 className="text-5xl font-extrabold text-primary tracking-tight">
          Mi Historial de Tutorías
        </h1>
        <p className="text-on-surface-variant mt-4 max-w-xl text-lg">
          Revisa tus sesiones pasadas, gestiona tus próximas citas y evalúa tu
          progreso académico.
        </p>
      </div>
      <div className="relative w-full md:w-80 group">
        <span
          className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors"
          data-icon="search"
        >
          search
        </span>
        <input
          className="w-full pl-12 pr-4 py-3.5 bg-surface-container-lowest border-none rounded-xl shadow-[0_8px_40px_rgba(25,28,30,0.04)] focus:ring-2 focus:ring-primary/20 text-on-surface placeholder:text-outline/60 transition-all"
          placeholder="Buscar por materia..."
          type="text"
        />
      </div>
    </header>
    {/* Stats Overview (Asymmetric Layout) */}
    <div className="grid grid-cols-12 gap-6 mb-10">
      <div className="col-span-12 lg:col-span-8 bg-primary text-white rounded-lg p-8 flex justify-between items-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Resumen de Actividad</h2>
          <p className="text-primary-fixed-dim text-sm max-w-sm">
            Has completado 24 horas de tutoría este semestre. ¡Vas por buen
            camino para tus exámenes finales!
          </p>
        </div>
        <div className="flex gap-8 relative z-10">
          <div className="text-center">
            <span className="block text-3xl font-black">12</span>
            <span className="text-[10px] uppercase tracking-widest text-primary-fixed-dim">
              Completadas
            </span>
          </div>
          <div className="text-center">
            <span className="block text-3xl font-black">3</span>
            <span className="text-[10px] uppercase tracking-widest text-primary-fixed-dim">
              Próximas
            </span>
          </div>
        </div>
        {/* Abstract Design Element */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
      </div>
      <div className="col-span-12 lg:col-span-4 bg-tertiary-container rounded-lg p-8 flex flex-col justify-center">
        <span
          className="material-symbols-outlined text-on-tertiary-container mb-2 text-3xl"
          data-icon="stars"
          data-weight="fill"
          style={{ fontVariationSettings: '"FILL" 1' }}
        >
          stars
        </span>
        <p className="text-on-tertiary-container font-bold text-xl">
          Nivel Oro
        </p>
        <p className="text-on-tertiary-container/80 text-sm">
          4 reseñas pendientes para el siguiente nivel.
        </p>
      </div>
    </div>
    {/* Academic Data Table */}
    <div className="bg-surface-container-lowest rounded-lg shadow-[0_8px_40px_rgba(25,28,30,0.04)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-high">
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                Materia
              </th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                Tutor
              </th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                Fecha
              </th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                Hora
              </th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                Estado
              </th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-right">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-0">
            {/* Row 1: Completed */}
            <tr className="group hover:bg-secondary-fixed-dim/10 transition-colors bg-surface">
              <td className="px-8 py-6">
                <span className="font-bold text-primary block">
                  Cálculo Multivariable
                </span>
                <span className="text-xs text-on-surface-variant">
                  Ingeniería
                </span>
              </td>
              <td className="px-8 py-6">
                <div className="flex items-center gap-3">
                  <img
                    alt="Tutor"
                    className="w-8 h-8 rounded-full"
                    data-alt="Close-up professional headshot of a friendly female tutor with glasses, warm smiling expression, neutral studio background"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtE9BPvLPyRbHFt-eLX1GbgaPtEYvXkN6jOliDH_UjtbDTS4zwEA6f9ZF7NWSwDrLwsS97axjLtbDyUB1g07lwzEtFwSc4X1wn3hXwe3-6KF7QsibyA9cjIV3-vlcUs9pbd7fMtQ7fXbCeX3o4GnpRtVooxLx2CmXDNNvzAhMQ04zNm3CkLTJNpmJy3pWF8cPro4S2Wr6F-Zf0jbZVS72P6nWeMZT7EaYkiOP9_k6Xz1XtX0yxKrhmdMG7RLY5pgPkSZf8BOW7lPoM"
                  />
                  <span className="text-sm font-medium">
                    Dra. Elena Martínez
                  </span>
                </div>
              </td>
              <td className="px-8 py-6 text-sm">15 May, 2024</td>
              <td className="px-8 py-6 text-sm">14:00 - 15:30</td>
              <td className="px-8 py-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-green-100 text-green-700">
                  <span className="w-1 h-1 rounded-full bg-green-700" />
                  Completada
                </span>
              </td>
              <td className="px-8 py-6 text-right">
                <button className="text-tertiary font-bold text-xs uppercase tracking-widest hover:underline transition-all">
                  Dejar Reseña
                </button>
              </td>
            </tr>
            {/* Row 2: Pending */}
            <tr className="group hover:bg-secondary-fixed-dim/10 transition-colors bg-surface-container-low">
              <td className="px-8 py-6">
                <span className="font-bold text-primary block">
                  Literatura Comparada
                </span>
                <span className="text-xs text-on-surface-variant">
                  Humanidades
                </span>
              </td>
              <td className="px-8 py-6">
                <div className="flex items-center gap-3">
                  <img
                    alt="Tutor"
                    className="w-8 h-8 rounded-full"
                    data-alt="Portrait of a young male professional tutor with a confident smile, wearing a blazer, in a bright modern office setting"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPqnqvaztJZQ1N3Eta85YnN7bWKJ-195tv1GTLtH-1TAuo4uXk-CAM9pPLnSAhRCxWXEDzaW8X4m8UUFQfk7Jb3wp27_f0BNAkGjBhDdeycoE4ZOFH_MfGLWnS624ftM2KiYZUVZDkp0H6v-FdaqmvoNZQZlspnPs8Rd-dKgef5lQMnoL4tLKsOVcs8gD5_KPUj-76nGsE2WNoG-TZkTMZEIx-eRqGKcg1QLFNy2xBlXYkHUVYLwDS32u3-fqZxp8ENUXd-gcpn6y8"
                  />
                  <span className="text-sm font-medium">Lic. Roberto Cano</span>
                </div>
              </td>
              <td className="px-8 py-6 text-sm">22 May, 2024</td>
              <td className="px-8 py-6 text-sm">10:00 - 11:00</td>
              <td className="px-8 py-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-700">
                  <span className="w-1 h-1 rounded-full bg-amber-700" />
                  Pendiente
                </span>
              </td>
              <td className="px-8 py-6 text-right">
                <button className="text-error font-bold text-xs uppercase tracking-widest hover:opacity-70 transition-all">
                  Cancelar
                </button>
              </td>
            </tr>
            {/* Row 3: Cancelled */}
            <tr className="group hover:bg-secondary-fixed-dim/10 transition-colors bg-surface">
              <td className="px-8 py-6">
                <span className="font-bold text-primary block">
                  Bioquímica Celular
                </span>
                <span className="text-xs text-on-surface-variant">
                  Ciencias
                </span>
              </td>
              <td className="px-8 py-6">
                <div className="flex items-center gap-3">
                  <img
                    alt="Tutor"
                    className="w-8 h-8 rounded-full"
                    data-alt="Middle-aged woman academic professional with a kind and intelligent look, minimalist office background, natural lighting"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCURBpZYLPbq7LZrPjZzD8Km0Ebg-nByVuWFEPaHqzvU1iylrhka4JUS4PjDhtSybHSXX7sZ9Y-I_KEmvd8_oauU-mhj7-azU91PuMzCVTBkUvPGCM-W3cVtvV4JzLbKoWsipDfCPUame0_TOhMd_0gMWcii7ODJ9efzBxivAwH4tycpLAuZrhw1rPcS4QN4aNJKFmFHKLBNYBtwmSuCCwSoNxWXDNcSbMZgZQNHMaXCtHDi_yhjncxMzlouZnRrDIrmrF2tlUVLYnG"
                  />
                  <span className="text-sm font-medium">
                    Dra. Sarah Jenkins
                  </span>
                </div>
              </td>
              <td className="px-8 py-6 text-sm">12 May, 2024</td>
              <td className="px-8 py-6 text-sm">16:30 - 18:00</td>
              <td className="px-8 py-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-gray-100 text-gray-500">
                  <span className="w-1 h-1 rounded-full bg-gray-500" />
                  Cancelada
                </span>
              </td>
              <td className="px-8 py-6 text-right">
                <span className="text-outline-variant text-[10px] font-bold uppercase tracking-widest">
                  Sin acciones
                </span>
              </td>
            </tr>
            {/* Row 4: Completed */}
            <tr className="group hover:bg-secondary-fixed-dim/10 transition-colors bg-surface-container-low">
              <td className="px-8 py-6">
                <span className="font-bold text-primary block">
                  Historia del Arte
                </span>
                <span className="text-xs text-on-surface-variant">Artes</span>
              </td>
              <td className="px-8 py-6">
                <div className="flex items-center gap-3">
                  <img
                    alt="Tutor"
                    className="w-8 h-8 rounded-full"
                    data-alt="Sophisticated female professor in her late 30s with a warm and engaging smile, bright studio portrait, high-end feel"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkTSIs9HQG72JN8XdNgF9nvD8NwjXt1lswe3itWtPHkrAKsIIvJzhFYSIxz7r-s778Ro5N_Ya4nuzVBrc3F3DYDqSERXFAXjPNlh1fwpg7PebWvVPMhjeVFKfEpiTs246cvdUhzHd49YJW06ng2G15rhegfvt4PWISwzMPLjIXGLUEhKoYFdR4SFLQpmjr_nBtqRLDFQ7p-mVaTRVKF-HwGg4zwCjyv62FJfoNXHJmWroBaJn184DfpnStNFLvmgtfpU3DTdx47RHq"
                  />
                  <span className="text-sm font-medium">Mtra. Clara Luz</span>
                </div>
              </td>
              <td className="px-8 py-6 text-sm">08 May, 2024</td>
              <td className="px-8 py-6 text-sm">09:00 - 10:00</td>
              <td className="px-8 py-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-green-100 text-green-700">
                  <span className="w-1 h-1 rounded-full bg-green-700" />
                  Completada
                </span>
              </td>
              <td className="px-8 py-6 text-right">
                <div className="flex items-center justify-end gap-1 text-tertiary-container">
                  <span
                    className="material-symbols-outlined text-sm"
                    data-icon="star"
                    data-weight="fill"
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    star
                  </span>
                  <span className="text-xs font-bold text-primary">5.0</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Pagination Footer */}
      <div className="px-8 py-6 flex items-center justify-between border-t border-outline-variant/10">
        <span className="text-sm text-on-surface-variant">
          Mostrando <span className="font-bold text-primary">1-4</span> de 24
          sesiones
        </span>
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-lg hover:bg-surface-container-high transition-colors disabled:opacity-30"
            disabled=""
          >
            <span
              className="material-symbols-outlined"
              data-icon="chevron_left"
            >
              chevron_left
            </span>
          </button>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded-lg bg-primary text-white text-xs font-bold">
              1
            </button>
            <button className="w-8 h-8 rounded-lg hover:bg-surface-container-high text-xs font-bold transition-colors">
              2
            </button>
            <button className="w-8 h-8 rounded-lg hover:bg-surface-container-high text-xs font-bold transition-colors">
              3
            </button>
            <span className="px-2 text-xs text-outline">...</span>
            <button className="w-8 h-8 rounded-lg hover:bg-surface-container-high text-xs font-bold transition-colors">
              6
            </button>
          </div>
          <button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors">
            <span
              className="material-symbols-outlined"
              data-icon="chevron_right"
            >
              chevron_right
            </span>
          </button>
        </div>
      </div>
    </div>
    {/* Footer Shell Anchor */}
    <footer className="mt-20 border-t border-[#e6e8ea]/20 py-12 flex justify-between items-center w-full">
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
    </footer>
  </main>
  {/* Floating Action Button (Limited Context) */}
  <button className="fixed bottom-10 right-10 w-14 h-14 bg-tertiary-container text-on-tertiary-container rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-50">
    <span className="material-symbols-outlined" data-icon="add">
      add
    </span>
  </button>
</>
          </table >
        </div >
      </main >
    </>
  );
}
