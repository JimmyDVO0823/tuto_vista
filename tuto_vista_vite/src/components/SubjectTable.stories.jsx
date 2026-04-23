import SubjectTable from './SubjectTable';

export default {
  title: 'Components/SubjectTable',
  component: SubjectTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

const mockSubjects = [
  {
    name: 'Cálculo Diferencial e Integral I',
    dept: 'Departamento de Matemáticas',
    status: 'ACTIVO',
    sem: 'Semestre A',
    tutor: 'Dr. Roberto Gómez',
    nextActivity: 'Mañana, 08:30 AM',
    completedActivities: 3,
    totalActivities: 5,
  },
  {
    name: 'Programación Web Avanzada',
    dept: 'Ciencias de la Computación',
    status: 'ACTIVO',
    sem: 'Semestre B',
    tutor: 'Ing. Elena Torres',
    nextActivity: '24 Abr, 10:00 AM',
    completedActivities: 2,
    totalActivities: 4,
  },
  {
    name: 'Física Mecánica',
    dept: 'Departamento de Física',
    status: 'INACTIVO',
    sem: 'Semestre A',
    tutor: 'MSc. Carlos Ruiz',
    nextActivity: 'Pendiente',
    completedActivities: 1,
    totalActivities: 6,
  },
  {
    name: 'Ética y Pensamiento Crítico',
    dept: 'Humanidades y Artes',
    status: 'ACTIVO',
    sem: 'Transversal',
    tutor: 'Dra. Sofía Mora',
    nextActivity: '25 Abr, 02:00 PM',
    completedActivities: 4,
    totalActivities: 4,
  },
];

export const Default = {
  args: {
    subjects: mockSubjects,
  },
};

export const Empty = {
  args: {
    subjects: [],
  },
};

export const SingleRow = {
  args: {
    subjects: [mockSubjects[0]],
  },
};
