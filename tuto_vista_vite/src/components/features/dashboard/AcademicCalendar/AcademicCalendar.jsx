import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // Vista de mes
import timeGridPlugin from '@fullcalendar/timegrid' // Vista de semana

export default function AcademicCalendar() {
  return (
    <div className="bg-surface-container-lowest p-8 rounded-lg shadow-ambient font-body
      [--fc-button-bg-color:theme(colors.primary)]
      [--fc-button-border-color:theme(colors.primary)]
      [--fc-button-hover-bg-color:theme(colors.primary-container)]
      [--fc-button-hover-border-color:theme(colors.primary-container)]
      [--fc-button-active-bg-color:theme(colors.academic-gold)]
      [--fc-button-active-border-color:theme(colors.academic-gold)]
      [--fc-event-bg-color:theme(colors.primary)]
      [--fc-event-border-color:theme(colors.primary)]
      [--fc-today-bg-color:theme(colors.mini-gray)]
      [&_.fc-toolbar-title]:font-headline [&_.fc-toolbar-title]:font-bold [&_.fc-toolbar-title]:text-primary [&_.fc-toolbar-title]:text-2xl
      [&_.fc-button]:font-body [&_.fc-button]:font-semibold [&_.fc-button]:capitalize [&_.fc-button]:rounded-xl
      [&_.fc-col-header-cell-cushion]:font-headline [&_.fc-col-header-cell-cushion]:font-semibold [&_.fc-col-header-cell-cushion]:text-elegant-gray [&_.fc-col-header-cell-cushion]:no-underline
      [&_.fc-daygrid-day-number]:font-body [&_.fc-daygrid-day-number]:text-elegant-gray [&_.fc-daygrid-day-number]:no-underline [&_.fc-daygrid-day-number]:p-2">
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