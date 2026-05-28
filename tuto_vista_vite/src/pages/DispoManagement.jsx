import React, { useState, useEffect, useCallback } from "react";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import AcademicCalendar from "../features/dashboard/AcademicCalendar/AcademicCalendar";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import { HourlyRateCard } from "../features/tutors/HourlyRateCard/HourlyRateCard";
import StatCard from "../components/ui/StatCard/StatCard";

const DispoManagement = () => {
  const { user } = useAuth();
  const [disponibilidad, setDisponibilidad] = useState([]);
  const [hourlyRate, setHourlyRate] = useState(0);
  const [loading, setLoading] = useState(true);

  // Estados para el manejo de Disponibilidad Específica (Por fecha)
  const [showSpecificModal, setShowSpecificModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [specificHours, setSpecificHours] = useState({
    horaInicio: "08:00",
    horaFin: "12:00",
    estaDisponible: true
  });

  const mapDispoToEvents = useCallback((dispoList) => {
    if (!Array.isArray(dispoList)) return [];

    return dispoList
      .filter((d) => d !== null && d !== undefined) // Evitamos romper si viene algún nulo
      .map((d) => {
        // Extraemos las horas soportando tanto CamelCase como snake_case
        const horaInicioRaw = d.horaInicio || d.hora_inicio;
        const horaFinRaw = d.horaFin || d.hora_fin;

        // Si por algún motivo no hay horas válidas, evitamos romper el substring usando un fallback seguro
        const startFmt = horaInicioRaw ? horaInicioRaw.substring(0, 5) : "00:00";
        const endFmt = horaFinRaw ? horaFinRaw.substring(0, 5) : "00:00";

        // Detectar si contiene el campo de fecha única (Disponibilidad Específica)
        const fechaPuntual = d.fecha || d.fecha_especifica;

        if (fechaPuntual) {
          const disponible = d.estaDisponible !== undefined ? d.estaDisponible : (d.esta_disponible !== undefined ? d.esta_disponible : true);

          return {
            id: `specific-${d.id}`,
            title: `Puntual: ${startFmt} - ${endFmt}`,
            start: `${fechaPuntual}T${horaInicioRaw || "00:00:00"}`,
            end: `${fechaPuntual}T${horaFinRaw || "00:00:00"}`,
            extendedProps: {
              type: "Disponibilidad Específica",
              status: disponible ? "Disponible" : "Bloqueado",
              time: `${startFmt} - ${endFmt}`,
            },
            color: disponible ? "#002045" : "#ef4444",
            allDay: false
          };
        }

        // --- Registro estándar recurrente ---
        const diaSemana = d.diaSemana !== undefined ? d.diaSemana : d.dia_semana;

        return {
          id: `recur-${d.id}`,
          title: `${startFmt} - ${endFmt}`,
          daysOfWeek: [diaSemana],
          startTime: horaInicioRaw,
          endTime: horaFinRaw,
          extendedProps: {
            type: "Disponibilidad Recurrente",
            status: "Activo",
            time: `${startFmt} - ${endFmt}`,
          },
          color: "#002045",
        };
      });
  }, []);

  const loadDisponibilidad = useCallback(async () => {
    if (!user?.id) return;
    try {
      setLoading(true);

      // Desacomplamos el Promise.all con bloques .catch individuales para asegurar que 
      // si el endpoint de específicas falla, las recurrentes sigan cargando sin problemas.
      const [dispoRecurrente, dispoEspecifica, tutorProfile] = await Promise.all([
        api.get(`/disponibilidad/tutor/${user.id}`).catch((err) => {
          console.error("Error obteniendo recurrentes:", err);
          return [];
        }),
        api.get(`/disponibilidad/especifica/tutor/${user.id}`).catch((err) => {
          console.warn("Endpoint específico no disponible o vacío aún:", err);
          return []; // Retorno seguro para que no rompa el spread operator
        }),
        api.get(`/tutores/${user.id}`).catch(() => null),
      ]);

      const todasLasDisponibilidades = [
        ...(Array.isArray(dispoRecurrente) ? dispoRecurrente : []),
        ...(Array.isArray(dispoEspecifica) ? dispoEspecifica : [])
      ];

      const eventosMapeados = mapDispoToEvents(todasLasDisponibilidades);
      setDisponibilidad(eventosMapeados);
      setHourlyRate(tutorProfile?.precio_por_hora || 0);

    } catch (err) {
      console.error("Error general cargando las configuraciones:", err);
    } finally {
      setLoading(false);
    }
  }, [user, mapDispoToEvents]);

  useEffect(() => {
    loadDisponibilidad();
  }, [loadDisponibilidad]);

  const handleSaveRate = async (newRate) => {
    try {
      await api.patch(`/perfiles/tutor/${user.id}`, { precio_por_hora: newRate });
      setHourlyRate(newRate);
    } catch (err) {
      if (err.message && (err.message.includes("JSON.parse") || err.syntaxError)) {
        setHourlyRate(newRate);
        return;
      }
      console.error("Error actualizando la tarifa:", err);
      alert("No se pudo guardar la nueva tarifa.");
    }
  };

  const handleSelect = async (info) => {
    const esVistaMes = info.view.type === "dayGridMonth";
    const esDiaCompleto = (info.end - info.start) === 86400000;

    if (esVistaMes || esDiaCompleto) {
      const fechaCasteada = info.startStr.split("T")[0];
      setSelectedDate(fechaCasteada);
      setShowSpecificModal(true);
      return;
    }

    const diaSemana = info.start.getDay();
    const horaInicio = info.start.toTimeString().split(" ")[0];
    const horaFin = info.end.toTimeString().split(" ")[0];

    try {
      await api.post("/disponibilidad", {
        tutorId: user.id,
        diaSemana,
        horaInicio,
        horaFin,
        estaActivo: true,
      });
      loadDisponibilidad();
    } catch (err) {
      console.error("Error guardando bloque recurrente:", err);
      alert("Error guardando bloque de disponibilidad.");
    }
  };

  const handleSaveSpecificDispo = async (e) => {
    e.preventDefault();
    try {
      await api.post("/disponibilidad/especifica", {
        tutorId: user.id,
        fecha: selectedDate,
        horaInicio: `${specificHours.horaInicio}:00`,
        horaFin: `${specificHours.horaFin}:00`,
        estaDisponible: specificHours.estaDisponible
      });

      setShowSpecificModal(false);
      loadDisponibilidad();
    } catch (err) {
      console.error("Error guardando disponibilidad puntual:", err);
      alert("No se pudo agendar la disponibilidad específica.");
    }
  };

  const handleEventClick = async (info) => {
    const isSpecific = info.event.id.toString().startsWith("specific-");
    const dbId = info.event.id.toString().replace("specific-", "").replace("recur-", "");

    if (window.confirm(`¿Deseas eliminar este bloque de disponibilidad ${isSpecific ? "puntual" : "recurrente"}?`)) {
      try {
        const endpoint = isSpecific ? `/disponibilidad/especifica/${dbId}` : `/disponibilidad/${dbId}`;
        await api.delete(endpoint);
        loadDisponibilidad();
      } catch (err) {
        console.error("Error eliminando bloque:", err);
      }
    }
  };

  const formattedRate = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(hourlyRate || 0);

  return (
    <MainLayout>
      <div className="flex flex-col flex-1 w-full relative">
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-10 px-3 md:px-6 lg:px-12 py-3 md:py-5 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <span className="text-xl font-bold text-primary font-display">
            Configuración de Horarios
          </span>
          <div className="flex gap-4">
            <p className="text-sm text-gray-500 my-auto">
              Vista de Mes: Asignar fecha puntual | Vista de Semana: Arrastrar recurrente
            </p>
          </div>
        </header>

        <main className="flex-1 px-2 md:px-6 lg:px-12 py-8 w-full">
          <div className="w-full max-w-[1700px] mx-auto">
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-extrabold text-primary font-display mb-2">
                Gestión de Disponibilidad
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                Cambia a la vista de <strong>Mes</strong> y haz click en un día para definir una regla específica solo para esa fecha.
              </p>
            </header>

            {loading ? (
              <div className="text-center p-12 text-gray-500">
                Cargando configuraciones de tutoría...
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-12 gap-8 items-start w-full">
                <div className="lg:col-span-8 xl:col-span-9 bg-white p-2 md:p-8 rounded-xl shadow-sm border border-gray-100 w-full overflow-hidden">
                  <div className="w-full overflow-x-auto -mx-1 px-1">
                    <div className="min-w-[600px]">
                      <AcademicCalendar
                        events={disponibilidad}
                        initialView="timeGridWeek"
                        headerToolbar={{
                          left: "prev,next today",
                          center: "title",
                          right: "dayGridMonth,timeGridWeek",
                        }}
                        selectable={true}
                        editable={false}
                        onSelect={handleSelect}
                        onEventClick={handleEventClick}
                        slotMinTime="06:00:00"
                        slotMaxTime="22:00:00"
                        allDaySlot={false}
                      />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 xl:col-span-3 space-y-6 w-full">
                  <StatCard
                    label="Tarifa Vigente Actual"
                    value={formattedRate}
                    icon="payments"
                    gradient={true}
                    defaultValue={0}
                  />
                  <HourlyRateCard
                    initialRate={hourlyRate}
                    onSaveRate={handleSaveRate}
                  />
                </div>
              </div>
            )}
          </div>
        </main>

        {showSpecificModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-gray-100 animate-in fade-in zoom-in duration-200">
              <h3 className="text-xl font-bold text-primary font-headline mb-1">
                Disponibilidad Especial
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Configurando el día: <span className="font-semibold text-academic-gold">{selectedDate}</span>
              </p>

              <form onSubmit={handleSaveSpecificDispo} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Hora Inicio</label>
                    <input
                      type="time"
                      required
                      value={specificHours.horaInicio}
                      onChange={(e) => setSpecificHours({ ...specificHours, horaInicio: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Hora Fin</label>
                    <input
                      type="time"
                      required
                      value={specificHours.horaFin}
                      onChange={(e) => setSpecificHours({ ...specificHours, horaFin: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Acción para este día</label>
                  <select
                    value={specificHours.estaDisponible ? "true" : "false"}
                    onChange={(e) => setSpecificHours({ ...specificHours, estaDisponible: e.target.value === "true" })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-primary bg-white"
                  >
                    <option value="true">🟢 Agregar horas libres extra</option>
                    <option value="false">🔴 Bloquear horario (Excepción/No atiendo)</option>
                  </select>
                </div>

                <div className="flex gap-3 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSpecificModal(false)}
                    className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 active:scale-95 transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-container active:scale-95 transition-all shadow-sm"
                  >
                    Guardar Fecha
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DispoManagement;