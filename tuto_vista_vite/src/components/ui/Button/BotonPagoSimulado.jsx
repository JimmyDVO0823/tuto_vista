import React, { useState } from 'react';
import { api } from '../../../services/api';

export const BotonPagoSimulado = ({ monto, solicitudId, onPagoExitoso }) => {
  const [loading, setLoading] = useState(false);

  const handlePagar = async () => {
    setLoading(true);
    console.log(`Iniciando checkout de Mercado Pago para solicitud ${solicitudId} por $${monto}`);
    
    try {
      // Obtenemos la preferencia desde el backend
      const response = await api.get(`/pagos/preferencia/${solicitudId}`);
      
      if (response && response.init_point) {
        console.log("Preferencia creada con éxito, redirigiendo a Mercado Pago...");
        // Abrir Mercado Pago en una nueva pestaña
        window.open(response.init_point, '_blank');
        
        // Opcional: Podrías llamar a onPagoExitoso si el flujo fuera puramente simulado, 
        // pero aquí el usuario quiere la pestaña de Mercado Pago.
        // onPagoExitoso(); 
      } else {
        throw new Error("No se recibió el punto de inicio de Mercado Pago.");
      }
      
    } catch (error) {
      console.error("Error al iniciar el pago con Mercado Pago:", error);
      alert("Error al procesar el pago con Mercado Pago. Por favor intente de nuevo.");
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
        {loading ? 'Preparando pago...' : `Pagar con Mercado Pago ($${Math.round(monto).toLocaleString()})`}
      </button>
      <p className="text-[10px] text-primary/60 text-center italic font-medium">
        Serás redirigido a la pestaña de pago seguro de Mercado Pago.
      </p>
    </div>
  );
};
