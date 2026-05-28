import React from 'react';

const DAY_NAMES = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'];
const FULL_DAY_NAMES = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado'
];

const AvailabilityCalendar = ({
  tutor,
  groupedDispo,
  selectedSlot,
  handleSlotSelect,
  handleBookingSubmit,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  selectedDuration,
  setSelectedDuration,
  selectedSubjectId,
  setSelectedSubjectId,
  message,
  setMessage,
  submitting,
  compromisosDelDia,
  infoBloqueo,
  infoConflictoCompromiso
}) => {
  return (
    <div className="bg-surface-container-lowest rounded-3xl p-5 md:p-10 shadow-ambient border border-outline-variant/10">
      <div className="mb-8">
        <h4 className="font-headline font-bold text-xl text-primary mb-2">Espacios de Disponibilidad Semanal</h4>
        <p className="text-sm text-elegant-gray font-display">Selecciona un bloque de horario para agendar tu tutoría. Los bloques azules (⭐) son horarios especiales añadidos por el tutor.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-7 gap-4 mb-10">
        {[1, 2, 3, 4, 5, 6, 0].map(dayIdx => {
          const daySlots = groupedDispo[dayIdx];
          const hasSlots = daySlots && daySlots.length > 0;
          return (
            <div key={dayIdx} className="space-y-3">
              <span className="text-[10px] font-bold text-elegant-gray block text-center uppercase tracking-widest pb-2 border-b border-outline-variant/10 font-display">
                {DAY_NAMES[dayIdx]}
              </span>
              {hasSlots ? (
                daySlots.map(slot => {
                  const isSelected = selectedSlot?.id === slot.id;
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => handleSlotSelect(slot)}
                      className={`w-full py-3 px-2 rounded-xl text-xs font-bold transition-all text-center border font-display ${isSelected
                        ? 'bg-academic-gold/10 border-academic-gold text-academic-gold shadow-sm scale-[1.02]'
                        : slot.isEspecifica
                          ? 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
                          : 'bg-surface-container-low border-outline-variant/10 text-primary hover:border-academic-gold hover:text-academic-gold hover:bg-academic-gold/5'
                        }`}
                    >
                      {slot.horaInicio.substring(0, 5)} - {slot.horaFin.substring(0, 5)}
                      {slot.isEspecifica && <span className="block text-[9px] text-blue-500 font-normal">Único</span>}
                    </button>
                  );
                })
              ) : (
                <span className="text-[10px] text-gray-400 italic block text-center py-2 font-display">No disp.</span>
              )}
            </div>
          );
        })}
      </div>

      {selectedSlot && (
        <form onSubmit={handleBookingSubmit} className="mt-8 pt-8 border-t border-outline-variant/10 space-y-6 animate-in fade-in duration-500">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface-container-low p-6 rounded-2xl mb-6">
            <div>
              <h5 className="font-bold text-xs text-primary uppercase tracking-wider mb-3 font-headline">Tu Bloque Seleccionado</h5>
              <p className="text-sm text-elegant-gray font-display">
                Día: <span className="font-bold text-primary">{FULL_DAY_NAMES[selectedSlot.diaSemana]}</span>
              </p>
              <p className="text-sm text-elegant-gray font-display">
                Rango Permitido: <span className="font-bold text-primary">{selectedSlot.horaInicio.substring(0, 5)} - {selectedSlot.horaFin.substring(0, 5)}</span>
              </p>
            </div>

            <div className="border-t md:border-t-0 md:border-l border-outline-variant/20 pt-4 md:pt-0 md:pl-6">
              <h5 className="font-bold text-xs text-red-700 uppercase tracking-wider mb-3 flex items-center gap-1 font-headline">
                <span className="material-symbols-outlined text-sm">calendar_today</span>
                Compromisos del Tutor ({selectedDate})
              </h5>
              {compromisosDelDia.length > 0 ? (
                <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                  {compromisosDelDia.map((comp, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm font-display">
                      <span className="font-mono font-bold text-gray-700">{comp.horaInicio} - {comp.horaFin}</span>
                      <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold ${comp.tipo === 'SESION'
                          ? 'bg-blue-50 text-blue-700 border border-blue-100'
                          : comp.tipo === 'BLOQUEO_MANUAL'
                            ? 'bg-red-50 text-red-600 border border-red-100'
                            : 'bg-amber-50 text-amber-700 border border-amber-100'
                        }`}>
                        {comp.label}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-green-600 italic font-medium flex items-center gap-1 mt-2 font-display">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  ¡Tutor totalmente libre este día!
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-elegant-gray block font-display">Materia de estudio *</label>
              <select
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                required
                className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/10 rounded-xl text-sm font-medium focus:outline-none focus:border-academic-gold transition-colors font-display"
              >
                {tutor.materias?.map(m => (
                  <option key={m.id} value={m.id}>{m.nombre}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-elegant-gray block font-display">Fecha deseada *</label>
              <input
                type="date"
                value={selectedDate}
                disabled={selectedSlot.isEspecifica}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
                className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/10 rounded-xl text-sm font-medium focus:outline-none focus:border-academic-gold transition-colors disabled:opacity-70 disabled:bg-gray-100 font-display"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-elegant-gray block font-display">Hora de inicio deseada *</label>
              <input
                type="time"
                value={selectedTime}
                min={selectedSlot.horaInicio.substring(0, 5)}
                max={selectedSlot.horaFin.substring(0, 5)}
                onChange={(e) => setSelectedTime(e.target.value)}
                required
                className={`w-full px-4 py-3 bg-surface-container-low border rounded-xl text-sm font-medium focus:outline-none transition-colors font-display ${infoConflictoCompromiso ? 'border-red-300 focus:border-red-500 bg-red-50/30' : 'border-outline-variant/10 focus:border-academic-gold'
                  }`}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-elegant-gray block font-display">Duración (minutos) *</label>
              <input
                type="number"
                min="15"
                max="360"
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(parseInt(e.target.value))}
                required
                className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/10 rounded-xl text-sm font-medium focus:outline-none focus:border-academic-gold transition-colors font-display"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-elegant-gray block font-display">Mensaje / Dudas o temas a tratar</label>
            <textarea
              rows="3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ej: Hola, me gustaría repasar los temas de límites..."
              className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/10 rounded-xl text-sm font-medium focus:outline-none focus:border-academic-gold transition-colors resize-none font-display"
            ></textarea>
          </div>

          {infoBloqueo && (
            <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl flex items-start gap-3 my-4 animate-in fade-in duration-300">
              <span className="material-symbols-outlined text-amber-600">warning</span>
              <div className="text-xs font-medium font-display">
                <p className="font-bold text-amber-900 mb-0.5">Horario no disponible para esta fecha</p>
                El tutor ha inhabilitado la franja de <span className="font-bold">{infoBloqueo.inicio} a {infoBloqueo.fin}</span> para el día elegido. Por favor, selecciona una hora diferente fuera de ese rango.
              </div>
            </div>
          )}

          {infoConflictoCompromiso && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl flex items-start gap-3 my-4 animate-in fade-in duration-300">
              <span className="material-symbols-outlined text-red-600">error</span>
              <div className="text-xs font-medium font-display">
                <p className="font-bold text-red-900 mb-0.5">Conflicto de Horario Detectado</p>
                Tu tutoría propuesta se cruza con una <span className="font-bold text-red-900 uppercase">"{infoConflictoCompromiso.label}"</span> agendada de <span className="font-bold">{infoConflictoCompromiso.horaInicio} a {infoConflictoCompromiso.horaFin}</span>. Ajusta los minutos o la hora de inicio.
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest font-display">Inversión por hora</p>
              <p className="text-2xl md:text-3xl font-black text-primary font-headline">
                ${tutor.precio_por_hora?.toLocaleString('es-CO')} COP
                <span className="text-sm font-medium text-gray-400 font-display"> / h</span>
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting || !!infoBloqueo || !!infoConflictoCompromiso}
              className={`px-10 py-4 rounded-xl font-bold shadow-xl transition-all w-full md:w-auto font-display ${(!!infoBloqueo || !!infoConflictoCompromiso)
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none opacity-60'
                : 'signature-gradient text-white hover:-translate-y-0.5 shadow-primary/20'
                }`}
            >
              {submitting ? 'Enviando...' : 'Solicitar Tutoría'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AvailabilityCalendar;
