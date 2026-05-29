import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';

const Verified = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [status, setStatus] = useState('verificando'); // 'verificando', 'exito', 'error'
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const verifyAccount = async () => {
            if (!token) {
                setStatus('error');
                setMessage('No se proporcionó un token de verificación.');
                return;
            }

            try {
                const response = await api.get(`/auth/verify?token=${token}`);
                setStatus('exito');
                setMessage(response.message || '¡Cuenta activada con éxito!');
                
                // Auto-redirigir al login después de 5 segundos
                setTimeout(() => {
                    navigate('/loginform');
                }, 5000);

            } catch (err) {
                setStatus('error');
                setMessage(err.message || 'El enlace de verificación no es válido o ha expirado.');
            }
        };

        verifyAccount();
    }, [token, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f7f9fb] p-4 font-body">
            <div className="w-full max-w-lg bg-white p-10 rounded-2xl shadow-xl text-center space-y-6 border border-gray-100">
                
                {/* Icono dinámico según estado */}
                <div className="flex justify-center">
                    {status === 'verificando' && (
                        <div className="w-20 h-20 border-4 border-[#002045]/10 border-t-[#002045] rounded-full animate-spin"></div>
                    )}
                    {status === 'exito' && (
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-display font-bold text-[#002045]">
                        {status === 'verificando' ? 'Verificando Cuenta...' : 
                         status === 'exito' ? '¡Verificación Exitosa!' : 'Fallo en Verificación'}
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        {message}
                    </p>
                </div>

                {status !== 'verificando' && (
                    <div className="pt-6">
                        <Link 
                            to="/loginform" 
                            className="inline-block signature-gradient text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:scale-105 transition-transform"
                        >
                            Ir al Inicio de Sesión
                        </Link>
                        {status === 'exito' && (
                            <p className="text-xs text-gray-400 mt-4">Serás redirigido automáticamente en unos segundos...</p>
                        )}
                    </div>
                )}

                <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                        ¿Tienes problemas? <Link to="/support" className="text-[#002045] font-semibold hover:underline">Contacta a soporte</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Verified;
