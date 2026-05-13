import React from 'react';
import MainLayout from '../components/layout/MainLayout/MainLayout';

const DashboardAdmin = () => {
  return (
    <MainLayout>
      <main className="p-8">
        <header className="flex justify-between items-end mb-12">
          <div className="max-w-2xl">
            <span className="text-[0.75rem] uppercase tracking-[0.15em] font-bold text-academic-gold mb-2 block">
              Panel de Administración
            </span>
            <h1 className="text-5xl font-extrabold text-primary tracking-tight leading-none">
              Visión General del Sistema
            </h1>
          </div>
          <div className="flex gap-4">
            <div className="bg-white px-4 py-2 rounded-md border border-gray-100 shadow-sm flex items-center gap-2">
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
              <span className="text-[0.65rem] font-bold text-academic-gold uppercase tracking-widest">
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
                <span className="w-2 h-2 rounded-full bg-academic-gold animate-pulse" />
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
              <div className="w-12 h-12 rounded-lg bg-academic-gold/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-academic-gold">school</span>
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
               <div className="absolute inset-0 flex flex-col justify-between py-2 border-l border-b border-gray-100">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="w-full border-t border-dashed border-gray-50" />
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
      </main>
    </MainLayout>
  );
};

export default DashboardAdmin;
