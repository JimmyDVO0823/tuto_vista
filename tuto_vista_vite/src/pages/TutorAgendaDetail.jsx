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
  const [dispoEspecifica, setDispoEspecifica] = useState([]);
  // 🛠️ Unificamos todas las fuentes que quitan tiempo al tutor (Sesiones y Solicitudes Aceptadas)
  const [compromisosOcupados, setCompromisosOcupados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Booking states
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDuration, setSelectedDuration] = useState(90);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const getNextDateForDayOfWeek = (dayOfWeek) => {
    const resultDate = new Date();
    const currentDay = resultDate.getDay();
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

      const [tutorData, dispoData, dispoEspecData, sesionesData, solicitudesData] = await Promise.all([
        api.get(`/tutores/${id}`),
        api.get(`/disponibilidad/tutor/${id}`),
        api.get(`/disponibilidad/especifica/tutor/${id}`).catch(() => []),
        api.get(`/sesiones/tutor/${id}`).catch(() => []),
        api.get(`/solicitudes/tutor/${id}`).catch(() => []) // 🛠️ Traemos solicitudes del tutor
      ]);

      setTutor(tutorData);
      setDisponibilidad(dispoData || []);
      setDispoEspecifica(dispoEspecData || []);

      // 🛠️ Procesar sesiones firmes
      const sesionesMapeadas = (sesionesData || [])
        .filter(s => s.estado === 'programada' || s.estado === 'en_progreso')
        .map(s => ({
          tipo: 'SESION',
          fecha: s.programadaPara ? s.programadaPara.split('T')[0] : '',
          horaInicio: s.programadaPara ? s.programadaPara.split('T')[1].substring(0, 5) : '',
          duracionMin: s.duracionMin || 60,
          label: 'Sesión Programada'
        }));

      // 🛠️ Procesar solicitudes aceptadas esperando pago que ya guardan espacio
      const solicitudesMapeadas = (solicitudesData || [])
        .filter(s => s.estado?.toLowerCase() === 'aceptada' || s.estado?.toLowerCase() === 'accepted')
        .map(s => ({
          tipo: 'SOLICITUD_ACEPTADA',
          fecha: s.fechaPreferida,
          horaInicio: s.horaPreferida?.substring(0, 5),
          duracionMin: s.duracionMin || 60,
          label: 'Aceptada (Esperando Pago)'
        }));

      // Combinamos ambas fuentes de bloqueo en un único set de compromisos
      setCompromisosOcupados([...sesionesMapeadas, ...solicitudesMapeadas]);

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

  // 🌟 REGRESAMOS A LOS BLOQUES SEMANALES LIMPIOS E INTACTOS
  const groupedDispo = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 0: [] };
  const todayStr = new Date().toISOString().split('T')[0];

  // 1. Procesar las recurrentes normales tal cual vienen de la regla semanal
  disponibilidad.forEach(slot => {
    if (groupedDispo[slot.diaSemana] !== undefined) {
      groupedDispo[slot.diaSemana].push({
        ...slot,
        isEspecifica: false,
        fechaPorDefecto: getNextDateForDayOfWeek(slot.diaSemana)
      });
    }
  });

  // 2. Inyectar las específicas que sean Horas Extra (estaDisponible === true)
  dispoEspecifica.forEach(espec => {
    if (espec.estaDisponible) {
      const [year, month, day] = espec.fecha.split('-').map(Number);
      const specDate = new Date(year, month - 1, day);
      const dayOfWeek = specDate.getDay();

      if (espec.fecha >= todayStr && groupedDispo[dayOfWeek] !== undefined) {
        const yaExiste = groupedDispo[dayOfWeek].some(s => s.isEspecifica && s.id === `spec-${espec.id}`);

        if (!yaExiste) {
          groupedDispo[dayOfWeek].push({
            id: `spec-${espec.id}`,
            diaSemana: dayOfWeek,
            horaInicio: espec.horaInicio,
            horaFin: espec.horaFin,
            isEspecifica: true,
            fechaPorDefecto: espec.fecha
          });
        }
      }
    }
  });

  // Ordenar por hora de inicio
  Object.keys(groupedDispo).forEach(day => {
    groupedDispo[day].sort((a, b) => a.horaInicio.substring(0, 5).localeCompare(b.horaInicio.substring(0, 5)));
  });

  // Helper matemático de tiempo
  const timeToMinutes = (t) => {
    if (!t) return 0;
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };

  const minutesToTime = (totalMinutes) => {
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };

  // 🛠️ OBTENER TODOS LOS COMPROMISOS DEL DÍA SELECCIONADO PARA MOSTRAR AL ALUMNO
  // 🛠️ OBTENER TODOS LOS COMPROMISOS DEL DÍA (SESIONES, SOLICITUDES Y BLOQUEOS MANUALES)
  const obtenerCompromisosDelDia = () => {
    if (!selectedDate) return [];

    // 1. Obtener sesiones y solicitudes aceptadas
    const compromisos = compromisosOcupados.filter(c => c.fecha === selectedDate).map(c => {
      const inicioMin = timeToMinutes(c.horaInicio);
      const finMin = inicioMin + c.duracionMin;
      return {
        ...c,
        horaFin: minutesToTime(finMin)
      };
    });

    // 2. 🌟 NUEVO: Capturar e inyectar los bloqueos manuales (estaDisponible === false) de este día
    const bloqueosManuales = dispoEspecifica
      .filter(e => e.fecha === selectedDate && !e.estaDisponible)
      .map(b => ({
        tipo: 'BLOQUEO_MANUAL',
        fecha: b.fecha,
        horaInicio: b.horaInicio.substring(0, 5),
        horaFin: b.horaFin.substring(0, 5),
        label: 'Bloqueado por el Tutor'
      }));

    // Combinamos todo y lo ordenamos cronológicamente para que se vea impecable
    return [...compromisos, ...bloqueosManuales].sort((a, b) =>
      a.horaInicio.localeCompare(b.horaInicio)
    );
  };

  const compromisosDelDia = obtenerCompromisosDelDia();

  // 🌟 FUNCIÓN EN CALIENTE PARA DETECTAR SI EL HORARIO PROCE_EDE A UN BLOQUEO DEL TUTOR
  const comprobarSiEstaBloqueado = () => {
    if (!selectedDate || !selectedTime) return null;

    const bloqueo = dispoEspecifica.find(e => e.fecha === selectedDate && !e.estaDisponible);
    if (!bloqueo) return null;

    const inicioSesion = timeToMinutes(selectedTime);
    const finSesion = inicioSesion + parseInt(selectedDuration);
    const inicioBloqueo = timeToMinutes(bloqueo.horaInicio.substring(0, 5));
    const finBloqueo = timeToMinutes(bloqueo.horaFin.substring(0, 5));

    const seCruza = inicioSesion < finBloqueo && finSesion > inicioBloqueo;

    if (seCruza) {
      return {
        inicio: bloqueo.horaInicio.substring(0, 5),
        fin: bloqueo.horaFin.substring(0, 5)
      };
    }

    return null;
  };

  const infoBloqueo = comprobarSiEstaBloqueado();

  // 🛠️ DETECTAR COLISIÓN DEL INPUT ACTUAL CON SESIONES U OTRAS SOLICITUDES ACEPTADAS
  const comprobarColisionCompromisos = () => {
    if (!selectedDate || !selectedTime) return null;

    const inicioSesion = timeToMinutes(selectedTime);
    const finSesion = inicioSesion + parseInt(selectedDuration);

    const conflicto = compromisosDelDia.find(c => {
      const cInicio = timeToMinutes(c.horaInicio);
      const cFin = cInicio + c.duracionMin;
      return inicioSesion < cFin && finSesion > cInicio;
    });

    return conflicto || null;
  };

  const infoConflictoCompromiso = comprobarColisionCompromisos();

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setSelectedDate(slot.isEspecifica ? slot.fechaPorDefecto : getNextDateForDayOfWeek(slot.diaSemana));
    setSelectedTime(slot.horaInicio.substring(0, 5));
    setSuccessMessage(null);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Debes iniciar sesión como estudiante para solicitar una tutoría.');
      navigate('/loginform');
      return;
    }

    if (!selectedSlot) { alert('Por favor selecciona un bloque de disponibilidad.'); return; }
    if (!selectedSubjectId) { alert('Por favor selecciona la materia.'); return; }
    if (!selectedDate) { alert('Por favor selecciona la fecha de la tutoría.'); return; }
    if (!selectedTime) { alert('Por favor selecciona la hora de la tutoría.'); return; }
    if (infoBloqueo) { alert('No puedes solicitar tutorías en un rango de horas bloqueado por el tutor.'); return; }
    if (infoConflictoCompromiso) { alert(`El horario entra en conflicto con una agenda ya reservada: ${infoConflictoCompromiso.label}`); return; }

    const [year, month, day] = selectedDate.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    if (dateObj.getDay() !== selectedSlot.diaSemana) {
      alert(`La fecha seleccionada no es un ${FULL_DAY_NAMES[selectedSlot.diaSemana]}. Por favor selecciona una fecha correspondiente.`);
      return;
    }

    if (selectedSlot.isEspecifica && selectedDate !== selectedSlot.fechaPorDefecto) {
      alert(`Este bloque corresponds a una fecha especial única: ${selectedSlot.fechaPorDefecto}. No se puede cambiar el día.`);
      return;
    }

    const slotStartMin = timeToMinutes(selectedSlot.horaInicio.substring(0, 5));
    const slotEndMin = timeToMinutes(selectedSlot.horaFin.substring(0, 5));
    const selectedStartMin = timeToMinutes(selectedTime.substring(0, 5));
    const sessionEndMin = selectedStartMin + parseInt(selectedDuration);

    if (selectedStartMin < slotStartMin || selectedStartMin > slotEndMin) {
      alert(`La hora de inicio debe estar dentro del bloque disponible del tutor: ${selectedSlot.horaInicio.substring(0, 5)} - ${selectedSlot.horaFin.substring(0, 5)}.`);
      return;
    }

    if (sessionEndMin > slotEndMin) {
      alert(`La sesión excede el horario de disponibilidad del tutor.`);
      return;
    }

    try {
      setSubmitting(true);
      const horaFormateada = selectedTime.length === 5 ? `${selectedTime}:00` : selectedTime;

      const payload = {
        tutorId: parseInt(id),
        materiaId: parseInt(selectedSubjectId),
        fechaPreferida: selectedDate,
        horaPreferida: horaFormateada,
        duracionMin: parseInt(selectedDuration),
        mensaje: message,
      };

      await api.post('/solicitudes', payload);
      setSuccessMessage('¡Solicitud de tutoría enviada exitosamente! El tutor revisará tu propuesta.');

      setSelectedSlot(null);
      setSelectedTime('');
      setMessage('');
      // Recargar detalles para refrescar compromisos en caliente
      loadTutorDetails();
    } catch (err) {
      console.error('Error enviando solicitud:', err);
      alert(err.message || 'Error al enviar la solicitud de tutoría.');
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
        <header className="mb-8 md:mb-16 flex flex-col md:flex-row items-start justify-between gap-6">
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

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <aside className="col-span-12 lg:col-span-4 space-y-12">
            <div className="aspect-[4/5] bg-surface-container-low rounded-2xl overflow-hidden shadow-ambient relative group">
              <img src={tutor.url_avatar || defaultAvatar} alt={tutor.nombre_completo} className="w-full h-full object-cover" />
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
                  <span key={m.id} className="px-4 py-2 bg-surface-container-lowest text-primary text-xs font-bold rounded-full border border-outline-variant/20 shadow-sm">
                    {m.nombre}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          <article className="col-span-12 lg:col-span-8 space-y-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-primary tracking-tight">Sobre {tutor.nombre_completo.split(' ')[0]}</h2>
              <p className="text-gray-500 leading-relaxed text-lg whitespace-pre-line">
                {tutor.biografia || 'Este tutor aún no ha configurado su biografía.'}
              </p>
            </div>

            <div className="bg-surface-container-lowest rounded-3xl p-5 md:p-10 shadow-ambient border border-outline-variant/10">
              <div className="mb-8">
                <h4 className="font-headline font-bold text-xl text-primary mb-2">Espacios de Disponibilidad Semanal</h4>
                <p className="text-sm text-elegant-gray">Selecciona un bloque de horario para agendar tu tutoría. Los bloques azules (⭐) son horarios especiales añadidos por el tutor.</p>
              </div>

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
                              type="button"
                              onClick={() => handleSlotSelect(slot)}
                              className={`w-full py-3 px-2 rounded-xl text-xs font-bold transition-all text-center border ${isSelected
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
                        <span className="text-[10px] text-gray-400 italic block text-center py-2">No disp.</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {selectedSlot && (
                <form onSubmit={handleBookingSubmit} className="mt-8 pt-8 border-t border-outline-variant/10 space-y-6 animate-fadeIn">

                  {/* 🛠️ CONTENEDOR SPLIT: DETALLES DEL BLOQUE + AGENDA OCUPADA VISIBLE */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface-container-low p-6 rounded-2xl mb-6">
                    <div>
                      <h5 className="font-bold text-xs text-primary uppercase tracking-wider mb-3">Tu Bloque Seleccionado</h5>
                      <p className="text-sm text-elegant-gray">
                        Día: <span className="font-bold text-primary">{FULL_DAY_NAMES[selectedSlot.diaSemana]}</span>
                      </p>
                      <p className="text-sm text-elegant-gray">
                        Rango Permitido: <span className="font-bold text-primary">{selectedSlot.horaInicio.substring(0, 5)} - {selectedSlot.horaFin.substring(0, 5)}</span>
                      </p>
                    </div>

                    {/* 🛠️ LISTADO EN TIEMPO REAL DE HORARIOS YA OCUPADOS EN ESE DÍA ESPECÍFICO */}
                    <div className="border-t md:border-t-0 md:border-l border-outline-variant/20 pt-4 md:pt-0 md:pl-6">
                      <h5 className="font-bold text-xs text-red-700 uppercase tracking-wider mb-3 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">calendar_today</span>
                        Compromisos del Tutor ({selectedDate})
                      </h5>
                      {compromisosDelDia.length > 0 ? (
                        <div className="space-y-2 max-h-32 overflow-y-auto pr-1"> {/* Subimos un pelo el max-h por si hay varios */}
                          {compromisosDelDia.map((comp, idx) => (
                            <div key={idx} className="flex justify-between items-center text-xs bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-2xs">
                              <span className="font-mono font-bold text-gray-700">{comp.horaInicio} - {comp.horaFin}</span>
                              <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold ${comp.tipo === 'SESION'
                                  ? 'bg-blue-50 text-blue-700 border border-blue-100'
                                  : comp.tipo === 'BLOQUEO_MANUAL'
                                    ? 'bg-red-50 text-red-600 border border-red-100' // 🌟 Estilo para el Bloqueo Manual
                                    : 'bg-amber-50 text-amber-700 border border-amber-100'
                                }`}>
                                {comp.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-green-600 italic font-medium flex items-center gap-1 mt-2">
                          <span className="material-symbols-outlined text-sm">check_circle</span>
                          ¡Tutor totalmente libre este día!
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-elegant-gray block">Materia de estudio *</label>
                      <select
                        value={selectedSubjectId}
                        onChange={(e) => setSelectedSubjectId(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/10 rounded-xl text-sm font-medium focus:outline-none focus:border-academic-gold transition-colors"
                      >
                        {tutor.materias?.map(m => (
                          <option key={m.id} value={m.id}>{m.nombre}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-elegant-gray block">Fecha deseada *</label>
                      <input
                        type="date"
                        value={selectedDate}
                        disabled={selectedSlot.isEspecifica}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/10 rounded-xl text-sm font-medium focus:outline-none focus:border-academic-gold transition-colors disabled:opacity-70 disabled:bg-gray-100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-elegant-gray block">Hora de inicio deseada *</label>
                      <input
                        type="time"
                        value={selectedTime}
                        min={selectedSlot.horaInicio.substring(0, 5)}
                        max={selectedSlot.horaFin.substring(0, 5)}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        required
                        className={`w-full px-4 py-3 bg-surface-container-low border rounded-xl text-sm font-medium focus:outline-none transition-colors ${infoConflictoCompromiso ? 'border-red-300 focus:border-red-500 bg-red-50/30' : 'border-outline-variant/10 focus:border-academic-gold'
                          }`}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-elegant-gray block">Duración (minutos) *</label>
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
                    <label className="text-xs font-bold uppercase tracking-wider text-elegant-gray block">Mensaje / Dudas o temas a tratar</label>
                    <textarea
                      rows="3"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ej: Hola, me gustaría repasar los temas de límites..."
                      className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/10 rounded-xl text-sm font-medium focus:outline-none focus:border-academic-gold transition-colors resize-none"
                    ></textarea>
                  </div>

                  {/* 🚨 ADVERTENCIA 1: BLOQUEO EXPLÍCITO MANUAL DEL TUTOR */}
                  {infoBloqueo && (
                    <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl flex items-start gap-3 my-4 animate-fadeIn">
                      <span className="material-symbols-outlined text-amber-600">warning</span>
                      <div className="text-xs font-medium">
                        <p className="font-bold text-amber-900 mb-0.5">Horario no disponible para esta fecha</p>
                        El tutor ha inhabilitado la franja de <span className="font-bold">{infoBloqueo.inicio} a {infoBloqueo.fin}</span> para el día elegido. Por favor, selecciona una hora diferente fuera de ese rango.
                      </div>
                    </div>
                  )}

                  {/* 🚨 ADVERTENCIA 2: CRUCE DINÁMICO DE AGENDA OCUPADA */}
                  {infoConflictoCompromiso && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl flex items-start gap-3 my-4 animate-fadeIn">
                      <span className="material-symbols-outlined text-red-600">error</span>
                      <div className="text-xs font-medium">
                        <p className="font-bold text-red-900 mb-0.5">Conflicto de Horario Detectado</p>
                        Tu tutoría propuesta se cruza con una <span className="font-bold text-red-900 uppercase">"{infoConflictoCompromiso.label}"</span> agendada de <span className="font-bold">{infoConflictoCompromiso.horaInicio} a {infoConflictoCompromiso.horaFin}</span>. Ajusta los minutos o la hora de inicio.
                      </div>
                    </div>
                  )}

                  <div className="pt-6 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Inversión por hora</p>
                      <p className="text-2xl md:text-3xl font-black text-primary">
                        ${tutor.precio_por_hora?.toLocaleString('es-CO')} COP
                        <span className="text-sm font-medium text-gray-400"> / h</span>
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting || !!infoBloqueo || !!infoConflictoCompromiso}
                      className={`px-10 py-4 rounded-xl font-bold shadow-xl transition-all w-full md:w-auto ${(!!infoBloqueo || !!infoConflictoCompromiso)
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none opacity-60'
                        : 'signature-gradient text-white hover:-translate-y-0.5 shadow-primary/20'
                        }`}
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