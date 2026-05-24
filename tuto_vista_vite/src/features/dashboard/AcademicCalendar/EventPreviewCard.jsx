/**
 * @fileoverview Dashboard Sub-component - Event Hover Preview
 * @module components/features/dashboard/AcademicCalendar/EventPreviewCard
 * @description A floating, portal-like widget that provides high-density 
 * metadata for calendar events on hover. Adheres to strict spatial constraints 
 * to avoid occluding the primary calendar interface.
 */

import React from 'react';

/**
 * EventPreviewCard Component.
 * 
 * @param {Object} props - Component properties.
 * @param {Object|null} props.event - The event data to render. 
 * If null, the component renders nothing.
 * @component
 */
const EventPreviewCard = ({ event }) => {
  if (!event) return null;

  return (
    <div
      className="fixed z-50 bg-white p-5 rounded-xl shadow-2xl border border-gray-100 pointer-events-none transform -translate-x-1/2 -translate-y-full mt-[-10px]"
      style={{ top: event.y, left: event.x, minWidth: '260px' }}
    >
      <div className="space-y-2">
        <span className="text-[10px] uppercase tracking-widest font-bold text-academic-gold">
          {event.type} • {event.category}
        </span>
        <h4 className="text-sm font-bold text-primary leading-snug">

          {event.title}
        </h4>
        <div className="flex flex-col gap-1.5 mt-3 pt-3 border-t border-gray-50">
          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            {event.time}
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-primary">
            <span className="material-symbols-outlined text-[14px]">label</span>
            {event.status}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPreviewCard;
