import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Helper para dar formato de miles: 10000 -> "10.000"
 */
const formatWithThousandsSeparator = (value) => {
  if (value === null || value === undefined || value === '') return '';
  // Convertir a string, remover lo que no sea número y aplicar la máscara de miles
  const stringValue = value.toString().replace(/\D/g, '');
  return stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

/**
 * Helper para limpiar el formato y obtener el número puro: "10.000" -> 10000
 */
const parseRawNumber = (formattedValue) => {
  const cleanString = formattedValue.replace(/\D/g, '');
  return cleanString === '' ? 0 : parseInt(cleanString, 10);
};

export const HourlyRateCard = ({ initialRate = 45, onSaveRate }) => {
  // Guardamos el valor visual en el estado (con puntos)
  const [displayRate, setDisplayRate] = useState(formatWithThousandsSeparator(initialRate));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Sincronizar si el valor inicial cambia desde el backend
  useEffect(() => {
    setDisplayRate(formatWithThousandsSeparator(initialRate));
  }, [initialRate]);

  const handleInputChange = (e) => {
    const rawValue = e.target.value;
    // Aplicar la máscara de puntos automáticamente mientras escribe
    const formatted = formatWithThousandsSeparator(rawValue);
    setDisplayRate(formatted);
  };

  const handleQuickSelect = (value) => {
    if (!isLoading) {
      setDisplayRate(formatWithThousandsSeparator(value));
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Convertimos la cadena formateada ("10.000") a un entero puro (10000)
    const numericRate = parseRawNumber(displayRate);
    
    // Validaciones de negocio
    if (numericRate <= 0) {
      setError("La tarifa por hora debe ser un número mayor a 0.");
      setSuccess(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Enviamos el valor numérico limpio al backend
      await onSaveRate(numericRate);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || "No se pudo actualizar la tarifa. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const presetRates = [30000, 45000, 60000]; // Ajustado a cifras de miles de ejemplo

  return (
    <section className="bg-surface-container-lowest rounded-lg p-8 ambient-shadow border-t-4 border-primary">
      {/* Encabezado */}
      <div className="flex items-center gap-3 mb-6">
        <span className="material-symbols-outlined text-primary">payments</span>
        <h3 className="font-headline font-bold text-primary text-lg">Configuración de Honorarios</h3>
      </div>

      <div className="space-y-6">
        <p className="text-xs text-on-surface-variant leading-relaxed">
          Define tu tarifa por hora para las sesiones editoriales. Este valor será visible para los estudiantes en tu perfil público.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input de tarifa con máscara */}
          <div className="space-y-3">
            <label className="font-label text-[10px] uppercase font-bold tracking-widest text-on-surface-variant block">
              Tarifa por Hora
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-medium">
                $
              </span>
              <input
                type="text" // Cambiado a text para permitir los puntos visuales sin romper la especificación HTML
                inputMode="numeric" // Optimiza el teclado numérico en dispositivos móviles
                value={displayRate}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full bg-surface-container-low border-none rounded-md pl-8 pr-16 py-3 text-on-surface focus:ring-2 focus:ring-primary-container transition-all font-bold text-lg disabled:opacity-60"
                placeholder="0"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-on-surface-variant/70 font-bold">
                COP
              </span>
            </div>
          </div>

          {/* Botones de Preajustes formateados */}
          <div className="flex flex-wrap gap-2">
            {presetRates.map((preset) => {
              const isActive = parseRawNumber(displayRate) === preset;
              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handleQuickSelect(preset)}
                  disabled={isLoading}
                  className={`flex-1 py-2 rounded-md text-xs font-bold transition-colors border ${
                    isActive
                      ? 'bg-primary text-white border-transparent'
                      : 'bg-surface-container-low hover:bg-surface-container-high text-primary border-outline-variant/30'
                  }`}
                >
                  ${formatWithThousandsSeparator(preset)}
                </button>
              );
            })}
          </div>

          {/* Feedback Visual */}
          {error && (
            <div className="text-xs text-red-600 font-semibold bg-red-50 p-2 rounded border border-red-200">
              {error}
            </div>
          )}
          {success && (
            <div className="text-xs text-green-600 font-semibold bg-green-50 p-2 rounded border border-green-200">
              ¡Tarifa guardada exitosamente!
            </div>
          )}

          {/* Botón de Acción Principal */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full signature-gradient text-white px-4 py-3.5 rounded-md font-bold text-sm shadow-md hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-lg">
              {isLoading ? 'sync' : 'update'}
            </span>
            {isLoading ? 'Actualizando...' : 'Actualizar Tarifa'}
          </button>
        </form>
      </div>
    </section>
  );
};

HourlyRateCard.propTypes = {
  initialRate: PropTypes.number,
  onSaveRate: PropTypes.func.isRequired,
};