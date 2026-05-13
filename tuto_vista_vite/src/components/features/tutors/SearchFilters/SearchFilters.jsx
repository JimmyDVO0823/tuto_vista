import React, { useState } from 'react';

const SearchFilters = ({ departments, subjects, filters, onFilterChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const filteredSubjects = subjects.filter(
    (s) => !filters.departmentId || s.departamento_id === parseInt(filters.departmentId)
  );

  const handleRatingClick = (rating) => {
    onFilterChange({ minRating: rating });
  };

  const handleClearFilters = () => {
    onFilterChange({
      departmentId: '',
      subjectId: '',
      minPrice: 0,
      maxPrice: 200,
      minRating: 0,
      availability: 'Esta semana'
    });
  };

  return (
    <aside className="w-80 bg-surface-container-low flex flex-col p-8 gap-10 sticky top-[72px] h-[calc(100vh-72px)] border-r border-outline-variant/10 overflow-y-auto">
      <div>
        <h3 className="text-sm font-label font-bold uppercase tracking-widest text-on-surface-variant mb-6">
          Filtros de Búsqueda
        </h3>
        <div className="space-y-8">
          {/* Materia & Departamento Section */}
          <section className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Departamento</label>
              <select 
                className="w-full bg-surface-container-lowest border-none rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
                value={filters.departmentId}
                onChange={(e) => onFilterChange({ departmentId: e.target.value, subjectId: '' })}
              >
                <option value="">Todos los Departamentos</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>{dept.nombre}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Materia</label>
              <select 
                className="w-full bg-surface-container-lowest border-none rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 transition-all appearance-none disabled:opacity-50"
                value={filters.subjectId}
                onChange={(e) => onFilterChange({ subjectId: e.target.value })}
                disabled={!filters.departmentId && filteredSubjects.length === 0}
              >
                <option value="">Todas las Materias</option>
                {filteredSubjects.map((subj) => (
                  <option key={subj.id} value={subj.id}>{subj.nombre}</option>
                ))}
              </select>
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
                value={filters.minPrice}
                onChange={(e) => onFilterChange({ minPrice: parseInt(e.target.value) || 0 })}
              />
              <span className="text-outline-variant">—</span>
              <input
                className="w-full bg-surface-container-lowest border-none rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="Max"
                type="number"
                value={filters.maxPrice}
                onChange={(e) => onFilterChange({ maxPrice: parseInt(e.target.value) || 0 })}
              />
            </div>
          </section>
          
          <section>
            <label className="block text-sm font-semibold mb-3">
              Calificación Mínima
            </label>
            <div className="flex items-center gap-2">
              <div 
                className="flex items-center gap-1 text-tertiary"
                onMouseLeave={() => setHoverRating(0)}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="focus:outline-none transition-transform active:scale-90"
                    onMouseEnter={() => setHoverRating(star)}
                    onClick={() => handleRatingClick(star)}
                  >
                    <span
                      className="material-symbols-outlined text-2xl"
                      style={{ 
                        fontVariationSettings: (hoverRating || filters.minRating) >= star ? "'FILL' 1" : "'FILL' 0" 
                      }}
                    >
                      star_rate
                    </span>
                  </button>
                ))}
              </div>
              <span className="text-xs text-on-surface-variant font-medium ml-2">
                {filters.minRating > 0 ? `${filters.minRating}.0+` : 'Cualquier calificación'}
              </span>
            </div>
          </section>
          
          <section>
            <label className="block text-sm font-semibold mb-3">
              Disponibilidad
            </label>
            <select 
              className="w-full bg-surface-container-lowest border-none rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
              value={filters.availability}
              onChange={(e) => onFilterChange({ availability: e.target.value })}
            >
              <option>Esta semana</option>
              <option>Mañana</option>
              <option>Fin de semana</option>
            </select>
          </section>
        </div>
      </div>
      <div className="mt-auto pt-8">
        <button 
          onClick={handleClearFilters}
          className="w-full py-3 bg-surface-container-high hover:bg-surface-container-highest text-primary font-bold text-sm rounded-md transition-all active:scale-[0.98]"
        >
          Limpiar Filtros
        </button>
      </div>
    </aside>
  );
};

export default SearchFilters;
