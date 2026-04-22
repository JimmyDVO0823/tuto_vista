import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // Vista de mes
import timeGridPlugin from '@fullcalendar/timegrid' // Vista de semana

export default function AcademicCalendar() {
  return (
    <div className="bg-surface-container-lowest p-8 rounded-lg shadow-ambient">
      <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin ]}
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
        eventClassNames="rounded-md border-none font-inter text-xs"
      />
    </div>
  )
}