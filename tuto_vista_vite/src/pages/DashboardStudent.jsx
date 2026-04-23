import React from 'react';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import NextSessions from '../components/features/dashboard/NextSessions/NextSessions';
import PendingAssignments from '../components/features/dashboard/PendingAssignments/PendingAssignments';

const DashboardStudent = () => {

  return (
    <MainLayout>
      <main className="p-10">
        <header className="flex justify-between items-end mb-16">
          <div className="max-w-2xl">
            <p className="text-[0.75rem] uppercase tracking-[0.15em] font-medium text-academic-gold mb-3">Estudiante Pregrado</p>
            <h1 className="text-6xl font-extrabold font-headline text-primary tracking-tight leading-tight">Mi Librería de Aprendizaje</h1>
          </div>
          <div className="flex gap-4">
             <div className="bg-white px-5 py-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
               <span className="material-symbols-outlined text-academic-gold">military_tech</span>
               <span className="text-xs font-bold uppercase tracking-widest">Scholar Level 4</span>
             </div>
          </div>
        </header>

        <section className="grid grid-cols-12 gap-10 mb-20">
          <article className="col-span-8">
            <NextSessions />
            <PendingAssignments />
          </article>

          <aside className="col-span-4 space-y-10">
             <div className="bg-[#f2f4f6] p-8 rounded-2xl space-y-6">
                <h3 className="text-xl font-bold text-primary border-b border-gray-200 pb-4">Progreso Semestral</h3>
                <div className="space-y-4">
                   <div className="flex justify-between items-end">
                      <span className="text-xs font-bold uppercase text-gray-500">Objetivo del Semestre</span>
                      <span className="text-2xl font-black text-primary">78%</span>
                   </div>
                   <div className="h-2 w-full bg-white rounded-full overflow-hidden">
                      <div className="h-full bg-academic-gold w-[78%]"></div>
                   </div>
                </div>
                <div className="pt-4 space-y-3">
                   <div className="flex items-center gap-3 text-sm font-bold text-primary">
                      <span className="material-symbols-outlined text-green-500">check_circle</span>
                      <span>Ensayo de Filosofía entregado</span>
                   </div>
                   <div className="flex items-center gap-3 text-sm font-bold text-gray-400">
                      <span className="material-symbols-outlined">pending</span>
                      <span>Revisión de Tesis pendiente</span>
                   </div>
                </div>
             </div>

             <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Notificaciones</h3>
                <div className="space-y-5">
                   {[
                     { user: 'Elena Martínez', msg: 'Subió nuevos recursos para Cálculo.', time: '2h' },
                     { user: 'Dr. Smith', msg: 'Confirmó tu sesión de mañana.', time: '5h' }
                   ].map((notif, i) => (
                     <div key={i} className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-mini-gray shrink-0"></div>
                        <div className="flex-1">
                           <p className="text-xs leading-relaxed"><span className="font-bold text-primary">{notif.user}</span> {notif.msg}</p>
                           <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase">{notif.time} ago</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </aside>
        </section>
      </main>
    </MainLayout>
  );
};

export default DashboardStudent;
