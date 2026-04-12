<>
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>Gestión de Disponibilidad - The Academic Editorial</title>
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
        "\n        .material-symbols-outlined {\n            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;\n        }\n        body { font-family: 'Inter', sans-serif; }\n        h1, h2, h3, .headline { font-family: 'Manrope', sans-serif; }\n        .no-scrollbar::-webkit-scrollbar { display: none; }\n        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }\n    "
    }}
  />
  {/* TopNavBar */}
  <header className="bg-[#f7f9fb]/80 dark:bg-[#191c1e]/80 backdrop-blur-md text-[#002045] dark:text-[#f2f4f6] docked full-width top-0 sticky z-50 shadow-sm dark:shadow-none">
    <div className="flex justify-between items-center w-full px-8 py-4 max-w-full mx-auto">
      <div className="flex items-center gap-8">
        <span className="text-xl font-bold tracking-tight text-[#002045] dark:text-[#f7f9fb]">
          The Academic Editorial
        </span>
        <nav className="hidden md:flex items-center gap-6">
          <a
            className="text-[#191c1e]/60 dark:text-[#f7f9fb]/60 hover:text-[#002045] dark:hover:text-white transition-colors"
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
        <button className="px-5 py-2 text-sm font-semibold hover:text-[#002045] transition-colors">
          Sign In
        </button>
        <button className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold shadow-sm active:scale-95 transition-transform">
          Apply to Tutor
        </button>
      </div>
    </div>
  </header>
  <div className="flex min-h-screen">
    {/* SideNavBar */}
    <aside className="bg-[#f2f4f6] dark:bg-[#1c1c1c] h-screen w-64 fixed left-0 top-0 pt-20 hidden lg:block">
      <div className="flex flex-col h-full py-8">
        <div className="px-8 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <img
              className="w-10 h-10 rounded-full object-cover"
              data-alt="professional portrait of a male tutor with glasses in a modern academic setting"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1a6UHmRoZieABx4xzwhJqwB-zCFA0Q-v4lOybbB9H7mkfq7aIJyDPpF4pvFIGB-TUBx5dGCYWhYtaSAstoX5pSnn4UbrT-FrQYtpfo--6444GF0dM_yNhK-2vvOH49v5-dEA9l4p9-3a5OQjE8y5-lzYfdTBGWoIJO6iv_NeXsk4duOYqaSMOFtH9u7PlFrzCRe0MW-V1esQ6wRC5UB0TDPZFYZ57DHIqzJEhDAcwpIJZitfueC-yKhctzMI1VQySYX1YwI5jsfbR"
            />
            <div>
              <p className="text-on-surface font-bold text-sm">Julian Reed</p>
              <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-medium">
                Honors Scholar
              </p>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          <a
            className="flex items-center gap-4 text-[#191c1e]/70 dark:text-gray-400 px-8 py-3 hover:bg-[#e6e8ea] dark:hover:bg-[#333] transition-all"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="dashboard">
              dashboard
            </span>
            <span className="text-sm font-medium">Dashboard</span>
          </a>
          <a
            className="bg-white dark:bg-[#2c2c2c] text-[#002045] dark:text-[#cba72f] font-semibold rounded-l-full ml-4 pl-4 py-3 flex items-center gap-4"
            href="#"
          >
            <span
              className="material-symbols-outlined"
              data-icon="calendar_today"
            >
              calendar_today
            </span>
            <span className="text-sm">My Sessions</span>
          </a>
          <a
            className="flex items-center gap-4 text-[#191c1e]/70 dark:text-gray-400 px-8 py-3 hover:bg-[#e6e8ea] dark:hover:bg-[#333] transition-all"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="menu_book">
              menu_book
            </span>
            <span className="text-sm font-medium">Assignments</span>
          </a>
          <a
            className="flex items-center gap-4 text-[#191c1e]/70 dark:text-gray-400 px-8 py-3 hover:bg-[#e6e8ea] dark:hover:bg-[#333] transition-all"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="mail">
              mail
            </span>
            <span className="text-sm font-medium">Messages</span>
          </a>
          <a
            className="flex items-center gap-4 text-[#191c1e]/70 dark:text-gray-400 px-8 py-3 hover:bg-[#e6e8ea] dark:hover:bg-[#333] transition-all"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="settings">
              settings
            </span>
            <span className="text-sm font-medium">Settings</span>
          </a>
        </nav>
        <div className="px-6 mb-8">
          <button className="w-full bg-tertiary-container text-[#4e3d00] py-3 rounded-xl font-bold text-sm shadow-sm hover:opacity-90 active:scale-95 transition-all">
            Book New Session
          </button>
        </div>
        <div className="border-t border-outline-variant/20 pt-4">
          <a
            className="flex items-center gap-4 text-gray-500 px-8 py-2 hover:text-[#002045] transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="help">
              help
            </span>
            <span className="text-xs font-medium uppercase tracking-wider">
              Support
            </span>
          </a>
          <a
            className="flex items-center gap-4 text-gray-500 px-8 py-2 hover:text-[#002045] transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="logout">
              logout
            </span>
            <span className="text-xs font-medium uppercase tracking-wider">
              Logout
            </span>
          </a>
        </div>
      </div>
    </aside>
    {/* Main Content Canvas */}
    <main className="flex-1 lg:ml-64 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="label-md text-tertiary font-bold tracking-[0.1em] text-xs uppercase mb-2 block">
              Panel de Tutor
            </span>
            <h1 className="text-5xl font-extrabold text-primary leading-tight mb-4">
              Gestión de Disponibilidad
            </h1>
            <p className="text-on-surface-variant text-lg">
              Define tus horarios de enseñanza. Arrastra para crear nuevos
              bloques o pulsa en uno existente para editarlo.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-surface-container-high rounded-lg text-primary font-bold text-sm hover:bg-surface-variant transition-colors border border-outline-variant/20">
              <span
                className="material-symbols-outlined text-[20px]"
                data-icon="sync"
              >
                sync
              </span>
              Cargar horario recurrente
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-bold text-sm shadow-lg hover:shadow-xl transition-all active:scale-95">
              <span
                className="material-symbols-outlined text-[20px]"
                data-icon="save"
              >
                save
              </span>
              Guardar Cambios
            </button>
          </div>
        </header>
        {/* Status Cards (Asymmetric Bento) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2 bg-surface-container-lowest p-8 rounded-xl flex items-center justify-between shadow-[0_8px_40px_rgba(25,28,30,0.04)]">
            <div>
              <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-1">
                Resumen Semanal
              </h3>
              <p className="text-3xl font-black text-primary">
                32 Horas Disponibles
              </p>
            </div>
            <div className="flex -space-x-3">
              <div className="w-12 h-12 rounded-full border-4 border-white bg-primary-container flex items-center justify-center text-on-primary-container font-bold">
                JR
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-white bg-tertiary-container flex items-center justify-center text-on-tertiary-container font-bold">
                12
              </div>
            </div>
          </div>
          <div className="bg-primary-container text-white p-8 rounded-xl shadow-[0_8px_40px_rgba(25,28,30,0.08)]">
            <h3 className="text-xs font-bold opacity-70 uppercase tracking-widest mb-1">
              Próxima Sesión
            </h3>
            <p className="text-xl font-bold mb-2">Mañana, 09:00 AM</p>
            <p className="text-sm opacity-90">
              Análisis Literario con Elena G.
            </p>
          </div>
        </div>
        {/* Calendar View */}
        <div className="bg-surface-container-lowest rounded-xl shadow-[0_8px_40px_rgba(25,28,30,0.04)] overflow-hidden">
          {/* Calendar Header */}
          <div className="grid grid-cols-8 border-b border-outline-variant/10">
            <div className="p-4 bg-surface-container-low border-r border-outline-variant/10 flex flex-col items-center justify-center">
              <span
                className="material-symbols-outlined text-on-surface-variant"
                data-icon="schedule"
              >
                schedule
              </span>
            </div>
            <div className="p-4 text-center">
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">
                LUN
              </p>
              <p className="text-xl font-black text-primary">12</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">
                MAR
              </p>
              <p className="text-xl font-black text-primary">13</p>
            </div>
            <div className="p-4 text-center bg-primary-container/5">
              <p className="text-[10px] font-bold text-primary uppercase tracking-tighter">
                MIÉ
              </p>
              <p className="text-xl font-black text-primary">14</p>
              <div className="w-1 h-1 bg-primary rounded-full mx-auto mt-1" />
            </div>
            <div className="p-4 text-center">
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">
                JUE
              </p>
              <p className="text-xl font-black text-primary">15</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">
                VIE
              </p>
              <p className="text-xl font-black text-primary">16</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">
                SÁB
              </p>
              <p className="text-xl font-black text-primary">17</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">
                DOM
              </p>
              <p className="text-xl font-black text-primary">18</p>
            </div>
          </div>
          {/* Calendar Body */}
          <div className="grid grid-cols-8 relative h-[600px] overflow-y-auto no-scrollbar">
            {/* Time Slots Column */}
            <div className="col-span-1 bg-surface-container-low border-r border-outline-variant/10">
              <div className="h-16 flex items-start justify-center pt-2 text-[10px] font-bold text-on-surface-variant opacity-60">
                08:00
              </div>
              <div className="h-16 flex items-start justify-center pt-2 text-[10px] font-bold text-on-surface-variant opacity-60">
                09:00
              </div>
              <div className="h-16 flex items-start justify-center pt-2 text-[10px] font-bold text-on-surface-variant opacity-60">
                10:00
              </div>
              <div className="h-16 flex items-start justify-center pt-2 text-[10px] font-bold text-on-surface-variant opacity-60">
                11:00
              </div>
              <div className="h-16 flex items-start justify-center pt-2 text-[10px] font-bold text-on-surface-variant opacity-60">
                12:00
              </div>
              <div className="h-16 flex items-start justify-center pt-2 text-[10px] font-bold text-on-surface-variant opacity-60">
                13:00
              </div>
              <div className="h-16 flex items-start justify-center pt-2 text-[10px] font-bold text-on-surface-variant opacity-60">
                14:00
              </div>
              <div className="h-16 flex items-start justify-center pt-2 text-[10px] font-bold text-on-surface-variant opacity-60">
                15:00
              </div>
              <div className="h-16 flex items-start justify-center pt-2 text-[10px] font-bold text-on-surface-variant opacity-60">
                16:00
              </div>
            </div>
            {/* Days Columns */}
            {/* Row 1 Mock */}
            <div className="col-span-7 grid grid-cols-7 relative">
              {/* Background Grid Lines */}
              <div className="absolute inset-0 grid grid-rows-9 pointer-events-none">
                <div className="border-b border-outline-variant/5" />
                <div className="border-b border-outline-variant/5" />
                <div className="border-b border-outline-variant/5" />
                <div className="border-b border-outline-variant/5" />
                <div className="border-b border-outline-variant/5" />
                <div className="border-b border-outline-variant/5" />
                <div className="border-b border-outline-variant/5" />
                <div className="border-b border-outline-variant/5" />
                <div className="border-b border-outline-variant/5" />
              </div>
              <div className="absolute inset-0 grid grid-cols-7 pointer-events-none">
                <div className="border-r border-outline-variant/5" />
                <div className="border-r border-outline-variant/5" />
                <div className="border-r border-outline-variant/5" />
                <div className="border-r border-outline-variant/5" />
                <div className="border-r border-outline-variant/5" />
                <div className="border-r border-outline-variant/5" />
              </div>
              {/* Available Block 1 */}
              <div className="absolute top-[64px] left-[14.28%] w-[14.28%] h-[128px] p-1 group">
                <div className="w-full h-full bg-tertiary/10 border-l-4 border-tertiary rounded-md p-2 flex flex-col justify-between cursor-pointer hover:bg-tertiary/20 transition-all">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-tertiary uppercase">
                      Libre
                    </span>
                    <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
                      <span
                        className="material-symbols-outlined text-[16px] text-tertiary"
                        data-icon="edit"
                      >
                        edit
                      </span>
                      <span
                        className="material-symbols-outlined text-[16px] text-error"
                        data-icon="delete"
                      >
                        delete
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] font-semibold text-primary">
                    09:00 - 11:00
                  </p>
                </div>
              </div>
              {/* Occupied Block (Booked) */}
              <div className="absolute top-[128px] left-[28.56%] w-[14.28%] h-[64px] p-1">
                <div className="w-full h-full bg-primary-container rounded-md p-2 flex flex-col justify-between shadow-md">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-on-primary-container uppercase">
                      Reservado
                    </span>
                    <span
                      className="material-symbols-outlined text-[14px] text-white"
                      data-icon="lock"
                      data-weight="fill"
                    >
                      lock
                    </span>
                  </div>
                  <p className="text-[11px] font-bold text-white truncate">
                    Clase: Cálculo I
                  </p>
                </div>
              </div>
              {/* Available Block 2 */}
              <div className="absolute top-[0px] left-[57.12%] w-[14.28%] h-[256px] p-1 group">
                <div className="w-full h-full bg-tertiary/10 border-l-4 border-tertiary rounded-md p-2 flex flex-col justify-between cursor-pointer hover:bg-tertiary/20 transition-all">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-tertiary uppercase">
                      Libre
                    </span>
                    <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
                      <span
                        className="material-symbols-outlined text-[16px] text-tertiary"
                        data-icon="edit"
                      >
                        edit
                      </span>
                      <span
                        className="material-symbols-outlined text-[16px] text-error"
                        data-icon="delete"
                      >
                        delete
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] font-semibold text-primary">
                    08:00 - 12:00
                  </p>
                </div>
              </div>
              {/* Available Block 3 */}
              <div className="absolute top-[320px] left-[0%] w-[14.28%] h-[128px] p-1 group">
                <div className="w-full h-full bg-tertiary/10 border-l-4 border-tertiary rounded-md p-2 flex flex-col justify-between cursor-pointer hover:bg-tertiary/20 transition-all">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-tertiary uppercase">
                      Libre
                    </span>
                    <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
                      <span
                        className="material-symbols-outlined text-[16px] text-tertiary"
                        data-icon="edit"
                      >
                        edit
                      </span>
                      <span
                        className="material-symbols-outlined text-[16px] text-error"
                        data-icon="delete"
                      >
                        delete
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] font-semibold text-primary">
                    13:00 - 15:00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer / Legend Section */}
        <div className="mt-8 flex flex-wrap gap-8 items-center bg-surface-container-low p-6 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-tertiary/20 border-l-2 border-tertiary rounded-sm" />
            <span className="text-sm font-medium text-on-surface-variant">
              Disponible para reserva
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-primary-container rounded-sm" />
            <span className="text-sm font-medium text-on-surface-variant">
              Sesión confirmada
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 border border-outline-variant/20 border-dashed rounded-sm" />
            <span className="text-sm font-medium text-on-surface-variant">
              Bloqueado / No disponible
            </span>
          </div>
          <div className="ml-auto text-on-surface-variant/50 flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[18px]"
              data-icon="info"
            >
              info
            </span>
            <span className="text-xs uppercase tracking-widest font-bold">
              ZONA HORARIA: GMT-5 (BOGOTÁ)
            </span>
          </div>
        </div>
      </div>
    </main>
  </div>
  {/* Footer Shared Component */}
  <footer className="bg-[#f7f9fb] dark:bg-[#191c1e] w-full py-12 border-t border-[#e6e8ea]/20">
    <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
      <div className="text-[0.75rem] uppercase tracking-[0.05em] font-medium Inter text-gray-500">
        © 2024 The Academic Editorial. All rights reserved.
      </div>
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
</>
