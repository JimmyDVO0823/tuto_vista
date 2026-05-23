import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { api } from "../../../../lib/api";

/**
 * SemesterProgressWidget Component.
 * Muestra el progreso en formato de fracción (completadas/totales) con una lista
 * expandible de actividades y scrollbar interno.
 */
const SemesterProgressWidget = () => {
  const { user: authUser } = useAuth();
  const [progressData, setProgressData] = useState({
    completedCount: 0,
    totalCount: 0,
    activities: []
  });
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(2);

  useEffect(() => {
    if (authUser?.id) {
      api.get(`/students/${authUser.id}/semester-progress`)
        .then(data => {
          setProgressData(data || { completedCount: 0, totalCount: 0, activities: [] });
          setLoading(false);
        })
        .catch(err => {
          console.error("Error cargando progreso semestral:", err);
          setLoading(false);
        });
    }
  }, [authUser]);

  const { completedCount, totalCount, activities } = progressData;

  // Calculamos el porcentaje real para la propiedad 'width' de la barra
  const progressPercentage =
    totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  // Filtramos la lista según el número visible actual
  const displayedActivities = activities.slice(0, visibleCount);

  // Manejador para cargar más actividades
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 3, totalCount));
  };

  if (loading) {
    return (
      <div className="bg-[#f2f4f6] p-8 rounded-2xl flex flex-col items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="text-xs text-gray-400 mt-4 font-bold uppercase tracking-widest text-center">Calculando Progreso...</p>
      </div>
    );
  }

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
              {completedCount}/{totalCount}
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
            maxHeight: visibleCount > 3 ? "160px" : "auto",
          }}
        >
          {activities.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4 italic">No hay actividades registradas en este semestre.</p>
          ) : (
            displayedActivities.map((activity, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-sm font-bold animate-in fade-in slide-in-from-bottom-1 duration-200"
              >
                {activity.completed ? (
                  <span className="material-symbols-outlined text-green-500 select-none">
                    check_circle
                  </span>
                ) : (
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
            ))
          )}
        </div>
      </div>

      {/* Botón sutil "Ver más" */}
      {visibleCount < totalCount && (
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
