import React, { useState } from 'react';

/**
 * NotificationsWidget Component.
 * Ofrece un historial de notificaciones con scroll dinámico y carga progresiva.
 */
const NotificationsWidget = () => {
  // 1. Dataset de prueba (Puedes migrarlo a props o consumirlo desde un useEffect)
  const allNotifications = [
    { user: 'Elena Martínez', msg: 'Subió nuevos recursos para Cálculo.', time: '2h' },
    { user: 'Dr. Smith', msg: 'Confirmó tu sesión de mañana.', time: '5h' },
    { user: 'Carlos Mendoza', msg: 'Te dejó una reseña de 5 estrellas.', time: '1d' },
    { user: 'Sistema', msg: 'Tu pago de la sesión #102 ha sido procesado.', time: '2d' },
    { user: 'Lucía Fernández', msg: 'Envió un mensaje nuevo al chat.', time: '3d' },
    { user: 'Soporte Técnico', msg: 'Tu solicitud de asistencia fue resuelta.', time: '5d' },
  ];

  // 2. Estado para controlar cuántos elementos renderizar
  const [visibleCount, setVisibleCount] = useState(2);

  // Filtramos la lista según el número visible actual
  const displayedNotifications = allNotifications.slice(0, visibleCount);

  // Manejador para cargar más elementos de forma progresiva
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 3, allNotifications.length));
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-6 max-w-md w-full">
      {/* Encabezado */}
      <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">
        Notificaciones
      </h3>

      {/* Contenedor con Scrollbar condicional */}
      <div 
        className={`space-y-5 overflow-y-auto pr-1 no-scrollbar transition-all duration-300`}
        style={{ 
          // Si hay más de 3 notificaciones visibles, limita el alto para forzar el scrollbar
          maxHeight: visibleCount > 3 ? '240px' : 'auto' 
        }}
      >
        {displayedNotifications.map((notif, i) => (
          <div 
            key={i} 
            className="flex gap-4 items-start animate-in fade-in slide-in-from-bottom-2 duration-300"
          >
            {/* Avatar ficticio */}
            <div className="w-8 h-8 rounded-full bg-mini-gray shrink-0 flex items-center justify-center text-xs font-bold text-gray-500 select-none">
              {notif.user.charAt(0)}
            </div>
            
            {/* Contenido */}
            <div className="flex-1">
              <p className="text-xs leading-relaxed text-gray-600">
                <span className="font-bold text-primary">{notif.user}</span> {notif.msg}
              </p>
              <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-wider">
                {notif.time} ago
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Botón "Ver más" sutil estilo Academic Blue */}
      {visibleCount < allNotifications.length && (
        <div className="pt-2 border-t border-gray-50 flex justify-start">
          <button
            type="button"
            onClick={handleLoadMore}
            className="text-xs font-bold text-academic-blue hover:text-blue-800 transition-colors bg-transparent border-none p-0 cursor-pointer outline-none focus:underline"
          >
            Ver más
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationsWidget;