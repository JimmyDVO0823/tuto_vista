import React from 'react';

const ReportsComponent = ({ reportes, handleResolverReporte, totalElements }) => {
  return (
    <div className="space-y-6">
      <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-primary font-display flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">gavel</span>
            Reportes Pendientes de Revisión
          </h3>
          <span className="text-xs text-gray-500 font-semibold bg-surface-container-low px-3 py-1 rounded">Total: {totalElements || reportes.length}</span>
        </div>
        {reportes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <span className="material-symbols-outlined text-gray-300 text-5xl mb-2">assignment_turned_in</span>
            <p className="text-sm">No hay reportes registrados en la plataforma.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {reportes.map(r => (
              <div key={r.id} className="p-5 border border-outline-variant/10 rounded-xl bg-surface-container-low/50 hover:border-outline-variant/30 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-primary">Reporte #{r.id}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded uppercase border border-red-100">
                      {r.motivo}
                    </span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${r.estado === 'PENDIENTE' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-green-50 text-green-700 border border-green-200'
                      }`}>
                      {r.estado}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Reportado por ID: <strong>{r.reportadoPorId}</strong> a ID: <strong>{r.reportadoAId}</strong>
                    {r.sesionId && <> en sesión: <strong>#{r.sesionId}</strong></>}
                  </p>
                  <p className="text-sm text-primary mt-2 italic bg-surface-container-lowest p-3 rounded border border-outline-variant/5">
                    "{r.descripcion}"
                  </p>
                </div>
                {r.estado === 'PENDIENTE' && (
                  <button
                    onClick={() => handleResolverReporte(r.id)}
                    className="px-5 py-2 bg-primary hover:bg-primary-hover text-white rounded-md text-xs font-bold shadow transition-all shrink-0 self-end md:self-center"
                  >
                    Marcar Resuelto
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsComponent;
