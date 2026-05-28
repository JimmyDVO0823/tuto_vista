import React from 'react';

const TutorProfileSidebar = ({ tutor }) => {
  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(tutor.nombre_completo)}&background=002045&color=fff&size=200`;

  return (
    <aside className="col-span-12 lg:col-span-4 space-y-12">
      <div className="aspect-[4/5] bg-surface-container-low rounded-2xl overflow-hidden shadow-ambient relative group">
        <img src={tutor.url_avatar || defaultAvatar} alt={tutor.nombre_completo} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <span className="text-white text-xs uppercase font-bold tracking-widest font-display">
            {tutor.anios_experiencia} años de experiencia
          </span>
        </div>
      </div>

      <div className="space-y-8">
        <h3 className="text-sm font-bold uppercase tracking-widest text-primary border-b border-outline-variant/10 pb-4 font-headline">
          Materias que dicta
        </h3>
        <div className="flex flex-wrap gap-2">
          {tutor.materias?.map(m => (
            <span key={m.id} className="px-4 py-2 bg-surface-container-lowest text-primary text-xs font-bold rounded-full border border-outline-variant/20 shadow-sm font-display">
              {m.nombre}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default TutorProfileSidebar;
