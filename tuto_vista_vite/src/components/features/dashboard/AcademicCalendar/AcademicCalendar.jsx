import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // Vista de mes
import timeGridPlugin from '@fullcalendar/timegrid' // Vista de semana

export default function AcademicCalendar() {
  return (
    <div className="bg-surface-container-lowest p-8 rounded-lg shadow-ambient font-body">
      <style>{`
        .fc {
          --fc-button-bg-color: #002045;
          --fc-button-border-color: #002045;
          --fc-button-hover-bg-color: #1a365d;
          --fc-button-hover-border-color: #1a365d;
          --fc-button-active-bg-color: #CEAE42;
          --fc-button-active-border-color: #CEAE42;
          --fc-event-bg-color: #002045;
          --fc-event-border-color: #002045;
          --fc-today-bg-color: #F2F4F6;
        }
        .fc .fc-toolbar-title {
          font-family: 'Manrope', sans-serif;
          font-weight: 700;
          color: #002045;
          font-size: 1.5rem;
        }
        .fc .fc-button {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          text-transform: capitalize;
          border-radius: 0.75rem;
        }
        .fc .fc-col-header-cell-cushion {
          font-family: 'Manrope', sans-serif;
          font-weight: 600;
          color: #696C6E;
          text-decoration: none;
        }
        .fc .fc-daygrid-day-number {
          font-family: 'Inter', sans-serif;
          color: #696C6E;
          text-decoration: none;
          padding: 8px;
        }
      `}</style>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek' // Botones para cambiar vista
        }}
        events={[
          { title: 'Tutoría Física', date: '2024-05-20', color: '#002045' },
          { title: 'Entrega Ensayo', date: '2024-05-22', color: '#CEAE42' }
        ]}
        // Aquí aplicas tu estilo:
        eventClassNames="rounded-md border-none font-body text-xs shadow-sm px-2 py-0.5"
      />
    </div>
  )
}