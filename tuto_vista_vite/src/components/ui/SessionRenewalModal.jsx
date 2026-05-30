import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';

const SessionRenewalModal = () => {
  const { user, renewSession, logout } = useAuth();
  const [showWarning, setShowWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!user) {
      setShowWarning(false);
      return;
    }

    const interval = setInterval(() => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiry = payload.exp * 1000;
        const now = Date.now();
        const diff = expiry - now;

        // Mostrar advertencia si faltan menos de 5 minutos (300,000 ms)
        if (diff > 0 && diff < 300000) {
          setShowWarning(true);
          setTimeLeft(Math.floor(diff / 1000));
        } else if (diff <= 0) {
          logout();
        } else {
          setShowWarning(false);
        }
      } catch (e) {
        console.error('Error checking session expiry:', e);
      }
    }, 10000); // Check every 10s

    return () => clearInterval(interval);
  }, [user, logout]);

  const handleRenew = async () => {
    const success = await renewSession();
    if (success) {
      setShowWarning(false);
      Swal.fire({
        title: '¡Sesión Extendida!',
        text: 'Tu tiempo de estudio ha sido renovado correctamente.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    }
  };

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-primary/10 animate-in zoom-in-95 duration-300">
        <div className="bg-primary p-6 text-white relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="material-symbols-outlined !text-[80px]">history</span>
          </div>
          <h2 className="text-xl font-black font-display uppercase tracking-widest mb-1">Sesión por Expirar</h2>
          <p className="text-blue-100 text-sm italic">The Academic Editorial - Security</p>
        </div>
        
        <div className="p-8">
          <div className="flex items-center gap-4 mb-6 text-amber-600 bg-amber-50 p-4 rounded-xl border border-amber-100">
            <span className="material-symbols-outlined text-3xl">warning</span>
            <div>
              <p className="font-bold text-sm">Aviso de seguridad</p>
              <p className="text-xs opacity-80">Por tu seguridad, la sesión expirará pronto debido a inactividad.</p>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            Tu sesión terminará en <span className="font-bold text-primary">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>. 
            ¿Deseas extender tu tiempo de estudio o prefieres cerrar la sesión ahora?
          </p>
          
          <div className="flex flex-col gap-3">
            <button
              onClick={handleRenew}
              className="w-full bg-academic-gold hover:bg-academic-gold/90 text-primary font-bold py-3 px-6 rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">refresh</span>
              RENOVAR SESIÓN
            </button>
            <button
              onClick={logout}
              className="w-full bg-gray-50 hover:bg-gray-100 text-gray-500 font-bold py-3 px-6 rounded-xl transition-all border border-gray-100"
            >
              CERRAR SESIÓN
            </button>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 text-center border-t border-gray-100 italic">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">
            Protección de datos institucionales &copy; 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default SessionRenewalModal;
