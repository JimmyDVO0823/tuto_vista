import Footer from './Footer';

export default {
  title: 'Componentes/Footer',
  component: Footer,
  parameters: {
    // Al igual que el Navbar, queremos que el Footer ocupe todo el ancho
    layout: 'fullscreen',
  },
};

// 1. Vista por defecto
export const Default = () => <Footer />;

// 2. Vista simulando una página completa
// Esta variante es súper útil para los footers, para asegurarte de que 
// se queden pegados abajo cuando hay poco contenido en la página.
export const AlFondoDePagina = () => (
  <div className="min-h-screen flex flex-col">
    <main className="flex-grow flex items-center justify-center p-8 bg-white">
      <p className="text-gray-400">Aquí iría el contenido de tu página...</p>
    </main>
    <Footer />
  </div>
);