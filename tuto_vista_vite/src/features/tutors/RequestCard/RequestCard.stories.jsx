import React from 'react';
import RequestCard from './RequestCard';

export default {
  title: 'Features/Tutors/RequestCard',
  component: RequestCard,
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

const mockSolicitud = {
  id: 1,
  estudianteNombre: 'Carlos Ramírez',
  materiaNombre: 'Cálculo Multivariado',
  fechaPreferida: '2026-11-24',
  horaPreferida: '08:00:00',
  duracionMin: 90,
  mensaje: 'Tengo muchas dudas con integrales triples y el teorema de Stokes. ¿Podríamos enfocarnos en eso?',
  estado: 'pendiente',
  creadoEn: '2026-05-20T10:00:00Z'
};

export const Default = {
  args: {
    solicitud: mockSolicitud,
    onAccept: (id) => alert(`Accepted request ${id}`),
    onReject: (id) => alert(`Rejected request ${id}`),
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

export const WithoutMessage = {
  args: {
    ...Default.args,
    solicitud: {
      ...mockSolicitud,
      mensaje: null
    }
  },
  decorators: Default.decorators,
};
