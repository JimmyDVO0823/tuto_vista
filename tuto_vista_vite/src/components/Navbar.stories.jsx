import Navbar from './Navbar';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Componentes/Navbar',
  component: Navbar,
  parameters: {
    // 'fullscreen' quita el padding por defecto de Storybook
    // Esto es ideal para las barras de navegación porque quieres que ocupen todo el ancho
    layout: 'fullscreen',
  },
  // Envolvemos la historia en un BrowserRouter para que los <Link> no rompan la vista previa
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

// Vista por defecto
export const Default = () => <Navbar />;

// Si quieres simular cómo se ve en modo oscuro desde la misma vista previa
export const ModoOscuro = () => (
  <div className="dark">
    <div className="bg-[#191c1e] min-h-[200px]">
      <Navbar />
    </div>
  </div>
);