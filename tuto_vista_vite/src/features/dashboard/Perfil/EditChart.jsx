import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { api } from '../../../services/api';

const EditChart = () => {
    const { user, updateUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    
    // Estado para controlar los campos del formulario
    const [profile, setProfile] = useState({
        nombre: user?.name || '',
        email: user?.email || '',
        avatar: user?.avatar || '',
        biografia: '',
        frase_personal: '',
        anios_experiencia: 0,
        precio_por_hora: 0,
        duracion_sesion_min: 90,
        titulos: '',
        logros: ''
    });

    useEffect(() => {
        const fetchDetailedData = async () => {
            if (!user) return;
            setLoading(true);
            try {
                if (user.role === 'tutor') {
                    const tutorData = await api.get(`/tutores/${user.id}`);
                    setProfile(prev => ({
                        ...prev,
                        biografia: tutorData.biografia || '',
                        frase_personal: tutorData.frasePersonal || '',
                        anios_experiencia: tutorData.aniosExperiencia || 0,
                        precio_por_hora: tutorData.precioPorHora || 0,
                        duracion_sesion_min: tutorData.duracionSesionMin || 90,
                        titulos: tutorData.titulos ? tutorData.titulos.join(', ') : '',
                        logros: tutorData.logros ? tutorData.logros.join(', ') : ''
                    }));
                }
            } catch (error) {
                console.error("Error fetching detailed profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetailedData();
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({
            ...prev,
            [name]: name.includes('anios') || name.includes('precio') || name.includes('duracion') 
                ? Number(value) 
                : value
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            // 1. Actualizar datos básicos del perfil
            await api.patch(`/perfiles/${user.id}?nombre=${encodeURIComponent(profile.nombre)}&avatar=${encodeURIComponent(profile.avatar)}`);
            
            // 2. Actualizar datos específicos si es tutor
            if (user.role === 'tutor') {
                const tutorPayload = {
                    biografia: profile.biografia,
                    frase_personal: profile.frase_personal,
                    precio_por_hora: profile.precio_por_hora,
                    anios_experiencia: profile.anios_experiencia,
                    duracion_sesion_min: profile.duracion_sesion_min,
                    titulos: profile.titulos.split(',').map(s => s.trim()).filter(s => s !== ''),
                    logros: profile.logros.split(',').map(s => s.trim()).filter(s => s !== '')
                };
                await api.patch(`/perfiles/tutor/${user.id}`, tutorPayload);
            }

            // 3. Actualizar contexto global
            updateUser({
                name: profile.nombre,
                avatar: profile.avatar
            });

            alert('¡Perfil actualizado con éxito!');
        } catch (error) {
            console.error("Error updating profile:", error);
            alert('Hubo un error al guardar los cambios.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="w-full max-w-7xl mx-auto p-6 animate-in fade-in duration-700">
            {/* Header */}
            <header className="mb-12">
                <h1 className="font-display text-5xl font-extrabold text-primary leading-tight tracking-tighter max-w-xl">
                    Edición de Perfil
                </h1>
                <p className="text-on-surface-variant font-body mt-2 opacity-70">
                    Gestiona tu identidad y credenciales académicas dentro de la plataforma.
                </p>
                <div className="w-16 h-1 bg-tertiary-container mt-6"></div>
            </header>

            {/* Asymmetric Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Main Form Column */}
                <div className="lg:col-span-8 space-y-12">
                    <section className="bg-surface-container-lowest rounded-xl p-10 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.04)]">
                        <div className="flex flex-col md:flex-row gap-10 items-start mb-12">
                            {/* Avatar Section */}
                            <div className="relative flex-shrink-0 group">
                                <div className="w-32 h-32 rounded-2xl overflow-hidden bg-surface-container-high border-4 border-white shadow-xl transition-transform duration-500 group-hover:scale-[1.02]">
                                    {profile.avatar ? (
                                        <img alt={profile.nombre} src={profile.avatar} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-primary/20">
                                            <span className="material-symbols-outlined !text-[64px]">person</span>
                                        </div>
                                    )}
                                </div>
                                <div className="absolute -bottom-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="bg-primary text-white text-[10px] px-3 py-1.5 rounded-full font-bold shadow-lg uppercase tracking-widest">Avatar</span>
                                </div>
                            </div>

                            <div className="flex-1">
                                <h2 className="font-headline text-3xl font-bold text-primary mb-2">
                                    {profile.nombre || "Tu Nombre"}
                                </h2>
                                <p className="font-label text-xs text-tertiary font-black tracking-[0.1em] uppercase mb-4 py-1 px-3 bg-tertiary/10 inline-block rounded">
                                    {user?.role === 'tutor' ? 'Tutor Académico' : 'Estudiante'}
                                </p>
                                <p className="text-on-surface-variant font-body text-md leading-relaxed opacity-80 italic">
                                    "{profile.frase_personal || "Actualiza tu frase personal para inspirar a otros."}"
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSave} className="space-y-10">
                            {/* Informacion Básica */}
                            <div className="space-y-6">
                                <h3 className="font-display text-lg font-bold text-primary flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">badge</span>
                                    Información de Identidad
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="font-label text-[10px] uppercase font-black tracking-widest text-on-surface-variant/60 block">Nombre Completo</label>
                                        <input className="input-editorial w-full" type="text" name="nombre" value={profile.nombre} onChange={handleChange} required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="font-label text-[10px] uppercase font-black tracking-widest text-on-surface-variant/60 block">URL del Avatar</label>
                                        <input className="input-editorial w-full" type="text" name="avatar" value={profile.avatar} onChange={handleChange} placeholder="https://ejemplo.com/foto.jpg" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="font-label text-[10px] uppercase font-black tracking-widest text-on-surface-variant/60 block">Correo (Solo lectura)</label>
                                        <input className="input-editorial w-full opacity-50 cursor-not-allowed" type="email" value={profile.email} disabled />
                                    </div>
                                </div>
                            </div>

                            {/* Campos del Tutor */}
                            {user?.role === 'tutor' && (
                                <div className="space-y-6 pt-6 border-t border-black/5 animate-in slide-in-from-bottom-4 duration-500">
                                    <h3 className="font-display text-lg font-bold text-primary flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm">school</span>
                                        Credenciales y Perfil Académico
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                                        <div className="md:col-span-12 space-y-2">
                                            <label className="font-label text-[10px] uppercase font-black tracking-widest text-on-surface-variant/60 block">Frase Inspiracional</label>
                                            <input className="input-editorial w-full" type="text" name="frase_personal" value={profile.frase_personal} onChange={handleChange} />
                                        </div>
                                        <div className="md:col-span-12 space-y-2">
                                            <label className="font-label text-[10px] uppercase font-black tracking-widest text-on-surface-variant/60 block">Biografía Extendida</label>
                                            <textarea className="input-editorial w-full min-h-[120px] resize-none py-4" name="biografia" value={profile.biografia} onChange={handleChange} />
                                        </div>
                                        <div className="md:col-span-4 space-y-2">
                                            <label className="font-label text-[10px] uppercase font-black tracking-widest text-on-surface-variant/60 block">Años Experiencia</label>
                                            <input className="input-editorial w-full" type="number" name="anios_experiencia" value={profile.anios_experiencia} onChange={handleChange} min="0" />
                                        </div>
                                        <div className="md:col-span-4 space-y-2">
                                            <label className="font-label text-[10px] uppercase font-black tracking-widest text-on-surface-variant/60 block">Precio/Hora (COP)</label>
                                            <input className="input-editorial w-full" type="number" name="precio_por_hora" value={profile.precio_por_hora} onChange={handleChange} min="0" step="0.01" />
                                        </div>
                                        <div className="md:col-span-4 space-y-2">
                                            <label className="font-label text-[10px] uppercase font-black tracking-widest text-on-surface-variant/60 block">Duración Clase (min)</label>
                                            <input className="input-editorial w-full" type="number" name="duracion_sesion_min" value={profile.duracion_sesion_min} onChange={handleChange} min="15" />
                                        </div>
                                        <div className="md:col-span-12 space-y-2">
                                            <label className="font-label text-[10px] uppercase font-black tracking-widest text-on-surface-variant/60 block">Títulos (Separados por coma)</label>
                                            <input className="input-editorial w-full" type="text" name="titulos" value={profile.titulos} onChange={handleChange} placeholder="Ingeniero Civil, Magister en IA..." />
                                        </div>
                                        <div className="md:col-span-12 space-y-2">
                                            <label className="font-label text-[10px] uppercase font-black tracking-widest text-on-surface-variant/60 block">Logros y Reconocimientos (Separados por coma)</label>
                                            <input className="input-editorial w-full" type="text" name="logros" value={profile.logros} onChange={handleChange} placeholder="Premio Excelencia 2023, Beca Fullbright..." />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end pt-8">
                                <button 
                                    type="submit" 
                                    disabled={saving}
                                    className="signature-gradient text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-3 disabled:opacity-50"
                                >
                                    {saving ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <span className="material-symbols-outlined !text-[20px]">save_as</span>
                                    )}
                                    {saving ? 'Guardando...' : 'Confirmar Cambios'}
                                </button>
                            </div>
                        </form>
                    </section>
                </div>

                {/* Sidebar Info - Editorial Style */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-surface-container-low rounded-xl p-8 border-l-4 border-tertiary">
                        <h4 className="font-display font-black text-xs uppercase tracking-widest text-primary mb-4">Nota Editorial</h4>
                        <p className="font-body text-sm leading-relaxed text-on-surface-variant opacity-80">
                            La integridad de los datos en **The Academic** es nuestra prioridad. Asegúrate de que tus títulos y logros sean verídicos, ya que esto impacta directamente en tu tasa de aceptación y confiabilidad.
                        </p>
                    </div>

                    <div className="bg-primary rounded-xl p-8 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h4 className="font-display font-black text-xs uppercase tracking-widest mb-4 opacity-60">Seguridad</h4>
                            <p className="font-body text-sm leading-relaxed mb-6">
                                Tu contraseña se mantiene cifrada bajo estándares industriales. Para cambios críticos de seguridad, por favor contacta a soporte.
                            </p>
                            <button className="text-[10px] font-black uppercase tracking-widest border-b border-white/30 pb-1 hover:border-white transition-colors">
                                Cambiar Contraseña
                            </button>
                        </div>
                        <span className="material-symbols-outlined absolute -bottom-10 -right-10 !text-[120px] opacity-10 rotate-12">shield_lock</span>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .input-editorial {
                    background-color: #f7f9fb;
                    border: none;
                    border-radius: 0.75rem;
                    padding: 0.875rem 1.25rem;
                    color: #191c1e;
                    font-family: 'Inter', sans-serif;
                    font-weight: 500;
                    font-size: 0.9375rem;
                    transition: all 0.3s ease;
                }
                .input-editorial:focus {
                    outline: none;
                    background-color: #ffffff;
                    box-shadow: 0 0 0 2px rgba(0, 32, 69, 0.05), 0 8px 16px -4px rgba(0, 32, 69, 0.08);
                }
            `}} />
        </div>
    );
};

export default EditChart;