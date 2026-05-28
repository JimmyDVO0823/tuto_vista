import React from 'react';

/**
 * Componente para mostrar una insignia de tutor usando Material Symbols de Google.
 * @param {Object} insignia - Objeto de insignia (nombre, descripcion, urlIcono)
 * @param {string} size - 'sm', 'md', 'lg'
 */
const BadgeIcon = ({ insignia, size = 'md' }) => {
  if (!insignia) return null;

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  };

  const iconClasses = {
    sm: 'text-[16px]',
    md: 'text-[24px]',
    lg: 'text-[32px]'
  };

  // Si urlIcono tiene valor, usa ese; si viene null/vacío, usa el icono por defecto
  const googleIconName = insignia.urlIcono ? insignia.urlIcono : 'workspace_premium';

  return (
    <div 
      className={`group relative flex items-center justify-center rounded-full bg-academic-gold/5 border border-academic-gold/20 shadow-sm transition-all hover:scale-110 hover:bg-academic-gold/10 ${sizeClasses[size]}`}
      title={insignia.nombre}
    >
      {/* Renderizado único y directo usando la fuente de Google */}
      <span 
        className={`material-symbols-outlined text-academic-gold ${iconClasses[size]}`} 
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        {googleIconName}
      </span>

      {/* Tooltip Editorial */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 p-3 bg-primary text-white rounded-xl text-[10px] leading-relaxed opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-xl border border-white/10 pointer-events-none">
        <p className="font-bold uppercase tracking-widest text-academic-gold mb-1">{insignia.nombre}</p>
        <p className="opacity-90">{insignia.descripcion}</p>
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-primary"></div>
      </div>
    </div>
  );
};

export default BadgeIcon;