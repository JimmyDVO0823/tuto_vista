import React from 'react';
import MainLayout from '../components/MainLayout';
import TutorSearchHeader from '../components/TutorSearchHeader';
import SearchFilters from '../components/SearchFilters';
import TutorCard from '../components/TutorCard';
import Pagination from '../components/Pagination';

const TutorsExplorer = () => {
  const tutors = [
    { name: 'Dr. Elena Martínez', subject: 'Cálculo Multivariable', rating: 4.9, bio: 'Experta en análisis matemático aplicados a ingeniería.', image: 'https://i.pravatar.cc/150?u=elena' },
    { name: 'Lic. Roberto Cano', subject: 'Literatura Latinoamericana', rating: 4.7, bio: 'Especialista en narrativa del siglo XX y análisis crítico.', image: 'https://i.pravatar.cc/150?u=robert' },
    { name: 'Dra. Sarah Jenkins', subject: 'Bioquímica Celular', rating: 5.0, bio: 'Investigadora senior con enfoque en procesos metabólicos.', image: 'https://i.pravatar.cc/150?u=sarah' },
    { name: 'Mtra. Clara Luz', subject: 'Historia del Arte', rating: 4.8, bio: 'Curadora y académica apasionada por el renacimiento.', image: 'https://i.pravatar.cc/150?u=clara' },
    { name: 'Ing. Marco Polo', subject: 'Física Cuántica', rating: 4.6, bio: 'Divulgador científico y experto en mecánica teórica.', image: 'https://i.pravatar.cc/150?u=marco' },
    { name: 'Dra. Isabela Riva', subject: 'Economía Política', rating: 4.9, bio: 'Consultora internacional en modelos económicos sostenibles.', image: 'https://i.pravatar.cc/150?u=isabela' },
  ];

  return (
    <MainLayout>
      <main className="flex-1 p-10 min-h-screen">
        <TutorSearchHeader />
        
        <div className="grid grid-cols-12 gap-10 mt-12">
          {/* Filters Column */}
          <aside className="col-span-3">
             <SearchFilters />
          </aside>

          {/* Results Column */}
          <section className="col-span-9 space-y-10">
             <div className="grid grid-cols-2 gap-8">
               {tutors.map((tutor, i) => (
                 <TutorCard key={i} tutor={tutor} />
               ))}
             </div>
             
             <div className="pt-10 border-t border-gray-100 flex justify-center">
               <Pagination />
             </div>
          </section>
        </div>

        <footer className="mt-24 pt-10 border-t border-gray-100 flex justify-between items-center opacity-40 grayscale">
           <p className="text-[10px] font-bold uppercase tracking-widest text-primary">© 2024 THE ACADEMIC EDITORIAL</p>
           <div className="flex gap-6">
             {['Directory', 'Resource Hub', 'Tutor Guidelines'].map(l => <a key={l} href="#" className="text-[10px] font-bold uppercase tracking-widest hover:text-primary transition-colors">{l}</a>)}
           </div>
        </footer>
      </main>
    </MainLayout>
  );
};

export default TutorsExplorer;