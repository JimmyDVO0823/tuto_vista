import Sidebar from './Sidebar';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'Componentes/Sidebar',
  component: Sidebar,
  parameters: {
    // Sidebar usually occupies the full height, so fullscreen is best
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/dashboard/student']}>
        <div className="flex bg-[#f7f9fb] min-h-screen">
          <Story />
          <div className="flex-1 p-10">
            <h1 className="text-2xl font-bold text-[#002045]/20">Main Content Area Mockup</h1>
          </div>
        </div>
      </MemoryRouter>
    ),
  ],
};

// Default view (Active on Dashboard)
export const Default = () => <Sidebar />;

// Active on a different route (Simulation)
export const ActiveOther = () => <Sidebar />;
ActiveOther.decorators = [
  (Story) => (
    <MemoryRouter initialEntries={['/sessions']}>
      <div className="flex bg-[#f7f9fb] min-h-screen">
        <Story />
        <div className="flex-1 p-10">
          <h1 className="text-2xl font-bold text-[#002045]/20">Active Route: /sessions</h1>
        </div>
      </div>
    </MemoryRouter>
  ),
];

