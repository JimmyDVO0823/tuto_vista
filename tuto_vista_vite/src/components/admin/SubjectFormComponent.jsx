import React from 'react';

const SubjectFormComponent = ({ materias, departamentos, nuevaMateria, setNuevaMateria, handleCrearMateria }) => {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold text-primary font-display mb-4">Materias</h3>

        <form onSubmit={handleCrearMateria} className="space-y-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-elegant-gray uppercase block mb-1">Nombre Materia</label>
              <input
                type="text"
                value={nuevaMateria.nombre}
                onChange={e => setNuevaMateria({ ...nuevaMateria, nombre: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded border border-outline-variant/30 text-sm text-primary"
                placeholder="Ej. Estructuras de Datos"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-elegant-gray uppercase block mb-1">Departamento Asociado</label>
              <select
                value={nuevaMateria.departamentoId}
                onChange={e => setNuevaMateria({ ...nuevaMateria, departamentoId: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded border border-outline-variant/30 text-sm text-primary"
              >
                {departamentos.map(d => (
                  <option key={d.id} value={d.id}>{d.nombre}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2.5 signature-gradient text-white rounded text-xs font-bold shadow hover:shadow-lg transition-all"
          >
            Crear Materia
          </button>
        </form>

        <h4 className="text-xs font-bold text-elegant-gray uppercase tracking-widest mb-3">Materias Creadas ({materias.length})</h4>
      </div>

      <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/10 max-h-60 overflow-y-auto space-y-2 no-scrollbar">
        {materias.map(m => (
          <div key={m.id} className="px-3 py-2 bg-surface-container-lowest border border-outline-variant/5 rounded text-sm text-primary font-medium flex justify-between items-center">
            <div>
              <span className="font-bold">{m.nombre}</span>
              <span className="text-[10px] text-elegant-gray block">Depto: {m.departamento_nombre}</span>
            </div>
            <span className="text-[10px] text-elegant-gray">ID: {m.id}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectFormComponent;
