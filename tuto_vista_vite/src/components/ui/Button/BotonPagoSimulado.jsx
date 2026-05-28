import React, { useState } from 'react';
import { api } from '../../../services/api';

export const BotonPagoSimulado = ({ monto, solicitudId, onPagoExitoso }) => {
  const [loading, setLoading] = useState(false);

  const handlePagar = async () => {
    setLoading(true);
    console.log(`Iniciando pago SIMULADO para solicitud ${solicitudId} por $${monto}`);
    
    try {
      // Llamamos al nuevo endpoint de simulación
      await api.post('/pagos/simular', { solicitudId });
      
      console.log("Pago simulado completado con éxito");
      
      if (onPagoExitoso) {
        onPagoExitoso();
      } else {
        // Recargar para ver cambios si no hay callback
        window.location.reload();
      }
      
    } catch (error) {
      console.error("Error en el pago simulado:", error);
      alert("Error al procesar el pago simulado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-2">
      <button
        onClick={handlePagar}
        disabled={loading}
        className="w-full signature-gradient text-white px-4 py-3.5 rounded-md font-bold text-sm shadow-md hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
      >
        <span className="material-symbols-outlined text-lg">payments</span>
        {loading ? 'Procesando simulación...' : `Pagar Tutoría ($${Math.round(monto).toLocaleString()})`}
      </button>
      <p className="text-[10px] text-primary/60 text-center italic font-medium">
        Modo de Prueba: Simulación de pago instantánea habilitada.
      </p>
    </div>
  );
};
