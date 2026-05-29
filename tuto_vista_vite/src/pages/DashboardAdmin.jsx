import React, { useState, useEffect, useCallback } from 'react';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import { api } from '../services/api';
import BadgeIcon from '../components/common/BadgeIcon';

const DashboardAdmin = () => {
  const [activeTab, setActiveTab] = useState('usuarios'); // 'usuarios' | 'reportes' | 'insignias' | 'comision' | 'academic'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Data states
  const [usuarios, setUsuarios] = useState([]);
  const [reportes, setReportes] = useState([]);
  const [insignias, setInsignias] = useState([]);
  const [comision, setComision] = useState(10); // percentage representation (e.g., 10%)
  const [departamentos, setDepartamentos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [faqCategorias, setFaqCategorias] = useState([]);

  // Form states
  const [nuevaInsignia, setNuevaInsignia] = useState({
    nombre: '',
    descripcion: '',
    urlIcono: 'emoji_events', // default icon identifier
    condicionTipo: 'TOTAL_SESIONES',
    condicionValor: 5
  });
  const [editingBadge, setEditingBadge] = useState(null); // id of the badge being edited

  const [nuevoDept, setNuevoDept] = useState('');
  const [nuevaMateria, setNuevaMateria] = useState({
    nombre: '',
    departamentoId: ''
  });

  const [nuevaFaqCat, setNuevaFaqCat] = useState({ nombre: '', icono: 'help' });
  const [nuevaPregunta, setNuevaPregunta] = useState({ tipoId: '', pregunta: '', respuesta: '' });

  // Fetch initial data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Load data in parallel depending on activeTab or load all
      const [usersData, reportsData, badgesData, commissionData, deptsData, subjectsData] = await Promise.all([
        api.get('/admin/usuarios').catch(() => []),
        api.get('/reportes').catch(() => []),
        api.get('/insignias').catch(() => []),
        api.get('/configuracion/comision').catch(() => ({ comision: 0.10 })),
        api.get('/departamentos').catch(() => []),
        api.get('/materias').catch(() => []),
        api.get('/faq').catch(() => [])
      ]);

      setUsuarios(usersData || []);
      setReportes(reportsData || []);
      setInsignias(badgesData || []);
      setComision(Math.round((commissionData?.comision || 0.10) * 100));
      setDepartamentos(deptsData || []);
      setMaterias(subjectsData || []);
      setFaqCategorias(faqData || []);

      if (faqData && faqData.length > 0 && !nuevaPregunta.tipoId) {
        setNuevaPregunta(prev => ({ ...prev, tipoId: faqData[0].id }));
      }

      if (deptsData && deptsData.length > 0 && !nuevaMateria.departamentoId) {
        setNuevaMateria(prev => ({ ...prev, departamentoId: deptsData[0].id }));
      }
    } catch (err) {
      console.error('Error fetching admin dashboard data:', err);
      setError('Error al cargar datos del panel de administración.');
    } finally {
      setLoading(false);
    }
  }, [nuevaMateria.departamentoId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Action: Toggle user status
  const handleToggleUsuario = async (userId, currentStatus) => {
    try {
      const nextStatus = !currentStatus;
      await api.patch(`/admin/usuarios/${userId}/estado?activo=${nextStatus}`);
      alert(`Usuario ${nextStatus ? 'activado' : 'desactivado'} con éxito.`);
      fetchData();
    } catch (err) {
      alert(err.message || 'Error al cambiar el estado del usuario.');
    }
  };

  // Action: Resolve report
  const handleResolverReporte = async (reportId) => {
    try {
      await api.patch(`/reportes/${reportId}/estado?estado=RESUELTO`);
      alert('Reporte marcado como RESUELTO.');
      fetchData();
    } catch (err) {
      alert(err.message || 'Error al actualizar el estado del reporte.');
    }
  };

  // Action: Update commission
  const handleGuardarComision = async (e) => {
    e.preventDefault();
    try {
      // Forzamos a que sea un número flotante válido para el backend (ej: 0.15)
      const porcentajeNumerico = parseInt(comision) || 0;
      const decValue = porcentajeNumerico / 100;

      await api.put('/configuracion/comision', { comision: decValue });
      alert('Comisión de la plataforma actualizada correctamente.');
      fetchData();
    } catch (err) {
      alert(err.message || 'Error al guardar la comisión.');
    }
  };

  // Action: Create or Update badge
  const handleGuardarInsignia = async (e) => {
    e.preventDefault();
    if (!nuevaInsignia.nombre || !nuevaInsignia.descripcion) {
      alert('Por favor completa todos los campos de la insignia.');
      return;
    }
    try {
      if (editingBadge) {
        await api.put(`/insignias/${editingBadge}`, {
          nombre: nuevaInsignia.nombre,
          descripcion: nuevaInsignia.descripcion,
          urlIcono: nuevaInsignia.urlIcono,
          condicionTipo: nuevaInsignia.condicionTipo,
          condicionValor: parseInt(nuevaInsignia.condicionValor)
        });
        alert('Insignia actualizada exitosamente.');
      } else {
        await api.post('/insignias', {
          nombre: nuevaInsignia.nombre,
          descripcion: nuevaInsignia.descripcion,
          urlIcono: nuevaInsignia.urlIcono,
          condicionTipo: nuevaInsignia.condicionTipo,
          condicionValor: parseInt(nuevaInsignia.condicionValor)
        });
        alert('Insignia creada exitosamente.');
      }
      
      setNuevaInsignia({
        nombre: '',
        descripcion: '',
        urlIcono: 'emoji_events',
        condicionTipo: 'TOTAL_SESIONES',
        condicionValor: 5
      });
      setEditingBadge(null);
      fetchData();
    } catch (err) {
      alert(err.message || 'Error al procesar la insignia.');
    }
  };

  const handleEditarInsignia = (badge) => {
    setEditingBadge(badge.id);
    setNuevaInsignia({
      nombre: badge.nombre,
      descripcion: badge.descripcion,
      urlIcono: badge.urlIcono,
      condicionTipo: badge.condicionTipo,
      condicionValor: badge.condicionValor
    });
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelarEdicion = () => {
    setEditingBadge(null);
    setNuevaInsignia({
      nombre: '',
      descripcion: '',
      urlIcono: 'emoji_events',
      condicionTipo: 'TOTAL_SESIONES',
      condicionValor: 5
    });
  };

  // Action: Create FAQ Category
  const handleCrearFaqCat = async (e) => {
    e.preventDefault();
    if (!nuevaFaqCat.nombre.trim()) return;
    try {
      await api.post('/faq/tipos', nuevaFaqCat);
      alert('Categoría de FAQ creada.');
      setNuevaFaqCat({ nombre: '', icono: 'help' });
      fetchData();
    } catch (err) {
      alert('Error al crear categoría.');
    }
  };

  const handleEliminarFaqCat = async (id) => {
    if (!window.confirm('¿Eliminar esta categoría y todas sus preguntas?')) return;
    try {
      await api.delete(`/faq/tipos/${id}`);
      fetchData();
    } catch (err) {
      alert('Error al eliminar categoría.');
    }
  };

  // Action: Create FAQ Question
  const handleCrearPregunta = async (e) => {
    e.preventDefault();
    if (!nuevaPregunta.pregunta.trim() || !nuevaPregunta.respuesta.trim() || !nuevaPregunta.tipoId) return;
    try {
      await api.post('/faq/preguntas', {
        ...nuevaPregunta,
        tipoId: parseInt(nuevaPregunta.tipoId)
      });
      alert('Pregunta agregada.');
      setNuevaPregunta(prev => ({ ...prev, pregunta: '', respuesta: '' }));
      fetchData();
    } catch (err) {
      alert('Error al crear pregunta.');
    }
  };

  const handleEliminarPregunta = async (id) => {
    if (!window.confirm('¿Eliminar esta pregunta?')) return;
    try {
      await api.delete(`/faq/preguntas/${id}`);
      fetchData();
    } catch (err) {
      alert('Error al eliminar pregunta.');
    }
  };

  return (
    <MainLayout>
      <main className="p-4 md:p-10 max-w-7xl mx-auto min-h-screen">
        <header className="mb-8">
          <span className="text-xs font-bold text-academic-gold uppercase tracking-widest mb-2 block">Administración</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary tracking-tight font-display my-2">Panel de Control</h1>
          <p className="text-gray-500 text-sm">Gestiona insignias, reportes, usuarios, comisiones y la oferta académica.</p>
        </header>

        {/* Tab Navigation */}
        <div className="flex border-b border-outline-variant/10 mb-8 overflow-x-auto whitespace-nowrap">
          {[
            { id: 'usuarios', label: 'Usuarios', icon: 'group' },
            { id: 'reportes', label: 'Reportes', icon: 'gavel' },
            { id: 'insignias', label: 'Insignias', icon: 'verified' },
            { id: 'comision', label: 'Comisión Plataforma', icon: 'percent' },
            { id: 'academic', label: 'Departamentos y Materias', icon: 'auto_stories' },
            { id: 'faq', label: 'Preguntas Frecuentes', icon: 'quiz' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-6 font-bold text-sm border-b-2 flex items-center gap-2 transition-all ${activeTab === tab.id
                  ? 'border-academic-gold text-academic-gold font-extrabold'
                  : 'border-transparent text-elegant-gray hover:text-primary'
                }`}
            >
              <span className="material-symbols-outlined text-base">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-700 border border-red-200 p-4 rounded-xl mb-8 flex items-center gap-3">
            <span className="material-symbols-outlined">error</span>
            <p className="text-sm font-semibold">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <section className="mt-4">

            {/* TABS 1: USUARIOS */}
            {activeTab === 'usuarios' && (
              <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center bg-mini-gray">
                  <h3 className="text-lg font-bold text-primary font-display flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">group</span>
                    Listado de Usuarios Registrados
                  </h3>
                  <span className="text-xs text-gray-500 font-semibold bg-surface-container-low px-3 py-1 rounded">Total: {usuarios.length}</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-container-low text-xs font-bold uppercase text-primary border-b border-outline-variant/10">
                        <th className="p-4">ID</th>
                        <th className="p-4">Nombre Completo</th>
                        <th className="p-4">Correo</th>
                        <th className="p-4">Rol</th>
                        <th className="p-4">Estado</th>
                        <th className="p-4 text-right">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/10 text-sm text-primary">
                      {usuarios.map(u => (
                        <tr key={u.id} className="hover:bg-mini-gray transition-colors">
                          <td className="p-4 font-bold">{u.id}</td>
                          <td className="p-4">{u.nombreCompleto}</td>
                          <td className="p-4 text-gray-600">{u.correo}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-0.5 rounded text-[10px] uppercase font-bold ${u.rol === 'administrador' ? 'bg-red-50 text-red-600 border border-red-200' :
                                u.rol === 'tutor' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                  'bg-blue-50 text-blue-700 border border-blue-200'
                              }`}>
                              {u.rol}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${u.estaActivo ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                              }`}>
                              {u.estaActivo ? 'Activo' : 'Desactivado'}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleToggleUsuario(u.id, u.estaActivo)}
                              className={`px-4 py-1.5 rounded text-xs font-bold transition-all border ${u.estaActivo
                                  ? 'bg-red-50 text-red-600 hover:bg-red-100 border-red-100'
                                  : 'bg-green-50 text-green-600 hover:bg-green-100 border-green-100'
                                }`}
                            >
                              {u.estaActivo ? 'Desactivar' : 'Activar'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TABS 2: REPORTES */}
            {activeTab === 'reportes' && (
              <div className="space-y-6">
                <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-primary font-display mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">gavel</span>
                    Reportes Pendientes de Revisión
                  </h3>
                  {reportes.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <span className="material-symbols-outlined text-gray-300 text-5xl mb-2">assignment_turned_in</span>
                      <p className="text-sm">No hay reportes registrados en la plataforma.</p>
                    </div>
                  ) : (
                    <div className="grid gap-6">
                      {reportes.map(r => (
                        <div key={r.id} className="p-5 border border-outline-variant/10 rounded-xl bg-surface-container-low/50 hover:border-outline-variant/30 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-bold text-primary">Reporte #{r.id}</span>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded uppercase border border-red-100">
                                {r.motivo}
                              </span>
                              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${r.estado === 'PENDIENTE' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-green-50 text-green-700 border border-green-200'
                                }`}>
                                {r.estado}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500">
                              Reportado por ID: <strong>{r.reportadoPorId}</strong> a ID: <strong>{r.reportadoAId}</strong>
                              {r.sesionId && <> en sesión: <strong>#{r.sesionId}</strong></>}
                            </p>
                            <p className="text-sm text-primary mt-2 italic bg-surface-container-lowest p-3 rounded border border-outline-variant/5">
                              "{r.descripcion}"
                            </p>
                          </div>
                          {r.estado === 'PENDIENTE' && (
                            <button
                              onClick={() => handleResolverReporte(r.id)}
                              className="px-5 py-2 bg-primary hover:bg-primary-hover text-white rounded-md text-xs font-bold shadow transition-all shrink-0 self-end md:self-center"
                            >
                              Marcar Resuelto
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TABS 3: INSIGNIAS */}
            {activeTab === 'insignias' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form to create / edit */}
                <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-6 shadow-sm h-fit">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-primary font-display">
                      {editingBadge ? 'Editar Insignia' : 'Nueva Insignia'}
                    </h3>
                    {editingBadge && (
                      <button 
                        onClick={handleCancelarEdicion}
                        className="text-[10px] font-bold text-red-500 uppercase hover:underline"
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                  <form onSubmit={handleGuardarInsignia} className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-elegant-gray uppercase block mb-1">Nombre</label>
                      <input
                        type="text"
                        value={nuevaInsignia.nombre}
                        onChange={e => setNuevaInsignia({ ...nuevaInsignia, nombre: e.target.value })}
                        className="w-full px-3 py-2 bg-surface-container-low rounded border border-outline-variant/30 text-sm text-primary"
                        placeholder="Ej. Súper Instructor"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-elegant-gray uppercase block mb-1">Descripción</label>
                      <textarea
                        value={nuevaInsignia.descripcion}
                        onChange={e => setNuevaInsignia({ ...nuevaInsignia, descripcion: e.target.value })}
                        className="w-full px-3 py-2 bg-surface-container-low rounded border border-outline-variant/30 text-sm text-primary h-20"
                        placeholder="Escribe de qué se trata la insignia..."
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="text-xs font-bold text-elegant-gray uppercase block mb-1 flex justify-between">
                          URL del Ícono / Identificador
                          <span className="text-[10px] lowercase font-normal opacity-60">Soporta URL o Material Icon name</span>
                        </label>
                        <input
                          type="text"
                          value={nuevaInsignia.urlIcono}
                          onChange={e => setNuevaInsignia({ ...nuevaInsignia, urlIcono: e.target.value })}
                          className="w-full px-3 py-2 bg-surface-container-low rounded border border-outline-variant/30 text-sm text-primary font-mono placeholder:italic"
                          placeholder="https://... o emoji_events"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-elegant-gray uppercase block mb-1">Tipo de Regla</label>
                        <select
                          value={nuevaInsignia.condicionTipo}
                          onChange={e => setNuevaInsignia({ ...nuevaInsignia, condicionTipo: e.target.value })}
                          className="w-full px-3 py-2 bg-surface-container-low rounded border border-outline-variant/30 text-sm text-primary animate-none"
                        >
                          <option value="TOTAL_SESIONES">Total Sesiones</option>
                          <option value="SESIONES_5_ESTRELLAS">Sesiones 5 Estrellas</option>
                          <option value="CALIFICACION_PROMEDIO">Calificación Promedio</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-elegant-gray uppercase block mb-1">Valor Requerido</label>
                      <input
                        type="number"
                        min="1"
                        value={nuevaInsignia.condicionValor}
                        onChange={e => setNuevaInsignia({ ...nuevaInsignia, condicionValor: e.target.value })}
                        className="w-full px-3 py-2 bg-surface-container-low rounded border border-outline-variant/30 text-sm text-primary"
                      />
                    </div>
                    <button
                      type="submit"
                      className={`w-full font-bold py-2.5 rounded-md text-xs shadow hover:shadow-lg transition-all ${editingBadge ? 'bg-primary text-white' : 'signature-gradient text-white'}`}
                    >
                      {editingBadge ? 'Actualizar Insignia' : 'Guardar Insignia'}
                    </button>
                  </form>
                </div>

                {/* List existing */}
                <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-primary font-display mb-4">Insignias Existentes</h3>
                  {insignias.length === 0 ? (
                    <p className="text-gray-500 text-sm">No hay insignias creadas todavía.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {insignias.map(badge => (
                        <div key={badge.id} className="p-4 border border-outline-variant/10 rounded-xl bg-surface-container-low flex justify-between items-center group/item hover:border-academic-gold/30 transition-all">
                          <div className="flex gap-3 items-center">
                            <BadgeIcon insignia={badge} size="md" />
                            <div>
                              <h4 className="font-bold text-primary text-sm flex items-center gap-1.5">{badge.nombre}</h4>
                              <p className="text-xs text-gray-500 line-clamp-1 mb-1">{badge.descripcion}</p>
                              <span className="text-[10px] font-extrabold uppercase bg-primary/10 text-primary px-2 py-0.5 rounded tracking-wide">
                                {badge.condicionTipo}: {badge.condicionValor}
                              </span>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleEditarInsignia(badge)}
                            className="p-2 text-academic-gold opacity-0 group-hover/item:opacity-100 transition-all hover:bg-academic-gold/5 rounded-full"
                          >
                            <span className="material-symbols-outlined text-base">edit</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TABS 4: COMISION */}
            {activeTab === 'comision' && (
              <div className="max-w-md bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-primary font-display mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">percent</span>
                  Comisión de la Plataforma
                </h3>
                <p className="text-gray-500 text-xs mb-6">
                  Modifica el porcentaje que la plataforma deduce a los tutores en cada transacción de tutoría cobrada.
                </p>
                <form onSubmit={handleGuardarComision} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-elegant-gray uppercase block mb-1">Porcentaje de Comisión (%)</label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={comision}
                        onChange={e => setComision(e.target.value === '' ? 0 : parseInt(e.target.value))}
                        className="w-full pl-4 pr-12 py-3 bg-surface-container-low rounded border border-outline-variant/30 text-sm text-primary font-bold"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-primary font-bold">%</span>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full signature-gradient text-white font-bold py-3 rounded-md text-xs shadow hover:shadow-lg transition-all"
                  >
                    Guardar Cambios
                  </button>
                </form>
              </div>
            )}

            {/* TABS 5: ACADEMIC */}
            {activeTab === 'academic' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Departamentos */}
                <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-primary font-display mb-4">Departamentos</h3>

                    <form onSubmit={handleCrearDepartamento} className="flex gap-2 mb-6 items-end">
                      <div className="flex-1">
                        <label className="text-xs font-bold text-elegant-gray uppercase block mb-1">Nuevo Departamento</label>
                        <input
                          type="text"
                          value={nuevoDept}
                          onChange={e => setNuevoDept(e.target.value)}
                          className="w-full px-3 py-2 bg-surface-container-low rounded border border-outline-variant/30 text-sm text-primary"
                          placeholder="Ej. Ingeniería de Sistemas"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-5 py-2.5 signature-gradient text-white rounded text-xs font-bold shadow hover:shadow-lg transition-all"
                      >
                        Añadir
                      </button>
                    </form>

                    <h4 className="text-xs font-bold text-elegant-gray uppercase tracking-widest mb-3">Departamentos Creados ({departamentos.length})</h4>
                  </div>

                  <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/10 max-h-60 overflow-y-auto space-y-2 no-scrollbar">
                    {departamentos.map(d => (
                      <div key={d.id} className="px-3 py-2 bg-surface-container-lowest border border-outline-variant/5 rounded text-sm text-primary font-medium flex justify-between items-center">
                        <span>{d.nombre}</span>
                        <span className="text-[10px] text-elegant-gray">ID: {d.id}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Materias */}
                <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-primary font-display mb-4">Materias</h3>

                    <form onSubmit={handleCrearMateria} className="space-y-4 mb-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-elegant-gray uppercase block mb-1">Nombre Materia</label>
                          <input
                            type="text"
                            value={nuevaMateria.nombre}
                            onChange={e => setNuevaMateria({ ...nuevaMateria, nombre: e.target.value })}
                            className="w-full px-3 py-2 bg-surface-container-low rounded border border-outline-variant/30 text-sm text-primary"
                            placeholder="Ej. Estructuras de Datos"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-elegant-gray uppercase block mb-1">Departamento Asociado</label>
                          <select
                            value={nuevaMateria.departamentoId}
                            onChange={e => setNuevaMateria({ ...nuevaMateria, departamentoId: e.target.value })}
                            className="w-full px-3 py-2 bg-surface-container-low rounded border border-outline-variant/30 text-sm text-primary"
                          >
                            {departamentos.map(d => (
                              <option key={d.id} value={d.id}>{d.nombre}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2.5 signature-gradient text-white rounded text-xs font-bold shadow hover:shadow-lg transition-all"
                      >
                        Crear Materia
                      </button>
                    </form>

                    <h4 className="text-xs font-bold text-elegant-gray uppercase tracking-widest mb-3">Materias Creadas ({materias.length})</h4>
                  </div>

                  <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/10 max-h-60 overflow-y-auto space-y-2 no-scrollbar">
                    {materias.map(m => (
                      <div key={m.id} className="px-3 py-2 bg-surface-container-lowest border border-outline-variant/5 rounded text-sm text-primary font-medium flex justify-between items-center">
                        <div>
                          <span className="font-bold">{m.nombre}</span>
                          <span className="text-[10px] text-elegant-gray block">Depto: {m.departamento_nombre}</span>
                        </div>
                        <span className="text-[10px] text-elegant-gray">ID: {m.id}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TABS 6: FAQ */}
            {activeTab === 'faq' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Categorías FAQ */}
                <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-6 shadow-sm flex flex-col">
                  <h3 className="text-lg font-bold text-primary font-display mb-4">Categorías de FAQ</h3>
                  
                  <form onSubmit={handleCrearFaqCat} className="space-y-4 mb-8">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-elegant-gray uppercase block mb-1">Nombre</label>
                        <input
                          type="text"
                          value={nuevaFaqCat.nombre}
                          onChange={e => setNuevaFaqCat({ ...nuevaFaqCat, nombre: e.target.value })}
                          className="w-full px-3 py-2 bg-surface-container-low rounded border border-outline-variant/30 text-sm text-primary"
                          placeholder="Ej. Pagos y seguridad"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-elegant-gray uppercase block mb-1">Icono (Material)</label>
                        <input
                          type="text"
                          value={nuevaFaqCat.icono}
                          onChange={e => setNuevaFaqCat({ ...nuevaFaqCat, icono: e.target.value })}
                          className="w-full px-3 py-2 bg-surface-container-low rounded border border-outline-variant/30 text-sm text-primary"
                          placeholder="Ej. shield_lock"
                        />
                      </div>
                    </div>
                    <button type="submit" className="w-full py-2.5 signature-gradient text-white rounded text-xs font-bold shadow transition-all">
                      Crear Categoría
                    </button>
                  </form>

                  <div className="space-y-3 max-h-96 overflow-y-auto no-scrollbar">
                    {faqCategorias.map(cat => (
                      <div key={cat.id} className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant/5 transition-all hover:border-academic-gold/20">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-academic-gold">{cat.icono || 'help'}</span>
                          <span className="font-bold text-sm text-primary">{cat.nombre}</span>
                        </div>
                        <button onClick={() => handleEliminarFaqCat(cat.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-all">
                          <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preguntas */}
                <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-6 shadow-sm flex flex-col">
                  <h3 className="text-lg font-bold text-primary font-display mb-4">Preguntas y Respuestas</h3>

                  <form onSubmit={handleCrearPregunta} className="space-y-4 mb-8">
                    <div>
                      <label className="text-xs font-bold text-elegant-gray uppercase block mb-1">Categoría</label>
                      <select
                        value={nuevaPregunta.tipoId}
                        onChange={e => setNuevaPregunta({ ...nuevaPregunta, tipoId: e.target.value })}
                        className="w-full px-3 py-2 bg-surface-container-low rounded border border-outline-variant/30 text-sm text-primary"
                      >
                        <option value="">Selecciona una categoría</option>
                        {faqCategorias.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-elegant-gray uppercase block mb-1">Pregunta</label>
                      <input
                        type="text"
                        value={nuevaPregunta.pregunta}
                        onChange={e => setNuevaPregunta({ ...nuevaPregunta, pregunta: e.target.value })}
                        className="w-full px-3 py-2 bg-surface-container-low rounded border border-outline-variant/30 text-sm text-primary"
                        placeholder="Ej. ¿Cómo cambio mi contraseña?"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-elegant-gray uppercase block mb-1">Respuesta</label>
                      <textarea
                        value={nuevaPregunta.respuesta}
                        onChange={e => setNuevaPregunta({ ...nuevaPregunta, respuesta: e.target.value })}
                        className="w-full px-3 py-2 bg-surface-container-low rounded border border-outline-variant/30 text-sm text-primary h-24"
                        placeholder="Escribe la respuesta detallada..."
                      />
                    </div>
                    <button type="submit" className="w-full py-2.5 signature-gradient text-white rounded text-xs font-bold shadow transition-all">
                      Añadir Pregunta
                    </button>
                  </form>

                  <div className="space-y-4 max-h-96 overflow-y-auto no-scrollbar">
                    {faqCategorias.flatMap(cat => (cat.preguntas || []).map(p => (
                      <div key={p.id} className="p-4 border border-outline-variant/10 rounded-xl bg-surface-container-low/50 group hover:border-primary/20 transition-all">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] font-bold text-academic-gold uppercase border border-academic-gold/20 px-2 py-0.5 rounded">
                            {cat.nombre}
                          </span>
                          <button onClick={() => handleEliminarPregunta(p.id)} className="opacity-0 group-hover:opacity-100 text-red-500 transition-all p-1 hover:bg-red-50 rounded">
                            <span className="material-symbols-outlined text-base">delete</span>
                          </button>
                        </div>
                        <h4 className="font-bold text-sm text-primary mb-1">{p.pregunta}</h4>
                        <p className="text-xs text-on-surface-variant opacity-70 line-clamp-2">{p.respuesta}</p>
                      </div>
                    )))}
                  </div>
                </div>
              </div>
            )}

          </section>
        )}
      </main>
    </MainLayout>
  );
};

export default DashboardAdmin;
