/**
 * @fileoverview Feature Component - Advanced Academic Calendar (Soporte Multi-vista)
 */

import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import EventPreviewCard from './EventPreviewCard';

export default function AcademicCalendar({
  events = [],
  initialView = 'dayGridMonth',
  headerToolbar = { left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek' },
  selectable = false,
  editable = false,
  onSelect = null,
  onEventClick = null,
  slotMinTime = '06:00:00',
  slotMaxTime = '22:00:00',
  allDaySlot = false
}) {
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [currentView, setCurrentView] = useState(initialView);

  const handleMouseEnter = (info) => {
    const { title, extendedProps } = info.event;
    setHoveredEvent({
      title,
      type: extendedProps.type || 'Evento',
      category: extendedProps.category || 'General',
      time: extendedProps.time || 'Todo el día',
      status: extendedProps.status || 'Programado',
      x: info.jsEvent.clientX,
      y: info.jsEvent.clientY,
    });
  };

  const handleMouseLeave = () => {
    setHoveredEvent(null);
  };

  // 🛠️ CORRECCIÓN AQUÍ: En la vista de mes SÍ debe ser seleccionable para poder agendar días específicos
  const isViewSelectable = selectable;

  const filteredEvents = events.filter(event => {
    const type = event.extendedProps?.type?.toLowerCase() || '';
    const status = event.extendedProps?.status?.toLowerCase() || '';
    if (type.includes('solicitud')) {
      return status === 'pendiente' || status === 'pending';
    }
    return true;
  });

  return (
    <div className={`relative bg-surface-container-lowest p-8 rounded-lg shadow-ambient font-body
      [--fc-button-bg-color:theme(colors.primary)]
      [--fc-button-border-color:theme(colors.primary)]
      [--fc-button-hover-bg-color:theme(colors.primary-container)]
      [--fc-button-hover-border-color:theme(colors.primary-container)]
      [--fc-button-active-bg-color:theme(colors.academic-gold)]
      [--fc-button-active-border-color:theme(colors.academic-gold)]
      [--fc-today-bg-color:theme(colors.mini-gray)]
      [&_.fc-toolbar-title]:font-headline [&_.fc-toolbar-title]:font-bold [&_.fc-toolbar-title]:text-primary [&_.fc-toolbar-title]:text-2xl
      [&_.fc-button]:font-body [&_.fc-button]:font-semibold [&_.fc-button]:capitalize [&_.fc-button]:rounded-xl
      [&_.fc-col-header-cell-cushion]:font-headline [&_.fc-col-header-cell-cushion]:font-semibold [&_.fc-col-header-cell-cushion]:text-elegant-gray [&_.fc-col-header-cell-cushion]:no-underline
      [&_.fc-daygrid-day-number]:font-body [&_.fc-daygrid-day-number]:text-elegant-gray [&_.fc-daygrid-day-number]:no-underline [&_.fc-daygrid-day-number]:p-2
      ${isViewSelectable && currentView !== 'dayGridMonth' ? `
        [&_.fc-timegrid]:cursor-cell
        [&_.fc-timegrid-slots_tr]:cursor-cell
        [&_.fc-timegrid-slots_td]:cursor-cell
        [&_.fc-timegrid-slot]:cursor-cell
        [&_.fc-timegrid-slots_tr:hover]:bg-gray-50/20
        [&_.fc-timegrid-col]:cursor-cell
        [&_.fc-timegrid-col-frame]:cursor-cell
        [&_.fc-timegrid-col-bg]:cursor-cell
        [&_.fc-timegrid-col-bg:hover]:bg-gray-50/20
        [&_.fc-timegrid-cols_td]:cursor-cell
      ` : ''}
      ${isViewSelectable && currentView === 'dayGridMonth' ? `
        [&_.fc-daygrid-day]:cursor-pointer
        [&_.fc-daygrid-day:hover]:bg-gray-50/50
      ` : ''}`}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={initialView}
        aspectRatio={1.1}
        headerToolbar={headerToolbar}
        events={filteredEvents}
        selectable={isViewSelectable} // 👈 Ahora hereda directamente el true/false que le mandes
        unselectAuto={true}
        editable={editable}
        select={onSelect}
        eventClick={onEventClick}
        slotMinTime={slotMinTime}
        slotMaxTime={slotMaxTime}
        allDaySlot={allDaySlot}
        displayEventTime={false}
        datesSet={(arg) => setCurrentView(arg.view.type)}
        eventClassNames={(arg) => {
          // Si el evento ya viene con un color quemado desde FullCalendar, respetarlo
          if (arg.event.backgroundColor) return `rounded-md border-none font-body text-xs shadow-sm px-2 py-0.5 cursor-pointer`;

          const colorType = arg.event.extendedProps.colorType;
          let colorClass = 'bg-primary';
          if (colorType === 'academic-gold') {
            colorClass = 'bg-academic-gold text-white';
          } else if (colorType === 'academic-blue') {
            colorClass = 'bg-primary text-white';
          }
          return `rounded-md border-none font-body text-xs shadow-sm px-2 py-0.5 cursor-pointer ${colorClass}`;
        }}
        eventMouseEnter={handleMouseEnter}
        eventMouseLeave={handleMouseLeave}
      />

      <EventPreviewCard event={hoveredEvent} />
    </div>
  );
}