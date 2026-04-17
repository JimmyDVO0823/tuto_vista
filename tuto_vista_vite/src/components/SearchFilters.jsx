import React from 'react';

const SearchFilters = () => {
  return (
    <aside className="w-80 bg-surface-container-low flex flex-col p-8 gap-10 sticky top-[72px] h-[calc(100vh-72px)] border-r border-outline-variant/10">
      <div>
        <h3 className="text-sm font-label font-bold uppercase tracking-widest text-on-surface-variant mb-6">
          Filtros de Búsqueda
        </h3>
        <div className="space-y-8">
          <section>
            <label className="block text-sm font-semibold mb-3">Materia</label>
            <div className="space-y-2">
              {[
                'Matemáticas Avanzadas',
                'Literatura Hispánica',
                'Física Cuántica',
                'Economía Política',
              ].map((subject, index) => (
                <label key={index} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    defaultChecked={index === 0}
                    className="rounded text-primary focus:ring-primary border-outline-variant/50"
                    type="checkbox"
                  />
                  <span className="text-sm group-hover:text-primary transition-colors">
                    {subject}
                  </span>
                </label>
              ))}
            </div>
          </section>
          
          <section>
            <label className="block text-sm font-semibold mb-3">
              Rango de Precio (h)
            </label>
            <div className="flex items-center gap-4">
              <input
                className="w-full bg-surface-container-lowest border-none rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="Min"
                type="number"
                defaultValue="20"
              />
              <span className="text-outline-variant">—</span>
              <input
                className="w-full bg-surface-container-lowest border-none rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="Max"
                type="number"
                defaultValue="150"
              />
            </div>
          </section>
          
          <section>
            <label className="block text-sm font-semibold mb-3">
              Calificación Mínima
            </label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  defaultChecked
                  className="text-primary focus:ring-primary border-outline-variant/50"
                  name="rating"
                  type="radio"
                />
                <div className="flex items-center gap-1 text-tertiary">
                  {[...Array(4)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                  <span className="text-xs text-on-surface-variant font-medium ml-1">
                    4.0+
                  </span>
                </div>
              </label>
            </div>
          </section>
          
          <section>
            <label className="block text-sm font-semibold mb-3">
              Disponibilidad
            </label>
            <select className="w-full bg-surface-container-lowest border-none rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 transition-all appearance-none">
              <option>Esta semana</option>
              <option>Mañana</option>
              <option>Fin de semana</option>
            </select>
          </section>
        </div>
      </div>
      <div className="mt-auto pt-8">
        <button className="w-full py-3 bg-surface-container-high hover:bg-surface-container-highest text-primary font-bold text-sm rounded-md transition-all active:scale-[0.98]">
          Limpiar Filtros
        </button>
      </div>
    </aside>
  );
};

export default SearchFilters;
