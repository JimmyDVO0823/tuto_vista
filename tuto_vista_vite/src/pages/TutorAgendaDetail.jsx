import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

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

const TutorAgendaDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [tutor, setTutor] = useState(null);
  const [disponibilidad, setDisponibilidad] = useState([]);
  const [sesionesOcupadas, setSesionesOcupadas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Booking states
  const [selectedSlot, setSelectedSlot] = useState(null); // { id, diaSemana, horaInicio, horaFin }
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDuration, setSelectedDuration] = useState(90);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const getNextDateForDayOfWeek = (dayOfWeek) => {
    const resultDate = new Date();
    const currentDay = resultDate.getDay(); // 0 = Sun, 1 = Mon, etc.
    let distance = dayOfWeek - currentDay;
    if (distance <= 0) {
      distance += 7;
    }
    resultDate.setDate(resultDate.getDate() + distance);
    return resultDate.toISOString().split('T')[0];
  };

  const loadTutorDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch tutor info and availability in parallel
      const [tutorData, dispoData, sesionesData] = await Promise.all([
        api.get(`/tutores/${id}`),
        api.get(`/disponibilidad/tutor/${id}`),
        api.get(`/sesiones/tutor/${id}`).catch(() => []) // Catch error just in case
      ]);

      setTutor(tutorData);
      setDisponibilidad(dispoData || []);

      const ocupadas = (sesionesData || []).filter(s => s.estado === 'programada' || s.estado === 'en_progreso');
      setSesionesOcupadas(ocupadas);

      // Pre-select first subject if available
      if (tutorData?.materias?.length > 0) {
        setSelectedSubjectId(tutorData.materias[0].id.toString());
      }
      if (tutorData?.duracion_sesion_min) {
        setSelectedDuration(tutorData.duracion_sesion_min);
      }
    } catch (err) {
      console.error('Error cargando detalles del tutor:', err);
      setError('No se pudieron cargar los detalles del tutor. Intenta de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadTutorDetails();
  }, [loadTutorDetails]);

  // Group availability by day
  const groupedDispo = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 0: [] };
  disponibilidad.forEach(slot => {
    if (groupedDispo[slot.diaSemana] !== undefined) {
      groupedDispo[slot.diaSemana].push(slot);
    }
  });

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setSelectedDate(getNextDateForDayOfWeek(slot.diaSemana));
    setSelectedTime(slot.horaInicio.substring(0, 5));
    setSuccessMessage(null);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      // Prompt login or redirect
      alert('Debes iniciar sesión como estudiante para solicitar una tutoría.');
      navigate('/loginform');
      return;
    }

    if (!selectedSlot) {
      alert('Por favor selecciona un bloque de disponibilidad.');
      return;
    }
    if (!selectedSubjectId) {
      alert('Por favor selecciona la materia.');
      return;
    }
    if (!selectedDate) {
      alert('Por favor selecciona la fecha de la tutoría.');
      return;
    }
    if (!selectedTime) {
      alert('Por favor selecciona la hora de la tutoría.');
      return;
    }

    // Validate that selected date matches the slot day of the week
    const dateObj = new Date(selectedDate + 'T00:00:00');
    if (dateObj.getDay() !== selectedSlot.diaSemana) {
      alert(`La fecha seleccionada no es un ${FULL_DAY_NAMES[selectedSlot.diaSemana]}. Por favor selecciona una fecha correspondiente.`);
      return;
    }

    // Validate that selectedTime and duration fit within the selected slot
    const timeToMinutes = (timeStr) => {
      const [h, m] = timeStr.split(':').map(Number);
      return h * 60 + m;
    };

    const slotStartMin = timeToMinutes(selectedSlot.horaInicio);
    const slotEndMin = timeToMinutes(selectedSlot.horaFin);
    const selectedStartMin = timeToMinutes(selectedTime);
    const sessionEndMin = selectedStartMin + parseInt(selectedDuration);

    if (selectedStartMin < slotStartMin || selectedStartMin > slotEndMin) {
      alert(`La hora de inicio debe estar dentro del bloque disponible del tutor: ${selectedSlot.horaInicio.substring(0, 5)} - ${selectedSlot.horaFin.substring(0, 5)}.`);
      return;
    }

    if (sessionEndMin > slotEndMin) {
      alert(`La sesión excede el horario de disponibilidad del tutor (finaliza a las ${Math.floor(sessionEndMin / 60).toString().padStart(2, '0')}:${(sessionEndMin % 60).toString().padStart(2, '0')} pero el tutor está disponible hasta las ${selectedSlot.horaFin.substring(0, 5)}).`);
      return;
    }

    // Validate overlap with occupied sessions on this date (using UTC to prevent timezone shift)
    const sessionStart = new Date(`${selectedDate}T${selectedTime}:00Z`);
    const sessionEnd = new Date(sessionStart.getTime() + selectedDuration * 60000);

    const ocupadasDelDia = sesionesOcupadas.filter(s => {
      const localDate = new Date(s.programadaPara);
      const utcYear = localDate.getUTCFullYear();
      const utcMonth = String(localDate.getUTCMonth() + 1).padStart(2, '0');
      const utcDay = String(localDate.getUTCDate()).padStart(2, '0');
      const localDateStr = `${utcYear}-${utcMonth}-${utcDay}`;
      return localDateStr === selectedDate;
    });

    const hasOverlap = ocupadasDelDia.some(s => {
      const occStart = new Date(s.programadaPara);
      const occEnd = new Date(occStart.getTime() + s.duracionMin * 60000);
      return sessionStart < occEnd && sessionEnd > occStart;
    });

    if (hasOverlap) {
      alert("El horario seleccionado se cruza con una sesión ya confirmada del tutor. Por favor revisa los horarios ocupados y elige otro espacio.");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        tutorId: parseInt(id),
        materiaId: parseInt(selectedSubjectId),
        fechaPreferida: selectedDate,
        horaPreferida: selectedTime,
        duracionMin: parseInt(selectedDuration),
        mensaje: message,
      };

      await api.post('/solicitudes', payload);
      setSuccessMessage('¡Solicitud de tutoría enviada exitosamente! El tutor revisará tu propuesta.');

      // Reset form
      setSelectedSlot(null);
      setSelectedTime('');
      setMessage('');
    } catch (err) {
      console.error('Error enviando solicitud:', err);
      alert(err.message || 'Error al enviar la solicitud de tutoría. Intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <main className="flex-1 p-4 md:p-12 min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-elegant-gray font-medium">Cargando perfil del tutor...</p>
          </div>
        </main>
      </MainLayout>
    );
  }

  if (error || !tutor) {
    return (
      <MainLayout>
        <main className="flex-1 p-4 md:p-12 min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md bg-red-50 p-8 rounded-2xl border border-red-100">
            <span className="material-symbols-outlined text-red-500 text-5xl mb-4">error</span>
            <p className="text-red-700 font-bold mb-4">{error || 'Tutor no encontrado'}</p>
            <button onClick={() => navigate('/tutors')} className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-container transition-colors">
              Volver al buscador
            </button>
          </div>
        </main>
      </MainLayout>
    );
  }

  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(tutor.nombre_completo)}&background=002045&color=fff&size=200`;

  return (
    <MainLayout>
      <main className="flex-1 p-4 md:p-12 min-h-screen">
        <header className="mb-16 flex flex-col md:flex-row items-start justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-academic-gold uppercase tracking-[0.2em] mb-4 block">Perfil del Tutor</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-primary tracking-tight font-display mb-6 leading-tight">
              {tutor.nombre_completo}
            </h1>
            {tutor.frase_personal && (
              <p className="text-xl text-gray-500 leading-relaxed italic border-l-4 border-academic-gold/50 pl-6">
                "{tutor.frase_personal}"
              </p>
            )}
          </div>
          <div className="flex flex-col items-start md:items-end gap-2">
            <div className="flex items-center gap-1 text-academic-gold">
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="text-xl font-bold">{tutor.calificacion_promedio?.toFixed(1)}</span>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
              {tutor.total_sesiones} sesiones dictadas
            </span>
          </div>
        </header>

        <section className="grid grid-cols-12 gap-16">
          {/* Columna Izquierda: Foto y Metadata */}
          <aside className="col-span-12 lg:col-span-4 space-y-12">
            <div className="aspect-[4/5] bg-surface-container-low rounded-2xl overflow-hidden shadow-ambient relative group">
              <img
                src={tutor.url_avatar || defaultAvatar}
                alt={tutor.nombre_completo}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white text-xs uppercase font-bold tracking-widest">
                  {tutor.anios_experiencia} años de experiencia
                </span>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary border-b border-outline-variant/10 pb-4">
                Materias que dicta
              </h3>
              <div className="flex flex-wrap gap-2">
                {tutor.materias?.map(m => (
                  <span
                    key={m.id}
                    className="px-4 py-2 bg-surface-container-lowest text-primary text-xs font-bold rounded-full border border-outline-variant/20 shadow-sm"
                  >
                    {m.nombre}
                  </span>
                ))}
                {(!tutor.materias || tutor.materias.length === 0) && (
                  <span className="text-sm text-gray-400 italic">No tiene materias registradas</span>
                )}
              </div>
            </div>

            {/* Títulos y Logros */}
            {((tutor.titulos && tutor.titulos.length > 0) || (tutor.logros && tutor.logros.length > 0)) && (
              <div className="bg-surface-container-low p-8 rounded-2xl space-y-8">
                {tutor.titulos && tutor.titulos.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-elegant-gray">Titulaciones</h4>
                    <ul className="space-y-3">
                      {tutor.titulos.map((t, idx) => (
                        <li key={idx} className="flex gap-3 items-start text-sm text-primary">
                          <span className="material-symbols-outlined text-academic-gold text-base mt-0.5">school</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {tutor.logros && tutor.logros.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-elegant-gray">Reconocimientos</h4>
                    <ul className="space-y-3">
                      {tutor.logros.map((l, idx) => (
                        <li key={idx} className="flex gap-3 items-start text-sm text-primary">
                          <span className="material-symbols-outlined text-academic-gold text-base mt-0.5">workspace_premium</span>
                          <span>{l}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </aside>

          {/* Columna Derecha: Bio y Agenda/Reserva */}
          <article className="col-span-12 lg:col-span-8 space-y-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-primary tracking-tight">Sobre {tutor.nombre_completo.split(' ')[0]}</h2>
              <p className="text-gray-500 leading-relaxed text-lg whitespace-pre-line">
                {tutor.biografia || 'Este tutor aún no ha configurado su biografía.'}
              </p>
            </div>

            {/* Cuadro de Agenda y Reserva */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 md:p-10 shadow-ambient border border-outline-variant/10">
              <div className="mb-8">
                <h4 className="font-headline font-bold text-xl text-primary mb-2">Espacios de Disponibilidad Semanal</h4>
                <p className="text-sm text-elegant-gray">Selecciona un bloque de horario para agendar tu tutoría.</p>
              </div>

              {/* Grid Semanal */}
              <div className="grid grid-cols-2 md:grid-cols-7 gap-4 mb-10">
                {[1, 2, 3, 4, 5, 6, 0].map(dayIdx => {
                  const daySlots = groupedDispo[dayIdx];
                  const hasSlots = daySlots && daySlots.length > 0;
                  return (
                    <div key={dayIdx} className="space-y-3">
                      <span className="text-[10px] font-bold text-elegant-gray block text-center uppercase tracking-widest pb-2 border-b border-outline-variant/10">
                        {DAY_NAMES[dayIdx]}
                      </span>
                      {hasSlots ? (
                        daySlots.map(slot => {
                          const isSelected = selectedSlot?.id === slot.id;
                          return (
                            <button
                              key={slot.id}
                              onClick={() => handleSlotSelect(slot)}
                              className={`w-full py-3 px-2 rounded-xl text-xs font-bold transition-all text-center border ${isSelected
                                ? 'bg-academic-gold/10 border-academic-gold text-academic-gold shadow-sm scale-[1.02]'
                                : 'bg-surface-container-low border-outline-variant/10 text-primary hover:border-academic-gold hover:text-academic-gold hover:bg-academic-gold/5'
                                }`}
                            >
                              {slot.horaInicio.substring(0, 5)} - {slot.horaFin.substring(0, 5)}
                            </button>
                          );
                        })
                      ) : (
                        <span className="text-[10px] text-gray-400 italic block text-center py-2">No disp.</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Formulario de Reserva */}
              {selectedSlot && (
                <form onSubmit={handleBookingSubmit} className="mt-8 pt-8 border-t border-outline-variant/10 space-y-6 animate-fadeIn">
                  <div className="bg-surface-container-low p-6 rounded-2xl mb-6">
                    <h5 className="font-bold text-sm text-primary uppercase tracking-wider mb-4">Detalles del bloque seleccionado</h5>
                    <p className="text-sm text-elegant-gray">
                      Día: <span className="font-bold text-primary">{FULL_DAY_NAMES[selectedSlot.diaSemana]}</span>
                    </p>
                    <p className="text-sm text-elegant-gray">
                      Horario: <span className="font-bold text-primary">{selectedSlot.horaInicio.substring(0, 5)} - {selectedSlot.horaFin.substring(0, 5)}</span>
                    </p>
                  </div>

                  {(() => {
                    const ocupadasDelDia = !selectedDate ? [] : sesionesOcupadas.filter(s => {
                      const localDate = new Date(s.programadaPara);
                      const utcYear = localDate.getUTCFullYear();
                      const utcMonth = String(localDate.getUTCMonth() + 1).padStart(2, '0');
                      const utcDay = String(localDate.getUTCDate()).padStart(2, '0');
                      const localDateStr = `${utcYear}-${utcMonth}-${utcDay}`;
                      return localDateStr === selectedDate;
                    });

                    return ocupadasDelDia.length > 0 && (
                      <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl mb-6 animate-fadeIn">
                        <h6 className="text-orange-800 font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">warning</span>
                          Horarios Ocupados Este Día
                        </h6>
                        <ul className="text-sm text-orange-700 space-y-1">
                          {ocupadasDelDia.map(s => {
                            const start = new Date(s.programadaPara);
                            const end = new Date(start.getTime() + s.duracionMin * 60000);
                            return (
                              <li key={s.id} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                                <span className="font-medium">
                                  {start.toLocaleTimeString([], { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' })} - {end.toLocaleTimeString([], { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                        <p className="text-xs text-orange-600 mt-2 font-medium">
                          Por favor elige una hora que no se cruce con estos horarios.
                        </p>
                      </div>
                    );
                  })()}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-elegant-gray block">
                        Materia de estudio *
                      </label>
                      <select
                        value={selectedSubjectId}
                        onChange={(e) => setSelectedSubjectId(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/10 rounded-xl text-sm font-medium focus:outline-none focus:border-academic-gold transition-colors"
                      >
                        {tutor.materias?.map(m => (
                          <option key={m.id} value={m.id}>
                            {m.nombre}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-elegant-gray block">
                        Fecha deseada (debe ser {FULL_DAY_NAMES[selectedSlot.diaSemana]}) *
                      </label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/10 rounded-xl text-sm font-medium focus:outline-none focus:border-academic-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-elegant-gray block">
                        Hora de inicio deseada (de {selectedSlot.horaInicio.substring(0, 5)} a {selectedSlot.horaFin.substring(0, 5)}) *
                      </label>
                      <input
                        type="time"
                        value={selectedTime}
                        min={selectedSlot.horaInicio.substring(0, 5)}
                        max={selectedSlot.horaFin.substring(0, 5)}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/10 rounded-xl text-sm font-medium focus:outline-none focus:border-academic-gold transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-elegant-gray block">
                        Duración (minutos) *
                      </label>
                      <input
                        type="number"
                        min="15"
                        max="360"
                        value={selectedDuration}
                        onChange={(e) => setSelectedDuration(parseInt(e.target.value))}
                        required
                        className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/10 rounded-xl text-sm font-medium focus:outline-none focus:border-academic-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-elegant-gray block">
                      Mensaje / Dudas o temas a tratar (Opcional)
                    </label>
                    <textarea
                      rows="3"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ej: Hola, me gustaría repasar los temas de límites de cara al parcial..."
                      className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/10 rounded-xl text-sm font-medium focus:outline-none focus:border-academic-gold transition-colors resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-6 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Inversión por hora</p>
                      <p className="text-3xl font-black text-primary">
                        ${tutor.precio_por_hora?.toLocaleString('es-CO')} COP
                        <span className="text-sm font-medium text-gray-400"> / h</span>
                      </p>
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="signature-gradient text-white px-10 py-4 rounded-xl font-bold shadow-xl shadow-primary/20 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:transform-none"
                    >
                      {submitting ? 'Enviando...' : 'Solicitar Tutoría'}
                    </button>
                  </div>
                </form>
              )}

              {successMessage && (
                <div className="mt-6 p-6 bg-green-50 border border-green-200 text-green-800 rounded-2xl flex items-start gap-4 animate-fadeIn">
                  <span className="material-symbols-outlined text-green-500">check_circle</span>
                  <div>
                    <h5 className="font-bold text-sm mb-1">¡Todo listo!</h5>
                    <p className="text-xs text-green-700">{successMessage}</p>
                  </div>
                </div>
              )}
            </div>
          </article>
        </section>
      </main>
    </MainLayout>
  );
};

export default TutorAgendaDetail;
