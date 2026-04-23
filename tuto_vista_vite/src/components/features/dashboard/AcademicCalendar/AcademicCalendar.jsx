import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

export default function AcademicCalendar() {
  const [hoveredEvent, setHoveredEvent] = useState(null);

  const handleMouseEnter = (info) => {
    const { title, extendedProps } = info.event;
    const { category, time, status } = extendedProps;
    setHoveredEvent({
      title,
      category: category || 'General',
      time: time || 'Todo el día',
      status: status || 'Programado',
      x: info.jsEvent.clientX,
      y: info.jsEvent.clientY,
    });
  };

  const handleMouseLeave = () => {
    setHoveredEvent(null);
  };

  return (
    <div className="relative bg-surface-container-lowest p-8 rounded-lg shadow-ambient font-body
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
        aspectRatio={1.1}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek'
        }}
        events={[
          { title: 'Tutoría Física Avanzada', date: '2024-05-20', color: '#002045', extendedProps: { category: 'Ciencias Exactas', time: '10:00 AM - 11:30 AM', status: 'Confirmada' } },
          { title: 'Entrega Ensayo Literatura', date: '2024-05-22', color: '#CEAE42', extendedProps: { category: 'Humanidades', time: '23:59 PM', status: 'Urgente' } },
          { title: 'Revisión Tesis Maestría', date: '2024-05-25', color: '#002045', extendedProps: { category: 'Investigación', time: '14:00 PM - 16:00 PM', status: 'En progreso' } }
        ]}
        eventClassNames="rounded-md border-none font-body text-xs shadow-sm px-2 py-0.5 cursor-pointer"
        eventMouseEnter={handleMouseEnter}
        eventMouseLeave={handleMouseLeave}
      />

      {/* Hover Preview Tooltip */}
      {hoveredEvent && (
        <div
          className="fixed z-50 bg-white p-5 rounded-xl shadow-2xl border border-gray-100 pointer-events-none transform -translate-x-1/2 -translate-y-full mt-[-10px]"
          style={{ top: hoveredEvent.y, left: hoveredEvent.x, minWidth: '260px' }}
        >
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-widest font-bold text-academic-gold">{hoveredEvent.category}</span>
            <h4 className="text-sm font-bold text-primary leading-snug">{hoveredEvent.title}</h4>
            <div className="flex flex-col gap-1.5 mt-3 pt-3 border-t border-gray-50">
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                {hoveredEvent.time}
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                <span className="material-symbols-outlined text-[14px]">label</span>
                {hoveredEvent.status}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}