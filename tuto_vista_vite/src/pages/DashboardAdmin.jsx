import React, { useState, useEffect, useCallback } from 'react';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import { api } from '../services/api';

// Modular Components
import UserTableComponent from '../components/admin/UserTableComponent';
import ReportsComponent from '../components/admin/ReportsComponent';
import InsigniaFormComponent from '../components/admin/InsigniaFormComponent';
import InsigniasComponent from '../components/admin/InsigniasComponent';
import CommissionFormComponent from '../components/admin/CommissionFormComponent';
import DepartmentFormComponent from '../components/admin/DepartmentFormComponent';
import SubjectFormComponent from '../components/admin/SubjectFormComponent';
import FAQCategoryFormComponent from '../components/admin/FAQCategoryFormComponent';
import FAQQuestionFormComponent from '../components/admin/FAQQuestionFormComponent';
import FAQCategoryItemComponent from '../components/admin/FAQCategoryItemComponent';
import FAQQuestionItemComponent from '../components/admin/FAQQuestionItemComponent';

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
      const [usersData, reportsData, badgesData, commissionData, deptsData, subjectsData, faqData] = await Promise.all([
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

  // Action: Create department
  const handleCrearDepartamento = async (e) => {
    e.preventDefault();
    if (!nuevoDept.trim()) return;
    try {
      await api.post('/departamentos', { nombre: nuevoDept });
      alert('Departamento agregado correctamente.');
      setNuevoDept('');
      fetchData();
    } catch (err) {
      alert(err.message || 'Error al crear el departamento.');
    }
  };

  // Action: Create subject
  const handleCrearMateria = async (e) => {
    e.preventDefault();
    if (!nuevaMateria.nombre.trim() || !nuevaMateria.departamentoId) return;
    try {
      await api.post('/materias', {
        nombre: nuevaMateria.nombre,
        departamento_id: parseInt(nuevaMateria.departamentoId)
      });
      alert('Materia agregada correctamente.');
      setNuevaMateria(prev => ({ ...prev, nombre: '' }));
      fetchData();
    } catch (err) {
      alert(err.message || 'Error al crear la materia.');
    }
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
              <UserTableComponent usuarios={usuarios} handleToggleUsuario={handleToggleUsuario} />
            )}

            {/* TABS 2: REPORTES */}
            {activeTab === 'reportes' && (
              <ReportsComponent reportes={reportes} handleResolverReporte={handleResolverReporte} />
            )}

            {/* TABS 3: INSIGNIAS */}
            {activeTab === 'insignias' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <InsigniaFormComponent
                  nuevaInsignia={nuevaInsignia}
                  setNuevaInsignia={setNuevaInsignia}
                  handleGuardarInsignia={handleGuardarInsignia}
                  editingBadge={editingBadge}
                  handleCancelarEdicion={handleCancelarEdicion}
                />
                <InsigniasComponent
                  insignias={insignias}
                  handleEditarInsignia={handleEditarInsignia}
                />
              </div>
            )}

            {/* TABS 4: COMISION */}
            {activeTab === 'comision' && (
              <CommissionFormComponent
                comision={comision}
                setComision={setComision}
                handleGuardarComision={handleGuardarComision}
              />
            )}

            {/* TABS 5: ACADEMIC */}
            {activeTab === 'academic' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <DepartmentFormComponent
                  departamentos={departamentos}
                  nuevoDept={nuevoDept}
                  setNuevoDept={setNuevoDept}
                  handleCrearDepartamento={handleCrearDepartamento}
                />
                <SubjectFormComponent
                  materias={materias}
                  departamentos={departamentos}
                  nuevaMateria={nuevaMateria}
                  setNuevaMateria={setNuevaMateria}
                  handleCrearMateria={handleCrearMateria}
                />
              </div>
            )}

            {/* TABS 6: FAQ */}
            {activeTab === 'faq' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-6 shadow-sm flex flex-col">
                  <h3 className="text-lg font-bold text-primary font-display mb-4">Categorías de FAQ</h3>
                  <FAQCategoryFormComponent
                    nuevaFaqCat={nuevaFaqCat}
                    setNuevaFaqCat={setNuevaFaqCat}
                    handleCrearFaqCat={handleCrearFaqCat}
                  />
                  <div className="space-y-3 max-h-96 overflow-y-auto no-scrollbar">
                    {faqCategorias.map(cat => (
                      <FAQCategoryItemComponent
                        key={cat.id}
                        categoria={cat}
                        handleEliminarFaqCat={handleEliminarFaqCat}
                      />
                    ))}
                  </div>
                </div>

                <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-6 shadow-sm flex flex-col">
                  <h3 className="text-lg font-bold text-primary font-display mb-4">Preguntas y Respuestas</h3>
                  <FAQQuestionFormComponent
                    faqCategorias={faqCategorias}
                    nuevaPregunta={nuevaPregunta}
                    setNuevaPregunta={setNuevaPregunta}
                    handleCrearPregunta={handleCrearPregunta}
                  />
                  <div className="space-y-4 max-h-96 overflow-y-auto no-scrollbar">
                    {faqCategorias.flatMap(cat => (cat.preguntas || []).map(p => (
                      <FAQQuestionItemComponent
                        key={p.id}
                        pregunta={p}
                        catNombre={cat.nombre}
                        handleEliminarPregunta={handleEliminarPregunta}
                      />
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
