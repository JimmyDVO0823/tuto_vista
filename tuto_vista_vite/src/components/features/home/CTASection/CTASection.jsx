/**
 * @fileoverview Feature Component - Call to Action Section
 * @module components/features/home/CTASection
 * @description The final conversion point of the landing page. 
 * Orchestrates a high-impact 'signature-gradient' container to drive enrollment.
 */

/**
 * CTASection Component.
 * 
 * @component
 */
export default function CTASection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="signature-gradient rounded-[2rem] p-16 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold font-headline mb-8">¿Listo para comenzar tu viaje?</h2>
            <p className="text-xl text-on-primary-container max-w-2xl mx-auto mb-10">Únete hoy y obtén una evaluación diagnóstica gratuita con uno de nuestros especialistas.</p>
            <button className="bg-tertiary-container text-[#4e3d00] px-10 py-5 rounded-md font-bold text-xl hover:brightness-110 transition-all active:scale-95 shadow-xl">
              Empezar ahora gratis
            </button>
          </div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-tertiary/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
}
