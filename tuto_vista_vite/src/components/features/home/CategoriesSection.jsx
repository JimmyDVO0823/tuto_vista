export default function CategoriesSection() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-[0.75rem] font-medium tracking-[0.05em] uppercase text-tertiary font-label">Especialidades</span>
            <h2 className="text-4xl font-extrabold font-headline text-primary mt-2">Áreas de Enfoque</h2>
          </div>
          <a className="text-primary font-bold border-b-2 border-primary pb-1 hover:text-tertiary hover:border-tertiary transition-colors" href="#">Ver todas las materias</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-[600px]">
          {/* Math */}
          <div className="md:col-span-2 md:row-span-2 bg-primary-container rounded-xl overflow-hidden relative group p-8 flex flex-col justify-end">
            <img
              alt="Mathematics"
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFWsDv5ChJK5Wfp5yBLP_wU6S4a2ZqI69rGJwD04ASM_MnBNUq7SoSQY6MAInPlxJeMm8dQEDIUhMdHN9e0UUVWQjtPB0WgSpKrtj2VTZGQVEfIy5Llee2MKjxRDmP3WBihPFykz6GEzgUFlltsLS-s_NnHgjunwQNln3KDvYv2iwDqAWAdbkZc9GGtf3RQ1XHlpb-_qUxWP8Fq3vpx2wE1A4p3lTaBHXFhUb1XT3UsGRc_KDXRKsn-8_D4fFCpXQJI7TJsPu0XvaA"
            />
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-2">Math</h3>
              <p className="text-on-primary-container max-w-xs">Desde cálculo avanzado hasta álgebra lineal, dominamos la lógica.</p>
            </div>
          </div>
          {/* Science */}
          <div className="md:col-span-2 bg-tertiary-container rounded-xl overflow-hidden relative group p-8 flex flex-col justify-end">
            <img
              alt="Science"
              className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEn9FDgtGdeMoNsSU8yb4V7fQv-eXvl2uJhmVzxkBTzsuCB5ZVpxD8IWGgXA9VFrgCluSHh7bf_AOouWPQWZGG73XYPGDpxo2tyHtS40tV0UWCDEjPHt5h_hiZM-mE2fv2P3sLDFGcGXBUDM-C5eXNIyMZ2fq7Qm-JE62Wbfh1znlLJykgHZojEek5RHAQP5S0O_J8pX3fCl0ld2j8Uu_DfeYXev0mzLyUF95GFgKJHr6853h3Z8Zzl-xWGqhE9KwH7xDW6cfelR9r"
            />
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-on-tertiary-container mb-2">Science</h3>
              <p className="text-on-tertiary-container/80">Física, Química y Biología con un enfoque experimental y teórico.</p>
            </div>
          </div>
          {/* Coding */}
          <div className="md:col-span-2 bg-surface-container-high rounded-xl overflow-hidden relative group p-8 flex flex-col justify-end">
            <img
              alt="Coding"
              className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:scale-105 transition-transform duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKpaK52xJbs2IrwqOipnhkSr_7pHzUYSVg283iPEZOMLhZ1rlXf-oVNL7djiKFQduOjA_oDNQ0HMfVYJazRM-bCWq3lu7FVZSeiJLri9_ta0hvq5893Wpe7rrfryIP7vVwlUua-4ZSkAWb429lN2vs04X8sFHympqXFcLbn4VUs9iak6s4ZY0rAOp3XYnpxpF6VYlLg7VswJOIvq4PJ8YshJCauoIZBlrxia1AOEJL0Qyiz7lNt7AP3iWGIGY0sQbNN-g_FMZIMbcX"
            />
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-primary mb-2">Coding</h3>
              <p className="text-on-surface-variant">Arquitectura de software y lenguajes modernos para el futuro digital.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
