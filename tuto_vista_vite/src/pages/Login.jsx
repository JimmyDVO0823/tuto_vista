import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9fb]">
      <Header />
      
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[1000px] grid md:grid-cols-2 bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
          {/* Left Side: Illustration / Branding */}
          <div className="hidden md:block relative p-12 signature-gradient text-white overflow-hidden">
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-[0.1em] text-white/80 font-bold mb-4 block">
                  Bienvenido
                </span>
                <h1 className="text-4xl font-bold leading-tight mb-6">
                  Excelencia Académica a tu alcance.
                </h1>
                <p className="text-white/80 leading-relaxed max-w-sm">
                  Únete a nuestra comunidad de académicos y profesionales
                  comprometidos con el aprendizaje profundo y la redacción editorial
                  de alto nivel.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white">
                      school
                    </span>
                  </div>
                  <span className="text-sm font-medium">
                    Acceso a tutores certificados
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white">
                      library_books
                    </span>
                  </div>
                  <span className="text-sm font-medium">
                    Recursos editoriales exclusivos
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <img
              alt="Estudiantes en biblioteca"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
              src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1000"
            />
          </div>

          {/* Right Side: Forms */}
          <div className="p-8 md:p-12 bg-white">
            <div className="mb-8">
              <div className="flex gap-1 bg-[#f7f9fb] p-1 rounded-md mb-8">
                <button 
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 py-2 text-sm font-bold rounded transition-all ${
                    activeTab === 'login' 
                      ? 'bg-white text-[#002045] shadow-sm' 
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  Iniciar Sesión
                </button>
                <button 
                  onClick={() => setActiveTab('register')}
                  className={`flex-1 py-2 text-sm font-bold rounded transition-all ${
                    activeTab === 'register' 
                      ? 'bg-white text-[#002045] shadow-sm' 
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  Registrarse
                </button>
              </div>
            </div>

            {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
