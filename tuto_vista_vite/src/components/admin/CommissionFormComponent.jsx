import React from 'react';

const CommissionFormComponent = ({ comision, setComision, handleGuardarComision }) => {
  return (
    <div className="max-w-md bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-primary font-display mb-2 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">percent</span>
        Comisión de la Plataforma
      </h3>
      <p className="text-gray-500 text-xs mb-6">
        Modifica el porcentaje que la plataforma deduce a los tutores en cada transacción de tutoría cobrada.
      </p>
      <form onSubmit={handleGuardarComision} className="space-y-4">
        <div>
          <label className="text-xs font-bold text-elegant-gray uppercase block mb-1">Porcentaje de Comisión (%)</label>
          <div className="relative">
            <input
              type="number"
              min="0"
              max="100"
              value={comision}
              onChange={e => setComision(e.target.value === '' ? 0 : parseInt(e.target.value))}
              className="w-full pl-4 pr-12 py-3 bg-surface-container-low rounded border border-outline-variant/30 text-sm text-primary font-bold"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-primary font-bold">%</span>
          </div>
        </div>
        <button
          type="submit"
          className="w-full signature-gradient text-white font-bold py-3 rounded-md text-xs shadow hover:shadow-lg transition-all"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default CommissionFormComponent;
