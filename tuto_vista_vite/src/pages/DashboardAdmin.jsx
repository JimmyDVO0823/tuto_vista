<>
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>Admin Dashboard | The Academic Editorial</title>
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
        "\n        .material-symbols-outlined {\n            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;\n        }\n        body { font-family: 'Inter', sans-serif; }\n        h1, h2, h3 { font-family: 'Manrope', sans-serif; }\n        .glass-nav {\n            background: rgba(247, 249, 251, 0.8);\n            backdrop-filter: blur(24px);\n        }\n        .signature-gradient {\n            background: linear-gradient(135deg, #002045 0%, #1a365d 100%);\n        }\n    "
    }}
  />
  {/* SideNavBar (Authority Source: JSON SideNavBar) */}
  <aside className="h-screen w-64 fixed left-0 top-0 bg-[#f2f4f6] dark:bg-[#1c1c1c] flex flex-col py-8 z-40">
    <div className="px-8 mb-10">
      <span className="text-lg font-black tracking-widest uppercase text-primary">
        The Editorial
      </span>
    </div>
    <div className="flex items-center px-8 mb-10 gap-3">
      <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden">
        <img
          className="w-full h-full object-cover"
          data-alt="Professional portrait of a male administrator in a sharp suit with neutral academic lighting"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBD-D8rOFTfBViH9iJai4mtns85ySMoEPcEGw8i1KEuunHhv5AALh6QplXqH0Gdfdd3V-XoDprTzpxs4wcJky9JJkKike9gOfhs5Kq94madtGEp5pQXudm7Vko3qC7aQPvBYzJsyJHeKZ_K4qCJfR13MBZXm6Y_wD8NpWS-v9Enn5WRnXnr9DSzHrqZ0TfRug_6CCwbClffu8Ce63PKV7IBiodP1jkkQD5kghA7lRJPOUUBjKAQ34fRb8iZkbECFCKFTZt68T-VDsla"
        />
      </div>
      <div>
        <p className="text-sm font-bold text-primary">Julian Reed</p>
        <p className="text-[0.65rem] uppercase tracking-wider text-gray-500 font-semibold">
          Honors Scholar
        </p>
      </div>
    </div>
    <nav className="flex-1 space-y-1">
      {/* Dashboard is Active */}
      <a
        className="flex items-center gap-3 bg-white text-primary font-semibold rounded-l-full ml-4 pl-4 py-3 transition-transform active:scale-95"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="dashboard">
          dashboard
        </span>
        <span className="text-sm">Dashboard</span>
      </a>
      <a
        className="flex items-center gap-3 text-on-background/70 px-8 py-3 hover:bg-[#e6e8ea] transition-all"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="calendar_today">
          calendar_today
        </span>
        <span className="text-sm">My Sessions</span>
      </a>
      <a
        className="flex items-center gap-3 text-on-background/70 px-8 py-3 hover:bg-[#e6e8ea] transition-all"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="menu_book">
          menu_book
        </span>
        <span className="text-sm">Assignments</span>
      </a>
      <a
        className="flex items-center gap-3 text-on-background/70 px-8 py-3 hover:bg-[#e6e8ea] transition-all"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="mail">
          mail
        </span>
        <span className="text-sm">Messages</span>
      </a>
      <a
        className="flex items-center gap-3 text-on-background/70 px-8 py-3 hover:bg-[#e6e8ea] transition-all"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="settings">
          settings
        </span>
        <span className="text-sm">Settings</span>
      </a>
    </nav>
    <div className="px-8 mt-6">
      <button className="w-full bg-tertiary-container text-on-tertiary-container font-bold py-3 rounded-md text-xs uppercase tracking-widest shadow-sm hover:opacity-90 transition-opacity">
        Book New Session
      </button>
    </div>
    <div className="mt-auto space-y-1">
      <a
        className="flex items-center gap-3 text-on-background/70 px-8 py-3 hover:bg-[#e6e8ea] transition-all"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="help">
          help
        </span>
        <span className="text-sm">Support</span>
      </a>
      <a
        className="flex items-center gap-3 text-on-background/70 px-8 py-3 hover:bg-[#e6e8ea] transition-all"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="logout">
          logout
        </span>
        <span className="text-sm">Logout</span>
      </a>
    </div>
  </aside>
  {/* Main Content Canvas */}
  <main className="ml-64 p-8 min-h-screen">
    {/* Header Section */}
    <header className="flex justify-between items-end mb-12">
      <div className="max-w-2xl">
        <span className="text-[0.75rem] uppercase tracking-[0.15em] font-bold text-tertiary mb-2 block">
          Panel de Administración
        </span>
        <h1 className="text-5xl font-extrabold text-primary tracking-tight leading-none">
          Visión General del Sistema
        </h1>
      </div>
      <div className="flex gap-4">
        <div className="bg-surface-container-low px-4 py-2 rounded-md flex items-center gap-2">
          <span
            className="material-symbols-outlined text-sm"
            data-icon="calendar_month"
          >
            calendar_month
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider">
            Octubre 2024
          </span>
        </div>
      </div>
    </header>
    {/* Top KPI Cards: Asymmetric Bento Grid Style */}
    <section className="grid grid-cols-12 gap-6 mb-12">
      {/* Card 1: Total Usuarios */}
      <div className="col-span-4 bg-surface-container-lowest p-8 rounded-xl flex flex-col justify-between min-h-[180px]">
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center">
            <span
              className="material-symbols-outlined text-primary"
              data-icon="group"
            >
              group
            </span>
          </div>
          <span className="text-[0.65rem] font-bold text-secondary uppercase tracking-widest">
            +12% vs mes anterior
          </span>
        </div>
        <div>
          <p className="text-[0.7rem] uppercase tracking-widest font-semibold text-gray-400 mb-1">
            Total Usuarios
          </p>
          <h2 className="text-4xl font-bold text-primary">12,482</h2>
        </div>
      </div>
      {/* Card 2: Total Ingresos (Signature Gradient) */}
      <div className="col-span-5 signature-gradient p-8 rounded-xl flex flex-col justify-between text-white min-h-[180px] shadow-xl shadow-primary/10">
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
            <span
              className="material-symbols-outlined text-white"
              data-icon="payments"
            >
              payments
            </span>
          </div>
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse" />
            <span className="text-[0.65rem] font-bold uppercase tracking-widest text-white/80">
              En Tiempo Real
            </span>
          </div>
        </div>
        <div>
          <p className="text-[0.7rem] uppercase tracking-widest font-semibold text-white/60 mb-1">
            Ingresos Plataforma
          </p>
          <h2 className="text-4xl font-bold">$42,910.00</h2>
        </div>
      </div>
      {/* Card 3: Tutores Activos */}
      <div className="col-span-3 bg-surface-container-lowest p-8 rounded-xl flex flex-col justify-between min-h-[180px]">
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 rounded-lg bg-tertiary-container/10 flex items-center justify-center">
            <span
              className="material-symbols-outlined text-tertiary"
              data-icon="school"
            >
              school
            </span>
          </div>
        </div>
        <div>
          <p className="text-[0.7rem] uppercase tracking-widest font-semibold text-gray-400 mb-1">
            Tutores Activos
          </p>
          <h2 className="text-4xl font-bold text-primary">856</h2>
        </div>
      </div>
    </section>
    {/* Charts Section: Intentional Asymmetry */}
    <section className="grid grid-cols-12 gap-8 mb-12">
      {/* Main Chart: Tutorías realizadas (Line Chart) */}
      <div className="col-span-8 bg-surface-container-lowest p-8 rounded-xl">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-xl font-bold text-primary">
            Tutorías Realizadas
          </h3>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-[0.65rem] font-bold uppercase text-gray-500">
                Sesiones
              </span>
            </div>
          </div>
        </div>
        {/* Visual Mock of Line Chart */}
        <div className="relative h-64 flex items-end justify-between gap-1 px-4">
          <div className="absolute inset-0 flex flex-col justify-between py-2 border-l border-b border-outline-variant/20">
            <div className="w-full border-t border-dashed border-outline-variant/10" />
            <div className="w-full border-t border-dashed border-outline-variant/10" />
            <div className="w-full border-t border-dashed border-outline-variant/10" />
            <div className="w-full border-t border-dashed border-outline-variant/10" />
          </div>
          <div className="flex-1 bg-primary/10 rounded-t-sm h-[40%] group relative hover:bg-primary/20 transition-all">
            <div className="absolute -top-1 w-full h-1 bg-primary" />
          </div>
          <div className="flex-1 bg-primary/10 rounded-t-sm h-[55%] group relative hover:bg-primary/20 transition-all">
            <div className="absolute -top-1 w-full h-1 bg-primary" />
          </div>
          <div className="flex-1 bg-primary/10 rounded-t-sm h-[45%] group relative hover:bg-primary/20 transition-all">
            <div className="absolute -top-1 w-full h-1 bg-primary" />
          </div>
          <div className="flex-1 bg-primary/10 rounded-t-sm h-[70%] group relative hover:bg-primary/20 transition-all">
            <div className="absolute -top-1 w-full h-1 bg-primary" />
          </div>
          <div className="flex-1 bg-primary/10 rounded-t-sm h-[60%] group relative hover:bg-primary/20 transition-all">
            <div className="absolute -top-1 w-full h-1 bg-primary" />
          </div>
          <div className="flex-1 bg-primary/10 rounded-t-sm h-[85%] group relative hover:bg-primary/20 transition-all">
            <div className="absolute -top-1 w-full h-1 bg-primary" />
          </div>
          <div className="flex-1 bg-primary/10 rounded-t-sm h-[95%] group relative hover:bg-primary/20 transition-all">
            <div className="absolute -top-1 w-full h-1 bg-primary" />
          </div>
        </div>
        <div className="flex justify-between mt-4 px-4 text-[0.65rem] uppercase font-bold text-gray-400">
          <span>Lun</span>
          <span>Mar</span>
          <span>Mie</span>
          <span>Jue</span>
          <span>Vie</span>
          <span>Sab</span>
          <span>Dom</span>
        </div>
      </div>
      {/* Secondary Chart: Materias más solicitadas (Pie/Donut Concept) */}
      <div className="col-span-4 bg-surface-container-low p-8 rounded-xl flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-primary mb-2">Materias</h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Distribución de las materias más demandadas en el último trimestre.
          </p>
        </div>
        <div className="relative w-48 h-48 mx-auto my-6 flex items-center justify-center">
          {/* Stylized CSS Donut */}
          <div
            className="absolute inset-0 rounded-full border-[18px] border-primary"
            style={{
              clipPath:
                "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%)"
            }}
          />
          <div
            className="absolute inset-0 rounded-full border-[18px] border-tertiary-container/40"
            style={{ clipPath: "polygon(50% 50%, 50% 0%, 0% 0%, 0% 50%)" }}
          />
          <div className="flex flex-col items-center">
            <span className="text-3xl font-black text-primary">64%</span>
            <span className="text-[0.6rem] uppercase tracking-tighter font-bold text-gray-500">
              STEM Focus
            </span>
          </div>
        </div>
        <ul className="space-y-3">
          <li className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs font-semibold">Cálculo Avanzado</span>
            </div>
            <span className="text-xs font-bold">42%</span>
          </li>
          <li className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-tertiary-container" />
              <span className="text-xs font-semibold">Literatura Moderna</span>
            </div>
            <span className="text-xs font-bold">22%</span>
          </li>
          <li className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-outline-variant" />
              <span className="text-xs font-semibold">Otros</span>
            </div>
            <span className="text-xs font-bold">36%</span>
          </li>
        </ul>
      </div>
    </section>
    {/* Final Chart: Usuarios registrados por mes (Bar Chart) */}
    <section className="grid grid-cols-12 gap-8">
      <div className="col-span-12 bg-surface-container-lowest p-8 rounded-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h3 className="text-xl font-bold text-primary">
              Usuarios registrados por mes
            </h3>
            <p className="text-xs text-gray-500">
              Crecimiento orgánico de la comunidad estudiantil
            </p>
          </div>
          <button className="bg-surface-container-high px-6 py-3 rounded-md text-[0.7rem] font-bold uppercase tracking-widest text-primary hover:bg-surface-variant transition-colors">
            Descargar Reporte PDF
          </button>
        </div>
        <div className="flex items-end justify-between h-48 gap-4 px-2">
          {/* Bar 1 */}
          <div className="flex-1 flex flex-col items-center gap-3">
            <div className="w-full bg-surface-container-high rounded-t-lg h-[30%] hover:bg-secondary-fixed transition-colors" />
            <span className="text-[0.6rem] font-bold text-gray-400 uppercase">
              Ene
            </span>
          </div>
          {/* Bar 2 */}
          <div className="flex-1 flex flex-col items-center gap-3">
            <div className="w-full bg-surface-container-high rounded-t-lg h-[45%] hover:bg-secondary-fixed transition-colors" />
            <span className="text-[0.6rem] font-bold text-gray-400 uppercase">
              Feb
            </span>
          </div>
          {/* Bar 3 */}
          <div className="flex-1 flex flex-col items-center gap-3">
            <div className="w-full bg-surface-container-high rounded-t-lg h-[40%] hover:bg-secondary-fixed transition-colors" />
            <span className="text-[0.6rem] font-bold text-gray-400 uppercase">
              Mar
            </span>
          </div>
          {/* Bar 4 */}
          <div className="flex-1 flex flex-col items-center gap-3">
            <div className="w-full bg-surface-container-high rounded-t-lg h-[65%] hover:bg-secondary-fixed transition-colors" />
            <span className="text-[0.6rem] font-bold text-gray-400 uppercase">
              Abr
            </span>
          </div>
          {/* Bar 5 */}
          <div className="flex-1 flex flex-col items-center gap-3">
            <div className="w-full bg-surface-container-high rounded-t-lg h-[85%] hover:bg-secondary-fixed transition-colors" />
            <span className="text-[0.6rem] font-bold text-gray-400 uppercase">
              May
            </span>
          </div>
          {/* Bar 6 (Current Highlight) */}
          <div className="flex-1 flex flex-col items-center gap-3">
            <div className="w-full bg-primary rounded-t-lg h-[100%]" />
            <span className="text-[0.6rem] font-bold text-primary uppercase">
              Jun
            </span>
          </div>
        </div>
      </div>
    </section>
    {/* Footer (Authority Source: JSON Footer) */}
    <footer className="mt-20 border-t border-[#e6e8ea]/20 py-12 flex justify-between items-center text-[0.75rem] uppercase tracking-[0.05em] font-medium text-gray-500">
      <p>© 2024 The Academic Editorial. All rights reserved.</p>
      <div className="flex gap-8">
        <a className="hover:text-primary transition-colors" href="#">
          Privacy Policy
        </a>
        <a className="hover:text-primary transition-colors" href="#">
          Terms of Service
        </a>
        <a className="hover:text-primary transition-colors" href="#">
          Accessibility
        </a>
        <a className="hover:text-primary transition-colors" href="#">
          Contact
        </a>
      </div>
    </footer>
  </main>
</>
        </header >
  <section className="grid grid-cols-12 gap-6 mb-12">
    <div className="col-span-4 bg-white p-8 rounded-xl border border-[#e6e8ea]">
      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Total Usuarios</p>
      <h2 className="text-4xl font-bold text-[#002045]">12,482</h2>
    </div>
    <div className="col-span-4 signature-gradient text-white p-8 rounded-xl">
      <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">Ingresos</p>
      <h2 className="text-4xl font-bold">$42,910.00</h2>
    </div>
  </section>
      </main >
    </>
  );
}
