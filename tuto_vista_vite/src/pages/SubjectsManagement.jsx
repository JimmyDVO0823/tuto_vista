import React from 'react';
import MainLayout from '../components/MainLayout';

const SubjectsManagement = () => {
  const subjects = [
    { code: 'MAT-101', name: 'Cálculo Diferencial e Integral I', dept: 'Departamento de Matemáticas', status: 'ACTIVO', sem: 'Semestre A' },
    { code: 'CS-204', name: 'Programación Web Avanzada', dept: 'Ciencias de la Computación', status: 'ACTIVO', sem: 'Semestre B' },
    { code: 'FIS-102', name: 'Física Mecánica', dept: 'Departamento de Física', status: 'INACTIVO', sem: 'Semestre A' },
    { code: 'HUM-110', name: 'Ética y Pensamiento Crítico', dept: 'Humanidades y Artes', status: 'ACTIVO', sem: 'Transversal' },
  ];

  return (
    <MainLayout>
      <main className="p-12">
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <p className="text-[0.75rem] uppercase tracking-[0.15em] font-medium text-academic-gold mb-3">Administración del Sistema</p>
            <h2 className="text-5xl font-extrabold font-headline text-primary tracking-tight leading-tight">Gestión de Materias Académicas</h2>
          </div>
          <button className="signature-gradient text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 shadow-lg transition-all active:scale-95">
            <span className="material-symbols-outlined">add_circle</span>
            <span>Agregar Nueva Materia</span>
          </button>
        </header>

        <div className="bg-[#f2f4f6] p-2 rounded-2xl mb-8 flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1">
             <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
             <input className="w-full bg-white border-none rounded-xl py-4 pl-12 pr-4 text-sm" placeholder="Buscar materia..." />
          </div>
          <div className="flex gap-2">
             <button className="bg-white px-6 py-4 rounded-xl text-sm font-semibold border border-gray-100 shadow-sm">Filtros</button>
             <button className="bg-white px-6 py-4 rounded-xl text-sm font-semibold border border-gray-100 shadow-sm">Exportar</button>
          </div>
        </div>

        <section className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#f2f4f6]">
              <tr>
                {['Código', 'Nombre', 'Departamento', 'Estado', 'Acciones'].map(h => (
                  <th key={h} className="px-8 py-6 text-[0.7rem] uppercase tracking-widest font-bold text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {subjects.map(s => (
                <tr key={s.code} className="hover:bg-gray-50 transition-colors">
                  <td className="px-8 py-6"><span className="font-mono text-xs font-bold bg-[#f2f4f6] px-2 py-1 rounded">{s.code}</span></td>
                  <td className="px-8 py-6">
                    <div className="font-bold text-primary">{s.name}</div>
                    <div className="text-xs text-gray-400 mt-1">{s.sem}</div>
                  </td>
                  <td className="px-8 py-6 text-sm text-gray-500">{s.dept}</td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold ${s.status === 'ACTIVO' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="material-symbols-outlined text-gray-400 hover:text-primary transition-colors">edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <footer className="mt-20 border-t border-gray-100 py-12 flex justify-between items-center text-[0.75rem] uppercase tracking-[0.05em] font-medium text-gray-500">
          <p>© 2024 The Academic Editorial. All rights reserved.</p>
          <div className="flex gap-8">
            {['Privacy Policy', 'Terms of Service', 'Contact'].map(l => <a key={l} href="#" className="hover:text-primary transition-colors">{l}</a>)}
          </div>
        </footer>
      </main>
    </MainLayout>
  );
};

export default SubjectsManagement;
