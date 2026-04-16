import Header from './Header'; // Asegúrate de que la ruta sea correcta

export default {
  title: 'Componentes/Header', // Cómo aparecerá en la barra lateral de Storybook
  component: Header,
  parameters: {
    // Esto centra el componente en el lienzo de Storybook
    layout: 'fullscreen',
  },
};

// Esta es la vista previa por defecto
export const Default = () => <Header />;

// Si tu Header acepta "props" (como el nombre de usuario), 
// puedes crear variantes así:
export const ConUsuarioLogueado = () => <Header user={{ name: 'Juan Pérez' }} />;