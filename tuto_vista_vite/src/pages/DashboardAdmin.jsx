import React from 'react';

const DashboardAdmin = () => {
  return (
    <div className="flex min-h-screen bg-surface font-body">
      {/* SideNavBar */}
      <aside className="h-screen w-64 fixed left-0 top-0 bg-[#f2f4f6] flex flex-col py-8 z-40">
        <div className="px-8 mb-10">
          <span className="text-lg font-black tracking-widest uppercase text-primary">
            The Editorial
          </span>
        </div>
        <div className="flex items-center px-8 mb-10 gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBD-D8rOFTfBViH9iJai4mtns85ySMoEPcEGw8i1KEuunHhv5AALh6QplXqH0Gdfdd3V-XoDprTzpxs4wcJky9JJkKike9gOfhs5Kq94madtGEp5pQXudm7Vko3qC7aQPvBYzJsyJHeKZ_K4qCJfR13MBZXm6Y_wD8NpWS-v9Enn5WRnXnr9DSzHrqZ0TfRug_6CCwbClffu8Ce63PKV7IBiodP1jkkQD5kghA7lRJPOUUBjKAQ34fRb8iZkbECFCKFTZt68T-VDsla"
              alt="Admin Profile"
            />
          </div>
          <div>
            <p className="text-sm font-bold text-primary">Julian Reed</p>
            <p className="text-[0.65rem] uppercase tracking-wider text-gray-500 font-semibold">
              Honors Scholar
            </p>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          <a
            className="flex items-center gap-3 bg-white text-primary font-semibold rounded-l-full ml-4 pl-4 py-3 transition-transform active:scale-95"
            href="#"
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm">Dashboard</span>
          </a>
          <a
            className="flex items-center gap-3 text-on-background/70 px-8 py-3 hover:bg-[#e6e8ea] transition-all"
            href="#"
          >
            <span className="material-symbols-outlined">calendar_today</span>
            <span className="text-sm">My Sessions</span>
          </a>
          <a
            className="flex items-center gap-3 text-on-background/70 px-8 py-3 hover:bg-[#e6e8ea] transition-all"
            href="#"
          >
            <span className="material-symbols-outlined">menu_book</span>
            <span className="text-sm">Assignments</span>
          </a>
          <a
            className="flex items-center gap-3 text-on-background/70 px-8 py-3 hover:bg-[#e6e8ea] transition-all"
            href="#"
          >
            <span className="material-symbols-outlined">mail</span>
            <span className="text-sm">Messages</span>
          </a>
          <a
            className="flex items-center gap-3 text-on-background/70 px-8 py-3 hover:bg-[#e6e8ea] transition-all"
            href="#"
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm">Settings</span>
          </a>
        </nav>
        <div className="px-8 mt-6">
          <button className="w-full bg-tertiary-container text-on-tertiary-container font-bold py-3 rounded-md text-xs uppercase tracking-widest shadow-sm hover:opacity-90 transition-opacity">
            Book New Session
          </button>
        </div>
        <div className="mt-auto space-y-1">
          <a
            className="flex items-center gap-3 text-on-background/70 px-8 py-3 hover:bg-[#e6e8ea] transition-all"
            href="#"
          >
            <span className="material-symbols-outlined">help</span>
            <span className="text-sm">Support</span>
          </a>
          <a
            className="flex items-center gap-3 text-on-background/70 px-8 py-3 hover:bg-[#e6e8ea] transition-all"
            href="#"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm">Logout</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 min-h-screen">
        <header className="flex justify-between items-end mb-12">
          <div className="max-w-2xl">
            <span className="text-[0.75rem] uppercase tracking-[0.15em] font-bold text-tertiary mb-2 block">
              Panel de Administración
            </span>
            <h1 className="text-5xl font-extrabold text-primary tracking-tight leading-none">
              Visión General del Sistema
            </h1>
          </div>
          <div className="flex gap-4">
            <div className="bg-surface-container-low px-4 py-2 rounded-md flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">calendar_month</span>
              <span className="text-xs font-semibold uppercase tracking-wider">
                Octubre 2024
              </span>
            </div>
          </div>
        </header>

        {/* Top KPI Cards */}
        <section className="grid grid-cols-12 gap-6 mb-12">
          <div className="col-span-4 bg-white p-8 rounded-xl flex flex-col justify-between min-h-[180px] shadow-sm">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">group</span>
              </div>
              <span className="text-[0.65rem] font-bold text-secondary uppercase tracking-widest">
                +12% vs mes anterior
              </span>
            </div>
            <div>
              <p className="text-[0.7rem] uppercase tracking-widest font-semibold text-gray-400 mb-1">
                Total Usuarios
              </p>
              <h2 className="text-4xl font-bold text-primary">12,482</h2>
            </div>
          </div>

          <div className="col-span-5 signature-gradient p-8 rounded-xl flex flex-col justify-between text-white min-h-[180px] shadow-xl shadow-primary/10">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-white">payments</span>
              </div>
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse" />
                <span className="text-[0.65rem] font-bold uppercase tracking-widest text-white/80">
                  En Tiempo Real
                </span>
              </div>
            </div>
            <div>
              <p className="text-[0.7rem] uppercase tracking-widest font-semibold text-white/60 mb-1">
                Ingresos Plataforma
              </p>
              <h2 className="text-4xl font-bold">$42,910.00</h2>
            </div>
          </div>

          <div className="col-span-3 bg-white p-8 rounded-xl flex flex-col justify-between min-h-[180px] shadow-sm">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-lg bg-tertiary-container/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-tertiary">school</span>
              </div>
            </div>
            <div>
              <p className="text-[0.7rem] uppercase tracking-widest font-semibold text-gray-400 mb-1">
                Tutores Activos
              </p>
              <h2 className="text-4xl font-bold text-primary">856</h2>
            </div>
          </div>
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-12 gap-8 mb-12">
          <div className="col-span-8 bg-white p-8 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-bold text-primary">
                Tutorías Realizadas
              </h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-[0.65rem] font-bold uppercase text-gray-500">
                    Sesiones
                  </span>
                </div>
              </div>
            </div>
            <div className="relative h-64 flex items-end justify-between gap-1 px-4">
              <div className="absolute inset-0 flex flex-col justify-between py-2 border-l border-b border-outline-variant/20">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="w-full border-t border-dashed border-outline-variant/10" />
                ))}
              </div>
              {[40, 55, 45, 70, 60, 85, 95].map((h, i) => (
                <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-primary/10 rounded-t-sm group relative hover:bg-primary/20 transition-all">
                  <div className="absolute -top-1 w-full h-1 bg-primary" />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 px-4 text-[0.65rem] uppercase font-bold text-gray-400">
              {['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'].map(d => <span key={d}>{d}</span>)}
            </div>
          </div>

          <div className="col-span-4 bg-[#f2f4f6] p-8 rounded-xl flex flex-col justify-between shadow-sm">
            <div>
              <h3 className="text-xl font-bold text-primary mb-2">Materias</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Distribución de las materias más demandadas en el último trimestre.
              </p>
            </div>
            <div className="relative w-40 h-40 mx-auto my-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-[18px] border-primary" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%)' }} />
              <div className="absolute inset-0 rounded-full border-[18px] border-academic-gold/20" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 0% 0%, 0% 50%)' }} />
              <div className="flex flex-col items-center">
                <span className="text-3xl font-black text-primary">64%</span>
                <span className="text-[0.6rem] uppercase tracking-tighter font-bold text-gray-500">STEM Focus</span>
              </div>
            </div>
            <ul className="space-y-3">
              <li className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-xs font-semibold">Cálculo Avanzado</span>
                </div>
                <span className="text-xs font-bold">42%</span>
              </li>
              <li className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-academic-gold" />
                  <span className="text-xs font-semibold">Literatura Moderna</span>
                </div>
                <span className="text-xs font-bold">22%</span>
              </li>
              <li className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gray-300" />
                  <span className="text-xs font-semibold">Otros</span>
                </div>
                <span className="text-xs font-bold">36%</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 border-t border-[#e6e8ea] py-12 flex justify-between items-center text-[0.75rem] uppercase tracking-[0.05em] font-medium text-gray-500">
          <p>© 2024 The Academic Editorial. All rights reserved.</p>
          <div className="flex gap-8">
            {['Privacy Policy', 'Terms of Service', 'Accessibility', 'Contact'].map(link => (
              <a key={link} className="hover:text-primary transition-colors" href="#">{link}</a>
            ))}
          </div>
        </footer>
      </main>
    </div>
  );
};

export default DashboardAdmin;
