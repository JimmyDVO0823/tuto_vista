import React, { useState, useEffect } from 'react';
import { api } from '../../../services/api';

const AsignarActividadModal = ({ isOpen, onClose, sesion, onAsignada }) => {
  const [recursos, setRecursos] = useState([]);
  const [selectedRecursoId, setSelectedRecursoId] = useState('');

  const [formData, setFormData] = useState({
    titulo: '',
    url: '',
    descripcion: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingRecursos, setIsLoadingRecursos] = useState(false);

  // Cargar recursos guardados al abrir el modal
  useEffect(() => {
    const cargarRecursos = async () => {
      if (!isOpen || !sesion?.tutorId) return;

      setIsLoadingRecursos(true);
      try {
        // 🌟 Usamos tu endpoint existente pasando el id del tutor
        const data = await api.get(`/recursos/tutor/${sesion.tutorId}`);
        setRecursos(data || []);
      } catch (error) {
        console.error("Error al cargar los recursos del tutor:", error);
      } finally {
        setIsLoadingRecursos(false);
      }
    };

    cargarRecursos();
  }, [isOpen, sesion]);

  if (!isOpen || !sesion) return null;

  // Manejar el cambio de selección de un recurso existente
  const handleRecursoChange = (e) => {
    const id = e.target.value;
    setSelectedRecursoId(id);

    if (id === '') {
      // Opción de crear uno nuevo de cero
      setFormData({ titulo: '', url: '', descripcion: '' });
    } else {
      // Buscar el recurso seleccionado en la lista local y autorrellenar
      const recursoSeleccionado = recursos.find(r => r.id.toString() === id);
      if (recursoSeleccionado) {
        setFormData({
          titulo: recursoSeleccionado.titulo || '',
          url: recursoSeleccionado.url || '',
          descripcion: recursoSeleccionado.descripcion || '' // Si tus recursos guardan descripción por defecto
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.titulo || !formData.url) {
      alert("Por favor, completa el título y la URL.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Enviamos el sesionId, los datos del form, y opcionalmente el recursoId si fue seleccionado
      await api.post('/actividades/asignar', {
        sesionId: sesion.id,
        recursoId: selectedRecursoId ? parseInt(selectedRecursoId) : null,
        ...formData
      });
      alert("¡Actividad asignada correctamente!");
      onAsignada();
      onClose();
      // Resetear estados al cerrar con éxito
      setSelectedRecursoId('');
      setFormData({ titulo: '', url: '', descripcion: '' });
    } catch (error) {
      console.error("Error al asignar actividad:", error);
      alert("Error al asignar la actividad. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-300">
        <header className="p-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low">
          <div>
            <span className="text-[10px] font-bold text-academic-gold uppercase tracking-widest block mb-1">Nueva Actividad</span>
            <h3 className="text-xl font-bold text-primary font-display">Asignar Tarea</h3>
          </div>
          <button onClick={onClose} className="text-elegant-gray hover:text-primary transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </header>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="bg-blue-50/30 p-4 rounded-xl border border-blue-100/50 mb-6">
            <p className="text-xs text-primary/70 leading-relaxed font-medium">
              Asignando actividad corregida para: <br />
              <strong className="text-primary">{sesion.materiaNombre}</strong> con <strong>{sesion.estudianteNombre}</strong>
            </p>
          </div>

          <div className="space-y-4">
            {/* 🌟 NUEVO SELECTOR DE RECURSOS EXISTENTES */}
            <div>
              <label className="text-[10px] font-bold text-elegant-gray uppercase tracking-widest block mb-2">Seleccionar de tus Recursos</label>
              <select
                className="w-full text-sm p-3 border border-outline-variant/30 rounded-xl bg-surface focus:outline-none focus:border-primary text-primary transition-all cursor-pointer"
                value={selectedRecursoId}
                onChange={handleRecursoChange}
                disabled={isLoadingRecursos}
              >
                <option value="">-- Nueva actividad personalizada --</option>
                {recursos.map((recurso) => (
                  <option key={recurso.id} value={recurso.id}>
                    {recurso.titulo}
                  </option>
                ))}
              </select>
              {isLoadingRecursos && <p className="text-[10px] text-gray-400 mt-1">Cargando biblioteca de recursos...</p>}
            </div>

            <hr className="border-outline-variant/10 my-2" />

            <div>
              <label className="text-[10px] font-bold text-elegant-gray uppercase tracking-widest block mb-2">Título de la Actividad</label>
              <input
                type="text"
                required
                disabled={selectedRecursoId !== ''} // Bloqueado si viene de un recurso existente
                className="w-full text-sm p-3 border border-outline-variant/30 rounded-xl bg-surface focus:outline-none focus:border-primary text-primary transition-all disabled:opacity-60 disabled:bg-gray-50"
                placeholder="Ej: Ejercicios de Cálculo Integral"
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-elegant-gray uppercase tracking-widest block mb-2">URL del Recurso (Actividad)</label>
              <input
                type="url"
                required
                disabled={selectedRecursoId !== ''} // Bloqueado si viene de un recurso existente
                className="w-full text-sm p-3 border border-outline-variant/30 rounded-xl bg-surface focus:outline-none focus:border-primary text-primary transition-all disabled:opacity-60 disabled:bg-gray-50"
                placeholder="Ej: https://docs.google.com/..."
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-elegant-gray uppercase tracking-widest block mb-2">Descripción / Instrucciones</label>
              <textarea
                rows="3"
                className="w-full text-sm p-3 border border-outline-variant/30 rounded-xl bg-surface focus:outline-none focus:border-primary text-primary transition-all resize-none"
                placeholder="Instrucciones adicionales personalizadas para el estudiante en esta sesión..."
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-gray-100 text-elegant-gray rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-all font-display"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 px-4 bg-primary text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-md font-display disabled:opacity-50"
            >
              {isSubmitting ? 'Asignando...' : 'Asignar Actividad'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AsignarActividadModal;