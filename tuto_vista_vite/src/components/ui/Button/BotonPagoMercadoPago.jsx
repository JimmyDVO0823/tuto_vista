import React, { useState, useEffect } from 'react';
import { api } from '../../../services/api';

export const BotonPagoMercadoPago = ({ monto, solicitudId }) => {
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Aseguramos que el componente solo se active en el cliente para evitar errores de hidratación
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePagar = async () => {
    if (!isClient) return;
    
    setLoading(true);
    const montoFinal = Math.round(monto); // Evitar decimales que MP rechaza en COP
    
    console.log(`Iniciando pago para solicitud ${solicitudId} por $${montoFinal}`);
    
    try {
      // 1. Llamamos a nuestro backend de Spring Boot para generar el enlace
      const response = await api.post('/pagos/crear-preferencia', { monto: montoFinal, solicitudId });
      
      console.log("Respuesta de preferencia recibida:", response);
      
      // 2. Redirigimos directamente al estudiante a la pasarela segura de Mercado Pago
      if (response && response.urlPago) {
        window.location.href = response.urlPago;
      } else {
        throw new Error(response.error || "No se recibió una URL de pago válida.");
      }
    } catch (error) {
      console.error("Error al iniciar Mercado Pago:", error);
      alert(`Error al conectar con el servidor de pagos: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) {
    return <div className="w-full h-12 bg-gray-100 rounded-md animate-pulse"></div>;
  }

  return (
    <div className="w-full space-y-2">
      <button
        onClick={handlePagar}
        disabled={loading}
        className="w-full signature-gradient text-white px-4 py-3.5 rounded-md font-bold text-sm shadow-md hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
      >
        <span className="material-symbols-outlined text-lg">credit_card</span>
        {loading ? 'Redirigiendo a la pasarela...' : `Pagar con Mercado Pago ($${Math.round(monto).toLocaleString()})`}
      </button>
      <p className="text-[10px] text-gray-400 text-center italic">
        Tip: Si el formulario se bloquea, intenta usar Modo Incógnito o revisa tu conexión.
      </p>
    </div>
  );
};