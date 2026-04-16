import React from 'react';

const TutorsExplorer = () => {
  return (
    <div className="bg-surface font-body text-on-surface selection:bg-tertiary-container/30">
      <nav className="bg-[#f7f9fb]/80 dark:bg-[#191c1e]/80 backdrop-blur-md text-[#002045] dark:text-[#f2f4f6] docked full-width top-0 sticky z-50 shadow-sm dark:shadow-none flex justify-between items-center w-full px-8 py-4 max-w-full mx-auto">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold tracking-tight text-[#002045] dark:text-[#f7f9fb] font-headline">
            The Academic Editorial
          </span>
          <div className="hidden md:flex gap-6 items-center">
            <a
              className="text-[#002045] dark:text-white font-bold border-b-2 border-[#002045] dark:border-[#f2f4f6] pb-1 hover:text-[#002045] dark:hover:text-white transition-colors"
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
          <button className="text-sm font-medium px-4 py-2 hover:bg-surface-container-high rounded-md transition-colors">
            Apply to Tutor
          </button>
          <button className="signature-gradient text-white px-6 py-2 rounded-md font-bold text-sm shadow-sm active:scale-95 transition-transform">
            Sign In
          </button>
        </div>
      </nav>
      <div className="flex min-h-[calc(100vh-72px)] bg-surface">
        <aside className="w-80 bg-surface-container-low flex flex-col p-8 gap-10 sticky top-[72px] h-[calc(100vh-72px)] border-r border-outline-variant/10">
          <div>
            <h3 className="text-sm font-label font-bold uppercase tracking-widest text-on-surface-variant mb-6">
              Filtros de Búsqueda
            </h3>
            <div className="space-y-8">
              <section>
                <label className="block text-sm font-semibold mb-3">Materia</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      defaultChecked
                      className="rounded text-primary focus:ring-primary border-outline-variant/50"
                      type="checkbox"
                    />
                    <span className="text-sm group-hover:text-primary transition-colors">
                      Matemáticas Avanzadas
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      className="rounded text-primary focus:ring-primary border-outline-variant/50"
                      type="checkbox"
                    />
                    <span className="text-sm group-hover:text-primary transition-colors">
                      Literatura Hispánica
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      className="rounded text-primary focus:ring-primary border-outline-variant/50"
                      type="checkbox"
                    />
                    <span className="text-sm group-hover:text-primary transition-colors">
                      Física Cuántica
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      className="rounded text-primary focus:ring-primary border-outline-variant/50"
                      type="checkbox"
                    />
                    <span className="text-sm group-hover:text-primary transition-colors">
                      Economía Política
                    </span>
                  </label>
                </div>
              </section>
              <section>
                <label className="block text-sm font-semibold mb-3">
                  Rango de Precio (h)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    className="w-full bg-surface-container-lowest border-none rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Min"
                    type="number"
                    defaultValue="20"
                  />
                  <span className="text-outline-variant">—</span>
                  <input
                    className="w-full bg-surface-container-lowest border-none rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Max"
                    type="number"
                    defaultValue="150"
                  />
                </div>
              </section>
              <section>
                <label className="block text-sm font-semibold mb-3">
                  Calificación Mínima
                </label>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      defaultChecked
                      className="text-primary focus:ring-primary border-outline-variant/50"
                      name="rating"
                      type="radio"
                    />
                    <div className="flex items-center gap-1 text-tertiary">
                      <span
                        className="material-symbols-outlined text-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span
                        className="material-symbols-outlined text-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span
                        className="material-symbols-outlined text-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span
                        className="material-symbols-outlined text-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="text-xs text-on-surface-variant font-medium ml-1">
                        4.0+
                      </span>
                    </div>
                  </label>
                </div>
              </section>
              <section>
                <label className="block text-sm font-semibold mb-3">
                  Disponibilidad
                </label>
                <select className="w-full bg-surface-container-lowest border-none rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 transition-all appearance-none">
                  <option>Esta semana</option>
                  <option>Mañana</option>
                  <option>Fin de semana</option>
                </select>
              </section>
            </div>
          </div>
          <div className="mt-auto pt-8">
            <button className="w-full py-3 bg-surface-container-high hover:bg-surface-container-highest text-primary font-bold text-sm rounded-md transition-all active:scale-[0.98]">
              Limpiar Filtros
            </button>
          </div>
        </aside>
        <main className="flex-1 p-12 max-w-[1400px]">
          <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-sm font-label font-bold uppercase tracking-[0.1em] text-tertiary mb-2 block">
                Explora Expertos
              </span>
              <h1 className="text-5xl font-headline font-extrabold text-primary leading-tight">
                Encuentra tu mentor académico ideal.
              </h1>
            </div>
            <div className="relative w-full md:w-96 group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60 group-focus-within:text-primary transition-colors">
                search
              </span>
              <input
                className="w-full pl-12 pr-6 py-4 bg-surface-container-lowest border-none rounded-xl shadow-sm focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-outline-variant"
                placeholder="Buscar por nombre o especialidad..."
                type="text"
              />
            </div>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Tutor 1 */}
            <div className="bg-surface-container-lowest rounded-xl p-8 flex flex-col gap-6 hover:shadow-[0_8px_40px_rgba(25,28,30,0.04)] transition-all group">
              <div className="flex items-start justify-between">
                <div className="relative">
                  <img
                    alt="Dra. Elena Vargas"
                    className="w-20 h-20 rounded-xl object-cover ring-4 ring-surface-container-low"
                    data-alt="professional portrait of a middle-aged academic woman with glasses and a warm smile in a brightly lit library setting"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYDetG1Htv7TDGh7b-ZcyptJv_BRmfHk67Hvv-z9x38pR7Lnbbp_vFVSPswDilxdclR7VMMY36dJIyCyIO8CzEeaY9gojpkgiE1WUpYIXsQDPwpPChd0IbqIwt9BoqJlswqDnC2j-VZe0oiB-_vkGqHEC-FJzJ55g9SaKOMLwT3GnDg0ajT1PuolWsPdzX3GHmHKS2cwqiOwK3TOukyXG2oXW2H9PsWkj1FuxwWEKJ60ZA2ss-q25KlSojW2mi2UNBy1m84ZHXVUvW"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-tertiary-container text-on-tertiary-container text-[10px] font-bold px-2 py-1 rounded-full shadow-sm uppercase tracking-wider">
                    Top Rated
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-2xl font-bold text-primary font-headline">
                    $65<span className="text-xs font-medium text-on-surface-variant">/h</span>
                  </span>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary font-headline group-hover:text-secondary transition-colors">
                  Dra. Elena Vargas
                </h2>
                <p className="text-xs font-bold text-tertiary uppercase tracking-widest mt-1">
                  Física & Matemáticas
                </p>
                <p className="mt-4 text-sm text-on-surface-variant leading-relaxed line-clamp-3 italic">
                  "Mi enfoque se basa en desglosar problemas complejos en conceptos visuales e intuitivos para garantizar un aprendizaje profundo."
                </p>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-1 text-tertiary">
                  <span
                    className="material-symbols-outlined text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="text-sm font-bold">4.9</span>
                </div>
                <span className="text-xs text-outline-variant font-medium">
                  (124 reseñas)
                </span>
              </div>
              <div className="pt-4 mt-auto border-t border-outline-variant/10">
                <button className="w-full py-3 border-2 border-primary/10 hover:border-primary text-primary font-bold text-sm rounded-md transition-all active:scale-[0.98]">
                  Ver Perfil
                </button>
              </div>
            </div>
            {/* Tutor 2 */}
            <div className="bg-surface-container-lowest rounded-xl p-8 flex flex-col gap-6 hover:shadow-[0_8px_40px_rgba(25,28,30,0.04)] transition-all group">
              <div className="flex items-start justify-between">
                <img
                  alt="Prof. Marco Tulio"
                  className="w-20 h-20 rounded-xl object-cover"
                  data-alt="portrait of a young male academic in a creative workspace with books and soft morning sunlight"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxR2q1aoO_TgePQh8N1j6EL-lIRM-Kedt4HIU-zNHTb2f1Hio1xdIvOwHCvC0Z7AElPUGRj10uW201OfWhAxJcgpAwOeIqCTKYd5c-mBMIFdXwLXaElLSDz4T5iLbc0eflud9RD-RMhEV3oBSXWdt0KykHAqknupOPf0LzHwVrindXkfZ3D-v2tncZnV7jvFnss-8fyiBH14J8akwpM3Bb5-BFEbIZewahOVmvlhYpOt_5fv53aNonGBY7HaU5VybXfNiry_ke_u-l"
                />
                <div className="text-right">
                  <span className="block text-2xl font-bold text-primary font-headline">
                    $45<span className="text-xs font-medium text-on-surface-variant">/h</span>
                  </span>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary font-headline group-hover:text-secondary transition-colors">
                  Prof. Marco Tulio
                </h2>
                <p className="text-xs font-bold text-tertiary uppercase tracking-widest mt-1">
                  Literatura & Filosofía
                </p>
                <p className="mt-4 text-sm text-on-surface-variant leading-relaxed line-clamp-3 italic">
                  "Exploramos los clásicos no como reliquias, sino como espejos de nuestra propia realidad contemporánea."
                </p>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-1 text-tertiary">
                  <span
                    className="material-symbols-outlined text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="text-sm font-bold">5.0</span>
                </div>
                <span className="text-xs text-outline-variant font-medium">
                  (89 reseñas)
                </span>
              </div>
              <div className="pt-4 mt-auto border-t border-outline-variant/10">
                <button className="w-full py-3 border-2 border-primary/10 hover:border-primary text-primary font-bold text-sm rounded-md transition-all active:scale-[0.98]">
                  Ver Perfil
                </button>
              </div>
            </div>
            {/* Tutor 3 */}
            <div className="bg-surface-container-lowest rounded-xl p-8 flex flex-col gap-6 hover:shadow-[0_8px_40px_rgba(25,28,30,0.04)] transition-all group">
              <div className="flex items-start justify-between">
                <img
                  alt="Mtra. Lucía Méndez"
                  className="w-20 h-20 rounded-xl object-cover"
                  data-alt="close up professional portrait of a confident young woman with braided hair against a neutral soft studio background"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBb6Ef5Aj5Kg6Ki4t5cqRj_SVpI3TlrRwVXvxwoE66x0P8DkSCwk3SzyRsmKFHvGfH2WaAddipLgkV0Xx-trHZnmH6_b23AtX3tY3oM-dYDH5PrDwIC-9aoyYt7kqlsdW_eDiK9aB7nJ3zqpdiOhjAyt669vKt6Kt14UF7bCDpaFTFPxV5J5KQOaiYXqL6ncB2ycCLSj9yjzq83KY9Z6cz8HoD7AIXGbKbl7IKUOXjEdOF7HKNmR9z0Gta6vQPQMlbbc856b8wmGlpR"
                />
                <div className="text-right">
                  <span className="block text-2xl font-bold text-primary font-headline">
                    $55<span className="text-xs font-medium text-on-surface-variant">/h</span>
                  </span>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary font-headline group-hover:text-secondary transition-colors">
                  Mtra. Lucía Méndez
                </h2>
                <p className="text-xs font-bold text-tertiary uppercase tracking-widest mt-1">
                  Economía & Estadística
                </p>
                <p className="mt-4 text-sm text-on-surface-variant leading-relaxed line-clamp-3 italic">
                  "Especialista en análisis de datos aplicado a ciencias sociales y preparación para exámenes de grado."
                </p>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-1 text-tertiary">
                  <span
                    className="material-symbols-outlined text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="text-sm font-bold">4.8</span>
                </div>
                <span className="text-xs text-outline-variant font-medium">
                  (210 reseñas)
                </span>
              </div>
              <div className="pt-4 mt-auto border-t border-outline-variant/10">
                <button className="w-full py-3 border-2 border-primary/10 hover:border-primary text-primary font-bold text-sm rounded-md transition-all active:scale-[0.98]">
                  Ver Perfil
                </button>
              </div>
            </div>
            {/* Tutor 4 */}
            <div className="bg-surface-container-lowest rounded-xl p-8 flex flex-col gap-6 hover:shadow-[0_8px_40px_rgba(25,28,30,0.04)] transition-all group lg:col-span-1">
              <div className="flex items-start justify-between">
                <img
                  alt="Dr. Julián Rivas"
                  className="w-20 h-20 rounded-xl object-cover"
                  data-alt="friendly man in professional attire sitting in a modern office with natural light and minimalist decor"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgv1WCen_2AmjQK1W5j8mP3hZhGz9wyqzD3dhdJfJcvhyJUOjxMC52ycbm7abnKVMngB6Zlmz5eDtlJdLxkb5DartbkSc8r0ACtDBVB6zHhxbnrYcFVSCbE8uMbA8TXhE83vr3sJr5pWEdud4ypwVfrQqeCOm4IVeJcjDLCgsnBXOKxXaevi4OuFge0cdgfHVC6UvanJDBMZib8ipZX1F9E5vynY_2MJwqwSi_qxIgCf7TiMAYtwDRW8PWC55EtlSiTGguA84c3yFK"
                />
                <div className="text-right">
                  <span className="block text-2xl font-bold text-primary font-headline">
                    $80<span className="text-xs font-medium text-on-surface-variant">/h</span>
                  </span>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary font-headline group-hover:text-secondary transition-colors">
                  Dr. Julián Rivas
                </h2>
                <p className="text-xs font-bold text-tertiary uppercase tracking-widest mt-1">
                  Derecho Mercantil
                </p>
                <p className="mt-4 text-sm text-on-surface-variant leading-relaxed line-clamp-3 italic">
                  "Orientación jurídica estratégica para estudiantes y profesionales del sector privado."
                </p>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-1 text-tertiary">
                  <span
                    className="material-symbols-outlined text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="text-sm font-bold">4.9</span>
                </div>
                <span className="text-xs text-outline-variant font-medium">
                  (65 reseñas)
                </span>
              </div>
              <div className="pt-4 mt-auto border-t border-outline-variant/10">
                <button className="w-full py-3 border-2 border-primary/10 hover:border-primary text-primary font-bold text-sm rounded-md transition-all active:scale-[0.98]">
                  Ver Perfil
                </button>
              </div>
            </div>
            {/* Tutor 5 */}
            <div className="bg-surface-container-lowest rounded-xl p-8 flex flex-col gap-6 hover:shadow-[0_8px_40px_rgba(25,28,30,0.04)] transition-all group lg:col-span-1">
              <div className="flex items-start justify-between">
                <img
                  alt="Ing. Sofía Ortiz"
                  className="w-20 h-20 rounded-xl object-cover"
                  data-alt="expressive portrait of a young professional woman in a high-tech studio environment with soft blue accent lighting"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMiUFTnkoTO7TI2_0VrsqHDl1R4LYJOPxjbk57JrIio9-xTDhQ-w1sqOrjrSl8LxKMW8NTSO4z9xdPbneo8pDbH-iZfDb_YmVnS5P3KOUJmk3jG-oHIfh3VAzpJBni_hf518sZOpNF5bSFVzd3fpz0q5bnz9xLTzjCH6kEsL0_4GJtI1KhRImoYVAMDYc9i6U0rAqSZDA_W2DemUjqUrx0YgB8kYJ2wJOluQtQw7p6t_KKLqeHKqpQ2xEEghz7sJCu2K0q4ioAdOoK"
                />
                <div className="text-right">
                  <span className="block text-2xl font-bold text-primary font-headline">
                    $40<span className="text-xs font-medium text-on-surface-variant">/h</span>
                  </span>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary font-headline group-hover:text-secondary transition-colors">
                  Ing. Sofía Ortiz
                </h2>
                <p className="text-xs font-bold text-tertiary uppercase tracking-widest mt-1">
                  Algoritmos & Programación
                </p>
                <p className="mt-4 text-sm text-on-surface-variant leading-relaxed line-clamp-3 italic">
                  "Aprende a programar resolviendo problemas del mundo real. Mentoría en Python, Java y C++."
                </p>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-1 text-tertiary">
                  <span
                    className="material-symbols-outlined text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="text-sm font-bold">4.7</span>
                </div>
                <span className="text-xs text-outline-variant font-medium">
                  (142 reseñas)
                </span>
              </div>
              <div className="pt-4 mt-auto border-t border-outline-variant/10">
                <button className="w-full py-3 border-2 border-primary/10 hover:border-primary text-primary font-bold text-sm rounded-md transition-all active:scale-[0.98]">
                  Ver Perfil
                </button>
              </div>
            </div>
            {/* Tutor 6 */}
            <div className="bg-surface-container-lowest rounded-xl p-8 flex flex-col gap-6 hover:shadow-[0_8px_40px_rgba(25,28,30,0.04)] transition-all group lg:col-span-1">
              <div className="flex items-start justify-between">
                <img
                  alt="Prof. David Kim"
                  className="w-20 h-20 rounded-xl object-cover"
                  data-alt="professional portrait of a man in a modern casual jacket with bright neutral lighting and a blurred office background"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbGUEL0nUBPuxHZELH_sNjIKicuPeocEkkHsDwqLV79RQl_pd_nxKk7YVzbMyYXl4DNF3X6QnqGOQc9a2FNURl2HS_Dj4X1Xht_rTI74nA6BFGFBxXGmCdmiZMkdaVJN1oW1m9LroSIK4ljwRdDt82-l0grdZ4W9VsP5ul14rFTFEmc82FbI4aJTmxKa1hSwir0mKZHY4MRMwqyzut6egLizgt82vMDjqHBB7ZzJ9fIaYGxmF6zvSNcwWk60Z0zp9JCaBeW0htxfy3"
                />
                <div className="text-right">
                  <span className="block text-2xl font-bold text-primary font-headline">
                    $35<span className="text-xs font-medium text-on-surface-variant">/h</span>
                  </span>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary font-headline group-hover:text-secondary transition-colors">
                  Prof. David Kim
                </h2>
                <p className="text-xs font-bold text-tertiary uppercase tracking-widest mt-1">
                  Biología & Genética
                </p>
                <p className="mt-4 text-sm text-on-surface-variant leading-relaxed line-clamp-3 italic">
                  "Pasión por la ciencia biológica. Ayudo a mis estudiantes a visualizar procesos moleculares complejos."
                </p>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-1 text-tertiary">
                  <span
                    className="material-symbols-outlined text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="text-sm font-bold">4.9</span>
                </div>
                <span className="text-xs text-outline-variant font-medium">
                  (58 reseñas)
                </span>
              </div>
              <div className="pt-4 mt-auto border-t border-outline-variant/10">
                <button className="w-full py-3 border-2 border-primary/10 hover:border-primary text-primary font-bold text-sm rounded-md transition-all active:scale-[0.98]">
                  Ver Perfil
                </button>
              </div>
            </div>
          </div>
          <div className="mt-20 flex justify-center">
            <nav className="flex items-center gap-2 p-1 bg-surface-container-low rounded-xl">
              <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold shadow-sm">
                1
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors">
                2
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors">
                3
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </nav>
          </div>
        </main>
      </div>
      <footer className="bg-[#f7f9fb] dark:bg-[#191c1e] w-full py-12 border-t border-[#e6e8ea]/20">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <span className="text-[0.75rem] uppercase tracking-[0.05em] font-medium Inter text-[#191c1e]/60">
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
    </div>
  );
};

export default TutorsExplorer;