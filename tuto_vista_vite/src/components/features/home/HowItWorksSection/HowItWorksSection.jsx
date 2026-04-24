/**
 * @fileoverview Feature Component - Process Overview
 * @module components/features/home/HowItWorksSection
 * @description Details the dual value proposition of the platform. 
 * Orchestrates a comparative view between Student and Tutor experiences 
 * using high-contrast surface architecture.
 */

/**
 * HowItWorksSection Component.
 * 
 * @component
 */
export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl font-extrabold font-headline text-primary mb-6">Un Ecosistema de Aprendizaje</h2>
          <p className="text-on-surface-variant">Conectamos mentes brillantes con herramientas de vanguardia para una experiencia educativa sin fricciones.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* For Students */}
          <div className="bg-surface-container-lowest p-12 rounded-xl">
            <span className="material-symbols-outlined text-4xl text-primary mb-6">school</span>
            <h3 className="text-2xl font-bold font-headline text-primary mb-4">Para Estudiantes</h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-tertiary-fixed flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-xs text-on-tertiary-fixed">check</span>
                </div>
                <div>
                  <h4 className="font-bold text-primary">Tutorías 1 a 1</h4>
                  <p className="text-sm text-on-surface-variant">Atención personalizada adaptada a tu ritmo y estilo de aprendizaje.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-tertiary-fixed flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-xs text-on-tertiary-fixed">check</span>
                </div>
                <div>
                  <h4 className="font-bold text-primary">Recursos Exclusivos</h4>
                  <p className="text-sm text-on-surface-variant">Acceso a nuestra biblioteca de guías de estudio y ejercicios prácticos.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-tertiary-fixed flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-xs text-on-tertiary-fixed">check</span>
                </div>
                <div>
                  <h4 className="font-bold text-primary">Seguimiento de Progreso</h4>
                  <p className="text-sm text-on-surface-variant">Dashboard detallado con tus logros y áreas de mejora.</p>
                </div>
              </li>
            </ul>
          </div>
          {/* For Tutors */}
          <div className="bg-primary text-white p-12 rounded-xl">
            <span className="material-symbols-outlined text-4xl text-tertiary-container mb-6">history_edu</span>
            <h3 className="text-2xl font-bold font-headline mb-4">Para Tutores</h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-xs text-tertiary-container">bolt</span>
                </div>
                <div>
                  <h4 className="font-bold">Flexibilidad Total</h4>
                  <p className="text-sm text-on-primary-container">Define tu propio horario y gestiona tus sesiones con facilidad.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-xs text-tertiary-container">bolt</span>
                </div>
                <div>
                  <h4 className="font-bold">Comunidad Académica</h4>
                  <p className="text-sm text-on-primary-container">Colabora con otros expertos y expande tu red profesional.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-xs text-tertiary-container">bolt</span>
                </div>
                <div>
                  <h4 className="font-bold">Pago Premium</h4>
                  <p className="text-sm text-on-primary-container">Remuneración competitiva por tu conocimiento especializado.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
