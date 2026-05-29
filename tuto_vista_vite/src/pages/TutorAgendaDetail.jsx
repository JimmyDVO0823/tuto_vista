import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

// Import subcomponents
import TutorHero from '../features/tutor-detail/components/TutorHero';
import TutorProfileSidebar from '../features/tutor-detail/components/TutorProfileSidebar';
import TutorBio from '../features/tutor-detail/components/TutorBio';
import AvailabilityCalendar from '../features/tutor-detail/components/AvailabilityCalendar';
import ReviewSection from '../features/tutor-detail/components/ReviewSection';

const TutorAgendaDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [tutor, setTutor] = useState(null);
  const [disponibilidad, setDisponibilidad] = useState([]);
  const [dispoEspecifica, setDispoEspecifica] = useState([]);
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
        api.get(`/solicitudes/tutor/${id}`).catch(() => []) 
      ]);

      setTutor(tutorData);
      setDisponibilidad(dispoData || []);
      setDispoEspecifica(dispoEspecData || []);

      const sesionesMapeadas = (sesionesData || [])
        .filter(s => s.estado === 'programada' || s.estado === 'en_progreso')
        .map(s => ({
          tipo: 'SESION',
          fecha: s.programadaPara ? s.programadaPara.split('T')[0] : '',
          horaInicio: s.programadaPara ? s.programadaPara.split('T')[1].substring(0, 5) : '',
          duracionMin: s.duracionMin || 60,
          label: 'Sesión Programada'
        }));

      const solicitudesMapeadas = (solicitudesData || [])
        .filter(s => (s.estado?.toLowerCase() === 'aceptada' || s.estado?.toLowerCase() === 'accepted') && !s.pagada)
        .map(s => ({
          tipo: 'SOLICITUD_ACEPTADA',
          fecha: s.fechaPreferida,
          horaInicio: s.horaPreferida?.substring(0, 5),
          duracionMin: s.duracionMin || 60,
          label: 'Aceptada (Esperando Pago)'
        }));

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

  const groupedDispo = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 0: [] };
  const todayStr = new Date().toISOString().split('T')[0];

  disponibilidad.forEach(slot => {
    if (groupedDispo[slot.diaSemana] !== undefined) {
      groupedDispo[slot.diaSemana].push({
        ...slot,
        isEspecifica: false,
        fechaPorDefecto: getNextDateForDayOfWeek(slot.diaSemana)
      });
    }
  });

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

  Object.keys(groupedDispo).forEach(day => {
    groupedDispo[day].sort((a, b) => a.horaInicio.substring(0, 5).localeCompare(b.horaInicio.substring(0, 5)));
  });

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

  const obtenerCompromisosDelDia = () => {
    if (!selectedDate) return [];

    const compromisos = compromisosOcupados.filter(c => c.fecha === selectedDate).map(c => {
      const inicioMin = timeToMinutes(c.horaInicio);
      const finMin = inicioMin + c.duracionMin;
      return {
        ...c,
        horaFin: minutesToTime(finMin)
      };
    });

    const bloqueosManuales = dispoEspecifica
      .filter(e => e.fecha === selectedDate && !e.estaDisponible)
      .map(b => ({
        tipo: 'BLOQUEO_MANUAL',
        fecha: b.fecha,
        horaInicio: b.horaInicio.substring(0, 5),
        horaFin: b.horaFin.substring(0, 5),
        label: 'Bloqueado por el Tutor'
      }));

    return [...compromisos, ...bloqueosManuales].sort((a, b) =>
      a.horaInicio.localeCompare(b.horaInicio)
    );
  };

  const compromisosDelDia = obtenerCompromisosDelDia();

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

  return (
    <MainLayout>
      <main className="flex-1 p-4 md:p-12 min-h-screen">
        <TutorHero tutor={tutor} />

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <TutorProfileSidebar tutor={tutor} />

          <article className="col-span-12 lg:col-span-8 space-y-16">
            <TutorBio tutor={tutor} />

            <AvailabilityCalendar
              tutor={tutor}
              groupedDispo={groupedDispo}
              selectedSlot={selectedSlot}
              handleSlotSelect={handleSlotSelect}
              handleBookingSubmit={handleBookingSubmit}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              selectedDuration={selectedDuration}
              setSelectedDuration={setSelectedDuration}
              selectedSubjectId={selectedSubjectId}
              setSelectedSubjectId={setSelectedSubjectId}
              message={message}
              setMessage={setMessage}
              submitting={submitting}
              compromisosDelDia={compromisosDelDia}
              infoBloqueo={infoBloqueo}
              infoConflictoCompromiso={infoConflictoCompromiso}
            />

            {successMessage && (
              <div className="mt-6 p-6 bg-green-50 border border-green-200 text-green-800 rounded-2xl flex items-start gap-4 animate-in fade-in duration-300">
                <span className="material-symbols-outlined text-green-500">check_circle</span>
                <div>
                  <h5 className="font-bold text-sm mb-1">¡Todo listo!</h5>
                  <p className="text-xs text-green-700">{successMessage}</p>
                </div>
              </div>
            )}

            <ReviewSection 
              tutorId={id} 
              studentId={user?.id}
              canReview={user?.rol?.toLowerCase() === 'estudiante'}
            />
          </article>
        </section>
      </main>
    </MainLayout>
  );
};

export default TutorAgendaDetail;