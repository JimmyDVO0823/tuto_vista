import MainLayout from './MainLayout';

export default {
  title: 'Layout/MainLayout',
  component: MainLayout,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = {
  render: () => (
    <MainLayout>
      <div className="p-10">
        <h1 className="text-4xl font-bold text-primary mb-6">Contenido de la Página</h1>
        <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
          Este es un ejemplo de cómo se ve el contenido dentro del MainLayout. 
          Prueba a pasar el cursor por el Sidebar a la izquierda para ver cómo se expande suavemente.
        </p>
        <div className="mt-12 grid grid-cols-2 gap-8">
            <div className="h-64 bg-mini-gray rounded-2xl border border-gray-100 p-8">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Widget A</span>
            </div>
            <div className="h-64 bg-mini-gray rounded-2xl border border-gray-100 p-8">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Widget B</span>
            </div>
        </div>
      </div>
    </MainLayout>
  ),
};
