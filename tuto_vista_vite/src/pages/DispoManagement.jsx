import React from 'react';
import MainLayout from '../components/MainLayout';

const DispoManagement = () => {
  return (
    <MainLayout>
      <div className="flex flex-col flex-1">
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-10 px-8 py-4 flex justify-between items-center">
           <span className="text-xl font-bold text-primary font-display">Configuración de Horarios</span>
           <div className="flex gap-4">
              <button className="px-6 py-2 bg-primary text-white rounded-full text-sm font-bold shadow-md hover:bg-primary/90 transition-all">Guardar Cambios</button>
           </div>
        </header>

        <main className="flex-1 p-10">
            <div className="max-w-5xl mx-auto">
               <header className="mb-12">
                  <h1 className="text-4xl font-extrabold text-primary font-display mb-4">Gestión de Disponibilidad</h1>
                  <p className="text-gray-600 text-lg">Define tus horarios de enseñanza para el semestre.</p>
               </header>

               <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="grid grid-cols-8 border-b border-gray-100 bg-[#f2f4f6]">
                     <div className="p-4 bg-gray-50 flex items-center justify-center">
                        <span className="material-symbols-outlined text-gray-400">schedule</span>
                     </div>
                     {['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'].map(d => (
                        <div key={d} className="p-4 text-center">
                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{d}</p>
                        </div>
                      ))}
                  </div>
                  <div className="h-[500px] relative bg-white">
                     {/* Mock Calendar Content */}
                     <div className="absolute inset-0 flex items-center justify-center text-gray-300 italic">
                        Contenedor de Calendario Interactivo
                     </div>
                  </div>
               </div>
            </div>
         </main>
      </div>
    </MainLayout>
  );
};

export default DispoManagement;
