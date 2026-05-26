import React from 'react';
import ActivityCard from '../ActivityCard/ActivityCard';
import { BotonPagoMercadoPago } from '../../../components/ui/Button/BotonPagoMercadoPago';

const PorPagarSessions = ({ sessions = [] }) => {
  const now = new Date();

  const pendingPayments = sessions.filter(s => {
    // Flexibilidad: validamos si viene como pagada, pagado, o estadoPago
    const isPaid = s.pagada === true || s.pagado === true || s.estadoPago === 'COMPLETADO' || s.estadoPago === 'APROBADO';
    const isUnpaid = !isPaid; // Si no está pagada, está por pagar
    
    const isNotCancelled = s.estado?.toUpperCase() !== 'CANCELADA' && s.estado?.toUpperCase() !== 'RECHAZADA';
    
    // Normalizamos la fecha reemplazando el espacio por 'T' si es necesario
    const dateFormatted = s.programadaPara ? s.programadaPara.replace(" ", "T") : null;
    const sessionDate = dateFormatted ? new Date(dateFormatted) : null;
    const isFuture = sessionDate && !isNaN(sessionDate) ? sessionDate > now : true; // Si hay error de fecha, la dejamos pasar por seguridad

    return isUnpaid && isNotCancelled && isFuture;
  });

  if (pendingPayments.length === 0) {
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-primary font-headline">Por Pagar</h3>
        <p className="text-gray-400 italic text-sm">No tienes tutorías pendientes de pago.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-primary font-headline">Por Pagar</h3>
      <div className="space-y-4">
        {pendingPayments.map((sesion, i) => {
          // FÓRMULA OBLIGATORIA CON VALIDACIÓN CONTRA CEROS o UNDEFINED
          const precioHora = sesion.precioPorHora || sesion.precioHora || 0;
          const duracion = sesion.duracionMin || 60;
          const montoCalculado = Math.round((duracion / 60) * precioHora);
          
          return (
            <ActivityCard 
              key={sesion.id || i}
              initial={sesion.materiaNombre?.charAt(0) || 'A'}
              title={sesion.materiaNombre || 'Tutoría'}
              subtitle={`Tutor: ${sesion.tutorNombre || 'Pendiente'} • Valor: $${montoCalculado.toLocaleString('es-CO')} COP`}
              time={sesion.programadaPara ? new Date(sesion.programadaPara.replace(" ", "T")).toLocaleString() : 'Fecha pendiente'}
              buttonText="Ver Detalles"
              actionPath="#"
              extraContent={
                montoCalculado > 0 ? (
                  <BotonPagoMercadoPago monto={montoCalculado} />
                ) : (
                  <p className="text-red-500 text-xs font-bold">Error: Tarifa del tutor en $0</p>
                )
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default PorPagarSessions;