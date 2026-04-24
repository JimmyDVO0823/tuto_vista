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
const SubjectTable = ({ subjects, showTutorColumn = true }) => {
  /**
   * Header Definitions.
   * Logic Rationale: Orchestrates the column set based on the active role perspective.
   */
  const headers = [
    { label: 'Nombre', visible: true },
    { label: 'Departamento', visible: true },
    { label: 'Tutor', visible: showTutorColumn },
    { label: 'Próxima actividad', visible: true },
    { label: 'Progreso', visible: true },
    { label: 'Estado', visible: true },
    { label: 'Borrar curso', visible: true, center: true },
  ].filter(h => h.visible);

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-[#f2f4f6]">
          <tr>
            {headers.map((h, i, arr) => (
              <th
                key={h.label}
                className={`px-8 py-6 text-[0.7rem] uppercase tracking-widest font-bold text-gray-400 ${
                  h.center ? 'text-center' : ''
                }`}
              >
                {h.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {subjects.map((s, index) => {
            const progressPercentage = Math.round(
              (s.completedActivities / s.totalActivities) * 100
            );

            return (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-8 py-6">
                  <div className="font-bold text-primary">{s.name}</div>
                  <div className="text-xs text-gray-400 mt-1">{s.sem}</div>
                </td>
                <td className="px-8 py-6 text-sm text-gray-500">{s.dept}</td>
                
                {showTutorColumn && (
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary-fixed-dim/20 flex items-center justify-center text-primary font-bold text-xs">
                        {s.tutor?.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-medium text-primary">{s.tutor}</span>
                    </div>
                  </td>
                )}

                <td className="px-8 py-6 text-sm text-gray-500">
                  {s.nextActivity}
                </td>
                <td className="px-8 py-6">
                  <div className="flex flex-col gap-2 min-w-[120px]">
                    <div className="flex justify-between items-center text-[0.7rem] font-bold text-primary">
                      <span>{s.completedActivities}/{s.totalActivities}</span>
                      <span>{progressPercentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#f2f4f6] rounded-full overflow-hidden">
                      <div
                        className="h-full signature-gradient transition-all duration-500 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold ${
                      s.status === 'ACTIVO'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-center">
                  <button className="material-symbols-outlined text-gray-400 hover:text-red-500 transition-colors">
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default SubjectTable;
