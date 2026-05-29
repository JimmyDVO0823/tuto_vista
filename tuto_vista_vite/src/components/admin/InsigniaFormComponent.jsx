import React from 'react';

const InsigniaFormComponent = ({ nuevaInsignia, setNuevaInsignia, handleGuardarInsignia, editingBadge, handleCancelarEdicion }) => {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-6 shadow-sm h-fit">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-primary font-display">
          {editingBadge ? 'Editar Insignia' : 'Nueva Insignia'}
        </h3>
        {editingBadge && (
          <button
            onClick={handleCancelarEdicion}
            className="text-[10px] font-bold text-red-500 uppercase hover:underline"
          >
            Cancelar
          </button>
        )}
      </div>
      <form onSubmit={handleGuardarInsignia} className="space-y-4">
        <div>
          <label className="text-xs font-bold text-elegant-gray uppercase block mb-1">Nombre</label>
          <input
            type="text"
            value={nuevaInsignia.nombre}
            onChange={e => setNuevaInsignia({ ...nuevaInsignia, nombre: e.target.value })}
            className="w-full px-3 py-2 bg-surface-container-low rounded border border-outline-variant/30 text-sm text-primary"
            placeholder="Ej. Súper Instructor"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-elegant-gray uppercase block mb-1">Descripción</label>
          <textarea
            value={nuevaInsignia.descripcion}
            onChange={e => setNuevaInsignia({ ...nuevaInsignia, descripcion: e.target.value })}
            className="w-full px-3 py-2 bg-surface-container-low rounded border border-outline-variant/30 text-sm text-primary h-20"
            placeholder="Escribe de qué se trata la insignia..."
          />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="text-xs font-bold text-elegant-gray uppercase block mb-1 flex justify-between">
              URL del Ícono / Identificador
              <span className="text-[10px] lowercase font-normal opacity-60">Soporta URL o Material Icon name</span>
            </label>
            <input
              type="text"
              value={nuevaInsignia.urlIcono}
              onChange={e => setNuevaInsignia({ ...nuevaInsignia, urlIcono: e.target.value })}
              className="w-full px-3 py-2 bg-surface-container-low rounded border border-outline-variant/30 text-sm text-primary font-mono placeholder:italic"
              placeholder="https://... o emoji_events"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-elegant-gray uppercase block mb-1">Tipo de Regla</label>
            <select
              value={nuevaInsignia.condicionTipo}
              onChange={e => setNuevaInsignia({ ...nuevaInsignia, condicionTipo: e.target.value })}
              className="w-full px-3 py-2 bg-surface-container-low rounded border border-outline-variant/30 text-sm text-primary animate-none"
            >
              <option value="TOTAL_SESIONES">Total Sesiones</option>
              <option value="SESIONES_5_ESTRELLAS">Sesiones 5 Estrellas</option>
              <option value="CALIFICACION_PROMEDIO">Calificación Promedio</option>
            </select>
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-elegant-gray uppercase block mb-1">Valor Requerido</label>
          <input
            type="number"
            min="1"
            value={nuevaInsignia.condicionValor}
            onChange={e => setNuevaInsignia({ ...nuevaInsignia, condicionValor: e.target.value })}
            className="w-full px-3 py-2 bg-surface-container-low rounded border border-outline-variant/30 text-sm text-primary"
          />
        </div>
        <button
          type="submit"
          className={`w-full font-bold py-2.5 rounded-md text-xs shadow hover:shadow-lg transition-all ${editingBadge ? 'bg-primary text-white' : 'signature-gradient text-white'}`}
        >
          {editingBadge ? 'Actualizar Insignia' : 'Guardar Insignia'}
        </button>
      </form>
    </div>
  );
};

export default InsigniaFormComponent;
