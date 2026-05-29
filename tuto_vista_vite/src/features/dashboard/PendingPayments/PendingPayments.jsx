/**
 * @fileoverview Dashboard Feature - Pending Payments Registry
 * @module components/features/dashboard/PendingPayments
 * @description Manages accepted tutor requests awaiting payment.
 * Integrates server-side pagination for better performance.
 */

import React, { useState, useEffect } from 'react';
import Pagination from '../../../components/ui/Pagination/Pagination';
import ActivityCard from '../ActivityCard/ActivityCard';
import { BotonPagoSimulado } from '../../../components/ui/Button/BotonPagoSimulado';
import { api } from '../../../services/api';

const PendingPayments = ({ userId, onSelectPayment }) => {
  const [paymentsData, setPaymentsData] = useState({
    content: [],
    totalPages: 0,
    currentPage: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchPayments = async (page = 0) => {
    try {
      setLoading(true);
      const response = await api.get(`/solicitudes/estudiante/${userId}/por-pagar`, { page, size: 4 });
      setPaymentsData(response);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchPayments(0);
    }
  }, [userId]);

  const handlePageChange = (newPage) => {
    fetchPayments(newPage);
  };

  return (
    <article className="space-y-6">
      <h3 className="text-2xl font-bold text-primary font-headline">Por Pagar</h3>
      
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {paymentsData.content.length > 0 ? paymentsData.content.map((soli, i) => {
            const montoTotal = Math.round((soli.duracionMin / 60) * (soli.precioPorHora || 0));
            return (
              <ActivityCard
                key={soli.id || i}
                initial={soli.materiaNombre?.charAt(0) || "A"}
                title={soli.materiaNombre || "Solicitud Aceptada"}
                subtitle={`Tutor: ${soli.tutorNombre || "Pendiente"}`}
                time={`${soli.fechaPreferida} ${soli.horaPreferida}`}
                buttonText="Ver Detalles"
                actionPath="#"
                extraContent={
                  <BotonPagoSimulado monto={montoTotal} solicitudId={soli.id} />
                }
              />
            );
          }) : (
            <p className="text-gray-400 italic text-sm">
              No tienes tutorías pendientes de pago.
            </p>
          )}
        </div>
      )}

      {!loading && paymentsData.totalPages > 1 && (
        <Pagination 
          currentPage={paymentsData.currentPage}
          totalPages={paymentsData.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </article>
  );
};

export default PendingPayments;
