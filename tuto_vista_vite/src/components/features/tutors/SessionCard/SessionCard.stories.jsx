import React from 'react';
import SessionCard from './SessionCard';

export default {
  title: 'Features/Tutors/SessionCard',
  component: SessionCard,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'surface',
      values: [
        { name: 'surface', value: '#f7f9fb' },
        { name: 'dark', value: '#002045' },
      ],
    },
  },
  tags: ['autodocs'],
};

const mockSession = {
  id: 10,
  solicitudId: 1,
  tutorId: 2,
  tutorNombre: 'Dr. Alejandro Silva',
  estudianteId: 5,
  estudianteNombre: 'Sofía Medina',
  materiaId: 3,
  materiaNombre: 'Estructuras de Datos',
  programadaPara: '2026-05-24T06:00:00Z',
  duracionMin: 90,
  precio: 35000.0,
  enlaceReunion: 'https://meet.google.com/abc-defg-hij',
  estado: 'programada'
};

export const Default = {
  args: {
    session: mockSession,
    onCancel: (id) => alert(`Canceled session ${id}`),
    isLoading: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '800px', maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
};

export const Loading = {
  args: {
    ...Default.args,
    isLoading: true,
  },
  decorators: Default.decorators,
};

export const WithoutMeetingLink = {
  args: {
    ...Default.args,
    session: {
      ...mockSession,
      enlaceReunion: null
    }
  },
  decorators: Default.decorators,
};
