import React, { useState, useEffect } from 'react';
import { useAuth } from "../../../context/AuthContext";
import { api } from "../../../services/api";

/**
 * NotificationsWidget Component.
 * Ofrece un historial de notificaciones con scroll dinámico y carga progresiva.
 */
const NotificationsWidget = () => {
  const { user: authUser } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(2);

  // Mapeo de configuración por tipo de notificación
  const typeConfig = {
    TUTORIA_PROXIMA: { icon: 'schedule', color: 'text-blue-500', bg: 'bg-blue-50' },
    SOLICITUD_TUTORIA: { icon: 'person_add', color: 'text-academic-gold', bg: 'bg-amber-50' },
    CANCELACION_RECHAZO: { icon: 'cancel', color: 'text-red-500', bg: 'bg-red-50' },
    NUEVA_ACTIVIDAD: { icon: 'assignment', color: 'text-green-500', bg: 'bg-green-50' },
    MENSAJE_RECIBIDO: { icon: 'chat', color: 'text-purple-500', bg: 'bg-purple-50' },
    DEFAULT: { icon: 'notifications', color: 'text-gray-500', bg: 'bg-gray-50' }
  };

  useEffect(() => {
    if (authUser?.id) {
      api.get(`/users/${authUser.id}/notifications`)
        .then(data => {
          setNotifications(data || []);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error cargando notificaciones:", err);
          setLoading(false);
        });
    }
  }, [authUser]);

  const displayedNotifications = notifications.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 3, notifications.length));
  };

  if (loading) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="text-xs text-gray-400 mt-4 font-bold uppercase tracking-widest">Cargando...</p>
      </div>
    );
  }

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
          maxHeight: visibleCount > 3 ? '240px' : 'auto' 
        }}
      >
        {notifications.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-4">No tienes notificaciones pendientes.</p>
        ) : (
          displayedNotifications.map((notif, i) => {
            const config = typeConfig[notif.tipo] || typeConfig.DEFAULT;
            return (
              <div 
                key={i} 
                className="flex gap-4 items-start animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                {/* Icono dinámico según el tipo */}
                <div className={`w-8 h-8 rounded-full ${config.bg} shrink-0 flex items-center justify-center`}>
                  <span className={`material-symbols-outlined text-[18px] ${config.color} select-none`}>
                    {config.icon}
                  </span>
                </div>
                
                {/* Contenido */}
                <div className="flex-1">
                  <p className="text-xs leading-relaxed text-gray-600">
                    <span className="font-bold text-primary">{notif.user}</span> {notif.msg}
                  </p>
                  <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-wider">
                    {notif.time}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Botón "Ver más" */}
      {visibleCount < notifications.length && (
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