import React from 'react';

const DepartmentFormComponent = ({ departamentos, nuevoDept, setNuevoDept, handleCrearDepartamento }) => {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold text-primary font-display mb-4">Departamentos</h3>

        <form onSubmit={handleCrearDepartamento} className="flex gap-2 mb-6 items-end">
          <div className="flex-1">
            <label className="text-xs font-bold text-elegant-gray uppercase block mb-1">Nuevo Departamento</label>
            <input
              type="text"
              value={nuevoDept}
              onChange={e => setNuevoDept(e.target.value)}
              className="w-full px-3 py-2 bg-surface-container-low rounded border border-outline-variant/30 text-sm text-primary"
              placeholder="Ej. Ingeniería de Sistemas"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 signature-gradient text-white rounded text-xs font-bold shadow hover:shadow-lg transition-all"
          >
            Añadir
          </button>
        </form>

        <h4 className="text-xs font-bold text-elegant-gray uppercase tracking-widest mb-3">Departamentos Creados ({departamentos.length})</h4>
      </div>

      <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/10 max-h-60 overflow-y-auto space-y-2 no-scrollbar">
        {departamentos.map(d => (
          <div key={d.id} className="px-3 py-2 bg-surface-container-lowest border border-outline-variant/5 rounded text-sm text-primary font-medium flex justify-between items-center">
            <span>{d.nombre}</span>
            <span className="text-[10px] text-elegant-gray">ID: {d.id}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentFormComponent;
