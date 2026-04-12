<>
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>Tutor Profile - The Academic Editorial</title>
  <link
    href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
    rel="stylesheet"
  />
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n      .material-symbols-outlined {\n        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;\n      }\n      .signature-gradient {\n        background: linear-gradient(135deg, #002045 0%, #1a365d 100%);\n      }\n      .no-scrollbar::-webkit-scrollbar {\n        display: none;\n      }\n      .no-scrollbar {\n        -ms-overflow-style: none;\n        scrollbar-width: none;\n      }\n    "
    }}
  />
  {/* TopNavBar */}
  <nav className="bg-[#f7f9fb]/80 backdrop-blur-md text-[#002045] docked full-width top-0 sticky z-50 shadow-sm flex justify-between items-center w-full px-8 py-4 max-w-full mx-auto">
    <div className="flex items-center gap-8">
      <span className="text-xl font-bold tracking-tight text-[#002045]">
        The Academic Editorial
      </span>
      <div className="hidden md:flex items-center gap-6">
        <a
          className="text-[#002045] font-bold border-b-2 border-[#002045] pb-1 transition-colors"
          href="#"
        >
          Find Tutors
        </a>
        <a
          className="text-[#191c1e]/60 hover:text-[#002045] transition-colors"
          href="#"
        >
          Library
        </a>
        <a
          className="text-[#191c1e]/60 hover:text-[#002045] transition-colors"
          href="#"
        >
          Resources
        </a>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <button className="px-4 py-2 text-[#002045] font-semibold hover:scale-95 transition-transform">
        Sign In
      </button>
      <button className="signature-gradient text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:scale-95 transition-transform shadow-lg">
        Apply to Tutor
      </button>
    </div>
  </nav>
  <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
    {/* Profile Header Section: Asymmetric Layout */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
      {/* Left: Large Profile Photo & Stats */}
      <div className="lg:col-span-5 relative">
        <div className="aspect-[4/5] rounded-xl overflow-hidden bg-surface-container-low">
          <img
            className="w-full h-full object-cover"
            data-alt="professional academic tutor portrait in a brightly lit modern library environment, wearing smart casual attire, warm approachable expression"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCopCHV2ZDx_Q50c6ss_dSttliSlWxRcuB3j78PD9jMgssnjdTqzDV5CmU5gsB__J2pCebxMFmzm7tSuGy8ZZb9rW5zhG6NGzkOyqgsxr91Imxo5f-n1yw1VA09JUcPNdgRNOTDLtEK5mVRlKWA3FxA7ub7gGyr65SGDx5Sm_ExaLuhR9nlKyUalCjAHMWYWYt2EX2lzce9prXzxxOwS2O3dlsvjuBKDAtXSl0qGP4ucrejNw8gvzu10R2yeSBpUTGung0qvafNNbIa"
          />
        </div>
        {/* Floating Stat Cards */}
        <div className="absolute -bottom-6 -right-6 bg-surface-container-lowest p-6 rounded-xl shadow-xl flex gap-8">
          <div className="text-center">
            <p className="text-label-md uppercase tracking-widest text-on-surface-variant font-bold text-[0.65rem]">
              Sesiones
            </p>
            <p className="text-2xl font-headline font-extrabold text-primary">
              1.2k+
            </p>
          </div>
          <div className="text-center">
            <p className="text-label-md uppercase tracking-widest text-on-surface-variant font-bold text-[0.65rem]">
              Calificación
            </p>
            <div className="flex items-center gap-1">
              <span
                className="material-symbols-outlined text-tertiary-container text-xl"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                star
              </span>
              <p className="text-2xl font-headline font-extrabold text-primary">
                4.9
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Right: Bio & Specialties */}
      <div className="lg:col-span-7 pt-4">
        <div className="space-y-2 mb-6">
          <span className="bg-tertiary-container/20 text-tertiary font-bold px-3 py-1 rounded-full text-xs tracking-wider uppercase">
            Tutor Senior de Humanidades
          </span>
          <h1 className="text-5xl lg:text-6xl font-headline font-extrabold tracking-tight text-primary">
            Dr. Sebastian Valdés
          </h1>
        </div>
        <p className="text-lg text-on-surface-variant leading-relaxed mb-8 max-w-2xl">
          Especialista en Literatura Comparada y Retórica Académica con más de
          10 años de experiencia guiando a estudiantes de posgrado. Mi enfoque
          editorial transforma el pensamiento crítico en prosa elegante y
          estructurada.
        </p>
        <div className="space-y-6">
          <h3 className="text-label-md uppercase tracking-[0.1em] font-bold text-on-surface-variant text-xs">
            Especialidades Editoriales
          </h3>
          <div className="flex flex-wrap gap-3">
            <span className="px-5 py-2.5 bg-surface-container-lowest rounded-xl text-primary font-semibold shadow-sm border border-outline-variant/10">
              Escritura de Tesis
            </span>
            <span className="px-5 py-2.5 bg-surface-container-lowest rounded-xl text-primary font-semibold shadow-sm border border-outline-variant/10">
              Pensamiento Crítico
            </span>
            <span className="px-5 py-2.5 bg-surface-container-lowest rounded-xl text-primary font-semibold shadow-sm border border-outline-variant/10">
              Literatura Siglo XIX
            </span>
            <span className="px-5 py-2.5 bg-surface-container-lowest rounded-xl text-primary font-semibold shadow-sm border border-outline-variant/10">
              Latín Jurídico
            </span>
            <span className="px-5 py-2.5 bg-surface-container-lowest rounded-xl text-primary font-semibold shadow-sm border border-outline-variant/10">
              Análisis Narratológico
            </span>
          </div>
        </div>
      </div>
    </div>
    {/* Booking Section */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
      <div className="lg:col-span-8 bg-surface-container-low rounded-xl p-8 lg:p-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-headline font-bold text-primary mb-2">
              Disponibilidad Semanal
            </h2>
            <p className="text-on-surface-variant">
              Selecciona un bloque horario para tu sesión editorial.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 bg-surface-container-lowest rounded-lg hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="p-2 bg-surface-container-lowest rounded-lg hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        {/* Time Slot Grid */}
        <div className="grid grid-cols-5 gap-4 overflow-x-auto no-scrollbar">
          {/* Day Column */}
          <div className="space-y-4 min-w-[120px]">
            <div className="text-center pb-4 border-b border-outline-variant/20">
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-tighter">
                Lun
              </p>
              <p className="text-xl font-headline font-bold">14</p>
            </div>
            <button className="w-full py-3 px-2 rounded-xl bg-surface-container-lowest text-sm font-medium hover:bg-primary-container hover:text-white transition-all text-center">
              09:00 AM
            </button>
            <button className="w-full py-3 px-2 rounded-xl bg-surface-container-lowest text-sm font-medium hover:bg-primary-container hover:text-white transition-all text-center">
              11:00 AM
            </button>
            <button
              className="w-full py-3 px-2 rounded-xl bg-surface-container-lowest/50 text-on-surface-variant/40 text-sm font-medium cursor-not-allowed line-through text-center"
              disabled=""
            >
              02:00 PM
            </button>
          </div>
          {/* Day Column */}
          <div className="space-y-4 min-w-[120px]">
            <div className="text-center pb-4 border-b border-outline-variant/20">
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-tighter">
                Mar
              </p>
              <p className="text-xl font-headline font-bold">15</p>
            </div>
            <button className="w-full py-3 px-2 rounded-xl bg-primary-container text-white text-sm font-bold shadow-md text-center">
              10:00 AM
            </button>
            <button className="w-full py-3 px-2 rounded-xl bg-surface-container-lowest text-sm font-medium hover:bg-primary-container hover:text-white transition-all text-center">
              12:30 PM
            </button>
            <button className="w-full py-3 px-2 rounded-xl bg-surface-container-lowest text-sm font-medium hover:bg-primary-container hover:text-white transition-all text-center">
              04:00 PM
            </button>
          </div>
          {/* Day Column */}
          <div className="space-y-4 min-w-[120px]">
            <div className="text-center pb-4 border-b border-outline-variant/20">
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-tighter">
                Mie
              </p>
              <p className="text-xl font-headline font-bold">16</p>
            </div>
            <button className="w-full py-3 px-2 rounded-xl bg-surface-container-lowest text-sm font-medium hover:bg-primary-container hover:text-white transition-all text-center">
              08:00 AM
            </button>
            <button
              className="w-full py-3 px-2 rounded-xl bg-surface-container-lowest/50 text-on-surface-variant/40 text-sm font-medium cursor-not-allowed line-through text-center"
              disabled=""
            >
              11:00 AM
            </button>
            <button className="w-full py-3 px-2 rounded-xl bg-surface-container-lowest text-sm font-medium hover:bg-primary-container hover:text-white transition-all text-center">
              03:00 PM
            </button>
          </div>
          {/* Day Column */}
          <div className="space-y-4 min-w-[120px]">
            <div className="text-center pb-4 border-b border-outline-variant/20">
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-tighter">
                Jue
              </p>
              <p className="text-xl font-headline font-bold">17</p>
            </div>
            <button className="w-full py-3 px-2 rounded-xl bg-surface-container-lowest text-sm font-medium hover:bg-primary-container hover:text-white transition-all text-center">
              09:30 AM
            </button>
            <button className="w-full py-3 px-2 rounded-xl bg-surface-container-lowest text-sm font-medium hover:bg-primary-container hover:text-white transition-all text-center">
              01:00 PM
            </button>
            <button className="w-full py-3 px-2 rounded-xl bg-surface-container-lowest text-sm font-medium hover:bg-primary-container hover:text-white transition-all text-center">
              05:00 PM
            </button>
          </div>
          {/* Day Column */}
          <div className="space-y-4 min-w-[120px]">
            <div className="text-center pb-4 border-b border-outline-variant/20">
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-tighter">
                Vie
              </p>
              <p className="text-xl font-headline font-bold">18</p>
            </div>
            <button className="w-full py-3 px-2 rounded-xl bg-surface-container-lowest text-sm font-medium hover:bg-primary-container hover:text-white transition-all text-center">
              10:00 AM
            </button>
            <button className="w-full py-3 px-2 rounded-xl bg-surface-container-lowest text-sm font-medium hover:bg-primary-container hover:text-white transition-all text-center">
              12:00 PM
            </button>
            <button className="w-full py-3 px-2 rounded-xl bg-surface-container-lowest text-sm font-medium hover:bg-primary-container hover:text-white transition-all text-center">
              02:30 PM
            </button>
          </div>
        </div>
        {/* Logic Comment for Developers */}
        {/* 
            LOGIC: Schedule Overlap Check 
            Before rendering the slot buttons, the system must cross-reference 
            the tutor's availability table with the student's existing sessions.
            1. fetch(tutor_schedule) && fetch(student_schedule)
            2. For each available_slot:
               if (available_slot.start < student_session.end && student_session.start < available_slot.end)
               set slot.state = 'CONFLICT' and render as disabled.
          */}
      </div>
      {/* Booking Summary Sidecard */}
      <div className="lg:col-span-4">
        <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/10 sticky top-24">
          <h3 className="text-xl font-headline font-bold text-primary mb-6">
            Detalles de Reserva
          </h3>
          <div className="space-y-6 mb-8">
            <div className="flex justify-between items-center text-sm">
              <span className="text-on-surface-variant font-medium">
                Sesión Editorial
              </span>
              <span className="text-primary font-bold">60 Minutos</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-on-surface-variant font-medium">
                Fecha Seleccionada
              </span>
              <span className="text-primary font-bold">Marzo 15, 2024</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-on-surface-variant font-medium">Hora</span>
              <span className="text-primary font-bold">10:00 AM</span>
            </div>
            <div className="pt-4 border-t border-outline-variant/10 flex justify-between items-center">
              <span className="text-primary font-bold">Tarifa Total</span>
              <span className="text-2xl font-headline font-extrabold text-primary">
                $45.00
              </span>
            </div>
          </div>
          <button className="signature-gradient w-full py-4 rounded-xl text-white font-bold text-lg hover:scale-[0.98] transition-transform shadow-xl flex items-center justify-center gap-3">
            <span className="material-symbols-outlined text-xl">
              event_available
            </span>
            Agendar Clase
          </button>
          <p className="text-center text-[0.7rem] text-on-surface-variant/60 mt-4 uppercase tracking-widest font-medium">
            Garantía de calidad académica 100%
          </p>
        </div>
      </div>
    </div>
    {/* Reviews Section: Bento Grid Style */}
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-headline font-extrabold text-primary mb-2">
            Voces de la Academia
          </h2>
          <p className="text-on-surface-variant max-w-xl">
            Experiencias de estudiantes que han transformado sus trabajos de
            investigación con la guía del Dr. Valdés.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-surface-container-high px-4 py-2 rounded-full">
          <span className="text-primary font-bold">Excelente</span>
          <div className="flex text-tertiary-container">
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              star
            </span>
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              star
            </span>
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              star
            </span>
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              star
            </span>
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              star
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Review 1 */}
        <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/5">
          <div className="flex gap-1 mb-4 text-tertiary-container">
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              star
            </span>
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              star
            </span>
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              star
            </span>
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              star
            </span>
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              star
            </span>
          </div>
          <p className="text-on-surface italic mb-6 leading-relaxed">
            "La atención al detalle en la estructura de mi tesis fue invaluable.
            Sebastian tiene una forma única de clarificar argumentos complejos."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-white font-bold">
              ME
            </div>
            <div>
              <p className="font-bold text-primary text-sm">María Elena G.</p>
              <p className="text-[0.65rem] uppercase tracking-widest text-on-surface-variant font-bold">
                Estudiante de Doctorado
              </p>
            </div>
          </div>
        </div>
        {/* Review 2 */}
        <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/5 md:translate-y-8">
          <div className="flex gap-1 mb-4 text-tertiary-container">
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              star
            </span>
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              star
            </span>
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              star
            </span>
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              star
            </span>
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              star
            </span>
          </div>
          <p className="text-on-surface italic mb-6 leading-relaxed">
            "Su dominio de la retórica me ayudó a publicar mi primer artículo en
            una revista indexada. Totalmente recomendado."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold">
              RJ
            </div>
            <div>
              <p className="font-bold text-primary text-sm">Ricardo J.</p>
              <p className="text-[0.65rem] uppercase tracking-widest text-on-surface-variant font-bold">
                Investigador Junior
              </p>
            </div>
          </div>
        </div>
        {/* Review 3 */}
        <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/5">
          <div className="flex gap-1 mb-4 text-tertiary-container">
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              star
            </span>
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              star
            </span>
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              star
            </span>
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              star
            </span>
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              star
            </span>
          </div>
          <p className="text-on-surface italic mb-6 leading-relaxed">
            "Las clases son dinámicas y muy enriquecedoras. No solo aprendes a
            escribir, aprendes a pensar con mayor rigor."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed font-bold">
              LV
            </div>
            <div>
              <p className="font-bold text-primary text-sm">Lucía V.</p>
              <p className="text-[0.65rem] uppercase tracking-widest text-on-surface-variant font-bold">
                Maestría en Letras
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  {/* Footer */}
  <footer className="bg-[#f7f9fb] border-t border-[#e6e8ea]/20 w-full py-12">
    <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
      <p className="text-[0.75rem] uppercase tracking-[0.05em] font-medium text-gray-500">
        © 2024 THE ACADEMIC EDITORIAL. TODOS LOS DERECHOS RESERVADOS.
      </p>
      <div className="flex gap-8">
        <a
          className="text-[0.75rem] uppercase tracking-[0.05em] font-medium text-gray-500 hover:text-[#002045] transition-colors"
          href="#"
        >
          POLÍTICA DE PRIVACIDAD
        </a>
        <a
          className="text-[0.75rem] uppercase tracking-[0.05em] font-medium text-gray-500 hover:text-[#002045] transition-colors"
          href="#"
        >
          TÉRMINOS DE SERVICIO
        </a>
        <a
          className="text-[0.75rem] uppercase tracking-[0.05em] font-medium text-gray-500 hover:text-[#002045] transition-colors"
          href="#"
        >
          ACCESIBILIDAD
        </a>
        <a
          className="text-[0.75rem] uppercase tracking-[0.05em] font-medium text-gray-500 hover:text-[#002045] transition-colors"
          href="#"
        >
          CONTACTO
        </a>
      </div>
    </div>
  </footer>
</>
             <button className="signature-gradient text-white px-12 py-4 rounded-xl font-bold text-lg shadow-lg">Finalizar Reserva</button>
          </div >
        </div >
      </main >
    </>
  );
}
