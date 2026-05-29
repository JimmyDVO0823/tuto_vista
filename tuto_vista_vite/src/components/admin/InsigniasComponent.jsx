import React from 'react';
import BadgeIcon from '../common/BadgeIcon';

const InsigniasComponent = ({ insignias, handleEditarInsignia }) => {
  return (
    <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-primary font-display mb-4">Insignias Existentes</h3>
      {insignias.length === 0 ? (
        <p className="text-gray-500 text-sm">No hay insignias creadas todavía.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {insignias.map(badge => (
            <div key={badge.id} className="p-4 border border-outline-variant/10 rounded-xl bg-surface-container-low flex justify-between items-center group/item hover:border-academic-gold/30 transition-all">
              <div className="flex gap-3 items-center">
                <BadgeIcon insignia={badge} size="md" />
                <div>
                  <h4 className="font-bold text-primary text-sm flex items-center gap-1.5">{badge.nombre}</h4>
                  <p className="text-xs text-gray-500 line-clamp-1 mb-1">{badge.descripcion}</p>
                  <span className="text-[10px] font-extrabold uppercase bg-primary/10 text-primary px-2 py-0.5 rounded tracking-wide">
                    {badge.condicionTipo}: {badge.condicionValor}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleEditarInsignia(badge)}
                className="p-2 text-academic-gold opacity-0 group-hover/item:opacity-100 transition-all hover:bg-academic-gold/5 rounded-full"
              >
                <span className="material-symbols-outlined text-base">edit</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InsigniasComponent;
