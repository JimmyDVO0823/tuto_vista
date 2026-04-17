import React from 'react';
import Sidebar from '../components/Sidebar';

/**
 * DashboardStudent - The Academic Editorial
 * Authority: Design System Specification
 */
const DashboardStudent = () => {
  // Mock Data
  const sessions = [
    {
      id: 1,
      date: '24',
      month: 'Oct',
      subject: 'Econometría Avanzada',
      tutor: 'Dr. Elena Martínez',
      time: '14:00 - 15:30',
      type: 'primary',
    },
    {
      id: 2,
      date: '26',
      month: 'Oct',
      subject: 'Escritura Académica II',
      tutor: 'Prof. Marcus Thorne',
      time: '10:00 - 11:00',
      type: 'secondary',
    },
  ];

  const notifications = [
    {
      id: 1,
      user: 'Elena Martínez',
      text: 'ha respondido a tu pregunta sobre Series de Tiempo.',
      time: 'Hace 15 min',
      icon: 'chat_bubble',
      color: 'secondary',
    },
    {
      id: 2,
      user: 'ensayo de Microeconomía',
      text: 'ha sido calificado: A+',
      time: 'Hace 2 horas',
      icon: 'check_circle',
      color: 'tertiary',
    },
    {
      id: 3,
      user: 'Dr. Smith',
      text: 'Recordatorio: La sesión de hoy ha sido reprogramada.',
      time: 'Hace 5 horas',
      icon: 'event_busy',
      color: 'error',
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#f7f9fb] font-body">
      {/* Side Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-10 max-w-7xl mx-auto">
        {/* Top bar search & Profile */}
        <header className="flex justify-between items-center mb-12">
          <div className="relative w-full max-w-md">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#191c1e]/40">
              search
            </span>
            <input
              type="text"
              placeholder="Buscar tutorías, recursos o tareas..."
              className="w-full bg-[#f2f4f6] border-none rounded-full py-3 pl-12 pr-6 text-sm focus:ring-2 focus:ring-[#002045]/10 transition-all outline-none"
            />
          </div>
          <div className="flex items-center gap-6">
            <button className="material-symbols-outlined text-[#191c1e]/60 hover:text-[#002045] transition-colors p-2 rounded-full hover:bg-white">
              notifications
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrX3MgmjX7nnU8SlNIBtb9ZbSbbTxbHxvmJJYG2WO12XYw9itxmqCFFjIQFVSSzFgdAWJf_B603GZo4N22Gd5wph5dzYuI3NNB6c1OO1H-xD4Hs9GvhMysFCtLxu6yc6ycWSNxgiHf35P8Uojcx_rJLeKsmuS7AkUEj_VrvzUkqxdG28G1EP4Ceu4PDdS6IElKBpvaC-58mLioExT7LfxrEW2sRjL-Uo6CIQXS7nMlhkBpQxBA-kFh9PeJUVv-esroLOUkBz8PeFyo"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Hero Heading with Intentional Asymmetry */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-academic-gold mb-3 font-body">
              Resumen Académico
            </p>
            <h1 className="text-5xl font-extrabold tracking-tight text-primary leading-tight font-display mb-4">
              Bienvenido de nuevo,{' '}
              <span className="text-primary/40 italic">Julian.</span>
            </h1>
            <p className="text-[#191c1e]/70 max-w-lg text-lg leading-relaxed">
              Has completado el 85% de tus objetivos semanales. Tus próximas 48
              horas están dedicadas a la investigación avanzada.
            </p>
          </div>
          <div className="flex gap-10 items-center">
            <div className="text-right">
              <p className="text-4xl font-black text-primary font-display">12</p>
              <p className="text-[10px] uppercase font-bold text-[#191c1e]/50 tracking-widest mt-1">
                Horas este mes
              </p>
            </div>
            <div className="h-12 w-px bg-[#191c1e]/10" />
            <div className="text-right">
              <p className="text-4xl font-black text-primary font-display">4.9</p>
              <p className="text-[10px] uppercase font-bold text-[#191c1e]/50 tracking-widest mt-1">
                Promedio GPA
              </p>
            </div>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Main Column (8) */}
          <div className="md:col-span-8 space-y-10">
            {/* Upcoming Sessions Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-primary font-display">
                  Próximas Tutorías
                </h2>
                <button className="text-sm font-bold text-primary flex items-center gap-1 hover:translate-x-1 transition-transform">
                  Ver todo el calendario
                  <span className="material-symbols-outlined !text-[18px]">
                    arrow_right_alt
                  </span>
                </button>
              </div>

              <div className="space-y-4">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className="bg-white p-6 rounded-xl flex items-center gap-6 group hover:translate-x-2 transition-all duration-300"
                  >
                    <div className="w-16 h-16 rounded-lg bg-[#f2f4f6] flex flex-col items-center justify-center text-primary border border-black/[0.03]">
                      <span className="text-[10px] font-bold uppercase tracking-widest">
                        {session.month}
                      </span>
                      <span className="text-2xl font-black leading-none">
                        {session.date}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-2 h-2 rounded-full ${session.type === 'primary' ? 'bg-academic-gold' : 'bg-primary/30'}`} />
                        <h3 className="text-lg font-bold text-primary font-display">
                          {session.subject}
                        </h3>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-medium text-[#191c1e]/60">
                        <span className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined !text-[16px]">
                            account_circle
                          </span>
                          {session.tutor}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined !text-[16px]">
                            schedule
                          </span>
                          {session.time}
                        </span>
                      </div>
                    </div>
                    <button className={`${session.type === 'primary' ? 'signature-gradient text-white shadow-lg shadow-[#002045]/20' : 'bg-[#f2f4f6] text-[#002045]'} px-6 py-3 rounded-md font-bold text-sm transition-all active:scale-95`}>
                      {session.type === 'primary' ? 'Unirse a sesión' : 'Detalles'}
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Stats & Progress */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-[#f2f4f6] p-8 rounded-xl relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="text-[10px] font-bold text-[#002045]/50 mb-6 uppercase tracking-[0.2em] font-body">
                    Progreso del Semestre
                  </h3>
                  <div className="flex items-end justify-between font-display">
                    <span className="text-5xl font-black text-[#002045]">
                      78%
                    </span>
                    <span className="text-xs font-bold text-[#cba72f] flex items-center gap-1 pb-2">
                      <span className="material-symbols-outlined !text-[16px]">
                        trending_up
                      </span>
                      +5% vs mes anterior
                    </span>
                  </div>
                  <div className="mt-6 w-full h-1.5 bg-white rounded-full overflow-hidden">
                    <div className="h-full bg-[#002045] w-[78%] rounded-full" />
                  </div>
                </div>
              </div>

              <div className="signature-gradient p-8 rounded-xl relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="text-[10px] font-bold text-white/50 mb-6 uppercase tracking-[0.2em] font-body">
                    Próxima Entrega
                  </h3>
                  <p className="text-white text-lg font-bold mb-3 font-display leading-tight">
                    Tesis: Capítulo 3 - Metodología de Investigación
                  </p>
                  <div className="flex items-center gap-2 text-[#cba72f]">
                    <span className="material-symbols-outlined !text-[20px]">
                      timer
                    </span>
                    <span className="text-sm font-black uppercase tracking-widest">
                      4 Días restantes
                    </span>
                  </div>
                </div>
                {/* Texture Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.03] rounded-full -mr-16 -mt-16 blur-xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/[0.03] rounded-full -ml-12 -mb-12 blur-xl" />
              </div>
            </section>
          </div>

          {/* Sidebar Column (4) */}
          <aside className="md:col-span-4 space-y-8">
            {/* Notifications Card */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-black/[0.02]">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-[#002045] font-display">Notificaciones</h2>
                <span className="bg-red-50 text-red-600 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                  3 NUEVAS
                </span>
              </div>
              
              <div className="space-y-6">
                {notifications.map((notif) => (
                  <div key={notif.id} className="flex gap-4 group cursor-default">
                    <div className={`mt-1 w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      notif.color === 'secondary' ? 'bg-[#002045]/5 text-[#002045]' : 
                      notif.color === 'tertiary' ? 'bg-[#cba72f]/10 text-[#cba72f]' : 
                      'bg-red-50 text-red-500'
                    }`}>
                      <span className="material-symbols-outlined !text-[18px]">
                        {notif.icon}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-[#191c1e] leading-snug">
                        <strong className="font-bold">{notif.user}</strong> {notif.text}
                      </p>
                      <span className="text-[10px] font-bold text-[#191c1e]/40 uppercase tracking-widest mt-1 inline-block">
                        {notif.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-10 py-3 border border-[#f2f4f6] rounded-md text-[10px] font-black text-[#002045]/60 hover:text-[#002045] uppercase tracking-[0.2em] hover:bg-[#f2f4f6] transition-all">
                Marcar todas como leídas
              </button>
            </div>

            {/* Quick Resources */}
            <div className="bg-[#f2f4f6] p-8 rounded-xl">
              <h3 className="text-[10px] font-bold text-[#002045]/50 mb-6 uppercase tracking-[0.2em] font-body">
                Recursos Sugeridos
              </h3>
              <div className="space-y-3">
                {['Guía APA 7ma Edición', 'Calculadora Stata Online', 'Repositorio de Tesis 2023'].map((resource) => (
                  <button key={resource} className="w-full p-4 bg-white rounded-lg flex items-center gap-3 hover:translate-x-1 transition-transform group text-left">
                    <span className="material-symbols-outlined !text-[20px] text-[#002045]/40 group-hover:text-[#002045] transition-colors">
                      description
                    </span>
                    <span className="text-sm font-bold text-[#002045]">{resource}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Simplified Editorial Footer */}
        <footer className="mt-24 pt-10 border-t border-[#191c1e]/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-60 hover:opacity-100 transition-opacity">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#191c1e]/60">
            © 2024 THE ACADEMIC EDITORIAL — A PREMIER LEARNING EXPERIENCE
          </p>
          <div className="flex gap-8">
            {['Privacy', 'Legal', 'Press'].map((item) => (
              <a key={item} href="#" className="text-[10px] font-bold uppercase tracking-widest hover:text-[#002045] transition-colors">
                {item}
              </a>
            ))}
          </div>
        </footer>
      </main>
    </div>
  );
};

export default DashboardStudent;
