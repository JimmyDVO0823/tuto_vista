import React from 'react';
import MainLayout from '../components/layout/MainLayout/MainLayout';

const MyTutorsHistory = () => {
  const tableData = [
    { subject: 'Cálculo Multivariable', category: 'Ingeniería', tutor: 'Dra. Elena Martínez', date: '15 May, 2024', time: '14:00 - 15:30', status: 'Completada', color: 'green' },
    { subject: 'Literatura Comparada', category: 'Humanidades', tutor: 'Lic. Roberto Cano', date: '22 May, 2024', time: '10:00 - 11:00', status: 'Pendiente', color: 'amber' },
    { subject: 'Bioquímica Celular', category: 'Ciencias', tutor: 'Dra. Sarah Jenkins', date: '12 May, 2024', time: '16:30 - 18:00', status: 'Cancelada', color: 'gray' },
    { subject: 'Historia del Arte', category: 'Artes', tutor: 'Mtra. Clara Luz', date: '08 May, 2024', time: '09:00 - 10:00', status: 'Completada', color: 'green', rating: '5.0' },
  ];

  return (
    <MainLayout>
      <main className="p-10">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-academic-gold uppercase tracking-widest mb-2 block">Académico</span>
            <h1 className="text-5xl font-extrabold text-primary tracking-tight font-display">Mi Historial de Tutorías</h1>
          </div>
          <div className="relative w-80">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
            <input className="w-full pl-12 pr-4 py-3 bg-white rounded-full border border-gray-100 shadow-sm outline-none focus:ring-2 focus:ring-primary/10 transition-all" placeholder="Buscar materia..." />
          </div>
        </header>

        <section className="bg-white rounded-xl shadow-sm border border-gray-50 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#f2f4f6]">
              <tr>
                {['Materia', 'Tutor', 'Fecha', 'Hora', 'Estado', 'Acciones'].map(h => (
                  <th key={h} className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {tableData.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-8 py-6">
                    <span className="font-bold text-primary block">{row.subject}</span>
                    <span className="text-xs text-gray-400">{row.category}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/150?u=${row.tutor}`} alt={row.tutor} />
                      </div>
                      <span className="text-sm font-medium text-primary">{row.tutor}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm">{row.date}</td>
                  <td className="px-8 py-6 text-sm">{row.time}</td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      row.color === 'green' ? 'bg-green-100 text-green-700' : 
                      row.color === 'amber' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    {row.rating ? (
                       <span className="text-xs font-bold text-academic-gold flex items-center justify-end gap-1">
                         <span className="material-symbols-outlined text-[14px]">star</span> {row.rating}
                       </span>
                    ) : (
                      <button className="text-xs font-bold text-primary hover:underline">Acción</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <footer className="mt-24 pt-10 border-t border-gray-100 flex justify-between items-center opacity-60">
           <p className="text-[10px] font-bold uppercase tracking-widest">© 2024 THE ACADEMIC EDITORIAL</p>
           <div className="flex gap-6">
             {['Privacy', 'Legal', 'Contact'].map(l => <a key={l} href="#" className="text-[10px] font-bold uppercase tracking-widest hover:text-primary">{l}</a>)}
           </div>
        </footer>
      </main>
    </MainLayout>
  );
};

export default MyTutorsHistory;
