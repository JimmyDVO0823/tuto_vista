import React from 'react';
import ActivityCard from '../ActivityCard/ActivityCard';
import { BotonPagoMercadoPago } from '../../../components/ui/Button/BotonPagoMercadoPago';

/**
 * Componente PorPagarSessions
 * Filtra y muestra las solicitudes aceptadas que están pendientes de pago.
 * Aplica filtros estrictos de tiempo (Solo futuro) y estado.
 */
const PorPagarSessions = ({ solicitudes = [] }) => {
  const now = new Date();

  // FILTRO ESTRICTO:
  // 1. Estado ACEPTADA
  // 2. No cancelada y no pagada (implícito en el flujo si viene del backend como solicitud aceptada)
  // 3. FECHA FUTURA (fechaPreferida + horaPreferida > now)
  const pendingPayments = solicitudes.filter(s => {
    if (s.estado?.toUpperCase() !== "ACEPTADA") return false;
    
    // Crear objeto fecha para comparar con el presente
    const dateStr = `${s.fechaPreferida}T${s.horaPreferida}`;
    const sessionDate = new Date(dateStr);
    
    return sessionDate > now;
  });

  if (pendingPayments.length === 0) {
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-primary font-headline">Por Pagar</h3>
        <p className="text-gray-400 italic text-sm">No tienes tutorías pendientes de pago por agendar.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-primary font-headline">Por Pagar</h3>
      <div className="space-y-4">
        {pendingPayments.map((soli, i) => {
          // Cálculo dinámico obligatorio
          const montoTotal = Math.round((soli.duracionMin / 60) * (soli.precioPorHora || 0));
          
          return (
            <ActivityCard 
              key={soli.id || i}
              initial={soli.materiaNombre?.charAt(0) || 'A'}
              title={soli.materiaNombre || 'Solicitud Aceptada'}
              subtitle={`Tutor: ${soli.tutorNombre || 'Pendiente'}`}
              time={`${soli.fechaPreferida} ${soli.horaPreferida}`}
              buttonText="Ver Detalles"
              actionPath="#"
              extraContent={
                <BotonPagoMercadoPago monto={montoTotal} />
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default PorPagarSessions;
