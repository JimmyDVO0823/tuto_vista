/**
 * @fileoverview Dashboard Sub-component - Activity Record Card
 * @module components/features/dashboard/ActivityCard
 * @description A versatile list item used to represent both academic sessions 
 * and pending assignments. It utilizes a bold 'initial' avatar and high-contrast 
 * borders to maintain vertical rhythm in dense lists.
 */

import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ActivityCard Component.
 * 
 * @param {Object} props - Component properties.
 * @param {string} props.initial - A single capital letter representing the activity's category.
 * @param {string} props.title - Primary heading of the activity.
 * @param {string} props.subtitle - Descriptive metadata (e.g., Tutor name or Subject).
 * @param {string} props.time - Temporal information (e.g., span or deadline).
 * @param {string} [props.buttonText="Unirse a sesión"] - Label for the primary CTA.
 * @param {string} [props.actionPath="#"] - Navigation target for the CTA.
 * @component
 */
const ActivityCard = ({ 
  initial, 
  title, 
  subtitle, 
  time, 
  buttonText = "Unirse a sesión", 
  actionPath = "#" 
}) => {
  return (
    <div className="group bg-white p-8 rounded-2xl flex items-center justify-between border-l-4 border-primary shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center gap-8">
        <div className="w-16 h-16 rounded-full bg-mini-gray flex items-center justify-center font-bold text-primary text-xl">
          {initial}
        </div>
        <div>
          <h4 className="text-xl font-bold text-primary mb-1">{title}</h4>
          <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">{subtitle}</p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-3 text-right">
        <div className="flex items-center gap-2 text-primary font-bold">
           <span className="material-symbols-outlined text-sm">schedule</span>
           <span>{time}</span>
        </div>
        <Link 
          to={actionPath}
          className="signature-gradient text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all group-hover:px-8 text-center"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

export default ActivityCard;
