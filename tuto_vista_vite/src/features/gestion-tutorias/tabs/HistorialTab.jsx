import React from 'react';

const HistorialTab = ({ sessions, filterMateria, setFilterMateria, filterDate, setFilterDate, listaMaterias, formatFecha }) => {
  const clearFilters = () => {
    setFilterMateria('');
    setFilterDate('');
  };

  if (sessions.length === 0) {
    return (
      <div className="space-y-6">
        {/* Filtros incluso si está vacío para poder buscar */}
        <Filters 
          filterMateria={filterMateria} 
          setFilterMateria={setFilterMateria} 
          filterDate={filterDate} 
          setFilterDate={setFilterDate} 
          listaMaterias={listaMaterias} 
          clearFilters={clearFilters}
        />
        <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-8 md:p-12 text-center shadow-sm">
          <span className="material-symbols-outlined text-gray-300 text-5xl mb-3">manage_search</span>
          <h3 className="text-lg font-bold text-primary mb-1">No se encontraron clases</h3>
          <p className="text-gray-500 text-sm">No posees registros finalizados o que coincidan con los filtros seleccionados.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Filters 
        filterMateria={filterMateria} 
        setFilterMateria={setFilterMateria} 
        filterDate={filterDate} 
        setFilterDate={setFilterDate} 
        listaMaterias={listaMaterias} 
        clearFilters={clearFilters}
      />
      
      <div className="space-y-4">
        {sessions.map(sesion => (
          <div
            key={sesion.id}
            className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-outline-variant/30 transition-all"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-primary">{sesion.estudianteNombre}</span>
                <span className="text-xs text-elegant-gray">•</span>
                <span className="text-xs font-semibold px-2 py-0.5 bg-surface-container-low text-primary rounded">
                  {sesion.materiaNombre}
                </span>
              </div>

              <p className="text-xs text-elegant-gray">
                🗓️ {formatFecha(sesion.programadaPara)} ({sesion.duracionMin} min)
              </p>

              {sesion.motivoCancelacion && (
                <p className="text-xs text-red-700 bg-red-50/60 px-3 py-1.5 rounded border border-red-100/40 italic mt-1">
                  <strong>Detalle del cierre:</strong> "{sesion.motivoCancelacion}"
                </p>
              )}
            </div>

            <div className="shrink-0 self-start md:self-center">
              <span className={`text-[10px] uppercase font-extrabold tracking-widest px-3 py-1 rounded-full ${sesion.estado === 'completada' ? 'bg-green-50 text-green-700 border border-green-200' :
                sesion.estado === 'cancelada' ? 'bg-red-50 text-red-700 border border-red-200' :
                  'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                {sesion.estado === 'completada' ? '✅ Completada' :
                  sesion.estado === 'cancelada' ? '❌ Cancelada' :
                    '⚠️ No Asistió'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Filters = ({ filterMateria, setFilterMateria, filterDate, setFilterDate, listaMaterias, clearFilters }) => (
  <div className="bg-surface-container-low p-4 rounded-xl flex flex-col md:flex-row gap-4 items-end shadow-sm border border-outline-variant/5">
    <div className="w-full md:w-1/3">
      <label className="text-[10px] font-bold text-elegant-gray uppercase tracking-widest block mb-1.5">Filtrar por Materia</label>
      <select
        value={filterMateria}
        onChange={(e) => setFilterMateria(e.target.value)}
        className="w-full text-sm p-2.5 border border-outline-variant/30 rounded-lg bg-surface-container-lowest text-primary focus:outline-none focus:border-primary"
      >
        <option value="">Todas las materias</option>
        {listaMaterias.map(m => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
    </div>

    <div className="w-full md:w-1/3">
      <label className="text-[10px] font-bold text-elegant-gray uppercase tracking-widest block mb-1.5">Filtrar por Fecha</label>
      <input
        type="date"
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
        className="w-full text-sm p-2 border border-outline-variant/30 rounded-lg bg-surface-container-lowest text-primary focus:outline-none focus:border-primary"
      />
    </div>

    <div className="w-full md:w-auto flex gap-2 shrink-0">
      <button
        onClick={clearFilters}
        className="w-full md:w-auto px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-elegant-gray rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
      >
        Limpiar Filtros
      </button>
    </div>
  </div>
);

export default HistorialTab;
