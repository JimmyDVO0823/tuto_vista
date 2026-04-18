import React from 'react';
import MainLayout from '../components/layout/MainLayout';

const UsersManagement = () => {
  const users = [
    { id: '#AE-2091', name: 'Elena Martínez', email: 'elena.mtz@editorial.edu', role: 'Tutor', status: 'Activo', color: 'green' },
    { id: '#AE-2092', name: 'Carlos Ruiz', email: 'c.ruiz98@campus.com', role: 'Estudiante', status: 'Bloqueado', color: 'error' },
    { id: '#AE-2095', name: 'Sofía Alarcón', email: 'sofia.tutora@editorial.edu', role: 'Tutor', status: 'Activo', color: 'green' },
    { id: '#AE-2101', name: 'Juan Pérez', email: 'j.perez@estudiante.es', role: 'Estudiante', status: 'Activo', color: 'green' },
  ];

  return (
    <MainLayout>
      <main className="min-h-screen">
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-10 px-8 py-4 flex justify-between items-center w-full">
          <div className="flex items-center gap-8">
            <span className="text-xl font-bold tracking-tight text-primary font-display">Administración de Usuarios</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">search</span>
                <input className="pl-10 pr-4 py-2 bg-[#f2f4f6] rounded-full border-none text-sm w-64" placeholder="Buscar..." />
             </div>
          </div>
        </header>

        <section className="p-8 space-y-8">
           <div className="flex justify-between items-end">
              <div className="max-w-2xl">
                 <p className="text-xs font-bold text-academic-gold uppercase tracking-widest mb-2 font-body">Panel de Control</p>
                 <h2 className="text-4xl font-extrabold text-primary leading-tight font-display">Gestión de Usuarios</h2>
              </div>
           </div>

           <div className="grid grid-cols-4 gap-6">
              {[
                { label: 'Total Usuarios', value: '2,842' },
                { label: 'Tutores Activos', value: '158' },
                { label: 'Crecimiento', value: '+12%', color: 'text-green-600' },
                { label: 'Promedio Rating', value: '4.8' }
              ].map(s => (
                <div key={s.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-50">
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{s.label}</p>
                   <p className={`text-3xl font-black ${s.color || 'text-primary'}`}>{s.value}</p>
                </div>
              ))}
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-gray-50 overflow-hidden">
             <table className="w-full text-left">
                <thead className="bg-[#f2f4f6]">
                   <tr>
                      {['ID', 'Usuario', 'Rol', 'Estado', 'Acciones'].map(h => (
                        <th key={h} className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">{h}</th>
                      ))}
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                   {users.map(u => (
                     <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-mono text-gray-500">{u.id}</td>
                        <td className="px-6 py-4">
                           <p className="text-sm font-bold text-primary">{u.name}</p>
                           <p className="text-xs text-gray-400">{u.email}</p>
                        </td>
                        <td className="px-6 py-4"><span className="px-3 py-1 bg-mini-gray rounded-full text-[10px] font-bold uppercase">{u.role}</span></td>
                        <td className="px-6 py-4">
                           <span className={`text-xs font-bold ${u.status === 'Activo' ? 'text-green-600' : 'text-red-500'}`}>{u.status}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                           <button className="text-primary material-symbols-outlined">more_vert</button>
                        </td>
                     </tr>
                   ))}
                </tbody>
             </table>
           </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default UsersManagement;
