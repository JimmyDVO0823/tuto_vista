import React from 'react';
import Pagination from '../../../ui/Pagination/Pagination';
import ActivityCard from '../ActivityCard/ActivityCard';

const PendingAssignments = () => {
  const assignments = [
    { 
      title: 'Ensayo Final: Macroeconómica', 
      time: 'Vence en: 2 días', 
      subject: 'Econometría', 
      status: 'Urgente',
      initial: 'M'
    },
    { 
      title: 'Taller de Cálculo Vectorial', 
      time: 'Vence en: 5 días', 
      subject: 'Cálculo III', 
      status: 'Pendiente',
      initial: 'C'
    },
    { 
      title: 'Análisis Literario: El Quijote', 
      time: 'Vence en: 1 semana', 
      subject: 'Literatura', 
      status: 'En progreso',
      initial: 'L'
    }
  ];

  return (
    <article className="space-y-8 mt-16">
      <h2 className="text-2xl font-bold font-headline text-primary">Compromisos pendientes</h2>
      <div className="space-y-4">
        {assignments.map((item, i) => (
          <ActivityCard 
            key={i}
            initial={item.initial}
            title={item.title}
            subtitle={`${item.subject} • ${item.status}`}
            time={item.time}
            buttonText="Ver compromiso"
            actionPath="#"
          />
        ))}
      </div>
      
      {/* Pagination Component */}
      <Pagination />
    </article>
  );
};

export default PendingAssignments;
