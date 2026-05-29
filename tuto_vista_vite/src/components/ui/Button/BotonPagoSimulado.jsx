import React, { useState } from 'react';
import { api } from '../../../services/api';

export const BotonPagoSimulado = ({ monto, solicitudId, onPagoExitoso }) => {
  const [loading, setLoading] = useState(false);

  const handlePagar = async () => {
    setLoading(true);
    console.log(`[Modo Demo] Procesando simulación y abriendo Mercado Pago para solicitud ${solicitudId}`);
    
    try {
      // 1. Lógica interna: Registramos el pago simulado en el backend para cambiar estados en BD
      await api.post('/pagos/simular', { solicitudId });
      console.log("✅ Lógica de pago simulado completada con éxito en el backend.");

      // 2. Impacto Visual: Solicitamos la preferencia de Mercado Pago para abrir la pasarela real
      try {
        const response = await api.get(`/pagos/preferencia/${solicitudId}`);
        if (response && response.init_point) {
          console.log("🔗 Redirigiendo visualmente a Mercado Pago...");
          // Abrir Mercado Pago en una nueva pestaña para demostración
          window.open(response.init_point, '_blank');
        }
      } catch (mpError) {
        // Si Mercado Pago llega a fallar por red o credenciales, el flujo de la app NO se detiene
        console.warn("⚠️ No se pudo cargar la pestaña de Mercado Pago, pero el pago ya fue simulado.", mpError);
      }
      
      // 3. Notificar al flujo de React que el pago ya fue exitoso (para actualizar la UI)
      if (onPagoExitoso) {
        onPagoExitoso();
      } else {
        window.location.reload();
      }
      
    } catch (error) {
      console.error("❌ Error general en el proceso de pago:", error);
      alert("Error al procesar el pago. Por favor intente de nuevo.");
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
        {loading ? 'Procesando Pago Seguro...' : `Pagar con Mercado Pago ($${Math.round(monto).toLocaleString()})`}
      </button>
      <p className="text-[10px] text-primary/60 text-center italic font-medium">
        Entorno de Evaluación: Se simulará el éxito del pago y se abrirá la pasarela de Mercado Pago.
      </p>
    </div>
  );
};