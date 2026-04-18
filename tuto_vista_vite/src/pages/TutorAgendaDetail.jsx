import React from 'react';
import MainLayout from '../components/layout/MainLayout';

const TutorAgendaDetail = () => {
  return (
    <MainLayout>
      <main className="flex-1 p-12 min-h-screen">
        <header className="mb-16 flex items-start justify-between">
           <div className="max-w-2xl">
              <span className="text-xs font-bold text-academic-gold uppercase tracking-[0.2em] mb-4 block">Perfiles Sugeridos</span>
              <h1 className="text-6xl font-extrabold text-primary tracking-tight font-display mb-6 leading-tight">Dra. Elena Martínez</h1>
              <p className="text-xl text-gray-500 leading-relaxed italic border-l-4 border-mini-gray pl-6">
                "La educación no es llenar un cubo, sino encender un fuego."
              </p>
           </div>
           <div className="flex flex-col items-end gap-4">
              <div className="flex gap-1 text-academic-gold">
                {[1, 2, 3, 4, 5].map(i => <span key={i} className="material-symbols-outlined text-[20px]">star</span>)}
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">4.9 Average Rating</span>
           </div>
        </header>

        <section className="grid grid-cols-12 gap-16">
           <aside className="col-span-4 space-y-12">
              <div className="aspect-[4/5] bg-mini-gray rounded-2xl overflow-hidden shadow-sm grayscale hover:grayscale-0 transition-all duration-700">
                 <img src="https://i.pravatar.cc/500?u=elena" alt="Elena" className="w-full h-full object-cover" />
              </div>

              <div className="space-y-8">
                 <h3 className="text-sm font-bold uppercase tracking-widest text-primary border-b border-gray-100 pb-4">Especialidades</h3>
                 <div className="flex flex-wrap gap-2">
                    {['Cálculo I', 'Álgebra Lineal', 'Métodos Numéricos', 'Física II'].map(s => (
                      <span key={s} className="px-4 py-2 bg-white text-primary text-xs font-bold rounded-full border border-gray-100 shadow-sm">{s}</span>
                    ))}
                 </div>
              </div>

              <div className="bg-[#f2f4f6] p-10 rounded-2xl space-y-6">
                 <h3 className="text-xl font-bold text-primary">Logros Académicos</h3>
                 <ul className="space-y-4">
                    {[
                      { icon: 'workspace_premium', text: 'PhD en Matemáticas Puras' },
                      { icon: 'history_edu', text: '12+ Años de experiencia' },
                      { icon: 'verified', text: 'Tutor Destacado 2023' }
                    ].map(a => (
                      <li key={a.text} className="flex gap-4 items-center text-sm font-medium">
                        <span className="material-symbols-outlined text-academic-gold">{a.icon}</span>
                        <span>{a.text}</span>
                      </li>
                    ))}
                 </ul>
              </div>
           </aside>

           <article className="col-span-8 space-y-16">
              <div className="space-y-6">
                 <h2 className="text-3xl font-bold text-primary tracking-tight">Agenda Semestral</h2>
                 <p className="text-gray-500 leading-relaxed text-lg">
                    Elena se especializa en acompañar a estudiantes de ingeniería en las áreas más complejas del análisis matemático. Sus sesiones son conocidas por su claridad conceptual y enfoque editorial.
                 </p>
              </div>

              <div className="bg-white rounded-3xl p-10 shadow-xl shadow-primary/5 border border-gray-50">
                 <div className="flex justify-between items-center mb-10">
                    <h4 className="font-bold text-lg">Seleccione un espacio disponible</h4>
                    <div className="flex gap-2">
                       <button className="p-2 bg-mini-gray rounded-full material-symbols-outlined">chevron_left</button>
                       <button className="p-2 bg-mini-gray rounded-full material-symbols-outlined">chevron_right</button>
                    </div>
                 </div>

                 <div className="grid grid-cols-5 gap-4">
                    {['LUN', 'MAR', 'MIE', 'JUE', 'VIE'].map(day => (
                      <div key={day} className="space-y-4">
                        <span className="text-[10px] font-bold text-gray-400 block text-center uppercase tracking-widest mb-6">{day}</span>
                        {[1, 2, 3].map(h => (
                           <button key={h} className="w-full py-4 rounded-xl text-xs font-bold transition-all border border-gray-100 hover:border-academic-gold hover:text-academic-gold hover:bg-academic-gold/5">
                              09:00 AM
                           </button>
                        ))}
                      </div>
                    ))}
                 </div>

                 <div className="mt-12 pt-10 border-t border-gray-100 flex justify-between items-center">
                    <div>
                       <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Inversión por Sesión</p>
                       <p className="text-3xl font-black text-primary">$45.00 <span className="text-sm font-medium text-gray-400">/ 1.5h</span></p>
                    </div>
                    <button className="signature-gradient text-white px-10 py-5 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all">
                       Solicitar Tutoría
                    </button>
                 </div>
              </div>
           </article>
        </section>
      </main>
    </MainLayout>
  );
};

export default TutorAgendaDetail;
