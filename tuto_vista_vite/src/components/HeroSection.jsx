export default function HeroSection() {
  return (
    <section className="relative min-h-[870px] flex items-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 z-10">
          <span className="inline-block px-3 py-1 bg-surface-container-high rounded-full text-[0.75rem] font-medium tracking-[0.05em] uppercase text-on-surface-variant mb-6 font-label">
            Excelencia Académica Personalizada
          </span>
          <h1 className="text-6xl md:text-7xl font-extrabold font-headline leading-[1.1] text-primary mb-8 tracking-tight ">
            <span className="text-6xl text-[rgb(0,32,69)] font-bold">Eleva tu</span> <br />
            <span className="text-6xl text-tertiary font-bold">potencial</span> <br />
            <span className="text-6xl text-[rgb(0,32,69)] font-bold">intelectual</span>.
          </h1>
          <p className="text-xl text-on-surface-variant max-w-xl mb-10 leading-relaxed">
            Accede a tutorías de élite con expertos académicos. Diseñado para estudiantes que buscan profundidad, claridad y resultados excepcionales.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="signature-gradient text-white px-8 py-4 rounded-md font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-95">
              Empezar ahora
            </button>
            <button className="px-8 py-4 text-primary font-bold text-lg flex items-center gap-2 hover:bg-surface-container-low rounded-md transition-colors">
              Ver metodología <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="aspect-[4/5] rounded-2xl bg-surface-container-high overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700">
            <img
              alt="Student studying"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDT6Syky2B-dAmRQwJ-szW_3ZZB2CXhtKwqk84tjn4kaT7zceDPz9P0GaNctkDPjZ3V47RIG97bKVimb1B-t5CElFQiXsEmOeKAN9y3ubAfFSyg76PuCo1Gyj_l8A_GfjDwt24hn2cJTNK8HhHQiqSL5VLdQOErMd_eaWsMLj49B4UtRCmdEKwrmBz5BlYrOlS3QWxxqj4WwDpDVe71ioZzmjOKoPrJOidZRZ6iljoLXODSOdccUy4OvFPKi7P7adif479ZEOeorAGp"
            />
          </div>
          {/* Overlapping Decorative Card */}
          <div className="absolute -bottom-10 -left-10 bg-surface-container-lowest p-8 rounded-xl shadow-xl max-w-[240px] hidden md:block">
            <div className="flex gap-2 mb-4">
              <span className="material-symbols-outlined text-tertiary-container">star</span>
              <span className="material-symbols-outlined text-tertiary-container">star</span>
              <span className="material-symbols-outlined text-tertiary-container">star</span>
              <span className="material-symbols-outlined text-tertiary-container">star</span>
              <span className="material-symbols-outlined text-tertiary-container">star</span>
            </div>
            <p className="text-sm font-semibold italic">"La mejor inversión en mi carrera académica hasta la fecha."</p>
          </div>
        </div>
      </div>
      {/* Background Shape */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-surface-container-low -z-10 rounded-l-[100px]"></div>
    </section>
  );
}
