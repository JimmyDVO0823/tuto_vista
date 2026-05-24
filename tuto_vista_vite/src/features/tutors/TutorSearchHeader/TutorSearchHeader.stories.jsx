import TutorSearchHeader from './TutorSearchHeader'; // Asegúrate de que la ruta sea correcta

export default {
  title: 'Componentes/TutorSearchHeader', // Cómo aparecerá en la barra lateral de Storybook
  component: TutorSearchHeader,
  parameters: {
    // Esto centra el componente en el lienzo de Storybook
    layout: 'fullscreen',
  },
};

// Esta es la vista previa por defecto
export const Default = () => <TutorSearchHeader />;

// Si tu Header acepta "props" (como el nombre de usuario), 
// puedes crear variantes así:
export const ConUsuarioLogueado = () => <TutorSearchHeader user={{ name: 'Juan Pérez' }} />;