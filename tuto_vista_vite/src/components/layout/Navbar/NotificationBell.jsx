import React, { useState, useEffect, useRef } from 'react';
import { api } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';

const NotificationBell = ({ isCollapsed }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const fetchNotifications = async () => {
    if (!user) return;
    try {
      const data = await api.get(`/api/v1/notificaciones/unread/${user.id}`);
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = async (id) => {
    try {
      await api.patch(`/api/v1/notificaciones/${id}/read`);
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const unreadCount = notifications.length;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={`flex items-center gap-3 p-2.5 rounded-xl hover:bg-black/5 transition-all relative group ${
          isCollapsed ? 'justify-center w-10 h-10' : 'w-full px-4'
        }`}
      >
        <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">notifications</span>
        
        {!isCollapsed && (
          <span className="text-sm font-bold text-primary font-body animate-in slide-in-from-left-2 transition-all">
            Notificaciones
          </span>
        )}

        {unreadCount > 0 && (
          <span className={`absolute bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm ${
            isCollapsed ? 'top-1 right-1 px-1.5 py-0.5 min-w-[18px] h-[18px]' : 'right-4 px-2 py-0.5'
          }`}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className={`absolute ${isCollapsed ? 'left-14 top-0' : 'left-0 mt-2'} w-80 bg-white shadow-xl rounded-xl z-[100] border border-black/5 overflow-hidden animate-in fade-in zoom-in duration-200`}>
          <div className="p-4 border-b border-black/5 flex justify-between items-center bg-surface-container-low">
            <h3 className="font-bold text-primary text-sm uppercase tracking-wider font-display">Notificaciones</h3>
            <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-full font-bold">
              {unreadCount} Pendientes
            </span>
          </div>
          
          <div className="max-h-[400px] overflow-y-auto no-scrollbar">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <span className="material-symbols-outlined text-4xl mb-2 opacity-20">notifications_off</span>
                <p className="text-xs">No tienes notificaciones pendientes</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div 
                  key={n.id} 
                  className="p-4 border-b border-black/5 hover:bg-black/[0.02] transition-colors cursor-pointer group flex gap-3 items-start"
                  onClick={() => markAsRead(n.id)}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary text-lg">
                      {n.tipo === 'MENSAJE_RECIBIDO' ? 'chat' : 
                       n.tipo === 'SOLICITUD_TUTORIA' ? 'person_add' : 'info'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-primary mb-1">{n.user}</p>
                    <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed">{n.msg}</p>
                    <p className="text-[9px] text-gray-400 mt-2 flex items-center gap-1">
                      <span className="material-symbols-outlined !text-[12px]">schedule</span>
                      {n.time}
                    </p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" title="Marcar como leída"></div>
                </div>
              ))
            )}
          </div>
          
          {notifications.length > 0 && (
            <div className="p-3 text-center border-t border-black/5 bg-surface-container-lowest">
              <button 
                className="text-[10px] text-primary/60 hover:text-primary font-bold uppercase tracking-tighter transition-colors"
                onClick={() => setShowDropdown(false)}
              >
                Cerrar Panel
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
