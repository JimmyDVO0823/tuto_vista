import TutorCard from './TutorCard'; // Asegúrate de que la ruta sea correcta

export default {
  title: 'Componentes/TutorCard', // Cómo aparecerá en la barra lateral de Storybook
  component: TutorCard,
  parameters: {
    // Esto centra el componente en el lienzo de Storybook
    layout: 'fullscreen',
  },
};

// Esta es la vista previa por defecto con datos realistas
export const Default = () => (
  <div className="p-8 bg-surface">
    <TutorCard
      name="Dr. Alexander Wright"
      image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200"
      subject="Advanced Quantum Physics"
      price={45}
      rating={4.9}
      reviews={128}
      quote="Physics is not just about formulas; it's about understanding the fundamental laws of our universe."
      isTopRated={true}
    />
  </div>
);

export const RegularTutor = () => (
  <div className="p-8 bg-surface">
    <TutorCard
      name="Sarah Jenkins"
      image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200"
      subject="English Literature"
      price={30}
      rating={4.7}
      reviews={42}
      quote="Helping students find their voice through the power of classic and modern literature."
      isTopRated={false}
    />
  </div>
);