import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <MainLayout>
          <div className="flex-1 flex flex-col lg:flex-row min-h-screen">
            {/* Form Section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-12 bg-white">
                <div className="w-full max-w-md space-y-10">
                    <header className="space-y-4 text-center lg:text-left">
                        <span className="text-xs font-bold text-academic-gold uppercase tracking-widest">Bienvenido de nuevo</span>
                        <h1 className="text-5xl font-extrabold text-[#002045] tracking-tight font-display">Acceso Académico</h1>
                        <p className="text-gray-500 text-lg leading-relaxed">Continúa tu viaje intelectual con The Academic Editorial.</p>
                    </header>

                    <form className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-[#696C6E]" htmlFor="email">Correo Institucional</label>
                            <input
                                className="w-full px-6 py-4 bg-[#F2F4F6] border-none rounded-xl focus:ring-2 focus:ring-[#002045]/10 outline-none transition-all"
                                id="email"
                                placeholder="usuario@editorial.edu"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-[#696C6E]" htmlFor="password">Contraseña</label>
                            <input
                                className="w-full px-6 py-4 bg-[#F2F4F6] border-none rounded-xl focus:ring-2 focus:ring-[#002045]/10 outline-none transition-all"
                                id="password"
                                placeholder="••••••••"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button className="w-full signature-gradient text-white py-5 rounded-xl font-bold text-lg shadow-xl shadow-[#002045]/20 hover:-translate-y-1 transition-all" type="submit">
                            Iniciar Sesión
                        </button>
                    </form>

                    <footer className="text-center lg:text-left pt-6 border-t border-gray-100">
                        <p className="text-gray-500">¿No tienes una cuenta? <a className="text-[#002045] font-bold hover:underline" href="#">Regístrate aquí</a></p>
                    </footer>
                </div>
            </div>

            {/* Visual Section */}
            <div className="hidden lg:flex lg:w-1/2 bg-[#002045] relative overflow-hidden items-center justify-center p-20">
                <div className="absolute inset-0 opacity-20">
                    {/* Grid Pattern Pattern */}
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                </div>
                <div className="relative z-10 text-center space-y-8 max-w-lg">
                    <div className="w-24 h-24 bg-academic-gold rounded-full mx-auto flex items-center justify-center shadow-2xl">
                         <span className="material-symbols-outlined text-4xl text-[#002045]">auto_stories</span>
                    </div>
                    <blockquote className="text-3xl font-light italic text-white/90 leading-snug font-display">
                        "La educación no es la preparación para la vida; la educación es la vida misma."
                    </blockquote>
                    <p className="text-academic-gold font-bold uppercase tracking-widest text-sm">— John Dewey</p>
                </div>
            </div>
          </div>
        </MainLayout>
    );
};

export default Login;
