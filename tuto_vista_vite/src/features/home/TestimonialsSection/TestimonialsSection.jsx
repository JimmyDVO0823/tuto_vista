/**
 * @fileoverview Feature Component - Social Proof Section
 * @module components/features/home/TestimonialsSection
 * @description Showcases community trust through student testimonials 
 * and qualitative metrics. Adheres to asymmetric layout principles.
 */

/**
 * TestimonialsSection Component.
 * 
 * @component
 */
export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-4">
            <h2 className="text-4xl font-extrabold font-headline text-primary mb-6">Confianza de la Comunidad</h2>
            <p className="text-on-surface-variant mb-8 leading-relaxed">Más de 500 estudiantes han transformado su rendimiento académico con nosotros.</p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <img alt="User 1" className="w-12 h-12 rounded-full border-4 border-surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDP9ez9i0ZSLoR61vpRTJ7lw4m6WGkqvFe4rKL-C6A99RI7kVn_4ArffyO5bm2YLK5dF3ZG0vdFHm2U-sUkO2UXBa-gHvCUoBRtApb4Ehm2co95S0IJuhJrxgRpWjEIhTQUh3qQuCWhn-SO92e7-YXOSUP5zzyWx1aj4hhWYr1Iju65wWP8p7U5-3xOMxX6-0mF62VYAU8AW0S0qtyl4G81r5-4BVFvnJmFrWHUj2UXA7VNtiq-Znow-I4bLorGalThXIYDwjObTxHR" />
                <img alt="User 2" className="w-12 h-12 rounded-full border-4 border-surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyNixKDo7F7yvEUPGhJ09RzSXMMMyb3oZgmixM_BGD1nFGewh5Q6-DaxrX0mqBFh37qQCFRp4AkzRQZoUloVDDrtdbACnu2EWQILMzTcLlkraSvLHxVIBZ1LCgq6e7jOOaP6Dfzz7RyMHZKu3CaUldwddCMh1WBwrV3-4W_heRREX3xJMEOmEMeHF_FmJsJ9USGKk_aYVtZ6k4wRGR7OV7l-Ds5qFEkYZhMNvQrdxxsIGv8dTJ_-apf0zlQfSkN3iNkwf09h0kjLRK" />
                <img alt="User 3" className="w-12 h-12 rounded-full border-4 border-surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB34OhIH6kA60P6HFSs7OdR1TgvWjfOcwqOTy53w_6sT8RAlraXiGs9EEaM5nMNRcyOmIB77U0HeuP2AC32zINyURSkS1bjqQP9F6xuHSIQpfrYpeVE3yKXQlNYapNmebQ7PprFgJnidB6OOCldEgHxPn3zVSwLwUW-DOYDp2BYaR5NjYNxI8WI98Tuxtc0NuXz90xFWTozQk69LFZE9rrq4yBXiZUGUf15m4X-CANuDflzudpoetr-I3Pi1uEE0UOVvNXKKUjZkwLD" />
              </div>
              <span className="text-sm font-bold text-primary">+500 Alumnos</span>
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-surface-container-low p-8 rounded-xl shadow-sm">
                <p className="text-lg text-primary italic mb-6">"Los tutores aquí no solo enseñan, inspiran. Mi comprensión de la física cuántica dio un giro de 180 grados."</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-fixed"></div>
                  <div>
                    <h4 className="font-bold text-primary">Sofía Méndez</h4>
                    <p className="text-xs text-on-surface-variant uppercase tracking-widest font-label">Estudiante de Ingeniería</p>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-low p-8 rounded-xl shadow-sm transform translate-y-8">
                <p className="text-lg text-primary italic mb-6">"La plataforma es impecable. Todo está diseñado para que el aprendizaje sea el protagonista."</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-tertiary-fixed"></div>
                  <div>
                    <h4 className="font-bold text-primary">Carlos Ruiz</h4>
                    <p className="text-xs text-on-surface-variant uppercase tracking-widest font-label">PhD Candidate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
