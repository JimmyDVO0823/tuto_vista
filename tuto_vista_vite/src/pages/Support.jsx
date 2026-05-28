import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout/MainLayout';

const faqData = [
  {
    category: "Para Estudiantes",
    icon: "school",
    items: [
      {
        question: "¿Cómo selecciono al tutor ideal?",
        answer: "Puedes buscar tutores por materia, revisar sus credenciales, años de experiencia y leer las reseñas de otros estudiantes para tomar una decisión informada."
      },
      {
        question: "¿Qué pasa si necesito cancelar una sesión?",
        answer: "Puedes cancelar hasta 24 horas antes sin penalización. Si cancelas con menos tiempo, podría aplicarse un cargo según la política de cancelación del tutor."
      }
    ]
  },
  {
    category: "Para Tutores",
    icon: "person_play",
    items: [
      {
        question: "¿Cómo puedo postularme como tutor verificado?",
        answer: "Para ser un tutor verificado, debes completar tu perfil con tu experiencia, subir tus títulos y pasar nuestro proceso de validación académica."
      }
    ]
  },
  {
    category: "Pagos y Seguridad",
    icon: "shield_lock",
    items: [
      {
        question: "¿Cómo se procesan los pagos de forma segura?",
        answer: "Utilizamos pasarelas de pago certificadas internacionalmente. Tus datos financieros están encriptados y no se almacenan en nuestros servidores."
      }
    ]
  }
];

const Support = () => {
  const [activeCategory, setActiveCategory] = useState("Para Tutores");
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (catIndex, itemIndex) => {
    const key = `${catIndex}-${itemIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const scrollToCategory = (categoryName) => {
    setActiveCategory(categoryName);
    const element = document.getElementById(categoryName.replace(/\s+/g, '-').toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <MainLayout>
      <div className="w-full max-w-7xl mx-auto p-6 animate-in fade-in duration-700">
        
        {/* Header Area */}
        <header className="mb-16 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="max-w-2xl">
            <h4 className="font-label text-xs text-tertiary font-black tracking-widest uppercase mb-4">Centro de Ayuda</h4>
            <h1 className="font-display text-5xl font-extrabold text-primary leading-tight tracking-tighter mb-6">
              Preguntas Frecuentes
            </h1>
            <p className="text-on-surface-variant font-body text-lg leading-relaxed opacity-80">
              Bienvenido a nuestro repositorio de conocimiento académico. Aquí encontrará respuestas detalladas sobre nuestra metodología, procesos de seguridad y cómo optimizar su experiencia de aprendizaje.
            </p>
          </div>
          <div className="hidden md:flex flex-shrink-0 w-48 h-48 bg-surface-container-high rounded-full items-center justify-center">
             <span className="material-symbols-outlined !text-[80px] text-primary">menu_book</span>
          </div>
        </header>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative items-start">
          
          {/* Left Sidebar Menu */}
          <div className="lg:col-span-3 lg:sticky lg:top-6">
            <nav className="flex flex-col gap-2">
              {faqData.map((category) => (
                <button
                  key={category.category}
                  onClick={() => scrollToCategory(category.category)}
                  className={`flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-bold transition-all duration-300 w-full text-left
                    ${activeCategory === category.category 
                      ? 'bg-surface-container-lowest text-primary shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)]' 
                      : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary'}`}
                >
                  <span className="material-symbols-outlined text-xl">{category.icon}</span>
                  {category.category}
                </button>
              ))}
            </nav>
          </div>

          {/* FAQ Sections */}
          <div className="lg:col-span-9 space-y-16">
            {faqData.map((cat, catIndex) => (
              <section key={cat.category} id={cat.category.replace(/\s+/g, '-').toLowerCase()} className="scroll-mt-24">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="font-headline text-2xl font-bold text-primary">{cat.category}</h2>
                  <div className="flex-1 h-px bg-primary/10"></div>
                  <div className="w-8 h-0.5 bg-tertiary"></div>
                </div>

                <div className="space-y-4">
                  {cat.items.map((item, itemIndex) => {
                    const isOpen = openItems[`${catIndex}-${itemIndex}`];
                    return (
                      <div 
                        key={itemIndex} 
                        className="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-300"
                      >
                        <button 
                          onClick={() => toggleItem(catIndex, itemIndex)}
                          className="w-full flex items-center justify-between p-6 text-left hover:bg-surface/50 transition-colors"
                        >
                          <span className="font-body font-bold text-primary text-base pr-8">{item.question}</span>
                          <span className="material-symbols-outlined text-primary/50 transition-transform duration-300" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                            expand_more
                          </span>
                        </button>
                        <div 
                          className={`transition-all duration-300 ease-in-out overflow-hidden`}
                          style={{ maxHeight: isOpen ? '300px' : '0px', opacity: isOpen ? 1 : 0 }}
                        >
                          <div className="p-6 pt-0 text-on-surface-variant font-body leading-relaxed opacity-80 border-t border-black/5 mx-6 mt-4">
                            {item.answer}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}

            {/* Support CTA */}
            <div className="mt-20 bg-primary rounded-2xl p-12 text-center relative overflow-hidden shadow-2xl">
              <div className="relative z-10 max-w-2xl mx-auto">
                <h3 className="font-headline text-3xl font-bold text-white mb-4">¿Aún tiene dudas académicas?</h3>
                <p className="font-body text-white/80 text-lg mb-8">
                  Nuestro equipo de soporte está disponible 24/7 para asistirle en su viaje de aprendizaje.
                </p>
                <button className="bg-tertiary text-primary px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg hover:-translate-y-1 hover:shadow-tertiary/30 transition-all duration-300">
                  Contactar Soporte
                </button>
              </div>
              {/* Decorative Background Icon */}
              <span className="material-symbols-outlined absolute -bottom-20 -right-10 !text-[240px] text-white opacity-5 rotate-12 pointer-events-none">
                support_agent
              </span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Support;
