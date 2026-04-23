import React from 'react';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import AcademicCalendar from '../components/features/dashboard/AcademicCalendar/AcademicCalendar';

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

               <AcademicCalendar />
            </div>
         </main>
      </div>
    </MainLayout>
  );
};

export default DispoManagement;
