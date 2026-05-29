import React from 'react';

const FAQCategoryFormComponent = ({ nuevaFaqCat, setNuevaFaqCat, handleCrearFaqCat }) => {
  return (
    <form onSubmit={handleCrearFaqCat} className="space-y-4 mb-8">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-elegant-gray uppercase block mb-1">Nombre</label>
          <input
            type="text"
            value={nuevaFaqCat.nombre}
            onChange={e => setNuevaFaqCat({ ...nuevaFaqCat, nombre: e.target.value })}
            className="w-full px-3 py-2 bg-surface-container-low rounded border border-outline-variant/30 text-sm text-primary"
            placeholder="Ej. Pagos y seguridad"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-elegant-gray uppercase block mb-1">Icono (Material)</label>
          <input
            type="text"
            value={nuevaFaqCat.icono}
            onChange={e => setNuevaFaqCat({ ...nuevaFaqCat, icono: e.target.value })}
            className="w-full px-3 py-2 bg-surface-container-low rounded border border-outline-variant/30 text-sm text-primary"
            placeholder="Ej. shield_lock"
          />
        </div>
      </div>
      <button type="submit" className="w-full py-2.5 signature-gradient text-white rounded text-xs font-bold shadow transition-all">
        Crear Categoría
      </button>
    </form>
  );
};

export default FAQCategoryFormComponent;
