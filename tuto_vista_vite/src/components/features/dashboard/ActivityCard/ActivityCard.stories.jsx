import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ActivityCard from './ActivityCard';

export default {
  title: 'Features/Dashboard/ActivityCard',
  component: ActivityCard,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div className="p-8 bg-[#f7f9fb] max-w-4xl mx-auto">
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
  argTypes: {
    initial: { control: 'text' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    time: { control: 'text' },
    buttonText: { control: 'text' },
    actionPath: { control: 'text' },
  },
};

export const Session = {
  args: {
    initial: 'E',
    title: 'Econometría Avanzada',
    subtitle: 'Dra. Elena Vargas • Editorial',
    time: '14:00 - 15:30',
    buttonText: 'Unirse a sesión',
    actionPath: '#',
  },
};

export const Assignment = {
  args: {
    initial: 'M',
    title: 'Ensayo Final: Macroeconómica',
    subtitle: 'Econometría • Urgente',
    time: 'Vence en: 2 días',
    buttonText: 'Ver compromiso',
    actionPath: '#',
  },
};
