import React from 'react';

const TutorAgendaDetail = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f7f9fb] font-body">
      <nav className="bg-white/80 backdrop-blur-md text-primary sticky top-0 z-50 px-8 py-4 flex justify-between items-center border-b border-gray-50">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold tracking-tight">The Academic Editorial</span>
          <div className="hidden md:flex gap-6">
            <a className="text-primary font-bold border-b-2 border-primary pb-1" href="#">Find Tutors</a>
            {['Library', 'Resources'].map(l => <a key={l} className="text-gray-400 hover:text-primary transition-colors" href="#">{l}</a>)}
          </div>
        </div>
        <div className="flex gap-4">
          <button className="signature-gradient text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md">Apply to Tutor</button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-xl overflow-hidden bg-gray-100">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCopCHV2ZDx_Q50c6ss_dSttliSlWxRcuB3j78PD9jMgssnjdTqzDV5CmU5gsB__J2pCebxMFmzm7tSuGy8ZZb9rW5zhG6NGzkOyqgsxr91Imxo5f-n1yw1VA09JUcPNdgRNOTDLtEK5mVRlKWA3FxA7ub7gGyr65SGDx5Sm_ExaLuhR9nlKyUalCjAHMWYWYt2EX2lzce9prXzxxOwS2O3dlsvjuBKDAtXSl0qGP4ucrejNw8gvzu10R2yeSBpUTGung0qvafNNbIa" alt="Tutor" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl flex gap-8">
               <div className="text-center">
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Sesiones</p>
                  <p className="text-2xl font-bold text-primary">1.2k+</p>
               </div>
               <div className="text-center">
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Rating</p>
                  <p className="text-2xl font-bold text-primary">4.9</p>
               </div>
            </div>
          </div>

          <div className="lg:col-span-7 pt-4">
            <span className="bg-academic-gold/10 text-academic-gold font-bold px-3 py-1 rounded-full text-xs tracking-wider uppercase mb-6 inline-block">Tutor Senior de Humanidades</span>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-primary tracking-tight mb-8">Dr. Sebastian Valdés</h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mb-8">Especialista en Literatura Comparada y Retórica Académica con más de 10 años de experiencia guiando a estudiantes de posgrado.</p>
            <div className="flex flex-wrap gap-3">
               {['Escritura de Tesis', 'Pensamiento Crítico', 'Literatura Siglo XIX'].map(tag => (
                  <span key={tag} className="px-5 py-2.5 bg-white rounded-xl text-primary font-semibold shadow-sm border border-gray-100">{tag}</span>
               ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-[#f2f4f6] rounded-xl p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-primary mb-8">Disponibilidad Semanal</h2>
            <div className="grid grid-cols-5 gap-4">
               {['Lun 14', 'Mar 15', 'Mie 16', 'Jue 17', 'Vie 18'].map((day, i) => (
                  <div key={day} className="space-y-4">
                     <p className="text-center font-bold text-primary border-b border-gray-200 pb-2">{day}</p>
                     <button className="w-full py-3 bg-white rounded-lg text-xs font-bold hover:bg-primary hover:text-white transition-colors">09:00 AM</button>
                     <button className="w-full py-3 bg-white rounded-lg text-xs font-bold hover:bg-primary hover:text-white transition-colors">11:00 AM</button>
                  </div>
               ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 sticky top-24">
               <h3 className="text-xl font-bold text-primary mb-6">Detalles de Reserva</h3>
               <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Sesión Editorial</span> <span className="font-bold">60 Minutos</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Tarifa</span> <span className="text-2xl font-bold font-headline">$45.00</span></div>
               </div>
               <button className="signature-gradient w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg active:scale-95 transition-transform">Agendar Clase</button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#f7f9fb] border-t border-gray-100 w-full py-12 px-8 flex justify-between items-center text-[0.75rem] uppercase tracking-widest text-gray-400">
         <p>© 2024 THE ACADEMIC EDITORIAL</p>
         <div className="flex gap-8">
            {['Privacy', 'Terms', 'Contact'].map(l => <a key={l} href="#" className="hover:text-primary transition-colors">{l}</a>)}
         </div>
      </footer>
    </div>
  );
};

export default TutorAgendaDetail;
