import React from 'react';

const DashboardTutor = () => {
  return (
    <div className="flex min-h-screen bg-surface font-body">
      {/* SideNavBar */}
      <aside className="bg-[#f2f4f6] text-[#002045] h-screen w-64 fixed left-0 top-0 flex flex-col py-8 z-40">
        <div className="px-8 mb-10">
          <span className="text-lg font-black tracking-widest uppercase font-headline">
            ACADEMIC
          </span>
        </div>
        <div className="flex flex-col items-center mb-10 px-8">
          <div className="relative w-20 h-20 mb-4">
            <img
              className="w-20 h-20 rounded-full object-cover shadow-sm"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJAQYEI1ONEC-mzpKSEt9vnJG9CJyzsuMfDyrNhWVCNlyTm2jAPaQt0E3w4L7ZH4HaeJDR45WGkge4WuQn6OkpEhNU97aewYgbQMlVi4gnjZX9Mo0bUZV_46C1h3BIhMHEqq-x0_6yg5_MINRVSRPq6my8MVV5pLnxvDaxpMRtE24M4TO01UN0AFHNiTqnPkkfBeguutbMFEqRahg9SD43YXM_IDyJQDjyU3WG29_QvykFCKDJddq9Bpg0h75hxKUyTJKbRvfvd-hI"
              alt="Tutor Profile"
            />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-academic-gold rounded-full border-2 border-[#f2f4f6]" />
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
            className="bg-white text-[#002045] font-semibold rounded-l-full ml-4 pl-4 py-3 flex items-center gap-3 transition-all"
            href="#"
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </a>
          {['My Sessions', 'Assignments', 'Messages', 'Settings'].map((item, i) => (
            <a
              key={item}
              className="text-[#191c1e]/70 px-8 py-3 flex items-center gap-3 hover:bg-[#e6e8ea] transition-all"
              href="#"
            >
              <span className="material-symbols-outlined">
                {['calendar_today', 'menu_book', 'mail', 'settings'][i]}
              </span>
              <span>{item}</span>
            </a>
          ))}
        </nav>
        <div className="px-8 mt-auto flex flex-col gap-4">
          <button className="signature-gradient text-white font-bold py-3 px-4 rounded-xl text-sm shadow-md transition-transform active:scale-95">
            Book New Session
          </button>
          <div className="space-y-1 border-t border-[#e6e8ea] pt-6">
            <a className="text-[#191c1e]/70 py-2 flex items-center gap-3 hover:text-[#002045] transition-colors" href="#">
              <span className="material-symbols-outlined">help</span>
              <span className="text-xs uppercase tracking-wider font-medium">Support</span>
            </a>
            <a className="text-[#191c1e]/70 py-2 flex items-center gap-3 hover:text-[#002045] transition-colors" href="#">
              <span className="material-symbols-outlined">logout</span>
              <span className="text-xs uppercase tracking-wider font-medium">Logout</span>
            </a>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-10 min-h-screen">
        <header className="flex justify-between items-end mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.1em] text-academic-gold mb-2">
              Panel del Instructor
            </p>
            <h1 className="text-5xl font-extrabold font-headline text-primary tracking-tight">
              Bienvenido, Julian.
            </h1>
          </div>
          <div className="bg-white p-4 rounded-xl flex items-center gap-6 shadow-sm border border-gray-100">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Estado</p>
              <p className="text-sm font-semibold text-primary">Disponible para clases</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input defaultChecked className="sr-only peer" type="checkbox" />
              <div className="w-14 h-7 bg-gray-200 rounded-full peer peer-checked:bg-academic-gold after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:translate-x-full" />
            </label>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-12 gap-6 mb-12">
          {[
            { label: 'Horas dictadas este mes', value: '128.5', icon: 'history_edu', color: 'border-primary' },
            { label: 'Calificación promedio', value: '4.92', icon: 'star', color: 'border-academic-gold', highlight: 'TOP' },
            { label: 'Ingresos totales', value: '$4,850.00', icon: 'payments', gradient: true }
          ].map((stat, i) => (
            <div key={i} className={`col-span-4 p-8 rounded-lg shadow-sm flex flex-col justify-between h-48 ${stat.gradient ? 'signature-gradient text-white' : `bg-white border-l-4 ${stat.color}`}`}>
              <span className={`material-symbols-outlined text-4xl self-end ${stat.gradient ? 'text-white/30' : 'text-gray-200'}`}>
                {stat.icon}
              </span>
              <div>
                <h3 className={`text-xs font-medium uppercase tracking-widest mb-1 ${stat.gradient ? 'text-white/60' : 'text-gray-400'}`}>
                  {stat.label}
                </h3>
                <div className="flex items-center gap-2">
                  <p className={`text-4xl font-bold font-headline ${stat.gradient ? 'text-white' : 'text-primary'}`}>
                    {stat.value}
                  </p>
                  {stat.highlight && (
                    <span className="text-academic-gold font-bold text-sm bg-academic-gold/10 px-2 py-0.5 rounded">
                      {stat.highlight}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Session List */}
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8 space-y-6">
            <h2 className="text-2xl font-bold font-headline text-primary tracking-tight">Clases de Hoy</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="bg-white p-6 rounded-lg flex items-center justify-between group hover:translate-x-2 transition-transform duration-300 shadow-sm border border-gray-50">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-mini-gray overflow-hidden border-2 border-white">
                      <img src={`https://i.pravatar.cc/150?u=student${s}`} alt="Student" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-primary">Estudiante {s}</h4>
                      <p className="text-sm text-gray-500">Materia Académica • Nivel Avanzado</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-primary font-bold mb-1">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      <span>09:00 - 10:30 AM</span>
                    </div>
                    <span className="text-[0.65rem] uppercase tracking-widest font-bold text-academic-gold px-2 py-1 bg-academic-gold/10 rounded">
                      Programada
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="col-span-4 space-y-8">
            <div className="bg-academic-gold/10 text-primary p-8 rounded-lg relative overflow-hidden">
               <h3 className="font-headline font-bold text-xl mb-3">Sugerencia Editorial</h3>
               <p className="text-sm leading-relaxed mb-6 opacity-90">Mejora tus materiales para el próximo trimestre.</p>
               <button className="bg-primary text-white py-2 px-6 rounded-md text-xs font-bold uppercase tracking-wider">Revisar Biblioteca</button>
            </div>
          </aside>
        </div>
      </main>

      <footer className="mt-20 border-t border-gray-100 py-12 flex justify-between items-center text-[0.75rem] uppercase tracking-[0.05em] font-medium text-gray-500 ml-64 w-[calc(100%-16rem)] px-10">
        <p>© 2024 The Academic Editorial. All rights reserved.</p>
        <div className="flex gap-8">
          {['Privacy Policy', 'Terms of Service', 'Accessibility', 'Contact'].map(link => (
            <a key={link} className="hover:text-primary transition-colors" href="#">{link}</a>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default DashboardTutor;
