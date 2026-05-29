/**
 * @fileoverview UI Atomic Component - Academic Subjects Table
 * @module components/ui/SubjectTable
 * @description A high-density data representation for course enrollment. 
 * It manages complex layouts including progress bars, tutor avatars, 
 * and status indicators, following the 'No-Line' rule for row separation.
 */

import React from 'react';

/**
 * SubjectTable Component.
 * 
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.subjects - Array of subject data objects.
 * @param {boolean} [props.showTutorColumn=true] - Logic Rationale: Tutors viewing 
 * their own catalog do not require a self-referential column, whereas students 
 * need it for transparency.
 * @component
 */
const SubjectTable = ({ subjects, showTutorColumn = true, onToggleStatus, onDelete }) => {
  /**
   * Header Definitions.
   * Logic Rationale: Orchestrates the column set based on the active role perspective.
   */
  const headers = [
    { label: 'Nombre', visible: true },
    { label: 'Departamento', visible: true },
    { label: 'Tutor', visible: showTutorColumn },
    { label: 'Próxima sesión', visible: true },
    { label: 'Progreso', visible: true },
    { label: 'Estado', visible: !showTutorColumn },
    { label: 'Baja', visible: !showTutorColumn, center: true },
  ].filter(h => h.visible);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Pendiente';
    return new Date(dateStr).toLocaleString([], {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-[#f2f4f6]">
          <tr>
            {headers.map((h, i, arr) => (
              <th
                key={h.label}
                className={`px-8 py-6 text-[0.7rem] uppercase tracking-widest font-bold text-gray-400 ${h.center ? 'text-center' : ''
                  }`}
              >
                {h.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {subjects.map((s, index) => {
            const isInactive = s.activo === false;
            const progress = Math.round(s.progreso || 0);

            return (
              <tr 
                key={s.materiaId || index} 
                className={`hover:bg-gray-50 transition-colors ${isInactive ? 'opacity-60 saturate-50' : ''}`}
              >
                <td className="px-8 py-6">
                  <div className={`font-bold ${isInactive ? 'text-gray-400' : 'text-primary'}`}>
                    {s.nombre || s.name}
                  </div>
                </td>
                <td className="px-8 py-6 text-sm text-gray-500">{s.departamento || s.dept}</td>

                {showTutorColumn && (
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary-fixed-dim/20 flex items-center justify-center text-primary font-bold text-xs">
                        {(s.tutor || 'T').split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-medium text-primary">{s.tutor}</span>
                    </div>
                  </td>
                )}

                <td className="px-8 py-6 text-sm text-gray-500">
                  {formatDate(s.proximaSesion || s.nextActivity)}
                </td>
                <td className="px-8 py-6">
                  <div className="flex flex-col gap-2 min-w-[120px]">
                    <div className={`flex justify-between items-center text-[0.7rem] font-bold ${isInactive ? 'text-gray-400' : 'text-primary'}`}>
                      <span>
                        {showTutorColumn ? 'Actividades: ' : 'Sesiones: '}
                        {s.sesionesDictadas || 0}/{(s.sesionesDictadas || 0) + (s.sesionesPendientes || 0)}
                      </span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#f2f4f6] rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ease-out ${isInactive ? 'bg-gray-300' : 'signature-gradient'}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </td>
                {!showTutorColumn && (
                  <td className="px-8 py-6">
                    <button
                      onClick={() => onToggleStatus && onToggleStatus(s.materiaId)}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold transition-all hover:scale-105 active:scale-95 ${!isInactive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-200 text-gray-600'
                        }`}
                    >
                      {!isInactive ? 'ACTIVO' : 'NO ACTIVO'}
                    </button>
                  </td>
                )}
                {!showTutorColumn && (
                  <td className="px-8 py-6 text-center">
                    <button 
                      onClick={() => onDelete && onDelete(s.materiaId)}
                      className="material-symbols-outlined text-gray-300 hover:text-red-500 transition-colors"
                    >
                      delete
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default SubjectTable;
