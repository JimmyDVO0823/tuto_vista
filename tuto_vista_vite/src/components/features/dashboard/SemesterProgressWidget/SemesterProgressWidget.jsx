import React, { useState } from "react";

/**
 * SemesterProgressWidget Component.
 * Muestra el progreso en formato de fracción (completadas/totales) con una lista
 * expandible de actividades y scrollbar interno.
 */
const SemesterProgressWidget = () => {
  // 1. Dataset de prueba (Actividades con su estado 'completada' true/false)
  const allActivities = [
    { label: "Ensayo de Filosofía entregado", completed: true },
    { label: "Revisión de Tesis pendiente", completed: false },
    { label: "Taller de Álgebra Lineal enviado", completed: true },
    { label: "Examen parcial de Programación", completed: false },
    { label: "Lectura de Antropología Académica", completed: true },
    { label: "Presentación de Proyecto Final", completed: false },
  ];

  // 2. Estado para manejar cuántas actividades se muestran en pantalla
  const [visibleCount, setVisibleCount] = useState(2);

  // 3. Cálculos automáticos para la fracción y la barra de progreso
  const totalActivities = allActivities.length;
  const completedCount = allActivities.filter((act) => act.completed).length;

  // Calculamos el porcentaje real para la propiedad 'width' de la barra
  const progressPercentage =
    totalActivities > 0 ? (completedCount / totalActivities) * 100 : 0;

  // Filtramos la lista según el número visible actual
  const displayedActivities = allActivities.slice(0, visibleCount);

  // Manejador para cargar más actividades
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 3, totalActivities));
  };

  return (
    <div className="bg-[#f2f4f6] p-8 rounded-2xl space-y-6 max-w-md w-full flex flex-col justify-between">
      <div>
        {/* Encabezado */}
        <h3 className="text-xl font-bold text-primary border-b border-gray-200 pb-4">
          Progreso Semestral
        </h3>

        {/* Sección de Métrica y Barra de Progreso */}
        <div className="space-y-4 mt-6">
          <div className="flex justify-between items-end">
            <span className="text-xs font-bold uppercase text-gray-500 tracking-wider">
              Actividades Completadas
            </span>
            {/* Formato en Fracción */}
            <span className="text-2xl font-black text-primary">
              {completedCount}/{totalActivities}
            </span>
          </div>
          {/* Barra de progreso de fondo blanco */}
          <div className="h-2 w-full bg-white rounded-full overflow-hidden">
            {/* Relleno dinámico calculado en base a la fracción */}
            <div
              className="h-full bg-academic-gold transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Lista de Actividades con Scrollbar condicional */}
        <div
          className="mt-6 space-y-3 overflow-y-auto pr-1 no-scrollbar transition-all duration-300"
          style={{
            // Si hay más de 3 actividades visibles, limita la altura para activar el scroll
            maxHeight: visibleCount > 3 ? "160px" : "auto",
          }}
        >
          {displayedActivities.map((activity, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-sm font-bold animate-in fade-in slide-in-from-bottom-1 duration-200"
            >
              {activity.completed ? (
                // Icono Verde si está completada
                <span className="material-symbols-outlined text-green-500 select-none">
                  check_circle
                </span>
              ) : (
                // Icono Gris si está pendiente
                <span className="material-symbols-outlined text-gray-400 select-none">
                  pending
                </span>
              )}

              <span
                className={
                  activity.completed ? "text-primary" : "text-gray-400"
                }
              >
                {activity.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Botón sutil "Ver más" estilo Academic Blue */}
      {visibleCount < totalActivities && (
        <div className="pt-4 border-t border-gray-200/60 flex justify-start">
          <button
            type="button"
            onClick={handleLoadMore}
            className="text-xs font-bold text-academic-blue hover:text-blue-800 transition-colors bg-transparent border-none p-0 cursor-pointer outline-none focus:underline"
          >
            Ver más
          </button>
        </div>
      )}
    </div>
  );
};

export default SemesterProgressWidget;
