<>
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
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
        "\n        .material-symbols-outlined {\n            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;\n        }\n        .signature-gradient {\n            background: linear-gradient(135deg, #002045 0%, #1a365d 100%);\n        }\n    "
    }}
  />
  {/* TopNavBar */}
  <nav className="bg-[#f7f9fb]/80 dark:bg-[#191c1e]/80 backdrop-blur-md docked full-width top-0 sticky z-50 shadow-sm dark:shadow-none">
    <div className="flex justify-between items-center w-full px-8 py-4 max-w-full mx-auto">
      <div className="flex items-center gap-12">
        <span className="text-xl font-bold tracking-tight text-[#002045] dark:text-[#f7f9fb] font-headline">
          The Academic Editorial
        </span>
        <div className="hidden md:flex items-center gap-8">
          <a
            className="text-[#191c1e]/60 dark:text-[#f7f9fb]/60 hover:text-[#002045] dark:hover:text-white transition-colors"
            href="#"
          >
            Find Tutors
          </a>
          <a
            className="text-[#191c1e]/60 dark:text-[#f7f9fb]/60 hover:text-[#002045] dark:hover:text-white transition-colors"
            href="#"
          >
            Library
          </a>
          <a
            className="text-[#191c1e]/60 dark:text-[#f7f9fb]/60 hover:text-[#002045] dark:hover:text-white transition-colors"
            href="#"
          >
            Resources
          </a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="px-5 py-2 text-[#002045] font-semibold hover:opacity-80 transition-all active:scale-95">
          Sign In
        </button>
        <button className="px-6 py-2 bg-tertiary-container text-[#4e3d00] font-bold rounded-md hover:brightness-105 transition-all active:scale-95">
          Apply to Tutor
        </button>
      </div>
    </div>
  </nav>
  <main>
    {/* Hero Section: Intentional Asymmetry */}
    <section className="relative min-h-[870px] flex items-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 z-10">
          <span className="inline-block px-3 py-1 bg-surface-container-high rounded-full text-[0.75rem] font-medium tracking-[0.05em] uppercase text-on-surface-variant mb-6 font-label">
            Excelencia Académica Personalizada
          </span>
          <h1 className="text-6xl md:text-7xl font-extrabold font-headline leading-[1.1] text-primary mb-8 tracking-tight">
            Eleva tu <br />
            <span className="text-tertiary">potencial</span> intelectual.
          </h1>
          <p className="text-xl text-on-surface-variant max-w-xl mb-10 leading-relaxed">
            Accede a tutorías de élite con expertos académicos. Diseñado para
            estudiantes que buscan profundidad, claridad y resultados
            excepcionales.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="signature-gradient text-white px-8 py-4 rounded-md font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-95">
              Empezar ahora
            </button>
            <button className="px-8 py-4 text-primary font-bold text-lg flex items-center gap-2 hover:bg-surface-container-low rounded-md transition-colors">
              Ver metodología{" "}
              <span
                className="material-symbols-outlined"
                data-icon="arrow_forward"
              >
                arrow_forward
              </span>
            </button>
          </div>
        </div>
        <div className="lg:col-span-5 relative">
          <div className="aspect-[4/5] rounded-2xl bg-surface-container-high overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700">
            <img
              alt="Student studying"
              className="w-full h-full object-cover"
              data-alt="Young student reading a classic book in a bright modern library with large windows and soft daylight reflecting on wood surfaces"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDT6Syky2B-dAmRQwJ-szW_3ZZB2CXhtKwqk84tjn4kaT7zceDPz9P0GaNctkDPjZ3V47RIG97bKVimb1B-t5CElFQiXsEmOeKAN9y3ubAfFSyg76PuCo1Gyj_l8A_GfjDwt24hn2cJTNK8HhHQiqSL5VLdQOErMd_eaWsMLj49B4UtRCmdEKwrmBz5BlYrOlS3QWxxqj4WwDpDVe71ioZzmjOKoPrJOidZRZ6iljoLXODSOdccUy4OvFPKi7P7adif479ZEOeorAGp"
            />
          </div>
          {/* Overlapping Decorative Element */}
          <div className="absolute -bottom-10 -left-10 bg-surface-container-lowest p-8 rounded-xl shadow-xl max-w-[240px] hidden md:block">
            <div className="flex gap-2 mb-4">
              <span
                className="material-symbols-outlined text-tertiary-container"
                data-icon="star"
                data-weight="fill"
              >
                star
              </span>
              <span
                className="material-symbols-outlined text-tertiary-container"
                data-icon="star"
                data-weight="fill"
              >
                star
              </span>
              <span
                className="material-symbols-outlined text-tertiary-container"
                data-icon="star"
                data-weight="fill"
              >
                star
              </span>
              <span
                className="material-symbols-outlined text-tertiary-container"
                data-icon="star"
                data-weight="fill"
              >
                star
              </span>
              <span
                className="material-symbols-outlined text-tertiary-container"
                data-icon="star"
                data-weight="fill"
              >
                star
              </span>
            </div>
            <p className="text-sm font-semibold italic">
              "La mejor inversión en mi carrera académica hasta la fecha."
            </p>
          </div>
        </div>
      </div>
      {/* Background Shape */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-surface-container-low -z-10 rounded-l-[100px]" />
    </section>
    {/* Categories: Bento Grid */}
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-[0.75rem] font-medium tracking-[0.05em] uppercase text-tertiary font-label">
              Especialidades
            </span>
            <h2 className="text-4xl font-extrabold font-headline text-primary mt-2">
              Áreas de Enfoque
            </h2>
          </div>
          <a
            className="text-primary font-bold border-b-2 border-primary pb-1 hover:text-tertiary hover:border-tertiary transition-colors"
            href="#"
          >
            Ver todas las materias
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-[600px]">
          {/* Math */}
          <div className="md:col-span-2 md:row-span-2 bg-primary-container rounded-xl overflow-hidden relative group p-8 flex flex-col justify-end">
            <img
              alt="Mathematics"
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
              data-alt="Close up of mathematical equations written on a dark chalkboard with white chalk in a sophisticated academic setting"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFWsDv5ChJK5Wfp5yBLP_wU6S4a2ZqI69rGJwD04ASM_MnBNUq7SoSQY6MAInPlxJeMm8dQEDIUhMdHN9e0UUVWQjtPB0WgSpKrtj2VTZGQVEfIy5Llee2MKjxRDmP3WBihPFykz6GEzgUFlltsLS-s_NnHgjunwQNln3KDvYv2iwDqAWAdbkZc9GGtf3RQ1XHlpb-_qUxWP8Fq3vpx2wE1A4p3lTaBHXFhUb1XT3UsGRc_KDXRKsn-8_D4fFCpXQJI7TJsPu0XvaA"
            />
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-2">Math</h3>
              <p className="text-on-primary-container max-w-xs">
                Desde cálculo avanzado hasta álgebra lineal, dominamos la
                lógica.
              </p>
            </div>
          </div>
          {/* Science */}
          <div className="md:col-span-2 bg-tertiary-container rounded-xl overflow-hidden relative group p-8 flex flex-col justify-end">
            <img
              alt="Science"
              className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-700"
              data-alt="Microscope in a clean laboratory environment with shallow depth of field and professional cool lighting"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEn9FDgtGdeMoNsSU8yb4V7fQv-eXvl2uJhmVzxkBTzsuCB5ZVpxD8IWGgXA9VFrgCluSHh7bf_AOouWPQWZGG73XYPGDpxo2tyHtS40tV0UWCDEjPHt5h_hiZM-mE2fv2P3sLDFGcGXBUDM-C5eXNIyMZ2fq7Qm-JE62Wbfh1znlLJykgHZojEek5RHAQP5S0O_J8pX3fCl0ld2j8Uu_DfeYXev0mzLyUF95GFgKJHr6853h3Z8Zzl-xWGqhE9KwH7xDW6cfelR9r"
            />
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-on-tertiary-container mb-2">
                Science
              </h3>
              <p className="text-on-tertiary-container/80">
                Física, Química y Biología con un enfoque experimental y
                teórico.
              </p>
            </div>
          </div>
          {/* Coding */}
          <div className="md:col-span-2 bg-surface-container-high rounded-xl overflow-hidden relative group p-8 flex flex-col justify-end">
            <img
              alt="Coding"
              className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:scale-105 transition-transform duration-700"
              data-alt="Clean minimal coding workspace with laptop showing syntax highlighted code in dark mode and soft plant in background"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKpaK52xJbs2IrwqOipnhkSr_7pHzUYSVg283iPEZOMLhZ1rlXf-oVNL7djiKFQduOjA_oDNQ0HMfVYJazRM-bCWq3lu7FVZSeiJLri9_ta0hvq5893Wpe7rrfryIP7vVwlUua-4ZSkAWb429lN2vs04X8sFHympqXFcLbn4VUs9iak6s4ZY0rAOp3XYnpxpF6VYlLg7VswJOIvq4PJ8YshJCauoIZBlrxia1AOEJL0Qyiz7lNt7AP3iWGIGY0sQbNN-g_FMZIMbcX"
            />
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-primary mb-2">Coding</h3>
              <p className="text-on-surface-variant">
                Arquitectura de software y lenguajes modernos para el futuro
                digital.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* How it works: Tonal Layering */}
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl font-extrabold font-headline text-primary mb-6">
            Un Ecosistema de Aprendizaje
          </h2>
          <p className="text-on-surface-variant">
            Conectamos mentes brillantes con herramientas de vanguardia para una
            experiencia educativa sin fricciones.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* For Students */}
          <div className="bg-surface-container-lowest p-12 rounded-xl">
            <span
              className="material-symbols-outlined text-4xl text-primary mb-6"
              data-icon="school"
            >
              school
            </span>
            <h3 className="text-2xl font-bold font-headline text-primary mb-4">
              Para Estudiantes
            </h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-tertiary-fixed flex items-center justify-center flex-shrink-0">
                  <span
                    className="material-symbols-outlined text-xs text-on-tertiary-fixed"
                    data-icon="check"
                    data-weight="fill"
                  >
                    check
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-primary">Tutorías 1 a 1</h4>
                  <p className="text-sm text-on-surface-variant">
                    Atención personalizada adaptada a tu ritmo y estilo de
                    aprendizaje.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-tertiary-fixed flex items-center justify-center flex-shrink-0">
                  <span
                    className="material-symbols-outlined text-xs text-on-tertiary-fixed"
                    data-icon="check"
                    data-weight="fill"
                  >
                    check
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-primary">
                    Recursos Exclusivos
                  </h4>
                  <p className="text-sm text-on-surface-variant">
                    Acceso a nuestra biblioteca de guías de estudio y ejercicios
                    prácticos.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-tertiary-fixed flex items-center justify-center flex-shrink-0">
                  <span
                    className="material-symbols-outlined text-xs text-on-tertiary-fixed"
                    data-icon="check"
                    data-weight="fill"
                  >
                    check
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-primary">
                    Seguimiento de Progreso
                  </h4>
                  <p className="text-sm text-on-surface-variant">
                    Dashboard detallado con tus logros y áreas de mejora.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          {/* For Tutors */}
          <div className="bg-primary text-white p-12 rounded-xl">
            <span
              className="material-symbols-outlined text-4xl text-tertiary-container mb-6"
              data-icon="history_edu"
            >
              history_edu
            </span>
            <h3 className="text-2xl font-bold font-headline mb-4">
              Para Tutores
            </h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0">
                  <span
                    className="material-symbols-outlined text-xs text-tertiary-container"
                    data-icon="bolt"
                    data-weight="fill"
                  >
                    bolt
                  </span>
                </div>
                <div>
                  <h4 className="font-bold">Flexibilidad Total</h4>
                  <p className="text-sm text-on-primary-container">
                    Define tu propio horario y gestiona tus sesiones con
                    facilidad.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0">
                  <span
                    className="material-symbols-outlined text-xs text-tertiary-container"
                    data-icon="bolt"
                    data-weight="fill"
                  >
                    bolt
                  </span>
                </div>
                <div>
                  <h4 className="font-bold">Comunidad Académica</h4>
                  <p className="text-sm text-on-primary-container">
                    Colabora con otros expertos y expande tu red profesional.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0">
                  <span
                    className="material-symbols-outlined text-xs text-tertiary-container"
                    data-icon="bolt"
                    data-weight="fill"
                  >
                    bolt
                  </span>
                </div>
                <div>
                  <h4 className="font-bold">Pago Premium</h4>
                  <p className="text-sm text-on-primary-container">
                    Remuneración competitiva por tu conocimiento especializado.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    {/* Testimonials */}
    <section className="py-24 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-4">
            <h2 className="text-4xl font-extrabold font-headline text-primary mb-6">
              Confianza de la Comunidad
            </h2>
            <p className="text-on-surface-variant mb-8 leading-relaxed">
              Más de 500 estudiantes han transformado su rendimiento académico
              con nosotros.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <img
                  alt="User 1"
                  className="w-12 h-12 rounded-full border-4 border-surface"
                  data-alt="Portrait of a smiling young woman with professional lighting"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDP9ez9i0ZSLoR61vpRTJ7lw4m6WGkqvFe4rKL-C6A99RI7kVn_4ArffyO5bm2YLK5dF3ZG0vdFHm2U-sUkO2UXBa-gHvCUoBRtApb4Ehm2co95S0IJuhJrxgRpWjEIhTQUh3qQuCWhn-SO92e7-YXOSUP5zzyWx1aj4hhWYr1Iju65wWP8p7U5-3xOMxX6-0mF62VYAU8AW0S0qtyl4G81r5-4BVFvnJmFrWHUj2UXA7VNtiq-Znow-I4bLorGalThXIYDwjObTxHR"
                />
                <img
                  alt="User 2"
                  className="w-12 h-12 rounded-full border-4 border-surface"
                  data-alt="Portrait of a young man in academic attire looking thoughtful"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyNixKDo7F7yvEUPGhJ09RzSXMMMyb3oZgmixM_BGD1nFGewh5Q6-DaxrX0mqBFh37qQCFRp4AkzRQZoUloVDDrtdbACnu2EWQILMzTcLlkraSvLHxVIBZ1LCgq6e7jOOaP6Dfzz7RyMHZKu3CaUldwddCMh1WBwrV3-4W_heRREX3xJMEOmEMeHF_FmJsJ9USGKk_aYVtZ6k4wRGR7OV7l-Ds5qFEkYZhMNvQrdxxsIGv8dTJ_-apf0zlQfSkN3iNkwf09h0kjLRK"
                />
                <img
                  alt="User 3"
                  className="w-12 h-12 rounded-full border-4 border-surface"
                  data-alt="Close up of a friendly face with professional lighting"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB34OhIH6kA60P6HFSs7OdR1TgvWjfOcwqOTy53w_6sT8RAlraXiGs9EEaM5nMNRcyOmIB77U0HeuP2AC32zINyURSkS1bjqQP9F6xuHSIQpfrYpeVE3yKXQlNYapNmebQ7PprFgJnidB6OOCldEgHxPn3zVSwLwUW-DOYDp2BYaR5NjYNxI8WI98Tuxtc0NuXz90xFWTozQk69LFZE9rrq4yBXiZUGUf15m4X-CANuDflzudpoetr-I3Pi1uEE0UOVvNXKKUjZkwLD"
                />
              </div>
              <span className="text-sm font-bold text-primary">
                +500 Alumnos
              </span>
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-surface-container-low p-8 rounded-xl shadow-sm">
                <p className="text-lg text-primary italic mb-6">
                  "Los tutores aquí no solo enseñan, inspiran. Mi comprensión de
                  la física cuántica dio un giro de 180 grados."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-fixed" />
                  <div>
                    <h4 className="font-bold text-primary">Sofía Méndez</h4>
                    <p className="text-xs text-on-surface-variant uppercase tracking-widest font-label">
                      Estudiante de Ingeniería
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-low p-8 rounded-xl shadow-sm transform translate-y-8">
                <p className="text-lg text-primary italic mb-6">
                  "La plataforma es impecable. Todo está diseñado para que el
                  aprendizaje sea el protagonista."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-tertiary-fixed" />
                  <div>
                    <h4 className="font-bold text-primary">Carlos Ruiz</h4>
                    <p className="text-xs text-on-surface-variant uppercase tracking-widest font-label">
                      PhD Candidate
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* Final CTA */}
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="signature-gradient rounded-[2rem] p-16 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold font-headline mb-8">
              ¿Listo para comenzar tu viaje?
            </h2>
            <p className="text-xl text-on-primary-container max-w-2xl mx-auto mb-10">
              Únete hoy y obtén una evaluación diagnóstica gratuita con uno de
              nuestros especialistas.
            </p>
            <button className="bg-tertiary-container text-[#4e3d00] px-10 py-5 rounded-md font-bold text-xl hover:brightness-110 transition-all active:scale-95 shadow-xl">
              Empezar ahora gratis
            </button>
          </div>
          {/* Abstract Background Shape */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-tertiary/10 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  </main>
  {/* Footer */}
  <footer className="bg-[#f7f9fb] dark:bg-[#191c1e] w-full py-12 border-t border-[#e6e8ea]/20">
    <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
      <span className="text-[0.75rem] uppercase tracking-[0.05em] font-medium Inter text-[#002045] dark:text-[#f2f4f6]">
        © 2024 The Academic Editorial. All rights reserved.
      </span>
      <div className="flex gap-8">
        <a
          className="text-[0.75rem] uppercase tracking-[0.05em] font-medium Inter text-gray-500 hover:text-[#002045] transition-colors"
          href="#"
        >
          Privacy Policy
        </a>
        <a
          className="text-[0.75rem] uppercase tracking-[0.05em] font-medium Inter text-gray-500 hover:text-[#002045] transition-colors"
          href="#"
        >
          Terms of Service
        </a>
        <a
          className="text-[0.75rem] uppercase tracking-[0.05em] font-medium Inter text-gray-500 hover:text-[#002045] transition-colors"
          href="#"
        >
          Accessibility
        </a>
        <a
          className="text-[0.75rem] uppercase tracking-[0.05em] font-medium Inter text-gray-500 hover:text-[#002045] transition-colors"
          href="#"
        >
          Contact
        </a>
      </div>
    </div>
  </footer>
</>
