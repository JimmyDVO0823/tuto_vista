import React from 'react';
import Sidebar from '../components/Sidebar';

const TutorsExplorer = () => {
  return (
    <div className="bg-[#f7f9fb] font-body text-on-surface flex min-h-screen">
      <Sidebar />
      
      <div className="flex-1 ml-64 flex flex-col">
        <main className="flex-1 p-12 max-w-[1400px]">
          <TutorSearchHeader />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutorsData.map((tutor, index) => (
              <TutorCard key={index} {...tutor} />
            ))}
          </div>
          
          <Pagination />
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default TutorsExplorer;