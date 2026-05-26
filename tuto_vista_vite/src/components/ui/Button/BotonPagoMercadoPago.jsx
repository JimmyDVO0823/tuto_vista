import React, { useState } from 'react';
import { api } from '../../../services/api';

export const BotonPagoMercadoPago = ({ monto }) => {
  const [loading, setLoading] = useState(false);

  const handlePagar = async () => {
    const montoFinal = Math.round(monto);
    
    // GUARD: Evitar peticiones con monto 0 o negativo que rompen el backend/MP
    if (!montoFinal || montoFinal <= 0) {
      console.error("Monto inválido para pago:", montoFinal);
      alert("Error: El monto de la tutoría no es válido ($0). Contacta al administrador.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/pagos/crear-preferencia', { monto: montoFinal });
      
      if (response && response.urlPago) {
        window.location.href = response.urlPago;
      } else {
        alert("No se recibió una URL de pago válida.");
      }
    } catch (error) {
      console.error("Error al iniciar Mercado Pago:", error);
      alert("Error al conectar con el servidor de pagos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-2">
      <button
        onClick={handlePagar}
        disabled={loading}
        className="w-full signature-gradient text-white px-4 py-3.5 rounded-md font-bold text-sm shadow-md hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <span className="material-symbols-outlined text-lg">credit_card</span>
        {loading ? 'Redirigiendo a la pasarela...' : `Pagar con Mercado Pago ($${Math.round(monto).toLocaleString()})`}
      </button>
      <p className="text-[10px] text-gray-400 text-center italic">
        Tip: Si el formulario se bloquea en Sandbox, intenta usar Modo Incógnito o selecciona PSE (Simulación).
      </p>
    </div>
  );
};