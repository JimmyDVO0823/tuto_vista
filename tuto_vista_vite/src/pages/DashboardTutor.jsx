import React, { useEffect, useState } from 'react';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import IncomeChart from '../components/features/dashboard/Rechart/IncomeChart';


const DashboardTutor = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [stats, setStats] = useState({
    hoursThisMonth: 0,
    averageRating: 0,
    incomeLastMonth: 0
  });

  useEffect(() => {
    if (user?.id) {
      // Cargar sesiones próximas
      api.get(`/sesiones/tutor/${user.id}`)
         .then(data => setSessions(data || []))
         .catch(err => console.error('Error cargando sesiones:', err));

      // Cargar estadísticas
      api.get(`/tutores/${user.id}/stats`)
         .then(data => setStats(data))
         .catch(err => console.error('Error cargando estadísticas:', err));
    }
  }, [user]);

  return (
    <MainLayout>
      <main className="p-10">
        <header className="flex justify-between items-end mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.1em] text-academic-gold mb-2">
              Panel del Instructor
            </p>
            <h1 className="text-5xl font-extrabold font-headline text-primary tracking-tight">
              Bienvenido, {user?.name || 'Tutor'}.
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
            { 
              label: 'Horas dictadas este mes', 
              value: stats.hoursThisMonth?.toFixed(1) || '0.0', 
              icon: 'history_edu', 
              color: 'border-primary' 
            },
            { 
              label: 'Calificación promedio', 
              value: stats.averageRating?.toFixed(2) || '0.00', 
              icon: 'star', 
              color: 'border-academic-gold', 
              highlight: stats.averageRating >= 4.5 ? 'TOP' : null 
            },
            { 
              label: 'Ingresos el mes pasado', 
              value: new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(stats.incomeLastMonth || 0), 
              icon: 'payments', 
              gradient: true 
            }
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
        <IncomeChart />
        {/* Session List */}
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8 space-y-6">
            <h2 className="text-2xl font-bold font-headline text-primary tracking-tight">Próximas Sesiones</h2>
            <div className="space-y-4">
              {sessions.length > 0 ? sessions.map((s, i) => (
                <div key={s.id || i} className="bg-white p-6 rounded-lg flex items-center justify-between group hover:translate-x-2 transition-transform duration-300 shadow-sm border border-gray-50">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-mini-gray overflow-hidden border-2 border-white flex items-center justify-center text-xl font-bold text-gray-500">
                      {s.estudianteNombre ? s.estudianteNombre.charAt(0) : 'E'}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-primary">{s.estudianteNombre || `Estudiante ${i+1}`}</h4>
                      <p className="text-sm text-gray-500">{s.materiaNombre || 'Materia Académica'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-primary font-bold mb-1">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      <span>{s.programadaPara ? new Date(s.programadaPara).toLocaleString([], { timeZone: 'UTC' }) : 'Pendiente'}</span>
                    </div>
                    <span className="text-[0.65rem] uppercase tracking-widest font-bold text-academic-gold px-2 py-1 bg-academic-gold/10 rounded">
                      {s.estado || 'Programada'}
                    </span>
                  </div>
                </div>
              )) : (
                <p className="text-gray-500">No tienes sesiones programadas.</p>
              )}
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
    </MainLayout>
  );
};

export default DashboardTutor;
